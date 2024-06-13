/* eslint-disable no-bitwise */

function safeAdd(n1: number, n2: number): number {
	const lsw = (n1 & 0xffff) + (n2 & 0xffff);
	const msw = (n1 >> 16) + (n2 >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

function bitRotateLeft(num: number, count: number): number {
	return (num << count) | (num >>> (32 - count));
}

function md5cmn(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number): number {
	return safeAdd(bitRotateLeft(safeAdd(safeAdd(n2, n1), safeAdd(n4, n6)), n5), n3);
}

function md5ff(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number): number {
	return md5cmn((n2 & n3) | (~n2 & n4), n1, n2, n5, n6, n7);
}

function md5gg(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number): number {
	return md5cmn((n2 & n4) | (n3 & ~n4), n1, n2, n5, n6, n7);
}

function md5hh(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number): number {
	return md5cmn(n2 ^ n3 ^ n4, n1, n2, n5, n6, n7);
}

function md5ii(n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number): number {
	return md5cmn(n3 ^ (n2 | ~n4), n1, n2, n5, n6, n7);
}

function binlmd5(arr: number[], len: number): number[] {
	arr[len >> 5] |= 0x80 << len % 32;
	arr[(((len + 64) >>> 9) << 4) + 14] = len;

	let n1 = 1732584193;
	let n2 = -271733879;
	let n3 = -1732584194;
	let n4 = 271733878;

	let oldN1 = 0;
	let oldN2 = 0;
	let oldN3 = 0;
	let oldN4 = 0;

	for(let idx = 0; idx < arr.length; idx += 16) {
		oldN1 = n1;
		oldN2 = n2;
		oldN3 = n3;
		oldN4 = n4;

		n1 = md5ff(n1, n2, n3, n4, arr[idx], 7, -680876936);
		n4 = md5ff(n4, n1, n2, n3, arr[idx + 1], 12, -389564586);
		n3 = md5ff(n3, n4, n1, n2, arr[idx + 2], 17, 606105819);
		n2 = md5ff(n2, n3, n4, n1, arr[idx + 3], 22, -1044525330);
		n1 = md5ff(n1, n2, n3, n4, arr[idx + 4], 7, -176418897);
		n4 = md5ff(n4, n1, n2, n3, arr[idx + 5], 12, 1200080426);
		n3 = md5ff(n3, n4, n1, n2, arr[idx + 6], 17, -1473231341);
		n2 = md5ff(n2, n3, n4, n1, arr[idx + 7], 22, -45705983);
		n1 = md5ff(n1, n2, n3, n4, arr[idx + 8], 7, 1770035416);
		n4 = md5ff(n4, n1, n2, n3, arr[idx + 9], 12, -1958414417);
		n3 = md5ff(n3, n4, n1, n2, arr[idx + 10], 17, -42063);
		n2 = md5ff(n2, n3, n4, n1, arr[idx + 11], 22, -1990404162);
		n1 = md5ff(n1, n2, n3, n4, arr[idx + 12], 7, 1804603682);
		n4 = md5ff(n4, n1, n2, n3, arr[idx + 13], 12, -40341101);
		n3 = md5ff(n3, n4, n1, n2, arr[idx + 14], 17, -1502002290);
		n2 = md5ff(n2, n3, n4, n1, arr[idx + 15], 22, 1236535329);

		n1 = md5gg(n1, n2, n3, n4, arr[idx + 1], 5, -165796510);
		n4 = md5gg(n4, n1, n2, n3, arr[idx + 6], 9, -1069501632);
		n3 = md5gg(n3, n4, n1, n2, arr[idx + 11], 14, 643717713);
		n2 = md5gg(n2, n3, n4, n1, arr[idx], 20, -373897302);
		n1 = md5gg(n1, n2, n3, n4, arr[idx + 5], 5, -701558691);
		n4 = md5gg(n4, n1, n2, n3, arr[idx + 10], 9, 38016083);
		n3 = md5gg(n3, n4, n1, n2, arr[idx + 15], 14, -660478335);
		n2 = md5gg(n2, n3, n4, n1, arr[idx + 4], 20, -405537848);
		n1 = md5gg(n1, n2, n3, n4, arr[idx + 9], 5, 568446438);
		n4 = md5gg(n4, n1, n2, n3, arr[idx + 14], 9, -1019803690);
		n3 = md5gg(n3, n4, n1, n2, arr[idx + 3], 14, -187363961);
		n2 = md5gg(n2, n3, n4, n1, arr[idx + 8], 20, 1163531501);
		n1 = md5gg(n1, n2, n3, n4, arr[idx + 13], 5, -1444681467);
		n4 = md5gg(n4, n1, n2, n3, arr[idx + 2], 9, -51403784);
		n3 = md5gg(n3, n4, n1, n2, arr[idx + 7], 14, 1735328473);
		n2 = md5gg(n2, n3, n4, n1, arr[idx + 12], 20, -1926607734);

		n1 = md5hh(n1, n2, n3, n4, arr[idx + 5], 4, -378558);
		n4 = md5hh(n4, n1, n2, n3, arr[idx + 8], 11, -2022574463);
		n3 = md5hh(n3, n4, n1, n2, arr[idx + 11], 16, 1839030562);
		n2 = md5hh(n2, n3, n4, n1, arr[idx + 14], 23, -35309556);
		n1 = md5hh(n1, n2, n3, n4, arr[idx + 1], 4, -1530992060);
		n4 = md5hh(n4, n1, n2, n3, arr[idx + 4], 11, 1272893353);
		n3 = md5hh(n3, n4, n1, n2, arr[idx + 7], 16, -155497632);
		n2 = md5hh(n2, n3, n4, n1, arr[idx + 10], 23, -1094730640);
		n1 = md5hh(n1, n2, n3, n4, arr[idx + 13], 4, 681279174);
		n4 = md5hh(n4, n1, n2, n3, arr[idx], 11, -358537222);
		n3 = md5hh(n3, n4, n1, n2, arr[idx + 3], 16, -722521979);
		n2 = md5hh(n2, n3, n4, n1, arr[idx + 6], 23, 76029189);
		n1 = md5hh(n1, n2, n3, n4, arr[idx + 9], 4, -640364487);
		n4 = md5hh(n4, n1, n2, n3, arr[idx + 12], 11, -421815835);
		n3 = md5hh(n3, n4, n1, n2, arr[idx + 15], 16, 530742520);
		n2 = md5hh(n2, n3, n4, n1, arr[idx + 2], 23, -995338651);

		n1 = md5ii(n1, n2, n3, n4, arr[idx], 6, -198630844);
		n4 = md5ii(n4, n1, n2, n3, arr[idx + 7], 10, 1126891415);
		n3 = md5ii(n3, n4, n1, n2, arr[idx + 14], 15, -1416354905);
		n2 = md5ii(n2, n3, n4, n1, arr[idx + 5], 21, -57434055);
		n1 = md5ii(n1, n2, n3, n4, arr[idx + 12], 6, 1700485571);
		n4 = md5ii(n4, n1, n2, n3, arr[idx + 3], 10, -1894986606);
		n3 = md5ii(n3, n4, n1, n2, arr[idx + 10], 15, -1051523);
		n2 = md5ii(n2, n3, n4, n1, arr[idx + 1], 21, -2054922799);
		n1 = md5ii(n1, n2, n3, n4, arr[idx + 8], 6, 1873313359);
		n4 = md5ii(n4, n1, n2, n3, arr[idx + 15], 10, -30611744);
		n3 = md5ii(n3, n4, n1, n2, arr[idx + 6], 15, -1560198380);
		n2 = md5ii(n2, n3, n4, n1, arr[idx + 13], 21, 1309151649);
		n1 = md5ii(n1, n2, n3, n4, arr[idx + 4], 6, -145523070);
		n4 = md5ii(n4, n1, n2, n3, arr[idx + 11], 10, -1120210379);
		n3 = md5ii(n3, n4, n1, n2, arr[idx + 2], 15, 718787259);
		n2 = md5ii(n2, n3, n4, n1, arr[idx + 9], 21, -343485551);

		n1 = safeAdd(n1, oldN1);
		n2 = safeAdd(n2, oldN2);
		n3 = safeAdd(n3, oldN3);
		n4 = safeAdd(n4, oldN4);
	}

	return [n1, n2, n3, n4];
}

function binl2rstr(input: number[]): string {
	let output = "";
	for(let idx = 0; idx < input.length * 32; idx += 8) {
		output += String.fromCharCode((input[idx >> 5] >>> idx % 32) & 0xff);
	}
	return output;
}

function rstr2binl(input: string): number[] {
	const output = Array(input.length >> 2).fill(0);
	for(let idx = 0; idx < output.length; idx++) {
		output[idx] = 0;
	}
	for(let idx = 0; idx < input.length * 8; idx += 8) {
		output[idx >> 5] |= (input.charCodeAt(idx / 8) & 0xff) << idx % 32;
	}
	return output;
}

function rstrMD5(input: string): string {
	return binl2rstr(binlmd5(rstr2binl(input), input.length * 8));
}

function rstrHMACMD5(key: string, data: string): string {
	let bkey = rstr2binl(key);
	if(bkey.length > 16) {
		bkey = binlmd5(bkey, key.length * 8);
	}

	const ipad = Array(16).fill(0);
	const opad = Array(16).fill(0);
	for(let idx = 0; idx < 16; idx++) {
		ipad[idx] = bkey[idx] ^ 0x36363636;
		opad[idx] = bkey[idx] ^ 0x5c5c5c5c;
	}

	const hash = binlmd5(ipad.concat(rstr2binl(data)), 512 + (data.length * 8));
	return binl2rstr(binlmd5(opad.concat(hash), 512 + 128));
}

function rstr2hex(input: string): string {
	const hexTab = "0123456789abcdef";
	let output = "";
	for(let idx = 0; idx < input.length; idx++) {
		const code = input.charCodeAt(idx);
		output += hexTab.charAt((code >>> 4) & 0x0f) + hexTab.charAt(code & 0x0f);
	}
	return output;
}

function str2rstrUTF8(input: string): string {
	return decodeURIComponent(encodeURIComponent(input));
}

function rawMD5(input: string): string {
	return rstrMD5(str2rstrUTF8(input));
}

function hexMD5(input: string): string {
	return rstr2hex(rstrMD5(str2rstrUTF8(input)));
}

function rawHMACMD5(key: string, data: string): string {
	return rstrMD5(str2rstrUTF8(key) + str2rstrUTF8(data));
}

function hexHMACMD5(key: string, data: string): string {
	return rstr2hex(rstrHMACMD5(str2rstrUTF8(key), str2rstrUTF8(data)));
}

export function md5(input: string, key?: string, raw?: boolean) {
	if(!key) {
		if(!raw) {
			return hexMD5(input);
		}
		return rawMD5(input);
	}
	if(!raw) {
		return hexHMACMD5(key, input);
	}
	return rawHMACMD5(key, input);
}
