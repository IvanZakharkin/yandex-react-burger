import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';

const BurgerIngredient = (props) => {
  const { image, price, title, onClick } = props;

  return (
    <div className={styles.ingredient} onClick={onClick}>
      <div className={styles.counter}>
        <Counter count={1} size="default" />
      </div>
      <img src={image} alt={title} className={cn('mb-2', styles.image)} />
      <div className={cn('text_type_digits-default mb-2', styles.price)}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  )
};

BurgerIngredient.defaultProps = {
  onClick: () => {}
};

BurgerIngredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  title: PropTypes.string,
  onClick: PropTypes.func
};

export default BurgerIngredient;
