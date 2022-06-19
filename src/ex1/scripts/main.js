import App from "./";

class Main {
  constructor() {
    this.app = new App();
  }
  init() {
    this.app.initializeApp();
  }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
  alert("Main init");

  main.init();
});
