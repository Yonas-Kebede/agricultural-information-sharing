





import React, { useEffect, useRef } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import IcNavBar from './icNavBar';
import Footer from '../landingPage/copyright';
import axios from 'axios';


const Messages = () => {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Make an API request to send the SMS
    axios.post('https://api.twilio.com/2010-04-01/Accounts/{YOUR_TWILIO_ACCOUNT_SID}/Messages.json')
      .then((response) => {
        console.log(response.data);
        // Handle successful response
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div>
        <IcNavBar />
      </div>


      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


        <TextareaAutosize
          placeholder="Enter the message"
          minRows={3}
          maxRows={6}
          ref={messageRef}
          style={{ width: '50%', marginTop: '15%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ alignSelf: 'center' }}>Send SMS</button>




      </form>

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Messages;
