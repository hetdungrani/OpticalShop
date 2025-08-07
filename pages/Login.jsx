import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  useEffect(() => {
    const msg = sessionStorage.getItem("register");
    if (msg) {
      setRegisterMsg(msg);
      sessionStorage.removeItem("register");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { rid } = res.data;

      sessionStorage.setItem("rid", rid);
      sessionStorage.setItem("email", email);

      const buyFlag = sessionStorage.getItem("buy");
      if (buyFlag === "buy") {
        sessionStorage.removeItem("buy");
        navigate("/order");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMsg("Incorrect Email and Password");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover flex  items-center justify-center"
      style={{
        backgroundImage: "url('assets/img/regbackgroung.jpg')",
      }}
    >
      <div className=" p-8 rounded-xl bg-white  shadow-lg w-[95%] max-w-md">
        <h1 className="text-3xl text-center font-bold text-blue-900 mb-6">
          Login Form
        </h1>

        {registerMsg && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-3 text-center font-semibold">
            {registerMsg}
          </div>
        )}

        {errorMsg && (
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded mb-3 text-center font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="txtemail" className="block text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="txtemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="txtpassword" className="block text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              id="txtpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-900 text-white font-bold text-lg w-full py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>

          <p className="text-center text-blue-900 text-md mt-4">
            Don't have an account? 
            <a href="/signup" className="text-blue-700 font-semibold ml-1">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
