import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  GetAllIngredients,
  GetAllRecipes,
  SearchReceipeResult,
  SearchRecipes,
} from '../apis/spoonacular'
import {
  Recipe,
  RecipeCuisineTypes,
  RecipeDietTypes,
  RecipeDishTypes,
  RecipeIngredient,
} from '../apis/spoonacular.types'
import DietaryPills from '../components/DietaryPills'
import NavBar from '../components/NavBar'
import PopUpMenu from '../components/PopUpMenu'
import RecipeSearchBar, {
  RecipeSearchFilter,
} from '../components/RecipeSearchBar'
import styles from '../styles/Home.module.css'

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
  const [isFilterDirty, setIsFilterDirty] = useState(false)

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
    setIsFilterDirty(false)
  }, [filter, allRecipes, isFilterDirty])

  if (!recipes) {
    return null
  }

  return (
    <>
      <NavBar />

      <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <div className="p-5 flex flex-row">
          <RecipeSearchBar
            allIngredients={allIngredients}
            onFilterChnage={setFilter}
          />
        </div>

        <div className="flex flex-grow overflow-auto pb-10">
          <div className="flex flex-row flex-wrap">
            {recipes
              .sort((a, b) => (a.title < b.title ? -1 : 1))
              .map((recipe) => (
                <div className="basis-1/4" key={recipe.id}>
                  <div className={styles.card}>
                    <Link href={`/recipe/${recipe.id}`}>
                      <a>
                        <img
                          className="object-cover w-full h-44 mx-auto"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                        <div className="grid content-center h-16 overflow-hidden">
                          <h3 className="pt-1 text-xl font-bold text-center">
                            {recipe.title.substring(0, 40) +
                              (recipe.title.length > 37 ? '...' : '')}
                          </h3>
                        </div>
                        <hr className="mt-1 -mx-4" />
                        <div className="rounded-b-xl bg-gray-50 -mx-4 -mb-2 px-2">
                          <div className="text-black h-6 px-2  my-0 text-center">
                            {recipe.cuisines.map((cuisine) => (
                              <span className="mr-3" key={cuisine}>
                                {cuisine}
                              </span>
                            ))}
                          </div>
                          <div className="flex pt-1 pb-2">
                            <div className="flex-grow"></div>
                            <DietaryPills recipe={recipe} />
                            <div className="inline-block h-fit mt-1.5 mx-1 pt-0.5 pb-1 px-2 text-sm text-black border bg-blue-100">
                              500&nbsp;cal
                            </div>
                            <div className="flex-grow"></div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
