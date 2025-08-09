import {Link} from 'react-router-dom'
import "./Sidebar.css"

function Sidebar() {
  return (
        <div className="sidebar">
            <div className="px-4 pt-3 pb-2 border-bottom">
                <h6 className="text-uppercase text-light">Admin Menu</h6>
            </div>
            <nav className="nav flex-column">
                <Link className="nav-link" to="#">Dashboard</Link>
                <Link className="nav-link" to="/order">Orders</Link>
                {/* <Link className="nav-link" to="/add-order">New order</Link> */}
                <Link className="nav-link" to="/add-employee">Add employee</Link>
                <Link className="nav-link" to="/admin/employee">Employees</Link>
                <Link className="nav-link" to="/add-customer">Add customer</Link>
                <Link className="nav-link" to="/customers">Customers</Link>
                <Link className="nav-link" to="/admin/services">Services</Link>
            </nav>
      </div>

  )
}

export default Sidebar
