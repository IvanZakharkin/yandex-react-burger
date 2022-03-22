import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

import { INGREDIENTS } from '../../utils/data'

const INGREDIENTS_CONSTRUCTOR = [...INGREDIENTS].splice(0, 4);

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles.appContent}>
            <BurgerIngredients ingredients={INGREDIENTS}/>
            <BurgerConstructor ingredients={INGREDIENTS_CONSTRUCTOR}></BurgerConstructor>
          </div>
        </main>
      </div>
    )
  }
}

export default App; 