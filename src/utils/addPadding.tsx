export const addPadding = (
  [startIndex = 0, endIndex = 0],
  total = 0,
  pad = 0
) => {
  const paddedIndexes = [startIndex - pad, endIndex + pad];
  if (paddedIndexes[0] < 0) {
    paddedIndexes[0] = 0;
  }
  if (paddedIndexes[1] >= total) {
    paddedIndexes[1] = total - 1;
  }
  return paddedIndexes;
};
