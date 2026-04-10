import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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



app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
