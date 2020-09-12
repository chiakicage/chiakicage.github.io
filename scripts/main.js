let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'images/koishi.png') {
        myImage.setAttribute('src', 'images/koishi2.png');
    } else {
        myImage.setAttribute('src', 'images/koishi.png');
    }
}
