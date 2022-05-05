import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import dndTypes from '../../dnd-types';

const BurgerIngredient = (props) => {
  const { image, price, title, id } = props;
  const location = useLocation();

  const items = useSelector(state => state.builder.items);
  const count = items.filter(item => item._id === id).length;

  const [, ref ] = useDrag({
    type: dndTypes.INGREDIENT,
    item: () => {
      return { id }
    },
  })

  return (
    <Link className={styles.ingredient} to={{
      pathname: `/ingredients/${id}`,
      state: { background: location },
    }} ref={ref}>
      {!!count &&
        <div className={styles.counter}>
          <Counter count={count} size="default" />
        </div>
      }
      <img src={image} alt={title} className={cn('mb-2', styles.image)} />
      <div className={cn('text_type_digits-default mb-2', styles.price)}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.title}>{title}</div>
    </Link>
  )
};

BurgerIngredient.defaultProps = {
  onClick: () => {}
};

BurgerIngredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default BurgerIngredient;
