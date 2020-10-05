class Component {
  constructor(elementId, insertBefore = false) {
    if (elementId) {
      this.hostElement = document.getElementById(elementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }
  attach() {
    this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
  }
  detach() {
    if(this.element) {
      this.element.remove();
    }
  }
}

class Helper {
  static moveElement(elementId, destinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(destinationSelector);
    destinationElement.append(element);
  }
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }
}

class Tooltip extends Component {
  constructor(hasActiveTooltipFn) {
    super();
    this.hasActiveTooltipFn = hasActiveTooltipFn;
    this.create();
  }
  create() {
    const tooltip = document.createElement('div');
    tooltip.className = 'card';
    tooltip.textContent = 'Some tooltip content here';
    tooltip.addEventListener('click', this.closeTooltip);
    this.element = tooltip;
  }
  closeTooltip = () => {
    this.detach();
    this.hasActiveTooltipFn();
  };
}

class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsFunction = updateProjectListsFunction;
    this.connectSwitchBtn(type);
    this.connectMoreInfoBtn();
  }
  connectSwitchBtn(type) {
    let switchBtn = document.getElementById(this.id).querySelector('button:last-of-type');
    switchBtn = Helper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener('click', this.updateProjectListsFunction.bind(null, this.id));
  }
  connectMoreInfoBtn() {
    const moreInfoBtn = document.getElementById(this.id).querySelector('button');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
  }
  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    } else {
      const tooltip = new Tooltip(() => {
        this.hasActiveTooltip = false;
      });
      tooltip.attach();
      this.hasActiveTooltip = true
    }
  }
  update(updateProjectListsFunction, type) {
    this.updateProjectListsFunction = updateProjectListsFunction;
    this.connectSwitchBtn(type);
  }
  
}

class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type
    const prjItems = document.querySelectorAll(`#${this.type}-projects li`)
    for(const prjItem of prjItems) {
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type ))
    }
  }
  setSwitchHandlerFn(switchHandlerFunction) {
    this.switchHandlerFunction = switchHandlerFunction;
  }
  addProject(project) {
    this.projects.push(project);
    Helper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);

  }
  switchProject(projectId) {
    this.switchHandlerFunction(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
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
