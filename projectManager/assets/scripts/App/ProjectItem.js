/* eslint-disable multiline-ternary */
/* eslint-disable no-ternary */
/* eslint-disable function-call-argument-newline */
import { DOMHelper } from "../Utility/DOMHelper.js";
// import { Tooltip } from "./Tooltip.js";
export class ProjectItem {
  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.type = type;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.hasActiveTooltip = false;
    this.connectSwitchButton(this.type);
    this.connectMoreInfoButton();
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    import("./Tooltip.js").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        tooltipText,
        this.id
      );
      tooltip.attach();
      this.hasActiveTooltip = true;
    });
  }

  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });

    // item.addEventListener("dragend", (event) => {
    //   // console.log(event);
    // });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const MoreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    MoreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.type = type;
    this.connectSwitchButton(this.type);
  }
}
