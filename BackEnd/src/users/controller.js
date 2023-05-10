const pool = require('../../config.js');
const queries = require('./queries.js');

const getUsers = (req, res) =>{
    pool.query(queries.getUsers, (error, results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUserByRegister = (req, res) =>{
    const register = req.params.register;
    pool.query(queries.getUserByRegister, [register], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const getUsersByManager = (req, res) =>{
    const manager = req.params.manager;
    pool.query(queries.getUsersByManager, [manager], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getUsers,
    getUserByRegister,
    getUsersByManager
};