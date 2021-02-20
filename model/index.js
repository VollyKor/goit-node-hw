const fs = require('fs').promises
const path = require('path')

const contactsPathName = path.resolve(__dirname, 'contacts.json')

const readFile = async pathToFile => {
  try {
    const file = await fs.readFile(pathToFile, 'utf-8')
    return JSON.parse(file)
  } catch (error) {
    console.log(error)
  }
}

const writeFile = async data => {
  try {
    fs.writeFile(contactsPathName, data)
  } catch (error) {
    console.log(error)
  }
}

async function getAll() {
  return await readFile(contactsPathName)
}

async function getById(contactId) {
  try {
    const contactsList = await readFile(contactsPathName)
    const contactItem = contactsList.filter(e => e.id === contactId)
    return contactItem[0]
  } catch (e) {
    console.log(e)
  }
}

async function remove(contactId) {
  try {
    const contactsList = await readFile(contactsPathName)
    const newContactsList = contactsList.filter(e => e.id !== contactId)

    if (contactsList.length === newContactsList.length) return false

    const data = JSON.stringify(newContactsList)
    await writeFile(data)
    return true
  } catch (error) {
    console.log(error)
  }
}

async function add(dataObj) {
  const { name, email, phone, id } = dataObj
  try {
    const contactsList = await readFile(contactsPathName)
    const newContactObj = {
      name,
      email,
      phone,
      id,
    }
    contactsList.push(newContactObj)
    const data = JSON.stringify(contactsList)
    return await fs.writeFile(contactsPathName, data)
  } catch (error) {
    console.log(error)
  }
}

async function update(contactId, body) {
  try {
    let isUpdated = false

    const contactsList = await readFile(contactsPathName)
    const newContactsList = contactsList.map(contact => {
      if (contact.id === contactId) {
        isUpdated = true
        return { ...contact, ...body }
      }
      return contact
    })
    await writeFile(JSON.stringify(newContactsList))
    return isUpdated ? getById(contactId) : false
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAll,
  getById,
  remove,
  add,
  update,
}
