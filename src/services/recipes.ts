import axios from 'axios';
import { Recipe } from '../types'
const baseURL = '/api/recipes'
type NewRecipe = Omit<Recipe, '_id'>


export const createRecipe = async (recipe: NewRecipe, userToken: string): Promise<Recipe> => {
    const response = await axios.post(baseURL, recipe, { headers: {Authorization: `Bearer ${userToken}`}})
    return response.data
}

export const getRecipes = async (): Promise<Recipe[]> => {
    const response = await axios.get(baseURL)
    return response.data
}

export const getRecipe = async (id: string): Promise<Recipe> => {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data[0]
}

export const rateRecipe = async (recipeId: string, userToken: string, rating: number): Promise<void> => {
    await axios.post(`${baseURL}/${recipeId}/rate`, {rating: rating}, { headers: {Authorization: `Bearer ${userToken}`}})
}