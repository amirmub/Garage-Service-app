import { useRef } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "../../../utils/auth";

function AddEmployee() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const fNameDom = useRef();
  const lNameDom = useRef();
  const passwordDom = useRef();
  const emailDom = useRef();
  const phoneDom = useRef();
  const roleDom = useRef();

  // to pass the token to backend
  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";
  console.log(loginEmployee);

  async function handleSubmit(e) {
    e.preventDefault();

    const fNameValue = fNameDom.current.value;
    const lNameValue = lNameDom.current.value;
    const passwordValue = passwordDom.current.value;
    const emailValue = emailDom.current.value;
    const phoneValue = phoneDom.current.value;
    const activeValue = 1;
    const roleValue = roleDom.current.value;

    try {
      const result = await axios.post(
        "/add-employee",
        {
          employee_first_name: fNameValue,
          employee_last_name: lNameValue,
          employee_email: emailValue,
          employee_password: passwordValue,
          employee_phone: phoneValue,
          active_employee: activeValue,
          company_role_id: roleValue,
        },
        // to pass using header to backend
        {
          headers: {
            token: loginEmployee,
          },
        }
      );

      console.log(result.data);
      navigate("/admin/employee");
    } catch (error) {
      console.log(error.response?.data.msg);
      setError(error.response?.data.msg);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        <div className="col-md-9 col-lg-10 p-5">
          <div className="section-title">Add a New Employee</div>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="mb-3">
              <input
                ref={fNameDom}
                type="text"
                className="form-control "
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <input
                ref={lNameDom}
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="mb-3">
              <input
                ref={emailDom}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                ref={passwordDom}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <input
                ref={phoneDom}
                type="tel"
                className="form-control"
                placeholder="+251-9999999"
              />
            </div>
            <div className="mb-1">
              <select ref={roleDom} className="form-control">
                <option value="">Select role</option>
                <option value="1">Employee</option>
                <option value="2">Manager</option>
                <option value="3">Admin</option>
              </select>
            </div>
            <small
              style={{
                color: "red",
                fontSize: "14px",
                paddingBottom: "3px",
                margin: "10px 0px 10px 200px",
              }}
            >
              {error}
            </small>
            <br />
            <button type="submit" className="btn btn-danger px-4 py-2">
              ADD Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
