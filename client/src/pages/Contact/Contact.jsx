import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import carousel_bg_1 from "../../../assets/img/carousel-bg-1.jpg";

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* Page Header */}
      <div
        className="container-fluid page-header mb-5 p-0"
        style={{ backgroundImage: `url(${carousel_bg_1})` }}
      >
        <div className="container-fluid page-header-inner py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3" data-aos="slide-down">
              Contact
            </h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="#">Pages</Link>
                </li>
                <li
                  className="breadcrumb-item text-white active"
                  aria-current="page"
                >
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Form & Map */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            {/* Google Map */}
            <div
              className="col-md-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15957.566146462412!2d38.7468892!3d9.0301406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8539d253a3a3%3A0x5e3b6ea1df37e2e3!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1720989000000!5m2!1sen!2set"
                frameBorder="0"
                style={{ minHeight: "350px", border: "0" }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>

            {/* Contact Form */}
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
              <h2 className="mb-3">Have a Question?</h2>
              <p className="mb-4">
                We’re here to help and answer any questions you might have.
                Please fill out the form below, and our team will reach out to
                you shortly.
              </p>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="col-12 mt-5" data-aos="fade-up" data-aos-delay="100">
              <div className="text-center mb-5">
                <h1>Contact For Any Query</h1>
              </div>
              <div className="row gy-2">
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Phone</h5>
                    <p className="m-0">
                      <i className="fa fa-phone-alt text-primary me-2"></i>
                      +251-985102027
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Email</h5>
                    <p className="m-0">
                      <i className="fa fa-envelope-open text-primary me-2"></i>
                      amirmubarek@gmail.com
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-light d-flex flex-column justify-content-center p-4 rounded shadow-sm">
                    <h5 className="text-uppercase">Address</h5>
                    <p className="m-0">
                      <i className="fa fa-map-marker-alt text-primary me-2"></i>
                      A.A, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
