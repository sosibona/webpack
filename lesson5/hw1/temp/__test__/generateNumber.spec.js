import { generateNumber } from '../generateNumber';
it('should return array from a to b', function () {
  var result = generateNumber(1, 3);
  expect(result).toEqual([1, 2, 3]);
});