let test = document.getElementById("test-list");

arr = [];
for (let i = 0; i < test.children.length; i++)
    arr.push(test.children[i].textContent);
arr = arr.sort();
for (let i = 0; i < test.children.length; i++)
    test.children[i].textContent = arr[i];



// test.textContent = "test123";


