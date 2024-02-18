import { accessSync, appendFileSync, writeFileSync, constants } from "fs";

export function writeToFile(path, content) {
  try {
    accessSync(path, constants.F_OK);
    try {
      appendFileSync(path, content);
      console.log("file updated");
    } catch (e) {
      console.error("failed to update file");
    }
  } catch (e) {
    console.log("need to create file");
    console.error(e);
    try {
      writeFileSync(path, content);
      console.log("file updated");
    } catch (e) {
      console.error(e);
    }
  }
}
