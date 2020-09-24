// let searchbox = document.getElementById('search-box');
// let searchbutton = document.getElementById('search-button');
let addtask = document.getElementById('taskinfo');
let addbutton = document.getElementById('task-add');
let tasklist1 = document.getElementById('todoTask1');
let tasklist2 = document.getElementById('todoTask2');
let taskCount = 0;
// console.log(searchbox, searchbutton, taskmsg, addbutton);

function enterAdd(e) {
    if (e.keyCode == 13)
        addbutton.click();
}

let upd = new XMLHttpRequest();
let rm = new XMLHttpRequest();
let add = new XMLHttpRequest();
let url = 'http://localhost:8000/'

add.onreadystatechange = function () {
    console.log('123');
}

function updateTask(id, value, group) {
    upd.open('GET', url + 'update?id=' + String(id) + '&value=' + String(value) + '&group=' + String(group));
    upd.send();
}

function removeTask(id) {
    rm.open('GET', url + 'remove?id=' + String(id));
    rm.send();
}

function addTask(id, value) {
    add.open('GET', url + 'add?id=' + String(id) + '&value=' + String(value));
    add.send();
}

function addTaskn(value, group, id) {
    let d = document.createElement('div');
    d.setAttribute('class', 'task-item');
    d.setAttribute('id', String(id));
    let pt = document.createElement('input');
    pt.setAttribute('id', 'test' + String(taskCount));
    pt.setAttribute('type', 'checkbox');
    pt.setAttribute('style', 'zoom:180%');
    pt.setAttribute('class', 'check-box');
    let lb = document.createElement('input');
    lb.setAttribute('value', value);
    lb.setAttribute('edited', value);
    lb.setAttribute('class', 'taskmsg-on');
    lb.setAttribute('type', 'text');
    lb.setAttribute('editing', 'false');
    lb.onfocus = function () {
        if (lb.getAttribute('editing') === 'false')
            lb.blur();
    }
    lb.onblur = function () {
        lb.setAttribute('editing', 'false');
        if (lb.getAttribute('edited') !== lb.getAttribute('value')) {
            updateTask(d.getAttribute('id'), lb.getAttribute('value'), lb.getAttribute('class') === 'taskmsg-on' ? 1 : 2);
            lb.getAttribute('edited') = lb.getAttribute('value');
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
    de.setAttribute('src', 'images/trash-can.svg');
    de.setAttribute('class', 'del');
    de.onclick = function () {
        d.parentElement.removeChild(d);
        removeTask(d.getAttribute('id'));
    }
    let ed = document.createElement('img');
    ed.setAttribute('src', 'images/pencil.svg');
    ed.setAttribute('class', 'edit');
    ed.onclick = function () {
        lb.setAttribute('editing', 'true');
        lb.focus();
    }
    d.appendChild(pt);
    d.appendChild(lb);
    d.appendChild(ed);
    d.appendChild(de);
    tasklist1.appendChild(d);
    if (group === 2) {
        pt.click();
    }
}


function initialize() {
    let init = new XMLHttpRequest();
    init.onreadystatechange = function () {
        if (init.readyState === 4) {
            if (init.status === 200) {
                arr = JSON.parse(init.responseText) || [];
                // console.log(arr);
                arr.forEach(element => {
                    return addTaskn(element.value, element.group, element.id);
                });
                console.log(arr);
            } else {
                alert('Failed');
            }
        }
    }
    init.open('GET', url + 'init');
    init.send();
    let init2 = new XMLHttpRequest();
    init2.onreadystatechange = function () {
        if (init2.readyState === 4) {
            if (init2.status === 200) {
                taskCount = Number(init2.responseText);
                console.log(taskCount);
            } else {
                alert('Failed');
            }
        }
    }
    init2.open('GET', url + 'init2');
    init2.send();
}
addbutton.onclick = function () {
    if (addtask.value === "") {
        return;
    } else {
        addTaskn(addtask.value, 1, ++taskCount);
        addTask(taskCount, addtask.value);
        addtask.value = "";
    }
}

initialize();

// addtask.value = "?";
// addbutton.click();

