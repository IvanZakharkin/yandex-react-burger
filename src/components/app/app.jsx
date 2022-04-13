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
import { DELETE_DETAIL_INGREDIENT, RESET_ORDER } from '../../services/actions/builder';

const App = () => {
  const { order, detailIngredient } = useSelector(state => ({
    order: state.builder.order,
    detailIngredient: state.builder.detailIngredient,
  }));

  const dispatch = useDispatch();

  const onCloseModal = () => dispatch({ type: DELETE_DETAIL_INGREDIENT});

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
                    name={detailIngredient.name}
                    calories={detailIngredient.calories}
                    proteins={detailIngredient.proteins}
                    fat={detailIngredient.fat}
                    carbohydrates={detailIngredient.carbohydrates}
                    image={detailIngredient.image_large}
                  />
                </Modal>
              }
              {order &&
                <Modal onClose={() => dispatch({ type: RESET_ORDER })}>
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
