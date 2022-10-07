import NavBar from '../components/NavBar'
import RecipeSearch from '../components/Recipe/RecipeSearch'

const Home = () => {
  return (
    <>
      <NavBar currentPage="home" />

      <RecipeSearch />
    </>
  )
}

export default Home
