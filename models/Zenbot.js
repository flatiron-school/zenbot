class Zenbot {
  constructor(string) {
    // String will be a sentence containing a zenbot command. For example,
    // "zenbot who is on?"
    this.string = string;
  }

  isValid() {
    // Returns a bool value if the string fits the format for a zenbot command.
    // The only check at the moment is if the first word in the command is 'zenbot'
    // or 'Zenbot'.
    const splitString = this.string.split(' ');
    if (splitString[0].toLowerCase() === 'zenbot') {
      return true;
    }
    return false;
  }

  removeZenbotWord() {
    // Returns a sting of the command, of a valid zenbot command. For example,
    // 'zenbot who is on?' will return 'who is on?'.
    if (this.isValid(this.string)) {
      const splitString = this.string.split(' ');
      splitString.shift(); // drops the first element in the array
      return splitString.join(' ');
    }
    return null;
  }

  response(str) {
    switch (str) {
      case 'who is on?':
        return 'Displays who is currently online.';
      case 'kick':
        return 'Get them out of here!';
      case 'in':
        return 'You are now online!';
      case 'out':
        return 'You are now offline!';
      default:
        return 'Sorry, Zenbot does not know this command.';
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
