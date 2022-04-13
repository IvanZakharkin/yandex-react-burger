
const INGIDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';
const ORDERS_URL = 'https://norma.nomoreparties.space/api/orders';

const request = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  if(!data.success) {
      throw new Error('При загрузке данных произошла ошибка');
  }

  return data;
}

export const getIngredientsListRequest = async () => {
  const data = await request(INGIDIENTS_URL);
  return data.data;
}

export const placeOrderRequest = async (ingredientIds) => {
  const body = JSON.stringify({ ingredients: ingredientIds });
  const data = await request(ORDERS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
  });

  return data.order;
}