import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Paper } from '@mui/material';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'timeago.js';
import LaborWorkerNavBar from './laborWorkerNavBar';
import MyFooter from '../landingPage/myfooter';

const LaborWorkerHome = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search]);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3001/jobs/getjobs?page=${page}&limit=4&search=${search}`);
      const { jobs, count } = response.data;
      setProfileData(jobs);
      setCount(jobs);
      setTotalPages(Math.ceil(count / 3));
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
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
    <div>
      <div style={{ position: 'fixed', top: '0px', right: '0px', left: '0px' }}>
        <LaborWorkerNavBar />
      </div>

      <Paper elevation={0} sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '3rem ' }}>
        <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 10rem', marginBottom: '0', width: { xs: '100%', md: '100%' } }}>
          <h2>Job List</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br />
            <br />
            <div style={{ padding: '-5px', marginBottom: 'auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ marginRight: '10px' }}>Search by title:</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ borderRadius: '5px', padding: '5px' }}
                />
              </div>
            </div>
          </div>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </div>
          ) : profileData.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            <div>
              <ul>
                {profileData.map((job) => (
                  <Paper elevation={2} sx={{ margin: '1rem' }} key={job._id}>
                    <span style={{ marginRight: '1.5rem', color: 'red' }}>Job Title: {job.title}</span>
                    <span style={{ marginRight: '0.5rem', color: 'red' }}>Company/ Employer: {job.company}</span>
                    <br />
                    <span style={{ marginRight: '0.5rem' }}>{job.description}</span>
                    <br />
                    <span style={{ backgroundColor: 'whitesmoke' }}> Location: {job.location}</span>
                    <br />
                    <span style={{ backgroundColor: 'whitesmoke' }}> date: {format(job.date)}</span>
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
            </div>
          )}
        </Paper>
      </Paper>

      <MyFooter />
    </div>
  );
};

export default LaborWorkerHome;
