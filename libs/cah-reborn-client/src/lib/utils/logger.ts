export type Logger = (message: string, arg?: any) => void;

export const log = (debug = false): Logger => (
  message: string,
  arg?: any
): void => {
  if (debug) {
    if (arg) {
      console.log(message, arg);
    } else {
      console.log(message);
    }
  }
};
