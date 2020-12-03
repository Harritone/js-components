import { ProjectList } from "./App/ProjectList";
class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");
    activeProjectList.setSwitchHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );

    // const someScript = document.createElement("script");
    // someScript.textContent = 'alert("hi there")';
    // document.head.append(someScript);
  }
}

App.init();
