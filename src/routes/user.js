const router = require('express').Router()
const userController = require('../controllers/user.js')
const authTokenMiddleware = require('../middlewares/authToken.js')



router.route('/')
	.get(authTokenMiddleware,userController.GET)
	.post(authTokenMiddleware,userController.GT)

router.route('/my')
	.get(authTokenMiddleware,userController.MYGET)

module.exports = router