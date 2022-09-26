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
  cuisines: RecipeCuisineTypes[] | string[]
  dairyFree: boolean
  diets: RecipeDietTypes[] | string[]
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

export enum RecipeCuisineTypes {
  AFRICAN = 'African',
  AMERICAN = 'American',
  BRITISH = 'British',
  CAJUN = 'Cajun',
  CARIBEAN = 'Caribbean',
  CHINESE = 'Chinese',
  EASTERN_EUROPEAN = 'Eastern European',
  EUROPEAN = 'European',
  FRENCH = 'French',
  GERMAN = 'German',
  GREEK = 'Greek',
  INDIAN = 'Indian',
  IRISH = 'Irish',
  ITALIAN = 'Italian',
  JAPANESE = 'Japanese',
  JEWISH = 'Jewish',
  KOREAN = 'Korean',
  LATIN_AMERICAN = 'Latin American',
  MEDITERRANEAN = 'Mediterranean',
  MEXICAN = 'Mexican',
  MIDDLE_EASTERN = 'Middle Eastern',
  NORDIC = 'Nordic',
  SOUTHERN = 'Southern',
  SPANISH = 'Spanish',
  THAI = 'Thai',
  VIETNAMESE = 'Vietnamese',
}

export enum RecipeDietTypes {
  GLUTEN_FREE = 'Gluten Free',
  KETOGENIC = 'Ketogenic',
  VEGETARIAN = 'Vegetarian',
  LACTO_VEGETARIAN = 'Lacto-Vegetarian',
  OVO_VAGETARIAN = 'Ovo-Vegetarian',
  VEGAN = 'Vegan',
  PESCETARIAN = 'Pescetarian',
  PALEO = 'Paleo',
  PRIMAL = 'Primal',
  LOW_FODMAP = 'Low FODMAP',
  WHOLE30 = 'Whole30',
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
