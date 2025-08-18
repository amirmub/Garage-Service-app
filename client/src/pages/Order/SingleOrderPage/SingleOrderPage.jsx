import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";

function SingleOrderPage() {
  const { orderHash } = useParams();
  const [order, setOrder] = useState(null);
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

  if (loading)
    return (
      <div style={{ margin: "150px auto" }} className="d-flex justify-content-center align-items-center">
        <ClipLoader size={50} color="#B8101F" />
      </div>
    );

  if (error)
    return (
      <h3 style={{ margin: "150px auto" }} className="text-danger d-flex justify-content-center align-items-center">
        {error}
      </h3>
    );

  if (!order) return <p>No order data available.</p>;

  // Use customer & vehicle info directly from order
  const customer = {
    customer_first_name: order.customer_first_name,
    customer_last_name: order.customer_last_name,
    customer_email: order.customer_email,
    customer_phone_number: order.customer_phone_number,
    customer_id: order.customer_id,
  };

  const vehicle = {
    vehicle_make: order.vehicle_make,
    vehicle_type: order.vehicle_type,
    vehicle_color: order.vehicle_color,
    vehicle_year: order.vehicle_year,
    vehicle_serial: order.vehicle_serial,
    vehicle_tag: order.vehicle_tag,
    vehicle_id: order.vehicle_id,
  };

  const services = order.services || [];
  const additionalRequestText = order.additional_request || "";
  const additionalRequestStatus =
    services.find(s => s.additional_requests_completed)?.additional_requests_completed || "Not Started";

  const getCircleColor = (step) => {
    switch (step) {
      case "Received": return "#343a40";
      case "In Progress": return "#ffc107";
      case "Quality Check": return "#999";
      case "Ready for Pickup": return "#28a745";
      default: return "#6c757d";
    }
  };

  const getTextColor = (step, idx) => {
    if (idx === orderStatus) return "#343a40";
    if (idx < orderStatus) return "#28a745";
    switch (step) {
      case "Received": return "#6c757d";
      case "In Progress": return "#ffc107";
      case "Quality Check": return "#999";
      case "Ready for Pickup": return "#28a745";
      default: return "#6c757d";
    }
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case "Received": return { backgroundColor: "#343a40", color: "#fff" };
      case "In Progress": return { backgroundColor: "#ffc107", color: "#343a40" };
      case "Quality Check": return { backgroundColor: "#999", color: "#fff" };
      case "Ready for Pickup": return { backgroundColor: "#28a745", color: "#fff" };
      default: return { backgroundColor: "#6c757d", color: "#fff" };
    }
  };

  return (
    <div className="container my-5">
      <header className="mb-4">
        <div className="card" style={{ backgroundColor: "#f8f9fa", padding: "8px", borderRadius: "8px", maxWidth: "fit-content" }}>
          <h5 className="mb-0 d-flex align-items-center">
            <i className="fa fa-info-circle me-2 p-2 text-primary"></i>
            Order Details for{" "}
            <div className="text-danger p-2">{customer.customer_first_name ? `${customer.customer_first_name} ${customer.customer_last_name}` : "-"}</div>
          </h5>
        </div>
        <strong className="text-muted">Track your order progress and details below.</strong>
      </header>

      {/* Timeline */}
      <section className="mb-5">
        <h5 className="mb-3 text-center">Order Progress</h5>
        <div className="d-flex justify-content-between align-items-center position-relative">
          {steps.map((step, idx) => (
            <div key={step} className="text-center flex-fill position-relative">
              <div
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: getCircleColor(step),
                  borderRadius: "50%",
                  margin: "0 auto 8px",
                  zIndex: 2
                }}
              />
              <small style={{ color: getTextColor(step, idx), fontWeight: step === "Quality Check" ? 600 : 500 }}>{step}</small>
              {idx < steps.length - 1 && (
                <div
                  style={{
                    width: "100%",
                    height: 4,
                    backgroundColor: idx < orderStatus ? "#28a745" : "#6c757d",
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: "translateY(-50%)",
                    zIndex: 1
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="row gx-4">
        <aside className="col-lg-5 mb-4">
          <section className="card shadow-sm rounded">
            <header className="card-header" style={{ backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" }}>
              <i className="fa fa-user me-2"></i> Customer Info
            </header>
            <div className="card-body">
              <p><strong>Name:</strong> {customer.customer_first_name ? `${customer.customer_first_name} ${customer.customer_last_name}` : "-"}</p>
              <p><strong>Email:</strong> {customer.customer_email || "-"}</p>
              <p><strong>Phone:</strong> {customer.customer_phone_number || "-"}</p>
              <hr />
              <p><strong>Order Date:</strong> {order.order_date ? format(new Date(order.order_date), "dd/MM/yyyy") : "-"}</p>
              <p><strong>Estimated Completion:</strong> {estimatedCompletion || "-"}</p>
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header" style={{ backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" }}>
              <i className="fa fa-car me-2"></i> Vehicle Info
            </header>
            <div className="card-body">
              <p><strong>Make:</strong> {vehicle.vehicle_make || "-"}</p>
              <p><strong>Model:</strong> {vehicle.vehicle_type || "-"}</p>
              <p><strong>Color:</strong> {vehicle.vehicle_color || "-"}</p>
              <p><strong>Year:</strong> {vehicle.vehicle_year || "-"}</p>
              <p><strong>Serial:</strong> {vehicle.vehicle_serial || "-"}</p>
              <p><strong>Tag:</strong> {vehicle.vehicle_tag || "-"}</p>
            </div>
          </section>
        </aside>

        <main className="col-lg-7">
          <section className="card shadow-sm rounded">
            <header className="card-header" style={{ backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" }}>
              <i className="fa fa-cogs me-2"></i> Services Requested
            </header>
            <div className="card-body">
              {services.length === 0 ? (
                <p className="text-muted fst-italic">No services selected.</p>
              ) : (
                services.map(({ service_id, service_name, service_description, service_completed }) => (
                  <div key={service_id} style={{ borderBottom: "1px solid #6c757d", paddingBottom: "8px", marginBottom: "8px" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 fw-bolder">{service_name}</p>
                      <span className="badge p-2 my-1 border" style={getBadgeStyle(service_completed || "Received")}>
                        {service_completed || "Received"}
                      </span>
                    </div>
                    <p className="text-muted small mb-0">{service_description}</p>
                  </div>
                ))
              )}

              {additionalRequestText && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h6 className="fw-semibold">Additional Request</h6>
                    <p className="text-muted">{additionalRequestText}</p>
                  </div>
                  <span
                    className="badge p-2 my-1 border"
                    style={getBadgeStyle(additionalRequestStatus)}
                  >
                    {additionalRequestStatus}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header" style={{ backgroundColor: "#dc3545", color: "#fff", fontWeight: "bold" }}>
              <i className="fa fa-file-invoice-dollar me-2"></i> Order Summary
            </header>
            <div className="card-body">
              <p><strong>Total Services:</strong> {services.length}</p>
              <hr />
              <p className="fs-5 fw-bold">Total: ${order.order_total_price || "0.00"}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SingleOrderPage;
