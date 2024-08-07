const Router = require('express');

const router = Router();

const UserController = require('../app/controllers/userController');

// Public routes
router.post('/user', UserController.store);

module.exports = router;
