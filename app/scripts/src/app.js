/* jshint esversion: 6 */
import socket from './ws-client';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let username = '';
username = promptForUsername();

class ChatMessage {
  constructor({
    message:m,
    user: u=username,
    timestamp: t=(new Date()).getTime()
  }) {
    this.user = user;
    this.message = message;
    this.timestamp = timestamp;
  }

  serialize() {
    return {
      user: this.user,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}


class ChatApp {
  constructor() {
    // console.log('Hello ES6!');
    this.chatForm = new ChatForm(FORM_SELECTOR,INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, username);
    socket.init('ws://localhost:3001');


    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let message = new ChatMessage({message:data});
        socket.sendMessage(message.serialize());
      });
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage({message:data});
      this.chatList.drawMessage(message.serialize());
    });
  }
}
export default ChatApp;
