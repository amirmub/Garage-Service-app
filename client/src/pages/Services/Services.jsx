import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import { ClipLoader } from "react-spinners";


function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const loggedUser = auth?.token || "no token";

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
  }, [loggedUser]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 px-5 py-4">
          <div className="container my-3">
            <h3 className="mb-3">
              Services we provide <span className="text-danger"></span>
            </h3>
            <p className="mb-4">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution.
            </p>

            <div className="list-group mb-5">
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
                    <div>
                      <h6>{service_name}</h6>
                      <small style={{ width: "10px" }}>{service_description}</small>
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
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Service name"
                />
              </div>
              <div className="mb-3">
                <textarea
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
