const getUsers = "SELECT * FROM users";
const getUserByRegister = `SELECT * FROM users WHERE register = $1`;
const getUsersByManager = `SELECT * FROM users WHERE manager = $1`;

module.exports = {
    getUsers,
    getUserByRegister,
    getUsersByManager
};