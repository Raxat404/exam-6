import React from 'react'
import { MealContext } from '../../App'

const SearchResults = () => {
  const { state } = React.useContext(MealContext)

  if (state.loading) {
    return <div>Loading...</div>
  }

  if (state.error) {
    return <div>Error: {state.error}</div>
  }

  return (
    <div>
      {state.meals ? (
        state.meals.map((meal) => (
          <div key={meal.idMeal}>
            <img height={100} width={100} src={meal.strMealThumb} alt={meal.strMeal} />
            <div>{meal.strMeal}</div>
          </div>
        ))
      ) : (
        <div>No meals found.</div>
      )}
    </div>
  );
  
  
}

export default SearchResults
