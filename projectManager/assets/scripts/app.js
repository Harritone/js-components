class Tooltip {

}

class Helper {
  static clearEventListeners(element) {
    const clonedEl = element.cloneNode(true);
    element.replaceWith(clonedEl);
    return clonedEl;
  }
  static moveElement(elementId, destinationSelector) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(destinationSelector);
    destination.append(element);
  }
}

class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectSwitchBtn(type);
    this.connectMoreInfoBtn();
  }
  connectSwitchBtn(type) {
    let switchBtn = document.getElementById(this.id).querySelector('button:last-of-type');
    switchBtn = Helper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
  }
  update(updateProjectsListFn, type){
    this.updateProjectListsHandler = updateProjectsListFn;
    this.connectSwitchBtn(type);
  }
    connectMoreInfoBtn() {

  }
}

class ProjectList {
  projects = [];
  constructor(type){
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`); // collect all projects of type
    for(const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
    }
    console.log(this.projects);
  }
  setSwitchHandlerFn(switchHandlerFn) {
    this.switchHandler = switchHandlerFn;
  }
  addProject(project) {
    console.log(project);
    this.projects.push(project);
    Helper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }
  switchProject(projectId) {
    //console.log(projectId);
    this.switchHandler(this.projects.find(p => p.id === projectId));//find project and pass it further
    this.projects = this.projects.filter(p => p.id !== projectId);// remove project
  }
}

class App {
  static initialize() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFn(finishedProjectsList.addProject.bind(finishedProjectsList));
    finishedProjectsList.setSwitchHandlerFn(activeProjectsList.addProject.bind(activeProjectsList));
  }
}

App.initialize();
