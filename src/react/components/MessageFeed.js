import React from "react";
import "./MessageFeed.css";
import { connect } from "react-redux";
import { getMessages, createMessage } from "../../redux/messages";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { toggleLike } from "../../redux/likes";
import { Link } from "react-router-dom";
import DeleteMessage from "./DeleteMessage"
import {
  Container,
  Card,
  Paper,
  IconButton,
  TextField,
  CssBaseline,
  Button,
  MuiThemeProvider,
  ThemeProvider,
  CardActions,
  CardContent
} from "@material-ui/core"
import {theme} from "./OverrideMUI"
import bunnyeyesmessagefeed from "../../images/bunnyeyesmessagefeed.png";


class MessageFeed extends React.Component {

  state = { 
    liked: false,
    text: "",
    deleted: false,
    open: false,
    setOpen: false
  }



  componentDidMount() {
    this.props.getMessages();
  }

  handleCreateComment = e => {
    e.preventDefault();
    this.props.createMessage(this.state.text);
    document.getElementById("comment-box").reset();
    this.resetCharacterCounter();
  }

  handleToggleLike = (e, messageId) => {
    e.preventDefault();
    this.props.toggleLike(messageId, "messagefeed",this.props.loggedInUsername );
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
  };



  render() {
    const { result } = this.props;
    const username = this.props.loggedInUsername; //copy of store state from below

    return (
      <>
        <div>
          {result &&
          
            <div id="messages">
              
              <Container component="main" maxWidth="xs" >
              <img src={bunnyeyesmessagefeed} id="bunnyeyes-messagefeed"alt="bunny peeking over subtitle" />
                <Paper elevation={0} id="wisper-box" >
                  
                  <form id="comment-box" >
                    
                    <ThemeProvider theme={theme}>
                      <TextField
                        id="outlined-textarea"
                        maxLength="140"
                        label="Whats your wispr?"
                        placeholder="Wispr"
                        multiline
                        fullWidth
                        rows="5"
                        name="text"
                        onKeyUp={this.characterCounter}
                        onChange={this.handleChange}
                      />
                    </ThemeProvider>
                    <Button elevation={0} variant="contained" id ="post-button"
                      onClick={(e) => {
                        this.handleCreateComment(e);
                      }} >
                      Post Wispr
                     </Button>
                  </form>
                  <div className="characterCount">
                    <div id="character-count">140 / 140</div>
                  </div>
                </Paper>
              </Container>
              {result.messages.map((message) => (
                <Container component="main" maxWidth="xs" key={message.id}>
                  <Card elevation={4} id="message" >
                    <CssBaseline />
                    <CardContent>
                    <div id="message-username">
                    <Link to={{
                      pathname:`/profiles/${message.username}`, 
                      aboutProps:{
                        username: message.username
                      }
                    }} id="usernameM"> @{message.username}</Link>
                      </div>
                      <div id="message-text">
                        <p> {message.text}</p>
                      </div>
                      </CardContent>
                    <CardActions>
                    <MuiThemeProvider theme={theme}>
                      <IconButton 
                        id="like" 
                        style={{ backgroundColor: 'transparent' }} 
                        onClick={(e) => this.handleToggleLike(e, message.id)}>
                        {/* line below is an attempt to get only messages likes by user to be colored it does work */}
                        {/* {message.likes.map((like) => ( (like.username === username ) ? <FavoriteIcon color="primary" /> : <FavoriteIcon /> ))}{message.likes.length} */}
                        {/* the line below works but only colors liked post and only puts a number if its greater than 0 */}
                        {message.likes.length > 0 ? 
                          <div>
                            <FavoriteIcon color="primary" /> 
                            <div id="likes">
                              {message.likes.length}
                            </div>
                          </div> 
                          : <FavoriteIcon />
                        }
                      </IconButton>
                    </MuiThemeProvider>
                          {message.username === username ? 
                            <div id="deleteWrapper">
                              <DeleteMessage messageId={message.id} id="delete" user={username}/> 
                            </div>
                            :
                            <div id="delete"></div>
                            }
                      </CardActions>
                  </Card>
                </Container>
              ))}
            </div>
          }
        </div>
      </>
    );
  }
}

export default connect(
  state => ({
    result: state.messages.getMessages.result,
    loading: state.messages.getMessages.loading,
    error: state.messages.getMessages.error,
    loggedInUsername: state.auth.login.result.username
  }),
  { getMessages, toggleLike, createMessage } //dispatchable things to add
)(MessageFeed);