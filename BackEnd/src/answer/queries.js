const createAnswer = "INSERT INTO answer (id_assessment, id_question, value) VALUES ($1, $2, $3)";

module.exports = {
    createAnswer
};