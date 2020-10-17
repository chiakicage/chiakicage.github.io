const TT = [true, true];
const FT = [false, true];
const FF = [false, false];

function Add(x, y) {
    return [math.add(x[0], y[0]), math.add(x[1], y[1])];
}

function Sub(x, y) {
    return [math.subtract(x[0], y[1]), math.subtract(x[1], y[0])];
}

function Mul(x, y) {
    return [
        math.min(
            math.multiply(x[0], y[0]), 
            math.multiply(x[0], y[1]), 
            math.multiply(x[1], y[0]), 
            math.multiply(x[1], y[1])
        ),
        math.max(
            math.multiply(x[0], y[0]),
            math.multiply(x[0], y[1]),
            math.multiply(x[1], y[0]),
            math.multiply(x[1], y[1])
        )
    ];
}

function number(x) {
    return [x, x];
}


function Contain(x, y) {
    return math.smallerEq(x[0], y[0]) && math.smallerEq(y[1], x[1]);
}

function Inverse(x) {
    if (Contain(x, number(0))) return [-Infinity, Infinity];
    return [math.divide(1, x[1]), math.divide(1, x[0])];
}

function Div(x, y) {
    return Mul(x, inverse(y));
}

function Sqrt(x) {
    if (x[1] < 0) return [0, 0];
    else if (x[0] < 0) return [0, math.sqrt(x[1])];
    else return [math.sqrt(x[0]), math.sqrt(x[1])];
}

function Sin(x) {
    let y = [x[0], x[1]];
    let d = math.floor((y[1] - y[0]) / math.tau);
    if (d >= 1) return [-1, 1];
    if (y[0] < 0) {
        d = math.floor(y[0] / math.tau);
        y[0] -= (d + 1) * math.tau, y[1] -= (d + 1) * math.tau;
    } else {
        d = math.floor(y[0] / math.tau);
        y[0] -= d * math.tau, y[1] -= d * math.tau;
    }
    let ret = [
        math.min(math.sin(y[0]), math.sin(y[1])),
        math.max(math.sin(y[0]), math.sin(y[1]))
    ];
    if (Contain(y, number(math.pi / 2))) ret[1] = 1
    if (Contain(y, number(math.pi / 2 * 3))) ret[0] = -1
    return ret; 
}

function Abs(x) {
    if (Contain(x, 0)) return [0, math.max(math.abs(x[0]), math.abs(x[1]))];
    return [
        math.min(math.abs(x[0]), math.abs(x[1])),
        math.max(math.abs(x[0]), math.abs(x[1]))
    ];
}

function Greateq(x, y) {
    return [math.largerEq(x[0], y[1]), math.largerEq(x[1], y[0])];
}

function Lesseq(x, y) {
    return [math.smallerEq(x[1], y[0]), math.smallerEq(x[0], y[1])];
}

function And(x, y) {
    return [x[0] && y[0], x[1] && y[1]];
}

function Or(x, y) {
    return [x[0] || y[0], x[1] || y[1]];
}


const Eps = number(1e-10);

function Equal(x, y) {
    let tmp = Sub(x, y);
    // console.log(tmp[0].toString(), tmp[1].toString());
    // console.log(Eps);
    if (Contain(Eps, tmp)) return TT;
    else if (math.deepEqual(Greateq(Eps, tmp), TT)) return FF;
    else if (math.deepEqual(Lesseq(Eps, tmp), TT)) return FF;
    else return FT;
}



let canvas = document.getElementById('drawer');
let ctx = canvas.getContext('2d');

function paintRed(rec) {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        rec[0][0], 
        rec[1][0], 
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}

function paintBlack(rec) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(
        rec[0][0],
        rec[1][0],
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}

function paintWhite(rec) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(
        rec[0][0],
        rec[1][0],
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}


function evaluate(value) {
    // return Equal(Sin(value[0]), value[1]);
    return Equal(Add(Mul(Sub(value[0], number(3)), Sub(value[0], number(3))), Mul(Sub(value[1], number(3)), Sub(value[1], number(3)))), number(25));
    return Equal(Add(value[1], number(4)), Mul(number(1), Mul(Sub(value[0], number(4)), value[0])));
    return Equal(
            Sub(
                Mul(
                    number(4),
                    Add(Mul(value[0], value[0]), Mul(value[1], value[1]))
                ),
                Mul(number(7), Mul(value[0], value[1]))
            ),
            number(50));
}

const TIME = 0;
const BLOCK = 1;

function Graph(value, pixiv) {
    // console.log(value[0][0].toString());
    // console.log(pixiv[0], pixiv[1]);
    // console.log(123);
    if (pixiv[0][1] - pixiv[0][0] + 1 === BLOCK) {
        // console.log(value[0], value[1]);
        // console.log(evaluate(value));
        paintBlack(pixiv);
        return;
    }

    let midv = [
        math.divide(math.add(value[0][0], value[0][1]), 2),
        math.divide(math.add(value[1][0], value[1][1]), 2)
    ];
    let midp = [
        math.floor((pixiv[0][0] + pixiv[0][1]) / 2),
        math.floor((pixiv[1][0] + pixiv[1][1]) / 2)
    ];

    let v1 = [
        [value[0][0], midv[0]],
        [midv[1], value[1][1]]
    ];
    let v2 = [
        [midv[0], value[0][1]],
        [midv[1], value[1][1]]
    ];
    let v3 = [
        [value[0][0], midv[0]],
        [value[1][0], midv[1]]
    ];
    let v4 = [
        [midv[0], value[0][1]],
        [value[1][0], midv[1]]
    ]

    let p1 = [
        [pixiv[0][0], midp[0]],
        [pixiv[1][0], midp[1]]
    ];
    let p2 = [
        [midp[0] + 1, pixiv[0][1]],
        [pixiv[1][0], midp[1]]
    ]
    let p3 = [
        [pixiv[0][0], midp[0]],
        [midp[1] + 1, pixiv[1][1]]
    ];
    let p4 = [
        [midp[0] + 1, pixiv[0][1]],
        [midp[1] + 1, pixiv[1][1]]
    ];

    let tmp = evaluate(v1);
    if (math.deepEqual(tmp, TT)) paintBlack(p1);
    else if (math.deepEqual(tmp, FF)) paintWhite(p1);
    else {
        setTimeout(() => {
            Graph(v1, p1);
        }, TIME);
    }
    tmp = evaluate(v2);
    if (math.deepEqual(tmp, TT)) paintBlack(p2);
    else if (math.deepEqual(tmp, FF)) paintWhite(p2);
    else {
        setTimeout(() => {
            Graph(v2, p2);
        }, TIME);
    }
    tmp = evaluate(v3);
    if (math.deepEqual(tmp, TT)) paintBlack(p3);
    else if (math.deepEqual(tmp, FF)) paintWhite(p3);
    else {
        setTimeout(() => {
            Graph(v3, p3);
        }, TIME);
    }
    tmp = evaluate(v4);
    if (math.deepEqual(tmp, TT)) paintBlack(p4);
    else if (math.deepEqual(tmp, FF)) paintWhite(p4);
    else {
        setTimeout(() => {
            Graph(v4, p4);
        }, TIME);
    }

}
value = [
    [-10, 10], [-10, 10]
];
pixiv = [[0, 511], [0, 511]];

paintRed(pixiv);
Graph(value, pixiv);
