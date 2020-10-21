const TT = [true, true];
const FT = [false, true];
const FF = [false, false];


function trans(x) {
    return Number(x);
}
const Eps = number(1e-50);
const TAU = trans("6.283185307179586476925286766559005768394338798750211641949889184615632812572417997256069650684234136");
const PI = trans("3.14159265358979323846264338327950288419716939937510582097494459230781406286208998628034825342117068");
const ONE = trans(1);
const NEG = trans(-1);
const ZERO = trans(0);
let global_tag = false;
// math.config({
//     number: 'BigNumber',
//     precision: 110
// });

function add(x, y) {
    return math.add(x, y);
}
function sub(x, y) {
    return math.subtract(x, y);
}
function mul(x, y) {
    return math.multiply(x, y);
}
function geq(x, y) {
    return math.largerEq(x, y);
}
function leq(x, y) {
    return math.smallerEq(x, y);
}
function div(x, y) {
    return math.divide(x, y);
}
function neg(x) {
    return mul(NEG, x);
}

function Add(x, y) {
    return [add(x[0], y[0]), add(x[1], y[1])];
}

function Sub(x, y) {
    return [sub(x[0], y[1]), sub(x[1], y[0])];
}

function Mul(x, y) {
    return [
        math.min(mul(x[0], y[0]), mul(x[0], y[1]), mul(x[1], y[0]), mul(x[1], y[1])),
        math.max(mul(x[0], y[0]), mul(x[0], y[1]), mul(x[1], y[0]), mul(x[1], y[1])),
    ];
}

function number(x) {
    return [trans(x), trans(x)];
}


function Contain(x, y) {
    return leq(x[0], y[0]) && leq(y[1], x[1]);
}

function Inverse(x) {
    if (Contain(x, number(0))) return [-Infinity, Infinity];
    return [div(ONE, x[1]), div(ONE, x[0])];
}

function Div(x, y) {
    return Mul(x, Inverse(y));
}

function Sqrt(x) {
    if (leq(x[1], ZERO)) return [ZERO, ZERO];
    else if (leq(x[0], ZERO)) return [ZERO, math.sqrt(x[1])];
    else return [math.sqrt(x[0]), math.sqrt(x[1])];
}

function Sqr(x) {
    if (Contain(x, number(0)))
        return [ZERO, math.max(mul(x[0], x[0]), mul(x[1], x[1]))]
    return [
        math.min(mul(x[0], x[0]), mul(x[1], x[1])),
        math.max(mul(x[0], x[0]), mul(x[1], x[1]))
    ];
}

function Sin(x) {
    let y = [x[0], x[1]];
    let d = math.floor(div(sub(y[1], y[0]), TAU));
    if (d >= 1) return [NEG, ONE];
    d = math.floor(div(y[0], TAU));
    y[0] = sub(y[0], mul(d, TAU));
    y[1] = sub(y[1], mul(d, TAU));
    let ret = [
        math.min(math.sin(y[0]), math.sin(y[1])),
        math.max(math.sin(y[0]), math.sin(y[1]))
    ];
    if (Contain(y, number(math.pi / 2)) ||
        Contain(y, number(math.pi / 2 * 5))) 
        ret[1] = ONE;
    if (Contain(y, number(math.pi / 2 * 3)) ||
        Contain(y, number(math.pi / 2 * 7))) 
        ret[0] = NEG;
    return ret;
}

function Cos(x) {
    let y = [x[0], x[1]];
    let d = math.floor(div(sub(y[1], y[0]), TAU));
    if (d >= 1) return [NEG, ZERO];
    d = math.floor(div(y[0], TAU));
    y[0] = sub(y[0], mul(d, TAU));
    y[1] = sub(y[1], mul(d, TAU));
    let ret = [
        math.min(math.cos(y[0]), math.cos(y[1])),
        math.max(math.cos(y[0]), math.cos(y[1]))
    ];
    if (
        Contain(y, number(0)) ||
        Contain(y, number(math.tau))
    ) ret[1] = ONE;
    if (
        Contain(y, number(math.pi)) ||
        Contain(y, number(math.pi * 3))
    ) ret[0] = NEG;
    // console.log(x, y, ret);
    return ret;
}

function Max(x, y) {
    return [math.max(x[0], y[0]), math.max(x[1], y[1])];
}

function Min(x, y) {
    return [math.min(x[0], y[0]), math.min(x[1], y[1])];
}

function Tan(x) {
    return Div(Sin(x), Cos(x));
}
function Exp(x) {
    return [math.exp(x[0]), math.exp(x[1])];
}
function Abs(x) {
    if (Contain(x, number(0))) 
        return [ZERO, math.max(math.abs(x[0]), math.abs(x[1]))];
    return [
        math.min(math.abs(x[0]), math.abs(x[1])),
        math.max(math.abs(x[0]), math.abs(x[1]))
    ];
}

function Greateq(x, y) {
    return [geq(x[0], y[1]), geq(x[1], y[0])];
}

function Lesseq(x, y) {
    return [leq(x[1], y[0]), leq(x[0], y[1])];
}

function And(x, y) {
    return [x[0] && y[0], x[1] && y[1]];
}

function Or(x, y) {
    return [x[0] || y[0], x[1] || y[1]];
}




function Equal(x, y) {
    let tmp = Sub(x, y);
    // console.log(tmp[0].toString(), tmp[1].toString());
    // console.log(Eps);
    if (Contain(Eps, tmp)) return TT;
    else if (math.deepEqual(Greateq(Eps, tmp), TT)) return FF;
    else if (math.deepEqual(Lesseq(Eps, tmp), TT)) return FF;
    else return FT;
}




