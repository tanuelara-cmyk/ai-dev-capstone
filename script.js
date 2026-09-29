const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

function updateEmptyMessage() {
    const hasTasks = taskList.children.length > 0;
    emptyMessage.classList.toggle("hidden", hasTasks);
}

function createTaskItem(taskText) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = taskText;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-button";
    completeButton.textContent = "Complete";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    completeButton.addEventListener("click", function () {
        const isCompleted = listItem.classList.toggle("completed");
        completeButton.textContent = isCompleted ? "Undo" : "Complete";
    });

    deleteButton.addEventListener("click", function () {
        listItem.remove();
        updateEmptyMessage();
    });

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    listItem.appendChild(text);
    listItem.appendChild(actions);

    return listItem;
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskInput.focus();
        return;
    }

    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskInput.focus();
    updateEmptyMessage();
});

updateEmptyMessage();
