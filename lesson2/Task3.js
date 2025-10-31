const a = true;
const b = true;
const c = true;

const d = c ? a || b : a && b;
let e;
if(c) {
    e = a || b;
}
else {
    e = a && b;
}