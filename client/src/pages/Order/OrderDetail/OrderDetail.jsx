import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { getAuth } from "../../../utils/auth";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";

function OrderDetail() {
  const location = useLocation();
  const {
    selectedServices = [],
    additionalRequest = "",
  } = location.state || {};

  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [estimatedCompletion, setEstimatedCompletion] = useState(null);
  const [orderStatus, setOrderStatus] = useState(0);

  const auth = getAuth();
  const token = auth?.token || "";

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

  // Fetch orders and set estimated completion
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ordersData = res.data.msg || [];
        setOrders(ordersData);

        if (ordersData.length > 0) {
          // Example estimated completion date: 5 days after order date
          const orderDate = new Date(ordersData[0].order_date.replace(" ", "T"));
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

  const steps = ["Received", "In Progress", "Quality Check", "Ready for Pickup"];

  const getCircleColor = (idx) => {
    switch (idx) {
      case 0:
        return "bg-light";
      case 1:
        return "bg-warning";
      case 2:
        return "bg-secondary";
      case 3:
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getTextColor = (idx) => {
    if (idx === orderStatus) return "text-dark fw-semibold";
    if (idx < orderStatus) return "text-warning fw-semibold";
    if (idx === 2) return "text-secondary fw-semibold";
    if (idx === 3) return "text-success fw-semibold";
    return "text-secondary";
  };

  const customer = customers[0] || {};
  const vehicle = vehicles[0] || {};
  const order = orders[0] || {};

  return (
    <div className="container my-5">
      <header className="mb-4 ">
       <div className="card bg-light p-2 mb-1" style={{ maxWidth: 'fit-content', borderRadius: '8px' }}>
        <h5 className="mb-0 d-flex align-items-center">
          <i className="fa fa-info-circle me-2 p-2 text-primary"></i>
          Order Details for <div className="text-danger p-2">{ customer[0] ? `${" "}${ customer[0].customer_first_name} ${customer[0].customer_last_name}` : "Amir Mubarek"}</div>
        </h5>
      </div>

        <strong className="text-muted">Track your order progress and details below.</strong>
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
                  className={`position-absolute top-50 start-100 translate-middle-y ${idx < orderStatus ? "bg-success" : "bg-secondary"}`}
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
              <p><strong>Name:</strong> {customer.customer_first_name ? `${customer.customer_first_name} ${customer.customer_last_name}` : "-"}</p>
              <p><strong>Email:</strong> {customer.customer_email || "-"}</p>
              <p><strong>Phone:</strong> {customer.customer_phone_number || "-"}</p>
              <hr />
              <p>
                <strong>Order Date:</strong>{" "}
                {order.order_date
                  ? format(new Date(order.order_date.replace(" ", "T")), "dd/MM/yyyy")
                  : "Loading..."}
              </p>
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

        {/* Right column: Services & Additional Requests */}
        <main className="col-lg-7">
          <section className="card shadow-sm rounded">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-cogs me-2"></i> Services Requested
            </header>
            <div className="card-body">
              {selectedServices.length === 0 ? (
                <p className="text-muted fst-italic">No services selected.</p>
              ) : (
                selectedServices.map(({ service_id, service_name, service_description }) => (
                  <div key={service_id} className="border-bottom border-secondary pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 fw-bolder">{service_name}</p>
                      <span className="badge p-2 my-1 border bg-warning text-dark">In progress</span>
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
                  <span className="badge p-2 my-1 border bg-warning text-dark">In progress</span>
                </div>
              )}
            </div>
          </section>

          <section className="card shadow-sm rounded mt-4">
            <header className="card-header bg-danger text-white fw-bold d-flex align-items-center">
              <i className="fa fa-file-invoice-dollar me-2"></i> Order Summary
            </header>
            <div className="card-body">
              <p><strong>Total Services:</strong> {selectedServices.length}</p>
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

export default OrderDetail;
