import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import styles from './app.module.css';
import { getIngredientsList as apiGetIngredientsList } from '../../api';

const App = () => {
  const [ ingredientsList, setIngredientsList ] = React.useState([]); 
  const [ constructorIngedients, setConstructorIngedients ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState();
  const [ selectedIngredient, setSelectedIngredient] = React.useState();

  const onCloseModal = () => setSelectedIngredient(null);

  const getIngredientsList = async () => {
    setLoading(true);

    return apiGetIngredientsList()
      .then((ingredients) => {
        setIngredientsList(ingredients);
        setConstructorIngedients([...ingredients].splice(0, 7));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })    
  };

  React.useEffect(() => {
    getIngredientsList();
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      {
        !loading && 
        <main className={styles.main}>
          {
            !error ? 
            (<div className={styles['constructor-page']}>
              <BurgerIngredients ingredients={ingredientsList} onShowIngredientDetail={setSelectedIngredient}/>
              <BurgerConstructor ingredients={constructorIngedients} onShowIngredientDetail={setSelectedIngredient}></BurgerConstructor>
              {selectedIngredient && 
                <Modal 
                  onClose={onCloseModal}
                  title="Детали ингридиента"
                >
                  <IngredientDetails 
                    name={selectedIngredient.name}
                    calories={selectedIngredient.calories}
                    proteins={selectedIngredient.proteins}
                    fat={selectedIngredient.fat}
                    carbohydrates={selectedIngredient.carbohydrates}
                    image={selectedIngredient.image_large}
                  />
                </Modal>
              }
            </div>) :
            <div>{error}</div>
          }
        </main>
      }
    </div>
  )
}

export default App; 
