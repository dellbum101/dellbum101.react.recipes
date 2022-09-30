import { RecipeIngredient } from './recipe.types'
import ingredientSearchResults from './data/ingredientSearchResults.json'

export async function GetAllIngredients(): Promise<RecipeIngredient[]> {
  // TODO: convert ingredints properly
  return (
    ingredientSearchResults.results as unknown as RecipeIngredient[]
  ).slice(0, 15)
}
