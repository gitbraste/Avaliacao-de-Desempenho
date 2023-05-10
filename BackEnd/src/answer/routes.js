const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/create', controller.createAnswer);

module.exports = router;