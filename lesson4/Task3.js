const obj = {
	prop1: null,
	prop2: {},
	prop3: 3,
	prop4: 'str',
	prop5: 100,
}
const result = {};
for(const value of Object.values(obj)) {
	let key = value === null ? null : typeof(value);
	result[key] = (result[key] || 0) + 1;
}
console.log(result); // {null: 1, object: 1, string: 1, number: 2}