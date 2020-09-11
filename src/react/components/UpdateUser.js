import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateuser } from "../../redux/users";
import {Typography, Button, Container, Card, TextField, FormControl, CssBaseline, ThemeProvider } from '@material-ui/core';
import DeleteUser from "./DeleteUser";
import UpdateAvatar  from "./UpdateAvatar";
import {theme} from "./OverrideMUI";
import "./UpdateUser.css";



class UpdateUser extends React.Component {
  state = {
    updateInfo: {
      password: "",
      about: "",
      displayName: ""
    },
    updated: false
  }

  submitForm = e => {
    e.preventDefault();
    this.props.updateuser(this.state.updateInfo);
    this.setState({ updated: !this.state.updated });
  }

  handleChange = e => {
    e.preventDefault();
    const updateInfo = { ...this.state.updateInfo } //copy made
    updateInfo[e.target.name] = e.target.value;
    this.setState({ updateInfo: updateInfo });

  };
  render() {
    const {error} = this.props
    return (
      <>
        <Container id = "userContainer" >
          <CssBaseline/>
          <Card elevation={8} id="updateCard">
            <Typography id="update-title" variant="h5" component="h1">Update your profile below</Typography>
            <ThemeProvider theme = {theme}>
            <FormControl id="update-form">
              <TextField
                style = {{ backgroundColor: "#FFFF" }}
                color ="secondary"
                variant="filled"
                margin="normal"
                fullWidth
                type="text"
                label="Password"
                name="password"
                onChange={this.handleChange}
              />
              <TextField
                style = {{ backgroundColor: "#FFFF" }}
                color ="secondary"
                variant="filled"
                margin="normal"
                fullWidth
                minlength="0"
                maxlength="255"
                type="text"
                label="About"
                name="about"
                onChange={this.handleChange}
              />
              <TextField
                style = {{ backgroundColor: "#FFFF" }}
                color ="secondary"
                variant="filled"
                margin="normal"
                fullWidth
                type="text"
                label="Display Name"
                name="displayName"
                onChange={this.handleChange}
              />
              <Button id = "save-changes" variant="contained" onClick={this.submitForm}> Save Changes </Button>
              {this.state.updated &&
              <Button component={ Link } to="/" variant="contained" id="view-changes" >View Changes</Button>
              }
            </FormControl>
            </ThemeProvider>
            {error && <p style={{ color: "red" }}>{error.message}</p>}
          </Card>
          <div id="delete-alert">
            <DeleteUser/>
          </div>
        </Container>
        <UpdateAvatar />
        
      </>
    );
  }
}

export default connect(
  state => ({
    result: state.users.updateuser.result,
    loading: state.users.updateuser.loading,
    error: state.users.updateuser.error
  }),
  { updateuser } //dispatchable things to add
)(UpdateUser);