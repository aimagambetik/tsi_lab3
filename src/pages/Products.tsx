import { ProductCard } from "../components/ProductCard.tsx"
import { Button } from "../components/Button.tsx";
import { Modal } from "../components/Modal.tsx";
import { useState, useEffect } from "react";
import Input from "../components/Input.tsx";

interface Product {
    id: number;
    name: string;
    price: string;
}

export const ProductsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Ошибка при загрузке товаров');
                return res.json();
            })
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const addProduct = () => {
        const priceFormatted = price.endsWith(' руб') ? price : price + ' руб';
        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price: priceFormatted }),
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка при добавлении товара');
                return res.json();
            })
            .then((newProduct: Product) => {
                setProducts(prev => [...prev, newProduct]);
                setName("");
                setPrice("");
                setIsOpen(false);
            })
            .catch(err => setError(err.message));
    };

    const deleteProduct = (id: number) => {
        fetch(`/api/products/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка при удалении товара');
                setProducts(prev => prev.filter(p => p.id !== id));
            })
            .catch(err => setError(err.message));
    };

    return (
        <div className="flex flex-col gap-5">
            <Modal isOpen={isOpen}>
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Введите название"
                />
                <Input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Введите цену"
                />
                <div className="flex gap-2 mt-2">
                    <Button
                        color="primary"
                        size="small"
                        title="Добавить"
                        onClick={addProduct}
                    />
                    <Button
                        color="primary"
                        size="small"
                        title="Отмена"
                        onClick={() => setIsOpen(false)}
                    />
                </div>
            </Modal>

            <Button
                color="primary"
                size="small"
                title="Добавить товар"
                onClick={() => setIsOpen(true)}
            />

            {loading && <p className="text-center text-gray-500">Загрузка товаров...</p>}
            {error && <p className="text-center text-red-500">Ошибка: {error}</p>}

            <div className="grid grid-cols-3 gap-4 mt-5">
                {products.map(product => (
                    <div key={product.id} className="relative">
                        <ProductCard title={product.name} price={product.price} />
                        {/* <button
                            onClick={() => deleteProduct(product.id)}
                            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold"
                        >
                            ✕
                        </button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};
