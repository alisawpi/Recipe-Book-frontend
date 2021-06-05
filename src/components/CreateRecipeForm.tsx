import React, { useState } from "react";
import { createRecipe } from '../services/recipes';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../state/store'
import { createMessageAction } from '../state/messageReducer'

const CreateRecipeForm = (): JSX.Element => {
    const [title, setTitle] = useState('')
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([])
    const [direction, setDirection] = useState('')
    const [directions, setDirections] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [cookTime, setCookTime] = useState('')
    const [imgUrl, setImgUrl] = useState<string | undefined>()
    const availableTags = ['breakfast', 'lunch', 'dinner', 'snack', 'vegetarian', 'vegan']
    const cookTimeOptions = ['15', '30', '45', '60', '60+']
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    const addIngredient = () => {
        setIngredients(ingredients.concat(ingredient))
        setIngredient('')
    }
    const addDirection = () => {
        setDirections(directions.concat(direction))
        setDirection('')
    }
    const addTag = (target: EventTarget & HTMLInputElement) => {
        console.log(target.checked)
        console.log(target.value)
        target.checked ? setTags(tags.concat(target.value)) : setTags(tags.filter(tag => tag !== target.value))
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (!title || !ingredients || !directions || !tags || !cookTime) {
            dispatch(createMessageAction({ error: true, text: 'Please fill in all of the fields' }))
            console.log(title, ingredients, directions, tags, cookTime)
            console.log(cookTime)
            return
        }
        if (!user) {
            dispatch(createMessageAction({ error: false, text: 'You must login to create recipes' }))
            return
        }
        const newRecipe = {
            title: title,
            ingredients: ingredients,
            directions: directions,
            cookTime: cookTime,
            tags: tags, 
            imgURL: imgUrl
        }
        const result = await createRecipe(newRecipe, user.token)
        console.log(result)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='recipeform-title'>
                <label htmlFor="title">Title</label>
                <input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
            </div>
            <div className='recipeform-ingredients'>
                <label htmlFor='ingredients'>Ingredients</label>
                <input type='text' value={ingredient} onChange={({ target }) => setIngredient(target.value)} name='ingredients' />
                <button onClick={addIngredient} type="button">add ingredient</button>
                <div>
                    Ingredients added:
                    <ul>
                        {ingredients.map(ingredient => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='recipeform-directions'>
                <label htmlFor='direction'>Direction</label>
                <textarea value={direction} onChange={({ target }) => setDirection(target.value)} name='direction' />
                <button onClick={addDirection} type="button">add direction</button>
                <div>
                    Recipe directions:
                    <ol>
                        {directions.map(direction => (
                            <li key={direction}>{direction}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <div>
                <label htmlFor='cook-time'>Choose the cooking time of your recipe</label>
                <select onChange={({target}) => setCookTime(target.value)}>
                    {cookTimeOptions.map(time => (
                        <option key={time} value={time}>{time} minutes</option>
                    ))}
                </select>
            </div>
            <div className='recipeform-tags'>
                <fieldset>
                    <legend>Choose at least one suitable tag for your recipe</legend>
                    {availableTags.map(tag => (
                        <>
                            <input key={tag} type='checkbox' value={tag} name={tag} onChange={({target}) => addTag(target)}/>
                            <label htmlFor={tag}>{tag}</label>
                        </>
                    ))}
                </fieldset>
            </div>
            <div className='recipe-image'>
                <input type='text' name='recipe-image' value='' onChange={({target}) => setImgUrl(target.value)}/>
                <label htmlFor='recipe-image'>You can enter an URL for an image here</label>
            </div>
                <input type='submit' name='Submit' />
        </form>

    );
}
export default CreateRecipeForm;