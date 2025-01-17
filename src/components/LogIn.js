import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/meSlice";
import "../styles/LogIn.css";
import SignUp from "./SignUp";

function LogIn({ fetchContacts }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [signUpFormShown, setSignUpFormShown] = useState(false);
  const loginFormRef = useRef(null);

  async function login() {
    const form = loginFormRef.current;
    setIsLoading(true);

    const username = form[0].value;
    const password = form[1].value;

    const method = "POST";
    const url = process.env.REACT_APP_API_BASE_URL + "/auth/login";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ username, password });
    try {
      const response = await fetch(url, { method, headers, body });
      const resObj = await response.json();
      if (resObj.user) {
        dispatch(setUser(resObj.user));
        dispatch(setToken(resObj.token));
        saveMeToLocalStorage({ user: resObj.user, token: resObj.token });
        fetchContacts(resObj.user._id, resObj.token);
      } else {
        setLoginMessage(resObj.info);
      }
    } catch (error) {
      console.log("error", error);
    }

    form[1].value = "";
    setIsLoading(false);
  }

  function handleFormSubmitted(e) {
    e.preventDefault();
    login();
  }

  function clearLoginMessage() {
    setLoginMessage("");
  }

  function saveMeToLocalStorage(me) {
    localStorage.setItem("me", JSON.stringify(me));
  }

  function handleNewAccountBtnClicked() {
    setSignUpFormShown(true);
  }

  function handleDemoUserBtnClicked() {
    const form = loginFormRef.current;
    const username = "disastrousever";
    const password = "pass";
    form[0].value = username;
    form[1].value = password;
    login();
  }

  return (
    <div className="LogIn">
      <div className="logo-container">
        <label className="logo">generic social media site</label>
        <div className="logo-subtext">
          Just a place to connect with others
        </div>
      </div>
      <div className="window-container">
        <div className={"log-in-window" + (isLoading ? " disabled" : "")}>
          <form
            action=""
            className="log-in-form"
            onSubmit={handleFormSubmitted}
            ref={loginFormRef}
          >
            <input
              type="text"
              className="username"
              placeholder="Username"
              minLength={1}
              maxLength={24}
              onChange={clearLoginMessage}
              disabled={isLoading}
              required
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              minLength={1}
              maxLength={24}
              onChange={clearLoginMessage}
              autoComplete="off"
              disabled={isLoading}
              required
            />
            <button className="log-in-btn" disabled={isLoading}>
              Log In
            </button>
            <button
              type="button"
              className="demo-user-btn"
              onClick={handleDemoUserBtnClicked}
            >
              Try the platform
            </button>
          </form>
          <div className="divider" />
          <button
            type="button"
            className="new-account-btn"
            onClick={handleNewAccountBtnClicked}
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
        <div className="login-message">{loginMessage}</div>
      </div>
      {signUpFormShown ? (
        <SignUp setSignUpFormShown={setSignUpFormShown} />
      ) : null}
    </div>
  );
}

export default LogIn;