import Form from '../../components/form/form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/auth';
import { useEffect } from 'react';
import { clearError } from '../../services/actions/auth';

const fields = [
  {
    type: 'email',
    placeholder: 'Укажите e-mail',
    name: 'email'
  }
];

export default function ForgotPasswordPage() {
  const request = useSelector((state) => state.auth.request);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formData) => {
    dispatch(forgotPassword(formData)).then(() => {
      if (!error) {
        history.replace({
          pathname: '/reset-password',
          from: '/forgot-password'
        });
      }
    });
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

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
          buttonText={'Восстановить'}
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
