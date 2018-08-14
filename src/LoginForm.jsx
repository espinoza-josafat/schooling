import React from "react";
import { Button, FormGroup, Label, CustomInput, Input } from "reactstrap";
import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input autoFocus type="email" />
          </FormGroup>

          <FormGroup controlId="password" bsSize="large">
            <Label>Password</Label>
            <Input type="password" />
          </FormGroup>
          <Button block bsSize="large" type="submit">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
