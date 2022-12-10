import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
import { useContext } from "react";
import {AuthContext} from './context/AuthContext';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   navigate("/")
    // } catch (err) {
    //   setErr(true);
    // }
  //     const requestOptions = {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     // body: JSON.stringify(emailRef.current.value, passwordRef.current.value )
  //     body: JSON.stringify({
  //       username:email,
  //       password:password 
  //   })
  // };
  // fetch('https://staging-api.tracknerd.io/v1/auth/login', requestOptions)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  //     navigate("/")
   
  try {
    setErr("")
    // setLoading(true)
    await login(email, password)
    navigate("/")
  } catch {
    setErr("Failed to log in")
  }



  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password"  />
          <button s>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        {/* <p>You don't have an account? <Link to="/register">Register</Link></p> */}
      </div>
    </div>
  );
};

export default Login;
