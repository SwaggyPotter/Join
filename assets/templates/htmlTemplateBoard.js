/**
 * Task todo
 * @param {*} i 
 * @param {*} widthProgressBar 
 * @param {*} nbDone 
 * @returns 
 */
function htmlTemplateTasksToDo(i, widthProgressBar, nbDone) {
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksToDo')" class="task-container-detail" onclick="openDetailCardToDo(${i})">
        <div class="category" style="background:${bgColor}">${tasksToDo[i]['category']}</div>
     <div class="headline-task-detail">${tasksToDo[i]['titel']}</div>
        <div class="text-task-detail">${tasksToDo[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksToDo[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-to-do${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksToDo[i]['priority']}">
        </div>
    </div>
</div>
        `;
}


function htmlTemplateSelectedPersonToDo(i, j) {
    return `
        <div class="initials-icon bg${j}">${tasksToDo[i]['initials'][j]}</div>
    `;
}


// Test 
// DetailCard Done!
function htmltemplateDetailCard(x, tasktype, tasktypeAsString) {
    return `
    <div class="close-x"><img src="assets/img/trash.svg" onclick="deleteTask('${tasktypeAsString}', ${x})"> <button onclick="closeDetailCard('${tasktypeAsString}', ${x})">X</button></div>
    <span class="category" style="background:${bgColor}">${tasktype[x]['category']}</span>
    <h1>${tasktype[x]['titel']}</h1>
    <span class="task-text">${tasktype[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasktype[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasktype[x]['priorityByName']} priority-level">
            <span class="priority-text">${tasktype[x]['priorityByName']}</span>    
            <img src="${tasktype[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Subtasks: </span>
    <div id="subtasks"></div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg" onclick="editTask('${tasktypeAsString}', ${x})"></div>
    `;
}

//Test
//Persons detail card Done!
function htmlTemplatePersonsDetailCard(x, j, tasktype) {
    return `
    <div class="names">
        <div class="initials-icon bg${j}">${tasktype[x]['initials'][j]}</div>
        <div class="name">${tasktype[x]['inCharge'][j]}</div>
    </div>
    `;
}

//Test
// Subtasks Detail Card Done!
function htmlTemplateSubtasksDetailCard(x, j, checkedStatus, tasktype) {
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasktype[x]['subtasks'][j]}</span>
    `;
}


/**
 * Task in progress
 * @param {*} i 
 * @param {*} widthProgressBar 
 * @param {*} nbDone 
 * @returns 
 */
function htmlTemplateTasksInProgress(i, widthProgressBar, nbDone) {
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksInProgress')" class="task-container-detail" onclick="openDetailCardInProgress(${i})">
        <div class="category" style="background:${bgColor}">${tasksInProgress[i]['category']}</div>
     <div class="headline-task-detail">${tasksInProgress[i]['titel']}</div>
        <div class="text-task-detail">${tasksInProgress[i]['text']}</div>
            <div class="progress-bar-task-detail">
                <div class="progress-bar" id="progress-bar">
                    <div id="myBar" style="width:${widthProgressBar}%"></div>
                </div>
            <div class="already-done">${nbDone}/${tasksInProgress[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-in-progress${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksInProgress[i]['priority']}">
        </div>
    </div>
</div>
        `;
}


function htmlTemplateSelectedPersonInProgress(i, j) {
    return `
    <div class="initials-icon bg${j}">${tasksInProgress[i]['initials'][j]}</div>
    `;
}


function htmlTemplateSubtasksDetailCardInProgress(x, j, checkedStatus) {
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksInProgress[x]['subtasks'][j]}</span>
    `;
}


function htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone) {
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksAwaitFeedback')" class="task-container-detail" onclick="openDetailCardAwaitFeedback(${i})">
        <div class="category" style="background:${bgColor}">${tasksAwaitFeedback[i]['category']}</div>
     <div class="headline-task-detail">${tasksAwaitFeedback[i]['titel']}</div>
        <div class="text-task-detail">${tasksAwaitFeedback[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                 <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksAwaitFeedback[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-await-feedback${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksAwaitFeedback[i]['priority']}">
        </div>
    </div>
</div>
        `;
}


function htmlTemplateSubtasksDetailCardAwaitFeedback(x, j, checkedStatus) {
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksAwaitFeedback[x]['subtasks'][j]}</span>
    `;
}


function htmlTemplateSelectedPersonAwaitFeedback(i, j) {
    return `
    <div class="initials-icon bg${j}">${tasksAwaitFeedback[i]['initials'][j]}</div>
    `;
}

/**
 * Task Done
 * @param {*} i 
 * @param {*} widthProgressBar 
 * @param {*} nbDone 
 * @returns 
 */
function htmlTemplateTasksDone(i, widthProgressBar, nbDone) {
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksDone')" class="task-container-detail" onclick="openDetailCardDone(${i})">
        <div class="category" style="background:${bgColor}">${tasksDone[i]['category']}</div>
     <div class="headline-task-detail">${tasksDone[i]['titel']}</div>
        <div class="text-task-detail">${tasksDone[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksDone[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-done${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksDone[i]['priority']}">
        </div>
    </div>
</div>
        `;
}


function htmlTemplateSelectedPersonDone(i, j) {
    return `
    <div class="initials-icon bg${j}">${tasksDone[i]['initials'][j]}</div>
    `;
}


function htmlTemplateSubtasksDetailCardDone(x, j, checkedStatus, tasktype) {
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksDone[x]['subtasks'][j]}</span>
    `;
}


function htmlTemplateTaskToEdit(titleEdit, year, month, day, taskStatus, x) {
    return `
    <div class="edit-task"</div>
    <h2>Edit Task</h2>
    <div>Title</div>
    <input id="edited-title" type="text" value="${titleEdit}">
    <div>Description</div>
    <textarea  id="textarea-edit" cols="34" rows="5"></textarea>
    <div>Due date</div>
    <input type="date" id="due-date-edit" name="trip-start" value="${year}-${month}-${day}" onfocus="this.showPicker()">
    <span>Subtasks</span>
    <div class="input-subtasks">
        <input style="width:90%; margin-right:10px" type="text" placeholder="add new subtask" id="task-subtask-edit">
        <img src="assets/img/plus.svg" alt="add" onclick="renderAddedSubtask('${taskStatus}', ${x})">
    </div>
    <span id="subtask-to-edit"></span>
    <div class="priority-edit" id="task-priority-edit">
        <button id="urgent-btn" type="button" onclick="setPriority('urgent'); editPriority('urgent', '${taskStatus}', ${x})">Urgent <img id="urgent-btn-img" src="assets/img/urgent.svg" alt="urgent"></button>
        <button id="medium-btn" type="button" onclick="setPriority('medium'); editPriority('medium', '${taskStatus}', ${x})">Medium <img id="medium-btn-img" src="assets/img/medium.svg" alt="medium"></button>
        <button id="low-btn" type="button" onclick="setPriority('low'); editPriority('low', '${taskStatus}', ${x})">Low <img id="low-btn-img" src="assets/img/low.svg" alt="low"></button>
    </div>
    <span>Assigned to</span>
    <div class="select-contacts-to-assign" id="select-contacts-to-assign-two" onclick="openContactsToAssign(); renderListAssignedToTwo(${taskStatus}, ${x})">
        <span>Select contacts to assign</span><img src="assets/img/dropdown.svg">  
    </div>
    <div id="list-assigned-to-two" class="dropdown-check-list d-none" tabindex="100">
        <ul class="items" id="checkbox-list-assigned-to-two">
        </ul>
    </div>
    <span id="persons-to-edit" class="names"></span>
    <div onclick="closeEdit('${taskStatus}', ${x})" class="ok-btn"><button onclick="closeEdit('${taskStatus}', ${x})">OK</button>
    <img src="assets/img/check.svg">
    </div>
`;
}


function htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus) {
    return `
    <div class="ckeckbox-in-edit"> 
    <input style="width:5%" type="checkbox" class="edited-subtasks" ${checkedStatus}/> 
    <span>${subtasksToEdit[i]}</span>
    </div>
    `;
}


function htmlTemplateAssignedToEdit(assignedToEdit, j) {
    return `
    <div >
        <div id="contact${j}" onclick="deleteContactFromTask(${j})" class="initials-icon bg${j}">${assignedToEdit[j]}</div>        
    </div>
    `;
}