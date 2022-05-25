export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TСonstructorIngredient = TIngredient & {
  id: string;
}

export type TUser = {
  name: string;
  email: string;
};

export type TAllUserData = {
  password: string;
} & TUser;

export type TResetPassword = {
  password: string;
  token: string;
}

export enum DND_TYPES {
  INGREDIENT = 'ingredient',
  CONSTRUCTOR_ITEM = 'constructor-item',
};

export type TDragIngredient = Pick<TСonstructorIngredient, 'id'>

export type TOrder = {
  number: number
}

export enum TYPES_FIELDS {
  text = 'text',
  password = 'password',
  email = 'email'
}

export enum TYPES_INGREDIENTS {
  bun = 'bun',
  sauce = 'sauce',
  main = 'main'
}