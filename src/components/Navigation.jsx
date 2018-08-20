import React from "react";

import { Link } from "react-router-dom";

import AuthUserContext from "./AuthUserContext";
import SignOutButton from "./SingOut";
import * as routes from "../constants/routes";

import { Icon, Navbar, NavItem } from "react-materialize";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Navbar brand="logo" left>
    <NavItem href={routes.LANDING}>Landing</NavItem>
    <NavItem href={routes.HOME}>Home</NavItem>
    <NavItem href={routes.ACCOUNT}>Account</NavItem>
    <SignOutButton />
  </Navbar>
);

const NavigationNonAuth = () => (
  <Navbar brand="logo" left>
    <NavItem href={routes.LANDING}>Landing</NavItem>
    <NavItem href={routes.SIGN_IN}>Sign in</NavItem>
  </Navbar>
);

export default Navigation;
