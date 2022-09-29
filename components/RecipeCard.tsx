import {
  Favorite,
  HideSource,
  MoreVert,
  PlaylistAdd,
  Preview,
  ThumbDown,
  Visibility,
} from '@mui/icons-material'
import Link from 'next/link'
import React, { useState } from 'react'
import { Recipe } from '../apis/spoonacular.types'
import DietaryPills from './DietaryPills'
import PopUpMenu from './PopUpMenu'

type Props = {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="basis-1/5 rounded-lg border relative" key={recipe.id}>
      <div className="opacity-0 absolute flex flex-col gap-5 justify-center align-middle text-center z-10 text-sm rounded shadow-lg p-2 bg-black text-white hover:opacity-80 bg-opacity-90 w-full h-full">
        <div className="text-sm hover:scale-110">
          <Link href={`/recipe/${recipe.id}`}>
            <a>
              <Visibility
                htmlColor="white"
                fontSize="large"
                className="scale-150"
              />
              <br />
              View Details
            </a>
          </Link>
        </div>
        <ul>
          <li className="hover:scale-110 cursor-pointer">
            <PlaylistAdd htmlColor="green" /> Add To Menu
          </li>
          <li className="hover:scale-110 cursor-pointer">
            <Favorite htmlColor="red" /> Add To Favorites
          </li>
          <li className="hover:scale-110 cursor-pointer">
            <ThumbDown htmlColor="white" /> Never Suggest This
          </li>
        </ul>
      </div>
      <div>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="rounded-t-lg object-cover"
        />
        <div className="grid content-center h-16 overflow-hidden">
          <h3 className="pt-1 text-xl font-bold text-center">
            {recipe.title.substring(0, 40) +
              (recipe.title.length > 37 ? '...' : '')}
          </h3>
        </div>
        <hr className="mt-1" />
        <div className="rounded-b-xl bg-gray-50 px-2">
          <div className="text-black h-6 px-2  my-0 text-center">
            {recipe.cuisines.map((cuisine) => (
              <span className="mr-3" key={cuisine}>
                {cuisine}
              </span>
            ))}
          </div>
          <div className="flex pt-1 pb-2 gap-1">
            <div className="flex-grow"></div>
            <DietaryPills recipe={recipe} />
            <div className="inline-block h-fit mt-0.5 mx-1 pt-0.5 pb-1 px-2 text-sm text-gray-700 border bg-blue-100">
              500&nbsp;cal
            </div>
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
