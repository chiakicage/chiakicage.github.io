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
        pt.setAttribute('id', 'task' + String(taskCount));
        pt.setAttribute('type', 'checkbox');
        pt.setAttribute('class', 'check-box');
        let lb = document.createElement('label');
        lb.setAttribute('for', 'task' + String(taskCount));
        lb.setAttribute('class', 'taskmsg');
        lb.innerText = addtask.value;
        addtask.value = "";
        d.appendChild(pt);
        d.appendChild(lb);
        tasklist.appendChild(d);
    }
}
// let form = document.getElementById('mainform');
// form.onsubmit = addbutton.onclick;




