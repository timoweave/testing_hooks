export const timeout = (time: number) =>
  new Promise<boolean>((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, time)
  );
