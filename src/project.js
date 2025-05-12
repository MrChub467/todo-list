import $ from "jquery";

export default class Project {
    constructor(name) {
        this._name = name;
        this._todoList = [];
    }

    removeTask(name) {
        this._todoList = this._todoList.filter(task => task.title !== name);
    }

    set todoList(task) {
        this._todoList.push(task);
    }

    showProject() {
        console.log(this._name);
    }
}