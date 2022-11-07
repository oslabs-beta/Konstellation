import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.scss';

/**
 * Catch their respective event from the electron main process
 * Need to be outside of the Login component, otherwise they will fire twice
 */

function Login() {
  let navigate = useNavigate();
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [regionName, setRegionName] = useState("");

  // Why is this executing twice?
  // Response after trying to update local cred/config files
  window.electronAPI.onConfigResp('onConfigResp', (event: any, data: any) => {
    console.log("From server:", data)
  })
  
  // Why is this executing twice?
  // Response after parsing local cred/config files
  window.electronAPI.onSendConfig('onSendConfig', (event: any, data: [string, string, string]) => {
    console.log("Parsed from local files:", data);
    // Update each input field
    setAccessKey(data[0]);
    setSecretKey(data[1]);
    setRegionName(data[2]);
  })
  
  /**
   * Invoked when the user isn't authenticated to access a K8 cluster
   * Invoke electron's main process to access any credentials on the
   * user's local computer.
   */
  // const parseLocalCredentials = () => {
  //   //window.electronAPI.onConfig('Button Clicked');
  //   window.electronAPI.getConfig();
  // }

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
        if (response.status !== 200) {
          console.log('bad credentials...');
          // Leverage Electron to parse authentication data from local files
          window.electronAPI.getConfig();
        }
        else {
          console.log('Valid creds!');
          navigate('/app');
        }
      }).catch(err => {
        console.log('bad credentials...');
        // Leverage Electron to parse authentication data from local files
        window.electronAPI.getConfig();       
      })
  }

  // Returns true if the input string is empty
  const emptyString = (input : string ) => {
    if(input.trim() === '') return true;
    return false;    
  }

  const buttonPressed = (event: FormEvent) => {
    event.preventDefault();

    // Don't submit if any of the fields are empty
    if(emptyString(accessKey) || emptyString(secretKey) || emptyString(clusterName) || emptyString(regionName)) {
      alert('Please fill out all fields');
      return;
    }

    // Configure the user's local files with the input fields
    window.electronAPI.onConfig([accessKey, secretKey, clusterName, regionName]);
    // // Temporary
    // parseLocalCredentials();
    // // Tells electron to parse local credentials
    // window.electronAPI.getConfig();

    // // Use the non-empty inputs to configure local files
    // if(accessKey && secretKey) {

    // }

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