import React from "react";
import { connect } from "react-redux"
import "./KwitterMenu.css";
import { Typography, AppBar, Tabs, Tab, Toolbar } from "@material-ui/core"
import { logout } from "../../redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PersonTwoToneIcon from '@material-ui/icons/PersonTwoTone';
import ExploreTwoToneIcon from '@material-ui/icons/ExploreTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import wispr from "../../images/Wispr.png";

class KwitterMenu extends React.Component {

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };


  render() {

    return (
      <div id="menu">

        <MuiThemeProvider>
          <div>
            <AppBar id="appBar" position="static" >
              {this.props.isAuthenticated && (
                <Tabs aria-label="simple tabs example" indicatorColor={"#4C74D1"} value={0}>
                  <Typography component="h1" variant="h3" style={{ fontFamily: "anton", flex: 1 }}><Toolbar><img id="menu-wispr" src={wispr} alt="wisper" /></Toolbar></Typography>
                  <Tab label="Home" linkButton={true} href="/messages" icon={<HomeTwoToneIcon style={{ color: "#74d14c" }} />} />
                  <Tab label="Explore" linkButton={true} href="/explore" icon={<ExploreTwoToneIcon style={{ color: "#74d14c" }} />} />
                  <Tab label="Profile" linkButton={true} href="/profiles/:username" icon={<PersonTwoToneIcon style={{ color: "#74d14c" }} />} />
                  <Tab label="Settings" linkButton={true} href="/settings" icon={<SettingsTwoToneIcon style={{ color: "#74d14c" }} />} />
                  <Tab label="Logout" linkButton={true} onClick={this.handleLogout} icon={<ExitToAppTwoToneIcon style={{ color: "#74d14c" }} />} />
                </Tabs>
              )}


            </AppBar>
          </div>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.logout.result,
    loading: state.auth.logout.loading,
    error: state.auth.logout.error
  }),
  { logout }
)(KwitterMenu);
