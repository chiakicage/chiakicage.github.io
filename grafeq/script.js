


function evaluate(value) {
    // if (global_tag) {
    //     console.log(value[0].toString());
    //     console.log(value[1].toString());
    //     console.log(Add(Sin(value[0]), Cos(value[1])).toString());
    //     console.log(Sin(Add(Sin(value[0]), Cos(value[1]))).toString());
    //     console.log(Add(Sin(Mul(value[0], value[1])), Cos(value[0])).toString());
    //     console.log(Cos(Add(Sin(Mul(value[0], value[1])), Cos(value[0]))).toString());
    // }
    // console.log(value);
    // return Equal(Abs(Sin(Sub(Sqr(value[0]), Sqr(value[1])))), Add(Sin(Add(value[0], value[1])), Cos(Mul(value[0], value[1]))));
    return Equal(Sin(Add(Sin(value[0]), Cos(value[1]))), Cos(Add(Sin(Mul(value[0], value[1])), Cos(value[0]))));
    // return Equal(Max(Abs(value[0]), Sqr(value[0])), value[1]);
    // return Equal(Sin(Sqr(value[0]), Sqr(value[1])), Cos(Mul(value[0], value[1])));
    // return Equal(Exp(Add(Sin(value[0]), Cos(value[1]))), Sin(Exp(Add(value[0], value[1]))));
    // return Greateq(Sin(value[0]), value[1]);
    // return Equal(Sqr(Sub(value[0], number(3))), value[1]);
    // return Equal(Add(value[1], number(4)), Mul(number(1), Mul(Sub(value[0], number(4)), value[0])));
    return Greateq(
        Mul(
            Sub(value[1], number(-5)), 
            Cos(Mul(number(4), Sqrt(Add(Sqr(Sub(value[0], number(4))), Sqr(value[1])))))),
        Mul(value[0], Sin(Mul(number(2), Sqrt(Add(Sqr(value[0]), Sqr(value[1])))))));

    return Equal(
        Sub(
            Mul(
                number(4),
                Add(Sqr(value[0]), Sqr(value[1]))
            ),
            Mul(number(7), Mul(value[0], value[1]))
        ),
        number(50));
}

let canvas = document.getElementById('drawer');
let ctx = canvas.getContext('2d');

function paintRed(rec) {
    // console.log(rec[0], rec[1]);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
        rec[0][0],
        rec[1][0],
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}

function paintBlack(rec) {
    // return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(
        rec[0][0],
        rec[1][0],
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}

function paintWhite(rec) {
    // console.log(rec[0], rec[1]);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(
        rec[0][0],
        rec[1][0],
        rec[0][1] - rec[0][0] + 1,
        rec[1][1] - rec[1][0] + 1
    );
}

const TIME = 1;
const BLOCK = 1;

function Graphing(v, p) {
    setTimeout(() => {
        Graph(v, p);
    }, TIME);    
}

function Graph(value, pixiv) {
    if (math.deepEqual(pixiv, [[256, 511], [0, 255]])) {
        // console.log("test");
        // console.log(value[0], value[1]);
        // console.log(evaluate(value));
    }
    // console.log(value[0][0].toString());
    // console.log(pixiv[0], pixiv[1]);
    // console.log(123);
    if (pixiv[0][1] - pixiv[0][0] + 1 === BLOCK) {
        // console.log(value[0], value[1]);
        // console.log(evaluate(value));
        paintBlack(pixiv);
        return;
    }
    
    // console.log(value);
    let midv = [
        div(add(value[0][0], value[0][1]), 2),
        div(add(value[1][0], value[1][1]), 2)
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
    else Graphing(v1, p1);
    tmp = evaluate(v2);
    if (math.deepEqual(tmp, TT)) paintBlack(p2);
    else if (math.deepEqual(tmp, FF)) paintWhite(p2);
    else Graphing(v2, p2);
    if (p3[0][0] === 256 && p3[1][0] === 64) 
        global_tag = true;
    tmp = evaluate(v3);
    global_tag = false;
    // console.log(Sin(v3[0]), v3[0]);
    if (math.deepEqual(tmp, TT)) paintBlack(p3);
    else if (math.deepEqual(tmp, FF)) paintWhite(p3);
    else Graphing(v3, p3);
    tmp = evaluate(v4);
    if (math.deepEqual(tmp, TT)) paintBlack(p4);
    else if (math.deepEqual(tmp, FF)) paintWhite(p4);
    else Graphing(v4, p4);

}
value = [
    [trans(-10), trans(10)], [trans(-10), trans(10)]
];
pixiv = [[0, 511], [0, 511]];

paintRed(pixiv);
Graph(value, pixiv);

document.onmousedown = (e) => {
    e = e || window.event;
    console.log(e.clientX - canvas.offsetLeft - 1, e.clientY - canvas.offsetTop - 1);
}
