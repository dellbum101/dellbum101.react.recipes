import { writeFile } from 'fs/promises'
import { env } from 'process'
import recipeSearchResults from './data/recipeSearchResults.json'
import allRecipes from './data/allRecipes.json'
import ingredientSearchResults from './data/ingredientSearchResults.json'
import { Recipe, RecipeIngredient } from './recipe.types'

const BASE_URL = 'https://api.spoonacular.com/'
const RECIPE_IMAGE_PATH = 'https://spoonacular.com/recipeImages/' // https://spoonacular.com/recipeImages/579247-556x370.jpg
// 90x90, 240x150, 312x150, 312x231, 480x360, 556x370, 636x393,
const INGREDIENT_IMAGE_PATH = 'https://spoonacular.com/cdn/ingredients_' // https://spoonacular.com/cdn/ingredients_100x100/apple.jpg
// 100x100, 250x250, 500x500
const EQUIPMENT_IMAGE_PATH = 'https://spoonacular.com/cdn/equipment_' // https://spoonacular.com/cdn/equipment_100x100/slow-cooker.jpg
// 100x100, 250x250, 500x500
const PRODUCT_IMAGE_PATH = 'https://spoonacular.com/productImages/' // https://spoonacular.com/productImages/35507-636x393.jpg
// 90x90, 312x231, 636x393
const MENUITEM_IMAGE_PATH = 'https://images.spoonacular.com/file/wximages/' // https://images.spoonacular.com/file/wximages/423186-636x393.png
// 90x90, 312x231, 636x393

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

export async function GetRecipe(id: number): Promise<Recipe | undefined> {
  return allRecipes.find((recipe) => recipe.id === id)
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
