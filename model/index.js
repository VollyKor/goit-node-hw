const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const path = require('path')

const contactsPathName = path.resolve(__dirname, '/.contacts.json')
console.log()
const readFile = async pathToFile => {
  try {
    const file = await fs.readFile(pathToFile, 'utf-8')
    return JSON.parse(file)
  } catch (error) {
    console.log(error)
  }
}

// const writeFile = async data => {
//   try {
//     fs.writeFile(contactsPathName, data)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const getContacts = async () => {};

async function getContactsList() {
  const contactsObj = await readFile(contactsPathName)
  console.log(contactsObj)
  return contactsObj
}

const getContactById = async contactId => {}

const removeContact = async contactId => {}

const addContact = async body => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// async function getContactById(contactId) {
//   try {
//     const contactsList = await readFile(contactsPathName);
//     const contactItem = contactsList.filter((e) => e.id === Number(contactId));
//     console.log(contactItem[0]);
//     return contactItem[0];
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function removeContact(contactId) {
//   try {
//     const contactsList = await readFile(contactsPathName);
//     const newContactsList = contactsList.filter(
//       (e) => e.id !== Number(contactId)
//     );
//     const data = JSON.stringify(newContactsList);

//     await writeFile(data);
//     console.log(`Contact removed`);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function addContact(name, email, phone) {
//   try {
//     const contactsList = await readFile(contactsPathName);
//     const newContactObj = {
//       name,
//       email,
//       phone,
//       id: Math.floor(Math.random() * Math.floor(1000000000)),
//     };
//     contactsList.push(newContactObj);
//     const data = JSON.stringify(contactsList);
//     await fs.writeFile(contactsPathName, data);
//     console.log("Contact added");
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
