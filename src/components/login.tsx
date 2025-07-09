'use client'
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {

  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const [error,setError] =  React.useState<string | null>("");
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
    [e.target.name]: e.target.value,
    }));
  };
  const handelSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    
    if (res?.ok && !res?.error) {
      router.push("/home");
      router.refresh(); // Force a refresh to update session
    } else {
      setError(res?.error || "Invalid email or password");
    }
  };
  return (
            <div className="animate-in duration-500 fade-in">
              <form className="flex flex-col gap-3 mt-8" onSubmit={handelSumbit}>
                <input
                  type="text"
                  placeholder="Email"
                  className="inp-main"
                  name="email"
                  value={formData.email}
                  onChange={handelChange}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="inp-main"
                  name="password"
                  value={formData.password}
                  onChange={handelChange}
                />
                <button type="submit" className="btn-main">
                  Login
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </form>
            </div>
  );
};

export default Login;
