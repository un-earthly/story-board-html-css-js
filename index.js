// global functions
const getElement = id => document.getElementById(id);
const createElement = el => document.createElement(el);
const toggle = (el, toAdd, ToRemove) => {
    el.classList.add(toAdd)
    el.classList.remove(ToRemove)
}
const appendChild = (parent, child) => {
    parent.appendChild(child)
}

// variables
const taskcontainer = getElement('taskcontainer')
const sidebarIcon = getElement('menuicon');
const sidebar = getElement('sidebar');
const ol = getElement('sidebar_task_heading')
// genrating and showing sidebar information

// toggling sidebar

sidebarIcon.addEventListener('click', () => {
    if (!sidebar.classList.contains('visible')) {
        toggle(sidebar, 'visible', 'not_visible')
    } else {
        toggle(sidebar, 'not_visible', 'visible')
    }
})



// data display


function fetchData() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => { showData(data.tasks), showBodyData(data.tasks) })
        .catch(err => console.log(err))
}


function showSidebarTaskCount(data) {
    const li = createElement('li');
    console.log(data)
    data.map(task => {
        li.innerHTML = task.task_title
        appendChild(ol, li)
        showSidebarUl(task.assets)
    })
}

function showBodyData(data) {
    taskcontainer.innerHTML = ""
    data[0].assets.map(asset => {
        const p = createElement('p')
        p.innerHTML = asset.asset_title
        p.classList.add('black_heading', "rounded_top")
        const div = createElement('div')
        const accordion_body = createElement('div')
        accordion_body.innerHTML = asset.asset_description
        div.classList.add('asset')
        appendChild(div, p)
        appendChild(div, accordion_body)
        appendChild(taskcontainer, div)
    })
}
function showSidebarUl(data) {
    let ul = createElement('ul');
    data.map(asset => {
        let li = document.createElement('li');
        li.innerHTML = asset.asset_title
        appendChild(ul, li)
    })
    appendChild(ol, ul)
}


function showData(data) {
    observer.observe(sidebar, {
        attributes: true
    });
    if (!sidebar.classList.contains('visible')) {
        ol.innerHTML = ""
        const borderedP = createElement('p')
        borderedP.setAttribute('id', "borderedP")
        borderedP.innerHTML = data.length;
        appendChild(ol, borderedP)
    }
    else {
        ol.innerHTML = ""
        showSidebarTaskCount(data)
    }
}
fetchData()

const observer = new MutationObserver(mutations => {
    mutations.map(mutation => (mutation.attributeName === "class") && fetchData()
    );
})