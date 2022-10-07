import { FavoriteBorder, Favorite, PlaylistAdd } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetRecipe } from '../../apis/recipes/spoonacular'
import { Recipe } from '../../apis/recipes/recipe.types'
import DietaryPills from '../../components/DietaryPills'
import NavBar from '../../components/NavBar'
import NutritionalFacts from '../../components/NutritionalFacts'
import RecipeInstructions from '../../components/Recipe/RecipeInstructions'

export default function Details() {
  const {
    query: { id },
  } = useRouter()

  const [recipe, setRecipe] = useState<Recipe | undefined>()
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    async function getRecipe() {
      const recipe = await GetRecipe(parseInt(id as string))
      setRecipe(recipe)
    }

    if (id) {
      getRecipe()
    }
  }, [id])

  if (!recipe) {
    return null
  }

  return (
    <>
      <NavBar currentPage="recipe" />

      <div className="app container bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <Link href={`/`}>
          <a className="inline-block">
            <h3>&lt; Back</h3>
          </a>
        </Link>
        <div className="mt-5 grid grid-cols-6 text-sm">
          <div className="col-span-4">
            <h2 className="text-4xl mb-3">{recipe.title}</h2>
          </div>
          <div className="col-span-2 grid justify-items-end">
            <div>
              <div
                className="inline-block tooltip tooltip-left"
                data-text="Add Recipe To Meal"
              >
                <PlaylistAdd
                  htmlColor="green"
                  fontSize="large"
                  className="hover:scale-125"
                />
              </div>
              <span
                className="inline-block tooltip tooltip-left"
                data-text="Save Recipe To Favorites"
              >
                {favorited ? (
                  <Favorite
                    htmlColor="red"
                    fontSize="large"
                    className="hover:scale-125"
                    onClick={() => {
                      setFavorited(false)
                    }}
                  />
                ) : (
                  <FavoriteBorder
                    htmlColor="red"
                    fontSize="large"
                    className="hover:scale-125"
                    onClick={() => {
                      setFavorited(true)
                    }}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="col-span-6 flex flex-row">
            <div className="flex-none flex-col w-56">
              {recipe.image && (
                <img
                  className="float-left mr-5 mt-2 mb-2 rounded"
                  src={recipe.image}
                  alt={recipe.title}
                />
              )}
              <div className="mb-2 ml-3">
                <DietaryPills recipe={recipe} />
              </div>
              <NutritionalFacts recipe={recipe} />
            </div>
            <div className="flex flex-col mx-6 text-lg" key={recipe.id}>
              <div
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              ></div>
              <RecipeInstructions recipe={recipe} />
            </div>
            <div className="flex-none flex-col w-72">
              <h2 className="text-lg px-1 pb-2">Ingredients</h2>
              <hr className="py-1" />
              {recipe.extendedIngredients.map((ingredient) => (
                <div key={ingredient.id} className="w-full p-1">
                  <div className="flex flex-col lg:flex-row rounded overflow-hidden h-auto lg:h-20">
                    <div className="grid w-20 content-center">
                      <img
                        className="object-contain max-h-20 max-w-20 mx-auto"
                        src={
                          ' https://spoonacular.com/cdn/ingredients_100x100/' +
                            ingredient.image ?? undefined
                        }
                        alt={ingredient.name}
                      />
                    </div>
                    <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col leading-normal">
                      <div className="text-black font-bold text-md mb-0 leading-tight">
                        {ingredient.name}
                      </div>
                      <p className="text-grey-darker text-base">
                        {ingredient.amount} {ingredient.unit}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
