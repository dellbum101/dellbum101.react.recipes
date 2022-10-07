import React, { useContext } from 'react'
import { RecipeSearchContext } from '../../src/context/RecipeSearchContext'
import RecipeCard from './RecipeCard'

type Props = {}

const RecipeSearchResults = (props: Props) => {
  const { recipes } = useContext(RecipeSearchContext)

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id}></RecipeCard>
      ))}
    </>
  )
}

export default RecipeSearchResults
