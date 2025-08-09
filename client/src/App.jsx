import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import AddEmployee from "./pages/Admin/Addemployee/Addemployee";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import TopHeader from "./components/TopHeader/TopHeader";
import UnAuthorized from "./pages/UnAuthorized/UnAuthorized";
import { PrivateRoute } from "./components/Auth/PrivetRoute";
import Employee from "./pages/Admin/Employee/Employee";
import AddCustomer from "./pages/Customer/AddCustomer/AddCustomer";
import Customers from "./pages/Customer/Customers/Customers";
import Vehicle from "./pages/Vehicle/Vehicle";
import AddOrder from "./pages/Order/AddOrder/AddOrder";
import Services from "./pages/Services/Services";
import OrderDetail from "./pages/Order/OrderDetail/OrderDetail";

function App() {
  return (
    <>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/unAuthorized" element={<UnAuthorized />}></Route>

        {/* all authenticated user access*/}
         <Route
          path="/order-detail"
          element={
            <PrivateRoute role={[3]}>
              <OrderDetail />
            </PrivateRoute>
          }
        ></Route>

        {/* authenticated and also authorization for only admin*/}
        <Route
          path="/add-employee"
          element={
            <PrivateRoute role={[3]}>
              <AddEmployee />
            </PrivateRoute>
          }
        ></Route>
        
         <Route
          path="/admin/employee"
          element={
            <PrivateRoute role={[3]}>
              <Employee />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/services"
          element={
            <PrivateRoute role={[3]}>
              <Services />
            </PrivateRoute>
          }
        ></Route>


        {/* authorized for role 2 and 3 */}
        <Route
          path="/add-customer"
          element={
            <PrivateRoute role={[2,3]}>
              <AddCustomer />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/customers"
          element={
            <PrivateRoute role={[2,3]}>
              <Customers />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/add-vehicle"
          element={
            <PrivateRoute role={[2,3]}>
              <Vehicle />
            </PrivateRoute>
          }
        ></Route>
        
          <Route
            path="/add-order"
            element={
              <PrivateRoute role={[2,3]}>
                <AddOrder />
              </PrivateRoute>
            }
          ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
