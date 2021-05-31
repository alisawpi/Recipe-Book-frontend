import React, { useEffect, useState } from 'react'
import { Recipe } from '../types'
import { getRecipes } from '../services/recipes'
import '../styles/RecipeList.scss'
import RecipeCard from './RecipeCard'



const RecipeList = (/*recipes: Recipe[]*/): JSX.Element => {
    const [recipes, setRecipes] = useState<Recipe[] | undefined>()
    const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[] | undefined>()
    const [search, setSearch] = useState<string>("")
    const [error, setError] = useState(false)

    useEffect(() => {
        getRecipes().then(data => {
            setRecipes(data)
            setDisplayedRecipes(data)
        })
            .catch(() => setError(true))
    }, [])

    if (!recipes || !displayedRecipes) {
        return <div>Loading</div>
    }
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (search) {
            console.log('here')
            const results = recipes.filter(r =>
                r.title.toLowerCase().includes(search) || r.ingredients.map(i => i.toLowerCase()).includes(search)
            )
            setDisplayedRecipes(results)
        }
        else setDisplayedRecipes(recipes)
    }
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase())
        if (e.target.value.length < 1) setDisplayedRecipes(recipes)
    }
    /*
      {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) =>
    */
    return (
        <div>
            <h3 className="call-to-action">Find your new favorite recipe!</h3>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleSearch} >
                    <input className="search form-control" type="search" placeholder="Search" aria-label="Search" onChange={handleChangeInput} />
                    <input type="submit" aria-label='Search' hidden />
                </form>
                <button className="search btn btn-outline-success" aria-label='Search'>
                    Filters
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders mx-2" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                    </svg>
                </button>
            </div>
            <h5 className="call-to-action">Here&apos;s what&apos;s trending right now</h5>
            <div className='d-flex justify-content-center'>
            <div className="d-flex justify-content-center recipe-list" style={{ maxWidth: "80%" }}>
                {displayedRecipes.length > 0 ?
                    displayedRecipes.map(recipe => {
                        return (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        )
                    }) : <p>Nothing found with your search, please try something else :(</p>}
            </div>
            </div>
        </div>
    )
}

export default RecipeList