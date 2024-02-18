import { createInterface } from "readline";

export const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const readlineAsync = message => {
  return new Promise(res => {
    readline.question(message, answer => res(answer));
  });
};
