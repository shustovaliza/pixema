import { type InputHTMLAttributes } from 'react';

import inputFieldStyles from './InputField.module.scss';

export const InputField = ({
  label,
  id,
  error,
  shouldFitContainer,
  ...inputProperties
}: {
  error?: string;
  label: string;
  shouldFitContainer?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div
      className={inputFieldStyles.container}
      style={shouldFitContainer ? { width: '100%' } : undefined}
    >
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        data-valid={!error}
        {...inputProperties}
      />
      {error && <div className={inputFieldStyles.error}>{error}</div>}
    </div>
  );
};
