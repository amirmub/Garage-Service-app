import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";
import { RingLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const { employee } = useAuth();
  const [loading, setLoading] = useState(true);
  // below to for editing
  const [editRow, setEditRow] = useState(null);
  const [editData, setEditData] = useState({});

  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

  // this function for displaying employees from database
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/admin/employee", {
          headers: { token: loginEmployee },
        });
        if (response.data?.msg) {
          setEmployees(response.data.msg);
        }
      } catch (error) {
        console.log("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [employee]);


// this function for deleting employees
  async function handleDelete  (id){
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      await axios.delete(`/admin/delete/${id}`, {
        headers: { token: loginEmployee },
      });

      setEmployees((prev) => prev.filter((emp) => emp.employee_id !== id));

      toast.success("Employee deleted successfully!");

    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete employee!");
    }
  };

  
  // all below functions are for editing employees
  const handleEditClick = (emp) => {
    setEditRow(emp.employee_id);
    setEditData({
      employee: {
        employee_first_name: emp.employee_first_name,
        employee_last_name: emp.employee_last_name,
        employee_email: emp.employee_email,
        employee_phone: emp.employee_phone,
      },
      employee_pass: {
        employee_password_hashed: "",
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
        employee_info: {
          employee_first_name: editData.employee?.employee_first_name,
          employee_last_name: editData.employee?.employee_last_name,
          employee_phone: editData.employee?.employee_phone,
        },
        employee: {
          employee_email: editData.employee?.employee_email,
        },
      };

      await axios.put(`/admin/update/${id}`, payload, {
        headers: {
          token: loginEmployee,
          "Content-Type": "application/json",
        },
      });

      setEditRow(null);
      setEditData({});
      toast.success("Employee updated successfully!");

      // Refetch updated data
      const refreshed = await axios.get("/admin/employee", {
        headers: { token: loginEmployee },
      });
      setEmployees(refreshed.data.msg || []);
    } catch (error) {
      console.log("Edit error:", error);
      toast.error("Failed to update employee!");
    }
  };

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
          <h1 className="title-bar section-title pt-4 pb-1">Employees</h1>

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
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={emp.employee_id} style={{ fontSize: "15px" }}>
                      <td>{index + 1}</td>
                      <td>
                        {editRow === emp.employee_id ? (
                          <input
                            className="form-control"
                            value={editData.employee.employee_first_name}
                            onChange={(e) =>
                              handleInputChange(
                                "employee",
                                "employee_first_name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          emp.employee_first_name
                        )}
                      </td>
                      <td>
                        {editRow === emp.employee_id ? (
                          <input
                            className="form-control"
                            value={editData.employee.employee_last_name}
                            onChange={(e) =>
                              handleInputChange(
                                "employee",
                                "employee_last_name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          emp.employee_last_name
                        )}
                      </td>
                      <td>
                        {editRow === emp.employee_id ? (
                          <input
                            className="form-control"
                            value={editData.employee.employee_email}
                            onChange={(e) =>
                              handleInputChange(
                                "employee",
                                "employee_email",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          emp.employee_email
                        )}
                      </td>
                      <td>
                        {editRow === emp.employee_id ? (
                          <input
                            className="form-control"
                            value={editData.employee.employee_phone}
                            onChange={(e) =>
                              handleInputChange(
                                "employee",
                                "employee_phone",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          emp.employee_phone
                        )}
                      </td>
                      <td>
                        {emp.added_date
                          ? format(
                              new Date(emp.added_date),
                              "MM-dd-yyyy | HH:mm"
                            )
                          : "N/A"}
                      </td>
                      <td>{emp.company_role_name}</td>
                      <td className="d-flex gap-2">
                        {editRow === emp.employee_id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleSaveEdit(emp.employee_id)}
                              style={{ fontSize: "14px" }}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={handleCancelEdit}
                              style={{ fontSize: "14px" }}
                            >
                              Cancel
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
                              onClick={() => handleEditClick(emp)}
                            ></i>
                            <i
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "19px",
                              }}
                              className="bi bi-trash-fill fw-bold"
                              onClick={() => handleDelete(emp.employee_id)}
                            ></i>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {employees.length === 0 && (
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

export default Employee;
