// Problem: want to add and update task list accordingly.
//Input task into form

function addActiveTask(taskName) {
    //the big long string is a 'template'
    var newListItem = '<li><input type="checkbox"><label>' + taskName + '</label><input class="activeTaskText" type="text"><button class="editButton">Edit</button><button class="saveButton">Save</button><button class="deleteButton">Delete</button></li>';
    //prepend it to Active Tasks list
    $('#activeTasks').prepend(newListItem);
}

function addCompletedTask(completedTaskName) {
    // see above and template in new tab
    var newCompletedTask = '<li><input class="completedCheckbox" type="checkbox" checked><label>' + completedTaskName + '</label><button class="deleteButton">Delete</button></li>';
    // prepend to completed task list
    $('#completedTasks').prepend(newCompletedTask);
}

function beginEdit(listItem) {
    //set input text value to be the current label text
    var currentLabelText = listItem.find("label").text();
    listItem.find("input[type=text]").val(currentLabelText);

    // hide things
    listItem.find("label").hide();
    listItem.find(".editButton").hide();
    listItem.find(".deleteButton").hide();

    //show things
    listItem.find("input[type=text]").show();
    listItem.find(".saveButton").show();
}

function saveEdit(listItem) {
    // SET VALUE
    var newLabelEditedTask = listItem.find("input[type=text]").val();
    listItem.find("label").text(newLabelEditedTask);

    // HIDE THINGS
    listItem.find(".saveButton").hide();
    listItem.find("input[type=text]").hide();

    // SHOW THINGS
    listItem.find("label").show();
    listItem.find(".editButton").show();
    listItem.find(".deleteButton").show();
}

function deleteTask(listItem) {
    listItem.remove();
}

var EDIT_KEY = 13;

$(document).ready(function() {

    // ADD TASK BUTTON
    $('#addNewTaskButton').click(function() {
        addActiveTask($('#newTask').val());
    });

    // ADD TASK ON KEYPRESS HANDLER
    $(document).on('keypress', '#newTask', function(e) {
        var listItem = $(this).parent();
        if (e.which == EDIT_KEY) {
            addActiveTask($('#newTask').val());
        }
    });

    // EDIT BUTTON ON CLICK HANDLER
    $(document).on('click', '.editButton', function() {
        var listItem = $(this).parent();
        beginEdit(listItem);

    });

    // EDIT BUTTON ON KEYPRESS HANDLER
    $(document).on('keypress', '.activeTaskText', function(e) {
        var listItem = $(this).parent();
        if (e.which == EDIT_KEY) {
            saveEdit(listItem);
        }
    });

    // SAVE BUTTON ON CLICK HANDLER
    $(document).on('click', '.saveButton', function() {
        var listItem = $(this).parent();
        saveEdit(listItem);
    });

    // DELETE BUTTON
    // Delete button allows user to delete task 
    $(document).on('click', '.deleteButton', function() {
        var listItem = $(this).parent();
        deleteTask(listItem);
    });

    // CHANGE TASK STATE
    $(document).on('click', '.activeCheckbox', function() {
        var listItem = $(this).parent();
        var completedTaskName = listItem.find("label").text();
        deleteTask(listItem);
        addCompletedTask(completedTaskName);
    });

    $(document).on('click', '.completedCheckbox', function() {
        var listItem = $(this).parent();
        var completedTaskName = listItem.find("label").text();
        deleteTask(listItem);
        addActiveTask(completedTaskName);
    });
});
