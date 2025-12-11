import React, { useState } from 'react';
import styles from '../pages/cadastro/cadastro.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

export default function PasswordInput({ name, value, onChange, placeholder, required = true }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPassword ? 'text' : 'password';

  const EyeIcon = showPassword ? FaEyeSlash : FaEye;

  return (
    <div className={styles.inputSenhaContainer}>
      <input
        className={styles.inputLogin}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      <button 
        type="button" 
        onClick={() => setShowPassword(prev => !prev)}
        className={styles.eyeButton}
        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
      >
        <EyeIcon />
      </button>
    </div>
  );
}