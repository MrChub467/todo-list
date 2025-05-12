import $ from "jquery";
import "./styles.css";
import Project from "./project.js";
import Task from "./task.js";

const projectDialog = document.querySelector(".project-dialog")
const taskDialog = document.querySelector(".task-dialog");
let projects = [];
let currentProject = null;

$( function() {
    $(".add-project").on("click", () => {
        projectDialog.showModal();
    });
    $(".add-task").on("click", () => {
        taskDialog.showModal();
    })
});

$("#project-form").on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name")
    if (name) {
        e.target.reset();
        projectDialog.close();
        const newProject = new Project(name);
        currentProject = newProject;
        $(`<button>${name}</button>`).insertBefore(".add-project").on("click", () => {
            currentProject = newProject.showProject();
        });
        projects.push(newProject)
    }
})

$("#task-form").on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name")
    if (name) {
        e.target.reset();
        taskDialog.close();
        const newTask = new Task(name, formData.get("dueDate"), formData.get("priority"));
        currentProject.todoList = newTask;
        newTask.showTask();
        $(`.${name.replaceAll(" ", "-")}`).on("click", function() {
            $(this).parent().remove();
            currentProject.removeTask(name);
        })
    }
})

$(".form-cancel").on("click", (e) => {
    e.preventDefault();
    e.target.parentElement.reset();
    e.target.parentElement.parentElement.close();
})

