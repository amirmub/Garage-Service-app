import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { isLogin } = useAuth();

  function logOut() {
    localStorage.removeItem("Token");
    window.location.reload();
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link to="/" className="navbar-brand d-flex align-items-center px-lg-5">
          <h2 className="m-0 text-primary">
            <i className="fa fa-car mx-1"></i>AutoPro
          </h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/services" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
            {/* <div className="nav-item dropdown">
              <Link to="/admin" className="nav-link">Admin</Link>
            </div> */}
          </div>
          {isLogin ? (
            <div onClick={logOut}>
              <Link
                to="/"
                className="btn btn-primary d-none d-lg-block"
                style={{
                  width: "90px",
                  height: "45px",
                  marginRight: "30px",
                  paddingTop: "12px",
                  fontSize: "14px",
                  borderRadius: "3px",
                }}
              >
                logout
              </Link>
            </div>
          ) : (
            <div>
              <Link
                to="/login"
                className="btn btn-primary d-none d-lg-block"
                style={{
                  width: "90px",
                  height: "45px",
                  marginRight: "30px",
                  paddingTop: "12px",
                  fontSize: "14px",
                  borderRadius: "3px",
                }}
              >
                logIn
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
