import styles from './form.module.css';
import React, { FC, useState, useMemo } from 'react';
import {
  Button,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import PasswordInput from '../password-input/password-input';
import cn from 'classnames';
import BeatLoader from 'react-spinners/BeatLoader';
import { TYPES_FIELDS } from '../../types'

export type TFormField = {
  name: string,
  type: TYPES_FIELDS,
  placeholder: string
};

export type TForm = {
  [index: string]: string;
};

export type TFormProps = {
  title: string;
  buttonText: string;
  onSubmit: (form: any) => void;
  loading: boolean;
  error: string;
  fields: Array<TFormField>;
};


export const Form: FC<TFormProps> = (props) => {
  const { title, buttonText, fields, children, onSubmit, loading, error } = props;
  const initialFormState = useMemo(() => {
    return fields.reduce((acc: TForm, field) => {
      acc[field.name] = '';
      return acc;
    }, {});
  }, [fields]);

  const [form, setForm] = useState(initialFormState);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const hanlderSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className={cn(styles.form, 'form-page')} onSubmit={hanlderSubmit}>
      <h1 className={styles.heading}>{title}</h1>
      {fields.map((field) => {
        const props = {
          ...field,
          value: form[field.name],
          onChange: handlerChange,
          key: field.name,
          disabled: loading
        };
        return (
          <div className="mb-6" key={field.name}>
            {field.type === 'password' ? (
              <PasswordInput {...props} />
            ) : (
              <Input {...props} />
            )}
          </div>
        );
      })}
      {!!error && <div className="mt-5">{error}</div>}
      <div className="">
        <Button type="primary" disabled={loading}>
          {loading ? (
            <BeatLoader loading={true} color="#ffffff" size={10} />
          ) : (
            buttonText
          )}
        </Button>
      </div>
      <>{children}</>
    </form>
  );
}
