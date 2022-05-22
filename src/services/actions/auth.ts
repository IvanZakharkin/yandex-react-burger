import {
  registerRequest,
  authRequest,
  forgorPasswordRequest,
  resetPasswordRequest,
  getUserRequest,
  updateUserRequest,
  logoutRequest
} from '../../api';

import { TUser, TResetPassword } from '../../types'

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const UPDATE_USER = 'UPDATE_USER';

export const CLEAR_ERROR = 'CLEAR_ERROR';


export function register(form:TUser & { password:string }) {
  return function (dispatch: (arg0: { type: string; payload?: { user: TUser; }; error?: any; }) => void) {
    dispatch({
      type: REGISTRATION_REQUEST
    });

    return registerRequest(form)
      .then((user) => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: {
            user
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_ERROR,
          error: err.message
        });
      });
  };
}

export function auth(form:Pick<TUser, 'email'> & { password:string }) {
  return function (dispatch: (arg0: { type: string; payload?: { user: TUser; }; error?: any; }) => void) {
    dispatch({
      type: AUTH_REQUEST
    });

    return authRequest(form)
      .then((user) => {
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            user
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
          error: err.message
        });
      });
  };
}

export function forgotPassword(form:Pick<TUser, 'email'>) {
  return function (dispatch: (arg0: { type: string; error?: any; }) => void) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });

    return forgorPasswordRequest(form)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        });

        return true;
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_ERROR,
          error: err.message
        });

        return false;
      });
  };
}

export function resetPassword(form:TResetPassword) {
  return function (dispatch: (arg0: { type: string; error?: any; }) => void) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });

    return resetPasswordRequest(form)
      .then(() => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });

        return true;
      })
      .catch((err) => {
        dispatch({
          type: RESET_PASSWORD_ERROR,
          error: err.message
        });

        return false;
      });
  };
}

export function getUser() {
  return function (dispatch: (arg0: { type: string; payload: { user: TUser; }; }) => void) {
    return getUserRequest().then((user) => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          user
        }
      });

      return true;
    });
  };
}

export function updateUser(form:TUser & { password:string }) {
  return function (dispatch: (arg0: { type: string; payload: { user: TUser; }; }) => void) {
    return updateUserRequest(form).then((user) => {
      dispatch({
        type: UPDATE_USER,
        payload: {
          user
        }
      });

      return true;
    });
  };
}

export function logout() {
  return function (dispatch: (arg0: { type: string; error?: any; }) => void) {
    dispatch({
      type: LOG_OUT_REQUEST
    });

    return logoutRequest()
      .then(() => {
        dispatch({
          type: LOG_OUT_SUCCESS
        });

        return true;
      })
      .catch((err) => {
        dispatch({
          type: LOG_OUT_ERROR,
          error: err.message
        });

        return false;
      });
  };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}
