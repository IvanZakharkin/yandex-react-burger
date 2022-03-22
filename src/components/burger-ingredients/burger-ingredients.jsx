import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsByType from '../burger-ingredients-by-type/burger-ingredients-by-type';
import cn from 'classnames';
import styles from './burger-ingredients.module.css';

const TAB_LIST = {
  bun: 'Булки',
  main: 'Начинки',
  sauce: 'Соусы'
};

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ingredients } = this.props;
    const ingredientsByTypes = {
      sauce: ingredients.filter((ingredient) => ingredient.type === 'sauce'),
      main: ingredients.filter((ingredient) => ingredient.type === 'main'),
      bun: ingredients.filter((ingredient) => ingredient.type === 'bun'),
    };
    const types = Object.keys(TAB_LIST);

    return (
      <section className={styles.ingredients}>
        <h2 className="pt-10 pb-5 text text_type_main-large">Соберите бургер</h2>
        <div className={styles.tabs}>
          {types.map((type) => (
            <Tab value={TAB_LIST[type]} key={type}>{TAB_LIST[type]}</Tab>
          ))}
        </div>
        <div>
          {types.map((type) => (
            <BurgerIngredientsByType
              key={type}
              type={type}
              ingredients={ingredientsByTypes[type]}
              title={TAB_LIST[type]}
            />
          ))}
        </div>

      </section>
    )
  }
}

export default BurgerIngredients; 