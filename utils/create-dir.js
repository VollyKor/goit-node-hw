const fs = require('fs').promises

const isdAccesible = path => {
    return fs
        .access(path)
        .then(() => true)
        .catch(() => false)
}

const createFolderIsExist = async folder => {
    if (!(await isdAccesible(folder))) {
        await fs.mkdir(folder)
    }
}

module.exports = createFolderIsExist
