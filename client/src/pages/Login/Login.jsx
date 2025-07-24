import { useRef } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    try {
      const result = await axios.post("/login", {
        employee_email: emailValue,
        employee_password: passwordValue,
      });

      console.log( result.data);
      navigate("/")

    } catch (error) {
      console.log( error.response?.data);

    }
  }
  return (
      <div style={{maxWidth: 650}} className="container py-5">
        <div className="wow fadeInUp" data-wow-delay="0.2s">
          <h2 className="mb-5 mt-3">Login To Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-floating">
                  <input
                    ref={emailDom}
                    type="text"
                    className="form-control "
                    id="email"
                    placeholder="Email"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input
                    ref={passwordDom}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
