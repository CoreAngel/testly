const { genSaltSync, hashSync, compareSync } = require('bcrypt');

const saltRounds = 8;

const generateSalt = async () => {
    return genSaltSync(saltRounds);
};

const hashPassword = async password => {
    const salt = await generateSalt();
    return hashSync(password, salt);
};

const comparePassword = async (password, hash) => {
    return compareSync(password, hash);
};

module.exports = {
    generateSalt,
    hashPassword,
    comparePassword,
};
