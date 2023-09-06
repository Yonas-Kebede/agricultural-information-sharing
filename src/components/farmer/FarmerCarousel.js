import React from 'react';
import './FarmerCarousel.css'; // Import CSS file for styling
import image from './assets/image.jpg'
const ImageWithOverlay = () => {
  return (
    <div className="image-container">
      <img src={image} width={'50%'} height={'50%'} className="d-block w-100" alt="..." />
      <div className="overlay">
        <h4 className="overlay-text">Choose AISS for fast, reliable uptodate Agri Information</h4>
      </div>
    </div>
  );
};

export default ImageWithOverlay;




// import image from './assets/image.jpg'
// import imageone from './assets/imageone.jpg'
// import imagetwo from './assets/imagetwo.webp'
// import './style.css'
// import './bootstrap.min.css'
// const FarmerCarousel = () =>
// {
//     return (
//         <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
//             <div className="carousel-indicators">
//                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
//             </div>
//             <div className="carousel-inner">
//                 <div className="carousel-item active">
//                     <img src={image} className="d-block w-100" alt="..." />
//                     <div className="carousel-caption">
//                         <h5>ACCESSIBLE</h5>
//                         <p>We provide features such as alternative text for images, keyboard navigation support, 
//                             and adjustable text size to enhance accessibility.</p>
//                         {/* <p><a href="#" className="btn btn-warning mt-3">Learn More</a></p> */}
//                     </div>
//                 </div>
//                 <div className="carousel-item">
//                     <img src={imageone} className="d-block w-100" alt="..." />
//                     <div className="carousel-caption">
//                         <h5>EASY</h5>
//                         <p>The interface is intuitive, allowing users to easily navigate through 
//                             various features and access the information they need. </p>
//                         {/* <p><a href="#" className="btn btn-warning mt-3">Learn More</a></p> */}
//                     </div>
//                 </div>
//                 <div className="carousel-item">
//                     <img src={imagetwo} className="d-block w-100" alt="..." />
//                     <div className="carousel-caption ">
//                         <h5>CREDIBLE</h5>
//                         <p> We ensure that the data and insights presented in our app are up-to-date, verified, and backed by credible sources..</p>
//                         {/* <p><a href="#" className="btn btn-warning mt-3">Learn More</a></p> */}
//                     </div>
//                 </div>
//             </div>
//             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//             </button>
//             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//             </button>
//         </div>
//     );
// }

// export default FarmerCarousel;
