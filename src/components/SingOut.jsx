import React from "react";

import auth from "../firebase/index";

const SignOutButton = () => (
  <button type="button" onClick={auth.auth.doSignOut}>
    Sign Out
  </button>
);

export default SignOutButton;
