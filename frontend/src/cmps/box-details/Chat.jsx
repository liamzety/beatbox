import React from "react";

import { Input, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Emoji } from './Emoji'

export class Chat extends React.Component {
  state = {
    message: '',
  }

  sendMessage = (ev) => {
    ev.preventDefault();
    const { message } = this.state;
    if (message) {
      const messageObj = {
        text: message,
        submitAt: new Date(),
        id: this.props.user._id,
        submitBy: this.props.user.username,
        avatar: this.props.user.imgUrl,
        type: 'chat'
      }
      this.props.addMessage(messageObj);
      this.setState({ message: '' })
    }
  };

  onEmojiChoose = (emoji) => {
    // this.setState({
    //   message: this.state.message + emoji
    // })
    this.props.setEmoji(emoji);
  }

  render() {
    return (
      <div className="chat">
        <form className="form-message" onSubmit={this.sendMessage}>
          <Input placeholder="Write Messge" value={this.state.message} name="messageInput" onChange={e => this.setState({ message: e.target.value })} autoComplete="off" style={{ background: "white" }} />
          <Button type="primary" onClick={this.sendMessage} style={{ color: "white" }}>
            <SendIcon />
          </Button>
        </form>
        <div className="reactions flex">
          <h3>Reaction:</h3>
          <Emoji onEmojiChoose={this.onEmojiChoose} />
        </div>
      </div>
    )
  }
}
