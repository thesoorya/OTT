import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import './Product.css';
import { useWishlist } from '../../components/Store/WishListAuth';
import { useAuthStore } from '../../components/Store/AuthUser';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { wishlist, toggleWishlist, addWishList, removeWishList } = useWishlist();
  const { user, authCheck } = useAuthStore();

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
  }, [authCheck]);

  const handleWishlistClick = () => {
    if (wishlist) {
      removeWishList(user._id, id);
    } else {
      addWishList(user._id, id);
    }
    toggleWishlist();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='productPage'>
      <Navbar />
      <div className='productPageContainer'>
        <div className="productPageImageContainer">
          <div className="productWishLogo">
            {wishlist ? (
              <IoIosHeart onClick={handleWishlistClick} />
            ) : (
              <IoIosHeartEmpty onClick={handleWishlistClick} />
            )}
          </div>
          <img src={product.image} className='productPageImage' alt={product.title} />
        </div>
        <div className="productPageDetailsContainer">
          <div className='productPageDetails'>
            <h1>{product.title}</h1>
            <h4>{product.category}</h4>
            <div>
              <span>${product.price}</span> {" | "}
              <span><FaStar /> {product.rating?.rate}</span>{" "}
              <span>({product.rating?.count} reviews)</span>
            </div>
            <p><small>{product.description}</small></p>
          </div>
          <div className="productPageButtons">
            {/* Add buttons for actions like adding to cart or purchasing */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
