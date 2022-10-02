const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contsctsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contsctsPath, JSON.stringify(allContacts, null, 2));

async function listContacts() {
  try {
    const data = await fs.readFile(contsctsPath);
    const contacts = data ? JSON.parse(data) : [];
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const id = String(contactId);
    const result = allContacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const id = String(contactId);
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
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