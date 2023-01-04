async function retry<T>(
  timeouts: number[],
  func: () => Promise<T>,
  taskName: string
): Promise<T> {
  try {
    return await exec(func, taskName);
  } catch (error: any) {
    console.log(`Task ${taskName} failed at first execute, error: `, error);
    let currentError = error;

    for (let timeout of timeouts) {
      try {
        return await delayRetry(timeout, func, taskName);
      } catch (innerError: any) {
        currentError = innerError;
        console.log(
          `Task ${taskName} failed affter retrying, error: `,
          innerError
        );
      }
    }
    throw currentError;
  }
}

function delayRetry<T>(
  timeout: number,
  func: () => Promise<T>,
  taskName: string
): Promise<T> {
  console.log(`retry after ${timeout} ms`);
  return new Promise((res, rej) => {
    setTimeout(() => {
      exec(func, taskName)
        .then((result) => res(result))
        .catch(rej);
    }, timeout);
  });
}

async function exec<T>(func: () => Promise<T>, taskName: string) {
  console.log(`Task ${taskName} is executed`);
  const result = await func();
  console.log(`Task ${taskName} is finished`);
  return result;
}

const execFunc = (() => {
  let i = 0;

  return async () => {
    i += 1;
    if (i < 3) {
      throw new Error('error');
    }
    console.log('good');
  };
})();

retry([3000, 3000, 3000, 3000], execFunc, 'Vinh');
