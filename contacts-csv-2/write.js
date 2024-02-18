import { createObjectCsvWriter } from "csv-writer";
import { Contact } from "../contacts-csv/contact";

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "phone", title: "PHONE" },
    { id: "email", title: "EMAIL" },
  ],
});

const contact = new Contact();

contact.saveToCSV = function () {
  try {
    const { name, phone, email } = this;
    csvWriter.writeRecords([{ name, phone, email }]);
    console.log(`${name} saved`);
  } catch (e) {
    console.error(e);
  }
};
