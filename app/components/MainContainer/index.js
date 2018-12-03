export default class MainContainer {
  constructor() {
    this.container = '<div class=main-container></div>';
  }

  insertContainer() {
    const mainBody = document.body;
    mainBody.innerHTML = this.container;
  }
}
