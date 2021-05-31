import React, { } from 'react'
import {  Recipe } from '../types'
import { Link } from 'react-router-dom'
import "../styles/RecipeCard.scss"
import { rateRecipe } from '../services/recipes'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import {createMessageAction } from '../state/messageReducer'

interface RecipeCardProps {
    recipe: Recipe
}
const RecipeCard = (props: RecipeCardProps): JSX.Element => {
    const recipe = props.recipe
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    const givenStars = [...Array(Math.round(recipe.rating)).keys()];
    const emptyStars = [...Array(5 - Math.round(recipe.rating)).keys()];

    const handleRateSubmit = async (rating: number) => {
        console.log(`rating ${rating}`)
        console.log(user)
        const recipeId = recipe._id
        if (!user) {
            dispatch(createMessageAction({ error: false, text: 'You must login to rate recipes!' }))
            return
        }
        const userToken = user.token
        await rateRecipe(recipeId, userToken, rating)
    }
    return (
        <div className='card me-2' >
            <Link to={`/recipes/${recipe._id}`}>
                <img className='recipe-thumbnail' src='https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' alt={`Image of recipe.title}`} />
                <h5 className="card-title">{recipe.title}</h5>
            </Link>
            <div className="card-details">
                <div className="card-cook-time">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                    {recipe.time}min
                </div>
                <div className="card-recipe-rating">
                    {givenStars.map(n => {
                        return (
                            <button key={n} onClick={() => handleRateSubmit(n + 1)}>
                                <svg key={n} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </button>
                        )
                    })}
                    {emptyStars.map(n => {
                        return (
                            <button key={n} onClick={() => handleRateSubmit(givenStars.length + n + 1)}>
                                <svg key={n} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                </svg>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RecipeCard