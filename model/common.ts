
let byteToHex:string[] = []

for (let i:number = 0; i < 256; i++)
	byteToHex[i] = (i + 0x100).toString(16).substr(1)

let lastNSecs:number = 0
let lastMSecs:number = 0
let r:number = Math.random() * 0x100000000
let clockseq:number = ( ( r >>> 16 ) << 8 | ( r >>> 24 ) ) & 0x3fff

export class UUID {
	private static generate(): string {
		let uuid:number[] = []

		let msecs:number = new Date().getTime()
		let nsecs:number = lastNSecs + 1
		let dt:number = (msecs - lastMSecs) + (nsecs - lastNSecs)/10000

		if (dt < 0 )
			clockseq = clockseq + 1 & 0x3fff

		if (dt < 0 || msecs > lastMSecs)
			nsecs = 0

		lastMSecs = msecs
		lastNSecs = nsecs

		msecs += 12219292800000

		let i:number = 0

		// time_low
		let t:number = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000
		uuid[i++] = t >>> 24 & 0xff
		uuid[i++] = t >>> 16 & 0xff
		uuid[i++] = t >>> 8 & 0xff
		uuid[i++] = t & 0xff

		// time_mid
		t = (msecs / 0x100000000 * 10000) & 0xfffffff
		uuid[i++] = t >>> 8 & 0xff
		uuid[i++] = t & 0xff

		// time_high_and_version
		uuid[i++] = t >>> 24 & 0xf | 0x10 // include version
		uuid[i++] = t >>> 16 & 0xff

		// clock_seq_hi_and_reserved
		uuid[i++] = clockseq >>> 8 | 0x80

		// clock_seq_low
		uuid[i++] = clockseq & 0xff

		let rnds:number[] = new Array(16)
		for (let i:number = 0, r: any; i < 7; i++) {
			if ((i & 0x03) === 0)
				r = Math.random() * 0x100000000
			rnds[i] = r >>> ((i & 0x03) << 3) & 0xff
		}

		// node
		uuid[i] = rnds[0] | 0x01
		for (let n:number = 1; n < 6; n++)
			uuid[i + n] = rnds[n]

		i = 0
		return	byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] + '-' +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]] +
				byteToHex[uuid[i++]] + byteToHex[uuid[i++]]
	}

	private static valid(value: string = null) {
		return !!value && /^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value)
	}

	private _uuid: string = UUID.generate()

	constructor(value: string = null) {
		if (value) {
			if (!UUID.valid(value))
				throw new TypeError(`'Value isn't correct UUIDv1`)
			else
				this._uuid = value.toLowerCase()
		}
	}

	get uuid():string {
		return this._uuid
	}

	equal(value: UUID): boolean {
		return this._uuid === value.uuid
	}
}


export function newDate(value = null) {

	let date = value ? new Date(value) : new Date()

	if (Number.isNaN( date.getTime() ))
		return null

	date.setHours(0,0,0,0)
	return date
}

export function str2Date(value = null) {
	if (!value)
		return newDate()

	let [day, month, year] = value.split('.').map( value => Number.parseInt(value) )
	return newDate(new Date(year, month - 1, day))
}

export class MLString {
	static  Languages: string[] = ['en', 'ar']
	static checkValid(value: MLString): boolean {
		for (let key in value)
			if (value[key].length <= 0)
				return false
		return true
	}

	[key: string]: string

	constructor(value: any = null) {
		for (let key of MLString.Languages)
			this[key] = ''

		if (typeof value === 'string')
			this[MLString.Languages[0]] = String(value)

		else if (value)
			for (let key of MLString.Languages)
				if (key in value)
					this[key] = String(value[key])
	}
}

export class Model {
	static __api: string = null
	static __primaryFields = ['id', 'enable', 'title']

	id: UUID = new UUID()
	enable: boolean

	constructor(value: any = {}) {
		if (value.id)
			this.id = value.id instanceof UUID ? value.id : new UUID(value.id)

		this.enable = value.enable === undefined ? true : Boolean(value.enable)
	}

	toObject(): {} {
		return {
			id: this.id.uuid,
			enable: this.enable
		}
	}

	toString(): string {
		return JSON.stringify(this.toObject())
	}
}

export class File {

	enable: boolean
	title: string
	link: string

	constructor(value: any = {}) {
		this.enable = value.enable === undefined ? true : Boolean(value.enable)
		this.title = String(value.title || '')
		this.link = String(value.link || '')
	}

	toObject(): {} {
		return {
			enable: this.enable,
			title: this.title,
			link: this.link
		}
	}
}

export type SearchData = {
	pointA: string,
	pointB: string,
	departureDate: Date,
	anyDate: boolean,
	adults: number,
	kidsAges: { value: number }[]
}

export const genCombinationsNorep = (lengthOfAlphabet: number, lengthOfFigures: number): number[][] => {
	let n: number = lengthOfAlphabet
	let k: number = lengthOfFigures

	if (k === 0)
		return []

	if (k > n)
		k = n

	let vector: number[] = []

	for(let j = 0; j < k; j++)
		vector.push(j)

	let result: number[][] = []
	let gen_result = true

	while(gen_result) {

		let comb = []
		for(let x = 0; x < k; x++)
			comb.push(vector[x])
		result.push(comb)

		gen_result = (() => {
			let j //index

			//easy case, increase rightmost element
			if(vector[k - 1] < n - 1) {
				vector[k - 1]++
				return true
			}

			//find rightmost element to increase
			for(j = k - 2; j >= 0; j--)
				if(vector[j] < n - k + j)
					break

			//terminate if vector[0] == n - k
			if(j < 0)
				return false

			//increase
			vector[j]++

			//set right-hand elements
			while(j < k - 1) {
				vector[j + 1] = vector[j] + 1
				j++
			}

			return true;
		})()
	}

	return result
}

export const getCombinations = (arr: any[] = [], k: number = 1): { combination: any[], remainder: any[] }[] => {

	let combinationList: number[][] = genCombinationsNorep(arr.length, k)

	let result: { combination: any[], remainder: any[] }[] = []

	for (let l of combinationList) {

		let line = {
			combination: [],
			remainder: []
		}

		for(let i = 0; i < arr.length; i++)
			if (l.indexOf(i) >= 0)
				line.combination.push(arr[i])
			else
				line.remainder.push(arr[i])

		result.push(line)
	}

	return result
}

export const getAllCombinations = (arr: any[] = []): any[][][] => {

	let combinationList = []

	for (let k = arr.length; k > 0; k--)
		combinationList = combinationList.concat(getCombinations(arr, k))

	let result = []

	for (let line of combinationList) {
		let resultLine = []
		resultLine.push(line.combination)

		if (line.remainder.length <= 0)
			result.push(resultLine)
		else if (line.remainder.length === 1) {
			resultLine.push(line.remainder)
			result.push(resultLine)
		} else {
			let subCombinationList = getAllCombinations(line.remainder)

			for (let subLine of subCombinationList)
				result.push(resultLine.slice(0).concat(subLine))
		}

	}

	return result

}

export const arrayComp = (a: any, b: any): boolean => {
	if (a instanceof Array && b instanceof Array && a.length === b.length)
		return a.reduce( (prev, valueA) => {
			return prev && b.find( valueB => {
				if (valueA instanceof Array && valueB instanceof Array)
					return arrayComp(valueA, valueB)
				else
					return valueA === valueB
			}) !== undefined
		}, true)

	return false
}

export const getAllUniqueCombinations = (arr: any[] = []): any[][][] => {

	let vector: number[] = []

	for(let j = 0; j < arr.length; j++)
		vector.push(j)

	let combinationList = getAllCombinations(vector).reduce( (prev, value) => {
		if ( prev.find( prevValue => arrayComp(prevValue,value) ) === undefined )
			prev.push(value)

		return prev
	}, [])

	let result: any[][][] = []

	for (let line of combinationList) {

		let newLine = []

		for (let comb of line ) {

			let newComb = []

			for ( let i of comb )
				newComb.push(arr[i])

			newLine.push(newComb)

		}

		result.push(newLine)
	}

	return result

}
