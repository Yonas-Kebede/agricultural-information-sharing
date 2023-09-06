import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Index from './components/landingPage/Index';
import Login from './components/auserauth/Login';
import Register from './components/auserauth/Register';
import { Routes, Route} from 'react-router-dom';

import UserProfile from './components/admin/UpdateProfile';
import ChangePasswordForm from './components/auserauth/forgetpassword/Resetpassword';
import ManageFarmers from './components/admin/ManageFarmer';
import ManageDAWorker from './components/admin/ManageDAWorker';
import ManageICWorker from './components/admin/ManageIC';
import Dashboard from './components/admin/adminHome';
import Newsfeed from './components/IC/Newsfeed';
import Home from './components/farmer/FarmerHome';
import Product from './components/farmer/product/ProductManager';
import Job from './components/farmer/product/JobManager';
import FNewsFeed from './components/farmer/FNewsFeed';
import { useSelector } from 'react-redux';
import UpdateICProfile from './components/IC/UpdateICProfile';
import Messages from './components/IC/Message';
import Farmerprofileupdate from './components/farmer/UpdateFarmerProfile';

import LaborWorkerNavBar from './components/laborworker/laborWorkerNavBar'
import LaborWorkerHome from './components/laborworker/LaborWorkerHome';
import QA from './components/farmer/QA';
import BuyerHome from './components/buyer/BuyerHome';
import UpdateBuyerProfile from './components/buyer/UpdateBuyerProfile';
import Imkt from './components/IC/MarketInformation';
import LNewsFeed from './components/laborworker/LNewsFeed';
import BNewsfeed from './components/buyer/BNewsfeed';
import Fmkt from './components/farmer/Fmkt';
import SubmitEmail from './components/auserauth/forgetpassword/ResetPasswordWithEmail';






function App()
{ const user = useSelector((state) => state.user);
   // Check if user is null before accessing its properties
  if (!user) {
    return (
      <div className="App">
        <ToastContainer theme="colored" position="top-center"></ToastContainer>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Register />} />
          <Route path="SubmitEmail" element={<SubmitEmail />} />
          <Route path="ResetPasswordPage/:token" element={<ChangePasswordForm />} />
          
        </Routes>
      </div>
    );
  }
  return (
    <div className="App" >
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <Routes>
  
        
   
      {user && user.role === 'Admin' ? (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='Dashboard' element={<Dashboard />} />
                <Route path='ManageFarmers' element={<ManageFarmers />} />
                <Route path='ManageDAWorker' element={<ManageDAWorker />} />
                <Route path='ManageICWorker' element={<ManageICWorker />} />
                <Route path='UserProfile' element={<UserProfile />} />
                
              </>
            ) : user && user.role === 'Farmer' ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Farmerprofileupdate' element={<Farmerprofileupdate />} />
                <Route path='/farmer/agri-pros' element={<Product />} />
                <Route path='/farmer/agri-jobs' element={<Job />} />
                <Route path='Fmkt' element={<Fmkt />} />
                <Route path='/farmer/news-feed' element={<FNewsFeed />} />
                <Route path='QA' element={<QA />} />
              </>
            ) :user && user.role === 'IC' ? (
              <>
                <Route path='UpdateICProfile' element={<UpdateICProfile />} /> 
                <Route path='Newsfeed' element={<Newsfeed />} />
                <Route path='Imkt' element={<Imkt />} />
                <Route path='/' element={<Newsfeed />} />
                <Route path='Messages' element={<Messages />} />
                
              </>
            ): user && user.role === 'Buyer' ? (
              <>
                <Route path='/' element={<BuyerHome />} />
                <Route path='BuyerHome' element={<BuyerHome/>} />
                <Route path='news-feedBuyer' element={<BNewsfeed/>} />
                <Route path='/buyer/news-feed' element={<FNewsFeed />} />
                <Route path='UpdateBuyerProfile' element={<UpdateBuyerProfile/>} />
              </>
            ) : user && user.role === 'Labour' ? (
              <>
                <Route path='' element={<LaborWorkerHome />} />
                <Route path='Farmerprofileupdate' element={<Farmerprofileupdate />} />
                <Route path='LaborWorkerNavBar' element={<LaborWorkerNavBar />} />
                <Route path='LaborWorkerHome' element={<LaborWorkerHome />} />
                <Route path='news-feedLabor' element={<LNewsFeed/>} />


              </>
            ) : 
             (
              <>
                <Route path='/' element={<Index />} />
                <Route path='sign-in' element={<Login />} />
                <Route path='sign-up' element={<Register />} />
                <Route path='sign-in' element={<Login />} />
               <Route path='ResetPasswordPage/:token' element={<ChangePasswordForm />} />
              </>
)}
     

            <Route path='Dashboard' element={<Dashboard />} />
     
              <Route path='ManageFarmers' element={<ManageFarmers />} />
                <Route path='ManageDAWorker' element={<ManageDAWorker />} />
                <Route path='LaborWorkerHome' element={<LaborWorkerHome />} />

                <Route path="/" element={<Index />} />
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Register />} />
          <Route path="ResetPasswordPage/:token" element={<ChangePasswordForm />} />
       
      </Routes>
    </div>
  );
}

export default App;
