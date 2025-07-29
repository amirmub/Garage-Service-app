import { useEffect, useState, createContext, useContext } from "react";
import {getAuth} from "../utils/auth";

// Create context
export const UserContext = createContext();

// Custom hook to use context
export const useAuth = () =>{
   useContext(UserContext);
}

// Provider component
export const AuthProvider = ({ children }) => {

  const [employee, setEmployee] = useState(null); // this for employee name for the home page like (Welcome Amir)
  const [isLogin, setIsLogin] = useState(false);
  const [admin, setAdmin] = useState(false);

    const values = { employee,isLogin,admin, setIsLogin, setAdmin};

  useEffect(() => {
    const loggedEmployee = getAuth(); // sync function

    if (loggedEmployee?.token) {
      setIsLogin(true);
      setEmployee(loggedEmployee);

      if (loggedEmployee.employee_role === 3) {
        setAdmin(true);
      }
    }
  }, []);

  console.log(values);
  

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

