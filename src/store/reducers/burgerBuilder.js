import { DEFAULT_COST } from "../../containers/BurgerBuilder/BurgerBuilder";
import * as actionTypes from "../actions/actionsTypes";

const initialState = {
  ingredients: null,
  totalPrice: DEFAULT_COST,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] + 1,
        },
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] - 1,
        },
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.payload.ingredients.salad,
          cheese: action.payload.ingredients.cheese,
          meat: action.payload.ingredients.meat,
          bacon: action.payload.ingredients.bacon,
        },
        totalPrice: DEFAULT_COST,
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
