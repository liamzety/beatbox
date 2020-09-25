import React from "react";
import { Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Emoji } from './Emoji'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { socketService } from '../../services/socketService'

export class Chat extends React.Component {
  state = {
    msg: '',
    isTyping: false,
    isOpenEmojis: false
  }

  componentDidMount() {
    socketService.on('chat showTyping', this.onTyping);
  }

  onTyping = typingStr => {
    this.props.setTyping(typingStr);
  }

  sendMsg = (ev) => {
    ev.preventDefault();
    const { msg } = this.state;
    if (msg) {
      const msgObj = {
        text: msg,
        submitAt: new Date(),
        id: this.props.user._id,
        submitBy: this.props.user.username,
        avatar: this.props.user.imgUrl,
        type: 'chat'
      }
      socketService.emit('chat newMsg', msgObj);
      this.setState({ msg: '' })
    }
  };

  onEmojiChoose = (emoji) => {
    this.setState({ msg: this.state.msg + emoji, isOpenEmojis: false });
    // this.props.setEmoji(emoji);
  }

  timeoutFunction = () => {
    this.setState({ isTyping: false });
    socketService.emit('chat typing', '');
  }

  onHandleChange = async (ev) => {
    var timeout;
    if (!this.state.isTyping) {
      clearTimeout(timeout);
      this.setState({ isTyping: true });
      const userName = this.props.user.username;
      const typingStr = userName + ' is typing...';
      socketService.emit('chat typing', typingStr);
      timeout = setTimeout(this.timeoutFunction, 1500);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(this.timeoutFunction, 1500);
    }
    const { name, value } = ev.target;
    await this.setState(prevState => {
      return {
        [name]: value
      }
    });
  }

  toggleEmogis = () => {
    this.setState({ isOpenEmojis: !this.state.isOpenEmojis })
  }

  render() {
    return (
      <div className="chat">
        <form className="form-msg flex space-between align-center" onSubmit={this.sendMsg}>
            <input className="input-chat" value={this.state.msg}
              name="msg" onChange={this.onHandleChange} autoComplete="off" />
            <InsertEmoticonIcon onClick={this.toggleEmogis} />
            {/* <Button type="primary" style={{ color: "white" }}>
              <SendIcon />
            </Button> */}
            <button className="send-btn">Send</button>
        </form>
        {this.state.isOpenEmojis && <div className="reactions flex">
          <Emoji onEmojiChoose={this.onEmojiChoose} />
        </div>}
      </div>
    )
  }
}