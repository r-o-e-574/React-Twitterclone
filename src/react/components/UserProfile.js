import React from "react";
import "./UserProfile.css";
import UserMessages from "./UserMessages";
import { connect } from "react-redux";
import { getuser, createMessage, updateavi } from "../../redux";
import UserAvatar from "./UserAvatar";
import {
  Container,
  Button,
  Paper,
  TextField,
  CssBaseline,
  Card,
  // MuiThemeProvider
} from "@material-ui/core"


class UserProfile extends React.Component {
  state = {
    text: "",
    open: false
  }
  componentDidMount() {
    if (this.props.user === null || this.props.user === undefined) {
      this.props.getuser("");
    } else {
      this.props.getuser(this.props.user)
    }
  };
  handleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  handleCreateComment = e => {
    e.preventDefault();
    this.props.createMessage(this.state.text);
    this.resetCharacterCounter();
    this.setState({ open: false });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  characterCounter = () => {
    let text = document.getElementById("outlined-textarea");
    document.getElementById("character-count").innerHTML =
      140 - text.value.length + " / 140";

  };

  resetCharacterCounter = () => {
    let text = document.getElementById("outlined-textarea");
    document.getElementById("character-count").innerHTML =
      140 - text.value.length + " / 140";
  }

  render() {
      const { result } = this.props;
      const { loggedIn } = this.props;
      //console.log(loggedIn);
      const otherUser = this.props.user.username;
      // console.log(otherUser);
      // console.log(otherUser === loggedIn);
      const userResult = {...result}
      const user = {...userResult.user}
      const username = user.username;
      const displayName = user.displayName;
      const created = user.createdAt;
      let about = user.about;
      if(about === '' || about === null){
        about = "Hello, I'm a new wisper user."
      }
      //console.log(result);
    return (
      <>
        <div id="user-profile">
          <div id="user-info">
            <Container component="main" maxWidth="l" style={{ justifyContents: "center" }}>
              <CssBaseline />

              <Card id="user-info-color" style={{ marginTop: "20px" }} elevation={6}>
                <p id="joined">Joined: {created}</p>
                <UserAvatar />
                <h1 id="display-nameP">{displayName}</h1>
                <h3 id="usernameP" style={{ color: "#74d14c" }}>@{username}</h3>
                <div id="aboutP"><h3>Bio:</h3><p>{about}</p></div>
                {otherUser === loggedIn || otherUser === 'username' ?
                  <Button
                    label="Alert"
                    id="create-message"
                    variant="contained"
                    onClick={this.handleOpen} >
                    Make a Wispr
                </Button>
                  :
                  <div id="create-messageN">
                    Wispr Life
                </div>
                }
              </Card>


              {this.state.open &&
                <div id="comment">
                  <Container component="main" maxWidth="xs">
                    <Paper elevation={0} style={{ marginTop: "20px", marginBottom: "45px", width: "700px" }} >
                      <form id="p-comment-box" >
                        <TextField
                          id="outlined-textarea"
                          maxLength="140"
                          label="Whats your wisper?"
                          placeholder="Wisper"
                          multiline
                          fullWidth
                          rows="13"
                          name="text"
                          onKeyUp={this.characterCounter}
                          onChange={this.handleChange}
                        />
                        <Button elevation={0} variant="contained"
                          style={{ float: 'right', background: "#74d14c", }}
                          onClick={(e) => {
                            this.handleCreateComment(e);
                          }} >
                          Post
                      </Button>
                      </form>
                      <div className="characterCount">
                        <div id="character-count">140 / 140</div>
                      </div>
                    </Paper>
                  </Container>
                </div>
              }
            </Container>
          </div>
          <div id="user-messages">
            <UserMessages user={this.props.user} />
          </div>
        </div>


      </>
    );
  }
}

// export default UserProfile;

export default connect(
  state => ({
    result: state.users.getuser.result,
    loading: state.users.getuser.loading,
    error: state.users.getuser.error,
    loggedIn: state.auth.login.result.username
  }),
  { getuser, createMessage, updateavi } //dispatchable things to add
)(UserProfile);