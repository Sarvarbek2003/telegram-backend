

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
	try{
		const { text, userId } = req.body
		const users = req.message(req.userId)
		const users2 = req.message(userId)
		const d = new Date()

		let h = '' + d.getHours()
		let min = '' + d.getMinutes()

		let date = `${h.padStart(2, '0')}:${min.padStart(2, '0')}`
		
		let newMes = {
			"me": 1,
			"mess": text,
			"time": date
		}
		
		let mapList = users.find(user => {
			if(+userId == +user.userId){
				let mesId = user.message.map(mes =>{
					return mes.mesId
				})
				let mesID = mesId.length ? mesId[mesId.length - 1]+1 : 1
				newMes.mesId = mesID
				return user.message.push(newMes)		
				
			} 
		})
		
		if(!mapList){
			newMes.mesId = 1
			let newUser = {
				userId: +userId,
				message:[
					newMes
				]
			}
			users.push(newUser)
		}  

		let newMes2 = {
			"user": 1,
			"mess": text,
			"time": date
		}

		let mapList2 = users2.find(user => {
			if(+req.userId == +user.userId){
				let mesId = user.message.map(mes =>{
					return mes.mesId
				})
				let mesID = mesId.length ? mesId[mesId.length - 1]+1 : 1
				newMes.mesId = mesID
				return user.message.push(newMes2)		
				
			} 
		})

		if(!mapList2){
			newMes2.mesId = 1
			let newUser = {
				userId: +req.userId,
				message:[
					newMes2
				]
			}
			users2.push(newUser)
		}  
		
		req.postmessage(req.userId,users)
		req.postmessage(userId,users2)

		res.json(
			users.map(user => {
				return user
		}))
	} catch (error){
		res.status(4001).json(
			users.map(user => {
				return user
		}))
	}
}


module.exports = {
	MYGET,
	POST,
	GET,
	GT
}
