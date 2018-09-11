export default class PubSub {

  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) this.topics[topic] = [];

    var token = (++this.subUid).toString();

    this.topics[topic].push({
      token: token,
      func: func
    });

    return token;
  };

  publish(topic, args) {
    if (!this.topics[topic]) return false;

    var subscribers = this.topics[topic];
    var len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return true;
  };

  unsubscribe(token) {
    for (var m in this.topics) {
      if (this.topics[m]) {
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
          if (this.topics[m][i].token === token) {
            this.topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }

    return false;
  };

}