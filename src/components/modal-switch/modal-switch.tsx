import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientsPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  OrdersPage,
  HistoryOrdersPage
} from '../../pages/index';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Location } from "history";

type TLocationState = {
  background: Location
};

export default function ModalSwitch() {
  const location = useLocation<TLocationState>();
  const history = useHistory();
  let background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  return (
    <>
      <Switch location={background || location}>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>
        <Route path="/register" exact={true}>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <Route path="/ingredients/:ingredientId" exact={true}>
          <IngredientsPage />
        </Route>
        <Route path="/" exact={true}>
          <ConstructorPage />
        </Route>
        <ProtectedRoute path={`/profile`} exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path={`/profile/orders`} exact={true}>
          <HistoryOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path={`/orders`} exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:ingredientId">
          <Modal onClose={handleModalClose} title="Детали ингредиента">
            <IngredientDetails notShowTitle={true} />
          </Modal>
        </Route>
      )}
    </>
  );
}
