
import Cookie from './utils/cookie';
import Token from './token';

const BASE_URL = 'https://norma.nomoreparties.space/api/';
const ENDPOINTS = {
  orders: 'orders',
  ingredients: 'ingredients',
  refreshToken: 'auth/token',
  login: 'auth/login',
  register: 'auth/register',
  logout: 'auth/logout',
  user: 'auth/user',
  forgotPassword: 'password-reset',
  resetPassword: 'password-reset/reset'
};

const request = async (endpoint, options) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();

  if(!res.ok || !data.success) {
      throw new Error(data.message || 'При загрузке данных произошла ошибка');
  }

  return data;
}

const requestWithToken = (endpoint, options = {}) => {
  const token = Token.getHeaderToken();
  if(!token) {
    throw new Error('Token is empty')
  }
  options.headers = options.headers || {};
  options.headers.authorization = Token.getHeaderToken();
  return request(endpoint, options);
}

const requestWithRefresh = async (endpoint, options) => {
  try {
    const response = await requestWithToken(endpoint, options);
    return response;
  } catch (err) {
    if (!Token.checkErrorOnExpired(err)) {
      return Promise.reject(err);
    }
    await Token.refresh();
    
    const response = await requestWithToken(endpoint, options);
    return response;
  }
}

export const getIngredientsListRequest = async () => {
  const data = await request(ENDPOINTS.ingredients);
  return data.data;
}

export const placeOrderRequest = async (ingredientIds) => {
  const body = JSON.stringify({ ingredients: ingredientIds });
  const data = await request(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
  });

  return data.order;
}

export const registerRequest = async ({ email, password, name }) => {
  const data = await request(ENDPOINTS.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password, name })
  });
  Token.updateTokens(data);

  return data.user;
};

export const authRequest = async ({ email, password }) => {
  const data = await request(ENDPOINTS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password })
  });
  Token.updateTokens(data);

  return data.user;
};


export const refreshTokenRequest = (refreshToken) => {
  return request(ENDPOINTS.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: `${refreshToken}`
    })
  })
}

export const logoutRequest = async () => {
  await request(ENDPOINTS.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: `${Token.getRefresh()}`
    })
  })

  Token.deleteTokens();
  return true;
}

export const forgorPasswordRequest = async ({ email }) => {
  const data = await request(ENDPOINTS.forgotPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({email})
  })

  return data.success;
}

export const resetPasswordRequest = ({password, token}) => {
  return request(ENDPOINTS.resetPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({password, token})
  })
}

export const getUserRequest = async () => {
  const data = await requestWithRefresh(ENDPOINTS.user, {
    method: 'GET',
  });
  return data.user
}

export const updateUserRequest = async ({email, name, password}) => {
  const data = await requestWithRefresh(ENDPOINTS.user, {
    method: 'PATCH',
    headers: {
      authorization: Token.getHeaderToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({email, name, password})
  });

  return data.user
}
