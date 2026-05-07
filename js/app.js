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

  const initialTargetId = window.location.hash ? window.location.hash.slice(1) : "";
  const initialTarget = initialTargetId ? document.getElementById(initialTargetId) : null;

  if (initialTarget) {
    const restoreInitialTarget = () => {
      if (typeof VitoraNavigation !== "undefined" && VitoraNavigation.scrollElementToTop) {
        VitoraNavigation.scrollElementToTop(initialTarget, "auto");
        return;
      }

      initialTarget.scrollIntoView({ behavior: "auto", block: "start" });
    };

    requestAnimationFrame(() => {
      restoreInitialTarget();
      window.setTimeout(restoreInitialTarget, 160);
    });
  }
});
 
