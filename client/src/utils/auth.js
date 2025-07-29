// Decode JWT payload
function decodeTokenPayload(token) {
  if (!token) {
    return null;
  }

  try {
    const payloadPart = token.split('.')[1];
    const decoded = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
}


// Get decoded auth data from localStorage
export function getAuth() {
  const token = localStorage.getItem("Token");
  if (!token) {
    return null;
  }

  const decodedToken = decodeTokenPayload(token);
  if (!decodedToken){
     return null;
  }

  return {
    token,
    employee_id: decodedToken.employee_id,
    employee_first_name: decodedToken.employee_first_name,
    employee_role: decodedToken.employee_role,
  };
}

console.log(getAuth());
