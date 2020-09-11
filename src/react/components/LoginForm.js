import React from "react";
import Spinner from "react-spinkit";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { login } from "../../redux/auth";
import { signup } from "../../redux/users";
import {
  Button,
  Container,
  Typography,
  TextField,
  Card,
  CssBaseline,
  ThemeProvider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import { theme } from "./OverrideMUI";


class LoginForm extends React.Component {
  state = {
    loginInfo: {
      username: "",
      password: ""
    }
  };

  handleLogin = e => {
    e.preventDefault();
    if (this.props.username && this.props.password) {
      let newLogInInfo = {
        username: this.props.username,
        password: this.props.password
      }
      this.props.login(newLogInInfo); //passing form data

    }
    else {
      this.props.login(this.state.loginInfo); //passing form data
    }

  };

  handleChange = e => {
    const loginInfo = { ...this.state.loginInfo } //copy made
    loginInfo[e.target.name] = e.target.value;
    this.setState({ loginInfo: loginInfo });
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
      this.setState({ redirect: true })
      const googleLogInData = {
        username: response.profileObj.givenName + response.profileObj.googleId.slice(-2),
        password: response.profileObj.googleId.slice(6)
      }
      console.log(googleLogInData)
      this.props.login(googleLogInData)
    }

    const { loading, error } = this.props;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs" id="loginWrapper" style={{ justifyContents: "center" }}>
          <CssBaseline />
          <div >
            <Card id="logInCard" elevation={8}>
              <Typography style={{ color: "#06d8ef" }} component="h1" variant="h5" align="center"  >
                Login
        </Typography>
              <ThemeProvider theme={theme}>
                <form id="login-form" onSubmit={this.handleLogin}>
                  <TextField
                    style={{ backgroundColor: "#FFFF" }}
                    color="secondary"
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    type="username"
                    label="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  {/* <label htmlFor="password">Password</label> */}
                  <TextField
                    style={{ backgroundColor: "#FFFF" }}
                    color="secondary"
                    variant="filled"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                  />

                  <Button variant="contained" id="login-page-button" type="submit" disabled={loading}>
                    Login
                </Button>

                  <GoogleLogin
                    clientId="760736109051-bck7ctrlk6fgclrtmb3lo52vpcvrmnsk.apps.googleusercontent.com"
                    buttonText="Log In"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />

                  <Link to="/signup" id="signup-link" style={{ textDecoration: 'none' }}>
                    {"Don't have an account? Sign Up"}
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
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login, signup } //dispatchable things to add
)(LoginForm);
