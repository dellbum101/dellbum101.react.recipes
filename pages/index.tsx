import NavBar from '../components/NavBar'
import RecipeSearch from '../components/RecipeSearch'
import { RecipeSearchProvider } from '../src/providers/RecipeSearchProvider'

const Home = () => {
  return (
    <>
      <NavBar currentPage="home" />

      <RecipeSearchProvider>
        <RecipeSearch />
      </RecipeSearchProvider>
    </>
  )
}

export default Home
