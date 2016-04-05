import alt from '../alt';
import MainSource from '../sources/MainSource'

class MainActions {
  
  fetchLocations() {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch();
      MainSource.fetch()
        .then((locations) => {
          // we can access other actions within our action through `this.actions`
          this.updateLocations(locations);
        })
        .catch((errorMessage) => {
          this.locationsFailed(errorMessage);
        });
      }
  }
  
  updateLocations(locations) {
    return locations;
  }
  
  locationsFailed(errorMessage) {
    return errorMessage;
  }
}

module.exports = alt.createActions(MainActions);