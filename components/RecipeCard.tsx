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
import { Recipe } from '../apis/recipes/recipe.types'
import DietaryPills from './DietaryPills'

type Props = {
  recipe: Recipe
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="basis-1/5 rounded-lg border relative" key={recipe.id}>
      <div
        className="opacity-0 absolute flex flex-col gap-5 justify-center align-middle text-center z-10 text-sm rounded p-2 text-white hover:opacity-90 w-full h-full"
        style={{ backdropFilter: 'blur(5px) brightness(15%)' }}
      >
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
        <div className="flex flex-row justify-between px-10 mb-28">
          <div className="hover:scale-110 cursor-pointe">
            <PlaylistAdd htmlColor="green" />
            <br />
            Add
          </div>
          <div className="hover:scale-110 cursor-pointe">
            <Favorite htmlColor="red" />
            <br />
            Favorite
          </div>
          <div className="hover:scale-110 cursor-pointe">
            <ThumbDown htmlColor="gray" />
            <br />
            Hide
          </div>
        </div>
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
