import React, { useEffect, useState } from 'react'
import {
  RecipeCuisineTypes,
  RecipeDietTypes,
  RecipeDishTypes,
  RecipeIngredient,
} from '../apis/recipes/recipe.types'
import PopUpMenu from './PopUpMenu'

type Props = {
  allIngredients: RecipeIngredient[]
  onFilterChnage: (filter: RecipeSearchFilter) => void
}

export type RecipeSearchFilter = {
  recipeSearchTerm: string
  selectedCuisines: Set<string>
  selectedDiets: Set<string>
  selectedDishTypes: Set<string>
  selectedIngredients: Set<string>
}

const RecipeSearchBar = ({ allIngredients, onFilterChnage }: Props) => {
  const [recipeSearchTerm, setRecipeSearchTerm] = useState('')
  const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(
    new Set([])
  )
  const [showDietFilter, setShowDietFilter] = useState(false)
  const [selectedDiets, setSelectedDiets] = useState<Set<string>>(new Set([]))
  const [showCusineFilter, setShowCusineFilter] = useState(false)
  const [selectedDishTypes, setSelectedDishTypes] = useState<Set<string>>(
    new Set([])
  )
  const [showDishTypeFilter, setShowDishTypeFilter] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set([])
  )
  const [showIngredientFilter, setShowIngredientFilter] = useState(false)
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('')
  const [ingredients, setIngredients] = useState<RecipeIngredient[] | []>([])
  const [isFilterDirty, setIsFilterDirty] = useState(false)

  useEffect(() => {
    async function getIngredients() {
      const ingredients = allIngredients.filter((ingredient) => {
        return (
          !ingredientSearchTerm ||
          ingredient.name.toLowerCase().indexOf(ingredientSearchTerm) > -1
        )
      })
      setIngredients(ingredients)
    }

    getIngredients()
    setIsFilterDirty(false)
  }, [allIngredients, ingredientSearchTerm])

  useEffect(() => {
    if (!isFilterDirty) {
      return
    }

    onFilterChnage({
      recipeSearchTerm,
      selectedCuisines,
      selectedDiets,
      selectedDishTypes,
      selectedIngredients,
    })
    setIsFilterDirty(false)
  }, [
    isFilterDirty,
    onFilterChnage,
    recipeSearchTerm,
    selectedCuisines,
    selectedDiets,
    selectedDishTypes,
    selectedIngredients,
    showCusineFilter,
    showDietFilter,
    showDishTypeFilter,
    showIngredientFilter,
  ])

  function handleRecipeSearchTermChange(newSearchTerm: string) {
    setRecipeSearchTerm(newSearchTerm)
    setIsFilterDirty(true)
  }

  function toggleSelectedCuisine(
    cuisine: RecipeCuisineTypes,
    isSelected: boolean
  ) {
    if (isSelected) {
      selectedCuisines.add(cuisine)
    } else {
      selectedCuisines.delete(cuisine)
    }
    setIsFilterDirty(true)
  }

  function toggleSelectedDiet(diet: RecipeDietTypes, isSelected: boolean) {
    if (isSelected) {
      selectedDiets.add(diet.toLowerCase())
    } else {
      selectedDiets.delete(diet.toLowerCase())
    }
    setIsFilterDirty(true)
  }

  function toggleSelectedDishType(
    dishType: RecipeDishTypes,
    isSelected: boolean
  ) {
    if (isSelected) {
      selectedDishTypes.add(dishType)
    } else {
      selectedDishTypes.delete(dishType)
    }
    setIsFilterDirty(true)
  }
  function toggleSelectedIngredient(
    ingredientName: string,
    isSelected: boolean
  ) {
    if (isSelected) {
      selectedIngredients.add(ingredientName)
    } else {
      selectedIngredients.delete(ingredientName)
    }
    setIsFilterDirty(true)
  }

  function clearFilters() {
    selectedCuisines.clear()
    selectedDiets.clear()
    selectedDishTypes.clear()
    selectedIngredients.clear()
    setIsFilterDirty(true)
  }

  return (
    <>
      <div className="hidden w-80 relative md:block mr-2">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Search icon</span>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search..."
          value={recipeSearchTerm}
          onChange={(event) => handleRecipeSearchTermChange(event.target.value)}
        />
      </div>
      <div>
        <div className="relative inline-block">
          <button
            className="bg-blue-400 text-white px-4 py-1 rounded-full mx-1 shadow-md"
            onClick={() => setShowDishTypeFilter(!showDishTypeFilter)}
          >
            Dish Types ({selectedDishTypes.size})
          </button>
          {showDishTypeFilter && (
            <>
              <PopUpMenu
                title="Select Dish Types"
                onClose={() => setShowDishTypeFilter(!showDishTypeFilter)}
                content={
                  <>
                    {(
                      Object.keys(RecipeDishTypes).sort() as Array<
                        keyof typeof RecipeDishTypes
                      >
                    ).map((dishTypeKey) => {
                      return (
                        <div key={dishTypeKey}>
                          <input
                            id={dishTypeKey}
                            type="checkbox"
                            value={dishTypeKey}
                            onChange={(event) =>
                              toggleSelectedDishType(
                                RecipeDishTypes[dishTypeKey],
                                event.target.checked
                              )
                            }
                            checked={selectedDishTypes.has(
                              RecipeDishTypes[dishTypeKey]
                            )}
                          />
                          <label htmlFor={dishTypeKey} className="ml-3">
                            {RecipeDishTypes[dishTypeKey]}
                          </label>
                        </div>
                      )
                    })}
                  </>
                }
              />
            </>
          )}
        </div>
        <div className="relative inline-block">
          <button
            className="bg-blue-400 text-white px-4 py-1 rounded-full mx-1 shadow-md"
            onClick={() => setShowCusineFilter(!showCusineFilter)}
          >
            Cuisines ({selectedCuisines.size})
          </button>
          {showCusineFilter && (
            <>
              <PopUpMenu
                title="Select Cuisines"
                onClose={() => setShowCusineFilter(!showCusineFilter)}
                content={
                  <>
                    {(
                      Object.keys(RecipeCuisineTypes).sort() as Array<
                        keyof typeof RecipeCuisineTypes
                      >
                    ).map((cuisineKey) => {
                      return (
                        <div key={cuisineKey}>
                          <input
                            id={cuisineKey}
                            type="checkbox"
                            value={cuisineKey}
                            onChange={(event) =>
                              toggleSelectedCuisine(
                                RecipeCuisineTypes[cuisineKey],
                                event.target.checked
                              )
                            }
                            checked={selectedCuisines.has(
                              RecipeCuisineTypes[cuisineKey]
                            )}
                          />
                          <label htmlFor={cuisineKey} className="ml-3">
                            {RecipeCuisineTypes[cuisineKey]}
                          </label>
                        </div>
                      )
                    })}
                  </>
                }
              />
            </>
          )}
        </div>
        <div className="relative inline-block">
          <button
            className="bg-blue-400 text-white px-4 py-1 rounded-full mx-1 shadow-md"
            onClick={() => setShowDietFilter(!showDietFilter)}
          >
            Dietary ({selectedDiets.size})
          </button>
          {showDietFilter && (
            <>
              <PopUpMenu
                title="Select Diets"
                onClose={() => setShowDietFilter(!showDietFilter)}
                content={
                  <>
                    {(
                      Object.keys(RecipeDietTypes).sort() as Array<
                        keyof typeof RecipeDietTypes
                      >
                    ).map((dietKey) => {
                      return (
                        <div key={dietKey}>
                          <input
                            id={dietKey}
                            type="checkbox"
                            value={dietKey}
                            onChange={(event) =>
                              toggleSelectedDiet(
                                RecipeDietTypes[dietKey],
                                event.target.checked
                              )
                            }
                            checked={selectedDiets.has(
                              RecipeDietTypes[dietKey].toLowerCase()
                            )}
                          />
                          <label htmlFor={dietKey} className="ml-3">
                            {RecipeDietTypes[dietKey]}
                          </label>
                        </div>
                      )
                    })}
                  </>
                }
              />
            </>
          )}
        </div>
        <div className="relative inline-block">
          <button
            className="bg-blue-400 text-white px-4 py-1 rounded-full mx-1 shadow-md"
            onClick={() => setShowIngredientFilter(!showIngredientFilter)}
          >
            Ingredients ({selectedIngredients.size})
          </button>
          {showIngredientFilter && (
            <>
              <PopUpMenu
                title="Select Preferred Ingredients"
                onClose={() => setShowIngredientFilter(!showIngredientFilter)}
                content={
                  <>
                    <div className="hidden w-80 relative md:block">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Search icon</span>
                      </div>
                      <input
                        type="text"
                        id="search-navbar"
                        className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Ingredients..."
                        value={ingredientSearchTerm}
                        onChange={(event) =>
                          setIngredientSearchTerm(event.target.value)
                        }
                      />
                    </div>
                    <div className="mt-3">
                      {ingredients
                        .slice(0, 15)
                        .sort()
                        .map((ingredient) => {
                          return (
                            <div key={ingredient.id}>
                              <input
                                id={ingredient.id.toString()}
                                type="checkbox"
                                value={ingredient.name}
                                onChange={(event) =>
                                  toggleSelectedIngredient(
                                    ingredient.name,
                                    event.target.checked
                                  )
                                }
                                checked={selectedIngredients.has(
                                  ingredient.name
                                )}
                              />
                              <label
                                htmlFor={ingredient.id.toString()}
                                className="ml-3"
                              >
                                {ingredient.name}
                              </label>
                            </div>
                          )
                        })}
                    </div>
                  </>
                }
              />
            </>
          )}
        </div>
      </div>
      <button className="px-4 py-1 mx-1" onClick={clearFilters}>
        Clear
      </button>
    </>
  )
}

export default RecipeSearchBar
