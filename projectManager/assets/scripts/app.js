class Tooltip {

}

class ProjectItem {

}

class ProjectList {
  projects = [];
  constructor(type){
    //this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    console.log(prjItems);
  }


}

class App {
  static initialize() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
  }
}

App.initialize();
