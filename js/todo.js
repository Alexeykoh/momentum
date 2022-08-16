// === // === // === // === // === //
// props
//
let ToDo = [];
let ToDo_props = {
	last_list_ID: -1,
	countOfActiveLists: 0,
	countOfActiveTasks: 0,
	lastColor: '',
	windowMobile: false,
	list_COLOR_alfa: 0.3,
	list_COLOR_invert_alfa: 0.4,
}

// === // === // === // === // === //
// LocalStorage
function setLocal(container, data) {
	const inString = JSON.stringify(data)
	localStorage.setItem(container, inString);
}
//
function getLocal(container) {
	const get = localStorage.getItem(container);
	return JSON.parse(get)
}
//
if(localStorage.getItem('ToDo') !== null){
	ToDo = getLocal('ToDo')
	ToDo_props = getLocal('ToDo_props')
	memoryRender()
}
//

// if (ToDo.length === 0){
// 	addToDATA ()
// 	renderList(ToDo_props.last_list_ID)
// }
//
const newListBtn = document.querySelector ('.addListBtn')
newListBtn.addEventListener ('click', function () {
	addToDATA ()
	renderList(ToDo_props.last_list_ID)
	console.log (ToDo,ToDo,length)
})
//

// === // === // === // === // === //
// add mew list properties
function addToDATA () {
	let ToDo_sample = {
		list_ID:    ToDo_props.last_list_ID+1,
		list_NAME:  'ToDo: '+(ToDo_props.last_list_ID+1),
		list_COLOR: random_rgba(0,0.3),
		list_COLOR_invert: random_rgba(0,0.4),
		task_COUNTER: -1,
		tasks_ARR:  []
	}
	//
	ToDo_props.last_list_ID++
	ToDo_props.lastColor = ToDo_sample.list_COLOR
	//
	ToDo.push(ToDo_sample)
	setLocal('ToDo',ToDo)
	setLocal('ToDo_props',ToDo_props)
	//
	const board =  document.querySelector('.board')
	board.scrollTo(0, board.scrollHeight*-1)
	//
	console.log (ToDo)
}
//

// === // === // === // === // === //
// delete list from local storage & current data object
function deleteListFromData(list_ID){
	console.log (list_ID,findListID_DATA(list_ID))
	const list = document.getElementById (`list_id_${list_ID}`)
	let timeout = 10
	if (!ToDo_props.windowMobile){
		list.style.animation = 'delete .3s'
		timeout = 220
	}
	setTimeout(function (){
		ToDo.splice(findListID_DATA(list_ID), 1) //
		list.remove()
		setLocal('ToDo',ToDo)
		//
		console.log (ToDo)
	},timeout)
	//
}
// === // === // === // === // === //
// delete task
function deleteTask (list_ID,task_ID) {
	console.log (list_ID, task_ID)
	const task = document.getElementById (`task_id_${task_ID}`)
	let timeout = 10
	if(!ToDo_props.windowMobile){
		task.style.animation = 'delete .3s'
		timeout = 220
	}
	ToDo[findListID_DATA(list_ID)].tasks_ARR.splice(findTaskID_DATA(list_ID,task_ID), 1)
	setTimeout(function (){
		task.remove()
		setLocal('ToDo',ToDo)
		//
		console.log (ToDo)
	},timeout)
}

// === // === // === // === // === //
// open settings menu
const openMenu = document.querySelector ('.clearTasks')
openMenu.addEventListener ('click', function () {
	removeCompleteTasks()
})


//

// === // === // === // === // === //
// add new task
function addTask(list_ID){
	ToDo[findListID_DATA(list_ID)].task_COUNTER++;
	//
	let toTask = {
		task_ID:  ToDo[findListID_DATA(list_ID)].list_ID+'_'+ToDo[findListID_DATA(list_ID)].task_COUNTER,
		task_CONTAINER: '',
		task_DEADLINE:  '',
		task_COMPLETE:  false,
	}
	ToDo[findListID_DATA(list_ID)].tasks_ARR.push(toTask)
	setLocal('ToDo',ToDo)
	//
	console.log (
		'addTask',
		ToDo[findListID_DATA(list_ID)].tasks_ARR,
		ToDo[findListID_DATA(list_ID)].task_COUNTER
	)

}

// === // === // === // === // === //
// change Color From Btn
function changeColorFromBtn (list_ID){
	ToDo[findListID_DATA(list_ID)].list_COLOR = random_rgba(0,0.4)
	const list = document.getElementById (`list_id_${list_ID}`)
	list.style.backgroundColor = ToDo[findListID_DATA(list_ID)].list_COLOR
	ToDo_props.lastColor = ToDo[findListID_DATA(list_ID)].list_COLOR
	//
	const taskColor = random_rgba(0,0.3)
	ToDo[findListID_DATA(list_ID)].list_COLOR_invert = taskColor;
	//
	ToDo[findListID_DATA(list_ID)].tasks_ARR.forEach(function (taskKey,taskIndex){
		const task = document.getElementById (`task_id_${taskKey.task_ID}`)
		task.style.background = taskColor
	})
	//
	setLocal('ToDo',ToDo)
}

// === // === // === // === // === //
// check task
function taskCheck (list_ID,task_ID){
	// const task = document.getElementById(`task_id_${task_ID}`)
	const checkEmpty = document.getElementById(`check_id_${task_ID}`)
	const checkDone = document.getElementById(`check_id_done${task_ID}`)

	if (!ToDo[findListID_DATA (list_ID)].tasks_ARR[findTaskID_DATA (list_ID, task_ID)].task_COMPLETE){
		ToDo[findListID_DATA (list_ID)].tasks_ARR[findTaskID_DATA (list_ID, task_ID)].task_COMPLETE = true
		checkEmpty.classList.remove('active')
		checkDone.classList.add('active')
	} else {
		ToDo[findListID_DATA (list_ID)].tasks_ARR[findTaskID_DATA (list_ID, task_ID)].task_COMPLETE = false
		checkEmpty.classList.add('active')
		checkDone.classList.remove('active')
	}
	setLocal('ToDo',ToDo)
	dateDeadlinesCheck()
}

// === // === // === // === // === //
// edit list name
function editListName(list_ID,data){
	ToDo[findListID_DATA(list_ID)].list_NAME = data.value
	console.log (ToDo[findListID_DATA(list_ID)].list_NAME,data.value)
	// const listName = document.getElementById (`list_name_id_${list_ID}`)
	// listName.value = ToDo[findListID_DATA(list_ID)].list_NAME
	setLocal('ToDo',ToDo)
	console.log ('editListName')
}

// === // === // === // === // === //
// edit task
function editTask(list_ID,task_ID,data){
	ToDo[findListID_DATA (list_ID)].tasks_ARR[findTaskID_DATA (list_ID, task_ID)].task_CONTAINER = data.value
	setLocal('ToDo',ToDo)
}

// === // === // === // === // === //
// edit date for deadline
function editDate(list_ID,task_ID,data){
	ToDo[findListID_DATA(list_ID)].tasks_ARR[findTaskID_DATA(list_ID,task_ID)].task_DEADLINE = data.value
	setLocal('ToDo',ToDo)
	dateDeadlinesCheck()
}

// === // === // === // === // === //
// render from local storage
function memoryRender (){
	//
	for (const memoKey in ToDo) {
		renderList(ToDo[memoKey].list_ID)
		for (const tasks_ARR_Key in ToDo[memoKey].tasks_ARR) {
			let placeholder = ToDo[memoKey].tasks_ARR[tasks_ARR_Key].task_ID
			renderTask(ToDo[memoKey].list_ID,placeholder)
		}
	}
}

// === // === // === // === // === // // === // === // === // === // === //
// MENU // MENU // MENU // MENU // MENU // MENU // MENU // MENU // MENU
//
// === // === // === // === // === //
// remove complete tasks
function removeCompleteTasks (){
	console.log ('removeCompleteTasks')
	ToDo.forEach(function (key, index){
		ToDo[index].tasks_ARR.forEach(function (taskKey,taskIndex){
			if (ToDo[index].tasks_ARR[taskIndex].task_COMPLETE){
				let list_ID = ToDo[index].list_ID,
				    task_ID = ''+ToDo[index].tasks_ARR[taskIndex].task_ID
				document.getElementById (`task_id_${task_ID}`).style.background = 'rgba(255, 0, 0, 0.5)'
				setTimeout(function (){
					deleteTask (list_ID,task_ID)
				},200)
			}
		})
	})
}

// === // === // === // === // === //
// dateDeadlinesCheck
function dateDeadlinesCheck(){
	let today = new Date();
	ToDo.forEach(function (key, index){
		ToDo[index].tasks_ARR.forEach(function (taskKey,taskIndex){
			let list_ID = ToDo[index].list_ID,
			    task_ID = ''+ToDo[index].tasks_ARR[taskIndex].task_ID,
			    task_Deadline = new Date(ToDo[index].tasks_ARR[taskIndex].task_DEADLINE),
			    dayForDeadline = task_Deadline.getDate() - today.getDate()
			if (!ToDo[index].tasks_ARR[taskIndex].task_COMPLETE){
				if (dayForDeadline<=2){
					document.getElementById (`task__deadline_${task_ID}`).style.background = 'rgba(255, 193, 42, 0.50)'
				} else {
					document.getElementById (`task__deadline_${task_ID}`).style.background = ''

				}
				if (today >= task_Deadline){
					document.getElementById (`task__deadline_${task_ID}`).style.background = 'rgba(255, 0, 0, 0.50)'
				}
			} else {
				if (today >= task_Deadline){
					document.getElementById (`task__deadline_${task_ID}`).style.background = 'rgba(0, 255, 0, 0.50)'
				}
			}
		})
	})
}

window.addEventListener('load',function (){
	dateDeadlinesCheck()
	if (window.innerWidth <= 765){
		ToDo_props.windowMobile = true
		console.log ('ToDo_props.windowMobile = true')
	} else {
		ToDo_props.windowMobile = false
	}
})
//onunload
window.addEventListener('onunload',function (){
	setLocal('ToDo',ToDo)
	setLocal('ToDo_props',ToDo_props)
	//
})

// window.addEventListener("resize", function (){
//
// });

// === // === // === // === // === //
// menu background
const settings_btn = document.querySelector('.settings_btn')
settings_btn.addEventListener('click', function (){
	background.classList.add('active')
})
//
const background = document.querySelector('.background')
background.addEventListener('click', function (){
	background.classList.remove('active')
})

// === // === // === // === // === //
// show/hive
const nav = document.querySelector('.ToDo__hide_btn')
const todoWidget = document.querySelector('.ToDo__widget')
nav.addEventListener('click',function (){
	todoWidget.classList.toggle('active')
})
