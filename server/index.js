import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const ROLES = ['admin', 'user'];
const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]{2,50}$/;
const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function validateRegisterBody(body) {
  const errors = {};
  const { firstName, lastName, phone, email, password, role } = body || {};

  if (!firstName?.trim()) errors.firstName = 'Введите имя';
  else if (!nameRegex.test(firstName.trim())) errors.firstName = 'Имя: только буквы, от 2 символов';

  if (!lastName?.trim()) errors.lastName = 'Введите фамилию';
  else if (!nameRegex.test(lastName.trim())) errors.lastName = 'Фамилия: только буквы, от 2 символов';

  if (!phone?.trim()) errors.phone = 'Введите телефон';
  else if (!phoneRegex.test(phone.trim())) errors.phone = 'Формат: +7 (XXX) XXX-XX-XX или 8XXXXXXXXXX';

  if (!email?.trim()) errors.email = 'Введите email';
  else if (!emailRegex.test(email.trim())) errors.email = 'Некорректный email';

  if (!password) errors.password = 'Введите пароль';
  else if (password.length < 6) errors.password = 'Пароль не менее 6 символов';

  if (!role) errors.role = 'Выберите роль';
  else if (!ROLES.includes(role)) errors.role = 'Роль: admin или user';

  return errors;
}

function validateLoginBody(body) {
  const errors = {};
  const { email, password } = body || {};

  if (!email?.trim()) errors.email = 'Введите email';
  else if (!emailRegex.test(email.trim())) errors.email = 'Некорректный email';

  if (!password) errors.password = 'Введите пароль';

  return errors;
}

function sanitizeUser(user) {
  const { passwordHash, ...safe } = user;
  return safe;
}

let users = [];
let nextUserId = 1;

let products = [
  { id: 1, name: 'Коран', price: '1500 руб' },
  { id: 2, name: 'Коврик для намаза', price: '800 руб' },
  { id: 3, name: 'Четки (тасбих)', price: '300 руб' },
  { id: 4, name: 'Книга "Основы Ислама"', price: '500 руб' },
  { id: 5, name: 'Духи без спирта', price: '1200 руб' },
];
let nextId = 6;

app.get('/', (req, res) => {
  res.send('Сервер работает! Используйте GET /api/products или POST /api/products');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const errors = validateRegisterBody(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email.trim().toLowerCase();
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ errors: { email: 'Пользователь с таким email уже зарегистрирован' } });
  }

  const user = {
    id: nextUserId++,
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    phone: req.body.phone.trim(),
    email,
    role: req.body.role,
    passwordHash: hashPassword(req.body.password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  res.status(201).json({ user: sanitizeUser(user), message: 'Регистрация успешна' });
});

app.post('/api/auth/login', (req, res) => {
  const errors = validateLoginBody(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email.trim().toLowerCase();
  const user = users.find(u => u.email === email);

  if (!user || user.passwordHash !== hashPassword(req.body.password)) {
    return res.status(401).json({ errors: { general: 'Неверный email или пароль' } });
  }

  res.json({ user: sanitizeUser(user), message: 'Вход выполнен' });
});

app.get('/api/auth/users', (req, res) => {
  res.json(users.map(sanitizeUser));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
