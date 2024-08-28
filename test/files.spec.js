import { assert } from 'chai';

describe('Basic Mocha Test', () => {
  it('should throw errors', () => {
    console.log(assert, 'asser');
    assert.equal(2, 3);
  });
});
