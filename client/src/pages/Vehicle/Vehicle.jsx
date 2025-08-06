import Sidebar from "../../components/Sidebar/Sidebar";
import "./Vehicle.css"

function Vehicle() {
  return (
    <>
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
                  <div className="sidebar-step red-3">Orders</div>
                </div>
                <div className="col-md-10 mt-4 ">
                  <p className="mb-0">
                   <strong>Customer:  </strong> Amir Mubarek
                  </p>
                  <p className="mb-1">
                    <strong>Email:  </strong> amir@gmail.com
                  </p>
                  <p className="mb-1">
                    <strong>Phone Num: </strong> 2023862702
                  </p>
                  {/* <p className="mb-1">
                    <strong>Active Customer:</strong> Yes
                  </p>
                  <p className="mb-4">
                    <strong>Edit customer info:</strong>{" "}
                    <i className="bi bi-pencil-square edit-icon"></i>
                  </p> */}

                  {/* <h6 className="fw-bold mt-5">Vehicles of Amir</h6>
                  <div className="bg-white py-2 rounded mb-1">
                    <input
                      type="text"
                      className="form-control w-75"
                      placeholder="No vehicle found"
                    />
                  </div> */}

                  <div style={{marginTop : "70px"}} className="form-container ">
                    <button className="btn-close-custom" aria-label="Close">
                      ×
                    </button>
                    <h5 className="form-title mb-4">Add a New Vehicle</h5>

                    <form>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle year"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle make"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle model"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle type"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle mileage"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle tag"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle serial"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vehicle color"
                        />
                      </div>
                      <button type="submit" className="btn btn-danger">
                        ADD VEHICLE
                      </button>
                    </form>
                  </div>

                  <h6 className="fw-bold mt-5">Orders of Amir</h6>
                  <p>Orders will be displayed here</p>
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
