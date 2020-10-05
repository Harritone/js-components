class Component {
  constructor(hostElementId, insertBefore = false) { // expects id of element where to place this.element and boolean(true if insert before host element)
    if(hostElementId) { // check if instance got host element and if got assigns this.hostElement to it with selection and by default to body
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;// assigns insert before by default - false
  }
  attach() {
    // attach to this.hostElement with insertAdjacentElement according to this.insertBefore
    this.hostElement.insertAdjacentElement(this.insertBefore ? 'afterbegin' : 'beforeend', this.element);
  }
  detach() {
    //check if there is this.element and if there is remove
    if(this.element) {
      this.element.remove();
    }
  }
}

class Tooltip extends Component { // inherits from class Component
  constructor(closeNotifierFn){ //expects function as an argument that assigns to instance of ProjectItem static field 'hasActiveTooltip' to false
    super(); //calls to superclass constructor
    this.closeNotifier = closeNotifierFn; // assigns to this instance recieved function of ProjectItem instance
    this.create();//call create function of this instance
  }
  create() {
    const tooltip = document.createElement('div')//create an element and assigns to the constant
    tooltip.className = 'card';// adds a css class of 'card' to the element
    tooltip.textContent = 'some content'; // assign a text content to the element
    tooltip.addEventListener('click', this.closeTooltip);// adds an event listener of click to the element
    this.element = tooltip; // add a property 'element' of this class and assigns it to the created element
  }
  closeTooltip = () => {
    this.detach();//calls detach function of the supperclass
    this.closeNotifier();// calls to a property function that was recieved from ProjectItem instance, sets static field 'hasActiveTooltip' to false
  };
}

class Helper { 
  // static function - clears event listeners from recieved element and returns new element, expexts element as an argument
  static clearEventListeners(element) {
    const clonedEl = element.cloneNode(true); // clones recieved element and assignes it to the constant
    element.replaceWith(clonedEl);//replaces recieved element with cloned element
    return clonedEl; //returns cloned element
  }
  //static function that expects element id and destination selector as arguments
  static moveElement(elementId, destinationSelector) {
    const element = document.getElementById(elementId); // selects element from DOM by recieved ID and assigns it to the constant
    const destination = document.querySelector(destinationSelector);// selects element from the DOM by recieved destination selector and assigns it to the constant
    destination.append(element); // append element to the destination
  }
}

class ProjectItem {
  hasActiveTooltip = false; // static field that points wheter instance has active tooltip or not, by default - flase
  constructor(id, updateProjectListsFunction, type) { // constructor expects id, updateProjectListsFunction(from ProjectList instance it is going to be switchProject) and type(active or finished)
    this.id = id;//assigns an id to the instance property
    this.updateProjectListsHandler = updateProjectListsFunction;// assigns recieved from ProjectList instance function to this property
    this.connectSwitchBtn(type);//calls function of this instance to add event listener to the switch buttton
    this.connectMoreInfoBtn();// cals function of this instance to add event listener to the more info
  }
  connectSwitchBtn(type) {//function adds an event listener to the switch button, expects type as an argument
    let switchBtn = document.getElementById(this.id).querySelector('button:last-of-type');//selects the button from the DOM and assigns it to the variable
    switchBtn = Helper.clearEventListeners(switchBtn); // call the Helper static function and reassigns returned element to the variable
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';// checks the type and assigns text content to the element accordingly
    switchBtn.addEventListener('click', this.updateProjectListsHandler.bind(null, this.id));// adds an event listener to the click event to the instance property function(was recieved from ProjectList instance (swictchProject) and binds (null, this.id) - id of the project
  }
  update(updateProjectsListFn, type){//function expects to recieve function from ProjectList instance(switchProject()) and type
    this.updateProjectListsHandler = updateProjectsListFn;// updates updateProjectHandler whith recieved function
    this.connectSwitchBtn(type);// calls connectSwitchButton function of this instance and pass type to it as an argument
  }
  showMoreInfoHandler() {// function going to be called when we add an event listener to the show more button
    if(this.hasActiveTooltip) {// checks if instance has active tooltip
      return; // if it has do nothing
    }
    const tooltip = new Tooltip(() => { // if it hasn't assings to the constant a new instance of Tooltip class 
      this.hasActiveTooltip = false; // and pass an arrow function that sets static field of the ProjectItem instance 'hasActiveTooltip' to false as an argument
    });
    tooltip.attach(); // calls the attach function of the tooltip instance
    this.hasActiveTooltip = true;// sets the static field hasActiveTooltip of ProjectItem instance to false
  }
  connectMoreInfoBtn() { // adds an event listener to the show more button 
    const moreInfoBtn = document.getElementById(this.id).querySelector('button');// selects the button from the DOM and assigns it to the constant
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);// adds an event listener to the selected element and calls showMoreInfoHandler when it clicked
  }
}

class ProjectList {
  projects = []; // creates a static field of an array to collect instances of the ProjectItem class
  constructor(type){ //expects type as an argument
    this.type = type;// assigns type to the property
    const prjItems = document.querySelectorAll(`#${type}-projects li`); // collect all projects of the type from the DOM
    for(const prjItem of prjItems) {// loop thrue the collection of all elements of the type
      this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));// instantiate a new instance of the ProjectItem and passes id of collected elements, switchProject function of ProjectList instance binded to this and static property of type then adds it to the projects array(static field) 
    }
  }
  setSwitchHandlerFn(switchHandlerFn) { //sets switchHandler property of the Instance when all instances of ProjectList will be instanciated
    this.switchHandler = switchHandlerFn;
  }
  addProject(project) {// function adds ProjectItem to the static field of the ProjectList instance and updates the UI, expects project as an argument
    this.projects.push(project); // adds the recieved project to the static field of the instance
    Helper.moveElement(project.id, `#${this.type}-projects ul`);// calls Helper static function to move element and passes project.id and destination element(active/finished projects unorded list)
    project.update(this.switchProject.bind(this), this.type);// calls update function of ProjectItem instance on recieved project and passes switchProject function of ProjectList instance binded to this and ProjectList instance property type
  }
  switchProject(projectId) {// function expects projectId as an argument and finds the project and remove it from the projects array of static field of the ProjectList instance
    //console.log(projectId);
    this.switchHandler(this.projects.find(p => p.id === projectId));// calls ProjectList instance property function switchHandler and find project and pass it further
    this.projects = this.projects.filter(p => p.id !== projectId);// remove project
  }
}

class App {
  static initialize() { // static method that handles the initialization
    const activeProjectsList = new ProjectList('active');// instantiate the new instance of the ProjectList with 'active' type
    const finishedProjectsList = new ProjectList('finished');// instantiate the new instance of the ProjectList with 'finished' type
    activeProjectsList.setSwitchHandlerFn(finishedProjectsList.addProject.bind(finishedProjectsList));// calls setSwitchHandlerFn on the activeProjectsList and passes addProject function of the finishedProjectsList of ProjectList instance binded to the finishedProjectsList 
    finishedProjectsList.setSwitchHandlerFn(activeProjectsList.addProject.bind(activeProjectsList)); // the same but vice versa
  }
}

App.initialize();// calls static initialize function on the App class
