const mockedLabels = {};
export const action = jest.fn().mockImplementation((label) => {
  if (!mockedLabels[label]) {
    mockedLabels[label] = jest.fn();
  }
  return mockedLabels[label];
});

afterEach(() => {
  // We reset all the functions passed to the labels we've seen until
  // now. We cannot simply reset the whole mock/empty `mockedLabels` because
  // the creation of the actions within the various stories happens when "composeStories"
  // is called, which means that if we do remove the ones in `mockedLabels` then
  // we won't be given them back when the test starts, and we will instead be
  // told that no mockedLabel with that name has been initialized (cause it hasn't
  // since the test has started, it only did at "composeStories" time, which we cleared).
  Object.keys(mockedLabels).forEach((k) => {
    mockedLabels[k].mockClear();
  });
});
