import { Search } from '@mui/icons-material'
import React, { useContext, useMemo } from 'react'
import {
  RecipeCuisineTypes,
  RecipeDietTypes,
  RecipeDishTypes,
} from '../apis/recipes/recipe.types'
import { RecipeSearchContext } from '../src/context/RecipeSearchContext'
import ListSelectionFilter from './ListSelectionFilter'
import ListSelectionFilterWithSearch from './ListSelectionFilterWithSearch'

const dishTypeOptions = (
  Object.keys(RecipeDishTypes) as Array<keyof typeof RecipeDishTypes>
)
  .sort()
  .map((dish) => ({
    title: RecipeDishTypes[dish],
    value: RecipeDishTypes[dish].toLowerCase(),
  }))

const cuisineOptions = (
  Object.keys(RecipeCuisineTypes) as Array<keyof typeof RecipeCuisineTypes>
)
  .sort()
  .map((cuisine) => ({
    title: RecipeCuisineTypes[cuisine],
    value: RecipeCuisineTypes[cuisine],
  }))

const dietaryOptions = (
  Object.keys(RecipeDietTypes) as Array<keyof typeof RecipeDietTypes>
)
  .sort()
  .map((diet) => ({
    title: RecipeDietTypes[diet],
    value: RecipeDietTypes[diet].toLowerCase(),
  }))

const RecipeSearchBar = () => {
  const searchContext = useContext(RecipeSearchContext)

  const ingredientOptions = useMemo(() => {
    return searchContext.ingredients.sort().map((ingredient) => ({
      title: ingredient.name,
      value: ingredient.name.toLowerCase(),
    }))
  }, [searchContext.ingredients])

  return (
    <>
      <div className="hidden w-80 relative md:block mr-2">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <Search />
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={searchContext.recipeSearchTerm}
          onChange={(event) =>
            searchContext.setRecipeSearchTerm(event.target.value)
          }
        />
      </div>
      <div>
        <ListSelectionFilter
          buttonText="Dish Types"
          filterTitle="Select Dish Types"
          options={dishTypeOptions}
          selectedItems={searchContext.selectedDishTypes}
          setItemsSelected={searchContext.toggleSelectedDishTypes}
        />
        <ListSelectionFilter
          buttonText="Cuisines"
          filterTitle="Select Cuisines"
          options={cuisineOptions}
          selectedItems={searchContext.selectedCuisines}
          setItemsSelected={searchContext.toggleSelectedCuisine}
        />
        <ListSelectionFilter
          buttonText="Dietary"
          filterTitle="Select Diets"
          options={dietaryOptions}
          selectedItems={searchContext.selectedDiets}
          setItemsSelected={searchContext.toggleSelectedDiet}
        />
        <ListSelectionFilterWithSearch
          buttonText="Ingredients"
          filterTitle="Select Preferred Ingredients"
          options={ingredientOptions}
          selectedItems={searchContext.selectedIngredients}
          setItemsSelected={searchContext.toggleSelectedIngredient}
          searchTerm={searchContext.ingredientSearchTerm}
          setSearchTerm={searchContext.setIngredientSearchTerm}
        />
      </div>
      <button className="px-4 py-1 mx-1" onClick={searchContext.clearFilters}>
        Clear
      </button>
    </>
  )
}

export default RecipeSearchBar
