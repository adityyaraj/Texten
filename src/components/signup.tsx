"use client";
import React from "react";
import { useState } from "react";

const Signup = () => {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [message, setMessage] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessage("");
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please login.");
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } else {
      setMessage(data.message);
    }

  
  };
  return (
    <div className="animate-in duration-500 fade-in">
      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2">
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            className="inp-main" 
            value={formData.name} 
            onChange={handleChange} 
            onKeyPress={handleKeyPress}
          />
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            className="inp-main" 
            value={formData.username} 
            onChange={handleChange} 
            onKeyPress={handleKeyPress}
          />
        </div>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="inp-main" 
          value={formData.email} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="inp-main" 
          value={formData.password} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="inp-main"
          value={formData.confirmPassword} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button type="submit" className="btn-main">
          Sign Up
        </button>
        {message && (
          <div className="text-center text-red-500 mt-4">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
