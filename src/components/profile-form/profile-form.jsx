import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BeatLoader from "react-spinners/BeatLoader";
import { updateUser } from '../../services/actions/auth';

export default function ProfileForm() {
  const user = useSelector(state => ({ ...state.auth.user, password: '' }));
  const dispatch = useDispatch();

  const [form, setForm] = useState({...user, password: ''});
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handlerChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    dispatch(updateUser(form))
      .then(() => {
        setForm({
          ...form,
          password: ''
        })
      })
      .catch((err) => setError(err))
      .finally(() => setIsSaving(false))
  }

  const cancel = () => {
    setForm({...user, password: ''})
  };

  const wasChanged = Object.keys(form).some((key) => form[key] !== user[key]);

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-6 form-input">
        <Input
          type="text"
          name="name"
          placeholder="Имя"
          icon="EditIcon"
          value={form.name}
          onChange={handlerChange}
          disabled={isSaving}
        />
      </div>
      <div className="mb-6 form-input">
        <Input
          type="email"
          name="email"
          placeholder="Логин"
          icon="EditIcon"
          value={form.email}
          onChange={handlerChange}
          disabled={isSaving}
        />
      </div>
      <div className="mb-6 form-input">
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          icon="EditIcon"
          value={form.password}
          onChange={handlerChange}
          disabled={isSaving}
        />
      </div>
      {!!error && (<div className="mb-6">{error}</div>)}
      {
        wasChanged && (
          <div className="mb-10">
            <Button type="secondary" disabled={isSaving} onClick={cancel}>Отменить</Button>
            <Button type="primary" disabled={isSaving}>
              {
                isSaving ?
                  <BeatLoader loading={true} color='#ffffff' size={10} /> :
                  'Сохранить'
              }
            </Button>
          </div>
        )
      }

    </form>
  );
}