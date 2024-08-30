// Wishlist.jsx
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../components/Store/AuthUser';
import DisplayProduct from '../../components/DisplayProduct/DisplayProduct';
import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import './Wishlist.css';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { user, authCheck, wishlist, getWishlist } = useAuthStore();
  const [wishProducts, setWishProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authCheck();  // Check authentication first
    getWishlist();  // Fetch wishlist

    const fetchWishlistProducts = async () => {
      try {
        const productRequests = wishlist.map(id => axios.get(`/api/product/getproductbyid/${id}`));
        const productResponses = await Promise.all(productRequests);
        const products = productResponses.map(res => res.data.content);
        setWishProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist products:", error);
        setIsLoading(false);
      }
    };

    if (wishlist.length > 0) {
      fetchWishlistProducts();
    } else {
      setIsLoading(false);
    }
  }, [authCheck, getWishlist, wishlist]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='wishlist'>
      <Navbar />
      <h1>Wishlist</h1>
      <div className="wishlistContainer">
        {wishProducts.length > 0 ? (
          wishProducts.map((product) => (
            <DisplayProduct key={product.id} product={product} />
          ))
        ) : (
          user ? <p>Your wishlist is empty.</p> : <p>Please <Link to='/login'>Login / Sign up</Link> to view your wishlist.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
