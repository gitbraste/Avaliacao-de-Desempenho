const pool = require('../../config.js');
const queries = require('./queries.js');

const getQuestionsByType = (req, res) => {
    const type = req.params.type;
    pool.query(queries.getQuestionsByType, [type], (error, results)=> {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getQuestionsByType
};