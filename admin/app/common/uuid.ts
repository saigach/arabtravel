/*!
 * UUIDv1 generation
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 */

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

	private _uuid: string = '';

	public toString(): string {
		return this._uuid
	}

	constructor(value: string = null) {
		if (!value)
			this._uuid = UUID.generate()
		else if (!UUID.valid(value))
			throw new TypeError(`'Value isn't correct UUIDv1`)
		else
			this._uuid = value
	}
}
