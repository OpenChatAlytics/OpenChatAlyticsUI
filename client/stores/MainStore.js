import alt from '../alt';
import MainActions from '../actions/MainActions';

class MainStore {
  constructor() {
    this.locations = [];
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateLocations: MainActions.UPDATE_LOCATIONS,
      handleFetchLocations: MainActions.FETCH_LOCATIONS,
      handleLocationsFailed: MainActions.LOCATIONS_FAILED
    });
  }
  
  handleUpdateLocations(locations) {
    this.locations = locations;
    this.errorMessage = null;
  }
  
  handleFetchLocations() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.locations = [];
  }

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

module.exports = alt.createStore(MainStore, 'MainStore');