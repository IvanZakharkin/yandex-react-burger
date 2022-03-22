import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import cn from 'classnames';

const BurgerIngredientsByType = (props) => {
  const { type, ingredients, title } = props;

  if(ingredients.length === 0) {
    return null;
  }

  const listStyle = cn('pt-6 pr-4 pl-4', styles.list);

  return (
    <div className='pt-10' data-type={type}>
      <div className='text text_type_main-medium'>{title}</div>
      <ul className={listStyle}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            key={ingredient._id}
            image={ingredient.image}
            price={ingredient.price}
            title={ingredient.name}
          />
        ))}
      </ul>
    </div>
  )
};

export default BurgerIngredientsByType;