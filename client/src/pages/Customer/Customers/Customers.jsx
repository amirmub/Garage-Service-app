import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";
import { RingLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

  // this function for displaying customers from database
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/customers", {
          headers: { token: loginEmployee },
        });
        if (response.data?.msg) {
          setCustomers(response.data.msg);
        }
      } catch (error) {
        console.log("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [customers]);


  return (
    <div className="container-fluid">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-lg-10 px-5">
          <h1 className="title-bar section-title pt-4 pb-1">Customers</h1>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "300px" }}
            >
              <RingLoader size={50} color="#B8101F" />
            </div>
          ) : (
            <div
              className="table-responsive"
              style={{ maxHeight: "313px", overflowY: "auto" }}
            >
              <table className="table table-bordered table-hover bg-white mb-0">
                <thead
                  className="table-light"
                  style={{ position: "sticky", top: 0, zIndex: 10 }}
                >
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((cus, index) => (
                    <tr key={cus.customer_id} style={{ fontSize: "15px" }}>
                      <td>{index + 1}</td>
                      <td>
                          {cus.customer_first_name}
                      </td>
                      <td>
                        {cus.customer_last_name}
                      </td>
                      <td>
        
                          {cus.customer_email}
                      </td>
                      <td>
                          {cus.customer_phone_number}
                      </td>
                      <td>
                        {cus.customer_added_date
                          ? format(
                              new Date(cus.customer_added_date),
                              "MM-dd-yyyy | HH:mm"
                            )
                          : "N/A"}
                      </td>
                      <td className="d-flex gap-2">
                          <>
                            <i
                              style={{
                                color: "blue",
                                cursor: "pointer",
                                fontSize: "19px",
                              }}
                              className="bi bi-pencil-square fw-bold"
                            //   onClick={() => handleEditClick(cus)}
                            ></i>
                            <i
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "19px",
                              }}
                              className="bi bi-trash-fill fw-bold"
                            //   onClick={() => handleDelete(cus.customer_id)}
                            ></i>
                          </>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No employee data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customers;
