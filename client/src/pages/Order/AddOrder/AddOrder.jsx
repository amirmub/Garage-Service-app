import { useEffect, useRef, useState } from "react";
import Sidebar from "../.../../../../components/Sidebar/Sidebar";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({});
  const [vehicleData, setVehicleData] = useState({});
  const [servicesData, setServicesData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]); // store selected service objects
  const servicesDom = useRef({});

  const auth = getAuth();
  const loggedUser = auth?.token || "no token";

  // to get customer data
  useEffect(() => {
    async function fetchOrderData() {
      try {
        const response = await axios.get("/customers", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
        setOrderData(response.data.msg);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
    fetchOrderData();
  }, [loggedUser]);

  // to get vehicle data
  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await axios.get("/vehicles", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
        setVehicleData(response.data.msg);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    }
    fetchVehicleData();
  }, [loggedUser]);

  // to get services data
  useEffect(() => {
    async function fetchServicesData() {
      try {
        const response = await axios.get("/all-services", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
        setServicesData(response.data.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    }
    fetchServicesData();
  }, [loggedUser]);

  // Handle checkbox click: store full service objects instead of IDs
  const handleServiceSelect = (serviceId, checked) => {
    setSelectedServices((prev) => {
      if (checked) {
        // Find service object by id
        const serviceObj = servicesData.find((s) => s.service_id === serviceId);
        if (!serviceObj) return prev;
        // Avoid duplicates
        if (prev.find((s) => s.service_id === serviceId)) return prev;
        return [...prev, serviceObj];
      } else {
        return prev.filter((s) => s.service_id !== serviceId);
      }
    });
  };

  const descriptionDom = useRef({});
  const priceDom = useRef({});

  const handleAdditionalRequest = async (e) => {
    e.preventDefault();
    const descriptionValue = descriptionDom.current.value;
    const priceValue = priceDom.current.value;

    try {
      const response = await axios.post(
        "/order",
        {
          additional_request: descriptionValue,
          order_total_price: priceValue,
          order_services: selectedServices.map(service => ({ service_id: service.service_id })),
        },
        {
          headers: { Authorization: `Bearer ${loggedUser}` },
        }
      );
      console.log(response.data);
      

      setTimeout(() => {
        navigate("/order-detail", {
        state: {
          selectedServices: selectedServices, // full objects now
          orderResponse: response.data,
          additionalRequest: descriptionValue,
          price: priceValue,
          // order_status: 0, // newly created order starts as "Received"
        },
      });
      }, 2000);

      toast.success("Order submitted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit order.");
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
          <div className="col-md-9 col-lg-10 p-5">
            <div className="d-flex align-items-center mb-2">
              <h3 className="text-primary fw-bold me-1">Create a new order</h3>
            </div>

            {/* CUSTOMER INFO CARD */}
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">
                    <strong>Name: </strong>
                    {orderData[0]?.customer_first_name} {orderData[0]?.customer_last_name}
                  </h5>
                  <p className="mb-1">
                    <strong>Email: </strong> {orderData[0]?.customer_email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone: </strong> {orderData[0]?.customer_phone_number}
                  </p>
                </div>
              </div>
            </div>

            {/* VEHICLE INFO CARD */}
            <div className="card mb-4">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">
                    <i className="fa text-danger fa-car mx-1"></i> {vehicleData[0]?.vehicle_make}
                  </h5>
                  <p className="mb-1">
                    <strong>Vehicle color:</strong> {vehicleData[0]?.vehicle_color}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle tag:</strong> {vehicleData[0]?.vehicle_tag}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle year:</strong> {vehicleData[0]?.vehicle_year}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle serial:</strong> {vehicleData[0]?.vehicle_serial}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle type:</strong> {vehicleData[0]?.vehicle_type}
                  </p>
                </div>
              </div>
            </div>

            {/* SERVICES CHECKLIST */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mx-2 mb-3">Choose service</h5>
                <div>
                  {servicesData.map((service) => (
                    <div
                      className="form-check mb-3 border-bottom pb-2 d-flex justify-content-between align-items-start"
                      key={service.service_id}
                    >
                      <label
                        ref={(el) => {
                          if (el) servicesDom.current[service.service_id] = el;
                        }}
                        style={{ cursor: "pointer" }}
                        className="form-check-label px-1 mb-0"
                        htmlFor={service.service_id}
                      >
                        <strong>{service.service_name}</strong>
                        <br />
                        <small>{service.service_description}</small>
                      </label>

                      <input
                        className="form-check-input mt-3 mx-3 p-2"
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        id={service.service_id}
                        onChange={(e) =>
                          handleServiceSelect(service.service_id, e.target.checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ADDITIONAL REQUESTS */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-3 d-flex align-items-center">
                  Additional requests
                </h5>

                <form onSubmit={handleAdditionalRequest}>
                  <div className="mb-3">
                    <textarea
                      ref={descriptionDom}
                      type="text"
                      className="form-control"
                      rows="4"
                      placeholder="Service description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <input
                      ref={priceDom}
                      type="text"
                      className="form-control"
                      placeholder="Price"
                    />
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      console.log("Final Selected Services:", selectedServices);
                    }}
                    type="submit"
                  >
                    SUBMIT ORDER
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

export default AddOrder;
