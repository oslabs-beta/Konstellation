import React, {
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/login.scss';
import LoadingScreen, { LoadingScreenType } from './components/loadingScreen';
import logo from '../../images/konstellation-logo.png';
import background from './styles/images/login-background.png';
import { response } from 'express';
/**
 * Catch their respective event from the electron main process
 * Need to be outside of the Login component, otherwise they will fire twice
 */

function Login() {
  let navigate = useNavigate();
  // Message to send to the user on invalid input
  const badCredentials = 'Invalid Credentials';
  // State will be null, but won't be if navigated from app
  // Don't autoload user into app if they navigated from app
  let { state } = useLocation();
  const autoLoad = state === null ? true : false;
  const usingElectron = window.electronAPI === undefined ? false : true;
  // Input fields
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [clusterName, setClusterName] = useState('');
  const [regionName, setRegionName] = useState('');
  // Toggling Password visiblity
  const [hideEye, toggleEye] = useState(true);
  const [hidePassword, togglePassword] = useState(true);
  // Toggle loading screen
  const [isLoading, setLoading] = useState(false);

  // Only fire on initial render
  // Executes twice because of React.Strict
  useEffect(() => {
    // Don't load user in if they just logged out
    if (autoLoad !== false) {
      setLoading(true);
      loginUser(true);
    } else {
      // Only send request to electron if using electron
      if (window.electronAPI) {
        setLoading(true);
        window.electronAPI.getConfig();
      }
    }

    // Handles electron's response for setting config files
    if (usingElectron) {
      window.electronAPI.onConfigResp(
        'onConfigResp',
        (event: any, data: any) => {
          // console.log("From server:", data)
          setLoading(false);
          // The fourth datapoint is whether the kube config was set properly
          // Only attempt to log the user in if kube config was created
          if (data[4]) {
            loginUser(false);
          } else {
            alert(badCredentials);
          }
        }
      );
    }

    // Handles electron's response for requesting config files
    if (usingElectron) {
      window.electronAPI.onSendConfig(
        'onSendConfig',
        (event: any, data: [string, string, string, string]) => {
          // console.log("Parsed from local files:", data);
          setLoading(false);
          // Update each input field
          setAccessKey(data[0]);
          setSecretKey(data[1]);
          setClusterName(data[2]);
          setRegionName(data[3]);
        }
      );
    }

    return () => {
      setLoading(false);
      // Remove listeners
      if (usingElectron) {
        window.electronAPI.unMount();
      }
    };
  }, []);

  /**
   * Validates and transfers the user to the main app if they have
   * valid credentials.
   * @param loadConfig if true and using electron, will load any user
   * credentials from local files
   */
  const loginUser = (loadConfig: boolean) => {
    let loginUser = false;
    fetch('http://localhost:3000/authenticate', {
      method: 'GET',
    })
      .then((response) => {
        //console.log('resp:', resp.json());
        //console.log('typeof:', typeof response.json());
        //console.log(response.json());

        if (response.status !== 200) {
          console.log('bad credentials...');
          alert(badCredentials);
        } else {
          console.log('Valid creds!');
          navigate('/app');
          loginUser = true;
          return;
        }
      })
      .catch((err) => {
        alert('Unable to log in. Please ensure the server is running.');
      })
      .finally(() => {
        // Do nothing if the user is clear to log in
        if (!loginUser) {
          // Leverage Electron to parse any authentication data from local files
          if (usingElectron && loadConfig) {
            window.electronAPI.getConfig();
          }
          // Else not using electron and the local credentials are bad
          else if (!usingElectron) {
            alert('Please configure your local kubeconfig file.');
          }
        }
      });
  };

  // Return true if the given string is empty
  const emptyString = (input: string) => {
    if (input.trim() === '') return true;
    return false;
  };

  // Invoked when the user clicks the Login, submit button
  const buttonPressed = (event: FormEvent) => {
    event.preventDefault();

    // if (emptyString(accessKey) || emptyString(secretKey) || emptyString(clusterName) || emptyString(regionName)) {
    //   alert('Please fill out all fields');
    //   return;
    // }

    setLoading(true);
    if (usingElectron) {
      // Configure the user's local files with the input fields
      window.electronAPI.onConfig([
        accessKey,
        secretKey,
        clusterName,
        regionName,
      ]);
    } else {
      // Authenticate the user
      loginUser(false);
    }

    return;
  };

  const ConditionalLoadingScreen = () => {
    if (isLoading) {
      return <LoadingScreen type={LoadingScreenType.cyclingStops} />;
    }
    return <></>;
  };

  /**
   * Only render the input form if the user is using electron. If the user isn't using
   * electron, there isn't a way to configure the user's kube config nor aws creds.
   * @returns An input form or an empty JSX object
   */
  const CredentialsForm = () => {
    return <div></div>;
    return <></>;
  };

  return (
    <div
      id="login"
      style={{
        background: 'url(' + background + ') no-repeat center center fixed',
        backgroundSize: 'cover',
      }}
    >
      <ConditionalLoadingScreen />
      <div id="login-container">
        <img id="login-logo" src={logo}></img>
        <h3 id="login-label">Login</h3>
        <form onSubmit={buttonPressed}>
          <div>
            <label>
              AWS Access Key ID:
              <input
                disabled={!usingElectron}
                type="text"
                placeholder="Enter your access key ID"
                className="login-input"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              AWS Secret Access Key:
              <div className="passwordContainer">
                <input
                  disabled={!usingElectron}
                  type={hidePassword ? 'password' : 'text'}
                  className="login-input"
                  placeholder="Enter your secret access key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
                <div
                  className={hideEye ? 'eye-close' : 'eye-open'}
                  onClick={() => {
                    toggleEye(!hideEye);
                    togglePassword(!hidePassword);
                  }}
                ></div>
              </div>
            </label>
          </div>

          <div>
            <label>
              Cluster Name:
              <input
                disabled={!usingElectron}
                type="text"
                placeholder="Enter the Cluster's name"
                className="login-input"
                value={clusterName}
                onChange={(e) => setClusterName(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Region:
              <input
                disabled={!usingElectron}
                type="text"
                placeholder="Enter the Cluster's region"
                className="login-input"
                value={regionName}
                onChange={(e) => setRegionName(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" id="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
