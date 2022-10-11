// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ingredientSearchResults from './data/ingredientSearchResults.json'
import { RecipeIngredient } from '../../../apis/recipes/recipe.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeIngredient[]>
) {
  const ingredients = ingredientSearchResults
  // TODO: convert ingredints properly
  res.status(200).json(ingredients as unknown as RecipeIngredient[])
}
