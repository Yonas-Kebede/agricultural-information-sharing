import React from 'react';
import NavBar from './FNavBar';
import './farmer.css'
import img from './assets/woman.jpg'
import { Container, Paper } from '@mui/material';

import CardLayout from './CardLayout';
import img1 from './assets/corn.jpg'
import job from './assets/job.jpg'
import newsfeed from './assets/newsfeed.jpg'
import MyFooter from '../landingPage/myfooter';
import Carousel from '../landingPage/Carousel';
import FarmerCarousel from './FarmerCarousel';
import ImageWithOverlay from './FarmerCarousel';
import QA from './QA';

const Home = () =>
{

    return (
        <>
            <div style={{ position: 'fixed', top: '0px', right: '0px', left: '0px' ,zIndex:5}}>
            <NavBar />
            </div>
            
            <div className="home-page">
           
                
                
                    <div style={{zIndex:1}}>
                    <ImageWithOverlay/>
                    </div>

               
                <main>
                    <Container sx={{ backgroundColor: 'whitesmoke', padding: '2rem' }} className="hero-section">
                        <h2>Empowering Farmers with Reliable Information</h2>
                        <div style={{ display: 'flex' }}>
                            <p style={{ marginTop: '3rem',marginRight:'3%'}}>
                               
                                With our Agricultural Information Sharing System, 
                                we provide an extensive range of valuable agricultural information 
                                like new cerials, technologies, daily market information, 
                                weather information and government policies, all at your fingertips.<br/> <br/>
                                 We understand the challenges farmers face, and our mission is to empower 
                                you with the knowledge and tools necessary to make informed decisions and optimize your farming practices.
                            </p>
                            <img
                                src={img}
                                width="50%"
                                height='30%'
                                
                            />
                        </div>
                    </Container>
                    <section className="features-section">

                        <Container className="feature" sx={{ backgroundColor: 'whitesmoke' }}>
                            <h3>Marketplace</h3>
                            <p>Buy and sell agricultural products and equipment with other farmers.</p>
                            <Paper elevation={0} sx={{ display: { xs: 'block', md: 'flex' }, margin: '0 auto' }}>
                                <CardLayout style={{ margin: 'auto 2rem' }} img={img1} title="Products you Posted to sell" count={0} link='/farmer/agri-pros'
                                    description="This section is all about products you posted earlier. click learn more to manage your posts" />

                                <CardLayout img={job} title="Jobs you Posted to hire" count={0} link='/farmer/agri-jobs'
                                    description="This section is all about jobs you posted earlier. click learn more to manage your posts" />

                                <CardLayout img={newsfeed} title="News you have to look" link='/news-feed'
                                    description="This section is all about newsfeeds you posted earlier. click learn more to see more" />

                            </Paper>

                        </Container>
                    </section>
                </main>
                <MyFooter />
            </div>
        </>
    );
};

export default Home;
