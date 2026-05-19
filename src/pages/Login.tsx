import { useState, FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { Button } from '../components/Button';
import { validateLogin, type FormErrors } from '../utils/validation';
import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneralError('');

    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const { user } = await loginUser(email, password);
      setUser(user);
      navigate('/');
    } catch (err) {
      const apiErr = err as Error & { errors?: FormErrors };
      if (apiErr.errors) {
        setErrors(apiErr.errors);
        if (apiErr.errors.general) setGeneralError(apiErr.errors.general);
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
        <h1>Вход</h1>
        <p className="auth-subtitle">Войдите в аккаунт SALAM</p>

        <form ref={formRef} className="auth-form" onSubmit={handleSubmit} noValidate>
          {generalError && <div className="auth-general-error">{generalError}</div>}

          <div className="auth-field">
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@mail.ru"
              error={errors.email}
            />
          </div>

          <div className="auth-field">
            <Input
              label="Пароль"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              error={errors.password}
            />
          </div>

          <div className="auth-submit">
            <Button
              color="primary"
              size="large"
              title={loading ? 'Вход...' : 'Войти'}
              onClick={() => formRef.current?.requestSubmit()}
              disabled={loading}
            />
          </div>
        </form>

        <p className="auth-footer-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
