import React from "react";

import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";

import { PasswordForgetLink } from "./PasswordForget";

import { auth } from "../firebase/index";

import * as routes from "../constants/routes";

import { Icon, Button } from "react-materialize";

import "./SignIn.css";

const SignInPage = ({ history }) => (
  <div>
    <SignInForm history={history} />
  </div>
);

const byPropKey = (proppertyName, value) => () => ({
  [proppertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isValid = password === "" || email === "";

    return (
      <div className="had-container">
        <div className="parallax-container">
          <div className="row">
            <br />
            <div className="center">
              <h4 className="bg-card-user">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/happily-colored-snlogo/128/medium.png"
                  alt=""
                  className="circle responsive-img"
                />
                <div className="row login">
                  <h4 className="adjust-block">Inicio de sesión</h4>
                  <form onSubmit={this.onSubmit} className="col s12">
                    <div className="row">
                      <div className="input-field col m12 s12 no-right-left-padding">
                        <i className="material-icons iconis prefix">
                          account_box
                        </i>
                        <input
                          id="icon_prefix"
                          value={email}
                          onChange={event =>
                            this.setState(
                              byPropKey("email", event.target.value)
                            )
                          }
                          type="text"
                        />
                        <label htmlFor="icon_prefix">Correo electrónico</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col m12 s12 no-right-left-padding">
                        <i className="material-icons iconis prefix">
                          enhanced_encryption
                        </i>
                        <input
                          id="password"
                          value={password}
                          onChange={event =>
                            this.setState(
                              byPropKey("password", event.target.value)
                            )
                          }
                          type="password"
                        />
                        <label htmlFor="password">Contraseña</label>
                      </div>
                    </div>
                    <div className="row">
                      <Button disabled={isValid} waves="light" type="submit">
                        Iniciar sesión
                      </Button>
                    </div>
                    {error && <p className="error-form">{error.message}</p>}

                    <SignUpLink />
                    <PasswordForgetLink />
                  </form>
                </div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
