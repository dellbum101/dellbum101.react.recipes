import {
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { GetAllIngredients } from '../../apis/recipes/getAllIngredients'
import { GetAllRecipes } from '../../apis/recipes/getAllRecipes'
import { Recipe, RecipeIngredient } from '../../apis/recipes/recipe.types'
import { RecipeSearchContext } from '../context/RecipeSearchContext'

type Props = {
  children: ReactNode
}

export const RecipeSearchProvider: FC<Props> = ({ children }: Props) => {
  const [recipeSearchTerm, setRecipeSearchTerm] = useState('')
  const [ingredientSearchTerm, setIngredientSearchTerm] = useState('')
  const [selectedDishTypes, setSelectedDishTypes] = useState<Set<string>>(
    new Set([])
  )
  const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(
    new Set([])
  )
  const [selectedDiets, setSelectedDiets] = useState<Set<string>>(new Set([]))
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set([])
  )
  const [isFilterDirty, setIsFilterDirty] = useState(false)
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([])
  const [allIngredients, setAllIngredients] = useState<RecipeIngredient[]>([])

  useEffect(() => {
    async function fetchIngredients() {
      const fetchedIngredients = await GetAllIngredients()
      setAllIngredients(fetchedIngredients)
    }

    fetchIngredients()
  }, [])

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await GetAllRecipes()
      setAllRecipes(fetchedRecipes)
    }

    fetchRecipes()
  }, [])

  const recipes = useMemo(() => {
    const filteredRecipes = allRecipes.filter((recipe) => {
      return (
        (!recipeSearchTerm ||
          recipe.title.toLowerCase().indexOf(recipeSearchTerm) > -1) &&
        (selectedCuisines.size === 0 ||
          recipe.cuisines.some((cuisine) => selectedCuisines.has(cuisine))) &&
        (selectedDiets.size === 0 ||
          recipe.diets.some((diet) => selectedDiets.has(diet))) &&
        (selectedDishTypes.size === 0 ||
          recipe.dishTypes.some((dishType) =>
            selectedDishTypes.has(dishType)
          )) &&
        (selectedIngredients.size === 0 ||
          recipe.extendedIngredients.some((ingredient) =>
            selectedIngredients.has(ingredient.name)
          ))
      )
    })

    console.log('MEMO - Filtered Recipes: ', filteredRecipes)

    return filteredRecipes
  }, [
    allRecipes,
    recipeSearchTerm,
    selectedCuisines,
    selectedDiets,
    selectedDishTypes,
    selectedIngredients,
  ])

  const ingredients = useMemo(() => {
    return allIngredients.filter((ingredient) => {
      return (
        !ingredientSearchTerm ||
        ingredient.name.toLowerCase().indexOf(ingredientSearchTerm) > -1
      )
    })
  }, [allIngredients, ingredientSearchTerm])

  const toggleSelectedItem = (
    item: string,
    isSelected: boolean,
    setSelectedItem: (value: SetStateAction<Set<string>>) => void
  ) => {
    setSelectedItem((selectedItems) => {
      if (isSelected) {
        selectedItems.add(item)
      } else {
        selectedItems.delete(item)
      }
      return new Set(selectedItems.values())
    })
    setIsFilterDirty(true)
  }

  const toggleSelectedDishTypes = (dishType: string, isSelected: boolean) => {
    toggleSelectedItem(dishType, isSelected, setSelectedDishTypes)
  }
  const toggleSelectedCuisine = (cuisine: string, isSelected: boolean) => {
    toggleSelectedItem(cuisine, isSelected, setSelectedCuisines)
  }
  const toggleSelectedDiet = (diet: string, isSelected: boolean) => {
    toggleSelectedItem(diet, isSelected, setSelectedDiets)
  }
  const toggleSelectedIngredient = (
    ingredientName: string,
    isSelected: boolean
  ) => {
    toggleSelectedItem(ingredientName, isSelected, setSelectedIngredients)
  }

  const clearFilters = () => {
    selectedCuisines.clear()
    selectedDiets.clear()
    selectedDishTypes.clear()
    selectedIngredients.clear()
    setIsFilterDirty(true)
  }

  return (
    <RecipeSearchContext.Provider
      value={{
        recipeSearchTerm,
        ingredientSearchTerm,
        selectedDishTypes,
        selectedCuisines,
        selectedDiets,
        selectedIngredients,
        isFilterDirty,
        setRecipeSearchTerm,
        setIngredientSearchTerm,
        toggleSelectedDishTypes,
        toggleSelectedCuisine,
        toggleSelectedDiet,
        toggleSelectedIngredient,
        clearFilters,
        recipes,
        ingredients,
      }}
    >
      {children}
    </RecipeSearchContext.Provider>
  )
}
