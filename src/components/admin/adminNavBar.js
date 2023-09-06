import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auserauth/store';
import axios from 'axios';
import '../focus.css'

const AdminNavBar = () => {
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

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('user');
    navigate('/sign-in');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
      <div className="container">
        <Navbar.Brand as={Link} to="/Dashboard">
          <h6>AISS</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='NavLink1' as={Link} to="/Dashboard">
              <h6>Home</h6>
            </Nav.Link>
            <NavDropdown className='NavLink1' title="Manage-Accounts" id="navbarDropdown">
              <NavDropdown.Item  as={Link} to="/ManageDAWorker">
                DA-WORKER
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/ManageFarmers">
                Farmer
              </NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/ManageICWorker">
                IC
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown
              title={<img src={profileImage} alt="Profile" width="38px" height="38px" style={{ padding: 0 }} />}
              id="navbarDropdown"
              style={{margin:'auto 4rem'}}
            >
              <NavDropdown.Item as={Link} to="/updateprofile">
                Update Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AdminNavBar;
