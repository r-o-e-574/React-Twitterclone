import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import errorImage from "../../images/404_image.png";

// import { CssBaseline } from "@material-ui/core";

class NotFound extends React.Component {
  render() {
    return (
      <>
        <div>
          <body style={{ backgroundColor: '#37474f' }} id="bubbles" alt="colorful bubbles">
            {/* <CssBaseline /> */}
            <p id="notfound">Page not Found </p>
            <img src={errorImage} id="error-image" alt="bunny peeking over computer" />
            <Link id="text-link" style={{ textDecoration: 'inherit' }} to="/">Hop Back Home</Link>

          </body>
        </div>
      </>
    );
  }
}
// {this.props.location.pathname}

export default NotFound;
