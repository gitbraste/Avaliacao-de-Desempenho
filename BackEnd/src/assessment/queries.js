const getAssessmentById = `SELECT 
    users.name,
    users.position,
    users.department,
    users.email,
    assessment.date_time,
    assessment.id_assessment,
    assessment.description,
    assessment.description_employee,
    assessment.validation_date,
    assessment.validation_email,
    answer.value,
    question.title,
    question.text
    FROM assessment 
    INNER JOIN users ON assessment.register = users.register
    INNER JOIN answer ON assessment.id_assessment = answer.id_assessment
    INNER JOIN question ON question.id_question = answer.id_question
    WHERE assessment.id_assessment = $1`;

const getAssessmentByManager = `SELECT 
    assessment.id_assessment, 
    assessment.register, 
    users.name, 
    users.email,
    assessment.description, 
    assessment.date_time, 
    assessment.status,
    assessment.validation_date,
    assessment.validation_email
    FROM assessment 
    INNER JOIN users ON assessment.register = users.register 
    WHERE users.manager = $1
    ORDER BY assessment.date_time DESC`;

const getAssessmentByUser = `SELECT 
    assessment.id_assessment, 
    assessment.register, 
    users.name, 
    users.email,
    assessment.description, 
    assessment.date_time, 
    assessment.status,
    assessment.validation_date,
    assessment.validation_email
    FROM assessment 
    INNER JOIN users ON assessment.register = users.register 
    WHERE assessment.register = $1 AND users.manager = $2`;

const getAssessmentByDate = `SELECT 
    assessment.id_assessment, 
    assessment.register, 
    users.name, 
    users.email,
    assessment.description, 
    assessment.date_time, 
    assessment.status,
    assessment.validation_date,
    assessment.validation_email
    FROM assessment 
    INNER JOIN users ON assessment.register = users.register 
    WHERE users.manager = $1 AND (assessment.date_time >= $2 AND assessment.date_time <= $3)
    ORDER BY assessment.date_time DESC`;

const getAssessmentByDateAndUser = `SELECT 
    assessment.id_assessment, 
    assessment.register, 
    users.name, 
    users.email,
    assessment.description, 
    assessment.date_time, 
    assessment.status,
    assessment.validation_date,
    assessment.validation_email
    FROM assessment 
    INNER JOIN users ON assessment.register = users.register 
    WHERE assessment.register = $1 AND users.manager = $2 AND (assessment.date_time >= $3 AND assessment.date_time <= $4)
    ORDER BY assessment.date_time DESC`;

const createAssessment = `INSERT INTO assessment 
    (register, date_time, description, description_employee) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id_assessment`;

const updateAssessmentStatus = `UPDATE assessment 
    SET status = '1', validation_date = $1, validation_email = $2
    WHERE id_assessment = $3`;

module.exports = {
    getAssessmentById,
    getAssessmentByManager,
    getAssessmentByUser,
    createAssessment,
    updateAssessmentStatus,
    getAssessmentByDate,
    getAssessmentByDateAndUser
};