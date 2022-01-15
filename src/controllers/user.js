const GET = (req, res) => {
	const users = req.select('users')
	res.json(users.map(user => {
		delete user.password
		return user
	}))
}

const GT = (req, res) => {
	const users = req.select('users')
	res.json(users.find(user => {
		delete user.password
		if(user.userId == req.userId){
			return user
		}
	}))
}


const MYGET = (req, res) => {
	const users = req.message(req.userId)
	res.json(users.map(user => {
		return user
	}))
}

module.exports = {
	GET,
	MYGET,
	GT
}