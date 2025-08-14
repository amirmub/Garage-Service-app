import { Link } from "react-router-dom";
import carousel_bg_1 from "../../../assets/img/carousel-bg-1.jpg";
import OurServices from "../../components/OurServices/OurServices";
import MainServices from "../../components/MainServices/MainServices";

function ServicePage() {
  return (
    <>
      <div>
        <div
          className="container-fluid page-header mb-5 p-0"
          style={{ backgroundImage: `url(${carousel_bg_1})` }}
        >
          <div className="container-fluid page-header-inner py-5">
            <div className="container text-center">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
               Services
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
                    Services
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <OurServices />
      <MainServices />


    </>
  );
}

export default ServicePage;
