import $ from "jquery";

export default class Task {
    constructor(title, dueDate, priority) {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    showTask() {
        $("<div>")
            .append($("<p>").text(this.title))
            .append($("<p>").text(this.dueDate))
            .append($("<p>").text(this.priority))
            .append($("<button>").text("X").addClass(`${this.title.replaceAll(" ", "-")}`))
            .appendTo($(".tasks"));
    }
}