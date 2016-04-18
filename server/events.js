import WebSocket from 'ws';
import Measured from 'measured';

export default class EventBus {

  constructor(config) {
    this.config = config;
    this.socket = new WebSocket(`${config.dependencies.chatalyticsEventUrl}/api/v0/events`)
    this.socket.onmessage = (event) => {
      this.onEventReceived(event);
    };
    this.subscribers = [];
    this.state = { 
      message_summary: new Measured.Meter()
    }
  }
  
  onEventReceived(event) {
    this.subscribers.forEach((subscriber) => {
      subscriber({ message_summary: this.state.message_summary.toJSON() });
    });
    this.updateMetrics(event);
  }
  
  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
  
  updateMetrics(event) {
    let message = JSON.parse(event.data);
    if (message.type === "message_summary") {
      let occurrences = message.event.occurrences || 1;
      this.state.message_summary.mark(occurrences);
    }
  }
}