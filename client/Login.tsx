import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/login.scss';


// interface ILogin {
//   (e? : FormEvent) : Promise<boolean>;
// }

function Login() {
  let navigate = useNavigate();
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [clusterName, setClusterName] = useState("");

  // If the server sends anything besides 200, then the user isn't authenticated
  // For the user's convenience, find and parse their three files (in $HOME/.aws/ 
  // and $HOME/.kube/) and populate their corresponding fields in the form
  const parseLocalCredentials = (event ? : FormEvent) => {
    console.log('<ELECTRON NEEDED> : Parse User\'s local files here!');
    if(event) {
      //console.log(event.target);
    }


  }

  // const loginUser : ILogin = async (event ? ) => {
  //   //alert('id:' + accessKey + ' secret:' + secretKey);
  //   if(event) event.preventDefault();

  //   fetch('http://localhost:3000/authenticate', {
  //     method: 'GET'
  //   })
  //   .then(response => {
  //     //console.log('resp:', resp.json());
  //     //console.log('typeof:', typeof response.json());
  //     //console.log(response.json());
  //     console.log('status:', response.status);
  //     if(response.status !== 200) {
  //       parseLocalCredentials();
  //       return false;
  //     }
  //     else {
  //       console.log('Valid creds!');
  //       navigate('/app');
  //       return true;
  //     }
  //   })
  //   return false;
  // }

  const loginUser =  (event ? : FormEvent) => {
    //alert('id:' + accessKey + ' secret:' + secretKey);
    if(event) event.preventDefault();

    fetch('http://localhost:3000/authenticate', {
      method: 'GET'
    })
    .then(response => {
      //console.log('resp:', resp.json());
      //console.log('typeof:', typeof response.json());
      //console.log(response.json());
      console.log('status:', response.status);
      if(response.status !== 200) {
        parseLocalCredentials(event);
      }
      else {
        console.log('Valid creds!');
        //navigate('/app');
      }
    })
  }

  // Need an environmental condition to avoid logging in user if they just logged out
  // Need to render the background with the "loading icon"
  loginUser();

  return (
    <div id="login" >
      <div id="login-container">
        <div id="logo" />
        <h3 id="login-label">Login</h3>
        <form onSubmit={loginUser}>

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
              <input type="text" placeholder="Enter the Cluster's region" value={clusterName} onChange={(e) => setClusterName(e.target.value)} />
            </label>
          </div>

          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );


}

export default Login;