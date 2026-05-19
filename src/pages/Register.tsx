import { useState, FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { Button } from '../components/Button';
import {
  validateRegister,
  type RegisterFormData,
  type FormErrors,
  type UserRole,
} from '../utils/validation';
import { registerUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const emptyForm: RegisterFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<RegisterFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setSuccess('');

    const validationErrors = validateRegister(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const { user, message } = await registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role as UserRole,
      });
      setUser(user);
      setSuccess(message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const apiErr = err as Error & { errors?: FormErrors };
      if (apiErr.errors) {
        setErrors(apiErr.errors);
      } else {
        setGeneralError('Не удалось подключиться к серверу. Запустите npm run server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Регистрация</h1>
        <p className="auth-subtitle">Создайте аккаунт на сайте SALAM</p>

        <form ref={formRef} className="auth-form" onSubmit={handleSubmit} noValidate>
          {generalError && <div className="auth-general-error">{generalError}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="auth-field">
            <Input
              label="Имя"
              name="firstName"
              value={form.firstName}
              onChange={e => updateField('firstName', e.target.value)}
              placeholder="Иван"
              error={errors.firstName}
            />
          </div>

          <div className="auth-field">
            <Input
              label="Фамилия"
              name="lastName"
              value={form.lastName}
              onChange={e => updateField('lastName', e.target.value)}
              placeholder="Иванов"
              error={errors.lastName}
            />
          </div>

          <div className="auth-field">
            <Input
              label="Телефон"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={e => updateField('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
              error={errors.phone}
            />
          </div>

          <div className="auth-field">
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              placeholder="example@mail.ru"
              error={errors.email}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="role">Роль</label>
            <select
              id="role"
              name="role"
              className={errors.role ? 'error' : ''}
              value={form.role}
              onChange={e => updateField('role', e.target.value)}
            >
              <option value="">Выберите роль</option>
              <option value="user">Простой пользователь</option>
              <option value="admin">Администратор</option>
            </select>
            {errors.role && <p className="field-error">{errors.role}</p>}
          </div>

          <div className="auth-field">
            <Input
              label="Пароль"
              name="password"
              type="password"
              value={form.password}
              onChange={e => updateField('password', e.target.value)}
              placeholder="Не менее 6 символов"
              error={errors.password}
            />
          </div>

          <div className="auth-field">
            <Input
              label="Подтверждение пароля"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={e => updateField('confirmPassword', e.target.value)}
              placeholder="Повторите пароль"
              error={errors.confirmPassword}
            />
          </div>

          <div className="auth-submit">
            <Button
              color="primary"
              size="large"
              title={loading ? 'Регистрация...' : 'Зарегистрироваться'}
              onClick={() => formRef.current?.requestSubmit()}
              disabled={loading}
            />
          </div>
        </form>

        <p className="auth-footer-link">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
