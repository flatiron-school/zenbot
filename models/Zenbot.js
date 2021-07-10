
class Zenbot {
  constructor(string, user, client, token, channel) {
    // String will be a sentence containing a zenbot command. For example,
    // "zenbot who is on?"
    this.string = this.removeZenbotWord(string);
    this.user = user;
    this.client = client;
    this.token = token;
    this.channel = channel
  }

  isValid(string) {
    // Returns a bool value if the string fits the format for a zenbot command.
    // The only check at the moment is if the first word in the command is 'zenbot'
    // or 'Zenbot'.
    const splitString = string.split(' ');
    if (splitString[0].toLowerCase() === 'zenbot') {
      return true;
    }
    return false;
  }

  removeZenbotWord(string) {
    // Returns a sting of the command, of a valid zenbot command. For example,
    // 'zenbot who is on?' will return 'who is on?'.
    if (this.isValid(string)) {
      const splitString = string.split(' ');
      splitString.shift(); // drops the first element in the array
      return splitString.join(' ');
    }
    return null;
  }

  response() {
    if (this.string){
      switch (this.string) {
        case 'who is on?':
          console.log("who is on")
          return;
        case 'kick':
          console.log("kick")
          return;
        case 'in':
          this.user.login()
          this.client.chat.postMessage({
            token: this.token,
            channel: this.channel,
            text: `You are now logged in, ${this.user.name}`
          })
          return;
        case 'out':
          this.user.logout()
          return;
        default:
          console.log("bad boi")
          return 'Sorry, Zenbot does not know this command.';
      }
    }
  }
}

module.exports = Zenbot;

// How to use:

// const Zenbot = require('./models/Zenbot');

// const message = 'Zenbot this is a sandbox test';
// const newZenbot = new Zenbot(message);

// if (newZenbot.isValid()) {
//  console.log(newZenbot.response(newZenbot.removeZenbotWord()));
// }
