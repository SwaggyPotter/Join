

/**
 * this function empties the add task form
 * 
 */
function clearAddTaskForm() {
    document.getElementById('task-title').value = '';
    renderListAssignedTo();
    document.getElementById('due-date').value = "";
    renderListTaskCategory();
    setPriority('');
    document.getElementById('task-description').value = '';
    document.getElementById('ckeckbox-subtasks').innerHTML = '';
    nbOfSubtasks = 0;
}


/**
 * this function sets the new task's priority and changes the color of the buttons
 * 
 * @param {string} string 
 */
function setPriority(string) {
    priority = string;
    resetPriorityBtn();
    switch (string) {

        case 'low':
            document.getElementById('low-btn').style = ("background-color:#7AE229");
            document.getElementById('low-btn-img').src = "assets/img/low-white.svg";
            break;

        case 'medium':
            document.getElementById('medium-btn').style = ("background-color:#FFA800");
            document.getElementById('medium-btn-img').src = "assets/img/medium-white.svg";
            break;

        case 'urgent':
            document.getElementById('urgent-btn').style = ("background-color:#FF3D00");
            document.getElementById('urgent-btn-img').src = "assets/img/urgent-white.svg";
            break;
    }
}


/**
 * this function resets the priority buttons' color
 * 
 */
function resetPriorityBtn() {
    document.getElementById('urgent-btn').style = ("background-color:#f9f9f9");
    document.getElementById('medium-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn-img').src = "assets/img/low.svg";
    document.getElementById('medium-btn-img').src = "assets/img/medium.svg";
    document.getElementById('urgent-btn-img').src = "assets/img/urgent.svg";
}


/**
 * this function renders the date picker with today´s date
 * 
 */
function renderDueDate() {
    let todayDate = new Date().toISOString().split('T')[0];
    document.getElementById('date-picker').innerHTML =
        htmlTemplateDueDate(todayDate);
}


/**
 * this function saves all JSON arrays to the backend
 * 
 */
async function saveTasksToBackend() {
    await backend.setItem('tasksToDo', JSON.stringify(tasksToDo));
    await backend.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    await backend.setItem('tasksAwaitFeedback', JSON.stringify(tasksAwaitFeedback));
    await backend.setItem('tasksDone', JSON.stringify(tasksDone));
}