import React, { useState } from 'react';
import { redirect, useNavigate  } from "react-router-dom";
import { login, registeration } from '../api/auth';


const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const userRegisteration = async()=>{
    let data = {username, email, password}
    try {
      let response = await registeration(data)
      localStorage.setItem("authToken", response.data.token)
      navigate("/")
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message)
      setPassword('')
      setConfrimPassword('')

    }

  }

  const userLogin = async( ) =>{
    const data = { email, password}
    try {
      const response = await login(data)
      console.log("response : ", response)
      localStorage.setItem("authToken", response.token)
      
      navigate("/")
    } catch (error) {
      console.log(error)
      alert(error.response?.message)
    }
  }

  const hanleLoginSubmit = async(event) =>{
    event.preventDefault();
    // Perform data validation
    if (!validateEmail(email)) {
      alert('Invalid email');
      return;
    }
    // Submit login data
    await userLogin()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform data validation
    if (!validateUsername(username)) {
      alert('Username contain only a-z and 0-9');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      alert('Password is too week.\n \t Use a capital letter.\n \t Use number. \n \t Use a symbol.');
      return;
    }
    if(!validateConfrimPassword){
      alert("Password not match.")
      setConfrimPassword('')
      setPassword('')
      return;
    }
    // Submit login data

    await userRegisteration()
  };
  const validateConfrimPassword = (confrimPassword)=>{
    return password === confrimPassword
  }
  const validateUsername = (username) => {
    const regex = /^[a-z0-9]{3,25}$/;
    return regex.test(username);
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    const minChars = 8;
    const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{${minChars},})`);
    return regex.test(password);
  };




  return (
    loggedIn ? (
      <div className="d-flex justify-content-center">
        <form onSubmit={hanleLoginSubmit} className="bg-light p-4 mt-5 rounded" style={{ maxWidth: '400px', width: '100%' }}>

          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" className="form-control rounded-0" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" className="form-control rounded-0" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          <div className="text-center my-3">
            <button type="submit" className="btn btn-primary rounded-0 mx-auto" >Login</button>
          </div>
          <p className="lead my-3">If you are not a user,
            <span href="" className="text-decoration-underline link-primary " onClick={() => setLoggedIn(false)} style={{ cursor: "pointer" }}>Register here!</span></p>
        </form>
      </div>

    ) : (
      <div className="d-flex justify-content-center ">
        <form onSubmit={handleSubmit} className="bg-light p-4 mt-5 rounded" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="form-group">
            <label htmlFor="usernameInput">Username</label>
            <input type="text" className="form-control rounded-0" id="usernameInput" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input type="email" className="form-control rounded-0" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" className="form-control rounded-0" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Confrim Password</label>
            <input type="password" className="form-control rounded-0" id="confrimpasswordInput" value={confrimPassword} onChange={(event) => setConfrimPassword(event.target.value)} />
          </div>
          <div className="text-center my-3">
            <button type="submit" className="btn btn-primary rounded-0 mx-auto">Register</button>
          </div>

          <p className="lead my-3">If you are already user,
            <span className="text-decoration-underline link-primary" onClick={() => setLoggedIn(true)} style={{ cursor: "pointer" }}>Login here!</span></p>
        </form>
      </div>

    )
  );
};
export default Login;