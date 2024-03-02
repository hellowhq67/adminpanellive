"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Redirect from React Router
import style from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const router = useRouter();
  const handleLogin = () => {
    if (username === "admin" && password === "admin73") {
      toast("welcome to admin panel");
      setLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };
  // Redirect to dashboard if loggedIn is true
  if (loggedIn) {
    return router.push("/dashboard");
  }


  return (
    <div className={style.conteiner}>
      <ToastContainer />
      <h2>ADMIN PANEL GRALIED</h2>
      <div className={style.loginForm}>
    

        <p>Username:</p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <p>Password:</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
