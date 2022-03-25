import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';
import cn from 'classnames';

import { ingredientPropTypes } from '../../types';

const BurgerConstructor = (props) => {
  const { ingredients } = props;

  const [modalIsVisible, setModalIsVisible] = React.useState(false);

  const closeModal = () => setModalIsVisible(false);
  const openModal = () => setModalIsVisible(true);

  const bunIndex = ingredients.findIndex((ingredient) => ingredient.type === 'bun');

  if(bunIndex === -1) {
    return null;
  }

  const bun = ingredients[bunIndex];
  const otherIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');
  const bunComponentProps = {
    isLocked: true,
    price: bun.price,
    thumbnail: bun.image,
  };

  const totalPrice = otherIngredients.reduce((acc, el) => acc += el.price, bun.price * 2)

  return (
    <section className={cn('pt-25', styles['constructor-section'])}>
      <div className={cn('pb-4', styles.ingredient)}>
        <button className={styles['drag-button']} />
        <div className="pr-4"></div>
        <div className={styles['constructor-element']}>
          <ConstructorElement 
            type="top"
            className="test"
            {...bunComponentProps }
            text={`${bun.name} (верх)`}
          />
        </div>
      </div>
      <div className={styles['scroll-list']}>
        {otherIngredients.map((ingredient, index) => {
          const style = index === otherIngredients.length - 1 ? styles.ingredient : cn('pb-4', styles.ingredient);
          return (<div className={style} key={ingredient._id}>
            <button className={styles['drag-button']}>
              <DragIcon type="secondary" />
            </button>
            <div className="pr-4"></div>
            <div className={styles['constructor-element']}>
              <ConstructorElement
                key={ingredient._id}
                price={ingredient.price}
                text={ingredient.name}
                thumbnail={ingredient.image}
              />
            </div>
          </div>)
        }
        )}
      </div>
      <div className={cn('pt-4', styles.ingredient)}>
        <button className={styles['drag-button']} />
        <div className="pr-4"></div>
        <div className={styles['constructor-element']}>
          <ConstructorElement 
            type="bottom" 
            {...bunComponentProps}
            text={`${bun.name} (низ)`}
          />
        </div>
      </div>
      <div className={cn('mt-4', styles.total)}>
        <div className={cn('text text_type_digits-medium mr-8', styles['total-price'])}>
          <span className="mr-2">{totalPrice}</span>
          <span className={styles['total-icon']}>
            <CurrencyIcon type="primary" />
          </span>
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Нажми на меня
        </Button>
      </div>
      {modalIsVisible &&
        <Modal onClose={closeModal}>
          <OrderDetails id={14124124} />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerConstructor; 
