import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';

const BurgerIngredient = (props) => {
  const { image, price, title } = props;

  const priceStyle = cs('text_type_digits-default p-1', styles.price);

  return (
    <div className={styles.ingredient}>
      <div className={styles.counter}>
        <Counter count={1} size="default" />
      </div>
      <img src={image} alt={title} className={styles.image} />
      <div className={priceStyle}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  )
};

export default BurgerIngredient;
