// import { Link, useNavigate } from "react-router-dom";
// import { FaShoppingCart } from "react-icons/fa";
// import { useState,useEffect } from "react";

// function Header() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const rid = sessionStorage.getItem("rid");
//     setIsLoggedIn(!!rid); // true if logged in
//   }, []);

//   const handleLogout = () => {
//     sessionStorage.removeItem("rid");
//     sessionStorage.removeItem("email");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md rounded-b-[25px] fixed top-0 left-0 w-full z-50 px-3 py-1">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="flex items-center">
//           <img
//             src="assets\img\LOGO.png"
//             alt="Logo"
//             className="rounded-lg mr-3"
//             width="70"
//             height="60"
//           />
//           <strong className="text-gray-800 text-lg">Optical Shope</strong>
//         </Link>

//         <div className="hidden lg:flex justify-between left-[42%] fixed w-full max-w-[800px] mx-auto">
//           <ul className="flex gap-6">
//             <li>
//               <Link
//                 to="/"
//                 className="text-gray-800 font-medium hover:text-blue-600 transition"
//               >
//                 All
//               </Link>
              
//             </li>
//             <li>
//               <Link
//                 to="/eyetest"
//                 className="text-gray-800 font-medium hover:text-blue-600 transition"
//               >
//                 Eye-Test
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/aboutus"
//                 className="text-gray-800 font-medium hover:text-blue-600 transition"
//               >
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/contactus"
//                 className="text-gray-800 font-medium hover:text-blue-600 transition"
//               >
//                 Contact Us
//               </Link>
//             </li>
//           </ul>

//           <ul className="flex items-center fixed right-9 gap-6">
//             <li>
//               <Link
//                 to="/cart"
//                 className="text-gray-800 hover:text-blue-600 transition"
//               >
//                 <i className="fa text-[18px]">
//                   <FaShoppingCart />
//                 </i>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/login"
//                 className="text-green-600 font-medium"
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               {isLoggedIn ? (
//                 <button
//                   onClick={handleLogout}
//                   className="text-red-700 font-bold"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link
//                   to="/signup"
//                   className="text-red-700 font-bold hover:underline"
//                 >
//                   Signup
//                 </Link>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const rid = sessionStorage.getItem("rid");
    setIsLoggedIn(!!rid);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("rid");
    sessionStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md rounded-b-[25px] fixed top-0 left-0 w-full z-50 px-3 py-1">
      <div className="flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <img
            src="assets/img/LOGO.png"
            alt="Logo"
            className="rounded-lg mr-3"
            width="70"
            height="60"
          />
          <strong className="text-gray-800 text-lg">Optical Store</strong>
        </NavLink>

        <div className="hidden lg:flex justify-between left-[42%] fixed w-full max-w-[800px] mx-auto">
          <ul className="flex gap-6">
            {["/", "/eyetest", "/aboutus", "/contactus"].map((path, idx) => {
              const labels = ["All", "Eye-Test", "About Us", "Contact Us"];
              return (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-medium "
                        : "text-gray-800 font-medium hover:text-blue-600 transition"
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <ul className="flex items-center fixed right-9 gap-6">
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600 transition"
                }
              >
                <i className="fa text-[18px]">
                  <FaShoppingCart />
                </i>
              </NavLink>
            </li>

            {!isLoggedIn && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-700 font-bold "
                      : "text-green-600 font-medium hover:text-green-700"
                  }
                >
                  Login
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-700 font-bold hover:cursor-pointer hover:text-red-500"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
