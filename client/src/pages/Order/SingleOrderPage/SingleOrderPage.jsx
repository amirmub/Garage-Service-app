import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function SingleOrderPage() {
  const { orderHash } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState({});
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estimatedCompletion, setEstimatedCompletion] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);

  const steps = ["Received", "In Progress", "Quality Check", "Ready for Pickup"];

  useEffect(() => {
    async function fetchOrder() {
      try {
        setLoading(true);
        const res = await axios.get(`/order/${orderHash}`);
        const orderData = res.data.msg;

        if (!orderData) {
          setError("Order not found");
          return;
        }

        setOrder(orderData);

        setCustomer({
          customer_first_name: orderData.customer_first_name,
          customer_last_name: orderData.customer_last_name,
          customer_email: orderData.customer_email,
          customer_phone_number: orderData.customer_phone_number,
          customer_id: orderData.customer_id,
        });

        setVehicle({
          vehicle_make: orderData.vehicle_make,
          vehicle_type: orderData.vehicle_type,
          vehicle_color: orderData.vehicle_color,
          vehicle_year: orderData.vehicle_year,
          vehicle_serial: orderData.vehicle_serial,
          vehicle_tag: orderData.vehicle_tag,
          vehicle_id: orderData.vehicle_id,
        });

        if (orderData.order_date) {
          const orderDate = new Date(orderData.order_date);
          const completionDate = new Date(orderDate);
          completionDate.setDate(orderDate.getDate() + 5);
          setEstimatedCompletion(completionDate.toLocaleDateString());
        }

        setOrderStatus(orderData.order_status || 0);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [orderHash]);

  // Timeline: constant colors
  const getCircleColor = (stepIdx) => {
    switch (steps[stepIdx]) {
      case "Received": return "bg-dark";
      case "In Progress": return "bg-warning";
      case "Quality Check": return "bg-info";
      case "Ready for Pickup": return "bg-success";
      default: return "bg-secondary";
    }
  };

  const getTextColor = (stepIdx) => {
    if (stepIdx === orderStatus) return "text-dark fw-semibold";
    if (stepIdx < orderStatus) return "text-success fw-semibold";
    switch (steps[stepIdx]) {
      case "Quality Check": return "text-info fw-semibold";
      case "Received": return "text-secondary fw-semibold";
      case "In Progress": return "text-warning fw-semibold";
      case "Ready for Pickup": return "text-success fw-semibold";
      default: return "text-secondary";
    }
  };

  // Services Requested: dynamic badge color based on service_completed
  const getServiceBadgeColor = (status) => {
    switch (status) {
      case "Received": return "bg-dark text-white";
      case "In Progress": return "bg-warning text-dark";
      case "Quality Check": return "bg-info text-dark";
      case "Completed": return "bg-success text-white";
      default: return "bg-secondary text-white";
    }
  };

  if (loading)
    return (
      <div
        style={{ margin: "150px auto" }}
        className="d-flex justify-content-center align-items-center"
      >
        <ClipLoader size={50} color="#B8101F" />
      </div>
    );

  if (error)
    return (
      <h3
        style={{ margin: "150px auto" }}
        className="text-danger d-flex justify-content-center align-items-center"
      >
        {error}
      </h3>
    );

  if (!order) return <p>No order data available.</p>;

  const services = order.services || [];
  const additionalRequest = order.additional_request || "";

  return (
    <div className="container mt-4 mb-5">
      <header className="mb-4">
        <div
          className="card bg-light p-2 mb-1"
          style={{ maxWidth: "fit-content", borderRadius: "8px" }}
        >
          <h5 className="mb-0 d-flex align-items-center">
            <i className="fa fa-info-circle me-2 p-2 text-primary"></i>
            Order Details for{" "}
            <div className="text-danger p-2">
              {customer.customer_first_name
                ? `${customer.customer_first_name} ${customer.customer_last_name}`
                : "-"}
            </div>
          </h5>
        </div>
        <strong className="text-muted">
          Track your order progress and details below.
        </strong>
      </header>

      {/* Order Status Timeline */}
      <section className="mb-5">
        <h5 className="mb-3 text-center">Order Progress</h5>
        <div className="d-flex justify-content-between align-items-center position-relative">
          {steps.map((step, idx) => (
            <div key={step} className="text-center flex-fill position-relative">
              <div
                className={`mx-auto mb-2 rounded-circle ${getCircleColor(idx)}`}
                style={{ width: 24, height: 24, zIndex: 2 }}
              />
              <small className={getTextColor(idx)}>{step}</small>
              {idx < steps.length - 1 && (
                <div
                  className={`position-absolute top-50 start-100 translate-middle-y ${
                    idx < orderStatus ? "bg-success" : "bg-secondary"
                  }`}
                  style={{ width: "100%", height: 4, zIndex: 1 }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="row gx-4">
        {/* Left column: Customer & Vehicle Info */}
        <aside className="col-lg-5 mb-4">
          <section className="card shadow-sm rounded">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-user me-2"></i> Customer Info
            </header>
            <div className="card-body">
              <p>
                <strong>Name:</strong>{" "}
                {customer.customer_first_name
                  ? `${customer.customer_first_name} ${customer.customer_last_name}`
                  : "-"}
              </p>
              <p>
                <strong>Email:</strong> {customer.customer_email || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {customer.customer_phone_number || "-"}
              </p>
              <hr />
              <p>
                <strong>Order Date:</strong>{" "}
                {order.order_date
                  ? format(new Date(order.order_date), "dd/MM/yyyy")
                  : "-"}
              </p>
              <p>
                <strong>Estimated Completion:</strong>{" "}
                {estimatedCompletion || "-"}
              </p>
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-car me-2"></i> Vehicle Info
            </header>
            <div className="card-body">
              <p>
                <strong>Make:</strong> {vehicle.vehicle_make || "-"}
              </p>
              <p>
                <strong>Model:</strong> {vehicle.vehicle_type || "-"}
              </p>
              <p>
                <strong>Color:</strong> {vehicle.vehicle_color || "-"}
              </p>
              <p>
                <strong>Year:</strong> {vehicle.vehicle_year || "-"}
              </p>
              <p>
                <strong>Serial:</strong> {vehicle.vehicle_serial || "-"}
              </p>
              <p>
                <strong>Tag:</strong> {vehicle.vehicle_tag || "-"}
              </p>
            </div>
          </section>
        </aside>

        {/* Right column: Services & Additional Requests */}
        <main className="col-lg-7">
          <section className="card shadow-sm rounded">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-cogs me-2"></i> Services Requested
            </header>
            <div className="card-body">
              {services.length === 0 ? (
                <p className="text-muted fst-italic">No services selected.</p>
              ) : (
                services.map(
                  ({
                    service_id,
                    service_name,
                    service_description,
                    service_completed,
                  }) => (
                    <div
                      key={service_id}
                      className="border-bottom border-secondary pb-3 mb-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1 fw-bolder">{service_name}</p>
                        <span
                          className={`badge p-2 my-1 border ${getServiceBadgeColor(
                            service_completed
                          )}`}
                        >
                          {service_completed || "Received"}
                        </span>
                      </div>
                      <p className="text-muted small mb-0">
                        {service_description}
                      </p>
                    </div>
                  )
                )
              )}

              {additionalRequest && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h6 className="fw-semibold">Additional Request</h6>
                    <p className="text-muted">{additionalRequest}</p>
                  </div>
                  <span className="badge p-2 my-1 border bg-warning text-dark">
                    In progress
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-file-invoice-dollar me-2"></i> Order Summary
            </header>
            <div className="card-body">
              <p>
                <strong>Total Services:</strong> {services.length}
              </p>
              <hr />
              <p className="fs-5 fw-bold">
                Total: ${order.order_total_price || "0.00"}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SingleOrderPage;
