document.addEventListener("DOMContentLoaded", () => {
  if (typeof VitoraPresentation !== "undefined" && VitoraPresentation.render) {
    VitoraPresentation.render();
  }

  if (typeof VitoraNavigation !== "undefined" && VitoraNavigation.init) {
    VitoraNavigation.init();
  }

  if (typeof VitoraInteractions !== "undefined" && VitoraInteractions.init) {
    VitoraInteractions.init();
  }
});
 
