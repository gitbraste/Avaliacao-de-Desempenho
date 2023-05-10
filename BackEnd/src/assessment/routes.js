const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/:id', controller.getAssessmentById);
router.get('/user/:register/:manager', controller.getAssessmentByUser);
router.get('/manager/:manager', controller.getAssessmentByManager);
router.get('/date/:manager/:start/:end', controller.getAssessmentByDate);
router.get('/date/:register/:manager/:start/:end', controller.getAssessmentByDateAndUser);
router.post('/create', controller.createAssessment);
router.put('/update/:id', controller.updateAssessmentStatus);

module.exports = router;