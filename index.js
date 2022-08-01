// global functions
const getElement = id => document.getElementById(id);
const createElement = el => document.createElement(el);
const toggle = (el, toAdd, ToRemove) => {
    el.classList.add(toAdd)
    el.classList.remove(ToRemove)
}

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
        .then(data => showData(data.tasks))
        .catch(err => console.log(err))
}


function show(data) {
    const li = createElement('li');
    data.map(task => {
        li.innerHTML = task.task_title
        ol.appendChild(li)
        showNestedUl(task.assets, ol)
    })
}

function showNestedUl(data) {
    let ul = createElement('ul');
    data.map(asset => {
        let li = document.createElement('li');
        li.innerHTML = asset.asset_title
        ul.appendChild(li)
    })
    ol.appendChild(ul)
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
        ol.appendChild(borderedP)
    }
    else {
        ol.innerHTML = ""
        show(data)
    }
}
fetchData()

const observer = new MutationObserver(mutations => {
    mutations.map(mutation => (mutation.attributeName === "class") && fetchData()
    );
})