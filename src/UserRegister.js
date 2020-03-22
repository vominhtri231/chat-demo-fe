import React from 'react';
import { withRouter } from "react-router-dom"

import TextField from "@material-ui/core/TextField"

import "./UserRegister.css";


class UserRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    registerUser = (event) => {
        if (event.keyCode === 13) {
            localStorage.setItem("username", this.state.username);
            this.props.history.push("/chat");
        }
    }

    changeHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    render() {
        const { username } = this.state;
        return (
            <div class="userRegister">
                <TextField class="userRegister-inputUsername" label="Username"
                    value={username} onChange={this.changeHandler} onKeyDown={this.registerUser} />
            </div>
        )
    }
}

export default withRouter(UserRegister);