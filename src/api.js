
const BASE_URL = 'https://norma.nomoreparties.space/api/';
const ENDPOINTS = {
  orders: 'orders',
  ingredients: 'ingredients',
};

const request = async (endpoint, options) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if(!res.ok) {
    throw new Error('При загрузке данных произошла ошибка');
  }

  const data = await res.json();

  if(!data.success) {
      throw new Error('При загрузке данных произошла ошибка');
  }

  return data;
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