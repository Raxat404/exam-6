import React from 'react'
import axios from 'axios'
import './SearchForm.scss'
import { MealContext } from '../../App'

const SearchBar = () => {
  const { dispatch } = React.useContext(MealContext)
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    dispatch({ type: 'FETCH_MEALS_REQUEST' })

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
      dispatch({ type: 'FETCH_MEALS_SUCCESS', payload: response.data.meals })
    } catch (error) {
      dispatch({ type: 'FETCH_MEALS_FAILURE', payload: error.message })
    }
  }

  return (
    <div className='search-container'>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
    </div>
  )
}

export default SearchBar
