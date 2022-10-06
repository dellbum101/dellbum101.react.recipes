import { createContext, FC, ReactNode, useState } from 'react'
import { Recipe, RecipeIngredient } from '../../apis/recipes/recipe.types'

const defaultRecipes: Recipe[] = []
const defaultIngredients: RecipeIngredient[] = []

const defaultState = {
  recipeSearchTerm: '',
  ingredientSearchTerm: '',
  selectedDishTypes: new Set<string>(),
  selectedCuisines: new Set<string>(),
  selectedDiets: new Set<string>(),
  selectedIngredients: new Set<string>(),
  isFilterDirty: false,
  setRecipeSearchTerm: (term: string) => {},
  setIngredientSearchTerm: (term: string) => {},
  toggleSelectedDishTypes: (dishType: string, isSelected: boolean) => {},
  toggleSelectedCuisine: (cuisine: string, isSelected: boolean) => {},
  toggleSelectedDiet: (diet: string, isSelected: boolean) => {},
  toggleSelectedIngredient: (ingredientName: string, isSelected: boolean) => {},
  clearFilters: () => {},
  recipes: defaultRecipes,
  ingredients: defaultIngredients,
}

export type RecipeSearchContextType = typeof defaultState

export const RecipeSearchContext = createContext(defaultState)
