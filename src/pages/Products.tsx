
import { ProductCard } from "../components/ProductCard.tsx"
import { Button } from "../components/Button.tsx";
import { Modal } from "../components/Modal.tsx";
import { useState } from "react";
import Input from "../components/Input.tsx";

const productsInit = [
    { id: 1, name: 'Коран', price: '1500 руб' },
    { id: 2, name: 'Коврик для намаза', price: '800 руб' },
    { id: 3, name: 'Четки (тасбих)', price: '300 руб' },
    { id: 4, name: 'Книга "Основы Ислама"', price: '500 руб' },
    { id: 5, name: 'Духи без спирта', price: '1200 руб' }
  ];

export const ProductsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [products, setProducts] = useState([...productsInit])
    
    const addProduct = () => {
        setProducts ([...products,{id: products.length+1, name: name, price: price + " руб"}])
        setName("")
        setPrice("")
        setIsOpen(false)
    }

    return <div className="flex flex-col gap-5">
        <Modal 
        isOpen = {isOpen}>
            <Input
                value = {name}
                onChange = {e => setName(e.target.value)}
                placeholder="Введите название"
            />
            <Input
                value = {price}
                onChange = {e => setPrice(e.target.value)
                }
                placeholder="Введите цену"
            />
            <Button
                color="primary"
                size="small"
                title="Добавить"
                onClick={addProduct} 
            />
        </Modal>
        <Button
                color="primary"
                size="small"
                title="Добавить"
                onClick={() => setIsOpen(true)}
                  
              />
        <div className="grid grid-cols-3 gap-4 mt-5">
            {products.map(product=><ProductCard title = {product.name} price = {product.price}/>)}
               
            
            </div> 
        </div>
    }

