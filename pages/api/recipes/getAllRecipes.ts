// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import allRecipes from './data/allRecipes.json'
import { Recipe } from '../../../apis/recipes/recipe.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recipe[]>
) {
  const recipes = allRecipes
  res.status(200).json(recipes)
}
