import { getIngredientsListRequest, placeOrderRequest } from '../../api';

export const GET_INGREDIENTS_LIST_REQUEST = 'GET_INGREDIENTS_LIST';
export const GET_INGREDIENTS_LIST_SUCCESS = 'GET_INGREDIENTS_LIST_SUCCESS';
export const GET_INGREDIENTS_LIST_ERROR = 'GET_INGREDIENTS_LIST_ERROR';

export const PLACE_ORDER_REQUEST = 'PLACE_ORDER';
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';
export const RESET_ORDER = 'RESET_ORDER';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';

export const SET_DETAIL_INGREDIENT = 'SET_DETAIL_INGREDIENT';
export const DELETE_DETAIL_INGREDIENT = 'DELETE_DETAIL_INGREDIENT';

export function getIngredientsList() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LIST_REQUEST
    });

    getIngredientsListRequest()
      .then((ingredients) => {
        dispatch({
          type: GET_INGREDIENTS_LIST_SUCCESS,
          ingredients: ingredients
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: GET_INGREDIENTS_LIST_ERROR,
          error: err.message
        });
      })
  };
}

export function placeOrder(ingredients) {
  console.log(ingredients);
  return function(dispatch) {
    dispatch({
      type: PLACE_ORDER_REQUEST
    });

    placeOrderRequest(ingredients)
      .then((order) => {
        dispatch({
          type: PLACE_ORDER_SUCCESS,
          order: order
        });
      })
      .catch((err) => {
        dispatch({
          type: PLACE_ORDER_ERROR,
          error: err.message
        });
      })
  };
}
