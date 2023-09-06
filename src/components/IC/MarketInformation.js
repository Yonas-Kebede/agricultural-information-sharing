import React, { useState } from 'react';
import axios from 'axios';
import IcNavBar from '../IC/icNavBar';
import Footer from '../landingPage/copyright';
import RetrieveMarket from './RetriveMkt';
import { Paper } from '@mui/material';

const Imkt = () => {
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
      setFile(null)
  };

  return (
    <div>
        <div>
            <IcNavBar />
        </div>
            
      <Paper elevation={0} sx={{display:{xs:'block',sm:'flex'},margin:{xs:'15% 0% 3%',sm:'10% 0 4%'}}}>
      <Paper  sx={{backgroundColor:'whitesmoke',width:{xs:'90',sm:'23%'} ,padding:'1%',margin:{xs:'5% 0', sm:'0 1%'}}}>
      <h3>Add Crop-Price Exel</h3>
      <input type="file" onChange={handleFileChange} style={{fontSize:'12px'}} /><br />
      <button onClick={handleUpload} style={{margin:'10% 0 3%'}}>Upload</button>
      </Paper>
      <Paper elevation={0} sx={{backgroundColor:'whitesmoke',width:{xs:'90%',sm:'73%'},marginRight:'1%'}}>
        <RetrieveMarket/>
      </Paper>
      </Paper>
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default Imkt;
