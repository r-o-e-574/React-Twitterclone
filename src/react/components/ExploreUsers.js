import React from "react";
import Spinner from "react-spinkit";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { exploreusers, getuser } from "../../redux/users";
import {
  Container,
  Card,
  Paper,
  TextField,
  CssBaseline,
  Button,
  ThemeProvider,
} from "@material-ui/core"
import {theme} from "./OverrideMUI";
import bunnyeyesmessagefeed from "../../images/bunnyeyesmessagefeed.png";
import "./ExploreUsers.css";


class ExploreUsers extends React.Component {
  state = { 
    user: "",
    searched: false
  }
  componentDidMount() {
    this.props.exploreusers()
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.getuser(this.state.user);
    this.setState({ searched: !this.state.searched});
    document.getElementById("user-search").reset();
  }

  render() {
    const { result } = this.props;
    const { search } = this.props;
    const { search_loading, search_error } = this.props;
    if(search !== null){
    console.log(search.user.username)
    }
    return (
      <>

        <div id="exploreWrapper">
          <Container component="main" maxWidth="xs" >
          <h1 id="explore-new-users">Explore New <img src={bunnyeyesmessagefeed} alt="bunny peeking over subtitle" /> Users </h1>
                <Paper elevation={0} id="wisper-box" >
                  <form id="user-search" >
                      <ThemeProvider theme={theme}>
                        <TextField
                          id="outlined-textarea"
                          maxLength="140"
                          label="Search for a Wispr User"
                          placeholder="Wispr Username Search"
                          multiline
                          fullWidth
                          rows="1"
                          name="user"
                          onChange={this.handleChange}
                        />
                      </ThemeProvider>
                      <Button 
                        elevation={0} 
                        variant="contained" 
                        id ="post-button"
                        onClick={(e) => {
                          this.handleSearch(e);
                        }}>
                        Search Wispr
                        </Button>
                  </form>
                </Paper>
            <div id="searched">
              {search &&
                <Container component="main" maxWidth="xs">
                  <h1 id="explore-title"> Wispr Search Results </h1>
                <CssBaseline />
                <Card elevation={8} id="explore-paper">
                  <h4 id="display-nameE">{search.user.displayName} </h4>
                  {search.user.about === "" ?
                    <p id="aboutE">Bio: Wispr user since {search.user.createdAt.slice(0,10)}</p>
                    :
                    <p id="aboutE">Bio: {search.user.about}</p>
                    }
                  <Link to={{
                    pathname:`/profiles/${search.user.username}`, 
                    aboutProps:{
                      username: search.user.username
                    }
                  }} id="usernameE" > @{search.user.username}</Link>
                </Card>
              </Container>
              }
              {search_loading && <Spinner name="circle" color="blue" />}
              {search_error && 
              <div>
                <h1> Wispr Search Results </h1>
                <Card elevation={8} id="explore-paper">
                  <p style={{ color: "red" }}>{search_error.message}</p>
                </Card>
              </div>
              }
            </div>
            </Container>
          {result &&

            <div>
              {result.users.map((user, index) => (
                <Container component="main" maxWidth="xs" key={index}>
                  <CssBaseline />
                  <Card elevation={8} id="explore-paper">
                    <h4 id="display-nameE">{user.displayName} </h4>
                    {user.about === "" ?
                    <p id="aboutE">About: Wispr user since {user.createdAt.slice(0,10)}</p>
                    :
                    <p id="aboutE">About: {user.about}</p>
                    }
                    <Link to={{
                      pathname:`/profiles/${user.username}`, 
                      aboutProps:{
                        username: user.username
                      }
                    }} id="usernameE" > @{user.username}</Link>
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
    result: state.users.exploreusers.result,
    loading: state.users.exploreusers.loading,
    error: state.users.exploreusers.error,
    search: state.users.getuser.result,
    search_loading: state.users.getuser.loading,
    search_error: state.users.getuser.error
  }),
  { exploreusers, getuser } //dispatchable things to add
)(ExploreUsers);