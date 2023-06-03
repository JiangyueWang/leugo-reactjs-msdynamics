import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../context/authConfig";
import { useNavigate} from "react-router-dom";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package 
 */

export const SignInButton = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).then(() => {
        navigate({pathname: "/home"})
      }).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then(() => {
        navigate({pathname: "/home"})
      }).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <div>
      <button as="button" onClick={() => handleLogin("popup")}>
        Sign in using Popup
      </button>
      <button as="button" onClick={() => handleLogin("redirect")}>
        Sign in using Redirect
      </button>
    </div>
  );
};