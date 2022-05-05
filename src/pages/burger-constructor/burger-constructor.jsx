import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import styles from './burger-constructor.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteDetailIngredient,
  resetOrder,
} from '../../services/actions/builder';

const ConstructorPage = () => {
  const { order, detailIngredient } = useSelector((state) => ({
    order: state.builder.order,
    detailIngredient: state.builder.detailIngredient,
  }));

  const dispatch = useDispatch();

  const onCloseModal = () => dispatch(deleteDetailIngredient());

  return (
    <div className="page">
      <div className={styles['constructor-page']}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {detailIngredient && (
          <Modal onClose={onCloseModal} title="Детали ингридиента">
            <IngredientDetails detailIngredient={detailIngredient} />
          </Modal>
        )}
        {order && (
          <Modal onClose={() => dispatch(resetOrder())}>
            <OrderDetails id={order.number} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ConstructorPage;
