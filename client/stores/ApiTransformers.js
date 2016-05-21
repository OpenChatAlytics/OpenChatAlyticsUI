/**
 * Contains utility methods used to transform data retrieved
 * from the web data server to be rendered by the UI
 */

export default {

  /**
   * Given a set of objects transforms the set to an array of key
   * values where the key is the Object key, and the value is the objects
   * value.
   * 
   * map: A map of keys to values
   * returns: An array of objects with key, value
   * 
   * For example: 
   * {
   *  key1: 'val1',
   *  key2: 'val2 
   * }
   * 
   * Will return:
   * 
   * [
   *  { key: 'key1', value: 'val1' },
   *  { key: 'key2', value: 'val2' },
   * ]
   * 
   */
  mapToArray(map) {
    return (Object.keys(map)).map((key) => {
      return { key: key, value: map[key] };
    });
  },

  /**
   * Normalizes an array of data.
   * 
   * data:   An array of data in some arbitrary format
   * getter: Function which returns the value to normalize from a given piece of data
   * setter: Function which sets the value to normalize from a given piece of data
   * 
   * Example usage:
   * 
   * let data = [ {v: 3}, {v: 4} ];
   * normalizeData(data, (e) => e.v, (e, nv) => e.v = nv)
   * 
   */
  normalizeData(data, getter, setter) {
    let minVal = Infinity;
    let maxVal = -Infinity;

    data.forEach(e => {
      let val = getter(e);
      if (val > maxVal) {
        maxVal = val;
      }
      if (val < minVal) {
        minVal = val;
      }
    });

    let interval = maxVal - minVal;
    data.forEach(e => {
      let val = getter(e);
      let nVal = (val - minVal) / interval;
      setter(e, nVal);
    });
  },

  /**
   * Converts a matrix to an array of values.  Each value in the array
   * is composed of an x coordinate, y coordinate, and r (value) of
   * the matrix at the x, y index.  (Note that x and y are zero indexed
   * and are guaranteed to be integers).
   * 
   * mat : A 2 dimensional array (matrix)
   * 
   * Example usage:
   * 
   * let mat = [ [0, 1], 
   *             [2, 3] ];
   * let arr = matrixToArray(mat);
   * 
   * Then arr = [
   *   { x: 0, y: 0, r: 0 },
   *   { x: 0, y: 1, r: 1 },
   *   { x: 1, y: 0, r: 2 },
   *   { x: 1, y: 1, r: 3 }
   * ]
   */
  matrixToArray(mat) {
    let arr = [];
    mat.forEach((row, i) => {
      row.forEach((e, j) => {
        arr.push({ x: i, y: j, r: e });
      });
    })

    return arr;
  },

  sortByKey(array, key) {
    return array.sort((a, b) => {
      let x = a[key]; let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}