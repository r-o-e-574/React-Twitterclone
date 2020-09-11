import React from "react";
import { KwitterMenu, UpdateUser } from "../components";
import { userIsAuthenticated } from "../HOCs";
import Typography from "@material-ui/core/Typography"
import "./Settings.css";
import { CssBaseline } from "@material-ui/core";


class Settings extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <KwitterMenu isAuthenticated={this.props.isAuthenticated} color1={"#e1e51a"} color2={"#06d8ef"} />
        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <Typography id="someid" component="h1" variant="h4">Profile Settings</Typography>
          <p id="someid" >What would you like to do today?</p>
          <UpdateUser />

        </body>
      </>
    );
  }
}

export default userIsAuthenticated(Settings);
