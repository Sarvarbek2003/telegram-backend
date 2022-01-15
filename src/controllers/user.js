const GET = (req, res) => {
	const users = req.select('users')
	res.json(users.map(user => {
		delete user.password
		return user
	}))
}
const MYGET = (req, res) => {
	const users = req.message('1')
	res.json(users.map(user => {
		return user
	}))
}

module.exports = {
	GET,
	MYGET
}