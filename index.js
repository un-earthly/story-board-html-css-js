// global functions
const getElement = id => document.getElementById(id);
const createElement = el => document.createElement(el);
const toggle = (el, toAdd, ToRemove) => {
    el.classList.add(toAdd)
    el.classList.remove(ToRemove)
}


const sidebarIcon = getElement('menuicon');
const sidebar = getElement('sidebar');

sidebarIcon.addEventListener('click', () => {
    const isActive = sidebar.classList.contains('visible')
    if (isActive) {
        toggle(sidebar, 'not_visible', 'visible')
    } else {
        toggle(sidebar, 'visible', 'not_visible')
    }
})

// genrating and showing sidebar information
async function fetchPosts() {
    const response = await fetch(`data.json`)
    let data = await response.json()
    show(data)
}


function show(data) {
    const ol = getElement('sidebar_task_heading')
    const li = createElement('li');
    data.tasks.map(task => {
        li.innerHTML = task.task_title
        ol.appendChild(li)
        showNestedUl(task.assets, ol)
    })
}

function showNestedUl(data, ol) {
    let ul = createElement('ul');
    const taskcontainer = getElement('taskcontainer')
    data.map(asset => {
        let li = document.createElement('li');
        li.innerHTML = asset.asset_title
        ul.appendChild(li)
    })

    data.map(task => {
        const h3 = createElement('h3')
        const p = createElement('p')
        const div = createElement('div')
        h3.innerHTML = task.asset_title
        div.appendChild(h3)
        div.appendChild(p)
        console.log(task)
        taskcontainer.appendChild(div)
    })
    ol.appendChild(ul)
}

fetchPosts()