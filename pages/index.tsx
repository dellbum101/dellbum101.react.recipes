import { useEffect, useState } from 'react'
import { GetAllIngredients } from '../apis/recipes/getAllIngredients'
import { GetAllRecipes } from '../apis/recipes/getAllRecipes'
import { Recipe, RecipeIngredient } from '../apis/recipes/recipe.types'
import NavBar from '../components/NavBar'
import RecipeCard from '../components/RecipeCard'
import RecipeSearchBar, {
  RecipeSearchFilter,
} from '../components/RecipeSearchBar'

export async function getServerSideProps() {
  return {
    props: {
      allRecipes: await GetAllRecipes(),
      allIngredients: await GetAllIngredients(),
    },
  }
}

const Home = ({
  allRecipes,
  allIngredients,
}: {
  allRecipes: Recipe[]
  allIngredients: RecipeIngredient[]
}) => {
  const [recipes, setRecipes] = useState<Recipe[] | []>()
  const [filter, setFilter] = useState<RecipeSearchFilter>({
    recipeSearchTerm: '',
    selectedCuisines: new Set([]),
    selectedDiets: new Set([]),
    selectedDishTypes: new Set([]),
    selectedIngredients: new Set([]),
  })

  useEffect(() => {
    async function getRecipes() {
      const recipes = allRecipes.filter((recipe) => {
        return (
          (!filter.recipeSearchTerm ||
            recipe.title.toLowerCase().indexOf(filter.recipeSearchTerm) > -1) &&
          (filter.selectedCuisines.size === 0 ||
            recipe.cuisines.some((cuisine) =>
              filter.selectedCuisines.has(cuisine)
            )) &&
          (filter.selectedDiets.size === 0 ||
            recipe.diets.some((diet) => filter.selectedDiets.has(diet))) &&
          (filter.selectedDishTypes.size === 0 ||
            recipe.dishTypes.some((dishType) =>
              filter.selectedDishTypes.has(dishType)
            )) &&
          (filter.selectedIngredients.size === 0 ||
            recipe.extendedIngredients.some((ingredient) =>
              filter.selectedIngredients.has(ingredient.name)
            ))
        )
      })
      setRecipes(recipes)
    }

    getRecipes()
  }, [filter, allRecipes])

  if (!recipes) {
    return null
  }

  return (
    <>
      <NavBar currentPage="home" />

      <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <div className="p-5 flex flex-row">
          <RecipeSearchBar
            allIngredients={allIngredients}
            onFilterChnage={setFilter}
          />
        </div>

        <div className="flex flex-grow overflow-auto pb-10">
          <div className="flex flex-row flex-wrap gap-3 justify-center">
            {recipes
              .sort((a, b) => (a.title < b.title ? -1 : 1))
              .slice(0, 15)
              .map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
