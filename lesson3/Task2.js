const array = [2,3,4,1,2,3,4,5]
let isSortedArray = true;

for(let i = 1; i < array.length; i++) {
    if(array[i] < array[i - 1]) {
        isSortedArray = false;
        break;
    }
}
console.log(isSortedArray);