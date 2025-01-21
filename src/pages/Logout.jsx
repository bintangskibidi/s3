// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { API_DUMMY } from "../utils/base_url";

// export default function Logout() {
//   const navigate = useNavigate();

//   const logout = () => {
//     // Here, you can clear any authentication tokens or session data
//     localStorage.removeItem("authToken"); // Assuming token is stored in localStorage

//     // You can also clear cookies if needed
//     // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

//     // Show success alert using SweetAlert
//     Swal.fire({
//       icon: "success",
//       title: "Berhasil Logout!",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     // Redirect to login page after a short delay
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   };

//   return (
//     <div className="logout-container">
//       <h3>Logout</h3>
//       <button onClick={logout} className="logout-button">
//         Logout
//       </button>
//     </div>
//   );
// }
