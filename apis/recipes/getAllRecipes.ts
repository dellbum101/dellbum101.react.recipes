import { Recipe } from './recipe.types'
import allRecipes from './data/allRecipes.json'

export async function GetAllRecipes(): Promise<Recipe[]> {
  return allRecipes.slice(0, 15)
}
