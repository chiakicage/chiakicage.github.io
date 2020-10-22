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

input.onkeydown = (e) => {
    if (e.keyCode === 13) {
        init(input.value);
        // console.log(input.value);
        try {
            paintRed(pixiv);
            Graph(value, pixiv);
        } catch (e) {
            console.log(e);
        }
    } 
}
