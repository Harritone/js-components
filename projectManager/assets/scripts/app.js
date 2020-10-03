class DOMHelper {
  static clearEventListeners(element) {
    const clonedEl = element.cloneNode(true);
    element.replaceWith(clonedEl);
    return clonedEl;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElId, insertBefore = false) {
    if (hostElId) {
      this.hostEl = document.getElementById(hostElId);
    } else {
      this.hostEl = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
    }
  }
  attach() {
    this.hostEl.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifier()
  };
  create() {
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'card';
    tooltipEl.textContent = 'Some tooltip here';
    tooltipEl.addEventListener('click', this.closeTooltip);
    this.element = tooltipEl;
  }
}
class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListsFunction) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton();
  }
  showMoreInfoHandler() {
    if(this.hasActiveTooltip) {
      return;
    } 
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  connectMoreInfoButton() {
    const projectItemEl = document.getElementById(this.id);
    const moreInfoBtn = projectItemEl.querySelector('button');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
  }
  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));
  }
  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type)
  }
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for(const prjItem of prjItems) {
      this.projects.push( new ProjectItem(prjItem.id, this.switchProject.bind(this)));
    }
    console.log(this.projects);
  }

  setSwicthHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }

}

class App {
  static initialize() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    activeProjects.setSwicthHandlerFunction(finishedProjects.addProject.bind(finishedProjects));
    finishedProjects.setSwicthHandlerFunction(activeProjects.addProject.bind(activeProjects));
  }
}
App.initialize();
