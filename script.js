const sections = Array.from(document.querySelectorAll("[data-section]"));
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const progressBar = document.getElementById("scrollProgress");
const siteHeader = document.getElementById("siteHeader");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");
const prevSectionButton = document.getElementById("prevSection");
const nextSectionButton = document.getElementById("nextSection");

const roadmapData = [
  {
    stage: "Current focus",
    title: "MVP launch",
    text: "The first product phase focuses on validating the core experience: one app, three modules and an early user community."
  },
  {
    stage: "Growth phase",
    title: "App Store launch and social features",
    text: "The second phase expands reach through the official app launch, social features and a barcode scanner for faster nutrition tracking."
  },
  {
    stage: "Monetization phase",
    title: "Freemium model and premium subscription",
    text: "The monetization phase introduces premium AI features, deeper analysis and wearable integrations."
  },
  {
    stage: "Scale phase",
    title: "EU expansion and B2B opportunities",
    text: "The long-term roadmap targets European scaling, B2B gym partnerships and Series A preparation."
  }
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCurrentSectionIndex() {
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
  const safeIndex = clamp(index, 0, sections.length - 1);
  sections[safeIndex].scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;

  if (window.scrollY > 24) {
    siteHeader.classList.add("compact");
  } else {
    siteHeader.classList.remove("compact");
  }
}

function updateActiveNavigation(activeId) {
  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === activeId);
  });
}

function initSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;
        updateActiveNavigation(id);

        sections.forEach((section) => {
          section.classList.toggle("active-section", section.id === id);
        });
      });
    },
    { threshold: 0.48 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initRevealAnimations() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -70px 0px"
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initTabs() {
  const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((tabButton) => {
        const isActive = tabButton === button;
        tabButton.classList.toggle("active", isActive);
        tabButton.setAttribute("aria-selected", String(isActive));
      });

      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });
}

function initAccordion() {
  const accordionItems = Array.from(document.querySelectorAll(".accordion-item"));

  accordionItems.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      accordionItems.forEach((currentItem) => {
        currentItem.classList.remove("open");
      });

      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

function initRoadmap() {
  const roadmapCards = Array.from(document.querySelectorAll(".roadmap-card"));
  const stageElement = document.getElementById("roadmapStage");
  const titleElement = document.getElementById("roadmapTitle");
  const textElement = document.getElementById("roadmapText");

  function activateRoadmapCard(index) {
    const data = roadmapData[index];

    roadmapCards.forEach((card, cardIndex) => {
      card.classList.toggle("active", cardIndex === index);
    });

    stageElement.textContent = data.stage;
    titleElement.textContent = data.title;
    textElement.textContent = data.text;
  }

  roadmapCards.forEach((card) => {
    card.addEventListener("click", () => {
      activateRoadmapCard(Number(card.dataset.roadmap));
    });
  });
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem("vitora-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.dataset.theme = savedTheme;
  }

  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("vitora-theme", nextTheme);
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const currentTheme = document.documentElement.dataset.theme;
  themeIcon.textContent = currentTheme === "dark" ? "☾" : "☀";
}

function initPresentationControls() {
  nextSectionButton.addEventListener("click", () => {
    scrollToSection(getCurrentSectionIndex() + 1);
  });

  prevSectionButton.addEventListener("click", () => {
    scrollToSection(getCurrentSectionIndex() - 1);
  });

  window.addEventListener("keydown", (event) => {
    const isTyping =
      event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA" ||
      event.target.isContentEditable;

    if (isTyping) return;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      scrollToSection(getCurrentSectionIndex() + 1);
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToSection(getCurrentSectionIndex() - 1);
    }
  });
}

function initSmoothAnchorOffset() {
  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initAnimatedCounters() {
  const counterElements = Array.from(document.querySelectorAll(".metric-card span, .business-metrics strong"));

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("counter-active");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counterElements.forEach((element) => counterObserver.observe(element));
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSmoothAnchorOffset();
  initSectionObserver();
  initRevealAnimations();
  initTabs();
  initAccordion();
  initRoadmap();
  initPresentationControls();
  initAnimatedCounters();
  updateScrollProgress();
});
