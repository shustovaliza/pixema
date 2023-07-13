import { type InputHTMLAttributes } from 'react';

export interface FormField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: keyof FormState;
}

export interface FormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type FormErrors = Partial<
  Record<keyof Omit<FormState, 'isDirty'>, string>
>;

export type SignUpErrorMessage = Record<keyof FormState, string[]>;

export interface SignInErrorMessage {
  detail: string;
}

export interface ConfirmResetPasswordErrorMessage {
  token: string[];
  new_password: string[];
}
