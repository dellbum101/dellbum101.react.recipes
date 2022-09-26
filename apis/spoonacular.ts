import { writeFile } from 'fs/promises'
import { env } from 'process'
import recipeSearchResults from './recipeSearchResults.json'
import allRecipes from './allRecipes.json'
import ingredientSearchResults from './ingredientSearchResults.json'
import { Recipe, RecipeIngredient } from './spoonacular.types'

const BASE_URL = 'https://api.spoonacular.com/'

export type SearchReceipeResult = SearchResult<ReceipeHeader>
export type SearchIngredientResult = SearchResult<IngredientHeader>

export type SearchResult<T> = {
  results: T[]
  offset: number
  number: number
  totalResults: number
}

export type ReceipeHeader = {
  id: number
  title: string
  image: string
  imageType: string
}
export type IngredientHeader = {
  id: number
  name: string
  image: string
  aisle: string
  possibleUnits: string[]
}

// export async function AutoCompletehRecipes(search: string) {
//   const query = `number=10&query=${search}`
//   const resp = await fetch(BASE_URL + 'recipes/autocomplete?' + query, {
//     headers: {
//       'x-api-key': env['SPOONACULAR_APIKEY'] ?? '',
//     },
//   })
//   return resp.json()
// }

export async function SearchRecipes(
  search: string
): Promise<SearchReceipeResult> {
  return recipeSearchResults
}

// export async function SearchRecipes(
//   search: string
// ): Promise<SearchReceipeResult> {
//   const query = `number=1000&&instructionsRequired=true&query=${search}`
//   const resp = await fetch(BASE_URL + 'recipes/complexSearch?' + query, {
//     headers: {
//       'x-api-key': env['SPOONACULAR_APIKEY'] ?? '',
//     },
//   })
//   const searchReceipeResults = await resp.json()
//   writeFile('./recipeSearchResults.json', JSON.stringify(searchReceipeResults))
//   return searchReceipeResults
// }
// export async function SearchIngredients(
//   search: string
// ): Promise<SearchIngredientResult> {
//   const query = `number=1000&&metaInformation=true&query=${search}`
//   // const query = `number=1000&&metaInformation=true&sort=random&sortDirection=desc&query=${search}`
//   const resp = await fetch(BASE_URL + 'food/ingredients/search?' + query, {
//     headers: {
//       'x-api-key': env['SPOONACULAR_APIKEY'] ?? '',
//     },
//   })
//   const searchResults = await resp.json()
//   writeFile(
//     './apis/ingredientSearchResults.json',
//     JSON.stringify(searchResults)
//   )
//   return searchResults
// }

export async function GetAllIngredients(): Promise<RecipeIngredient[]> {
  // TODO: convert ingredints properly
  return ingredientSearchResults.results as unknown as RecipeIngredient[]
}

export async function GetRecipe(id: number): Promise<Recipe | undefined> {
  return allRecipes.find((recipe) => recipe.id === id)
}

export async function GetAllRecipes(): Promise<Recipe[]> {
  return allRecipes
}

// export async function GetAllRecipes() {
//   const recipeIds = recipeSearchResults.results.map((recipe) =>
//     recipe.id.toString()
//   )
//   return GetRecipes(recipeIds)
// }

// export async function GetRecipes(
//   recipeIds: string[]
// ): Promise<SearchReceipeResult> {
//   const query = `includeNutrition=true&ids=${recipeIds.join(',')}`
//   const resp = await fetch(BASE_URL + 'recipes/informationBulk?' + query, {
//     headers: {
//       'x-api-key': env['SPOONACULAR_APIKEY'] ?? '',
//     },
//   })
//   const searchReceipeResults = await resp.json()
//   writeFile('./apis/allRecipes.json', JSON.stringify(searchReceipeResults))
//   return searchReceipeResults
// }
