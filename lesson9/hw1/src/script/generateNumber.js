export const generateNumber = (from, to) => {
  const result = [];

  // eslint-disable-next-line no-plusplus
  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  return result;
};
