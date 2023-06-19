import React from 'react'
import SearchBar from './components/SearchForm/SearchForm'
import MealList from './components/MealList/MealList'

export const MealContext = React.createContext()

const initialState = {
  meals: [],
  loading: false,
  error: null,
}

const mealReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MEALS_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_MEALS_SUCCESS':
      return { ...state, meals: action.payload, loading: false }
    case 'FETCH_MEALS_FAILURE':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

const fetchMeals = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    )
    console.log(response.data.meals)
    return response.data.meals
  } catch (error) {
    throw new Error(error.message)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(mealReducer, initialState)

  const handleSearch = async (searchTerm) => {
    dispatch({ type: 'FETCH_MEALS_REQUEST' })

    try {
      const meals = await fetchMeals(searchTerm)
      dispatch({ type: 'FETCH_MEALS_SUCCESS', payload: meals })
    } catch (error) {
      dispatch({ type: 'FETCH_MEALS_FAILURE', payload: error.message })
    }
  }

  return (
    <MealContext.Provider value={{ state, dispatch }}>
      <div className="App w-[80%] mx-auto">
        <SearchBar handleSearch={handleSearch} />
        <MealList />
      </div>
    </MealContext.Provider>
  )
}

export default App