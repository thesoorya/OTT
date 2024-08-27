import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../components/Store/AuthUser';
import Navbar from '../../components/Navbar/Navbar';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import axios from 'axios';
import DisplayProduct from '../../components/DisplayProduct/DisplayProduct';
const Home = () => {
  const { user, authCheck, isCheckAuth } = useAuthStore();
  const [displayProduct, setDisplayProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/product/getproducts")
      .then((res) => {
        setDisplayProduct(res.data.content || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckAuth || isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeProduct">
        {displayProduct.length > 0 ? (
          displayProduct.map((product) => (
            <DisplayProduct key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Home;