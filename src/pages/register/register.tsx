import { Form } from '../../components/form/form';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../services/actions/auth';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { clearError } from '../../services/actions/auth';
import { TAllUserData, TYPES_FIELDS } from '../../types';

const fields = [
  {
    name: 'name',
    type: TYPES_FIELDS.text,
    placeholder: 'Имя'
  },
  {
    name: 'email',
    type: TYPES_FIELDS.email,
    placeholder: 'E-mail'
  },
  {
    name: 'password',
    type: TYPES_FIELDS.password,
    placeholder: 'Пароль'
  }
];

export default function RegisterPage() {
  const request = useSelector((state:any) => state.auth.request);
  const user = useSelector((state:any) => state.auth.user);
  const error = useSelector((state:any) => state.auth.error);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formData:TAllUserData):void => {
    dispatch<any>(register(formData)).then(
      history.replace({
        pathname: '/'
      })
    );
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
          title={'Регистрация'}
          fields={fields}
          buttonText={'Зарегистрироваться'}
          onSubmit={onSubmit}
          loading={request}
          error={error}
        >
          <div className="mt-20 text text_type_main-default text_color_inactive">
            <span className="mr-1">Вы зарегестрированы?</span>
            <Link className="" to="/login">
              Войти
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
}
