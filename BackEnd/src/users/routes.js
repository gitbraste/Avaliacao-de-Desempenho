const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.getUsers);
router.get('/:register', controller.getUserByRegister);
router.get('/manager/:manager', controller.getUsersByManager);

module.exports = router;