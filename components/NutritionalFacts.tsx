import React, { FC } from 'react'
import { Recipe } from '../apis/recipes/recipe.types'

type Props = { recipe: Recipe }

const NutritionalFacts: FC<Props> = ({ recipe }: Props) => {
  return (
    <div className="grid grid-cols-6 w-full border-black border rounded p-2">
      <div className="col-span-6 text-2xl font-bold">Nutritional Facts</div>
      <div className="col-span-6 bg-black h-3"></div>

      <div className="col-span-6">
        <span>
          {recipe.servings} serving{recipe.servings > 1 && 's'}
        </span>
        <br />
        <span className="font-bold">Serving size </span>
        <hr />
        <span className="text-md">Amount Per Serving</span>
      </div>
      <div className="col-span-4 font-bold text-lg">Calories</div>
      <div className="col-span-2 font-bold text-lg text-right">100</div>
      <div className="col-span-6 bg-black h-1"></div>
      <div className="col-span-6 text-right">
        <span>% Daily Value *</span>
        <hr />
      </div>

      <div className="col-span-4">
        <span className="font-bold text-md">Total Fat</span> 4g
      </div>
      <div className="col-span-2 font-bold text-lg text-right">5%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Saturated Fat 2g</div>
      <div className="col-span-2 text-right">10%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Trans Fat 2g</div>
      <div className="col-span-2 text-right"></div>
      <hr className="col-span-6" />

      <div className="col-span-4">
        <span className="font-bold text-md">Cholestrol</span> 20mg
      </div>
      <div className="col-span-2 font-bold text-md text-right">7%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">
        <span className="font-bold text-md">Sodium</span> 1070mg
      </div>
      <div className="col-span-2 font-bold text-md text-right">47%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">
        <span className="font-bold text-md">Total Carbohydrates</span> 12g
      </div>
      <div className="col-span-2 font-bold text-md text-right">4%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Dietary Fiber 0g</div>
      <div className="col-span-2 text-right">0%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Total Sugars 1g</div>
      <div className="col-span-2 text-right"></div>
      <hr className="col-span-6" />

      <div className="col-span-4">
        <span className="font-bold text-md">Protein</span> 5g
      </div>
      <div className="col-span-2 font-bold text-md text-right">10%</div>
      <div className="col-span-6 bg-black h-2"></div>

      <div className="col-span-4">Vitamin D 0mcg</div>
      <div className="col-span-2 text-right">0%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Calcium 20mg</div>
      <div className="col-span-2 text-right">2%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Iron 0.72g</div>
      <div className="col-span-2 text-right">4%</div>
      <hr className="col-span-6" />

      <div className="col-span-4">Potassium 0mg</div>
      <div className="col-span-2 text-right">0%</div>
      <div className="col-span-6 bg-black h-1"></div>

      <div className="col-span-6 text-xs">
        * The % Daily Value (DV) tells you how much a nutrient in a serving of
        food contributes to a daily diet. 2,000 calories a day is used for
        general nutrion advice.
      </div>
    </div>
  )
}

export default NutritionalFacts
