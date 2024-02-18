import { writeToFile } from "./writeToFile.js";

export class Contact {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
  saveToCSV(path, del = ",") {
    const content = this.name + del + this.phone + del + this.email + `\n`;
    writeToFile(path, content);
  }
}
