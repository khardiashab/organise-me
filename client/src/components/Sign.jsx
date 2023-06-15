import React, { useState } from 'react';
 const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
   const handleSubmit = (event) => {
    event.preventDefault();
     // Perform data validation
    if (!validateUsername(username)) {
      alert('Invalid username');
      return;
    }
    if (!validateEmail(email)) {
      alert('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      alert('Invalid password');
      return;
    }
     // Submit login data
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
     // Set logged in state to true
    setLoggedIn(true);
  };
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
   if (loggedIn) {
    return (
<div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>

        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input type="email" className="form-control rounded-0" id="emailInput" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" className="form-control rounded-0" id="passwordInput" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary rounded-0">LogIn</button>
        <p className="lead my-3">If you are not a user, 
        <a href="" className="" onClick={setLoggedIn(false)}>Login here!</a></p>
      </form>
    </div>
    );
  }
   return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded" style={{ maxWidth: '400px', width: '100%' }}>
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
        <button type="submit" className="btn btn-primary rounded-0">Register</button>

        <p className="lead my-3">If you are already user, 
        <a href="" className="" onClick={setLoggedIn(true)}>Login here!</a></p>
      </form>
    </div>
  );
};
 export default Login;