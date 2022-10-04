import { Add } from '@mui/icons-material'
import React from 'react'
import { Recipe } from '../apis/recipes/recipe.types'

type Props = {
  name: string
  recipes: Recipe[]
  calories: number
  macros: { fat: number; protein: number; carbs: number }
}

const MealSlot = ({ name, recipes, calories, macros }: Props) => {
  return (
    <>
      <div className="text-right flex justify-end items-center">{name}</div>
      <div className="border p-2 col-span-2 flex flex-wrap">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="mr-2 flex-auto text-center text-sm">
            {recipe.image && (
              <img
                className="border shadow-md h-9 w-9 rounded-full mx-auto"
                src={recipe.image}
                alt={recipe.title}
              />
            )}
            {recipe.title}
          </div>
        ))}
        <Add fontSize="large" htmlColor="green"></Add>
      </div>
      <div className="col-span-3 flex flex-row items-center gap-2">
        <div className="w-50 border bg-gray-300 px-2 py-1">{calories} cal</div>
        <div className="flex flex-grow flex-row border items-center text-center">
          <div
            style={{ width: `${macros.fat}%` }}
            className="border bg-blue-500 px-2 opacity-80 rounded h-7"
          >
            Fat
          </div>
          <div
            style={{ width: `${macros.protein}%` }}
            className="border bg-red-500 px-2 opacity-80 rounded h-7"
          >
            Protein
          </div>
          <div
            style={{ width: `${macros.carbs}%` }}
            className="border bg-green-500 px-2 opacity-80 rounded h-7"
          >
            Carbs
          </div>
        </div>
      </div>
    </>
  )
}

export default MealSlot
