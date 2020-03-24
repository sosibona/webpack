import { generateNumber } from '../generateNumber'

it('should return array from a to b', () => {
  const result = generateNumber(1, 3);
  expect(result).toEqual([1, 2, 3]);
})