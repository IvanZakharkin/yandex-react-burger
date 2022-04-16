

import styles from './ingredient-details.module.css';
import cn from 'classnames';
import { ingredientPropTypes } from '../../types';

const IngredientDetails = ( {detailIngredient}) => {
  const { name, image } = detailIngredient;

  const nutritionalValueTitles = {
    calories: 'Калории, ккал',
    proteins: 'Белки, г',
    fat: 'Жиры, г',
    carbohydrates: 'Углеводы, г',
  };

  return (<div className={styles.content}>
      <div className={cn('mb-4', styles.pic)}>
        <img src={image} alt={name} className={styles.img}/>
      </div>
      <div className="text text_type_main-medium mb-8">{name}</div>
      <ul className={styles['nutritional-value']}>
        {
          Object.entries(nutritionalValueTitles).map(([key, title]) => (
            <li className="text text_type_main-default text_color_inactive" key={key}>
              <p>{title}</p>
              <p>{detailIngredient[key] || '-'}</p>
            </li>
          ))
        }
      </ul>
  </div>);
} 

IngredientDetails.propTypes = {
  detailIngredient: ingredientPropTypes,
};

export default IngredientDetails;
