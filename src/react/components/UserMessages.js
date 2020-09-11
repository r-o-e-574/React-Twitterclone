import React from "react";
import "./UserMessages.css";
import { connect } from "react-redux";
import { getMessages, userMessages, createMessage, deleteMessage } from "../../redux/messages";
import FavoriteIcon from "@material-ui/icons/Favorite"
import { toggleLike } from "../../redux/likes";
import DeleteMessage from "./DeleteMessage";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  IconButton,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core"


const theme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: "rgba(255,0,0,0.8)",
        },
      }
    }
  },
  palette: {
    primary: {
      main: '#74d14c' //your color
    }
  },
  props: {
    // Name of the component
    MuiButtonBase: {
      disableRipple: true // No more ripple, on the whole application!
    }
  },

});

class UserMessages extends React.Component {

  componentDidMount() {
    if(this.props.user === null || this.props.user === undefined ){
      this.props.getMessages().then(() =>
      this.props.userMessages("")
    );
    }else{
      this.props.getMessages().then(() =>
      this.props.userMessages(this.props.user)
    );
    }
  };

  handleToggleLike = (e, messageId) => {
    this.props.toggleLike(messageId, "usermessages", this.props.user.username.slice(1));
  };

  render() {
    const { result } = this.props;
    const { loggedIn } = this.props;
    // console.log(loggedIn);
    const otherUser = this.props.user.username.slice(1);
    // console.log(otherUser);
    // console.log(otherUser === loggedIn);
    return (
      <>
        <div>
          {result && result.messages.map((message) => (
            <Container component="main" maxWidth="xs" key={message.id} id="messagesU">
              <Card elevation={4} id="messageU" >
                <CssBaseline />
                {otherUser === loggedIn || otherUser === 'username' ?
                  <div id="deleteU">
                    <DeleteMessage messageId={message.id} user={loggedIn}/>
                  </div>
                :
                  <div id="NdeleteU"> 
                    <p>User</p>
                  </div>
                }
                <CardContent>
                  <div id="message-UsernameP">
                    <h3 style = {{ color: "#74d14c" }}>@{message.username}</h3>
                  </div>
                  <div id="message-Text">
                    <p> {message.text}</p>
                  </div>
                </CardContent>
                <CardActions>
                  <MuiThemeProvider theme={theme}>
                    <IconButton
                      id="Like"
                      style={{ backgroundColor: 'transparent' }}
                      onClick={(e) => this.handleToggleLike(e, message.id)}>
                      {message.likes.length > 0 ?
                        <div>
                          <FavoriteIcon color="primary" />
                          <div id="Likes">
                            {message.likes.length}
                          </div>
                        </div>
                        : <FavoriteIcon />
                      }
                    </IconButton>
                  </MuiThemeProvider>
                </CardActions>
              </Card>
            </Container>
          ))}
        </div>
      </>
    );
  }
}

// export default UserMessages;

export default connect(
  state => ({
    result: state.messages.userMessages.result,
    loading: state.messages.userMessages.loading,
    error: state.messages.userMessages.error,
    loggedIn: state.auth.login.result.username
  }),
  { getMessages, userMessages, toggleLike, createMessage, deleteMessage } //dispatchable things to add
)(UserMessages);