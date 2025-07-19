
function Login() {
  return (
      <div style={{maxWidth: 650}} className="container py-5">
        <div className="wow fadeInUp" data-wow-delay="0.2s">
          <h2 className="mb-5 mt-3">Login To Your Account</h2>
          <form>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-floating">
                  <input
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
                    type="text"
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
