import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Footer from '../../landingPage/copyright';
import NavBar from '../../landingPage/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store';

function ChangePasswordForm() {
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const requestData = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        resetToken: token,
      };

      const response = await axios.post(
        'http://localhost:3001/user/passwordresetpage',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirect to login page after successful password change
      if (response.status === 200) {
        setResetStatus(response.data.message);

        dispatch(logout());
        sessionStorage.removeItem('user');
        setTimeout(() => {
          setLoading(false); // Set loading state to false
          navigate('/sign-in');
        }, 1500);
      }
    } catch (error) {
      console.error('Error resetting password:', error.response.data.message);
      setResetStatus('Error resetting password:', error.response.data.message);
    } finally {
      setLoading(false); // Set loading state to false
    }

    console.log(`New password: ${newPassword}, Confirm password: ${confirmPassword}`);
    // Change password logic goes here
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        <NavBar />
      </div>
      <Card className="mx-3 mx-md-auto" style={{ width: '35%' }}>
        <Card.Body>
          <Card.Title className="text-center">Change Password</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNewPassword">
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
            {resetStatus}
          </Form>
        </Card.Body>
      </Card>
      <div style={{ position: 'absolute', bottom: '1px', width: '100%' }}>
        <Footer />
      </div>
    </div>
  );
}

export default ChangePasswordForm;
