import React from 'react';
import './DisplayProduct.css';
import { Link } from 'react-router-dom'

const DisplayProduct = ({ product }) => {

    return (
        <div className="productCard">
            <Link to={`/product/${product.id}`}>
                <div className='productImgContainer'>
                    <img src={product.image} alt={product.title} className="productImage" />
                </div>
                <p className="productName">{product.title}</p>
                <p className="productPrice">${product.price}</p>
            </Link>
        </div>
    );
};

export default DisplayProduct;
