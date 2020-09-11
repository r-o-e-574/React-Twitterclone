import React from "react";
import { KwitterMenu, ExploreUsers } from "../components";
import { userIsAuthenticated } from "../HOCs";
import "./Explore.css";

class Explore extends React.Component {
  render() {
    return (
      <>
        <KwitterMenu isAuthenticated={this.props.isAuthenticated} />

        <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <ExploreUsers />
        </body>
      </>
    );
  }
}

export default userIsAuthenticated(Explore);