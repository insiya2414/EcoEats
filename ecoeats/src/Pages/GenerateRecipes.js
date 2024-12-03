// GenerateRecipes.js
import { useState, useEffect } from "react";
//import { useNavigation } from "react-router-dom";
import './GenerateRecipes.css';
import axios from 'axios';
import { getPantryItems } from './PantryItems';
//import { getFunctions, httpsCallable } from 'firebase/functions';


const GenerateRecipes = () => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pantryItems, setPantryItems] = useState([]);
    const [showPantryItems, setShowPantryItems] = useState(false);

    useEffect(() => {
        // Fetch pantry items when the component mounts
        const fetchPantryItems = async () => {
          const items = await getPantryItems();
          setPantryItems(items);
        };
        fetchPantryItems();
      }, []);

    
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

    const addIngredient = (e, pantryItem) => {
      e.preventDefault();
      if(pantryItem) {
      const cleanItem = pantryItem.split('(')[0].trim();
      if (!ingredients.includes(cleanItem)){
        setIngredients([...ingredients, cleanItem]);
      }
    }else if (currentIngredient.trim()) {
        setIngredients([...ingredients, currentIngredient.trim()]);
        setCurrentIngredient('');
      }
    };
  
    const removeIngredient = (index) => {
      setIngredients(ingredients.filter((_, i) => i !== index));
    };
  
    return (

      <div className="recipe-search-container">
  {/* Title Section */}
    <h2 id="title-ing-recipe">Look Up Recipes</h2>
    <img src="/recipe.jpg" alt="Receipt Scanning" />
    <p> Checkout the recipes by clicking on the card! <br></br>
        You can add in your pantry items to create delicious recipes!
    </p>

  {/* Ingredient Input Section */}
  <div className="ingredient-input-container">
    <form onSubmit={(e) => addIngredient(e)}>
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

{/* Pantry Items Section */}
<div className="pantry-items-container">
  <button 
    onClick={() => setShowPantryItems(!showPantryItems)}
    className="toggle-pantry-btn"
  >
    {showPantryItems ? 'Hide Pantry Items' : 'Show Pantry Items'}
  </button>
  
  {showPantryItems && (
    <div className="pantry-items-list">
      {pantryItems.map((item, index) => (
        <button
          key={index}
          onClick={(e) => addIngredient(e, item)}
          className="pantry-item-btn"
        >
          {item.split('(')[0].trim()}
        </button>
      ))}
    </div>
  )}
</div>

  {/* Ingredients List Section */}
  <div className="ingredients-list-container">
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

  {/* Search Button Section */}
  <div className="search-button-container">
  <button
    onClick={searchRecipes}
    className="search-recipes-btn"
    disabled={ingredients.length === 0 || isLoading}
  >
    {isLoading ? 'Searching...' : 'Find Recipes'}
  </button>
</div>

{/* Back Button Section */}
<div className="back-button-container">
      <button onClick={() => window.history.back()} className="back-button">
        &larr; 
      </button>
    </div>

  {/* Error Message Section */}
  {error && (
    <div className="error-message-container">
      <div className="error-message">{error}</div>
    </div>
  )}

  {/* Loading State Section */}
  {isLoading && (
    <div className="loading-container">
      <div className="loading">Loading recipes...</div>
    </div>
  )}

  {/* Recipes Grid Section */}
  <div className="recipes-grid-container">
    <div className="recipes-grid">
      {recipes.map((recipe) => (
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

          {/* Expanded Recipe Details Section */}
          {selectedRecipe && selectedRecipe.id === recipe.id && (
            <div className="recipe-expanded-details">
              <h4>Instructions:</h4>
              <div
                dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}
              />

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

</div>
    )
};
  
  export default GenerateRecipes;
