export type UserRole = 'admin' | 'user';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole | '';
}

export type FormErrors = Record<string, string>;

const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]{2,50}$/;
const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegister(data: RegisterFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'Введите имя';
  } else if (!nameRegex.test(data.firstName.trim())) {
    errors.firstName = 'Имя: только буквы, от 2 символов';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Введите фамилию';
  } else if (!nameRegex.test(data.lastName.trim())) {
    errors.lastName = 'Фамилия: только буквы, от 2 символов';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Введите телефон';
  } else if (!phoneRegex.test(data.phone.trim())) {
    errors.phone = 'Формат: +7 (XXX) XXX-XX-XX или 8XXXXXXXXXX';
  }

  if (!data.email.trim()) {
    errors.email = 'Введите email';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Некорректный email';
  }

  if (!data.password) {
    errors.password = 'Введите пароль';
  } else if (data.password.length < 6) {
    errors.password = 'Пароль не менее 6 символов';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (!data.role) {
    errors.role = 'Выберите роль';
  } else if (data.role !== 'admin' && data.role !== 'user') {
    errors.role = 'Некорректная роль';
  }

  return errors;
}

export function validateLogin(email: string, password: string): FormErrors {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = 'Введите email';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Некорректный email';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  }

  return errors;
}
