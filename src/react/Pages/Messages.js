import React from "react";
import { userIsAuthenticated } from "../HOCs";
import { KwitterMenu, MessageFeed } from "../components";
import {
    CssBaseline,
  } from "@material-ui/core";


class Messages extends React.Component {
    render() {
        return (
            <>
<CssBaseline/>
                <KwitterMenu  isAuthenticated={this.props.isAuthenticated} />
                <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
          <MessageFeed />
        </body>
                
            </>
        );
    }
}

export default userIsAuthenticated(Messages);
