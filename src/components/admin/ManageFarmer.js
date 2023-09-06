import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import AdminNavBar from './adminNavBar';
import Footer from '../landingPage/copyright';
import { CircularProgress ,Paper} from '@mui/material';

function ManageFarmers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profileData, setProfileData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const role='Farmer';
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3001/user/getallusers?page=${page}&limit=10&role=${role}`);

      const { data, count } = response.data;
      setProfileData(data);
      console.log(data)
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
    textAlign: 'center',
    whiteSpace: 'nowrap', // Prevent table header from wrapping
  };
  const tdStyle = { border: 'none', padding: '0.5rem' };

  return (
    <>
      <Paper sx={{ display: 'block', flexDirection: 'column', minHeight: '100vh' }}>
        <AdminNavBar />
        <br />
        <br />
        <div style={{ padding: '40px', marginBottom: 'auto' }}>
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
        <Footer />
      </Paper>
    </>
  );
}

export default ManageFarmers;
