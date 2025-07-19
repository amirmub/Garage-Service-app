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
                <Link className="nav-link" to="#">Orders</Link>
                <Link className="nav-link" to="#">New order</Link>
                <Link className="nav-link" to="#">Add employee</Link>
                <Link className="nav-link" to="#">Employees</Link>
                <Link className="nav-link" to="#">Add customer</Link>
                <Link className="nav-link" to="#">Customers</Link>
                <Link className="nav-link" to="#">Services</Link>
            </nav>
      </div>

  )
}

export default Sidebar
