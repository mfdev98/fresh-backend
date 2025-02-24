console.log('ZU-TASK');

// ZU-TASK:
// Shunday function yozing, u parametridagi array ichida takrorlanmagan
// raqamlar yig'indisini qaytarsin. MASALAN: sumOfUnique([1,2,3,2]) return 4

function sumOfUnique(nums: number[]) {
	console.log(nums.filter((num) => nums.indexOf(num) === nums.lastIndexOf(num)).reduce((sum, num) => sum + num, 0));
}

sumOfUnique([1, 2, 3, 2]);

console.log('ZT-TASK');

// ZT-TASK:
// Shunday function yozing, u parametridagi string ichida 1 martadan ortiq qaytarilmagan birinchi
// harf indeksini qaytarsin. MASALAN: firstUniqueCharIndex(“stamp”) return 0

// function firstUniqueCharIndex(str: string): number {
// 	for (let i = 0; i < str.length; i++) {
// 		const char = str[i];
// 		if (str.indexOf(char) === str.lastIndexOf(char)) {
// 			return i;
// 		}
// 	}

// 	return -1;
// }

// console.log(firstUniqueCharIndex('stamp'));

console.log('ZS-TASK');

// ZS-TASK:
// Shunday function yozing, u parametridagi arrayni ichidagi 1 marta kelgan elemnetni qaytarsin.
// MASALAN: singleNumber([4, 2, 1, 2, 1]) return 4

// function singleNumber(nums: number[]) {
// 	console.log(nums.reduce((acc, num) => acc ^ num, 0));
// }

// singleNumber([4, 2, 1, 2, 1]);

console.log('ZR-TASK');

// ZR-TASK:

// Shunday function yozing, u parametridagi string ichidagi raqam va sonlarni sonini sanasin.
// MASALAN: countNumberAndLetters(“string152%\¥”) return {number:3, letter:6}

// function countNumberAndLetters(str: string) {
// 	let result = {
// 		number: 0,
// 		letter: 0,
// 	};

// 	for (let i = 0; i < str.length; i++) {
// 		let char = str[i];

// 		if (char >= '0' && char <= '9') {
// 			result.number++;
// 		} else if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
// 			result.letter++;
// 		}
// 	}

// 	console.log(result);
// }

// countNumberAndLetters('string152%¥');

console.log('ZQ-TASK');

// ZQ-TASK:

// Shunday function yozing, u parametridagi array ichida 2 marta qaytarilgan sonlarni alohida araryda qaytarsin.
// MASALAN: findDuplicates([1,2,3,4,5,4,3,4]) return [3, 4]

// function findDuplicates(arr: number[]) {
// 	console.log(arr.filter((item, index) => arr.indexOf(item) === index && arr.lastIndexOf(item) !== index));
// }

// findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]);

console.log('ZP-TASK');

// ZP-TASK:

// shunday function yozing, u 2 ta array parametr qabul qilsin. Siz bu ikki arrayning qiymatlari o'xshash bo'lishini (ya'ni, ularning barcha elementlari bir xil bo'lishini) tekshirishingiz kerak.

// MASALAN:
// areArraysEqual([1, 2, 3], [3, 1, 2]) // true
// areArraysEqual([1, 2, 3], [3, 1, 2, 1]) // true
// areArraysEqual([1, 2, 3], [4, 1, 2]) // false

// function areArraysEqual(arr1: number[], arr2: number[]): boolean {
// 	if (arr1.length !== arr2.length) {
// 		return false;
// 	}

// 	const newArr1 = arr1.slice().sort((a, b) => a - b);
// 	const newArr2 = arr2.slice().sort((a, b) => a - b);

// 	for (let i = 0; i < newArr1.length; i++) {
// 		if (newArr1[i] !== newArr2[i]) {
// 			return false;
// 		}
// 	}

// 	return true;
// }

// console.log(areArraysEqual([1, 2, 3], [3, 1, 2]));
// console.log(areArraysEqual([1, 2, 3], [3, 1, 2, 1]));
// console.log(areArraysEqual([1, 2, 3], [4, 1, 2]));

console.log('ZO-TASK');

// ZO - TASK:

// Shunday function yozing, u parametrdagi string ichidagi qavslar miqdori balansda
// ekanligini aniqlasin.Ya'ni ochish("(") va yopish(")") qavslar soni bir xil bolishi kerak.
// MASALAN: areParenthesesBalanced("string()ichida(qavslar)soni()balansda") return true

// function areParenthesesBalanced(input: string): boolean {
// 	let balance = 0;

// 	for (let char of input) {
// 		if (char === '(') balance++;
// 		if (char === ')') balance--;
// 		if (balance < 0) return false;
// 	}

// 	return balance === 0;
// }

// console.log(areParenthesesBalanced('string()ichida(qavslar)soni()balansda'));

console.log('ZN-TASK');

// ZN-TASK:

// Shunday function yozing, uni array va number parametri bolsin.Ikkinchi
// parametrda berilgan raqamli indexgacha arrayni orqasiga ogirib qaytarsin.
// 	MASALAN: rotateArray([1, 2, 3, 4, 5, 6], 3) return [5, 6, 1, 2, 3, 4]

// function rotateArray(arr: number[], num: number) {
// 	const a = arr.slice(-num);
// 	const b = arr.slice(0, arr.length - num);
// 	console.log(a.concat(b));
// }

// rotateArray([1, 2, 3, 4, 5, 6], 3);

console.log('ZM-TASK');

// ZM - TASK:
// Shunday function yozing, u function parametrga berilgan raqamlarni orqasiga
// ogirib qaytarsin. MASALAN: reverseInteger(123456789) return 987654321

// function reverseInteger(num: number) {
// 	let a = num.toString();
// 	num = parseInt(a.split('').reverse().join(''));
// 	console.log(num);
// }
// reverseInteger(123456789);

console.log('ZL-TASK');

// ZL-TASK:
// Shunday function yozing, u parametrda berilgan stringni kebab casega
// otkazib qaytarsin. Bosh harflarni kichik harflarga ham otkazsin.
// MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab”

// function stringToKebab(str: string): string {
// 	return str
// 		.replace(/\s+/g, '-')
// 		.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())
// 		.replace(/^-+/, '')
// 		.toLowerCase();
// }

// console.log(stringToKebab('I love Kebab'));
// console.log(stringToKebab('HelloWorld'));

console.log('Zk-TASK');

// ZK - TASK:
// Shunday function yozing, u har soniyada bir marta consolega 1 dan 5 gacha
// bolgan raqamlarni chop etsin va 5 soniyadan keyin ishini toxtatsin.
// MASALAN: printNumbers()
// function printNumbers() {
// 	const schedule = require('node-schedule');
// 	const startTime = new Date(Date.now());
// 	const endTime = new Date(startTime.getTime() + 5000);
// 	const job = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function () {
// 		console.log('1 2 3 4 5');
// 	});
// }

// printNumbers();

console.log('ZJ-TASK');

// ZJ-TASK:
// Shunday function yozing, u berilgan arrayni ichidagi numberlarni qiymatini
// hisoblab qaytarsin.MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8

// function reduceNestedArray(arr: any[]) {
// 	console.log(arr.flat(Infinity).reduce((sum, num) => sum + num, 0));
// }

// reduceNestedArray([1, [1, 2, [4]]]);
