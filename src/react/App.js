import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";
import Settings from "./Pages/Settings";
import Explore from "./Pages/Explore"
import DeleteUser from "./components/DeleteUser";
import LoginPage from "./Pages/LoginPage";
import Messages from "./Pages/Messages";
import SignUpPage from "./Pages/SignUpPage"

class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/deleteuser" component={DeleteUser} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/messages" component={Messages} />
        <Route path="*" component={NotFound} />
      </Switch>

    );
  }
}

export default App;
