const VitoraNavigation = (() => {
  let sections = [];
  let navLinks = [];

  const state = {
    activeIndex: 0
  };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getSectionIndexFromScroll() {
    const midpoint = window.scrollY + window.innerHeight / 2;
    let activeIndex = 0;

    sections.forEach((section, index) => {
      if (midpoint >= section.offsetTop) {
        activeIndex = index;
      }
    });

    return activeIndex;
  }

  function scrollToSection(index) {
    if (!sections.length) return;

    const safeIndex = clamp(index, 0, sections.length - 1);
    sections[safeIndex].scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function updateProgress() {
    const progressBar = document.getElementById("scrollProgress");
    const siteHeader = document.getElementById("siteHeader");

    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle("compact", window.scrollY > 24);
    }
  }

  function updateCounter(index) {
    const sectionCounter = document.getElementById("sectionCounter");
    const sectionTotal = document.getElementById("sectionTotal");

    if (sectionCounter) {
      sectionCounter.textContent = String(index + 1);
    }

    if (sectionTotal) {
      sectionTotal.textContent = String(sections.length);
    }
  }

  function updateNavigation(activeId) {
    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", targetId === activeId);
    });
  }

  function setActiveSection(index) {
    state.activeIndex = clamp(index, 0, sections.length - 1);

    sections.forEach((section, sectionIndex) => {
      section.classList.toggle("active-section", sectionIndex === state.activeIndex);
    });

    const activeSection = sections[state.activeIndex];
    if (activeSection) {
      updateNavigation(activeSection.id);
    }

    updateCounter(state.activeIndex);
  }

  function initSectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = sections.indexOf(entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        });
      },
      {
        threshold: 0.46
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initAnchorLinks() {
    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) return;

        event.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  function initButtons() {
    const prevButton = document.getElementById("prevSection");
    const nextButton = document.getElementById("nextSection");

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        scrollToSection(getSectionIndexFromScroll() - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        scrollToSection(getSectionIndexFromScroll() + 1);
      });
    }
  }

  function initKeyboardControls() {
    window.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      const currentIndex = getSectionIndexFromScroll();

      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        scrollToSection(currentIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        scrollToSection(currentIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToSection(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToSection(sections.length - 1);
      }
    });
  }

  function init() {
    sections = Array.from(document.querySelectorAll("[data-section]"));
    navLinks = Array.from(document.querySelectorAll(".main-nav a"));

    initSectionObserver();
    initAnchorLinks();
    initButtons();
    initKeyboardControls();

    updateProgress();
    setActiveSection(getSectionIndexFromScroll());

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", () => {
      updateProgress();
      setActiveSection(getSectionIndexFromScroll());
    });
  }

  return {
    init,
    scrollToSection
  };
})();
