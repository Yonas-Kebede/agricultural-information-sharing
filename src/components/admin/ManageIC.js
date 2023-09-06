import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AdminNavBar from './adminNavBar';
import Footer from '../landingPage/copyright';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import {Select, MenuItem } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useNavigate } from 'react-router-dom';
function ManageICWorker() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [chatlink, setchatlink] = useState('');
  const [phone, setphone] = useState('');
  const [role, setrole] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState('');
  const roles='IC'
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/user/getallusers?page=${page}&limit=10&role=${roles}`);
      const { data, count } = response.data;
      setProfileData(data);
      setTotalPages(Math.ceil(count / 10));
      if (data.length > 0 && data[0].image) {
        const imageUrl = `data:${data[0].image.contentType};base64,${data[0].image.data}`;
        setProfileImage(imageUrl);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false)
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/user/removeuser/${id}`)
      .then((response) => {
        setProfileData(profileData.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
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

  const filteredFarmers = profileData.filter((farmer) => {
    const name = farmer.name;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const tableStyle = { borderCollapse: 'collapse', width: '80%', marginLeft: '10%' };
  const thStyle = {
    border: 'none',
    backgroundColor: 'whitesmoke',
    color: 'black',
    padding: '1rem',
    textAlign: 'start',
    whiteSpace: 'nowrap', // Prevent table header from wrapping
  };
  const tdStyle = { border: 'none',  textAlign: 'start', padding: '0.5rem' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);
      formData.append('role', role);
      formData.append('phone', phone);
      formData.append('chatlink', chatlink);
      formData.append('image', image); // Include file in form data

      const response = await axios.post('http://localhost:3001/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setError('');
        setname('');
        setemail('');
        setPassword('');
        setConfirmPassword('');
        setrole('');
        setphone('')
        setchatlink('')
        setImage(null);

        setTimeout(() => {
          setLoading(false); // Set loading state to false after a delay
          setSuccess(false)
        }, 1500);
      }
    } catch (error) {
      setTimeout(() => {
        setError('')
      }, 1500);
      setSuccess(false);
      setLoading(false); // Set loading state to false
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <>
      <AdminNavBar />
 
    <div >
    
      <Paper elevation={0} sx={{ display: { xs: 'block', md: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '5rem'  }}>
        <Paper  sx={{ display: 'block', margin: '1% auto', backgroundColor: 'whitesmoke',maxHeight: '33rem', width:{xs:'90%',md:'24%'}  }}>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
        
            <div>
            <Select
                  labelId="select-label"
                  id="select-input"
                  placeholder='select category'
                  fullWidth
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                  label="Select category"
                  required
                >
                  <MenuItem defaultValue="IC">
                    Select Role
                  </MenuItem>
                  <MenuItem value="IC">IC</MenuItem>
                  <MenuItem value="DA">DA Worker</MenuItem>
                </Select>
            </div>
            <div className="row" style={{ margin: '1rem' }}>
              <input
                type="text"
                placeholder="user name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
            <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
            <input
                type="text"
                placeholder="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
            <input
                type="text"
                placeholder="chatlink.."
                value={chatlink}
                onChange={(e) => setchatlink(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
            <input
                  accept="image/*"
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="file">
                  <Button component="span" startIcon={<CloudUploadOutlinedIcon />} fullWidth>
                    Upload Image
                  </Button>
                </label>
                {image && (
                  <Typography variant="body2" align="center">
                    Selected image: {image.name}
                  </Typography>
                )}
            </div>
            <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Add Account'
                  )}
                </Button>
                {success && <p>User registered successfully.</p>}
                {error && <p>{error}</p>}
          </form>
        </Paper>



        <Paper sx={{ backgroundColor: 'whitesmoke', margin: '1% auto', width: {xs:'100%',md:'73%' }}}>
          <h2>DA Worker List</h2>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <br />
        <br />
        <div style={{ padding: '-5px', marginBottom: 'auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Search by name:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              style={{ borderRadius: '5px', padding: '5px' }}
            />
          </div>

          {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress />
          </div>
        )}
          {!loading && (
          <>
           <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Profile Image</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarmers.map((farmer) => (
                  <tr key={farmer._id} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={tdStyle}>{farmer.name}</td>
                    <td style={tdStyle}>{farmer.email}</td>
                    <td style={tdStyle}>
                      {farmer.image && (
                        <img
                          src={`data:${farmer.image.contentType};base64,${farmer.image.data}`}
                          alt="Profile"
                          width="38px"
                          height="38px"
                          style={{ padding: 0 }}
                        />
                      )}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(farmer._id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          </>)}
         
        </div>
     
      </div>
        </Paper>

      </Paper>
     
    </div>
      <Footer style={{ marginTop: 'auto' }} />
    </>
  );
}

export default ManageICWorker;
