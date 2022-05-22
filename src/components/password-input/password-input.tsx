import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TYPES_FIELDS } from '../../types'

type TPasswordInput = {
  type: TYPES_FIELDS,
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  key: string;
  disabled: boolean;
};

const PasswordInput = ({ type, ...props }: TPasswordInput) => {
  const [isShowed, setIsShowed] = useState(false);
  return (
    <div className="mb-6">
      <Input
        {...props}
        type={isShowed ? 'text' : 'password'}
        icon={isShowed ? 'HideIcon' : 'ShowIcon'}
        onIconClick={() => setIsShowed(!isShowed)}
      />
    </div>
  );
}

export default PasswordInput;
