import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ingredientPropTypes } from '../../types';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { SET_DETAIL_INGREDIENT } from '../../services/actions/builder';

const BurgerIngredientsByType = React.forwardRef(({ type, ingredients, title }, ref) => {
  const listStyle = cn('pr-4 pl-4', styles.list);
  const dispatch = useDispatch();
  const setIngredientDetail = useCallback(ingredient => dispatch({ type: SET_DETAIL_INGREDIENT, ingredient}), [dispatch]);

  if(ingredients.length === 0) {
    return null;
  }

  return (
    <div className='mb-10' data-type={type} ref={ref}>
      <div className='text text_type_main-medium mb-8'>{title}</div>
      <ul className={listStyle}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            image={ingredient.image}
            price={ingredient.price}
            title={ingredient.name}
            id={ingredient._id}
            onClick={() => setIngredientDetail(ingredient)}
          />
        ))}
      </ul>
    </div>
  )
});

BurgerIngredientsByType.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  type: PropTypes.string.isRequired
};

export default BurgerIngredientsByType;
