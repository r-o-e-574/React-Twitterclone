import React from "react";
import Spinner from "react-spinkit";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { signup } from "../../redux/users";
import { login } from "../../redux/auth";
import {
  TextField,
  Card,
  CssBaseline,
  Button,
  Typography,
  Container,
  ThemeProvider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Signup.css";
import { theme } from "./OverrideMUI";

class SignUp extends React.Component {
  state = {
    signUpData: {
      username: "",
      displayName: "",
      password: ""
    }
  }

  submitForm = e => {
    e.preventDefault();
    console.log(this.state.signUpData)
    this.props.signup(this.state.signUpData)
  }

  handleChange = e => {
    e.preventDefault();
    let signUpData = this.state.signUpData;
    signUpData[e.target.name] = e.target.value;
    this.setState({ signUpData })
  };



  render() {
    const responseGoogle = (response) => {
      console.log(response);
      const googleLogInData = {
        username: response.profileObj.givenName + response.profileObj.googleId.slice(-2),
        displayName: response.profileObj.givenName,
        password: response.profileObj.googleId.slice(6)
      }
      console.log(googleLogInData)

      this.props.signup(googleLogInData).then(() =>
        this.props.login({
          username: googleLogInData.username,
          password: googleLogInData.password
        }
        ));
    }
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <Container id="signUpWrapper" component="main" maxWidth="xs">
          <CssBaseline />
          <div >
            <Card id="signUpCard" elevation={8} >
              <Typography id="sign-up-label" style={{ color: "#1acb5b" }} component="h1" variant="h5" align="center">
                Sign Up
        </Typography>
              <ThemeProvider theme={theme}>
                <form id="signup-form" onSubmit={this.submitForm}>
                  <TextField
                    style={{ backgroundColor: "#FFFF" }}
                    variant="filled"
                    margin="normal"
                    minlength="4"
                    required
                    fullWidth
                    type="username"
                    label="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  {/* <label htmlFor="displayname">Display Name</label> */}
                  <TextField
                    style={{ backgroundColor: "#FFFF" }}
                    variant="filled"
                    margin="normal"
                    minlength="4"
                    required
                    fullWidth
                    type="displayname"
                    label="Display Name"
                    name="displayName"
                    onChange={this.handleChange}
                  />
                  {/* <label htmlFor="password">Password</label> */}
                  <TextField
                    style={{ backgroundColor: "#FFFF" }}
                    variant="filled"
                    margin="normal"
                    minlength="4"
                    required
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <Button variant="contained" id="signup-button-form" type="submit"> Sign Up</Button>
                  <GoogleLogin
                    clientId="760736109051-bck7ctrlk6fgclrtmb3lo52vpcvrmnsk.apps.googleusercontent.com"
                    buttonText="Google Sign Up"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />

                  <Link to="/login" id="login-link" style={{ textDecoration: 'none' }}>
                    {"Already have an account? Login"}
                  </Link>
                </form>
              </ThemeProvider>
            </Card>
          </div>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.users.signup.result,
    loading: state.users.signup.loading,
    error: state.users.signup.error
  }),
  { signup, login } //dispatchable things to add
)(SignUp);
