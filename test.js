
const getAllUniqueCombinations = require('./model/common.js').getAllUniqueCombinations

let people = [999, 16, 3, 24]

let hotel = [

	{
		title: 'Room 1',
		costs: [
			{
				ages: [16],
				cost: 100
			},
			{
				ages: [16, 0],
				cost: 150
			}
		]
	},

	{
		title: 'Room 2',
		costs: [
			{
				ages: [16],
				cost: 200
			},
			{
				ages: [18, 18],
				cost: 200
			},
			{
				ages: [16, 0],
				cost: 250
			},
			{
				ages: [18, 18, 0],
				cost: 250
			}
		]
	},

	{
		title: 'Room 3',
		costs: [
			{
				ages: [16],
				cost: 300
			},
			{
				ages: [16, 0],
				cost: 300
			},
			{
				ages: [18, 18, 0],
				cost: 300
			},
			{
				ages: [18, 18, 18, 18],
				cost: 300
			}
		]
	}

]


console.log('People:')
console.dir(people , { depth: 5, color: true})


people = getAllUniqueCombinations(people )
people = people.map( value => value.map( value => value.sort( (a, b) => b-a ) ) )


console.log('\nHotel:')
console.dir(hotel, { depth: 5, color: true})
console.log('\nPeople combinations:')
console.dir(people, { depth: 5, color: true})


let checkAges = (ages, room) => {
	if (ages.length > room.length)
		return false

	let a = ages.slice().sort( (a, b) => b-a )
	let r = room.slice().sort( (a, b) => b-a )

	for (let i = 0; i < a.length; i++)
		if (a[i] < r[i])
			return false

	return true
}

let getRoom = (ages) => hotel.reduce( (prev, room) => {

	let cost = room.costs.reduce( (prev, line) => {
		if (!checkAges(ages, line.ages))
			return prev

		if (prev === null)
			return line.cost

		return Math.min(prev, line.cost)
	}, null)

	if (cost === null)
		return prev

	if (prev === null || prev.cost > cost)
		return { room: room.title, cost: cost }

	return prev
}, null)


let rooms = people.map( value => value.map( value => getRoom(value) ))
rooms = rooms.filter( value => value.reduce( (prev, value) => value === null ? false : prev, true )  )

console.log('\nRooms combinations:')

for (let i = 0; i < rooms.length; i++) {
	console.log(`Variant ${i + 1}:`)
	console.dir(rooms[i])
	let sum = rooms[i].reduce( (prev, val) => prev + val.cost, 0 )
	console.log(`sum: ${sum}\n`)
}

