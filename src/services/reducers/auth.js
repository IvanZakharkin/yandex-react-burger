import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_USER,
  CLEAR_ERROR,
} from '../actions/auth';

const initialState = {
  user: null,
  request: false,
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
    case AUTH_REQUEST: {
      return {
        ...state,
        request: true,
        error: '',
      };
    }
    case REGISTRATION_SUCCESS:
    case AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        request: false,
        error: '',
      };
    }
    case REGISTRATION_ERROR:
    case AUTH_ERROR: {
      return {
        ...state,
        request: false,
        error: action.error,
        user: null
      };
    }

    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case LOG_OUT_REQUEST:
      return {
        ...state,
        request: true,
        error: '',
      };

    case RESET_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        request: false,
        error: '',
      };

    case RESET_PASSWORD_ERROR:
    case FORGOT_PASSWORD_ERROR:
    case LOG_OUT_ERROR:
      return {
        ...state,
        request: false,
        error: action.error,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
      }

    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      }

    default: {
      return state;
    }

  }
};
