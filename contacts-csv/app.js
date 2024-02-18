import { readlineAsync } from "./input.js";
import { Contact } from "./contact.js";
import { readline } from "./input.js";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const path = resolve(__dirname, "contacts.csv");

export const start = async () => {
  const contact = new Contact();
  contact.name = await readlineAsync("Contact name: ");
  contact.phone = await readlineAsync("Phone: ");
  contact.email = await readlineAsync("Email: ");
  contact.saveToCSV(path);
  const responseContinue = await readlineAsync("Continue? [y to continue] ");
  if (responseContinue === "y") await start();
  else readline.close();
};
