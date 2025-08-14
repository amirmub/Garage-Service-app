import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import service_1 from "../../../assets/img/service-1.jpg";
import service_2 from "../../../assets/img/service-2.jpg";
import service_3 from "../../../assets/img/service-3.jpg";
import service_4 from "../../../assets/img/service-4.jpg";

function MainServices() {
  const [activeTab, setActiveTab] = useState("tab4");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const services = [
    { key: "tab4", title: "Oil Changing", icon: "fa-oil-can", img: service_4 },
    { key: "tab1", title: "Diagnostic Test", icon: "fa-car-side", img: service_1 },
    { key: "tab2", title: "Engine Servicing", icon: "fa-car", img: service_2 },
    { key: "tab3", title: "Tires Replacement", icon: "fa-cog", img: service_3 },
  ];

  const activeService = services.find((service) => service.key === activeTab);

  return (
    <div className="container-xxl service py-5">
      <div className="container">
        <div className="text-center mb-5" data-aos="fade-up">
          <h1>Why Choose Us</h1>
        </div>
        <div className="row g-4">
          {/* Tabs */}
          <div className="col-lg-4" data-aos="fade-in"  data-aos-offset="200">
            <div className="nav w-100 nav-pills me-4 flex-column">
              {services.map((service) => (
                <button
                  key={service.key}
                  className={`nav-link w-100 d-flex align-items-center text-start p-4 mb-3 ${
                    activeTab === service.key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(service.key)}
                >
                  <i className={`fa ${service.icon} fa-2x me-3`}></i>
                  <h4 className="m-0">{service.title}</h4>
                </button>
              ))}
            </div>
          </div>

        {/* Single Tab Content */}
        <div className="col-lg-8" data-aos="fade-up" data-aos-offset="50" data-aos-easing="ease-in-out">
        <div className="row g-4 align-items-end">
            <div className="col-md-6">
            <img
                className="img-fluid w-100 rounded"
                src={activeService.img}
                alt={activeService.title}
                style={{
                objectFit: "cover",
                maxHeight: "368px",  // adjust as needed
                width: "100%",
                display: "block",
                marginTop: "auto",
                marginBottom: "0",
                }}
            />
            </div>
              <div className="col-md-6 d-flex flex-column">
                <h3 className="mb-3">{activeService.title}</h3>
                <p className="mb-4">
                  Trusted expertise backed by years of hands-on care. From routine checks to complex repairs, we keep your car running smoothly and safely.
                </p>
                <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                <p><i className="fa fa-check text-success me-3"></i>Affordable Pricing</p>
                <p><i className="fa fa-check text-success me-3"></i>Customer Satisfaction</p>
              </div>

        </div>
        </div>

        </div>
      </div>
    </div>
  );
}

export default MainServices;
