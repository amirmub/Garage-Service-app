import { useEffect, useState } from "react";
import Sidebar from "../.../../../../components/Sidebar/Sidebar";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";

function AddOrder() {
  const [orderData, setOrderData] = useState({});
  const [vehicleData, setVehicleData] = useState({});
  const [servicesData, setServicesData] = useState([]);

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
        console.log("Order data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    }
    fetchOrderData();
  }, []);

  // to get vehicle data
  useEffect(() => {
    async function fetchVehicleData() {
      try {
        const response = await axios.get("/vehicles", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
        setVehicleData(response.data.message);
        console.log("Vehicle data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    }
    fetchVehicleData();
  }, []);


  // to get services data
  useEffect(() => {
    async function fetchServicesData() {
      try {
        const response = await axios.get("/all-services", {
          headers: { Authorization: `Bearer ${loggedUser}` },
        });
        setServicesData(response.data.data);
        console.log("Services data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      }
    }
    fetchServicesData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-5">
            <div className="d-flex align-items-center mb-2">
              <h3 className="text-primary fw-bold me-1">Create a new order</h3>
              {/* <div className="border-bottom border-danger" style={{ width: '40px' }}></div> */}
            </div>

            {/* CUSTOMER INFO CARD */}
            <div className="card mb-3">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">
                    <strong>Name: </strong>
                    {orderData[0]?.customer_first_name}{" "}
                    {orderData[0]?.customer_last_name}
                  </h5>
                  <p className="mb-1">
                    <strong>Email: </strong> {orderData[0]?.customer_email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone Number: </strong>{" "}
                    {orderData[0]?.customer_phone_number}
                  </p>
                  {/* <p className="mb-1"><strong>Active Customer:</strong> Yes</p>
                  <a href="#" className="text-danger text-decoration-none">
                    Edit customer info <i className="bi bi-pencil-square"></i>
                  </a> */}
                </div>
                {/* <button className="btn btn-link text-danger fs-4 p-0">✖</button> */}
              </div>
            </div>

            {/* VEHICLE INFO CARD */}
            <div className="card mb-4">
              <div className="card-body d-flex justify-content-between">
                <div>
                  <h5 className="fw-bold">
                    <i className="fa text-danger  fa-car mx-1"></i>{" "}
                    {vehicleData[0]?.vehicle_make}
                  </h5>
                  <p className="mb-1">
                    <strong>Vehicle color:</strong>{" "}
                    {vehicleData[0]?.vehicle_color}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle tag:</strong> {vehicleData[0]?.vehicle_tag}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle year:</strong>{" "}
                    {vehicleData[0]?.vehicle_year}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle serial:</strong>{" "}
                    {vehicleData[0]?.vehicle_serial}
                  </p>
                  <p className="mb-1">
                    <strong>Vehicle type:</strong>{" "}
                    {vehicleData[0]?.vehicle_type}
                  </p>
                  {/* <a href="#" className="text-danger text-decoration-none">
                    Edit vehicle info <i className="bi bi-pencil-square"></i>
                  </a> */}
                </div>
                {/* <button className="btn btn-link text-danger fs-4 p-0">✖</button> */}
              </div>
            </div>

            {/* SERVICES CHECKLIST */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mx-2 mb-3">Choose service</h5>
               {
                servicesData.map((service) => (
                <div
                  className="form-check mb-3 border-bottom pb-2 d-flex justify-content-between align-items-start"
                  key={service.service_id}
                >
                  <label
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
                  />
                </div>

                ))}

              </div>
            </div>

            {/* ADDITIONAL REQUESTS */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-3 d-flex align-items-center">
                  Additional requests
                  {/* <div
                    className="border-bottom border-danger ms-2 flex-grow-1"
                    style={{ maxWidth: "40px" }}
                  ></div> */}
                </h5>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Service description"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                  />
                </div>
                <button className="btn btn-danger">SUBMIT ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOrder;
