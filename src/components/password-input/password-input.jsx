import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export default function PasswordInput({ type, ...props }) {
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
