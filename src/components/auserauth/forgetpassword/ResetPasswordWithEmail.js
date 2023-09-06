import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../landingPage/copyright';
import NavBar from '../../landingPage/NavBar';


function SubmitEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [text, settext] = useState("");
  useEffect(() => {
   
    setMessage('')
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://localhost:3001/user/resetpwbyemail', { email });
      if (response.status === 200) {
        setMessage(response.data.message);
        setError('');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Failed to send reset email.');
      }
      setMessage('');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <NavBar />
      </div>
      <div className="my-3">
        <Card style={{ maxWidth: '30rem' }}>
          <Card.Body>
            <Card.Title style={{ marginBottom: '2rem' }}>Forget Password</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter Your Email..."
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mb-3"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mr-3 mt-3" disabled={loading}>
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Reset Password'
                )}
              </Button>
            </Form>
            {message ? (
              <p>{message}</p>
            ) : (
              <Form.Text className="text-muted mb-3">
                We'll send you an email with instructions to reset your password.
              </Form.Text>
            )}
            {error && (<p>{error}</p>)
             
            }
            <Link to="/sign-in">Back to Login</Link>
          </Card.Body>
        </Card>
      </div>
      <div  style={{position:'absolute' ,bottom:'1px',width:'100%'}}>
        <Footer />
      </div>
    </div>
  );
}

export default SubmitEmail;
