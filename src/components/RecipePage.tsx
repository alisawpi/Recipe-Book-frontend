import React, { useState, useEffect } from 'react'
import { Recipe } from '../types'
import { getRecipe } from '../services/recipes'
import { useParams } from 'react-router-dom'
interface RecipePageProps {
    id: string
}
const RecipePage = (): JSX.Element => {
    const [recipe, setRecipe] = useState<Recipe | undefined>()
    const [error, setError] = useState(false)
    const { id } = useParams<RecipePageProps>();
    console.log(id)
    console.log(recipe)

    useEffect(() => {
        getRecipe(id).then(data => setRecipe(data))
            .catch(() => setError(true))
    }, [])
    if (!recipe) {
        return <div>
            Loading...
        </div>
    }
    console.log(recipe.ingredients)
    return (
        <div className='recipe-card container'>
            <h1> {recipe.title} </h1>
            <div>
                <img className='recipe-thumbnail' src='https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt={`Image of recipe.title}`} />
            </div>
            <div>
                {recipe.ingredients.map(ingredient => {
                    return (
                        <li key={ingredient}>
                            {ingredient}
                        </li>
                    )
                })}
            </div>
            <p> {recipe.directions} </p>
            <p> {recipe.creator} </p>
        </div>
    )
}

export default RecipePage