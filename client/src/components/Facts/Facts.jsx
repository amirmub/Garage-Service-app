import { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useInView } from "react-intersection-observer";

function Facts() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const facts = [
    { icon: "fa-check", end: 12, label: "Years Experience", delay: 0 },
    { icon: "fa-users-cog", end: 67, label: "Expert Technicians", delay: 100 },
    { icon: "fa-users", end: 878, label: "Satisfied Clients", delay: 200 },
    { icon: "fa-car", end: 1321, label: "Completed Projects", delay: 300 },
  ];

  return (
    <div className="container-fluid fact bg-dark my-5 py-5">
      <div className="container">
        <div className="row g-4">
          {facts.map(({ icon, end, label, delay }, index) => {
            const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
            return (
              <div
                key={index}
                ref={ref}
                className="col-md-6 col-lg-3 text-center"
                data-aos="fade-up"
                data-aos-delay={delay}
              >
                <i className={`fa ${icon} fa-2x text-white mb-3`}></i>
                <h2 className="text-white mb-2">
                  {inView ? <CountUp end={end} duration={3} /> : 0}
                </h2>
                <p className="text-white mb-0">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Facts;
