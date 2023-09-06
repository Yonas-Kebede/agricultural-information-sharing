import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import './nav.css';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { logout } from '../auserauth/store';
import { useEffect } from 'react';
import axios from 'axios';
import '../focus.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user.role);

  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/getuserbyid/${user._id}`);
        const { name, email, image } = response.data;

        if (image) {
          console.log('ggggggggggggggggggg');
          const imageUrl = `data:${image.contentType};base64,${image.data}`;
          setProfileImage(imageUrl); // Set the Base64 encoded image URL to the state
        }
        console.log('User Profile:', { name, email });
        // Do something with the profile data
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user && user._id) {
      fetchUserProfile();
    }

    return () => {
      // Cleanup function to cancel any pending API requests or subscriptions
    };
  }, [user]);

  console.log("farmer" + user.role)

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('user');
    navigate('/sign-in');
  };
  return (
    <Paper className="text-primary navMain1">
      <nav className="navbar navbar-expand-lg navbar-light m-2 " style={{ backgroundColor: 'white' }}>
        <Link className="navbar-brand" to="/" style={{ marginLeft: '30px' }}>
          AIIS
        </Link>
        <button className="navbar-toggler" style={{ zIndex: 1000 }} type="button"
          data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto" style={{ marginRight: '17px' }}>

            <li className="nav-item active mx-2">
              <Link to="/home" className="nav-link NavLink1">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/farmer/news-feed" className="nav-link NavLink1">NewsFeed</Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/qa" className="nav-link NavLink1">Q&A</Link>
            </li>
            <li>
              <NavDropdown className='NavLink1' title="Management Panel" id="navbarDropdown">
                <NavDropdown.Item as={Link} to="/farmer/agri-pros">
                  Agri-Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/farmer/agri-jobs">
                  Agri-Jobs
                </NavDropdown.Item>

              </NavDropdown>
            </li>
            <li className="nav-item mx-2">
              <Link to="/Fmkt" className="nav-link NavLink1">Market Information</Link>
            </li>


            <NavDropdown
              title={<img src={profileImage} alt="Profile" width="38px" height="38px" style={{ padding: 0 }} />}
              id="navbarDropdown"
              style={{ margin: 'auto 4rem' }}
            >
              <NavDropdown.Item as={Link} to="/Farmerprofileupdate">
                Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>

          </ul>
        </div>
      </nav>
    </Paper>
  );
}

export default NavBar;
