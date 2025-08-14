import { useState } from "react";
import service_1 from "../../../assets/img/service-1.jpg";
import service_2 from "../../../assets/img/service-2.jpg";
import service_3 from "../../../assets/img/service-3.jpg";
import service_4 from "../../../assets/img/service-4.jpg";

function MainServices() {
  const [activeTab, setActiveTab] = useState("tab4");

  const services = [
    { key: "tab4", title: "Oil Changing", icon: "fa-oil-can", img: service_4 },
    { key: "tab1", title: "Diagnostic Test", icon: "fa-car-side", img: service_1 },
    { key: "tab2", title: "Engine Servicing", icon: "fa-car", img: service_2 },
    { key: "tab3", title: "Tires Replacement", icon: "fa-cog", img: service_3 },
  ];

  return (
    <div className="container-xxl service py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1>Why Choose Us</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="nav w-100 nav-pills me-4">
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
          <div className="col-lg-8">
            <div className="tab-content w-100">
              {services.map((service) => (
                <div
                  key={service.key}
                  className={`tab-pane fade ${
                    activeTab === service.key ? "show active" : ""
                  }`}
                >
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "365px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute img-fluid w-100 h-100"
                          src={service.img}
                          style={{ objectFit: "cover" }}
                          alt={service.title}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-3">12 Years Of Experience In Auto Servicing</h3>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainServices;
