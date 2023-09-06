
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Paper, CircularProgress } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

import Buyerproduct from './BuyerNavBar';
import MyFooter from '../landingPage/myfooter';
function BuyerHome() {
    const user = useSelector((state) => state.user);
    
    const[search,setsearch]=useState('')

  const [profileData, setProfileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  


    useEffect(() => {
        fetchData(currentPage);
      }, [currentPage,search]);
    
    const fetchData = async (page) => {
        try {
          setLoading(true)
          const response = await axios.get(`http://localhost:3001/product/getproducts?page=${page}&limit=3&search=${search}`);
          const { data, count } = response.data;
          setProfileData(data);
          setTotalPages(Math.ceil(count / 3));
        } catch (error) {
          console.error('Error:', error);
        }
        setLoading(false)
      };
    
   
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
  return (
    <>
      <Buyerproduct />
 
    <div >
    
      <Paper elevation={0} sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '5rem '}}>
      


        <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 1rem',marginBottom: '0', width: {xs:'100%',md:'100%' }}}>
          <h2>Product List</h2>

   
         <div style={{ display: 'flex', flexDirection: 'column',}}>
        <br />
        
        <div style={{ padding: '-5px', marginBottom: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Search by title:</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>
        </div>
      </div>
      
      {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress />
          </div>
        )}
          {!loading && (
          <>
                                  
      {profileData.length === 0 ? (<p>No product available.</p>) : (                
        <div>
         <ul>
                                {profileData.map((product) => (
                                    <Paper elevation={6} sx={{ margin: '1rem' }} key={product._id}>
                                        
                                        <span style={{ display: 'inline-flex', marginLeft: '2rem' }}>
                                            <img
                                                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                                                width='300rem'
                                                height='120rem'
                                                style={{ borderRadius: '2rem' ,marginRight:'5%',marginTop:'3%'}}

                                            />
                                            <div>
                                            <span style={{ marginRight: '1.5rem', color: 'red' }}>Product name: {product.name}</span><br />
                                            <span style={{ marginLeft: '1.5rem', color: 'red' }}>Quantity: {product.quantity} Kuintel</span><br />
                                        
                                                <span style={{ marginRight: '0.5rem' }}>{product.description}</span>
                                                <br />
                                                <span style={{ marginRight: '1.0rem', color: 'green' }}>Phone: {product.phone}</span><br/>
                                                <span style={{ backgroundColor: 'whitesmoke' }}> Price: ETB {product.price}</span>
                                                <br/>
                                                <span style={{ backgroundColor: 'whitesmoke' }}> posted:{format(product.date)}</span>
                                            </div>
                                        </span>
                                        <br />
                                       
                                    </Paper>
                                ))}
                            </ul>
       
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button disabled={currentPage === 1} onClick={handlePreviousPage} style={{ marginRight: '10px' }}>
              <FaArrowLeft />
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage} style={{ marginLeft: '10px' }}>
              <FaArrowRight />
            </button>
          </div>
    </div>)} 
          </>)}
   

      </Paper>

      </Paper>
     
    </div>
     <MyFooter/>
    </>
  );
}

export default BuyerHome;





