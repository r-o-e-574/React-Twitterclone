import React from "react";
import { userIsNotAuthenticated } from "../HOCs";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Card,
  Button
} from "@material-ui/core";
// import bunnyeyes from "../../images/bunnyeyes.png";
import wispr from "../../images/Updated_Logo.png";
import "./Home.css";


class Home extends React.Component {
  render() {

    console.log(this.props.signUpInfo)
    return (
      <>
        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <CssBaseline />
          {/* <img src={bunnyeyes} id="bunny-eyes" alt="bunny peeking over subtitle" /> */}
          <img src={wispr} id="wispr" alt="Wispr Logo" />

          <div id="cardWrapper">
            <Card id="LoginSignUp" >
              <h2>Join the Wispr Community</h2>
              <Button component={Link} to="/login" variant="contained" id="login-button" >Login</Button>
              <Button component={Link} to="/signup" variant="contained" id="signup-button">Sign Up</Button>
            </Card>
          </div>
        </body>
      </>
    );
  }

}

export default userIsNotAuthenticated(Home);

