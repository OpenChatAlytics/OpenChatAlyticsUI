import alt from '../alt';
import MainActions from '../actions/MainActions';
import Colors from './Colors'
import Color from 'color';
import Transforms from './ApiTransformers.js'
import _ from 'lodash';

class MainStore {
  constructor() {
    this.trendingTopics = null;
    this.errorMessage = null;
    this.bindListeners({
      handleUpdateSimilarities: MainActions.UPDATE_SIMILARITIES,
      handleFetchSimilarities: MainActions.FETCH_SIMILARITIES,
      handleFetchSimilaritiesFailed: MainActions.FETCH_SIMILARITIES_FAILED,

      handleUpdateUserSimilarityByEntity: MainActions.UPDATE_USER_SIMILARITY_BY_ENTITY,
      handleUpdateRoomSimilarityByEntity: MainActions.UPDATE_ROOM_SIMILARITY_BY_ENTITY,

      handleUpdateUserSimilarityByEmoji: MainActions.UPDATE_USER_SIMILARITY_BY_EMOJI,
      handleUpdateRoomSimilarityByEmoji: MainActions.UPDATE_ROOM_SIMILARITY_BY_EMOJI,

      handleUpdateTrendingTopics: MainActions.UPDATE_TRENDING_TOPICS,
      handleFetchTrendingTopics: MainActions.FETCH_TRENDING_TOPICS,
      handleTrendingTopicsFailed: MainActions.TRENDING_TOPICS_FAILED,

      handleUpdateTrendingEmojis: MainActions.UPDATE_TRENDING_EMOJIS,
      handleFetchTrendingEmojis: MainActions.FETCH_TRENDING_EMOJIS,
      handleTrendingEmojisFailed: MainActions.TRENDING_EMOJIS_FAILED,

      handleUpdateTrendingTopicsOverTime: MainActions.UPDATE_TRENDING_TOPICS_OVER_TIME,
      handleFetchTrendingTopicsOverTime: MainActions.FETCH_TRENDING_TOPICS_OVER_TIME,
      handleTrendingTopicsOverTimeFailed: MainActions.TRENDING_TOPICS_OVER_TIME_FAILED,

      handleUpdateTrendingEmojisOverTime: MainActions.UPDATE_TRENDING_EMOJIS_OVER_TIME,
      handleFetchTrendingEmojisOverTime: MainActions.FETCH_TRENDING_EMOJIS_OVER_TIME,
      handleTrendingEmojisOverTimeFailed: MainActions.TRENDING_EMOJIS_OVER_TIME_FAILED,

      handleUpdateEvents: MainActions.UPDATE_EVENTS,
      handleSubscribeEvents: MainActions.SUBSCRIBE_EVENTS,

      handleUpdateActiveEmojisByUser: MainActions.UPDATE_ACTIVE_EMOJIS_BY_USER,
      handleFetchActiveEmojisByUser: MainActions.FETCH_ACTIVE_EMOJIS_BY_USER,
      handleActiveEmojisByUserFailed: MainActions.ACTIVE_EMOJIS_BY_USER_FAILED,

      handleUpdateActiveMessagesByUser: MainActions.UPDATE_ACTIVE_MESSAGES_BY_USER,
      handleFetchActiveMessagesByUser: MainActions.FETCH_ACTIVE_MESSAGES_BY_USER,
      handleActiveMessagesByUserFailed: MainActions.ACTIVE_MESSAGES_BY_USER_FAILED,

      handleUpdateActiveEmojisByRoom: MainActions.UPDATE_ACTIVE_EMOJIS_BY_ROOM,
      handleFetchActiveEmojisByRoom: MainActions.FETCH_ACTIVE_EMOJIS_BY_ROOM,
      handleActiveEmojisByRoomFailed: MainActions.ACTIVE_EMOJIS_BY_ROOM_FAILED,

      handleUpdateActiveMessagesByRoom: MainActions.UPDATE_ACTIVE_MESSAGES_BY_ROOM,
      handleFetchActiveMessagesByRoom: MainActions.FETCH_ACTIVE_MESSAGES_BY_ROOM,
      handleActiveMessagesByRoomFailed: MainActions.ACTIVE_MESSAGES_BY_ROOM_FAILED,

      handleUpdateTotalMessages: MainActions.UPDATE_TOTAL_MESSAGES,
      handleFetchTotalMessages: MainActions.FETCH_TOTAL_MESSAGES,
      handleTotalMessagesFailed: MainActions.TOTAL_MESSAGES_FAILED,

      handleUpdateAllEmojis: MainActions.UPDATE_ALL_EMOJIS,
      handleFetchAllEmojis: MainActions.FETCH_ALL_EMOJIS,
      handleAllEmojisFailed: MainActions.ALL_EMOJIS_FAILED,

      handleUpdateEmojiIcons: MainActions.UPDATE_EMOJI_ICONS,
      handleFetchEmojiIcons: MainActions.FETCH_EMOJI_ICONS,
      handleEmojiIconsFailed: MainActions.EMOJI_ICONS_FAILED,

      handleUpdateUserIcons: MainActions.UPDATE_USER_ICONS,
      handleFetchUserIcons: MainActions.FETCH_USER_ICONS,
      handleUserIconsFailed: MainActions.USER_ICONS_FAILED,
    });
  }

  handleUpdateEvents(event) {
    this.event = event;
  }

  handleSubscribeEvents() {
    this.event = null;
  }

  handleUpdateTrendingEmojis(trendingEmojis) {
    this.trendingEmojis = Transforms.mapToArray(trendingEmojis);
    this.errorMessage = null;
  }

  handleFetchTrendingEmojis() {
    this.trendingEmojis = null;
  }

  handleTrendingEmojisFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateTrendingTopics(trendingTopics) {
    this.trendingTopics = Transforms.mapToArray(trendingTopics);
    this.errorMessage = null;
  }

  handleFetchTrendingTopics() {
    this.trendingTopics = null;
  }

  handleTrendingTopicsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateUserSimilarityByEntity(similarities) {
    this.userSimilarityByEntity = processSimilarity(similarities);
  }

  handleUpdateRoomSimilarityByEntity(similarities) {
    this.roomSimilarityByEntity = processSimilarity(similarities);
  }

  handleUpdateUserSimilarityByEmoji(similarities) {
    this.userSimilarityByEmoji = processSimilarity(similarities);
  }

  handleUpdateRoomSimilarityByEmoji(similarities) {
    this.roomSimilarityByEmoji = processSimilarity(similarities);
  }

  handleUpdateSimilarities(similarities) {
    this.similarities = processSimilarity(similarities);
    this.errorMessage = null;
  }

  handleUpdateUserSimilarityByEntity(similarities) {
    this.userSimilarityByEntity = processSimilarity(similarities);
    this.errorMessage = null;
  }

  handleFetchSimilarities() {
    this.similarities = null;
  }

  handleFetchSimilaritiesFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateTrendingTopicsOverTime(data) {
    // transform the data into one readable by charting libs
    const maxTopics = 20;
    let datasets = {};

    data.topics.forEach((timeSlice) => {
      Object.keys(timeSlice).forEach((dataset) => {
        if (!datasets[dataset]) {
          datasets[dataset] = {
            label: dataset,
            data: [],
            maxVal: timeSlice[dataset]
          }
        }
      });
    });

    datasets = Transforms.arrayToMap(
      _.sortBy(Transforms.mapToArray(datasets),
        e => -e.value.maxVal).slice(0, maxTopics)
    );

    data.topics.forEach((timeSlice) => {
      Object.keys(datasets).forEach((dataset) => {
        datasets[dataset].data.push(timeSlice[dataset] || 0);
      });
    });

    this.trendingTopicsOverTime = {
      clone: () => {
        return {
          labels: data.times,
          datasets: Array.sort(Object.keys(datasets)).map((key, i) => {
            let c = Colors.d3c20[i % Colors.d3c20.length];
            return {
              label: datasets[key].label,
              fill: false,
              tension: 0.1,
              borderWidth: 1,
              pointBackgroundColor: c,
              backgroundColor: c,
              borderColor: c,
              data: datasets[key].data,
            }
          })
        }
      }
    }
    this.errorMessage = null;
  }

  handleFetchTrendingTopicsOverTime() {
    this.trendingTopicsOverTime = null;
  }

  handleTrendingTopicsOverTimeFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateTrendingEmojisOverTime(data) {
    // transform the data into one readable by charting libs
    const maxEmojis = 20;

    let datasets = {};

    data.emojis.forEach((timeSlice) => {
      Object.keys(timeSlice).forEach((dataset) => {
        if (!datasets[dataset]) {
          datasets[dataset] = {
            label: dataset,
            data: [],
            maxVal: timeSlice[dataset]
          }
        }
      });
    });

    datasets = Transforms.arrayToMap(
      _.sortBy(Transforms.mapToArray(datasets),
        e => -e.value.maxVal).slice(0, maxEmojis)
    );

    data.emojis.forEach((timeSlice) => {
      Object.keys(datasets).forEach((dataset) => {
        datasets[dataset].data.push(timeSlice[dataset] || 0);
      });
    });

    this.trendingEmojisOverTime = {
      clone: () => {
        return {
          labels: data.times,
          datasets: Array.sort(Object.keys(datasets)).map((key, i) => {
            let c = Colors.d3c20[i % Colors.d3c20.length];
            return {
              label: datasets[key].label,
              fill: false,
              tension: 0.1,
              borderWidth: 1,
              pointBackgroundColor: c,
              backgroundColor: c,
              borderColor: c,
              data: datasets[key].data,
            }
          })
        }
      }
    }
    this.errorMessage = null;
  }

  handleFetchTrendingEmojisOverTime() {
    this.trendingEmojisOverTime = null;
  }

  handleTrendingEmojisOverTimeFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateActiveEmojisByUser(activeEmojisByUser) {
    let data = Transforms.mapToArray(activeEmojisByUser).map(e => {
      return {
        title: `@${e.key}`,
        subtitle: `${(e.value * 100).toFixed(3)}% of all emojis`,
        value: e.value,
        key: e.key
      }
    });
    this.activeEmojisByUser = data;
    this.errorMessage = null;
  }

  handleFetchActiveEmojisByUser() {
    this.activeEmojisByUser = null;
  }

  handleActiveEmojisByUserFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateActiveMessagesByUser(activeMessagesByUser) {
    let data = Transforms.mapToArray(activeMessagesByUser).map(e => {
      return {
        title: `@${e.key}`,
        subtitle: `${(e.value * 100).toFixed(3)}% of all messages`,
        value: e.value,
        key: e.key
      }
    });
    this.activeMessagesByUser = data;
    this.errorMessage = null;
  }

  handleFetchActiveMessagesByUser() {
    this.activeMessagesByUser = null;
  }

  handleActiveMessagesByUserFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateActiveMessagesByRoom(activeMessagesByRoom) {
    let data = Transforms.mapToArray(activeMessagesByRoom).map(e => {
      return {
        title: `#${e.key}`,
        subtitle: `${(e.value * 100).toFixed(3)}% of all messages`,
        value: e.value,
        key: e.key
      }
    });
    this.activeMessagesByRoom = data;
    this.errorMessage = null;
  }

  handleFetchActiveMessagesByRoom() {
    this.activeMessagesByRoom = null;
  }

  handleActiveMessagesByRoomFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateTotalMessages(total) {
    this.totalMessages = total;
  }

  handleFetchTotalMessages() {
    this.totalMessages = null;
  }

  handleTotalMessagesFailed() {
    this.errorMessage = errorMessage;
  }

  handleUpdateActiveEmojisByRoom(activeEmojisByRoom) {
    let data = Transforms.mapToArray(activeEmojisByRoom).map(e => {
      return {
        title: `#${e.key}`,
        subtitle: `${(e.value * 100).toFixed(3)}% of all emojis`,
        value: e.value
      }
    });
    this.activeEmojisByRoom = data;
    this.errorMessage = null;
  }

  handleFetchActiveEmojisByRoom() {
    this.activeEmojisByRoom = null;
  }

  handleActiveEmojisByRoomFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateAllEmojis(allEmojis) {
    this.allEmojis = allEmojis;
    this.errorMessage = null;
  }

  handleFetchAllEmojis() {
    this.allEmojis = null;
  }

  handleAllEmojisFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateEmojiIcons(emojiIcons) {
    this.emojiIcons = emojiIcons;
    this.errorMessage = null;
  }

  handleFetchEmojiIcons() {
    this.emojiIcons = null;
  }

  handleEmojiIconsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleUpdateUserIcons(userIcons) {
    this.userIcons = userIcons;
    this.errorMessage = null;
  }

  handleFetchUserIcons() {
    this.userIcons = null;
  }

  handleUserIconsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

function processSimilarity(similarities) {
  const radiusScaleFactor = 10; // scales the radius by the given factor
  let labels = similarities.labels;
  var sum = 0;
  let similarityRowSums = similarities.matrix.map((row, i) => {
    row[i] = 0;
    sum += row.reduce((a, b) => { return a + b; });
    return row.reduce((a, b) => { return a + b; }) - row[i];
  });
  let mean = sum / (similarities.matrix.length * similarities.matrix.length);

  // sort the row sums and return the sorted row + the index permutation that would yield that sort
  // order is larger -> smaller
  let { sorted, perm } = similarityRowSums.map((val, i) => { return { index: i, val: val } })
    .sort((a, b) => { return b.val - a.val; })
    .reduce((map, obj) => {
      map.sorted.push(obj.val);
      map.perm.push(obj.index);
      return map;
    }, { sorted: [], perm: [] });
  // keep the top n labels
  let indicesToKeep = perm.slice(0, 50).sort();
  let filteredLabels = indicesToKeep.map(i => labels[i]);
  let data = [].concat.apply([], indicesToKeep.map((i, x) => {
    return indicesToKeep.map((j, y) => {
      if (x !== y) {
        return {
          x: x,
          y: y,
          r: Math.min(100, 0.25 * similarities.matrix[i][j] / mean)
        }
      }
    });
  })).filter(item => item);

  // Transforms.normalizeData(data, (e) => e.r, (e, nv) => e.r = Math.min(100, nv * radiusScaleFactor));
  data = data.filter(item => item.r >= 1);

  return {
    clone: () => {
      return {
        labels: filteredLabels,
        datasets: [{
          data: data
        }]
      }
    }
  };
}

module.exports = alt.createStore(MainStore, 'MainStore');