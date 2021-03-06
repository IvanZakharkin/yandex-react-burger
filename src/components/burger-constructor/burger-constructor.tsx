import { useMemo } from 'react';
import {
  Button,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import styles from './burger-constructor.module.css';
import cn from 'classnames';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addConstructorItem, placeOrder } from '../../services/actions/builder';
import BeatLoader from 'react-spinners/BeatLoader';
import { useHistory } from 'react-router-dom';
import { T–°onstructorIngredient, DND_TYPES, TDragIngredient } from '../../types';

const BurgerConstructor = () => {
  const ingredients: Array<T–°onstructorIngredient> = useSelector((state: any) => state.builder.items);
  const orderRequest = useSelector((state: any) => state.builder.orderRequest);
  const orderError = useSelector((state: any) => state.builder.orderError);
  const user = useSelector((state: any) => state.auth.user);

  const history = useHistory();

  const bun = ingredients.find((ingredient) => ingredient.type === 'bun');
  const otherIngredients = ingredients.filter(
    (ingredient) => ingredient.type !== 'bun'
  );

  const totalPrice = useMemo(() => {
    return ingredients.reduce(
      (acc, el) =>
        el.type === 'bun' ? (acc += el.price * 2) : (acc += el.price),
      0
    );
  }, [ingredients]);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: DND_TYPES.INGREDIENT,
    drop(item: TDragIngredient) {
      dispatch(addConstructorItem(item.id));
    }
  });

  const noBun = ingredients.length && !bun;
  const toOrder = (): void => {
    if (!user) {
      history.replace({
        pathname: '/login'
      });
      return;
    }

    if (noBun || orderRequest) {
      return;
    }

    dispatch(placeOrder(ingredients.map((el) => el._id)));
  };

  return (
    <section className={cn('pt-25', styles['constructor-section'])}>
      <div
        className={cn(
          styles['constructor-content'],
          !ingredients.length ? styles['constructor-content--empty'] : ''
        )}
        ref={dropTarget}
      >
        {bun && (
          <BurgerConstructorElement
            type="top"
            isLocked={true}
            price={bun.price}
            image={bun.image}
            text={`${bun.name} (–≤–Ķ—Ä—Ö)`}
            id={bun.id}
            className="pb-4"
          />
        )}
        <div className={styles['scroll-list']}>
          {otherIngredients.map((ingredient, index) => {
            const style = index === otherIngredients.length - 1 ? '' : 'pb-4';
            return (
              <BurgerConstructorElement
                key={ingredient.id}
                id={ingredient.id}
                price={ingredient.price}
                text={ingredient.name}
                image={ingredient.image}
                className={style}
              />
            );
          })}
        </div>
        {bun && (
          <BurgerConstructorElement
            type="bottom"
            isLocked={true}
            price={bun.price}
            image={bun.image}
            text={`${bun.name} (–Ĺ–ł–∑)`}
            id={bun.id}
            className="pt-4"
          />
        )}
        {!!orderError && <div className="mt-4">{orderError}</div>}
        {!!noBun && <div className="mt-4">–ü–ĺ–∂–į–Ľ—É–Ļ—Ā—ā–į, –≤—č–Ī–Ķ—Ä–ł—ā–Ķ –Ī—É–Ľ–ļ—É</div>}
        {!!totalPrice && (
          <div className={cn('mt-4', styles.total)}>
            <div
              className={cn(
                'text text_type_digits-medium mr-8',
                styles['total-price']
              )}
            >
              <span className="mr-2">{totalPrice}</span>
              <span className={styles['total-icon']}>
                <CurrencyIcon type="primary" />
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={toOrder}
              disabled={noBun || orderRequest}
            >
              {orderRequest ? (
                <BeatLoader loading={true} color="#ffffff" size={10} />
              ) : (
                '–ě—Ą–ĺ—Ä–ľ–ł—ā—Ć –∑–į–ļ–į–∑'
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
