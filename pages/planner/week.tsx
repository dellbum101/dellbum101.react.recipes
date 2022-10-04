import { Add } from '@mui/icons-material'
import React from 'react'
import { GetAllRecipes } from '../../apis/recipes/getAllRecipes'
import { Recipe } from '../../apis/recipes/recipe.types'
import MealSlot from '../../components/MealSlot'
import NavBar from '../../components/NavBar'

export async function getServerSideProps() {
  return {
    props: {
      allRecipes: await GetAllRecipes(),
    },
  }
}

type Props = { allRecipes: Recipe[] }

const week = ({ allRecipes }: Props) => {
  return (
    <>
      <NavBar />

      <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <div className="text-xl font-bold">Plan The Week</div>
        <div className="p-5 flex flex-row">
          <div className="border p-2 mr-4 cursor-pointer">9/25-10/1</div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            S
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            M
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer bg-green-200 border-gray-600">
            T
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            W
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            T
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            F
          </div>
          <div className="border p-2 w-10 text-center mx-1 hover:bg-gray-300 cursor-pointer">
            S
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3">
          <MealSlot
            name="Breakfast"
            recipes={allRecipes.slice(0, 1)}
            calories={500}
            macros={{ fat: 20, protein: 50, carbs: 30 }}
          ></MealSlot>
          <MealSlot
            name="Lunch"
            recipes={allRecipes.slice(2, 3)}
            calories={500}
            macros={{ fat: 20, protein: 50, carbs: 30 }}
          ></MealSlot>
          <MealSlot
            name="Snack"
            recipes={allRecipes.slice(3, 5)}
            calories={500}
            macros={{ fat: 20, protein: 50, carbs: 30 }}
          ></MealSlot>
          <MealSlot
            name="Dinner"
            recipes={allRecipes.slice(5, 7)}
            calories={500}
            macros={{ fat: 20, protein: 50, carbs: 30 }}
          ></MealSlot>
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

export default week
