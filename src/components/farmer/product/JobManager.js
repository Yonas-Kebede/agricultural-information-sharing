import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Paper } from '@mui/material'
import Footer from '../Footer'
import NavBar from '../FNavBar';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MyFooter from '../../landingPage/myfooter';
import { format } from 'timeago.js';
const JobManager = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setcount] = useState(0)
  // states of job attributes
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [search, setsearch] = useState('')
  const [editMode, setEditMode] = useState(false);
  const [id, setid] = useState('')

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const jobData = {
      title: title,
      description: description,
      company: company,
      location: location,
      id: user._id,
    };
    try {
      if (!editMode) {

        const response = await axios.post(`http://localhost:3001/jobs/addjobs`, jobData);

        if (response.status === 201) {
          setSuccess(true);
          setError('');
          setTitle('');
          setDescription('');
          setLocation('');
          setCompany('');

          setTimeout(() => {
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);
          }, 1500);
        }

      }
      else {
        const response = await axios.put(`http://localhost:3001/jobs/updatejobs/${id}`, jobData);

        if (response.status === 200) {
          setSuccess(true);
          setError('');
          setTitle('');
          setDescription('');
          setLocation('');
          setCompany('');
          setLoading(false);
          setTimeout(() => {
            setEditMode(false)
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);

          }, 1500);
        }
        
      }
      window.location.reload();

    } catch (error) {
      setSuccess(false);
      setLoading(false);
      setEditMode(false)// Set loading state to false

      if (error.response) {
        setTimeout(() => {
          setError('');
        }, 1500);

        setError(error.response.data.message);
      } else {
        setError('An error occurred during job addition.');
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search]);

  const fetchData = async (page) => {
    try {
      setIsloading(true)
      const response = await axios.get(`http://localhost:3001/jobs/getjobsbyuserid?page=${page}&limit=3&id=${user._id}&search=${search}`);
      const { jobs, count } = response.data;
      setProfileData(jobs);
      console.log(count)
      setcount(jobs)
      setTotalPages(Math.ceil(count / 3));
    } catch (error) {
      console.error('Error:', error);
    }
    setIsloading(false)
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/jobs/deletejobs/${id}`)
      .then((response) => {
        setProfileData(profileData.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditJob = (id) => {
    const jobitem = profileData.find((item) => item._id === id);
    setid(jobitem._id);
    setTitle(jobitem.title);
    setDescription(jobitem.description);
    setCompany(jobitem.company)
    setLocation(jobitem.location)
    setEditMode(true);


  }
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
      <div style={{ position: 'fixed', top: '0px', left: '0px',zIndex:5 }}>
        <NavBar />
      </div>
      <Paper sx={{ display: { xs: 'block', md: 'flex' }, marginTop: '5rem' }}>
        <Paper sx={{ display: 'block', margin: '1%', backgroundColor: 'whitesmoke', maxHeight: '33rem',width:{xs:'95%',md:'23%'} }}>
          <h2>ADD JOB</h2>
          <form onSubmit={handleAddJob}>
            <div style={{ margin: '2rem' }}>
              <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div style={{ margin: '2rem' }}>
              <input
                type="text"
                placeholder="phone"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div style={{ margin: '2rem' }}>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div style={{ margin: '2rem' }}>
              <textarea
                type="text"
                rows={5}
                cols={20}
                placeholder="Write the job description here...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ margin: '2rem' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                style={{marginBottom:'2%'}}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <div

                  >
                    {editMode ? 'Update job' : 'Add job'}
                  </div>
                )}

              </Button>
            </div>
            {success && <p>Job added successfully.</p>}
            {error && <p>{error}</p>}
          </form>
        </Paper>
        <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 1%', marginBottom: '0', width: { xs: '95%', md: '72%' } }}>
          <h2>Job List</h2>

          <div style={{ display: 'flex', flexDirection: 'column', }}>
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
          {isloading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <CircularProgress />
            </div>
          )}
          {!isloading && (
            <div>
              {profileData.length === 0 ? (<p>No jobs available.</p>) : (
                <div>
                  <div>
                    {profileData.map((job) => (
                      <Paper  sx={{ margin: '1rem' }} key={job._id}>
                       <div style={{color:'red',marginTop:'1%'}}>
                        Job Title: <span style={{color:'black'}}>{job.title}</span> &nbsp;&nbsp;
                        Employer-phone: <span style={{color:'black'}}>{job.company}</span>
                       </div>
                       <br/><br/>
                        <p style={{overflowWrap:'break-word',justifyContent:'center',padding:'0 1rem'}}>
                        {job.description}
                          </p><br/>                       
                       <div style={{color:'blue'}}>
                       Location: {job.location} &nbsp;&nbsp;&nbsp;
                        date: {format(job.date)}<br/>
                       </div>
                        
                        <button className='btn btn-warning' style={{ margin: '1rem' }} onClick={() => handleEditJob(job._id)}>Edit</button>
                        <button className='btn btn-danger' style={{ margin: '1rem' }} onClick={() => handleDelete(job._id)}>
                          Delete
                        </button>
                      </Paper>
                    ))}
                  </div>

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
            </div>)}






        </Paper>


      </Paper>
      <MyFooter />
    </div>
  );
};

export default JobManager;
