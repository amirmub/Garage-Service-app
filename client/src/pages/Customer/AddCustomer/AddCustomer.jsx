import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useRef, useEffect } from "react";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddCustomer() {
  const navigate = useNavigate();
  const fNameDom = useRef();
  const lNameDom = useRef();
  const emailDom = useRef();
  const phoneDom = useRef();

  const auth = getAuth();
  const loginEmployee = auth?.token || "no token";

  useEffect(() => {
    fNameDom.current.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const fNameValue = fNameDom.current.value.trim();
    const lNameValue = lNameDom.current.value.trim();
    const emailValue = emailDom.current.value.trim();
    const phoneValue = phoneDom.current.value.trim();

    if (!fNameValue || !lNameValue || !emailValue || !phoneValue) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      const result = await axios.post(
        "/customer",
        {
          customer_first_name: fNameValue,
          customer_last_name: lNameValue,
          customer_email: emailValue,
          customer_phone_number: phoneValue,
        },
        {
          headers: {
            token: loginEmployee,
          },
        }
      );
      toast.success("Customer added successfully!");
      setTimeout(() => navigate("/customers"), 2000);
    } catch (error) {
      toast.error(error.response?.data.error || "Failed to add customer.");
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
            <div className="section-title mb-4">Add a New Customer</div>
            <form onSubmit={handleSubmit} className="w-75">
              <div className="mb-3">
                <input
                  ref={fNameDom}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-3">
                <input
                  ref={lNameDom}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
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
              <div className="mb-4">
                <input
                  ref={phoneDom}
                  type="tel"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
              <button
                type="submit"
                className="btn btn-danger px-4 py-2"
              >
               ADD CUSTOMER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCustomer;
