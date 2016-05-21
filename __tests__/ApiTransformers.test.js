jest.disableAutomock();

let Transformers = require('../client/stores/ApiTransformers.js').default;

describe('ApiTransformers', () => {

  describe('mapToArray', () => {
    it('should not fail on an empty map', () => {
      let input   = { };
      let output  = Transformers.mapToArray(input);
      
      expect(output).toEqual([]); 
    });
    
    it('should convert the key-values of a map to an array', () => {
      let input    = { 
        key1: 'val1',
        key2: 'val2'
      };
      let output   = Transformers.mapToArray(input);
      let expected = [
        { key: 'key1', value: 'val1'},
        { key: 'key2', value: 'val2'}
      ];
      
      expect(output).toEqual(expected);
    })
  });
  
  describe('normalizeData', () => {
    it('should not fail on an empty array', () => {
      let data = [];
      Transformers.normalizeData(data);
      
      expect(data).toEqual([]);
    })
    
    it('should normalize data by setting the min to zero, max to one', () => {
      let data = [ { v: 3 }, { v: 5 }, { v: 13 } ];
      Transformers.normalizeData(data, (e) => e.v, (e, nv) => e.v = nv);
      
      let expected = [ { v: 0 }, { v: 0.2 }, { v: 1 } ];
      expect(data).toEqual(expected);
    })
  });
  
  describe('matrixToArray', () => {
    it('should not fail on an empty matrix', () => {
      let mat = [ [] ];
      let arr = Transformers.matrixToArray(mat);
      
      let expected = [];
      expect(arr).toEqual(expected);
    });
    
    it('should transform a matrix to an array of elements', () => {
      let mat = [ [0, 1], [2, 3] ];
      let arr = Transformers.matrixToArray(mat);
      
      let expected = [
        { x: 0, y: 0, r: 0 },
        { x: 0, y: 1, r: 1 },
        { x: 1, y: 0, r: 2 },
        { x: 1, y: 1, r: 3 }
      ];
      expect(arr).toEqual(expected);
    });
  });
  
});