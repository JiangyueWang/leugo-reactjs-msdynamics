import React from "react";
import { useMsal } from "@azure/msal-react";


/**
 * Renders a sign out button 
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <div>
      <button as="button" onClick={() => handleLogout("popup")}>
        Sign out using Popup
      </button>
      <button as="button" onClick={() => handleLogout("redirect")}>
        Sign out using Redirect
      </button>
    </div>
  );
};