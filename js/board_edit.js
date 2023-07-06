let titleEdit;
let textEdit;
let dueDateEdit;
let priorityEdit;
let assignedToEdit;
let removerArray = [];
let removeInitials = [];
let removedChars = [];
let removedInitials = [];

/**
 * this function gets the values who can be changed
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function editTask(taskStatus, x) {
    switch (taskStatus) {
        case 'tasksToDo':
            editTasksExtension(taskStatus, x, tasksToDo)
            break;
        case 'tasksInProgress':
            editTasksExtension(taskStatus, x, tasksInProgress)
            break;
        case 'tasksAwaitFeedback':
            editTasksExtension(taskStatus, x, tasksAwaitFeedback)
            break;
        case 'tasksDone':
            editTasksExtension(taskStatus, x, tasksDone)
            break;
    }
    renderEditTaskCard(taskStatus, titleEdit, textEdit, dueDateEdit, subtasksToEdit, subtasksToEditAlreadyDone, x);
}


function editTasksExtension(taskStatus, x, taskType) {
    titleEdit = taskType[x]['titel'];
    textEdit = taskType[x]['text'];
    dueDateEdit = taskType[x]['dueDate'];
    priorityEdit = taskType[x]['priority'];
    assignedToEdit = taskType[x]['initials'];
    subtasksToEdit = taskType[x]['subtasks'];
    subtasksToEditAlreadyDone = taskType[x]['alreadyDone'];
}


function setPriorityColor(priorityEdit) {
    if (priorityEdit == 'assets/img/urgent.svg') {
        document.getElementById('urgent-btn').style.backgroundColor = 'rgb(255, 61, 0)';
        document.getElementById('urgent-btn-img').src = 'assets/img/urgent-white.svg'
    }
    else if (priorityEdit == 'assets/img/medium.svg') {
        document.getElementById('medium-btn').style.backgroundColor = 'rgb(255, 168, 0)';
        document.getElementById('medium-btn-img').src = 'assets/img/medium-white.svg'
    }
    else if (priorityEdit == 'assets/img/low.svg') {
        document.getElementById('low-btn').style.backgroundColor = 'rgb(122, 226, 41)';
        document.getElementById('low-btn-img').src = 'assets/img/low-white.svg'
    }
}


/**
 * this function opens and renders the task to edit while it closes the detail card
 * 
 * @param {string} taskStatus 
 * @param {string} titleEdit 
 * @param {string} textEdit 
 * @param {date} dueDateEdit 
 * @param {Array} subtasksToEdit 
 * @param {Array} subtasksToEditAlreadyDone 
 * @param {number} x 
 */
function renderEditTaskCard(taskStatus, titleEdit, textEdit, dueDateEdit, subtasksToEdit, subtasksToEditAlreadyDone, x) {
    let year = dueDateEdit.substring(0, 4);
    let month = dueDateEdit.substring(5, 7);
    let day = dueDateEdit.substring(8, 10);
    document.getElementById('details').classList.add('d-none');
    document.getElementById('edit-task').classList.remove('d-none');
    document.getElementById('edit-task-popup').innerHTML = '';
    document.getElementById('edit-task').setAttribute('onclick', `closeEdit('${taskStatus}', ${x})`)
    document.getElementById('edit-task-popup').innerHTML +=
        htmlTemplateTaskToEdit(titleEdit, year, month, day, taskStatus, x);
    document.getElementById('textarea-edit').value = textEdit;
    document.getElementById('subtask-to-edit').innerHTML = '';
    setPriorityColor(priorityEdit)
    renderSubtasksEditTaskCard(subtasksToEdit, subtasksToEditAlreadyDone);
}


/**
 * this function renders the subtasks on the edit card
 * 
 * @param {Array} subtasksToEdit 
 * @param {Array} subtasksToEditAlreadyDone 
 */
function renderSubtasksEditTaskCard(subtasksToEdit, subtasksToEditAlreadyDone) {
    for (let i = 0; i < subtasksToEdit.length; i++) {
        if (subtasksToEditAlreadyDone[i] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        }
        document.getElementById('subtask-to-edit').innerHTML +=
            htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus);
    }
    renderAssignedToEditTaskCard(assignedToEdit);
}


/**
 * this function renders the people the task is assigned to
 * 
 * @param {Array} assignedToEdit 
 */
function renderAssignedToEditTaskCard(assignedToEdit) {
    document.getElementById('persons-to-edit').innerHTML = '';
    for (let j = 0; j < assignedToEdit.length; j++) {
        document.getElementById('persons-to-edit').innerHTML +=
            htmlTemplateAssignedToEdit(assignedToEdit, j);
    }
}


/**
 * this function registers the added subtask on the edit card
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function renderAddedSubtask(taskStatus, x) {
    switch (taskStatus) {
        case 'tasksToDo':
            renderTaksExtension(taskStatus, x, tasksToDo)
            break;
        case 'tasksInProgress':
            renderTaksExtension(taskStatus, x, tasksInProgress)
            break;
        case 'tasksAwaitFeedback':
            renderTaksExtension(taskStatus, x, tasksAwaitFeedback)
            break;
        case 'tasksDone':
            renderTaksExtension(taskStatus, x, tasksDone)
            break;
    }
}


function renderTaksExtension(taskStatus, x, taskType, subtasksToPush) {
    let i = 0;
    subtasksToPush = document.getElementById('task-subtask-edit').value;
    document.getElementById('task-subtask-edit').value = '';
    taskType[x]['subtasks'].push(subtasksToPush);
    i = taskType[x]['subtasks'].length - 1;
    subtasksToEdit = taskType[x]['subtasks'];
    executeRenderingAddedSubtask(subtasksToEdit, i);
}


/**
 * this function renders the added subtask on the edit card
 * 
 * @param {Array} subtasksToEdit 
 * @param {number} i 
 */
function executeRenderingAddedSubtask(subtasksToEdit, i) {
    checkedStatus = '';
    document.getElementById('subtask-to-edit').innerHTML +=
        htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus);
}


/**
 * this function updates the edited task
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function closeEdit(taskStatus, x) {
    let inputElements = document.getElementsByClassName('edited-subtasks');
    document.getElementById('body').style.overflow = 'visible'
    temporaryPersons = []
    getCheckedCheckBoxes(inputElements);
    switch (taskStatus) {
        case 'tasksToDo':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            closeEditExtension(taskStatus, x, checkboxChecked, tasksToDo);
            break;
        case 'tasksInProgress':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            closeEditExtension(taskStatus, x, checkboxChecked, tasksInProgress);
            break;
        case 'tasksAwaitFeedback':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            closeEditExtension(taskStatus, x, checkboxChecked, tasksAwaitFeedback);
            break;
        case 'tasksDone':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            closeEditExtension(taskStatus, x, checkboxChecked, tasksDone);
            break;
    }
    closeEditedCard();
}


function deleteContactFromTask(x) {
    document.getElementById(`contact${x}`).style.backgroundColor = 'red';
    removerArray.push(openTask['inCharge'][x])
    removeInitials.push(openTask['initials'][x])
}


function removeArrayContent(sourceArray, removeArray) {
    return sourceArray.filter(item => !removeArray.includes(item));
}


function closeEditExtension(taskStatus, x, checkboxChecked, taskType) {
    taskType[x]['titel'] = document.getElementById('edited-title').value;
    taskType[x]['text'] = document.getElementById('textarea-edit').value;
    taskType[x]['dueDate'] = document.getElementById('due-date-edit').value;
    taskType[x]['inCharge'] = loadNewAssignedTo(taskType[x]['inCharge']);
    taskType[x]['initials'] = loadInitials(taskType[x]['initials']);
    if (removerArray.length != 0) {
        removedChars = removeArrayContent(taskType[x]['inCharge'], removerArray);
        taskType[x]['inCharge'] = removedChars;
    }
    if (removeInitials.length != 0) {
        removedInitials = removeArrayContent(taskType[x]['initials'], removeInitials);
        taskType[x]['initials'] = removedInitials;
    }
    clearArray()
}


function clearArray() {
    removedChars = [];
    removedInitials = [];
    removerArray = [];
    removeInitials = [];
}


function sortNamesByFirstLetter(names) {
    // Sortiere die Namen alphabetisch
    names.sort();

    // Erstelle ein Objekt, um Namen nach dem ersten Buchstaben zu gruppieren
    const groupedNames = {};

    // Iteriere über die Namen und gruppiere sie nach dem ersten Buchstaben
    names.forEach(name => {
        const words = name.split(' ');
        const firstLetter = words[0].charAt(0).toUpperCase();
        if (groupedNames[firstLetter]) {
            groupedNames[firstLetter].push(name);
        } else {
            groupedNames[firstLetter] = [name];
        }
    });

    // Sortiere die Gruppen nach dem ersten Buchstaben
    const sortedGroups = Object.entries(groupedNames).sort();

    // Erstelle eine flache sortierte Liste der Namen
    const sortedNames = [];
    sortedGroups.forEach(group => {
        sortedNames.push(...group[1]);
    });

    // Gib die sortierte Liste der Namen zurück
    return sortedNames;
}


function removeStringFromArray(array, searchString) {
    const index = array.findIndex(item => item === searchString);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}


//aktuell hilfe
let temporaryPersons = []
function savePersonTemorary(k) {
    if (k == 1) {
        let inputElements = document.getElementsByClassName('checkbox-contacts');
        for (let i = 0; inputElements[i]; ++i) {
            if (istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == true && inputElements[i].checked) {
            }
            if (inputElements[i].checked && istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == false) {
                temporaryPersons.push(contacts[i]['name'] + ' ' + contacts[i]['second-name']);
            }
            if (!inputElements[i].checked && istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == true) {
                temporaryPersons = removeStringFromArray(temporaryPersons, contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons)
            }
        }
        sortNamesByFirstLetter(temporaryPersons)
        console.log('Temporary persons:', temporaryPersons)
    }
    else if (k == 2) {
        let inputElements = document.getElementsByClassName('checkbox-contacts-two');
        for (let i = 0; inputElements[i]; ++i) {
            if (istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == true && inputElements[i].checked) {
            }
            if (inputElements[i].checked && istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == false) {
                temporaryPersons.push(contacts[i]['name'] + ' ' + contacts[i]['second-name']);
            }
            if (!inputElements[i].checked && istNameImArray(contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons) == true) {
                temporaryPersons = removeStringFromArray(temporaryPersons, contacts[i]['name'] + ' ' + contacts[i]['second-name'], temporaryPersons)
            }
        }
        sortNamesByFirstLetter(temporaryPersons)
        console.log('Temporary persons:', temporaryPersons)
    }
}


function loadNewAssignedTo(x) {
    let inputElements = document.getElementsByClassName('checkbox-contacts-two');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            x.push(contacts[i]['name'] + ' ' + contacts[i]['second-name']);
        }
    }
    return x;
}


function loadInitials(x) {
    let inputElements = document.getElementsByClassName('checkbox-contacts-two');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            x.push(contacts[i]['name'].charAt(0) + contacts[i]['second-name'].charAt(0));
        }
    }
    return x;
}

/**
 * this function closes the edit card 
 * 
 */
function closeEditedCard() {
    document.getElementById('edit-task').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
}


/**
 * this function chooses the priority symbol 
 * 
 * @param {string} level 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function editPriority(level, taskStatus, x) {
    switch (level) {
        case 'urgent':
            symbol = "assets/img/urgent.svg";
            break;
        case 'medium':
            symbol = "assets/img/medium.svg";
            break;
        case 'low':
            symbol = "assets/img/low.svg";
            break;
    }
    changePriority(taskStatus, x, symbol, level);
}


/**
 * this function pushes the priority level and symbol into the specific array
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 * @param {string} symbol 
 * @param {string} level 
 */
function changePriority(taskStatus, x, symbol, level) {
    switch (taskStatus) {
        case 'tasksToDo':
            changePriorityExtension(taskStatus, x, symbol, level, tasksToDo)
            break;
        case 'tasksInProgress':
            changePriorityExtension(taskStatus, x, symbol, level, tasksInProgress)
            break;
        case 'tasksAwaitFeedback':
            changePriorityExtension(taskStatus, x, symbol, level, tasksAwaitFeedback)
            break;
        case 'tasksDone':
            changePriorityExtension(taskStatus, x, symbol, level, tasksDone)
            break;
    }
    saveTasksToBackend();
}


function changePriorityExtension(taskStatus, x, symbol, level, taskType) {
    taskType[x]['priority'] = symbol;
    taskType[x]['priorityByName'] = level;
}


/**
 * this function prevents that the popups are closed by clicking on them
 * 
 * @param {event} event 
 */
function stopPropagation(event) {
    event.stopPropagation();
}