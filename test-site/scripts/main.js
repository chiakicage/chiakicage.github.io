// let searchbox = document.getElementById('search-box');
// let searchbutton = document.getElementById('search-button');
let addtask = document.getElementById('taskinfo');
let addbutton = document.getElementById('task-add');
let tasklist1 = document.getElementById('todoTask1');
let tasklist2 = document.getElementById('todoTask2');
let taskCount = 0;
// console.log(searchbox, searchbutton, taskmsg, addbutton);

let toggle1 = document.getElementById('toggle1');
let toggle2 = document.getElementById('toggle2');

toggle1.onclick = function () {
    if (tasklist1.hasAttribute('hidden')) {
        toggle1.setAttribute('style', 'transform: rotate(90deg)');
        tasklist1.removeAttribute('hidden');
    } else {
        toggle1.setAttribute('style', 'transform: rotate(0deg)');
        tasklist1.setAttribute('hidden', '');
    }
}
toggle2.onclick = function () {
    if (tasklist2.hasAttribute('hidden')) {
        toggle2.setAttribute('style', 'transform: rotate(90deg)');
        tasklist2.removeAttribute('hidden');
    } else {
        toggle2.setAttribute('style', 'transform: rotate(0deg)');
        tasklist2.setAttribute('hidden', '');
    }
}



function enterAdd(e) {
    if (e.keyCode == 13)
        addbutton.click();
}

let upd = new XMLHttpRequest();
let rm = new XMLHttpRequest();
let add = new XMLHttpRequest();
// let url = 'http://[2001:da8:e009:1547:4dad:24ea:9c01:d7aa]'
// let url = 'http://[2001:da8:e009:2a3a:4dad:24ea:9c01:d7aa]:8000/'
let url = 'http://localhost:8000/';

function updateTask(id, value, group) {
    // console.log('update');
    upd.open('GET', url + 'api/update?id=' + String(id) + '&value=' + encodeURIComponent(String(value)) + '&group=' + String(group));
    upd.send();
}

function removeTask(id) {
    rm.open('GET', url + 'api/remove?id=' + String(id));
    rm.send();
}

function addTask(value) {
    console.log('add ' + value);
    add.open('GET', url + 'api/add?value=' + encodeURIComponent(String(value)));
    add.send();
}

add.onreadystatechange = function() {
    if (add.readyState === 4) {
        if (add.status === 200) {
            taskCount = Number(add.responseText);
        } else {
            alert('Insert Failed.');
        }
    }
}

function addTaskn(value, group, id) {
    let d = document.createElement('div');
    d.setAttribute('class', 'task-item');
    d.setAttribute('id', String(id));
    let pt = document.createElement('input');
    pt.setAttribute('id', 'test' + String(id));
    pt.setAttribute('type', 'checkbox');
    pt.setAttribute('style', 'zoom:180%');
    pt.setAttribute('class', 'check-box');
    let lb = document.createElement('input');
    lb.edited = lb.value = value;
    if (group === 1) {
        tasklist1.appendChild(d);
        lb.className = 'taskmsg-on';
    } else {
        tasklist2.appendChild(d);
        lb.className = 'taskmsg-off';
        pt.checked = true;
    }
    lb.setAttribute('type', 'text');
    lb.setAttribute('editing', 'false');
    lb.onfocus = function () {
        if (lb.getAttribute('editing') === 'false')
            lb.blur();
    }
    lb.onblur = function () {
        lb.setAttribute('editing', 'false');
        if (lb.edited !== lb.value) {
            updateTask(d.getAttribute('id'), lb.value, lb.getAttribute('class') === 'taskmsg-on' ? 1 : 2);
            lb.edited = lb.value;
        }
    }
    pt.onclick = function () {
        if (lb.getAttribute('class') === 'taskmsg-on') {
            lb.setAttribute('class', 'taskmsg-off');
            updateTask(d.getAttribute('id'), lb.getAttribute('value'), 2);
            tasklist2.appendChild(tasklist1.removeChild(d))
        } else {
            lb.setAttribute('class', 'taskmsg-on');
            updateTask(d.getAttribute('id'), lb.getAttribute('value'), 1);
            tasklist1.appendChild(tasklist2.removeChild(d))
        }
    }
    let de = document.createElement('img');
    de.setAttribute('src', 'images/trash-can.png');
    de.setAttribute('class', 'del');
    de.onclick = function () {
        d.parentElement.removeChild(d);
        removeTask(d.getAttribute('id'));
    }
    let ed = document.createElement('img');
    ed.setAttribute('src', 'images/pencil.png');
    ed.setAttribute('class', 'edit');
    ed.onclick = function () {
        lb.setAttribute('editing', 'true');
        lb.focus();
    }
    d.appendChild(pt);
    d.appendChild(lb);
    d.appendChild(ed);
    d.appendChild(de);
    
}


function initialize() {
    let init = new XMLHttpRequest();
    init.onreadystatechange = function () {
        if (init.readyState === 4) {
            // alert(init.responseText);
            if (init.status === 200) {
                arr = JSON.parse(init.responseText) || [];
                console.log(arr);
                arr.forEach(element => {
                    return addTaskn(decodeURIComponent(element.value), element.group, element.id);
                });
                console.log(arr);
            } else {
                alert('Init Failed');
            }
        }
    }
    console.log('sending');
    init.open('GET', url + 'api/init');
    init.send();
}
addbutton.onclick = function () {
    if (addtask.value === "") {
        return;
    } else {
        addTask(addtask.value);
        addTaskn(addtask.value, 1, taskCount);
        addtask.value = "";
    }
}

console.log('123');
initialize();

// addtask.value = "?";
// addbutton.click();

