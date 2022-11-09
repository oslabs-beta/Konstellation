import React, { FormEvent, MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/login.scss';
import LoadingScreen, { LoadingScreenType } from './components/loadingScreen';
import logo from '../../images/konstellation-logo.png'
import background from './styles/images/login-background.png'
/**
 * Catch their respective event from the electron main process
 * Need to be outside of the Login component, otherwise they will fire twice
 */

function Login() {
  let navigate = useNavigate();
  // Message to send to the user on invalid input
  const badCredentials = "Invalid Credentials"
  // State will be null, but won't be if navigated from app
  // Don't autoload user into app if they navigated from app
  let { state } = useLocation();
  const autoLoad = state === null ? true : false;
  // Input fields
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [regionName, setRegionName] = useState("");
  // Toggling Password visiblity
  const [hideEye, toggleEye] = useState(true);
  const [hidePassword, togglePassword] = useState(true);
  // Toggle loading screen
  const [isLoading, setLoading] = useState(false);

  // Only fire on initial render
  // Executes twice because of React.Strict
  useEffect(() => {
    // On mount
    // Don't load user in if they just logged out
    if(autoLoad !== false) {
      loginUser(true);
    } else {
      setLoading(true);
      // Then load config
      window.electronAPI.getConfig();
    }
    // Response after trying to update local cred/config files
    window.electronAPI.onConfigResp('onConfigResp', (event: any, data: any) => {
      console.log("From server:", data)
      setLoading(false);
      // The fourth datapoint is whether the kube config was set properly
      // Only attempt to log the user in if kube config was created
      if(data[4]) {
        loginUser(false);
      } else {
        alert(badCredentials);
      }
    })
    // Why is this executing twice?
    // Response after parsing local cred/config files
    window.electronAPI.onSendConfig('onSendConfig', (event: any, data: [string, string, string, string]) => {
      console.log("Parsed from local files:", data);
      setLoading(false);
      // Update each input field
      setAccessKey(data[0]);
      setSecretKey(data[1]);
      setClusterName(data[2]);
      setRegionName(data[3]);
    })

    return () => {
      console.log('useEffect: unmount');
      window.electronAPI.unMount();
    };
  }, [])

  const loginUser = (loadConfig : boolean) => {

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
          alert(badCredentials)
          // Leverage Electron to parse authentication data from local files
          if(loadConfig) window.electronAPI.getConfig();
          return;
        }
        else {
          console.log('Valid creds!');
          navigate('/app');
          return;
        }
      }).catch(err => {
        alert('Unable to log in. Please ensure the server is running.')
        // Leverage Electron to parse authentication data from local files
        if(loadConfig) window.electronAPI.getConfig();
        return;       
      })
  }

  // Return true if the given string is empty
  const emptyString = (input : string ) => {
    if(input.trim() === '') return true;
    return false;    
  }

  const buttonPressed = (event: FormEvent) => {
    event.preventDefault();

    if(emptyString(accessKey) || emptyString(secretKey) || emptyString(clusterName) || emptyString(regionName)) {
      alert('Please fill out all fields');
      return;
    }

    setLoading(true);
    // Configure the user's local files with the input fields
    window.electronAPI.onConfig([accessKey, secretKey, clusterName, regionName]);

    return;
  }

  const ConditionalLoadingScreen = () => {
    if(isLoading) {
      return (<LoadingScreen type={LoadingScreenType.cyclingStops} />);
    }
    return (<></>);
  }

  return (
    
    <div id="login" style={{background: 'url(' + background + ') no-repeat center center fixed', backgroundSize : 'cover'}}>
      <ConditionalLoadingScreen />
      <div id="login-container">
			<img id="login-logo" src={logo}>
			</img>
        <h3 id="login-label">Login</h3>
        <form onSubmit={buttonPressed}>

          <div>
            <label>
              AWS Access Key ID:
              <input type="text" placeholder="Enter your access key ID" className="login-input" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              AWS Secret Access Key:
              <div className="passwordContainer">
                <input type={hidePassword ? 'password' : 'text'} className="login-input" placeholder="Enter your secret access key" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                <div className={hideEye ? 'eye-close' : 'eye-open'} onClick={() => {toggleEye(!hideEye); togglePassword(!hidePassword)}}></div>
              </div>
            </label>
          </div>

          <div >
            <label>
              Cluster Name:
              <input type="text" placeholder="Enter the Cluster's name" className="login-input" value={clusterName} onChange={(e) => setClusterName(e.target.value)} />
            </label>
          </div>

          <div>
            <label>
              Region:
              <input type="text" placeholder="Enter the Cluster's region" className="login-input" value={regionName} onChange={(e) => setRegionName(e.target.value)} />
            </label>
          </div>

          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;