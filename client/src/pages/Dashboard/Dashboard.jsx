import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { FaCar, FaUserTie, FaClipboardList, FaWrench, FaUsers } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "../../utils/axios"; // ✅ use your axios instance
import { getAuth } from "../../utils/auth";

function Dashboard() {
  const [stats, setStats] = useState({
    vehicles: 0,
    employees: 0,
    orders: 0,
    services: 0,
    customers: 0,
  });

    const auth = getAuth();
    const loginEmployee = auth?.token || "no token";

  useEffect(() => {
  AOS.init({ duration: 800 });

  const fetchStats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${loginEmployee}` },
      };

      const [vehiclesRes, employeesRes, ordersRes, servicesRes, customersRes] =
        await Promise.all([
          axios.get("/vehicles", config),
          axios.get("/admin/employee", config),
          axios.get("/orders", config),
          axios.get("/all-services", config),
          axios.get("/customers", config),
        ]);
        console.log(employeesRes);
        console.log(customersRes);        

      setStats({
        vehicles: vehiclesRes.data.msg.length,
        employees: employeesRes.data.msg.length,
        orders: ordersRes.data.msg.length,
        services: servicesRes.data.data.length,
        customers: customersRes.data.msg.length,
      });
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  fetchStats();
}, [loginEmployee]);

  const cards = [
    {
      title: "Total Vehicles",
      value: stats.vehicles,
      icon: <FaCar size={32} color="#28a745" />,
      bg: "bg-white",
    },
    {
      title: "Total Employees",
      value: stats.employees,
      icon: <FaUserTie size={32} color="#0d6efd" />,
      bg: "bg-white",
    },
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FaClipboardList size={32} color="#dc3545" />,
      bg: "bg-white",
    },
    {
      title: "Total Services",
      value: stats.services,
      icon: <FaWrench size={32} color="#ffc107" />,
      bg: "bg-white",
    },
    {
      title: "Total Customers",
      value: stats.customers,
      icon: <FaUsers size={32} color="#17a2b8" />,
      bg: "bg-white",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0 bg-dark">
          <Sidebar />
        </div>

        {/* Main Dashboard */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          <small className="mb-4 mt-2 section-title fw-bold pb-1">Dashboard</small>
          <br />
          <br />

          {/* Stats Cards */}
          <div className="row g-4">
            {cards.map((card, idx) => (
              <div
                className="col-sm-6 col-lg-4"
                style={{ cursor: "pointer" }}
                key={idx}
                data-aos="fade-up"
              >
                <div
                  className={`card shadow-sm border-0 ${card.bg} h-100`}
                  style={{
                    borderRadius: "12px",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div className="card-body d-flex align-items-center">
                    <div
                      className="p-3 rounded-circle me-3"
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        minWidth: "60px",
                        textAlign: "center",
                      }}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">
                        <CountUp end={card.value} duration={2} />
                      </h4>
                      <small className="text-muted">{card.title}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More dashboard sections can go here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
