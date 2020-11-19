import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export function addIngredient(ingredientName) {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredient: ingredientName,
    },
  };
}

export function removeIngredient(ingredientName) {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredient: ingredientName,
    },
  };
}

export function setIngredients(ingredients) {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: {
      ingredients,
    },
  };
}

export function setError(error) {
  return {
    type: actionTypes.SET_ERROR,
    payload: {
      error: true,
    },
  };
}

export function initIngredients() {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => dispatch(setIngredients(response.data)))
      .catch(() => dispatch(setError(true)));
  };
}
