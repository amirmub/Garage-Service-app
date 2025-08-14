import { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";

function Facts() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,   // animate again if scrolled up/down
      mirror: true,  // animation triggers on scroll up
    });
  }, []);

  return (
    <div className="container-fluid fact bg-dark my-5 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6 col-lg-3 text-center" data-aos="fade-up">
            <i className="fa fa-check fa-2x text-white mb-3"></i>
            <h2 className="text-white mb-2">
              <CountUp end={12} duration={3} />
            </h2>
            <p className="text-white mb-0">Years Experience</p>
          </div>

          <div className="col-md-6 col-lg-3 text-center" data-aos="fade-up" data-aos-delay="100">
            <i className="fa fa-users-cog fa-2x text-white mb-3"></i>
            <h2 className="text-white mb-2">
              <CountUp end={67} duration={3} />
            </h2>
            <p className="text-white mb-0">Expert Technicians</p>
          </div>

          <div className="col-md-6 col-lg-3 text-center" data-aos="fade-up" data-aos-delay="200">
            <i className="fa fa-users fa-2x text-white mb-3"></i>
            <h2 className="text-white mb-2">
              <CountUp end={878} duration={3} />
            </h2>
            <p className="text-white mb-0">Satisfied Clients</p>
          </div>

          <div className="col-md-6 col-lg-3 text-center" data-aos="fade-up" data-aos-delay="300">
            <i className="fa fa-car fa-2x text-white mb-3"></i>
            <h2 className="text-white mb-2">
              <CountUp end={1321} duration={3} />
            </h2>
            <p className="text-white mb-0">Completed Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facts;
