import { type FormField } from '../forms.types';

export const signUpFormSchema: FormField[] = [
  {
    label: 'Имя',
    placeholder: 'Ваше имя',
    name: 'username',
    required: true
  },
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
  },
  {
    label: 'Подтвердите пароль',
    placeholder: 'Подтвердите пароль',
    name: 'confirmPassword',
    type: 'password',
    required: true
  }
];
