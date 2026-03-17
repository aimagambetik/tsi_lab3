import React, { useState } from 'react';
import { Button } from '../components/Button.tsx';
import Input from '../components/Input.tsx';
import Text from '../components/Text.tsx'; 

const Home = () => {
  const [inputValue, setInputValue] = useState('');

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
    </div>
  );
};

export default Home;