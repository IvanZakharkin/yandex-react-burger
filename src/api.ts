import Token from './token';
import { TIngredient, TUser } from './types';
import { TTokensList } from './token';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

enum ENDPOINTS {
  orders = 'orders',
  ingredients = 'ingredients',
  refreshToken = 'auth/token',
  login = 'auth/login',
  register = 'auth/register',
  logout = 'auth/logout',
  user = 'auth/user',
  forgotPassword = 'password-reset',
  resetPassword = 'password-reset/reset'
}

export type TResponseBody<TData = {}> = {
  success: boolean;
  message?: string;
} & TData;

type TUserDataResponse = {
  user: TUser;
} & TTokensList;

type TUserDataRequest = TUser & {
  password: string;
}

type TCustomHeaders = {
  authorization?: string;
} & HeadersInit;

const request = async <T>(endpoint: ENDPOINTS, options: RequestInit = {}): Promise<TResponseBody<T>> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data: TResponseBody<T> = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || 'При загрузке данных произошла ошибка');
  }

  return data;
};

const requestWithToken = <T>(endpoint: ENDPOINTS, options: RequestInit & { headers?: TCustomHeaders }): Promise<T> => {
  const token = Token.getHeaderToken();
  if (!token) {
    throw new Error('Token is empty');
  }

  options.headers = options.headers || {};
  options.headers.authorization = Token.getHeaderToken();
  return request(endpoint, options);
};

const requestWithRefresh = async <T>(endpoint: ENDPOINTS, options: RequestInit & { headers?: TCustomHeaders }): Promise<T> => {
  try {
    return await requestWithToken(endpoint, options);
  } catch (err) {
    if (!Token.checkErrorOnExpired(err as Error)) {
      return Promise.reject(err);
    }
    await Token.refresh();

    return await requestWithToken(endpoint, options);
  }
};

export const getIngredientsListRequest = async (): Promise<Array<TIngredient>> => {
  const data: TResponseBody<{ data: Array<TIngredient> }> = await request(ENDPOINTS.ingredients);
  return data.data;
};

export const placeOrderRequest = async (ingredientIds: Array<TIngredient['_id']>): Promise<number> => {
  const body = JSON.stringify({ ingredients: ingredientIds });
  const data: TResponseBody<{ order: number }> = await request(ENDPOINTS.orders, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
  });

  return data.order;
};

export const registerRequest = async ({ email, password, name }: TUserDataRequest): Promise<TUser> => {
  const data: TResponseBody<TUserDataResponse> = await request(ENDPOINTS.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password, name })
  });
  Token.updateTokens(data);

  return data.user;
};

export const authRequest = async ({ email, password }: Pick<TUser, 'email'> & { password: string }): Promise<TUser> => {
  const data: TResponseBody<TUserDataResponse> = await request(ENDPOINTS.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, password })
  });
  Token.updateTokens(data);

  return data.user;
};

export const refreshTokenRequest = (refreshToken: string): Promise<TResponseBody<TTokensList>> => {
  return request(ENDPOINTS.refreshToken, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: `${refreshToken}`
    })
  });
};

export const logoutRequest = async (): Promise<boolean> => {
  await request(ENDPOINTS.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: `${Token.getRefresh()}`
    })
  });

  Token.deleteTokens();
  return true;
};

export const forgorPasswordRequest = async ({ email }: Pick<TUser, 'email'>): Promise<boolean> => {
  const data: TResponseBody = await request(ENDPOINTS.forgotPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email })
  });

  return data.success;
};

export const resetPasswordRequest = ({ password, token }: { password: string, token: string }) => {
  return request(ENDPOINTS.resetPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ password, token })
  });
};

export const getUserRequest = async () => {
  const data: TResponseBody<{ user: TUser }> = await requestWithRefresh(ENDPOINTS.user, {
    method: 'GET'
  });
  return data.user;
};

export const updateUserRequest = async ({ email, name, password }: TUserDataRequest) => {
  const data: TResponseBody<{ user: TUser }> = await requestWithRefresh(ENDPOINTS.user, {
    method: 'PATCH',
    headers: {
      authorization: Token.getHeaderToken(),
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email, name, password })
  });

  return data.user;
};
