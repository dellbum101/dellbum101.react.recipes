import React from 'react'
import { Recipe } from '../apis/spoonacular.types'

type Props = { recipe: Recipe }

const RecipeInstructions = ({ recipe }: Props) => {
  return (
    <>
      <div className="flex flex-col">
        {recipe.analyzedInstructions[0].steps.map((step) => (
          <div className="pb-3 flex flex-col" key={step.number}>
            <div className="rounded-xl border overflow-hidden shadow-md">
              <div className="px-6 py-3">
                <div className="font-bold  text-xl mb-2">
                  Step {step.number}
                </div>
                <p className="text-gray-700 text-base">{step.step}</p>
              </div>
              {step.ingredients.length > 0 && (
                <div>
                  <div className="px-0 py-0">
                    <hr />
                  </div>
                  <div className="px-6 py-3 flex flex-wrap">
                    {step.ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex border bg-gray-50 mb-2 mr-2 rounded-full overflow-hidden h-auto lg:h-8"
                      >
                        {ingredient.image && (
                          <div className="inline-block content-center bg-white w-10">
                            <img
                              className="object-contain max-h-7 max-w-7 mx-auto"
                              src={
                                ' https://spoonacular.com/cdn/ingredients_100x100/' +
                                ingredient.image
                              }
                              alt={ingredient.name}
                            />
                          </div>
                        )}
                        <div className="grid content-center mx-3 leading-normal text-black text-sm">
                          {ingredient.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default RecipeInstructions
