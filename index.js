// genrating and showing sidebar information
async function fetchPosts() {
    const response = await fetch(`data.json`)
    let data = await response.json()
    show(data)
}


function show(data) {
    const ol = document.getElementById('sidebar_task_heading')
    let li = document.createElement('li');
    data.tasks.map(task => {
        li.innerHTML = task.task_title
        ol.appendChild(li)
        showNestedUl(task.assets, ol)
    })


}

function showNestedUl(data, ol) {
    let ul = document.createElement('ul');
    data.map(asset => {
        let li = document.createElement('li');
        li.innerHTML = asset.asset_title
        ul.appendChild(li)
    })
    ol.appendChild(ul)
}

fetchPosts()