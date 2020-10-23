value = [
    [trans(-10), trans(10)], [trans(-10), trans(10)]
];
pixiv = [[0, 511], [0, 511]];

// paintRed(pixiv);
// Graph(value, pixiv);

// document.onmousedown = (e) => {
//     e = e || window.event;
//     console.log(e.clientX - canvas.offsetLeft - 1, e.clientY - canvas.offsetTop - 1);
// }

let input = document.querySelector('#formula');

function transExpr(s) {
    let ret = '';
    for (let c of s) {
        if (c === '=') ret += '==';
        else ret += c;
    }
    return ret;
}

input.onkeydown = (e) => {
    if (e.keyCode === 13) {
        init(input.value);
        console.log(input.value);

        katex.render(
            math.parse(transExpr(input.value)).toTex(), 
            document.getElementById("katex"),
            {
                displayMode : true,
                
            });
        try {
            paintRed(pixiv);
            Graph(value, pixiv);
        } catch (e) {
            console.log(e);
        }
    } 
}
