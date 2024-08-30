import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import './Product.css';
import { useAuthStore } from '../../components/Store/AuthUser';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()

  const { user, wishlist, cart, addWishList, addToCart, getWishlist, authCheck, getCart, removeWishList } = useAuthStore();

  const isProductInWishlist = wishlist?.includes(id);
  const isProductInCart = cart?.some(item => item.productId.toString() === id);

  useEffect(() => {
    axios.get(`/api/product/getproductbyid/${id}`)
      .then((res) => {
        setProduct(res.data.content || {});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    authCheck();
    getWishlist();
    getCart();
  }, [authCheck, getWishlist, getCart]);

  const handleWishlistClick = () => {
    if (user) {
      if (isProductInWishlist) {
        removeWishList(user._id, id);
      } else {
        addWishList(user._id, id);
      }
    }
  };

  const handleAddToCart = () => {
    if (user) {
      if (!isProductInCart) {
        addToCart(user._id, id, quantity);
      } else {
        addToCart(user._id, id, 1);
      }
    }

    navigate('/cart')
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='productPage'>
      <Navbar />
      <div className='productPageContainer'>
        <div className="productPageImageContainer">
          <img src={product.image} className='productPageImage' alt={product.title} />
        </div>
        <div className="productPageDetailsContainer">
          {user && <div className="productWishLogo">
            {isProductInWishlist ? (
              <IoIosHeart style={{ color: 'red' }} onClick={handleWishlistClick} />
            ) : (
              <IoIosHeartEmpty onClick={handleWishlistClick} />
            )}
          </div>}
          <div className='productPageDetails'>
            <h1>{product.title}</h1>
            <h4>{product.category}</h4>
            <div>
              <span>${product.price}</span> {" | "}
              <span><FaStar /> {product.rating?.rate}</span>{" "}
              <span>({product.rating?.count} reviews)</span>
            </div>
            <p>{product.description}</p>
            <div className="productQuantityContainer">
              <button className='quantityButton' onClick={decreaseQuantity}>-</button>
              <span className='quantityNumber'>{quantity}</span>
              <button className='quantityButton' onClick={increaseQuantity}>+</button>
            </div>
            <button className='addToCartBtn' onClick={handleAddToCart}>
              Add to cart <FaCartShopping />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
