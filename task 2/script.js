document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const categorySelect = document.getElementById('category-select');
    const dueDateInput = document.getElementById('due-date-input');
    const prioritySelect = document.getElementById('priority-select');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value, categorySelect.value, dueDateInput.value, prioritySelect.value);
        taskInput.value = '';
        dueDateInput.value = '';
    });

    function addTask(task, category, dueDate, priority) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        
        const taskDetails = `${task} - ${category} - Due: ${dueDate} - Priority: ${priority}`;

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskDetails;

        const completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            li.classList.toggle('complete');
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        li.appendChild(taskSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        sortTasks();
    }

    function sortTasks() {
        const tasks = Array.from(taskList.querySelectorAll('.task-item'));
        tasks.sort((a, b) => {
            const aPriority = getPriorityValue(a);
            const bPriority = getPriorityValue(b);
            const aDueDate = new Date(a.querySelector('span').textContent.split('Due: ')[1].split(' - ')[0]);
            const bDueDate = new Date(b.querySelector('span').textContent.split('Due: ')[1].split(' - ')[0]);
            
            if (aPriority === bPriority) {
                return aDueDate - bDueDate;
            }
            return bPriority - aPriority;
        });

        tasks.forEach(task => taskList.appendChild(task));
    }

    function getPriorityValue(task) {
        const priorityText = task.querySelector('span').textContent.split('Priority: ')[1];
        switch (priorityText) {
            case 'High': return 3;
            case 'Medium': return 2;
            default: return 1;
        }
    }
});
