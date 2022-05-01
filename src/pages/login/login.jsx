import Form from '../../components/form/form'
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../services/actions/auth';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { clearError } from '../../services/actions/auth';

const fields = [
  {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email'
  },
  {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password'
  }
];

export default function LoginPage() {
  const request = useSelector(state => state.auth.request);
  const user = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formData) => {
    dispatch(auth(formData))
      .then(() => {
        history.replace({
          pathname: history.location?.state?.from || '/'
        });
      })
  };

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

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
          title={'Вход'} 
          buttonText={'Войти'} 
          fields={fields} 
          loading={request}
          onSubmit={onSubmit}
          error={error}
        >
          <div className="mt-20 text text_type_main-default text_color_inactive">
              <span className="mr-1">Вы новый пользователь?</span>
              <Link className="" to="/register">
                Зарегестрироваться
              </Link>
            </div>
            <div className="text text_type_main-default text_color_inactive">
              <span className="mr-1">Забыли пароль?</span>
              <Link className="" to="/forgot-password">
                Восстановить пароль
              </Link>
            </div>
        </Form>
      </div>
    </>
	);
}
