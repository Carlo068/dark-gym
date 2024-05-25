import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Test() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get('https://fakestoreapi.com/products');
        console.log(response.data);
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            {products &&
                products.length > 0 &&
                products.map((product) => (
                <div key={product.id}>
                    <Image
                        unoptimized
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                    />
                    <h3>{product.title}</h3>
                </div>
                ))}
        </div>
    )
}