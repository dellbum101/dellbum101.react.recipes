import { RecipeIngredient } from './recipe.types'

export async function GetAllIngredients(): Promise<RecipeIngredient[]> {
  const response = await fetch(
    'http://localhost:3000/api/recipes/getAllIngredients'
  )
  return response.json()
}
