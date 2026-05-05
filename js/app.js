document.addEventListener("DOMContentLoaded", () => {
  if (typeof VitoraNavigation !== "undefined" && VitoraNavigation.init) {
    VitoraNavigation.init();
  }

  if (typeof VitoraInteractions !== "undefined" && VitoraInteractions.init) {
    VitoraInteractions.init();
  }
});
 
