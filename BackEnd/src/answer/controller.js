const pool = require('../../config.js');
const queries = require('./queries.js');

const createAnswer = (req, res) => {
    const data = req.body;
    data.forEach(element => {
        const { id_assessment, id_question, value } = element;

        pool.query(queries.createAnswer, [id_assessment, id_question, value], (error, results) => {
            if(error) throw error;
            res.status(200);
        });
    });
};

module.exports = {
    createAnswer
}