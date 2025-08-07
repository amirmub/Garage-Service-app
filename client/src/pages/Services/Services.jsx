import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import { ClipLoader } from "react-spinners";
import { useRef } from "react";


function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const loggedUser = auth?.token || "no token";

//   get all services from backend
  useEffect(() => {
    async function fetchingData() {
      try {
        const result = await axios.get("/all-services", {
          headers: {
            Authorization: `Bearer ${loggedUser}`,
          },
        });
        // Safely assign services array or fallback to empty array
        setServices(Array.isArray(result.data.data) ? result.data.data : []);
      } catch (error) {
        console.log(error.response || error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    }
    fetchingData();
  }, []);

   //  to add services
   const nameDom = useRef();
   const descriptionDom = useRef();

   async function handleSubmit(e) {
    e.preventDefault()
    const nameValue = nameDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    try {
         const result = await axios.post("/add-service",{
            service_name : nameValue,
            service_description : descriptionValue,
        },{
          headers: {
            Authorization: `Bearer ${loggedUser}`,
          },
        }
    )
        console.log(result);
         const newService = result.data.msg; // Assumes backend returns the new service object

    // Add the new service to the existing list
    setServices((prev) => [...prev, newService]);

        // Clear input fields after successful submission
        nameDom.current.value = "";
        descriptionDom.current.value = "";

        const refreshed = await axios.get("/all-services", {
       headers: {
            Authorization: `Bearer ${loggedUser}`,
          },
      });
    setServices(Array.isArray(refreshed.data.data) ? refreshed.data.data : []);

    } catch (error) {
        console.log(error.response);
        
    }

   }


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 px-5 py-4">
          <div className="container my-3">
            <h3 className="mb-2">
              Services we provide <span className="text-danger"></span>
            </h3>
            <small className="mb-5">
              We offer a wide range of professional services tailored to meet your unique needs. 
              Whether it's routine maintenance or complex diagnostics, our team ensures reliable,
               high-quality solutions with a customer-first approach.
            </small>

            <div className="list-group mb-5 mt-3">
              {loading ? (
                <div className="my-5" style={{ display: "flex", justifyContent: "center" }}>
                  <ClipLoader color="#f00" loading={loading} size={30} />
                </div>

              ) : services.length === 0 ? (
                <div className="text-muted">No services available.</div>
              ) : (
                services.map(({ service_id, service_name, service_description }) => (
                  <div key={service_id}
                    className="list-group-item d-flex justify-content-between align-items-start p-3"
                  >
                    <div className="col-12 col-md-9">
                        <h6>{service_name}</h6>
                        <small
                            style={{
                                display: "block",
                                maxWidth: "100%",
                                wordWrap: "break-word",
                                whiteSpace: "pre-wrap"
                            }}
                            >
                            {service_description}
                        </small>

                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Link to="#" style={{ display: "flex", alignItems: "center" }}>
                        <i
                        className="bi bi-pencil-square"
                        style={{ color: "#091436", fontWeight: "900", verticalAlign: "middle", fontSize: "1.1rem" }}
                        />
                    </Link>
                    <Link to="#" style={{ display: "flex", alignItems: "center" }}>
                        <i
                        className="fas fa-trash"
                        style={{ color: "red", verticalAlign: "middle", fontSize: "1.1rem" }}
                        />
                    </Link>
                    </div>

                  </div>
                ))
              )}
            </div>

            <h5 className="mb-3">
              Add a new service <span className="text-danger"></span>
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                ref={nameDom}
                  type="text"
                  className="form-control"
                  placeholder="Service name"
                />
              </div>
              <div className="mb-3">
                <textarea
                ref={descriptionDom}
                  className="form-control"
                  rows="3"
                  placeholder="Service description"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-danger">
                Add Service
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
