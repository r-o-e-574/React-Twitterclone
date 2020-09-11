import React from "react";
import { connect } from "react-redux";
import { deleteuser } from "../../redux/users";
import Button from "@material-ui/core/Button"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Container, CssBaseline} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import "../Pages/Settings.css";


class DeleteUser extends React.Component {
    state = {
        deleted: false,
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDeleteUser = event => {
        event.preventDefault();
        this.props.deleteuser();
        this.setState({ deleted: !this.state.deleted });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                onClick={this.handleDeleteUser}
            />,
        ];
        return (
            <>
                <Container>
                    <CssBaseline/>
                    <MuiThemeProvider>
                        <div>
                            <Button 
                                label="Alert" 
                                variant="contained" 
                                style={{backgroundColor: "rgb(126, 2, 2)", color: "#ffff", width: "255px", marginTop: "20px"}}
                                onClick={this.handleOpen}
                            > 
                                <DeleteForeverOutlinedIcon 
                                    fontSize="small" 
                                />
                                    Delete Your Profile
                            </Button>
                            <Dialog
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                            >
                                Are You Sure?
                       </Dialog>
                        </div>
                    </MuiThemeProvider>
                </Container>
            </>
        );
    }
}

export default connect(
    state => ({
        result: state.users.deleteuser.result,
        loading: state.users.deleteuser.loading,
        error: state.users.deleteuser.error
    }),
    { deleteuser } //dispatchable things to add
)(DeleteUser);
