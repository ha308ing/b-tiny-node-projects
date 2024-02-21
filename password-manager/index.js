import bcrypt from "bcrypt";
import promptModule from "prompt-sync";

const prompt = promptModule();
const mockDB = { passwords: {} };

if (!mockDB.hash) promptNewPassword();
else promptOldPassword();

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

function saveNewPassword(password) {
  mockDB.hash = hash(password);
  console.log("Password has been saved!");
  showMenu();
}

async function compareHashedPassword(password) {
  const { hash } = mockDB;
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

function showMenu() {
  console.log(`
  1. View passwords
  2. Manage new password
  3. Verify password
  4. Exit`);
  const response = prompt(">");

  if (response === "1") viewPasswords();
  else if (response === "2") promptManageNewPassword();
  else if (response === "3") promptOldPassword();
  else if (response === "4") process.exit();
  else {
    console.log(`That's an invalid response`);
    showMenu();
  }
}

function viewPasswords() {
  const { passwords } = mockDB;
  Object.entries(passwords).forEach(([key, value], index) => {
    console.log(`${index + 1}. ${key} => ${value}`);
  });
  showMenu();
}

function promptManageNewPassword() {
  const source = prompt("enter name for password: ");
  const password = prompt("enter password to save: ");
  mockDB.passwords[source] = password;
  console.log(`passord for ${source} has been saved!`);
  showMenu();
}
