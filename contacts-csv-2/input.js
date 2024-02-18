import prompt from "prompt";
import { Contact } from "../contacts-csv/contact";

prompt.start();
prompt.message = "";

const responses = await prompt.get([
  {
    name: "name",
    description: "Enter name: ",
  },
  {
    name: "phone",
    description: "Enter phone: ",
  },
  {
    name: "email",
    description: "Enter email: ",
  },
]);

const contact = new Contact();
Object.assign(contact, responses);
contact.saveToCSV("contacts-2.csv");

const { again } = prompt.get([
  {
    name: "again",
    description: "Continue? [y to continue] ",
  },
]);

if (again == "y") {
}
