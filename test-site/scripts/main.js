// let searchbox = document.getElementById('search-box');
// let searchbutton = document.getElementById('search-button');
let addtask = document.getElementById('taskinfo');
let addbutton = document.getElementById('task-add');
let tasklist1 = document.getElementById('todoTask1');
let tasklist2 = document.getElementById('todoTask2');
// console.log(searchbox, searchbutton, taskmsg, addbutton);

function enterAdd(e) {
    if (e.keyCode == 13) 
        addbutton.click();
}

function Update() {
    
}
// function 

addbutton.onclick = function () {
    if (addtask.value === "") {
        return;
    } else {
        let d = document.createElement('div');
        d.setAttribute('class', 'task-item');
        let pt = document.createElement('input');
        // pt.setAttribute('id', 'task' + String(taskCount));
        pt.setAttribute('type', 'checkbox');
        pt.setAttribute('style', 'zoom:180%');
        pt.setAttribute('class', 'check-box');
        let lb = document.createElement('input');
        lb.setAttribute('value', addtask.value);
        lb.setAttribute('class', 'taskmsg-on');
        lb.setAttribute('type', 'text');
        lb.setAttribute('edited', addtask.value);
        lb.setAttribute('editing', 'false');
        lb.onfocus = function() {
            if (lb.getAttribute('editing') === 'false')
                lb.blur();
        }
        lb.onblur = function() {
            lb.setAttribute('editing', 'false');
            if (addtask.value !== lb.value) {
                Update();
            }
        }
        pt.onclick = function() {
            if (lb.getAttribute('class') === 'taskmsg-on') {
                lb.setAttribute('class', 'taskmsg-off');
                tasklist2.appendChild(tasklist1.removeChild(d))
            } else {
                lb.setAttribute('class', 'taskmsg-on');
                tasklist1.appendChild(tasklist2.removeChild(d))
            }
        }
        let de = document.createElement('img');
        de.setAttribute('src', 'images/trash-can.svg');
        de.setAttribute('class', 'del');
        de.onclick = function() {
            d.parentElement.removeChild(d);
        }
        let ed = document.createElement('img');
        ed.setAttribute('src', 'images/pencil.svg');
        ed.setAttribute('class', 'edit');
        ed.onclick = function() {
            lb.setAttribute('editing', 'true');
            lb.focus();
        }
        addtask.value = "";
        d.appendChild(pt);
        d.appendChild(lb);
        d.appendChild(ed);
        d.appendChild(de);
        tasklist1.appendChild(d);
    }
}
addtask.value = 'test';
addbutton.onclick();
addtask.value = 'test';
addbutton.onclick();


// let form = document.getElementById('mainform');
// form.onsubmit = addbutton.onclick;




