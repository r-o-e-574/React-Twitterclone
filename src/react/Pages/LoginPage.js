import React from "react";
import { LoginForm } from "../components";
import { userIsNotAuthenticated } from "../HOCs";
import wispr from "../../images/Updated_Logo.png";
import {
  CssBaseline,
} from "@material-ui/core";

class LoginPage extends React.Component {
  render() {
    console.log(this.props.signUpInfo)
    return (
      <>
        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <CssBaseline />
          <img src={wispr} id="wispr" alt="Wispr Logo" />

          <LoginForm />
        </body>
      </>
    );
  }
}

export default userIsNotAuthenticated(LoginPage);
