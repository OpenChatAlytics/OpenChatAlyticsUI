import WebSocket from 'ws';
import Measured from 'measured';

export default class EventBus {

  constructor(config) {
    this.config = config;
    this.subscribers = [];
    this.state = {
      message_meter: new Measured.Meter(),
      message_count: new Measured.Counter(),
      start_time: (new Date()).getTime()
    }
    
    setInterval(() => {
      if (!this.socket || this.socket.readyState !== 1) {
        console.info("Connecting to ChatAlytics Web event stream");
        this.socket = new WebSocket(`${config.dependencies.chatalyticsEventUrl}/api/v0/events`);
        this.socket.onmessage = (event) => {
          this.onEventReceived(event);
        };
      }
    }, 1000);
  }

  onEventReceived(event) {
    this.updateMetrics(event);
    
    this.subscribers.forEach((subscriber) => {
        subscriber({ message_meter: this.state.message_meter.toJSON(),
                     message_count: this.state.message_count.toJSON(),
                     start_time: this.state.start_time });
      });
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  updateMetrics(event) {
    let message = JSON.parse(event.data);
    if (message.type === "message_summary") {
      let occurrences = message.event.occurrences || 1;
      this.state.message_meter.mark(occurrences);
      this.state.message_count.inc(occurrences);
    }
  }
}