import React from "react";
import { FaCog, FaWrench, FaCarSide, FaCar, FaTools, FaTachometerAlt } from "react-icons/fa";

const services = [
  {
    title: "Performance Upgrade",
    subtitle: "Service & Repairs",
    icon: <FaTachometerAlt size={40} color="#e63946" />,
    description:
      "Boost your car’s performance with expert upgrades and tuning.",
  },
  {
    title: "Transmission Services",
    subtitle: "Service & Repairs",
    icon: <FaWrench size={40} color="#e63946" />,
    description:
      "Complete transmission checks and repairs for smooth gear shifts.",
  },
  {
    title: "Brake Repair & Service",
    subtitle: "Service & Repairs",
    icon: <FaTools size={40} color="#e63946" />,
    description:
      "Reliable brake repair services ensuring maximum safety on the road.",
  },
  {
    title: "Engine Service & Repair",
    subtitle: "Service & Repairs",
    icon: <FaCog size={40} color="#e63946" />,
    description:
      "Comprehensive engine diagnostics, maintenance, and repair.",
  },
  {
    title: "Tyre & Wheels",
    subtitle: "Service & Repairs",
    icon: <FaCarSide size={40} color="#e63946" />,
    description:
      "Wheel alignment, balancing, and tyre replacement for smooth drives.",
  },
  {
    title: "Denting & Painting",
    subtitle: "Service & Repairs",
    icon: <FaCar size={40} color="#e63946" />,
    description:
      "Professional bodywork, dent removal, and premium painting services.",
  },
];

function OurServices() {
  return (
    <section className="pt-5 mt-3" style={{ backgroundColor: "#f8f9fa", paddingBottom : "100px" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Featured Services</h2>
          <p className="text-muted">
            Premium automotive services with expertise, care, and advanced tools.
          </p>
        </div>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="card h-100 shadow-sm border-0 text-center p-4"
                style={{
                  borderRadius: "15px",
                  transition: "all 0.3s ease",
                  backgroundColor: "#fff",
                }}
              >
                <div className="mb-3">{service.icon}</div>
                <h6 className="text-uppercase text-secondary">{service.subtitle}</h6>
                <h4 className="fw-bold mb-3">{service.title}</h4>
                <p className="text-muted">{service.description}</p>
                <a
                  href="#"
                  className="btn btn-outline-danger mt-3"
                  style={{ borderRadius: "50px", padding: "0.5rem 1.5rem" }}
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurServices;
