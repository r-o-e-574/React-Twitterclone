import React from "react";
import { KwitterMenu, UserProfile } from "../components";
import { userIsAuthenticated } from "../HOCs";
import "./Profile.css";

class Profile extends React.Component {
  render() {
    console.log(this.props.match.params);
    const user = this.props.match.params;
    return (
      <>
        <KwitterMenu isAuthenticated={this.props.isAuthenticated} color1={"#e1e51a"} color2={"#06d8ef"} />

        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <UserProfile user={user} />
        </body>
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
