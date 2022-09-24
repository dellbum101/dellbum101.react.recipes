import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GetRecipe } from '../../apis/spoonacular'
import { Recipe } from '../../apis/spoonacular.types'
import styles from '../../styles/Home.module.css'

export default function Details() {
  const {
    query: { id },
  } = useRouter()

  const [recipe, setRecipe] = useState<Recipe | undefined>()

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
    <div>
      <div className={styles.card} key={recipe.id}>
        <h2>{recipe.title}</h2>
        {recipe.image && <img src={recipe.image} alt={recipe.title} />}
      </div>
      <div key={recipe.id}>
        <h2>Ingredients</h2>
        <table className={styles.table}>
          <thead>
            <th></th>
            <th>Name</th>
            <th>amount</th>
            <th>unit</th>
          </thead>
          <tbody>
            {recipe.extendedIngredients.map((ingredient) => (
              <tr key={ingredient.id}>
                <td>
                  <img
                    src={
                      ' https://spoonacular.com/cdn/ingredients_100x100/' +
                        ingredient.image ?? undefined
                    }
                    alt={ingredient.name}
                  />
                </td>
                <td>{ingredient.name}</td>
                <td>{ingredient.amount}</td>
                <td>{ingredient.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
