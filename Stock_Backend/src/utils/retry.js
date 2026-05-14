exports.retry = async (
  fn,
  retries = 3,
  delay = 1000
) => {

  for (let i = 0; i < retries; i++) {

    try {

      return await fn();

    } catch (err) {

      if (i === retries - 1) {
        throw err;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }
};