import PropTypes from 'prop-types';
import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ingredientPropTypes } from '../../types';
import cn from 'classnames';

const BurgerIngredientsByType = ({ type, ingredients, title, onShowIngredientDetail }) => {
  if(ingredients.length === 0) {
    return null;
  }

  const listStyle = cn('pr-4 pl-4', styles.list);

  return (
    <div className='mt-10' data-type={type}>
      <div className='text text_type_main-medium mb-8'>{title}</div>
      <ul className={listStyle}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            image={ingredient.image}
            price={ingredient.price}
            title={ingredient.name}
            onClick={() => onShowIngredientDetail(ingredient)}
          />
        ))}
      </ul>
    </div>
  )
};

BurgerIngredientsByType.defaultProps = {
  onShowIngredientDetail: () => {}
};

BurgerIngredientsByType.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  onShowIngredientDetail: PropTypes.func,
  type: PropTypes.string.isRequired
};

export default BurgerIngredientsByType;
