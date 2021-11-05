const bcrypt = require('bcrypt')

const generateHashPassword = async (plainTextPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash
}

const passwordMatched = async (plainTextPassword, hashPassword) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

module.exports = Object.freeze({
    generateHashPassword,
    passwordMatched
})

