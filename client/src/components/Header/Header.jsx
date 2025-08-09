import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  const { isLogin } = useAuth();

  function logOut() {
    localStorage.removeItem("Token");
    window.location.reload();
  }

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className="navbar navbar-expand-lg bg-white navbar-light shadow p-0"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1030,
          backgroundColor: "white",
        }}
      >
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
          </div>
          {isLogin ? (
            <div onClick={logOut}>
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

      {/* Spacer div to prevent content hiding behind sticky navbar */}
    </>
  );
}

export default Header;
