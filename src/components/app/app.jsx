import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import OrderDetails from '../order-details/order-details'
import styles from './app.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDetailIngredient, resetOrder } from '../../services/actions/builder';

const App = () => {
  const { order, detailIngredient } = useSelector(state => ({
    order: state.builder.order,
    detailIngredient: state.builder.detailIngredient,
  }));

  const dispatch = useDispatch();

  const onCloseModal = () => dispatch(deleteDetailIngredient());

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        <main className={styles.main}>
          <div className={styles['constructor-page']}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
              {detailIngredient && 
                <Modal 
                  onClose={onCloseModal}
                  title="Детали ингридиента"
                >
                  <IngredientDetails
                    detailIngredient={detailIngredient}
                  />
                </Modal>
              }
              {order &&
                <Modal onClose={() => dispatch(resetOrder())}>
                  <OrderDetails id={order.number} />
                </Modal>
              }
            </div>
        </main>
      }
    </div>
  )
}

export default App; 
