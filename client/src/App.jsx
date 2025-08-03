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
import Order from "./pages/Order/Order";
import Employee from "./pages/Admin/Employee/Employee";

function App() {
  return (
    <>
      <TopHeader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path='/add-employee' element = {<AddEmployee />}></Route> */}
        <Route path="/unAuthorized" element={<UnAuthorized />}></Route>
        <Route path="/admin/employee" element={<Employee />}></Route>

        {/* any authenticated user access*/}
        <Route
          path="/admin/order"
          element={
            <PrivateRoute role={[1, 2, 3]}>
              <Order />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
