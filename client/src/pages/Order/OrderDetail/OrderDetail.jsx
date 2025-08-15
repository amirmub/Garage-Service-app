import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";
import { format } from "date-fns";

function OrderDetail() {
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [estimatedCompletion, setEstimatedCompletion] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);

  const auth = getAuth();
  const token = auth?.token || "";

  const steps = ["Received", "In Progress", "Quality Check", "Ready for Pickup"];

  // Fetch customers
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await axios.get("/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data.msg || []);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
      }
    }
    fetchCustomers();
  }, [token]);

  // Fetch vehicles
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await axios.get("/vehicles", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehicles(res.data.message || []);
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
      }
    }
    fetchVehicles();
  }, [token]);

  // Fetch orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = res.data.msg || [];
        setOrders(ordersData);

        if (ordersData.length > 0) {
          const orderDate = new Date(ordersData[0].order_date);
          const completionDate = new Date(orderDate);
          completionDate.setDate(orderDate.getDate() + 5);
          setEstimatedCompletion(completionDate.toLocaleDateString());
          setOrderStatus(ordersData[0].order_status || 0);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    }
    fetchOrders();
  }, [token]);

  // Get first order
  const order = orders[0] || {};
  const customer = customers.find(c => c.customer_id === order.customer_id) || {};
  const vehicle = vehicles.find(v => v.vehicle_id === order.vehicle_id) || {};
  const services = order.services || [];
  const additionalRequest = order.additional_request || "";

  // Timeline color helpers
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

  // Service badge color helper
  const getBadgeColor = (status) => {
    switch (status) {
      case "Received": return "bg-dark text-white";
      case "In Progress": return "bg-warning text-dark";
      case "Quality Check": return "bg-info text-dark";
      case "Completed": return "bg-success text-white";
      default: return "bg-secondary text-white";
    }
  };

  return (
    <div className="container my-5">
      <header className="mb-4">
        <div className="card bg-light p-2 mb-1" style={{ maxWidth: "fit-content", borderRadius: "8px" }}>
          <h5 className="mb-0 d-flex align-items-center">
            <i className="fa fa-info-circle me-2 p-2 text-primary"></i>
            Order Details for{" "}
            <div className="text-danger p-2">
              {customer.customer_first_name ? `${customer.customer_first_name} ${customer.customer_last_name}` : "-"}
            </div>
          </h5>
        </div>
        <strong className="text-muted">Track your order progress and details below.</strong>
      </header>

      {/* Order Progress Timeline */}
      <section className="mb-5">
        <h5 className="mb-3 text-center">Order Progress</h5>
        <div className="d-flex justify-content-between align-items-center position-relative">
          {steps.map((step, idx) => (
            <div key={step} className="text-center flex-fill position-relative">
              <div className={`mx-auto mb-2 rounded-circle ${getCircleColor(idx)}`} style={{ width: 24, height: 24, zIndex: 2 }} />
              <small className={`d-block ${getTextColor(idx)}`}>{step}</small>
              {idx < steps.length - 1 && (
                <div className={`position-absolute top-50 start-100 translate-middle-y ${idx < orderStatus ? "bg-success" : "bg-secondary"}`} style={{ width: "100%", height: 4, zIndex: 1 }} />
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="row gx-4">
        {/* Left: Customer & Vehicle */}
        <aside className="col-lg-5 mb-4">
          <section className="card shadow-sm rounded">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
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
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
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

        {/* Right: Services & Summary */}
        <main className="col-lg-7">
          <section className="card shadow-sm rounded">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-cogs me-2"></i> Services Requested
            </header>
            <div className="card-body">
              {services.length === 0 ? (
                <p className="text-muted fst-italic">No services selected.</p>
              ) : (
                services.map(({ service_id, service_name, service_description, service_completed }) => (
                  <div key={service_id} className="border-bottom border-secondary pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 fw-bolder">{service_name}</p>
                      <span className={`badge p-2 my-1 border ${getBadgeColor(service_completed || "Received")}`}>
                        {service_completed || "Received"}
                      </span>
                    </div>
                    <p className="text-muted small mb-0">{service_description}</p>
                  </div>
                ))
              )}

              {additionalRequest && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <h6 className="fw-semibold">Additional Request</h6>
                    <p className="text-muted">{additionalRequest}</p>
                  </div>
                  <span className={`badge p-2 my-1 border ${getBadgeColor("Received")}`}>Received</span>
                </div>
              )}
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
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

export default OrderDetail;
