import React from "react";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "600px" }}>
        <img
          src="images/Logo.png"  
          alt="Logo"
          className="mx-auto mb-3" 
          style={{ width: "160px", height: "50px" }}
        />
        <h5 className="text-center mt-2">Welcome to Navomin Super</h5>
        <p className="text-center text-muted">Sign in to place orders...</p>

        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username/Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-2">
          <a href="#" className="text-decoration-none">
            Forgot Password?
          </a>
        </div>

        <div className="text-center mt-3">
          <small>Not registered yet?</small>{" "}
          <a href="#" className="text-primary text-decoration-none">
            Sign Up
          </a>
        </div>

        {/* Social Media Login */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <FaGoogle className="text-primary fs-4 cursor-pointer" />
          <FaFacebookF className="text-primary fs-4 cursor-pointer" />
          <FaTwitter className="text-primary fs-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Login;
