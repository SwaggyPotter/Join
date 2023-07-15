let openTask;

//Test renderSubtask Done
function renderSubtaksInDetailCard(x, tasktype) {
    document.getElementById('subtasks').innerHTML = '';
    for (let j = 0; j < tasktype[x]['subtasks'].length; j++) {
        if (tasktype[x]['alreadyDone'][j] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        };
        document.getElementById('subtasks').innerHTML +=
            htmlTemplateSubtasksDetailCard(x, j, checkedStatus, tasktype);
    }
}


/**
 * this function opens the detail card for tasks to do
 * 
 * @param {number} x 
 */
function openDetailCardToDo(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksToDo[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmltemplateDetailCard(x, tasksToDo, 'tasksToDo');
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksToDo[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCard(x, j, tasksToDo);
    };
    renderSubtaksInDetailCard(x, tasksToDo);
    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('details').setAttribute('onclick', `closeDetailCard('tasksToDo', ${x})`)
    openTask = tasksToDo[x];
}


/**
 * this function opens the detail card for tasks in progress
 * 
 * @param {number} x 
 */
function openDetailCardInProgress(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksInProgress[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmltemplateDetailCard(x, tasksInProgress, 'tasksInProgress');
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksInProgress[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCard(x, j, tasksInProgress);
    };
    renderSubtaksInDetailCard(x, tasksInProgress);
    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('details').setAttribute('onclick', `closeDetailCard('tasksInProgress', ${x})`)
    openTask = tasksInProgress[x];
}


/**
 * this function opens the detail card for tasks await feedback
 * 
 * @param {number} x 
 */
function openDetailCardAwaitFeedback(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksAwaitFeedback[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmltemplateDetailCard(x, tasksInProgress, 'tasksAwaitFeedback');
    for (let j = 0; j < tasksAwaitFeedback[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCard(x, j, tasksAwaitFeedback);
    };
    renderSubtaksInDetailCard(x, tasksAwaitFeedback);
    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('details').setAttribute('onclick', `closeDetailCard('tasksAwaitFeedback', ${x})`)
    openTask = tasksAwaitFeedback[x];
}


/**
 * this function opens the detail card for tasks done
 * 
 * @param {number} x 
 */
function openDetailCardDone(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksDone[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmltemplateDetailCard(x, tasksDone, 'tasksDone');
    for (let j = 0; j < tasksDone[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCard(x, j, tasksDone);
    };
    renderSubtaksInDetailCard(x, tasksDone);
    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('details').setAttribute('onclick', `closeDetailCard('tasksDone', ${x})`)
    openTask = tasksDone[x];
}


/**
 * this function closes the detail card
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function closeDetailCard(taskStatus, x) {
    let inputElements = document.getElementsByClassName('sutaskCheckbox');
    getCheckedCheckBoxes(inputElements);
    updateCheckboxChecked(taskStatus, x, checkboxChecked);
    document.getElementById('details').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
    document.getElementById('body').style.overflow = 'visible';
}


/**
 * this function checks which checkboxes are checked
 * 
 * @param {string} inputElements 
 */
function getCheckedCheckBoxes(inputElements) {
    checkboxChecked = [];
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxChecked.push(1);
        } else {
            checkboxChecked.push(0);
        }
    };
}


/**
 * this function registers which checkboxes are checked
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 * @param {Array} checkboxChecked 
 */
function updateCheckboxChecked(taskStatus, x, checkboxChecked) {
    switch (taskStatus) {
        case 'tasksToDo':
            updateCheckboxCheckedExtension(taskStatus, x, checkboxChecked, tasksToDo)
            break;
        case 'tasksInProgress':
            updateCheckboxCheckedExtension(taskStatus, x, checkboxChecked, tasksInProgress)
            break;
        case 'tasksAwaitFeedback':
            updateCheckboxCheckedExtension(taskStatus, x, checkboxChecked, tasksAwaitFeedback)
            break;
        case 'tasksDone':
            updateCheckboxCheckedExtension(taskStatus, x, checkboxChecked, tasksDone)
            break;
    }
}


function updateCheckboxCheckedExtension(taskStatus, x, checkboxChecked, taskType) {
    taskType[x]['alreadyDone'] = [];
    for (let i = 0; i < checkboxChecked.length; i++) {
        taskType[x]['alreadyDone'].push(checkboxChecked[i]);
    };
}


/**
 * this function deletes the selected task
 * 
 * @param {string} taskToDelete 
 * @param {number} x 
 */
function deleteTask(taskToDelete, x) {
    const isGoodValue = val => val && val !== '-' && val !== 'N/A'; /* check for empty arrays*/
    switch (taskToDelete) {
        case 'tasksToDo':
            delete tasksToDo[x];
            tasksToDo = tasksToDo.filter(isGoodValue);
            break;
        case 'tasksInProgress':
            delete tasksInProgress[x];
            tasksInProgress = tasksInProgress.filter(isGoodValue);
            break;
        case 'tasksAwaitFeedback':
            delete tasksAwaitFeedback[x];
            tasksAwaitFeedback = tasksAwaitFeedback.filter(isGoodValue);
            break;
        case 'tasksDone':
            delete tasksDone[x];
            tasksDone = tasksDone.filter(isGoodValue);
            break;
    }


    closeDetailCard();
    saveTasksToBackend();
    renderBoard();
}