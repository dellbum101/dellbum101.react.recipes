import { Recipe } from './recipe.types'

export async function GetAllRecipes(): Promise<Recipe[]> {
  const response = await fetch(
    'http://localhost:3000/api/recipes/getAllRecipes'
  )
  return response.json()
}
