import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, CircularProgress, TextField, Box } from '@mui/material';
import { Select, MenuItem } from '@mui/material';

import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import IcNavBar from './icNavBar';
import MyFooter from '../landingPage/myfooter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { format } from 'timeago.js';

const Newsfeed = () => {
  const user = useSelector((state) => state.user);
  const [newsfeed, setNewsfeed] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [id, setid] = useState('')
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate()
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true)
        const response = await axios.get(`http://localhost:3001/news/getnewsbyuserid?page=${currentPage}&limit=3&id=${user._id}&search=${search}&filter=${filter}`);
        const { data, count } = response.data;
        setNewsfeed(data);
        setTotalPages(Math.ceil(count / 3));
      } catch (error) {
        console.error('Error:', error);
      }
      setisLoading(false)
    };

    fetchData();
  }, [search, filter, currentPage, loading]);


  const handleAddNewsfeed = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('id', user._id);
    try {
      //add
      if (!editMode) {
        const response = await axios.post(`http://localhost:3001/news/addnews`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          setSuccess(true);
          setError('');
          setTitle('');
          setDescription('');
          setCategory('');
          setImage(null);


          setTimeout(() => {
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);
          }, 1500);
        }

      }
      //update
      else {
        const response = await axios.put(`http://localhost:3001/news/updatenews/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          setSuccess(true);
          setError('');
          setTitle('');
          setDescription('');
          setCategory('');
          setImage(null);
          setLoading(false);

          setTimeout(() => {
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);
            setEditMode(false)
          }, 1500);
        }
      }
    }
    catch (error) {
      setTimeout(() => {
        setError('')
      }, 1500);
      setSuccess(false);
      editMode(false)
      setLoading(false); // Set loading state to false
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
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
  const handleEditNews = async (id) => {
    console.log("cccccccccccccccccccccccccc")
    const newsfeeditem = newsfeed.find((item) => item._id === id);
    setid(newsfeeditem._id);
    setTitle(newsfeeditem.title);
    setDescription(newsfeeditem.description);
    setCategory(newsfeeditem.category)
    setImage(newsfeeditem.image);
    setEditMode(true);

  };

  const handleDeleteNews = async (id) => {

    axios
      .delete(`http://localhost:3001/news/deletenews/${id}`)
      .then((response) => {
        setNewsfeed(newsfeed.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });


  };

  return (
    <div>
      <div style={{ position: 'fixed', top: '0px', left: '0px',zIndex:5 }}>
        <IcNavBar />
      </div>
      <Paper sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '5rem' }}>

        <Paper elevation={0} sx={{ display: 'block', margin: '1%', backgroundColor: 'whitesmoke', maxHeight: '33rem', width:{xs:'95%',sm:'24%'}}}>
          <h2>ADD Newsfeed</h2>
          <form onSubmit={handleAddNewsfeed}>
            <div>
              <Select
                labelId="select-label"
                id="select-input"
                placeholder='select category'
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Select category"
                required
                style={{zIndex:1}}
              >
                <MenuItem defaultValue="crop">
                  Select Category
                </MenuItem>
                <MenuItem value="crop">crop</MenuItem>
                <MenuItem value="tech">technology</MenuItem>
                <MenuItem value="weather">weather</MenuItem>
                <MenuItem value="policy">policy</MenuItem>
              </Select>
            </div>
            <div className="row" style={{ margin: '1rem' }}>
              <input
                type="text"
                placeholder="newsfeed Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="row" style={{ margin: '1rem' }}>
              <textarea
                type="text"
                rows={5}
                cols={23}
                placeholder="Write the newsfeed detail here...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <input
                accept="image/*"
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                }}
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
            <div style={{ margin: '2rem' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                style={{fontSize:'12px'}}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <div

                  >
                    {editMode ? 'Update News Feed' : 'Add News Feed'}
                  </div>
                )}

              </Button>
              {success && <p>Newsfeed added successfully.</p>}
              {error && <p>{error}</p>}
            </div>
          </form>
        </Paper>
        <Paper elevation={0} sx={{ backgroundColor: 'whitesmoke', margin: '1%', width:{xs:'95%',sm:'74%'}}}>

          <h2> News Feed List</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box margin=" 2rem 4rem " >
                  <TextField
                    label="Search by Term"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Box>
           
            <Box marginLeft='1rem'>
              <label style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                variant="outlined"
                size="small"
                label="Filter by Category"
              > <MenuItem value="">All</MenuItem>
                <MenuItem value="crop">Crop</MenuItem>
                <MenuItem value="tech">Technology</MenuItem>
                <MenuItem value="weather">Weather</MenuItem>
                <MenuItem value="policy">Policy</MenuItem>

              </Select>
            </Box>

            {/* Search and Filter Buttons */}
          </div>
          {isloading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
              <CircularProgress />
            </div>
          )}
          {!isloading && (
            <>    {newsfeed.length === 0 ? (
              <p>non available.</p>
            ) : (
              <div>
                
                <ul>
                  {newsfeed.map(item => (
                    <Paper sx={{ minWidth: { xs: '60px' }, margin: 'auto 1.0rem' }} elevation={0.4} key={item.id}
                    >
                      <Paper sx={{xs:{fontSize:'5px'},sm:{fontSize:'8px'},md:{fontSize:'12px'}}}>
                        Title:{item.title}
                        <span style={{ marginLeft: '30%' }}>Category:{item.category}</span>
                      </Paper>
                      <div className='textCenter'>
                        <Paper sx={{marginBottom: '1rem' }}>
                         <Paper elevation={0} sx={{display:{xs:'block',md:'flex'}}}>
                         <img
                            src={`data:${item.image.contentType};base64,${item.image.data}`}
                            maxWidth='25%'
                            height='25%'
                            className='image-fluid rounded'
                            style={{ maxWidth:'100%' ,height:'50%',margin:' 1rem 1rem',height: 'auto' }}

                          />
                          <div style={{display:'block'}}>
                          <p style={{ padding: '1rem', textAlign: 'justify' }}>{item.description.split(' ').slice(0, 20).join(' ')}</p><br/>
                          <p style={{ marginTop: '3rem' }}>{format(item.date)}</p>
                          </div>
                          
                         </Paper>
                         <br/>                        


                          <div>
                          <button className="btn btn-warning" style={{ margin: ' 2% 1%' }} onClick={() => handleEditNews(item._id)}>
                            Edit
                          </button>
                          <button className="btn btn-danger" style={{ margin: '2% 1%' }} onClick={() => handleDeleteNews(item._id)}>
                            Delete
                          </button>
                          </div>
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
                  </div>
                  {/* {newsfeed.map((newsfeed) => (
                  <Paper elevation={6} sx={{ margin: '1rem' }} key={newsfeed._id}>
                    <span style={{ marginRight: '1.5rem', color: 'red' }}>{newsfeed.catagory} "title": {newsfeed.title}</span>
                    <br />
                    <span style={{ marginRight: '0.5rem' }}>

                    {newsfeed.image && (
                        <img
                          src={`data:${newsfeed.image.contentType};base64,${newsfeed.image.data}`}
                          alt="news.."
                          width="25%" height="25%"
                          
                        />
                      )}

                    </span>
                    <br />
                    <span style={{ marginRight: '0.5rem' }}>{newsfeed.description}</span> <br />

                    <button className="btn btn-warning" style={{ margin: '1rem' }} onClick={() => handleEditNews(newsfeed._id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" style={{ margin: '1rem' }} onClick={() => handleDeleteNews(newsfeed._id)}>
                      Delete
                    </button>
                  </Paper>
                ))} */}
                </ul>
              </div>
            )} </>)}

        </Paper>
      </Paper>
      <MyFooter />
    </div>
  );
};

export default Newsfeed;
