class Tooltip {

}

class ProjectItem {
  constructor(id, updateProjectListsFn) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchBtn();
    this.connectMoreInfoBtn();
  }
  connectSwitchBtn() {
    const switchBtn = document.getElementById(this.id).querySelector('button:last-of-type');
    switchBtn.addEventListener('click', this.updateProjectListsHandler);
  }
    connectMoreInfoBtn() {

  }
}

class ProjectList {
  projects = [];
  constructor(type){
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for(const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
    }
    console.log(this.projects);
  }
  setSwitchHandlerFn(switchHandlerFn) {
    this.switchHandler = switchHandlerFn;
  }
  switchProject(projectId) {
    this.switchHandler(this.projects.find(p => p === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
  addProject() {
    console.log(this);
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
