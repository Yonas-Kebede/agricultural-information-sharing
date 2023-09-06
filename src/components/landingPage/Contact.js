import React from 'react';
import './style.css';
// section-padding
function Contact() {
  return (
    <section id="contact" className="contact ">
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header text-center pb-5">
              <h2>Contact</h2>
              <p>Lorem ipsum dolor sit amet, consectetur <br />adipisicing elit. Non, quo.</p>
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-md-9 p-0 pt-4 pb-4">
            <form action="#" className="bg-light p-4 m-auto">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input className="form-control" placeholder="Full Name" required type="text" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input className="form-control" placeholder="Email" required type="email" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <textarea className="form-control" placeholder="Message" required rows="3" />
                  </div>
                </div>
                <div className="col-md-12">
                  <button className="btn btn-warning btn-lg btn-block mt-3" type="button">Send Now</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-3">
            <form className="bottom_form">
              <h3>Newsletter</h3>
              <input className="enter" placeholder="Enter your phone number" type="text" name="Enter your email" />
              <button className="sub_btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
