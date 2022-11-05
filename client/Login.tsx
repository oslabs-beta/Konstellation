import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.scss';

function Login() {
  let navigate = useNavigate();
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [regionName, setRegionName] = useState("");

  // If the server sends anything besides 200, then the user isn't authenticated
  // For the user's convenience, find and parse their three files (in $HOME/.aws/ 
  // and $HOME/.kube/) and populate their corresponding fields in the form
  const parseLocalCredentials = () => {
    console.log('<ELECTRON NEEDED> : Parse User\'s local files here!');
  }

  const loginUser = () => {
    //alert('id:' + accessKey + ' secret:' + secretKey);

    fetch('http://localhost:3000/authenticate', {
      method: 'GET'
    })
    .then(response => {
      //console.log('resp:', resp.json());
      //console.log('typeof:', typeof response.json());
      //console.log(response.json());
      console.log('status:', response.status);
      if(response.status !== 200) {
        console.log('bad credentials...');
        // Leverage Electron to parse authentication data from local files
        parseLocalCredentials();
      }
      else {
        console.log('Valid creds!');
        navigate('/app');
      }
    })
  }

  const buttonPressed = (event : FormEvent) => {
    event.preventDefault();

    // Use the non-empty inputs to configure local files
    if(accessKey && secretKey) {

    }

    loginUser();
  }

  // Need an environmental condition to avoid logging in user if they just logged out
  // Need to render the background with the "loading icon"
  loginUser();

  return (
    <div id="login" >
      <div id="login-container">
        <div id="logo" />
        <h3 id="login-label">Login</h3>
        <form onSubmit={buttonPressed}>

          <div>
            <label>
              AWS Access Key ID:
              <input type="text" placeholder="Enter your access key ID" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              AWS Secret Access Key:
              <input type="password" placeholder="Enter your secret access key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
            </label>
          </div>

          <div >
            <label>
              Cluster Name:
              <input type="text" placeholder="Enter the Cluster's name" value={clusterName} onChange={(e) => setClusterName(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Region:
              <input type="text" placeholder="Enter the Cluster's region" value={regionName} onChange={(e) => setRegionName(e.target.value)} />
            </label>
          </div>

          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );


}

export default Login;