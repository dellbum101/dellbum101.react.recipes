import { useContext } from 'react'
import RecipeCard from '../components/RecipeCard'
import RecipeSearchBar from '../components/RecipeSearchBar'
import { RecipeSearchContext } from '../src/context/RecipeSearchContext'

const RecipeSearch = () => {
  const { recipes } = useContext(RecipeSearchContext)

  if (!recipes) {
    return null
  }

  console.log('Recipes: ', recipes)

  return (
    <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
      <div className="p-5 flex flex-row">
        <RecipeSearchBar />
      </div>

      <div className="flex flex-grow overflow-auto pb-10">
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {recipes
            .sort((a, b) => a.title.localeCompare(b.title))
            .slice(0, 15)
            .map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
            ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeSearch
