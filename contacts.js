const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  return JSON.parse(await fs.promises.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  try {
    const list = await listContacts();
    const itemById = list.filter((item) => item.id === contactId);
    return itemById;
  } catch (error) {
    console.log(error);
  }
}


async function removeContact(contactId) {
  try {
    const list = await listContacts();
    const itemById = list.filter((item) => item.id !== contactId);
    return itemById;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const id = Number(JSON.stringify(Date.now()).substr(10,3));
  console.log(id)
  try {
    const list = await listContacts();
    await fs.promises.writeFile(contactsPath, JSON.stringify([...list, {id, name, email, phone}]));
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};