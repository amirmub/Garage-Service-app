import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";

function OrderDetail() {
  const [customer, setCustomer] = useState({});
  const [vehicle, setVehicle] = useState({});
  // const [services, setServices] = useState([]);

  const auth = getAuth();
  const loggedUser = auth?.token || "no token"

  // get customer information
  useEffect(() => {
     async function fetchingData() {
       const response = await axios.get("/customers",{
        headers : {
          Authorization: `Bearer ${loggedUser}`,
        }
       })
       setCustomer(response.data.msg);
       console.log(response.data);
     }
     fetchingData()
  }, []);

    // get customer information
  useEffect(() => {
     async function fetchingVehicle() {
       const response = await axios.get("/vehicles",{
        headers : {
          Authorization: `Bearer ${loggedUser}`,
        }
       })
       setVehicle(response.data.message);
       console.log(response.data);
     }
     fetchingVehicle()
  }, []);
  return (
    <>
      <div className="container  mt-3 p-4 rounded">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>
            <strong>{customer[0]?.customer_first_name} {customer[0]?.customer_last_name}</strong>
          </h4>
          <span className="badge bg-warning text-dark px-3 py-2">In progress</span>
        </div>
        <p className="text-muted">
          You can track the progress of your order using this page. We will
          constantly update this page to let you know how we are progressing. As
          soon as we are done with the order, the status will turn green. That
          means, your car is ready for pickup.
        </p>

        <div className="row my-4">
          <div className="col-md-6 mb-3">
            <div className="bg-light p-3 rounded shadow-sm section-border">
              <h6 className="text-muted">CUSTOMER</h6>
             <div className="mx-2">
               <h6 className="mb-1">
                <strong>Name: {customer[0]?.customer_first_name} {customer[0]?.customer_last_name}</strong>
              </h6>
              <h6 className="mb-4">
                 <h6  className="mb-1"> Email:  {customer[0]?.customer_email}</h6>
                 <h6> Phone Num: {customer[0]?.customer_phone_number}</h6>
              </h6>
             </div>

            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="bg-light p-3 rounded shadow-sm section-border">
              <small className="text-muted">CAR IN SERVICE</small>
             <div className="mx-2">
               <h5 className="mb-1">
                 <i style={{marginRight : "6px"}} className="fa fa-car "></i>
                 <>{`${vehicle[0]?.vehicle_make} ${" "}`}({`${" "}${vehicle[0]?.vehicle_color} ${" "}`})</>
              </h5>
              <h6 className="mb-1">Vehicle type: {vehicle[0]?.vehicle_type}</h6>
              <h6 className="mb-1">Vehicle serial: {vehicle[0]?.vehicle_serial}</h6>
              <h6 className="mb-0">Vehicle tag: {vehicle[0]?.vehicle_tag}</h6>
             </div>
            </div>
          </div>
        </div>

        <div className="bg-light p-4 rounded shadow-sm">
          <h6 className="mb-4">
            <h5>Requested service</h5>
          </h6>

          <div className="border-bottom border-2 pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>Tire repairs and changes</strong>
              <span className="btn btn-warning btn-sm py-1 px-2 rounded-pill">In progress</span>

            </div>
            <p className="text-muted small mb-0">
              Without good, inflated tires, you lose speed, control, and fuel
              efficiency...
            </p>
          </div>

          <div className="border-bottom border-2 pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>Brake work</strong>
              <span className="btn btn-warning btn-sm py-1 px-2 rounded-pill">In progress</span>

            </div>
            <p className="text-muted small mb-0">
              Brake work is important, especially because one quarter of all
              Canadian car...
            </p>
          </div>

          <div className="border-bottom border-2 pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>Spark Plug replacement</strong>
              <span className="btn btn-warning btn-sm py-1 px-2 rounded-pill">In progress</span>

            </div>
            <p className="text-muted small mb-0">
              Spark plugs are a small part that can cause huge problems...
            </p>
          </div>

          <div className="border-bottom border-2 pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>Brake work</strong>
              <span className="btn btn-warning btn-sm py-1 px-2 rounded-pill">In progress</span>

            </div>
            <p className="text-muted small mb-0">
              Brake work is important, especially because one quarter of all
              Canadian car...
            </p>
          </div>

          <div className="d-flex justify-content-between">
            <strong>Additional request</strong>
            <span className="btn btn-warning btn-sm py-1 px-2 rounded-pill">In progress</span>

          </div>
          <p className="text-muted small mb-0">Additional</p>
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
