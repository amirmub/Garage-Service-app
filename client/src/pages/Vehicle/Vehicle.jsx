import { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Vehicle.css";
import axios from "../../utils/axios";
import { getAuth } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Vehicle() {
  const [customers, setCustomers] = useState({});
  const navigate = useNavigate();


  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

  // Refs for form fields
  const yearRef = useRef(null);
  const makeRef = useRef(null);
  const modelRef = useRef(null);
  const typeRef = useRef(null);
  const mileageRef = useRef(null);
  const tagRef = useRef(null);
  const serialRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/customers", {
          headers: {
            Authorization: `Bearer ${loginEmployee}`,
          },
        });
          setCustomers(response.data.msg);
          console.log(response.data);

      } catch (error) {
        console.log("Error fetching customers:", error);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const vehicleYear = yearRef.current.value;
    const vehicleMake = makeRef.current.value;
    const vehicleModel = modelRef.current.value;
    const vehicleType = typeRef.current.value;
    const vehicleMileage = mileageRef.current.value;
    const vehicleTag = tagRef.current.value;
    const vehicleSerial = serialRef.current.value;
    const vehicleColor = colorRef.current.value;

    if (
      !vehicleYear ||
      !vehicleMake ||
      !vehicleModel ||
      !vehicleType ||
      !vehicleMileage ||
      !vehicleTag ||
      !vehicleSerial ||
      !vehicleColor
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "/add-vehicle",
        {
          vehicle_year: vehicleYear,
          vehicle_make: vehicleMake,
          vehicle_model: vehicleModel,
          vehicle_type: vehicleType,
          vehicle_mileage: vehicleMileage,
          vehicle_tag: vehicleTag,
          vehicle_serial: vehicleSerial,
          vehicle_color: vehicleColor,
        },
        {
           headers: {
            Authorization: `Bearer ${loginEmployee}`,
          },
        }
      );

      toast.success("Vehicle added successfully!");
     setTimeout(() => {
      navigate("/add-order");
    }, 1500)

    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.error(" Failed to add vehicle.");
    }
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
            <Sidebar />
          </div>
          <div className="col-md-9 col-lg-10 p-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-2 position-relative text-center">
                  <div className="vertical-line d-none d-md-block"></div>
                  <div className="sidebar-step">Info</div>
                  <div className="sidebar-step red-2">Cars</div>
                  {/* <div className="sidebar-step red-3">Orders</div> */}
                </div>
                <div className="col-md-10 mt-4">
                  <p className="mb-0">
                    <strong>Customer: </strong>
                    {customers[0]?.customer_first_name}{" "}
                    {customers[0]?.customer_last_name}
                  </p>
                  <p className="mb-1">
                    <strong>Email: </strong> {customers[0]?.customer_email}
                  </p>
                  <p className="mb-1">
                    <strong>Phone Num: </strong>{" "}
                    {customers[0]?.customer_phone_number}
                  </p>

                  <div style={{ marginTop: "70px" }} className="form-container">
                    {/* <button className="btn-close-custom" aria-label="Close">
                      ×
                    </button> */}
                    <h5 className="form-title mb-4">Add a New Vehicle</h5>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle year" ref={yearRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle make" ref={makeRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle model" ref={modelRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle type" ref={typeRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle mileage" ref={mileageRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle tag" ref={tagRef} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Vehicle serial" ref={serialRef} />
                      </div>
                      <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Vehicle color" ref={colorRef} />
                      </div>
                      <button type="submit" className="btn btn-danger">ADD VEHICLE</button>
                    </form>
                  </div>

                  {/* <h6 className="fw-bold mt-5">Orders of Amir</h6>
                  <p>Orders will be displayed here</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vehicle;
