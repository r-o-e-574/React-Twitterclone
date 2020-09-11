import React from "react";
import { connect } from "react-redux";
//import "./MessageFeed.css";
//import "./UserMessages.css";
import { deleteMessage } from "../../redux/messages";
import IconButton from "@material-ui/core/IconButton"
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from '@material-ui/core/Container';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';


class DeleteMessage extends React.Component {
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

    handleDeleteMessage = event => {
        event.preventDefault();
        this.props.deleteMessage(this.props.messageId, this.props.user);
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
                label="Delete"
                primary={true}
                onClick={this.handleDeleteMessage}
            />,
        ];
    //console.log(this.props.messageId)
        return (
            <>
                <Container>
                    <MuiThemeProvider >
                        <div>
                            <IconButton label="Alert"  variant="contained" color="secondary" id={this.props.id} onClick={this.handleOpen}> <DeleteForeverOutlinedIcon fontSize="small" /></IconButton>
                            <Dialog
                                actions={actions}
                                modal={false}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                            >
                                Delete Wisper? This can't be undone and it will be removed from your profile and message feed.
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
        result: state.messages.deleteMessage.result,
        loading: state.messages.deleteMessage.loading,
        error: state.messages.deleteMessage.error
    }),
    { deleteMessage } //dispatchable things to add
)(DeleteMessage);