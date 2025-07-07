'use client'
import React from "react";

const Login = () => {
  return (
            <div className="animate-in duration-500 fade-in">
              <form className="flex flex-col gap-3 mt-8">
                <input
                  type="text"
                  placeholder="Username"
                  className="inp-main"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="inp-main"
                />
                <button type="submit" className="btn-main">
                  Login
                </button>
              </form>
            </div>
  );
};

export default Login;
