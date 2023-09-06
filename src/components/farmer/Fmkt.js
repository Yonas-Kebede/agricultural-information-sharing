import React, { useState } from 'react';
import axios from 'axios';
import RetrieveMarket from '../IC/RetriveMkt';
import Footer from '../landingPage/copyright';
import FNavBar from './FNavBar';
import { Paper } from '@mui/material';

const Fmkt = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3001/market/addcrops', formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
        <div>
            <FNavBar />
        </div>
            
    
      <Paper sx={{backgroundColor:'whitesmoke',margin:{xs:'20% 10% auto',md:'10% 2%'}}}>
        <RetrieveMarket />
      </Paper>

      <div>
      <Footer />
      </div>
    </div>
  );
};

export default Fmkt;
