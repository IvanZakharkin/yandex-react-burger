import { BrowserRouter as Router } from 'react-router-dom';
import ModalSwitch from '../modal-switch/modal-switch';
import styles from './app.module.css';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getUser } from '../../services/actions/auth';
import AppHeader from '../app-header/app-header';

const App = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
      .catch((err) => console.log(err))
      .finally(() => setIsUserLoaded(true));
  }, [dispatch]);

  return (
    <div className={styles.app}>
      {
        <main className={styles.main}>
          {isUserLoaded && (
            <Router>
              <AppHeader />
              <ModalSwitch></ModalSwitch>
            </Router>
          )}
        </main>
      }
    </div>
  );
};

export default App;
