import React, { useCallback, useEffect, useState } from 'react'
import { getPlanForDay } from '../../apis/planner/getPlanForDay'
import MealSlot from '../../components/MealSlot'
import NavBar from '../../components/NavBar'
import { Plan } from '../api/planner/getPlanForDay'

const getStartOfWeek = (day: Date) => {
  const startOfWeek = new Date(day)
  startOfWeek.setDate(startOfWeek.getDate() - day.getDay())
  return startOfWeek
}

const generateDaysOfWeek = (day: Date) => {
  const startOfWeek = getStartOfWeek(day)
  const dayOfWeek = [0, 1, 2, 3, 4, 5, 6]

  return dayOfWeek.map((index) => {
    const currentDay = new Date(startOfWeek)
    currentDay.setDate(currentDay.getDate() + index)
    return currentDay
  })
}

const daysOfWeekAbbreviations = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

type Props = {}

const Week = ({}: Props) => {
  const [plan, setPlan] = useState<Plan>()
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState<Date[]>(
    generateDaysOfWeek(new Date())
  )

  useEffect(() => {
    async function getPlans(day: Date) {
      const plans = await getPlanForDay(day)
      setPlan(plans)
    }

    getPlans(selectedDay)
  }, [selectedDay])

  const handleSelectDayOfWeek = useCallback((day: Date) => {
    setSelectedDay(day)
  }, [])

  const weekDatesString = `${
    selectedDaysOfWeek[0].getMonth() + 1
  }/${selectedDaysOfWeek[0].getDate()}-${
    selectedDaysOfWeek[6].getMonth() + 1
  }/${selectedDaysOfWeek[6].getDate()}`

  return (
    <>
      <NavBar currentPage="plan" />

      <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <div className="text-xl font-bold">Plan The Week</div>
        <div className="p-5 flex flex-row">
          <div className="border p-2 mr-4 cursor-pointer">
            {weekDatesString}
          </div>
          {selectedDaysOfWeek.map((day) => (
            <div
              key={day.toISOString()}
              className={
                'border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer' +
                (day.toDateString() === selectedDay.toDateString() &&
                  ' bg-green-200 border-gray-600')
              }
              onClick={() => handleSelectDayOfWeek(day)}
            >
              {daysOfWeekAbbreviations[day.getDay()]}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-3">
          {plan &&
            plan.meals.map((meal) => (
              <MealSlot
                key={meal.name}
                name={meal.name}
                recipes={meal.recipes}
                calories={meal.summary.calories}
                macros={meal.summary}
              ></MealSlot>
            ))}
        </div>
        <div className="flex flex-row gap-5 mt-10">
          <div>Daily Summary</div>
          <div className="flex-grow flex flex-row items-center gap-2">
            <div className="w-50 border bg-gray-300 px-2 py-1">2000 cal</div>
            <div className="flex flex-grow flex-row border items-center text-center">
              <div
                style={{ width: `${25}%` }}
                className="border bg-blue-500 px-2 opacity-80 rounded h-7"
              >
                Fat
              </div>
              <div
                style={{ width: `${45}%` }}
                className="border bg-red-500 px-2 opacity-80 rounded h-7"
              >
                Protein
              </div>
              <div
                style={{ width: `${30}%` }}
                className="border bg-green-500 px-2 opacity-80 rounded h-7"
              >
                Carbs
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Week
