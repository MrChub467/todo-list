import $ from "jquery";
import "./styles.css";
import "./test.css";
import Project from "./project.js";
import Task from "./task.js";
import changeProject from "./tabs.js";

const projectDialog = document.querySelector(".project-dialog")
const taskDialog = document.querySelector(".task-dialog");
let projects = [];
let currentProject = null;
// let currentButton = null;

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
    let name = formData.get("name")
    if (name) {
        e.target.reset();
        projectDialog.close();
        const newProject = new Project(name);
        currentProject = newProject;
        name.toLowerCase().replaceAll(" ", "-");
        createProjectTab(name);            
        projects.push(newProject);
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



const testprojects = $('[data-project-target]');
for(let test of testprojects) changeProject($(test))

function createProjectTab(name) {
    let btn = `<li data-project-target="#${name.toLowerCase().replaceAll(" ", "-")}" class="active tab"><button>${name}</button></li>`
    $(".project-tabs").append(btn);
    btn = $(".project-tabs li:last-child");
    createProjectTaskList(name);
    changeProject(btn);
    btn.click();
}

function createProjectTaskList(name) {
    $("<div>")
        .attr("id", name.toLowerCase().replaceAll(" ", "-"))
        .appendTo($(".tasks"));
}


    

