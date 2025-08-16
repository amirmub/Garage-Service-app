import Sidebar from "../../../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { getAuth } from "../../../utils/auth";
import { RingLoader } from "react-spinners";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

  const auth = getAuth();
  const token = auth?.token || "";

  const statusOptions = ["Received", "In Progress", "Quality Check", "Ready for Pickup"];

  useEffect(() => {
    async function fetchData() {
      try {
        const [ordersRes, customersRes, vehiclesRes, servicesRes] = await Promise.all([
          axios.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/customers", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/vehicles", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("/all-services", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const customersData = customersRes.data.msg || [];
        const vehiclesData = vehiclesRes.data.msg || [];
        const allServicesData = Array.isArray(servicesRes.data.data) ? servicesRes.data.data : [];

        setCustomers(customersData);
        setVehicles(vehiclesData);
        setServices(allServicesData);

        const ordersData = ordersRes.data.msg || [];

        const mappedOrders = ordersData.map((o) => {
          const customer = customersData.find((c) => c.customer_id === o.customer_id) || {};
          const vehicle = vehiclesData.find((v) => v.vehicle_id === o.vehicle_id) || {};

          const requestedServices = (o.services || []).map(
            (s) => allServicesData.find((as) => as.service_id === s.service_id)?.service_name || "N/A"
          );

          // Determine status based on all services completed
          const allReady = (o.services || []).every((s) => s.service_completed === "Ready for Pickup");
          const status = allReady ? "Closed" : "Open";

          return {
            ...o,
            customer,
            vehicle,
            requestedServices,
            services: o.services || [],
            date: o.order_date ? format(new Date(o.order_date), "MM/dd/yyyy") : "-",
            status,
          };
        });

        setOrders(mappedOrders);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  const handleEditClick = async (orderHash) => {
    if (!orderHash) return toast.error("Order hash missing");
    try {
      const res = await axios.get(`/order/${orderHash}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data && res.data.msg) setEditOrder(res.data.msg);
      else toast.error("Order data not found");
    } catch (err) {
      toast.error("Failed to fetch order details");
    }
  };

  const handleUpdate = async () => {
    if (!editOrder) return;
    setUpdating(true);
    try {
      await axios.put(
        `/order/update/${editOrder.order_id}`,
        editOrder.services.map(({ service_id, service_completed }) => ({ service_id, service_completed })),
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.order_id === editOrder.order_id
            ? {
                ...o,
                services: editOrder.services,
                requestedServices: editOrder.services.map(
                  (s) => services.find((as) => as.service_id === s.service_id)?.service_name || "N/A"
                ),
                status: editOrder.services.every((s) => s.service_completed === "Ready for Pickup") ? "Closed" : "Open",
              }
            : o
        )
      );

      toast.success("Order updated successfully!");
      setEditOrder(null);
    } catch (err) {
      toast.error("Failed to update order");
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (serviceId, newStatus) => {
    setEditOrder((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.service_id === serviceId ? { ...s, service_completed: newStatus } : s)),
    }));
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "Received": return "bg-dark text-white";
      case "In Progress": return "bg-warning text-dark";
      case "Quality Check": return ""; // handled via inline style
      case "Ready for Pickup": return "bg-success text-white";
      default: return "bg-secondary text-white";
    }
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-lg-10 px-5">
          <h1 className="title-bar section-title pt-4 pb-1">Orders</h1>

          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
              <RingLoader size={50} color="#B8101F" />
            </div>
          ) : (
            <div className="table-responsive" style={{ maxHeight: "355px", overflowY: "auto" }}>
              <table className="table table-bordered table-hover bg-white mb-0">
                <thead className="table-light" style={{ position: "sticky", top: 0, zIndex: 10 }}>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Date</th>
                    <th>Requested Services</th>
                    <th>Services Status</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? orders.map((order, index) => (
                    <tr key={order.order_id}>
                      <td>{index + 1}</td>
                      <td>
                        {order.customer.customer_first_name} {order.customer.customer_last_name} <br />
                        <small className="text-muted">{order.customer.customer_email} | {order.customer.customer_phone_number}</small>
                      </td>
                      <td>
                        {order.vehicle.vehicle_make} {order.vehicle.vehicle_model} <br />
                        <small className="text-muted">{order.vehicle.vehicle_year} | {order.vehicle.vehicle_tag}</small>
                      </td>
                      <td>{order.date}</td>
                      <td>{order.requestedServices.join(", ")}</td>
                      <td>
                        {order.services.map((s) => (
                          <span
                            key={s.service_id}
                            className={`badge p-2 my-1 border ${getBadgeColor(s.service_completed)}`}
                            style={s.service_completed === "Quality Check" ? { backgroundColor: "#999", color: "#fff" } : {}}
                          >
                            {s.service_completed}
                          </span>
                        ))}
                      </td>
                      <td>
                        <span
                          className={`badge p-2 mt-3 text-${order.status === "Closed" ? "white" : "white"}`}
                          style={{
                            backgroundColor: order.status === "Open" ? "#999" : "#dc3545",
                            boxShadow: order.status === "Open" ? "0 1px 3px rgba(0,0,0,0.2)" : "none"
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <i
                          className="bi bi-pencil-square fw-bold text-primary"
                          style={{ cursor: "pointer", fontSize: "18px" }}
                          onClick={() => handleEditClick(order.order_hash)}
                        ></i>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="text-center">No orders available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Edit/Update Modal */}
          {editOrder && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Services for Order #{editOrder.order_id}</h5>
                    <button type="button" className="btn-close" onClick={() => setEditOrder(null)}></button>
                  </div>
                  <div className="modal-body">
                    {editOrder.services.map((service) => (
                      <div key={service.service_id} className="mb-3">
                        <label className="form-label">
                          {services.find((as) => as.service_id === service.service_id)?.service_name || service.service_name}
                        </label>
                        <select
                          className="form-select"
                          value={service.service_completed}
                          onChange={(e) => handleStatusChange(service.service_id, e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setEditOrder(null)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleUpdate} disabled={updating}>
                      {updating ? "Updating..." : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AllOrders;
