const arr = [5, 1, 16, -3, -4, 3, 2, 13, 7];
const oddArr = arr.filter(item => item % 2 !== 0).sort((a, b) => a - b);

const sortedArr = [];
let j = 0;

for(let i = 0; i < arr.length; i++) {
    if(arr[i] % 2 === 0) {
        sortedArr.push(arr[i]);
    }
    else {
        sortedArr.push(oddArr[j]);
        j++;
    }
}
console.log(sortedArr);