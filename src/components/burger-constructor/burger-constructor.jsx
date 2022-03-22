import React from "react";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import cn from 'classnames';

class BurgerConstructor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ingredients } = this.props;

    const constructorStyle = cn('pt-25 pb-5', styles.constructor);

    const bunIndex = ingredients.findIndex((ingredient) => ingredient.type === 'bun');

    if(bunIndex == -1) {
      return null;
    }

    const bun = ingredients[bunIndex];
    const otherIngredients = [...ingredients];
    otherIngredients.splice(bunIndex, 1);

    const bunComponentProps = {
      isLocked: true,
      price: bun.price,
      text: bun.name,
      thumbnail: bun.image,
    };

    const stylesIngredient = cn('pb-4', styles.ingredient);



    return (
      <section className={constructorStyle}>
        <div className={stylesIngredient}>
        <button className={styles['drag-button']} />
          <ConstructorElement 
            type="top"
            className="test"
            {...bunComponentProps}
          />
        </div>
        <div>
          {otherIngredients.map((ingredient) => (
            <div className={stylesIngredient}>
              <button className={styles['drag-button']}>
                <DragIcon type="secondary" />
              </button>
              <ConstructorElement
                key={ingredient._id}
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </div>
          ))}
        </div>
        <div className={stylesIngredient}>
          <button className={styles['drag-button']} />
          <ConstructorElement 
            type="bottom" 
            {...bunComponentProps}
          />
        </div>
      </section>
    )
  }
}

export default BurgerConstructor; 