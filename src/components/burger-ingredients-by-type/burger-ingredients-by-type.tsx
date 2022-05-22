import React from 'react';
import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import cn from 'classnames';
import { TIngredient, TYPES_INGREDIENTS } from '../../types'

type TProps = {
  title: string;
  ingredients: Array<TIngredient>;
  type: TYPES_INGREDIENTS;
};

const BurgerIngredientsByType = React.forwardRef<HTMLDivElement, TProps>(
  ({ type, ingredients, title }, ref) => {
    const listStyle = cn('pr-4 pl-4', styles.list);

    if (ingredients.length === 0) {
      return null;
    }

    return (
      <div className="mb-10" data-type={type} ref={ref}>
        <div className="text text_type_main-medium mb-8">{title}</div>
        <ul className={listStyle}>
          {ingredients.map((ingredient) => (
            <BurgerIngredient
              key={ingredient._id}
              image={ingredient.image}
              price={ingredient.price}
              title={ingredient.name}
              id={ingredient._id}
            />
          ))}
        </ul>
      </div>
    );
  }
);

export default BurgerIngredientsByType;
