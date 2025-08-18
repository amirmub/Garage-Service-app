import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState, useEffect, useRef } from "react";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({ service_name: "", service_description: "" });

  const auth = getAuth();
  const loggedUser = auth?.token || "no token";

  // Fetch all services
  useEffect(() => {
    async function fetchingData() {
      try {
        const result = await axios.get("/all-services", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
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

  // Add service refs
  const nameDom = useRef();
  const descriptionDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const nameValue = nameDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    try {
      await axios.post(
        "/add-service",
        {
          service_name: nameValue,
          service_description: descriptionValue,
        },
        { headers: { Authorization: `Bearer ${loggedUser}` } }
      );

      const refreshed = await axios.get("/all-services", {
        headers: { Authorization: `Bearer ${loggedUser}` },
      });
      setServices(Array.isArray(refreshed.data.data) ? refreshed.data.data : []);

       toast.success("Service Added successfully!",{duration: 2000});

      nameDom.current.value = "";
      descriptionDom.current.value = "";
    } catch (error) {
      console.log(error.response);
    }
  }

  // // Delete service
  // async function handleDelete(serviceId) {
  //   if (!window.confirm("Are you sure you want to delete this service?")) return;

  //   try {
  //     await axios.delete(`/delete-service/${serviceId}`, {
  //       headers: { Authorization: `Bearer ${loggedUser}` },
  //     });
  //     setServices((prev) => prev.filter((service) => service.service_id !== serviceId));
  //     toast.success("Service Deleted successfully!",{duration: 2000});
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  // Edit service handlers
  const handleEditClick = (service) => {
    setEditRow(service.service_id);
    setEditData({
      service_name: service.service_name,
      service_description: service.service_description,
    });
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditRow(null);
    setEditData({ service_name: "", service_description: "" });
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.put(
        `/edit-service/${id}`,
        {

            service_name: editData.service_name,
            service_description: editData.service_description,
        },
        { headers: { Authorization: `Bearer ${loggedUser}` } }
      );

       toast.success("Service updated successfully!",{duration: 2000});
      setEditRow(null);

      const refreshed = await axios.get("/all-services", {
        headers: { Authorization: `Bearer ${loggedUser}` },
      });
      setServices(Array.isArray(refreshed.data.data) ? refreshed.data.data : []);
    } catch (error) {
      console.log("Edit error:", error);
      toast.error("Failed to update service!");
    }
  };

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 px-5  py-4">
          <div className="container my-3">
            <h3 className="mb-2  section-title pb-1">Services we provide</h3>
            <small className="fw-bold">
              We offer a wide range of professional services tailored to meet your unique needs.
            </small>

            <div className="list-group shadow-sm mb-5 mt-3">
              {loading ? (
                <div className="my-5" style={{ display: "flex", justifyContent: "center" }}>
                  <ClipLoader color="#f00" loading={loading} size={30} />
                </div>
              ) : services.length === 0 ? (
                <div className="text-muted">No services available.</div>
              ) : (
                services.map((service) => (
                  <div
                    key={service.service_id}
                    className="list-group-item py-4 px-4 d-flex justify-content-between align-items-start"
                  >
                    <div className="col-12 col-md-9">
                      {editRow === service.service_id ? (
                        <>
                          <input
                            type="text"
                            value={editData.service_name}
                            onChange={(e) => handleInputChange("service_name", e.target.value)}
                            className="form-control mb-2"
                          />
                          <textarea
                            value={editData.service_description}
                            onChange={(e) => handleInputChange("service_description", e.target.value)}
                            className="form-control"
                          />
                        </>
                      ) : (
                        <>
                          <div style={{fontSize : "18px", fontWeight : "bold",marginBottom : "4px"}}>{service.service_name}</div>
                          <small style={{ display: "block", whiteSpace: "pre-wrap" }}>
                            {service.service_description}
                          </small>
                        </>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {editRow === service.service_id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSaveEdit(service.service_id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="#" onClick={() => handleEditClick(service)}>
                            <i
                              className="bi bi-pencil-square"
                              style={{
                                color: "#091436",
                                fontWeight: "900",
                                fontSize: "1.1rem",
                              }}
                            />
                          </Link>
                          {/* <Link to="#" onClick={() => handleDelete(service.service_id)}>
                            <i
                              className="fas fa-trash"
                              style={{ color: "red", fontSize: "1.1rem" }}
                            />
                          </Link> */}
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
    
          <div className="p-3" style={{boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.1)"}}>
          <h5 className="mb-3">Add a new service</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input ref={nameDom} type="text" className="form-control" placeholder="Service name" />
              </div>
              <div className="my-3">
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
    </div>
    </>
  );
}

export default Services;
