// Lesson2 Task1 - Проверка чисел a, b, c
function checkNumbers(a, b, c) {
    if(a < 0 || b < 0 || c < 0 || a + b + c === 100) {
        console.log('нет');
    }
    if(b + c < a) {
        console.log(-1);
    }
    if(a + b + c < 0) {
        console.log(500);
    }
    if(a + b + c > 0) {
        console.log(0);
    }
}

// Lesson2 Task2 - Проверка суммы a и b
function checkSum(a, b) {
    if(a + b > 100) {
        console.log('Да');
    } else {
        console.log('Нет');
    }
}

// Lesson2 Task3 - Логические операции с тернарным оператором
function logicalOperationTernary(a, b, c) {
    const d = c ? a || b : a && b;
    return d;
}

// Lesson2 Task3 - Логические операции с if-else
function logicalOperationIfElse(a, b, c) {
    let e;
    if(c) {
        e = a || b;
    } else {
        e = a && b;
    }
    return e;
}

// Lesson3 Task1 - Копирование массива
function copyArray(array) {
    return [...array];
}

// Lesson3 Task2 - Проверка отсортированности массива
function isSortedArray(array) {
    for(let i = 1; i < array.length; i++) {
        if(array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

// Lesson3 Task3 - Сортировка нечетных значений
function sortOddValues(arr) {
    const oddArr = arr.filter(item => item % 2 !== 0).sort((a, b) => a - b);
    const sortedArr = [];
    let j = 0;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] % 2 === 0) {
            sortedArr.push(arr[i]);
        } else {
            sortedArr.push(oddArr[j]);
            j++;
        }
    }
    return sortedArr;
}

// Lesson4 Task1 - Проверка пустоты объекта
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Lesson4 Task2 - Фильтрация четных значений объекта
function filterEvenValues(obj) {
    const resultObj = {};
    for(const [key, value] of Object.entries(obj)) {
        if(value % 2 === 0) {
            resultObj[key] = value;
        }
    }
    return resultObj;
}

// Lesson4 Task3 - Подсчет типов данных в объекте
function countDataTypes(obj) {
    const result = {};
    for(const value of Object.values(obj)) {
        let key = value === null ? null : typeof value;
        result[key] = (result[key] || 0) + 1;
    }
    return result;
}

