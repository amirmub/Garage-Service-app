import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";
import { RingLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

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

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await axios.delete(`/customer/delete/${id}`, {
        headers: { token: loginEmployee },
      });

      setCustomers((prev) => prev.filter((cus) => cus.customer_id !== id));

      toast.success("Customer deleted successfully!");
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete customer!");
    }
  }

  const handleEditClick = (cus) => {
    setEditRow(cus.customer_id);
    setEditData({
      customer: {
        customer_first_name: cus.customer_first_name,
        customer_last_name: cus.customer_last_name,
        customer_email: cus.customer_email,
        customer_phone_number: cus.customer_phone_number,
      },
    });
  };

  const handleInputChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleCancelEdit = () => {
    setEditRow(null);
    setEditData({});
  };

  const handleSaveEdit = async (id) => {
    try {
      const payload = {
        customer_info: {
          customer_first_name: editData.customer?.customer_first_name,
          customer_last_name: editData.customer?.customer_last_name,
        },
        customer_identifier: {
          customer_phone_number: editData.customer?.customer_phone_number,
          customer_email: editData.customer?.customer_email,
        },
      };

      await axios.put(`/customer/update/${id}`, payload, {
        headers: {
          token: loginEmployee,
        },
      });

      setEditRow(null);
      setEditData({});
      toast.success("Customer updated successfully!");

      const refreshed = await axios.get("/customers", {
        headers: { token: loginEmployee },
      });
      setCustomers(refreshed.data.msg || []);
    } catch (error) {
      console.log("Edit error:", error);
      toast.error("Failed to update customer!");
    }
  };

  const filteredCustomers = customers.filter((cus) => {
    const term = searchTerm.toLowerCase();
    return (
      cus.customer_first_name?.toLowerCase().includes(term) ||
      cus.customer_last_name?.toLowerCase().includes(term) ||
      cus.customer_email?.toLowerCase().includes(term) ||
      cus.customer_phone_number?.toLowerCase().includes(term)
    );
  });

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

          <div className="my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
              style={{ maxHeight: "270px", overflowY: "auto" }}
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
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No matching customers found.
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cus, index) => (
                      <tr key={cus.customer_id} style={{ fontSize: "15px" }}>
                        <td>{index + 1}</td>
                        <td>
                          {editRow === cus.customer_id ? (
                            <input
                              className="form-control"
                              value={editData.customer.customer_first_name}
                              onChange={(e) =>
                                handleInputChange(
                                  "customer",
                                  "customer_first_name",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            cus.customer_first_name
                          )}
                        </td>
                        <td>
                          {editRow === cus.customer_id ? (
                            <input
                              className="form-control"
                              value={editData.customer.customer_last_name}
                              onChange={(e) =>
                                handleInputChange(
                                  "customer",
                                  "customer_last_name",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            cus.customer_last_name
                          )}
                        </td>
                        <td>
                          {editRow === cus.customer_id ? (
                            <input
                              className="form-control"
                              value={editData.customer.customer_email}
                              onChange={(e) =>
                                handleInputChange(
                                  "customer",
                                  "customer_email",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            cus.customer_email
                          )}
                        </td>
                        <td>
                          {editRow === cus.customer_id ? (
                            <input
                              className="form-control"
                              value={editData.customer.customer_phone_number}
                              onChange={(e) =>
                                handleInputChange(
                                  "customer",
                                  "customer_phone_number",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            cus.customer_phone_number
                          )}
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
                          {editRow === cus.customer_id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => handleSaveEdit(cus.customer_id)}
                                style={{ fontSize: "12px" }}
                              >
                                <small>Save</small>
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancelEdit}
                                style={{ fontSize: "12px" }}
                              >
                                <small>Cancel</small>
                              </button>
                            </>
                          ) : (
                            <>
                              <i
                                style={{
                                  color: "blue",
                                  cursor: "pointer",
                                  fontSize: "19px",
                                }}
                                className="bi bi-pencil-square fw-bold"
                                onClick={() => handleEditClick(cus)}
                              />
                              <i
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: "19px",
                                }}
                                className="bi bi-trash-fill fw-bold"
                                onClick={() => handleDelete(cus.customer_id)}
                              ></i>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
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
