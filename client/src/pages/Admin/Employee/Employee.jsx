import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const { employee } = useAuth(); // Logged-in employee with token

  // to pass the token to backend
  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";
  console.log(loginEmployee);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/admin/employee", {
          headers: {
            token: loginEmployee,
          },
        });
        console.log(response);

        if (response.data && response.data.msg) {
          setEmployees(response.data.msg);
        }
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    }

    fetchData();
  }, [employee]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>
        <div  className="col-md-9 col-lg-10 px-5">
          <h3 class="title-bar pt-5 pb-2">Employees</h3>

          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-bordered table-hover bg-white mb-0">
              <thead
                className="table-light"
                style={{ position: "sticky", top: 0, zIndex: 10 }}
              >
                <tr>
                  <th>#</th>
                  {/* <th>Active</th> */}
                  <th style={{ whiteSpace: "nowrap" }}>First Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index} style={{fontSize :"15px"}}>
                     <td>{index + 1}</td>
                    {/* <td>{emp.active_employee ? "Yes" : "No"}</td> */}
                    <td>{emp.employee_first_name}</td>
                    <td>{emp.employee_last_name}</td>
                    <td>{emp.employee_email}</td>
                    <td>{emp.employee_phone}</td>
                    <td>
                      {emp.added_date
                        ? format(
                            new Date(emp.added_date),
                            "MM -dd -yyyy | HH:mm"
                          )
                        : "N/A"}
                    </td>
                    <td>{emp.company_role_name}</td>
                    <td className="edit-icons d-flex">
                      <i style={{color : "blue", cursor : "pointer",fontSize : "19px"}} className="bi bi-pencil-square  fw-bold me-2"></i>
                      <i style={{ cursor : "pointer",fontSize : "19px"}} className="bi bi-trash text-danger  fw-bold"></i>
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
        </div>
      </div>
    </div>
  );
}

export default Employee;
