import Sidebar from '../../../components/Sidebar/Sidebar';

function AllOrders() {
  // Example orders array
  const orders = [
    {
      id: 12,
      customer: { name: 'Tewdej Shola', email: 'tewdej@gmail.com', phone: '90987766' },
      vehicle: { model: 'Honda Civic', year: 2022, plate: '48444fgg' },
      date: '31/05/2023',
      receivedBy: 'Admin Amir',
      status: 'Completed',
      statusColor: 'success',
    },
    {
      id: 11,
      customer: { name: 'Jasmine Albeshi', email: 'jasmin@gmail.com', phone: '240835487' },
      vehicle: { model: 'BMW X7', year: 2020, plate: '0101AD' },
      date: '31/05/2023',
      receivedBy: 'Admin Amir',
      status: 'In progress',
      statusColor: 'warning',
    },
    // Add more orders...
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 sidebar d-flex flex-column p-2">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold">Orders</h4>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Vehicle</th>
                      <th>Date</th>
                      <th>Received By</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="fw-bold">{order.id}</td>
                        <td>
                          {order.customer.name} <br />
                          <small className="text-muted">{order.customer.email} | {order.customer.phone}</small>
                        </td>
                        <td>
                          <strong>{order.vehicle.model}</strong> <br />
                          <small className="text-muted">{order.vehicle.year} | {order.vehicle.plate}</small>
                        </td>
                        <td>{order.date}</td>
                        <td>{order.receivedBy}</td>
                        <td>
                          <span className={`badge bg-${order.statusColor} p-2 text-${order.statusColor === 'warning' ? 'dark' : 'light'}`}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-secondary me-2" title="View">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-primary" title="Edit">
                            <i className="fas fa-pen"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
