import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import BurgerIngredientsByType from '../burger-ingredients-by-type/burger-ingredients-by-type';
import styles from './burger-ingredients.module.css';
import { ingredientPropTypes } from '../../types';

const TAB_LIST = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы'
};

const BurgerIngredients = ({ ingredients, onShowIngredientDetail }) => {
  const ingredientsByTypes = {
    sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    main: ingredients.filter((ingredient) => ingredient.type === 'main'),
    bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
  };
  const types = Object.keys(TAB_LIST);

  return (
    <section className={styles['ingredients-section']}>
      <h2 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h2>
      <div className={cn('mb-10', styles.tabs)}>
        {types.map((type) => (
          <Tab 
            value={TAB_LIST[type]} 
            key={type}
            active={type === 'bun'}
          >{TAB_LIST[type]}</Tab>
        ))}
      </div>
      <div className={styles['ingredients-list']}>
        {types.map((type) => (
          <BurgerIngredientsByType
            key={type}
            type={type}
            ingredients={ingredientsByTypes[type]}
            title={TAB_LIST[type]}
            onShowIngredientDetail={onShowIngredientDetail}
          />
        ))}
      </div>

    </section>
  )
}

BurgerIngredients.defaultProps = {
  onShowIngredientDetail: () => {}
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  onShowIngredientDetail: PropTypes.func
};

export default BurgerIngredients; 
