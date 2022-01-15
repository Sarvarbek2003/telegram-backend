const router = require('express').Router()
const userController = require('../controllers/user.js')
const authTokenMiddleware = require('../middlewares/authToken.js')



router.route('/')
	.get(userController.GET)

router.route('/my')
	.get(authTokenMiddleware,userController.MYGET)

module.exports = router