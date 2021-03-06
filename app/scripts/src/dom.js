/* jshint esversion: 6 */
import $ from 'jquery';
import md5 from 'crypto-js/md5';

function createGravitarUrl (username) {
  let userhash = md5(username);
  return `http://www.gravatar.com/avatar/${userhash.toString()}`;
}

export function promptForUsername() {
  let username = prompt ('Enter a username');
  return username.toLowerCase();
}

export class ChatForm {
  constructor(formSel, inputSel) {
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }
  init (submitCallback) {
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallback(val);
      this.$input.val('');
    });

    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor(listSel, username) {
    this.$list= $(listSel);
    this.username = username;
  }
  drawMessage ({user:u, timestamp:t, message:m}) {
    let $messageRow = $('<li>', {
      'class':'message-row'
    });
    if (this.username === u) {
      $messageRow.addClass('me');
    }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text : u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'date-time' : t,
      text: (new Date(t)).getTime()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text : m
    }));

    let $img = $('<img>', {
      src: createGravitarUrl(u),
      title: u
    });

    $messageRow.append($img);
    $messageRow.append($message);

    this.$list.append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
