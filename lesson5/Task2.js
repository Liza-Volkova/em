const arrKeysOrValues = (obj, str = 'keys') => {
    if(obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }
    if(str === 'keys') {
        return Object.keys(obj);
    }
    if(str === 'values') {
        return Object.values(obj);
    }
}

function arrKeysOrValues1(obj, str = 'keys') {
    if(obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return false;
    }
    if(str === 'keys') {
        return Object.keys(obj);
    }
    if(str === 'values') {
        return Object.values(obj);
    }
}