/*!
 * UUIDv1 generation
 * Copyright(c) 2016 Wisdman <wisdman@ajaw.it>
 * MIT Licensed
 */

'use strict'

let byteToHex = []

for (var i = 0; i < 256; i++)
	byteToHex[i] = (i + 0x100).toString(16).substr(1)

let lastNSecs = 0
let lastMSecs = 0
let r = Math.random() * 0x100000000
let clockseq = ( ( r >>> 16 ) << 8 | ( r >>> 24 ) ) & 0x3fff

module.exports = () => {
	let uuid = []

	let msecs = new Date().getTime()
	let nsecs = lastNSecs + 1
	let dt = (msecs - lastMSecs) + (nsecs - lastNSecs)/10000

	if (dt < 0 )
		clockseq = clockseq + 1 & 0x3fff

	if (dt < 0 || msecs > lastMSecs)
		nsecs = 0

	lastMSecs = msecs
	lastNSecs = nsecs

	msecs += 12219292800000

	let i = 0

	// time_low
	let t = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000
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

	let rnds = new Array(16)
	for (let i = 0, r; i < 7; i++) {
		if ((i & 0x03) === 0)
			r = Math.random() * 0x100000000
		rnds[i] = r >>> ((i & 0x03) << 3) & 0xff
	}

	// node
	uuid[i] = rnds[0] | 0x01
	for (let n = 1; n < 6; n++)
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
