import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const serviceItems = [
    {
      icon: "fa-certificate",
      title: "Quality Servicing",
      desc: "Reliable maintenance & repairs you can count on.",
      delay: 100,
    },
    {
      icon: "fa-users-cog",
      title: "Expert Workers",
      desc: "Highly trained technicians dedicated to your car’s care.",
      delay: 300,
    },
    {
      icon: "fa-tools",
      title: "Modern Equipment",
      desc: "Advanced tools for precise, efficient service.",
      delay: 500,
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-4">
          {serviceItems.map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay={service.delay}
            >
              <div className="d-flex bg-light py-5 px-4 rounded shadow-sm h-100">
                <i
                  className={`fa ${service.icon} fa-3x text-primary flex-shrink-0`}
                ></i>
                <div className="ps-4">
                  <h5 className="mb-3">{service.title}</h5>
                  <p>{service.desc}</p>
                  <Link
                    className="text-secondary border-bottom"
                    to="#"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
