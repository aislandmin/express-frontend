import { Link } from "react-router-dom";
import styles from "./login-window.module.scss";
import axios from "axios";
import { useState } from "react";
import { setSessionUserInfo } from "./local-storage";

export default function LoginWindow(props) {
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function HandleSubmitClick() {
    const userData = {
      username,
      password,
    };

    try {
      const resData = await axios({
        url: "/login",
        method: "POST",
        data: userData,
      });
      console.log("Get resData: ", resData);
      setMessage(resData?.data?.msg);
      setCode(resData?.data?.code);
      if (resData?.data?.code === 200) {
        setCode(resData?.data?.code);
        setSessionUserInfo(username); // put username into local storage
        props.setCurUsername(username); // data to push header re-rendering
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/login", er);
    }
  }

  function handleInputChange(event) {
    setMessage("");
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  }

  const element = (
    <div className={styles["express-login-window-container"]}>
      <div className="express-login-window">
        <img alt="" src="/login-bg.jpg" />
        <div className="express-login-form">
          <div className="express-login-form-company">
            <img alt="" src="/logo-without-glow.png" />
            <h4>M.Y Flash Express</h4>
          </div>
          <div className="express-login-form-panel">
            <div className="express-login-form-panel-header">
              <Link
                className="express-login-form-header-text"
                to="/forget-password"
              >
                Forget Password
              </Link>
              <Link className="express-login-form-header-text" to="/sign-up">
                Sign Up
              </Link>
            </div>
            <div className="express-login-form-panel-input">
              <input
                placeholder="Enter your phone number"
                text="text"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="express-login-form-panel-input">
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>

            {code === 500 ? (
              <p className="express-login-form-panel-warning">{message}</p>
            ) : null}
            <button
              className="express-login-form-panel-btn"
              onClick={HandleSubmitClick}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return code !== 200 && element;
}
