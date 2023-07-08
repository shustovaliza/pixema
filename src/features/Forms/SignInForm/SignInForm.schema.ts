import { type FormField } from '../forms.types';

export const signInFormSchema: FormField[] = [
  {
    label: 'Email',
    placeholder: 'Ваш email',
    name: 'email',
    type: 'email',
    required: true
  },
  {
    label: 'Пароль',
    placeholder: 'Ваш пароль',
    name: 'password',
    type: 'password',
    required: true
  }
];
