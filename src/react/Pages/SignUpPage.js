import React from "react";
import { SignUp } from "../components";
import { userIsNotAuthenticated } from "../HOCs";
import wispr from "../../images/Updated_Logo.png";


class SignUpPage extends React.Component {
  render() {

    return (
      <>
        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <img src={wispr} id="wispr" alt="Wispr Logo" />
          <SignUp />
        </body>
      </>
    );
  }
}

export default userIsNotAuthenticated(SignUpPage);
