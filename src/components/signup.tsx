'use client'
import React from "react";
import { useState } from "react";

const Signup = () => {
  return (
            <div className="animate-in duration-500 fade-in">
              <form className="flex flex-col gap-4 mt-8">
                <div className="flex flex-row gap-2">
                  <input type="text" placeholder="Full Name" className="inp-main" />
                <input type="text" placeholder="Username" className="inp-main" />
                </div>
                <input type="email" placeholder="Email" className="inp-main" />
                <input type="password" placeholder="Password" className="inp-main" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="inp-main"
                />
                <button type="submit" className="btn-main">
                  Sign Up
                </button>
              </form>
            </div>
  );
};

export default Signup;
