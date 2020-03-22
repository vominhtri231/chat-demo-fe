import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField"

import './ChatBox.css'

const beUrl = "ws://localhost:8080/chat-be/chat/";

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentMessage: "",
            messages: [],
            socket: null
        };
    }

    componentDidMount() {
        const socket = new WebSocket(beUrl + this.props.username);
        socket.onmessage = this.receiveMessage;
        this.setState({ socket })
    }

    receiveMessage = (event) => {
        const addedMessage = JSON.parse(event.data);
        const currentMessages = this.state.messages;
        this.setState({ messages: [...currentMessages, addedMessage] });
    }

    sendMessage = (event) => {
        if (event.keyCode === 13) {
            const { socket, currentMessage } = this.state;
            socket.send(JSON.stringify({
                content: currentMessage,
                from: this.props.username
            }));
            this.setState({ currentMessage: "" });
        }
    }

    currentMessageChangeHandler = (event) => {
        this.setState({ currentMessage: event.target.value });
    }

    render() {
        const { currentMessage, messages } = this.state;
        return (
            <div class="chat">
                <List class="chat-messages"> {messages.map((message, index) => {
                    return <ListItem key={index}>
                        <ListItemText
                            primary={message.from}
                            secondary={
                                <div component="span" variant="body2" class="inline">
                                    {message.content}
                                </div>}
                        />
                    </ListItem>
                })}
                </List>

                <TextField value={currentMessage} onChange={this.currentMessageChangeHandler} onKeyDown={this.sendMessage}
                    class="chat-input" variant="outlined" fullWidth />
            </div>
        )
    }
}

export default ChatBox;