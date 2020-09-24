// let searchbox = document.getElementById('search-box');
// let searchbutton = document.getElementById('search-button');
let addtask = document.getElementById('taskinfo');
let addbutton = document.getElementById('task-add');
let tasklist = document.getElementById('todoTask');
// console.log(searchbox, searchbutton, taskmsg, addbutton);
let taskCount = 0;
addbutton.onclick = function () {
    if (addtask.value === "") {
        return;
    } else {
        taskCount++;
        let d = document.createElement('div');
        d.setAttribute('class', 'task-item');
        let pt = document.createElement('input');
        // pt.setAttribute('id', 'task' + String(taskCount));
        pt.setAttribute('type', 'checkbox');
        pt.setAttribute('style', 'zoom:180%');
        pt.setAttribute('class', 'check-box');
        let lb = document.createElement('input');
        // lb.setAttribute('for', 'task' + String(taskCount));
        lb.setAttribute('type', 'text');
        // lb.setAttribute('disabled', '');
        lb.setAttribute('class', 'taskmsg-on');
        lb.setAttribute('value', addtask.value);
        pt.onclick = function() {
            if (lb.getAttribute('class') === 'taskmsg-on') {
                lb.setAttribute('class', 'taskmsg-off');
            } else {
                lb.setAttribute('class', 'taskmsg-on');
            }
        }
        // lb.ondbclick = function() {
            // lb.removeAttribute('disabled');
            // lb.focus();
        // }
        addtask.value = "";
        d.appendChild(pt);
        d.appendChild(lb);
        tasklist.appendChild(d);
    }
}
addtask.value = 'test';
addbutton.onclick();
addtask.value = 'test';
addbutton.onclick();
// let form = document.getElementById('mainform');
// form.onsubmit = addbutton.onclick;




