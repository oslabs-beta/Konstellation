import React, { FormEvent, useState } from 'react';
import './styles/login.scss';

function Login() {

  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");

  

  const handleSubmit = (event: FormEvent) => {
    alert('id:' + accessKey + ' secret:' + secretKey);
    event.preventDefault();

    fetch('http://localhost:3000/authenticate', {
      method: 'GET'
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
  }

  return (
    <div id="login" >
      <div id="login-container">
        <div id="logo"/>
        <h3 id="login-label">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>
              AWS Access Key ID:
              <input type="text" placeholder="Enter your access key ID" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} />
            </label>
          </div>

          <div className="field">
            <label>
              AWS Secret Access Key:
              <input type="password" placeholder="Enter your secret access key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
            </label>
          </div>
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;