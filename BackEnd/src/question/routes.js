const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/type/:type', controller.getQuestionsByType);

module.exports = router;