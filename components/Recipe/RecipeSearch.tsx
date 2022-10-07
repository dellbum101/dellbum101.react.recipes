import { useContext } from 'react'
import RecipeSearchBar from './RecipeSearchBar'
import { RecipeSearchContext } from '../../src/context/RecipeSearchContext'
import { RecipeSearchProvider } from '../../src/providers/RecipeSearchProvider'
import RecipeSearchResults from './RecipeSearchResults'

const RecipeSearch = () => {
  const { recipes } = useContext(RecipeSearchContext)

  if (!recipes) {
    return null
  }

  console.log('Recipes: ', recipes)

  return (
    <RecipeSearchProvider>
      <div className="app container h-screen flex flex-col bg-white mx-auto p-5 rounded overflow-hidden shadow-lg">
        <div className="p-5 flex flex-row">
          <RecipeSearchBar />
        </div>

        <div className="flex flex-grow overflow-auto pb-10">
          <div className="flex flex-row flex-wrap gap-3 justify-center">
            <RecipeSearchResults />
          </div>
        </div>
      </div>
    </RecipeSearchProvider>
  )
}

export default RecipeSearch
