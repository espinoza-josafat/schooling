import React from "react";

import { Link, withRouter } from "react-router-dom";

import * as routes from "../constants/routes";

import { auth } from "../firebase/index";
import * as users from "../bussiness/users";

import firebase from "firebase";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
    <StyledFirebaseAuthForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (proppertyName, value) => () => ({
  [proppertyName]: value
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        users
          .doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isValid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordTwo === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />

        <button disabled={isValid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignUpLink extends React.Component {
  render() {
    const styleSignUpLink = {
      fontSize: "18px",
      marginBottom: "0"
    };

    return (
      <p className="text-center adjust-block" style={styleSignUpLink}>
        ¿No tienes una cuenta? <Link to={routes.SIGN_UP}>Regístrate</Link>
      </p>
    );
  }
}

class StyledFirebaseAuthForm extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        console.log("authResult", authResult);

        users
          .doCreateUser(
            authResult.user.uid,
            authResult.user.displayName,
            authResult.user.email
          )
          .then(() => {
            this.onSubmit();
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });

        return false;
      }
    }
  };

  onSubmit = () => {
    const { history } = this.props;
    history.push(routes.HOME);
  };

  render() {
    return (
      <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
      />
    );
  }
}

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
