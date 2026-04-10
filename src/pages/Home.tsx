import React, { useState } from 'react';
import { Button } from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import Text from '../components/Text.tsx'; 



const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  
  const products = [
    { id: 1, name: 'Коран', price: '1500 руб' },
    { id: 2, name: 'Коврик для намаза', price: '800 руб' },
    { id: 3, name: 'Четки (тасбих)', price: '300 руб' },
    { id: 4, name: 'Книга "Основы Ислама"', price: '500 руб' },
    { id: 5, name: 'Духи без спирта', price: '1200 руб' }
  ];

  return (
    <div className="home">
      {}
      <Text as="h1">Salam aleykum</Text>
      <Text as="p">Main page</Text>
      
      <Button
        color="primary"
        size="small"
        title="Узнать об Исламе"
        onClick={() => alert(true)}
        disabled={!inputValue}  
      />
      
      <Input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        
      />
      
      <a href="/products"><Button
        color="primary"
        size="small"
        title="Показать товары"
        onClick={() => setShowProducts(!showProducts)}
        disabled={false}
      /></a>
    </div>
  );
};

export default Home;