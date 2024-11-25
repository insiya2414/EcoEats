// GenerateRecipes.js
import { useState } from "react";
import './GenerateRecipes.css';
import axios from 'axios';


const GenerateRecipes = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const searchRecipes = async () => {
      setIsLoading(true);
      setError(null);
      
    //first api call to find by ingredients
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/recipes/findByIngredients',
        {
          params: {
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
            ingredients: ingredients.join(','),
            number: 10,
            ranking: 1,
            ignorePantry: true,
            sort: 'max-used-ingredients',
            limitLicense: false,
            fillIngredients: true
          }
        }
      );
      const filteredRecipes = response.data.filter(recipe => 
        recipe.usedIngredientCount > 0
      );
      setRecipes(filteredRecipes);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch recipes');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
    };

  // Second API call to get detailed recipe information
  const getRecipeDetails = async (recipeId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
          }
        }
      );
      setSelectedRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsLoading(false);
    }
  };

    const addIngredient = (e) => {
      e.preventDefault();
      if (currentIngredient.trim()) {
        setIngredients([...ingredients, currentIngredient.trim()]);
        setCurrentIngredient('');
      }
    };
  
    const removeIngredient = (index) => {
      setIngredients(ingredients.filter((_, i) => i !== index));
    };
  
    return (
      <div className="recipe-search-container">
        <h2 id = "title-ing-recipe">Search Recipes by Ingredients</h2>
        
        <div className="ingredient-input-section">
          <form onSubmit={addIngredient}>
            <input
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              placeholder="Enter an ingredient"
              className="ingredient-input"
            />
            <button type="submit" className="add-ingredient-btn">
              Add Ingredient
            </button>
          </form>
        </div>
  
        <div className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-tag">
              {ingredient}
              <button 
                onClick={() => removeIngredient(index)}
                className="remove-ingredient-btn"
              >
                ×
              </button>
            </div>
          ))}
        </div>
  
        <button 
          onClick={searchRecipes} 
          className="search-recipes-btn"
          disabled={ingredients.length === 0 || isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Recipes'}
        </button>
  
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
  
        {isLoading && <div className="loading">Loading recipes...</div>}
  
        <div className="recipes-grid">
  {recipes.map(recipe => (
    <div 
      key={recipe.id} 
      className="recipe-card"
      onClick={() => getRecipeDetails(recipe.id)}
    >
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <div className="recipe-details">
        <p>Used ingredients: {recipe.usedIngredientCount}</p>
        <p>Missing ingredients: {recipe.missedIngredientCount}</p>
      </div>

      {selectedRecipe && selectedRecipe.id === recipe.id && (
        <div className="recipe-expanded-details">
          <h4>Instructions:</h4>
          <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />
          
          <h4>Ingredients Needed:</h4>
          <ul>
            {selectedRecipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.original}</li>
            ))}
          </ul>

          <div className="recipe-meta">
            <p>Cooking Time: {selectedRecipe.readyInMinutes} minutes</p>
            <p>Servings: {selectedRecipe.servings}</p>
          </div>
        </div>
      )}
    </div>
  ))}
</div>

      </div>
    );
  };
  
  export default GenerateRecipes;
