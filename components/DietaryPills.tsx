import React from 'react'
import { Recipe } from '../apis/recipes/recipe.types'

type Props = { recipe: Recipe }

const FULFILLS_DIET = 'bg-lime-600'
const NOT_FULFILLS_DIET = 'bg-gray-300'
const PILL_CLASSES =
  'rounded-full w-8 h-8 pt-1 inline-block text-center text-white text-sm tooltip tooltip-bottom tooltip-small'

const DietaryPills = ({ recipe }: Props) => {
  return (
    <>
      <span
        className={
          PILL_CLASSES +
          ' ' +
          (recipe.glutenFree ? FULFILLS_DIET : NOT_FULFILLS_DIET)
        }
        data-text="Glluten Free"
      >
        GF
      </span>
      <span
        className={
          PILL_CLASSES +
          ' ' +
          (recipe.vegetarian ? FULFILLS_DIET : NOT_FULFILLS_DIET)
        }
        data-text="Vegetarian"
      >
        VE
      </span>
      <span
        className={
          PILL_CLASSES +
          ' ' +
          (recipe.vegan ? FULFILLS_DIET : NOT_FULFILLS_DIET)
        }
        data-text="Vegan"
      >
        VG
      </span>
      <span
        className={
          PILL_CLASSES +
          ' ' +
          (recipe.dairyFree ? FULFILLS_DIET : NOT_FULFILLS_DIET)
        }
        data-text="Dairy Free"
      >
        DF
      </span>
      <span
        className={
          PILL_CLASSES +
          ' ' +
          (recipe.ketogenic ? FULFILLS_DIET : NOT_FULFILLS_DIET)
        }
        data-text="Ketogonic"
      >
        KE
      </span>
    </>
  )
}

export default DietaryPills
