import React from 'react';
import './DisplayProduct.css';

const DisplayProduct = ({ product }) => {

    return (
        <div className="productCard">
            <img src={product.images[0]} alt={product.title} className="productImage" />
            <p className="productName">{product.title}</p>
            <p className="productPrice">${product.price}</p>
            <p className="productCategory">{product.category.name}</p>
        </div>
    );
};

export default DisplayProduct;
