import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send'
import FormControl from '@material-ui/core/FormControl';

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

    handleKeyChange = (event) => {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    currentMessageChangeHandler = (event) => {
        this.setState({ currentMessage: event.target.value });
    }

    receiveMessage = (event) => {
        const addedMessage = JSON.parse(event.data);
        const currentMessages = this.state.messages;
        this.setState({ messages: [...currentMessages, addedMessage] });
        if (!!this.messagesEnd) {
            this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
        }
    }

    sendMessage = () => {
        const { socket, currentMessage } = this.state;
        if (!currentMessage || currentMessage.length === 0) {
            return;
        }
        socket.send(JSON.stringify({
            content: currentMessage,
            from: this.props.username
        }));
        this.setState({ currentMessage: "" });
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
                    <div ref={(e) => { this.messagesEnd = e; }} />
                </List>
                <FormControl variant="outlined" class="chat-input" fullWidth>
                    <Input
                        value={currentMessage}
                        onChange={this.currentMessageChangeHandler}
                        onKeyDown={this.handleKeyChange}

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton color="primary" onClick={this.sendMessage}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>}
                    />
                </FormControl>
            </div>
        )
    }
}

export default ChatBox;