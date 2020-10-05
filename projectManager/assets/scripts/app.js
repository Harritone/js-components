class Tooltip {

}

class ProjectItem {
  constructor(id) {
    this.id = id;
    this.connectSwitchBtn();
    this.connectMoreInfoBtn();
  }
  connectSwitchBtn() {
    const switchBtn = document.getElementById(this.id).querySelector('button:last-of-type');
    switchBtn.addEventListener('click', () => {
      console.log('aaa');
    })
  }
  connectMoreInfoBtn() {

  }
}

class ProjectList {
  projects = [];
  constructor(type){
    //this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for(const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id));
    }
    console.log(this.projects);
  }
  switchProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
  addProject() {
    
  }
}

class App {
  static initialize() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
  }
}

App.initialize();
