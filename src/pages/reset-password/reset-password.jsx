import Form from '../../components/form/form'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from "react-router-dom";
import { resetPassword } from '../../services/actions/auth';
import { useEffect } from 'react';
import { clearError } from '../../services/actions/auth';

const fields = [
  {
    type: 'password',
    placeholder: 'Введите новый пароль',
    name: 'password',
  },
  {
    type: 'text',
    placeholder: 'Введите код из письма',
    name: 'token',
  },
];

export default function ForgotPasswordPage() {
  const request = useSelector(state => state.auth.request);
  const user = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formData) => {
    dispatch(resetPassword(formData))
      .then(() => {
        history.replace({
          pathname: '/login',
        })
      })
  }

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  if (history.location.from !== '/forgot-password') {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <>
      <div className="page page--center">
        <Form
          title={'Восстановление пароля'}
          fields={fields}
          buttonText={'Сохранить'}
          onSubmit={onSubmit}
          loading={request}
          error={error}
        >
          <div className="mt-20 text text_type_main-default text_color_inactive">
            <span className="mr-1">Вспомнили пароль?</span>
            <Link className="" to="/login">
              Войти
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
