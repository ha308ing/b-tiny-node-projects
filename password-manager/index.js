import bcrypt from "bcrypt";
import promptModule from "prompt-sync";
import { MongoClient } from "mongodb";

const prompt = promptModule();
const client = new MongoClient("mongodb://localhost:27017");
const dbName = "password-manager-db";
let hasPasswords = false;

const [passwordsCollection, authCollection] = await main();
if (!hasPasswords) promptNewPassword();
else promptOldPassword();

async function main() {
  await client.connect();
  console.log("connected to mongodb server");
  const db = client.db(dbName);
  const authCollection = db.collection("auth");
  const passwordsCollection = db.collection("passwords");

  // clearCollection(authCollection);
  // clearCollection(passwordsCollection);

  const hashedPassword = await authCollection.findOne({ type: "auth" });
  hasPasswords = !!hashedPassword;
  return [passwordsCollection, authCollection];
}
//  if hash is stored
//    ask for oldPassword, compare with stored, ask to retype if no match
//  else ask for newPassword, save it
//  with has set / matched show menu:
//  - view passwords
//  - add new password
//  - validate current password
//  - exit

function hash(password) {
  return bcrypt.hashSync(password, 1);
}

async function saveNewPassword(password) {
  await authCollection.insertOne({ type: "auth", hash: hash(password) });
  console.log("Password has been saved!");
  showMenu();
}

async function compareHashedPassword(password) {
  const { hash } = await authCollection.findOne({ type: "auth" });
  return await bcrypt.compare(password, hash);
}

function promptNewPassword() {
  const newPassword = prompt(
    "no password is saved. please provide a new one: "
  );
  saveNewPassword(newPassword);
}

async function promptOldPassword() {
  let oldPassword = prompt("enter your password: ");
  const result = await compareHashedPassword(oldPassword);

  if (result) {
    console.log("Password verified");
    showMenu();
  } else {
    console.log("Password incorrect");
    promptOldPassword();
  }
}

async function showMenu() {
  console.log(`
  1. View passwords
  2. Manage new password
  3. Verify password
  4. Exit`);
  const response = prompt(">");

  if (response === "1") await viewPasswords();
  else if (response === "2") await promptManageNewPassword();
  else if (response === "3") await promptOldPassword();
  else if (response === "4") process.exit();
  else {
    console.log(`That's an invalid response`);
    showMenu();
  }
}

async function viewPasswords() {
  const passwords = await passwordsCollection.find({}).toArray();
  passwords.forEach(({ source, password }, index) => {
    console.log(`${index + 1}. ${source} => ${password}`);
  });
  showMenu();
}

async function promptManageNewPassword() {
  const source = prompt("enter name for password: ");
  const password = prompt("enter password to save: ");
  await passwordsCollection.findOneAndUpdate(
    { source },
    { $set: { password } },
    { returnDocument: true, upsert: true }
  );
  console.log(`passord for ${source} has been saved!`);
  showMenu();
}

async function clearCollection(collection) {
  try {
    await collection.deleteMany({});
  } catch (e) {
    console.error(e);
  }
}
