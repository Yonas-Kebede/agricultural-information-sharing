
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Paper, Typography, Button, CircularProgress } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useNavigate } from 'react-router-dom';
import Footer from '../../landingPage/copyright';
import NavBar from '../FNavBar';
import { useSelector } from 'react-redux';

import { format } from 'timeago.js';
function ProductManagement() {
  const user = useSelector((state) => state.user);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState();
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const [search, setsearch] = useState('')
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setfetching] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [id, setid] = useState('')
  const navigate = useNavigate()

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('phone', phone);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('id', user._id); // Include file in form data
    try {
      if (!editMode) {

        const response = await axios.post('http://localhost:3001/product/addproduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          setSuccess(true);
          setError('');
          setName('');
          setDescription('');
          setQuantity('');
          setPrice('');
          setImage(null);
          setPhone('')

          setTimeout(() => {
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);
          }, 1500);
        }
      }
      else {

        const response = await axios.put(`http://localhost:3001/product/updateproduct/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          console.log('product edit success')
          setSuccess(true);
          setError('');
          setName('');
          setDescription('');
          setQuantity('');
          setPrice('');
          setImage(null);
          setPhone('')
          setLoading(false);
          setTimeout(() => {
            setLoading(false); // Set loading state to false after a delay
            setSuccess(false);
            setEditMode(false);
          }, 1500);
        }

      }
      window.location.reload();

    } catch (error) {
      setTimeout(() => {
        setError('');
      }, 1500);
      setSuccess(false);
      setEditMode(false);
      setLoading(false); // Set loading state to false

      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during job addition.');
      }
    }
  };
  // `http://localhost:3005/product/getproductbyuserid?page=${page}&limit=10&id=${user._id}&search=${search}`
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search]);

  const fetchData = async (page) => {
    try {
      setfetching(true)
      const response = await axios.get(`http://localhost:3001/product/getproductbyuserid?page=${page}&limit=3&id=${user._id}&search=${search}`);
      const { data, count } = response.data;
      setProfileData(data);
      setTotalPages(Math.ceil(count / 3));
    } catch (error) {
      console.error('Error:', error);
    }
    setfetching(false)
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/product/deleteproduct/${id}`)
      .then((response) => {
        setProfileData(profileData.filter((farmer) => farmer._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditProduct = (id) => {
    const productitem = profileData.find((item) => item._id === id);
    setid(productitem._id);
    setName(productitem.name);
    setDescription(productitem.description);
    setPhone(productitem.phone)
    setPrice(productitem.price)
    setQuantity(productitem.quantity)
    setImage(productitem.image);
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
    <>
      <div style={{ position: 'fixed', top: '0px', left: '0px', zIndex: 5 }}>
        <NavBar />
      </div>

      <div >

        <Paper elevation={0} sx={{ display: { xs: 'block', sm: 'flex' }, fontSize: { xs: '10px', sm: '20px' }, marginTop: '5rem ', }}>
          <Paper sx={{ display: 'block', margin: '2rem auto', backgroundColor: 'whitesmoke', marginLeft: '2rem', maxHeight: '33rem', width: { sx: '80%', md: '25%' } }}>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>


              <div>
                <div className="row" style={{ margin: '1rem' }}>
                  <input
                    type="text"
                    placeholder="crop name "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="row" style={{ margin: '1rem' }}>
                  <input
                    type="text"
                    placeholder="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="row" style={{ margin: '1rem' }}>
                  <input
                    type="number"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className="form-control"
                  />
                </div>
                <div className="row" style={{ margin: '1rem' }}>
                  <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="form-control"
                  />
                </div>
                <div className="row" style={{ margin: '1rem' }}>
                  <input
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                  />
                </div>
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
                  <div

                  >
                    {editMode ? 'Update product' : 'Add product'}
                  </div>
                )}

              </Button>
              {success && <p>product added successfully.</p>}
              {error && <p>{error}</p>}
            </form>
          </Paper>


          <Paper sx={{ backgroundColor: 'whitesmoke', margin: '2rem 1rem', marginBottom: '0', width: { xs: '100%', md: '75%' } }}>
            <h2>Product List</h2>


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

            {fetching && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
              </div>
            )}
            {!loading && (
              <>
                {profileData.length === 0 ? (<p>No product available.</p>) : (
                  <div>
                    <ul>
                      {profileData.map((product) => (
                        <Paper elevation={6} sx={{ margin: '1rem' }} key={product._id}>
                          <div>
                            <span style={{ marginRight: '1.5rem', color: 'red' }}>Product name: {product.name}</span>
                            <span style={{ marginLeft: '1.5rem', color: 'red' }}>Quantity: {product.quantity} quntal</span> <br />

                            <span style={{ display: 'inline-flex', marginLeft: '2rem', marginTop: '3%' }}>
                              <img
                                src={`data:${product.image.contentType};base64,${product.image.data}`}
                                width='20%'
                                height='20%'
                                style={{ borderRadius: '2rem' }}

                              />

                              <div>


                                <span style={{ marginRight: '0.5rem' }}>{product.description}</span>
                                <br />
                                <span style={{ marginRight: '1.0rem', color: 'green' }}>Phone: {product.phone}</span> <br />

                              </div>


                            </span>
                            <span style={{ backgroundColor: 'whitesmoke', marginRight: '3%' }}> Price: ETB {product.price}</span>

                            <span style={{ backgroundColor: 'whitesmoke' }}> posted: {format(product.date)}</span><br />
                            <button className='btn btn-warning' style={{ margin: '1rem' }} onClick={() => handleEditProduct(product._id)}>Edit</button>
                            <button className='btn btn-danger' style={{ margin: '1rem' }} onClick={() => handleDelete(product._id)}>
                              Delete
                            </button>


                          </div>



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
                  </div>)}
              </>)}



          </Paper>


        </Paper>

      </div>
      <Footer style={{ marginTop: 'auto' }} />
    </>
  );
}

export default ProductManagement;





