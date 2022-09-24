import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  GetAllRecipes,
  SearchReceipeResult,
  SearchRecipes,
} from '../apis/spoonacular'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  return {
    props: {
      recipes: await SearchRecipes('chicken'),
      allRecipes: await GetAllRecipes(),
    },
  }
}

const Home = ({ recipes }: { recipes: SearchReceipeResult }) => {
  return (
    <div>
      {recipes.results.map((recipe) => (
        <div className={styles.card} key={recipe.id}>
          <Link href={`/recipe/${recipe.id}`}>
            <a>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
