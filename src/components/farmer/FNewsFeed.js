import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Container, MenuItem, Paper, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyFooter from '../landingPage/myfooter';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'timeago.js';
import NavBar from './FNavBar';
const FNewsFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsfeed, setNewsfeed] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:3001/news/getnews?page=${currentPage}&limit=3&search=${search}&filter=${filter}`);
        const { data, count } = response.data;
        setNewsfeed(data);

        setTotalPages(Math.ceil(count / 3));
      } catch (error) {
        console.error('Error:', error);
      }
      setIsLoading(false)
    };

    fetchData();
  }, [search, filter, currentPage]);


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
    <div style={{ display: 'block' }}>
      <div style={{  position: 'fixed', top: '0px', left: '0px',zIndex:5}}>
        <NavBar />
      </div>
      <Paper sx={{
        marginTop: '5rem',
        backgroundColor: 'white', padding: '1rem', width: '100%',
        display: { xs: 'block', md: 'flex' }
      }}>

        <Paper elevation={0} sx={{ alignItems: 'center',display:{xs:'block',sm:'flex'},width:'100%' }}>
          {/* Search Input */}
          <Box margin="0 1rem 0 2rem">
            <TextField
              label="Search by Term"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>

          {/* Filter Select */}
          <Box sx={{ position:'relative', right:{xs:'0',md:'-22rem'}, marginLeft: '1%' }}>
            <label style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              variant="outlined"
              size="small"
              label="Filter by Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="crop">Crop</MenuItem>
              <MenuItem value="tech">Technology</MenuItem>
              <MenuItem value="weather">Weather</MenuItem>
              <MenuItem value="policy">Policy</MenuItem>
              <MenuItem value="priceIndex">Price Index</MenuItem>
            </Select>
          </Box>

          {/* Search and Filter Buttons */}
        </Paper>

      </Paper>


      <div style={{ minHeight: '32rem' }}>

        <Paper sx={{ backgroundColor: 'whitesmoke', display: { xs: 'block', md: 'flex' } }}>
          <Container sx={{ backgroundColor: 'whitesmoke', width: '100%' }}>
            <h3 >NewsFeed</h3>


            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
              </div>
            )}
            {!isLoading && (
              <>     {newsfeed.map(item => (
                <Paper sx={{ minWidth: { xs: '60px' }, margin: 'auto 1.0rem' }} elevation={0.4} key={item.id}
                >
                  <Paper elevation={0} sx={{ fontSize: { xs: '15px', md: '20px' },display:{xs:'block',sm:'flex'} }}>
                    <span style={{overflowWrap:'break-word'}}>Title:{item.title}</span>
                    <span style={{ marginLeft: '25%',overflowWrap:'break-word' }}>Category:{item.category}</span>
                  </Paper>
                  <div className='textCenter'>
                    <Paper sx={{ display: { sx: 'block', sm: 'flex' }, marginBottom: '1rem' }}>
                      <img
                        src={`data:${item.image.contentType};base64,${item.image.data}`}
                        maxWidth='600rem'
                        height='150rem'
                        className='image-fluid rounded'
                        style={{ maxWidth: '100%', height: 'auto', margin: '1%' }}

                      />
                      <Paper elevation={0} sx={{ display: 'block', fontSize: { xs: '15px', md: '20px' } }}>
                        {!showFullText && item.description.split(' ').length > 20 ? (
                          <span
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={toggleText}
                          >
                            See More
                          </span>
                        ) :
                          <p style={{ padding: '1rem', textAlign: 'justify' ,overflowWrap:'break-word'}}>{item.description.split(' ').slice(0, 20).join(' ')}
                          </p>}
                        <br />
                        <p style={{ marginLeft: '30%' }}>date:{format(item.date)}</p>
                      </Paper>
                    </Paper>


                  </div>



                </Paper>
              ))}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button disabled={currentPage === 1} onClick={handlePreviousPage} style={{ marginRight: '10px' }}>
                    <FaArrowLeft />
                  </button>
                  <span>{`Page ${currentPage} of ${totalPages}`}</span>
                  <button disabled={currentPage === totalPages} onClick={handleNextPage} style={{ marginLeft: '10px' }}>
                    <FaArrowRight />
                  </button>
                </div></>)}

            {/*                        
                        <button className='btn btn-primary mb-3' onClick={handleExpand}>
                            {expanded ? 'Show Less...' : 'Show More...'}
                        </button> */}
          </Container>
        </Paper>
      </div>
      <MyFooter />
    </div>
  )
}
export default FNewsFeed