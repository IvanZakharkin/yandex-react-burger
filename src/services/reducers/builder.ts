import {
  GET_INGREDIENTS_LIST_REQUEST,
  GET_INGREDIENTS_LIST_SUCCESS,
  GET_INGREDIENTS_LIST_ERROR,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  ADD_ITEM,
  DELETE_ITEM,
  MOVE_ITEM,
  SET_DETAIL_INGREDIENT,
  DELETE_DETAIL_INGREDIENT,
  RESET_ORDER
} from '../actions/builder';
import { TIngredient, TСonstructorIngredient } from '../../types'

type TBuilderState = {
  detailIngredient: TIngredient | null;
  order: number | null;
  orderRequest: boolean;
  orderError: string;
  items:Array<TСonstructorIngredient>;
  ingredientsList: ReadonlyArray<TIngredient>;
  ingredientsListRequest: boolean;
  ingredientsListError: string;
};

const initialState:TBuilderState = {
  detailIngredient: null,

  order: null,
  orderRequest: false,
  orderError: '',

  items: [],

  ingredientsList: [],
  ingredientsListRequest: false,
  ingredientsListError: ''
};

export const builderReducer = (state = initialState, action: { type: any; ingredients: any; error: any; order: any; payload: { id?: any; toId?: any; ingredient?: any; ingredientId?: any; itemId?: any; }; }) => {
  switch (action.type) {
    case GET_INGREDIENTS_LIST_REQUEST: {
      return {
        ...state,
        ingredientsListRequest: true,
        ingredientsListError: ''
      };
    }
    case GET_INGREDIENTS_LIST_SUCCESS: {
      return {
        ...state,
        ingredientsList: action.ingredients,
        ingredientsListRequest: false,
        ingredientsListError: ''
      };
    }
    case GET_INGREDIENTS_LIST_ERROR: {
      return {
        ...state,
        ingredientsListRequest: false,
        ingredientsListError: action.error,
        ingredientsList: []
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        order: null,
        items: []
      };
    }
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderError: ''
      };
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderError: ''
      };
    }
    case PLACE_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderError: action.error,
        order: null
      };
    }
    case ADD_ITEM: {
      const { ingredientId, itemId } = action.payload;
      const newItem = {
        ...state.ingredientsList.find((item) => item._id === ingredientId),
        id: itemId
      };
      const newItems =
        newItem.type === 'bun'
          ? state.items.filter((item) => item.type !== 'bun')
          : state.items;

      return {
        ...state,
        items: [...newItems, newItem]
      };
    }
    case DELETE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    }
    case MOVE_ITEM: {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const toItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.toId
      );
      const item = state.items[itemIndex];
      const newItems = [...state.items];
      newItems.splice(itemIndex, 1);
      newItems.splice(toItemIndex, 0, item);
      return {
        ...state,
        items: newItems
      };
    }
    case SET_DETAIL_INGREDIENT: {
      return {
        ...state,
        detailIngredient: action.payload.ingredient
      };
    }
    case DELETE_DETAIL_INGREDIENT: {
      return {
        ...state,
        detailIngredient: null
      };
    }
    default: {
      return state;
    }
  }
};
