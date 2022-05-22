import styles from './burger-ingredient.module.css';
import {
  Counter,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { DND_TYPES, TСonstructorIngredient } from '../../types';

type TIngredientProps = Pick<TСonstructorIngredient, 'image' | 'price' | 'id'> & {
  title: string;
  type?: 'top' | 'bottom' | undefined;
  className?: string;
  isLocked?: boolean;
};

const BurgerIngredient = (props: TIngredientProps) => {
  const { image, price, title, id } = props;
  const location = useLocation();

  const items: Array<TСonstructorIngredient> = useSelector((state: any) => state.builder.items);
  const count = items.filter((item) => item._id === id).length;

  const [, ref] = useDrag({
    type: DND_TYPES.INGREDIENT,
    item: () => {
      return { id };
    }
  });

  return (
    <Link
      className={styles.ingredient}
      to={{
        pathname: `/ingredients/${id}`,
        state: { background: location }
      }}
      ref={ref}
    >
      {!!count && (
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      )}
      <img src={image} alt={title} className={cn('mb-2', styles.image)} />
      <div className={cn('text_type_digits-default mb-2', styles.price)}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.title}>{title}</div>
    </Link>
  );
};

export default BurgerIngredient;
