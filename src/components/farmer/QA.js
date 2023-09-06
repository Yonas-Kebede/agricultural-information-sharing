
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './FNavBar';
import Footer from '../landingPage/copyright';
import { Card, Typography, CardMedia, CardActions, CardContent, CardActionArea, CircularProgress ,Paper} from '@mui/material';

import './qa.css';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MyFooter from '../landingPage/myfooter';
function QA() {

  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const role = 'DA';

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const handleNext = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(nextIndex >= profileData.length ? 0 : nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = startIndex - 1;
    setStartIndex(prevIndex >= profileData.length ? 0 : prevIndex);
  };

  const visibleItems = profileData.slice(startIndex, startIndex + itemsPerPage);
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/user/getallusers?page=${page}&limit=10&role=${role}`);

      const { data, count } = response.data;
      setProfileData(data);
      setLoading(false)
      console.log(data)
      setTotalPages(Math.ceil(count / 4));
      if (data.length > 0 && data[0].image) {
        const imageUrl = `data:${data[0].image.contentType};base64,${data[0].image.data}`;
        setProfileImage(imageUrl);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }
  };



  return (
    <>
      <div>
        <NavBar />
        <div>
          <h3>Expert Advice</h3>
          <p>Access expert advice and guidance on various farming topics.</p>
          <h5 style={{marginTop:'3%'}}>Click one of the links listed below to ask any question.</h5>
        </div>
        <div className='wrapper' style={{ margin: '3% auto', textAlign: 'center' }}>

          {loading && (
            <div style={{ display: 'flex', margin: 'auto', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <CircularProgress />
            </div>
          )}
          {!loading && (
            <div>
              {profileData.length === 0 ? (<p>Not available.</p>) : (
                <Paper elevation={0} sx={{display:{xs:'block',sm:'flex'} }}>
                  {visibleItems.map((item) => (
                    <div
                      key={item._id}
                      className='item'
                      style={{

                        minWidth: '220px',
                        minHeight: '160px',
                        marginRight: '10px',
                        padding: '3px',
                        marginLeft: '10%',
                        
                        
                      }}
                    >
                      <img
                        src={`data:${item.image.contentType};base64,${item.image.data}`}

                        alt="image"
                        width='80px'
                        height='80px'
                        style={{ borderRadius: '35px'}}
                      />
                      <h6>{item.name}</h6>
                      <p>{item.phone}</p>
                      <a href={item.chatlink}>Chat Link</a>
                    </div>

                  ))}
                </Paper>
              )}

            </div>)}




          {/* <button style={{marginLeft:'9px',marginRight:'0'}} onClick={handleNext}><ChevronRight/></button> */}
        </div>


        <div style={{ marginTop: '20px', marginBottom: '3%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button disabled={currentPage === totalPages} onClick={handlePrev} style={{ marginRight: '10px' }}>
            <FaArrowLeft />
          </button>
          <span>{` ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={handleNext} style={{ marginLeft: '10px' }}>
            <FaArrowRight />
          </button>
        </div>



      </div>

    <Footer />
    </>
  );
}

export default QA;

































//   const data = [
//     {
//       name: 'melkamu zinabu',
//       photo: melkamu,
//       ph_number: '0900631287',
//       link: 'https://t.me/Mzzw2012'
//     },
//     {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//       {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//       {
//         name: 'melkamu zinabu',
//         photo: melkamu,
//         ph_number: '0900631287',
//         link: 'https://t.me/Mzzw2012'
//       },
//     {
//       name: 'samuel kibret',
//       photo: samuel,
//       ph_number: '0970220583',
//       link: 'https://t.me/samuelKibret'
//     },
//     {
//       name: 'Sewlesew Biazen',
//       photo: sewlesew,
//       ph_number: '0961718044',
//       link: 'https://t.me/u_and_me_1'
//     },
//     {
//       name: 'Yonas Kebede',
//       photo: yonas,
//       ph_number: '0953055202',
//       link: 'https://t.me/yonas_k_g'
//     },
//     // Add more data objects as needed
//   ];

