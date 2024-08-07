const Router = require('express');

const router = Router();

const UserController = require('../app/controllers/userController');

// Public routes
router.post('/user', UserController.store);
router.get('/users', UserController.index);

module.exports = router;
