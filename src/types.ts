export interface Recipe {
    title: string, 
    ingredients: string[], 
    directions: string[], 
    imgURL: string | undefined,
    _id: string, 
    creator: string,
    rating: number
    cookTime: string
}

export interface Message {
    error?: boolean, 
    text?: string
}

export interface User {
    username: string,
    password: string, 
    token: string
}

export type UserCredentials = Omit<User, 'token'>