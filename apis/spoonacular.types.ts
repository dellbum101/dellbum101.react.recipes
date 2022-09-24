export type Recipe = {
  id: number
  title: string
  image?: string
  imageType?: string
  servings: number
  readyInMinutes: number
  license?: string
  sourceName: string
  sourceUrl: string
  spoonacularSourceUrl: string
  aggregateLikes: number
  healthScore: number
  spoonacularScore?: number
  pricePerServing: number
  analyzedInstructions: RecipeInstructions[]
  cheap: boolean
  creditsText: string
  cuisines: string[]
  dairyFree: boolean
  diets: string[]
  gaps: string
  glutenFree: boolean
  instructions: string
  ketogenic?: boolean
  lowFodmap: boolean
  occasions: string[]
  sustainable: boolean
  vegan: boolean
  vegetarian: boolean
  veryHealthy: boolean
  veryPopular: boolean
  whole30?: boolean
  weightWatcherSmartPoints: number
  dishTypes: RecipeDishTypes[] | string[]
  extendedIngredients: RecipeIngredient[]
  summary: string
  winePairing: {
    pairedWines?: string[]
    pairingText?: string
    productMatches?: Product[]
  }
}

export type RecipeIngredient = {
  aisle: string | null
  amount: number
  consitency?: string
  id: number
  image: string | null
  measures: {
    metric: Measurement
    us: Measurement
  }
  meta: string[]
  name: string
  original: string
  originalName: string
  unit: string
}

export type Measurement = {
  amount: number
  unitLong: string
  unitShort: string
}

export type Product = {
  id: number
  title: string
  description: string
  price: string
  imageUrl: string
  averageRating: number
  ratingCount: number
  score: number
  link: string
}

export enum RecipeDishTypes {
  MAIN_COURSE = 'main course',
  SIDE_DISH = 'side dish',
  DESSERT = 'dessert',
  APPETIZER = 'appetizer',
  SALAD = 'salad',
  BREAD = 'bread',
  BREAKFAST = 'breakfast',
  SOUP = 'soup',
  BEVERAGE = 'beverage',
  SAUCE = 'sauce',
  MARINADE = 'marinade',
  FINGER_FOOD = 'fingerfood',
  SNACK = 'snack',
  DRINK = 'drink',
}

export type RecipeInstructions = {
  name: string
  steps: RecipeInstructionStep[]
}

export type RecipeInstructionStep = {
  number: number
  step: string
  ingredients: Ingredient[]
  equipment: Equipment[]
}

export type Ingredient = {
  id: number
  name: string
  localizedName: string
  image: string
}

export type Equipment = {
  id: number
  name: string
  localizedName: string
  image: string
  temperature?: {
    number: number
    unit: string
  }
}
