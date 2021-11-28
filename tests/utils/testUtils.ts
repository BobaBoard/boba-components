export const suppressConsoleErrors = (errors: string[]) => {
  const originalError = console.error.bind(console.error);

  beforeAll(() => {
    console.error = (err) =>
      errors.every((error) => !err.toString().startsWith(error)) &&
      originalError(err);
  });
  afterAll(() => {
    console.error = originalError;
  });
};
