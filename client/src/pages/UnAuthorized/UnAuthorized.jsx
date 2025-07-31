import { Link } from "react-router-dom";

function UnAuthorized() {
  return (
    <>
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
              {/* <h3 className="display-1">403</h3> */}
              <h1 className="mb-4">Access Denied</h1>
              <p className="mb-4">
                Sorry, you are not authorized to view this page. You may not
                have permission to access this content.
              </p>
              <Link to="/" className="btn btn-primary rounded-pill py-3 px-5">
                Go Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UnAuthorized;
