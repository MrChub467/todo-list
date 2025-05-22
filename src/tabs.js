import $ from "jquery";

export default function(project) {
    $(project).on('click', () => {
        const projects = $('[data-project-target]').get();
        const projectContents = $('[data-project-content]').get();
        const target = $($(project).data("projectTarget"));
        projectContents.forEach(tabContent => {
        $(tabContent).removeClass('active')
        })
        projects.forEach(tab => {
        $(tab).removeClass('active')
        })
        project.addClass('active')
        target.addClass('active')
    })
}