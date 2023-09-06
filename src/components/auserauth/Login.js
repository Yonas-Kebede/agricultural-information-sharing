import React, { useRef, useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../landingPage/NavBar';
import Footer from '../landingPage/copyright';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './store';

const theme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userRef = useRef();

  useEffect(() => {
    
    setEmail('');
    setPassword('');
   
   
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3001/user/login', {
        email,
        password,
      });

      if (response.status === 201) {
        const userData = response.data;

        dispatch(login(userData));
        setError('');
        sessionStorage.setItem('user', JSON.stringify(userData));
        setSuccess(true);
        setPassword('')
        setEmail('')
        setRememberMe('')
        setTimeout(() => {
          setError('');
          setSuccess(false)
          setLoading(false); // Set loading state to false after a delay
          switch (userData.role) {
              case 'Admin':
                navigate('/Dashboard');
                break;
              case 'Farmer':
                navigate('/Home');
                break;
              case 'IC':
                navigate('/Newsfeed');
                break;
              case 'Labour':
                navigate('/LaborWorkerHome');
                break;
                case 'Buyer':
                  navigate('/BuyerHome');
                    break;
              case 'DA':
                navigate('/');
                break;
              default:
                // Handle default case or redirect to a common route
                navigate('/');
                break;
          }
        }, 1500);
            // Perform redirection based on user role
   
      
      } else {
        const errorData = response.data;
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={5} sx={{ padding: '20px', margin: '5rem auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
             
              <TextField
                label="Email"
                fullWidth
                inputRef={userRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Link
              to="/SubmitEmail"
            
              variant="body2"
              align="center"
              style={{ marginRight: '10rem',color:'purple',textDecoration: 'none' }}
            >
              Forgot Password?
            </Link>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember Me"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </Button>
              {success && <p style={{color:'green'}}>Logging in successfully.</p>}
              {error && <p style={{color:'red'}}>Incorrect cridential</p>}
            </form>
            
            
            <Link
              to="/sign-up"
              variant="body2"
              align="center"
              style={{ marginLeft: '0.1rem', textDecoration: 'none' }}
            >
              No Account? Register
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </ThemeProvider>
  );
};

export default Login;
