import { Form } from '../../components/form/form';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/auth';
import { useEffect } from 'react';
import { clearError } from '../../services/actions/auth';
import { TRootState } from '../../services/reducers'
import { TUser, TYPES_FIELDS } from '../../types';

const fields = [
  {
    type: TYPES_FIELDS.email,
    placeholder: 'Укажите e-mail',
    name: 'email'
  }
];

export default function ForgotPasswordPage() {
  const request = useSelector((state: TRootState) => state.auth.request);
  const error = useSelector((state: TRootState) => state.auth.error);
  const user = useSelector((state: TRootState) => state.auth.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formData: Pick<TUser, 'email'>): void => {
    dispatch<any>(forgotPassword(formData)).then(() => {
      if (!error) {
        history.replace({
          pathname: '/reset-password',
          state: {
            from: '/forgot-password'
          }
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
