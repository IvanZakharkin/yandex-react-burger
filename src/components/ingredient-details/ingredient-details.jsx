import styles from './ingredient-details.module.css';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RingLoader from 'react-spinners/RingLoader';
import { getIngredientsList } from '../../services/actions/builder';

const IngredientDetails = ({ notShowTitle = false }) => {
  const dispatch = useDispatch();

  const { ingredientId } = useParams();
  const detailIngredient = useSelector((state) =>
    state.builder.ingredientsList.find((item) => item._id === ingredientId)
  );
  const ingredientsListRequest = useSelector(
    (state) => state.builder.ingredientsListRequest
  );

  const nutritionalValueTitles = {
    calories: 'Калории, ккал',
    proteins: 'Белки, г',
    fat: 'Жиры, г',
    carbohydrates: 'Углеводы, г'
  };

  useEffect(() => {
    if (!detailIngredient) {
      dispatch(getIngredientsList());
    }
  }, [dispatch, detailIngredient]);

  if (ingredientsListRequest) {
    return (
      <div className={styles.content}>
        <RingLoader size={150} color="#4c4cff" loading={true} />
      </div>
    );
  }

  if (!detailIngredient) {
    return <div className={styles.content}>Ингредиент не найден</div>;
  }

  return (
    <div className={styles.content}>
      {!notShowTitle && (
        <div class="text text_type_main-large mb-6">Детали ингредиента</div>
      )}
      <div className={cn('mb-4 mt-6', styles.pic)}>
        <img
          src={detailIngredient.image}
          alt={detailIngredient.name}
          className={styles.img}
        />
      </div>
      <div className="text text_type_main-medium mb-8">
        {detailIngredient.name}
      </div>
      <ul className={styles['nutritional-value']}>
        {Object.entries(nutritionalValueTitles).map(([key, title]) => (
          <li
            className="text text_type_main-default text_color_inactive"
            key={key}
          >
            <p>{title}</p>
            <p>{detailIngredient[key] || '-'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientDetails;
