const d = new Date()

let h = '' + d.getHours()
let min = '' + d.getMinutes()

let date = `${h.padStart(2, '0')}:${min.padStart(2, '0')}`

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

const POST = (req, res) => {
	const users = req.message(req.userId)
	const { text, userId } = req.body
	let newMes = {
		"me": 1,
		"mess": text,
		"time": date
	}

	users.map(user => {
		if(req.body.userId == user.userId){
			let mesId = user.message.map(mes =>{
				return mes.mesId
			})
			let mesID = mesId.length ? mesId[mesId.length - 1]+1 : 1
			newMes.mesId = mesID
			user.message.push(newMes)
		}
		else return 
	})
	
	req.postmessage(req.userId,users)

	let user = res.json(
		users.map(user => {
			return user
	}))
}


module.exports = {
	MYGET,
	POST,
	GET,
	GT
}