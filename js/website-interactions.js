const VitoraInteractions = (() => {
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

  const appPreviewModes = {
    move: {
      score: 87,
      label: "Habits aligned",
      stack: [
        ["Goal", "3 balanced meals"],
        ["Habit", "Evening walk"],
        ["Progress", "On track"]
      ],
      coach:
        "Keep today's plan simple: prepare one balanced meal and log how it supports your energy."
    },
    fuel: {
      score: 74,
      label: "Dinner focus",
      stack: [
        ["Breakfast", "Logged"],
        ["Lunch", "Balanced plate"],
        ["Dinner", "Plan needed"]
      ],
      coach:
        "Add a protein-rich, vegetable-based dinner and avoid turning the day into a calorie calculation."
    },
    mind: {
      score: 91,
      label: "Reflection strong",
      stack: [
        ["Mood", "Positive"],
        ["Energy", "Stable"],
        ["Check-in", "2 min streak"]
      ],
      coach:
        "Use the evening check-in to notice what worked today and choose one realistic step for tomorrow."
    }
  };

  function readStoredTheme() {
    try {
      return localStorage.getItem("vitora-theme");
    } catch {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem("vitora-theme", theme);
    } catch {
      // The toggle still works even when storage is unavailable.
    }
  }

  function isMobileLikeViewport() {
    return (
      window.matchMedia &&
      (window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches)
    );
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function initRevealAnimations() {
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) return;

    if (isMobileLikeViewport() || prefersReducedMotion() || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("visible"));
      return;
    }

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

  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = readStoredTheme();

    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.dataset.theme = savedTheme;
    } else if (!document.documentElement.dataset.theme) {
      document.documentElement.dataset.theme = "dark";
    }

    function updateIcon() {
      const currentTheme = document.documentElement.dataset.theme;
      if (themeToggle) {
        themeToggle.textContent = currentTheme === "dark" ? "\u263E" : "\u2600";
        themeToggle.setAttribute(
          "aria-label",
          currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        );
      }
    }

    updateIcon();

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      storeTheme(nextTheme);
      updateIcon();
    });
  }

  function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById("fullscreenToggle");

    if (!fullscreenToggle) return;

    function updateFullscreenText() {
      fullscreenToggle.textContent = document.fullscreenElement ? "Exit" : "Present";
    }

    fullscreenToggle.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } catch {
        updateFullscreenText();
      }
    });

    document.addEventListener("fullscreenchange", updateFullscreenText);
    updateFullscreenText();
  }

  function initTabs() {
    const tabGroups = Array.from(document.querySelectorAll(".tabs"));
    if (!tabGroups.length) return;

    tabGroups.forEach((group) => {
      const tabButtons = Array.from(group.querySelectorAll(".tab-button[data-tab]"));
      const tabPanels = Array.from(group.querySelectorAll(".tab-panel"));
      if (!tabButtons.length || !tabPanels.length) return;

      tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", button.classList.contains("active") ? "true" : "false");

        button.addEventListener("click", () => {
          const target = button.dataset.tab;
          if (!target) return;

          tabButtons.forEach((tabButton) => {
            const isActive = tabButton === button;
            tabButton.classList.toggle("active", isActive);
            tabButton.setAttribute("aria-selected", isActive ? "true" : "false");
          });

          tabPanels.forEach((panel) => {
            const isActive = panel.id === target;
            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
          });
        });
      });

      tabPanels.forEach((panel) => {
        panel.hidden = !panel.classList.contains("active");
      });
    });
  }

  function renderAppPreviewStack(stackElement, items) {
    stackElement.replaceChildren(
      ...items.map(([label, value]) => {
        const row = document.createElement("div");
        const labelElement = document.createElement("span");
        const valueElement = document.createElement("strong");

        labelElement.textContent = label;
        valueElement.textContent = value;
        row.append(labelElement, valueElement);

        return row;
      })
    );
  }

  function initAppPreview() {
    const previews = Array.from(document.querySelectorAll("[data-app-preview]"));
    if (!previews.length) return;

    previews.forEach((preview) => {
      const modeControls = Array.from(preview.querySelectorAll("[data-app-mode]"));
      const scoreElement = preview.querySelector("[data-app-preview-score]");
      const labelElement = preview.querySelector("[data-app-preview-label]");
      const stackElement = preview.querySelector("[data-app-preview-stack]");
      const coachElement = preview.querySelector("[data-app-preview-coach]");
      const ringElement = preview.querySelector("[data-app-preview-ring]");

      function activateMode(mode) {
        const data = appPreviewModes[mode] || appPreviewModes.move;

        modeControls.forEach((control) => {
          const isActive = control.dataset.appMode === mode;
          control.classList.toggle("active", isActive);
          control.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        if (scoreElement) scoreElement.textContent = `${data.score}%`;
        if (labelElement) labelElement.textContent = data.label;
        if (ringElement) ringElement.style.setProperty("--score-percent", `${data.score}%`);
        if (stackElement) renderAppPreviewStack(stackElement, data.stack);
        if (coachElement) coachElement.textContent = data.coach;
      }

      modeControls.forEach((control) => {
        control.addEventListener("click", () => {
          activateMode(control.dataset.appMode || "move");
        });
      });

      activateMode("move");
    });
  }

  function initRoadmap() {
    const roadmapCards = Array.from(document.querySelectorAll(".roadmap-card"));
    const stageElement = document.getElementById("roadmapStage");
    const titleElement = document.getElementById("roadmapTitle");
    const textElement = document.getElementById("roadmapText");
    if (!roadmapCards.length) return;

    function activateRoadmapCard(index) {
      const data = roadmapData[index];
      if (!data) return;

      roadmapCards.forEach((card, cardIndex) => {
        card.classList.toggle("active", cardIndex === index);
        card.setAttribute("aria-pressed", cardIndex === index ? "true" : "false");
      });

      if (stageElement) stageElement.textContent = data.stage;
      if (titleElement) titleElement.textContent = data.title;
      if (textElement) textElement.textContent = data.text;
    }

    roadmapCards.forEach((card) => {
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-pressed", card.classList.contains("active") ? "true" : "false");

      card.addEventListener("click", () => {
        const index = Number(card.dataset.roadmap);
        activateRoadmapCard(Number.isFinite(index) ? index : 0);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        event.preventDefault();
        const index = Number(card.dataset.roadmap);
        activateRoadmapCard(Number.isFinite(index) ? index : 0);
      });
    });
  }

  function getScoreRecommendation(score, training, nutrition, mood) {
    const areas = [
      {
        value: training,
        strong: "Habit consistency is the lowest signal, but still solid. Keep the next action small and repeatable.",
        medium: "Habit consistency is the weakest signal. Choose one realistic routine before adding another goal.",
        low: "Habits need structure first. Pick one achievable action today and make it easy to repeat."
      },
      {
        value: nutrition,
        strong: "Nutrition is the lowest signal, but the day is still aligned. Add one balanced meal to lock it in.",
        medium: "Nutrition is limiting progress. Plan one simple, high-quality meal today.",
        low: "Nutrition needs attention first. Build the next meal around protein, fiber and hydration."
      },
      {
        value: mood,
        strong: "Coaching reflection is the lowest signal, but still stable. End the day with one honest check-in.",
        medium: "Reflection needs attention. Reduce pressure and focus on what made the habit easier or harder.",
        low: "Support should lead today. Use one kind check-in and choose a lighter next step."
      }
    ];
    const weakest = areas.reduce((lowest, area) => (area.value < lowest.value ? area : lowest), areas[0]);

    if (score >= 85) {
      return weakest.strong;
    }

    if (score >= 65) {
      return weakest.medium;
    }

    return weakest.low;
  }

  function initScoreSimulator() {
    const trainingSlider = document.getElementById("trainingSlider");
    const nutritionSlider = document.getElementById("nutritionSlider");
    const moodSlider = document.getElementById("moodSlider");

    const trainingValue = document.getElementById("trainingValue");
    const nutritionValue = document.getElementById("nutritionValue");
    const moodValue = document.getElementById("moodValue");

    const scoreValue = document.getElementById("scoreValue");
    const scoreLabel = document.getElementById("scoreLabel");
    const heroScore = document.getElementById("heroScore");
    const recommendation = document.getElementById("scoreRecommendation");
    const scoreRing = document.querySelector(".score-ring");

    if (!trainingSlider || !nutritionSlider || !moodSlider) return;

    function updateScore() {
      const training = Number(trainingSlider.value || 0);
      const nutrition = Number(nutritionSlider.value || 0);
      const mood = Number(moodSlider.value || 0);
      const score = Math.round(training * 0.36 + nutrition * 0.34 + mood * 0.3);

      if (trainingValue) trainingValue.textContent = String(training);
      if (nutritionValue) nutritionValue.textContent = String(nutrition);
      if (moodValue) moodValue.textContent = String(mood);

      if (scoreValue) scoreValue.textContent = `${score}%`;

      if (heroScore) {
        heroScore.textContent = `${score}%`;
      }

      if (scoreRing) {
        scoreRing.style.setProperty("--score-percent", `${score}%`);
      }

      if (scoreLabel && score >= 85) {
        scoreLabel.textContent = "Strong daily alignment";
      } else if (scoreLabel && score >= 65) {
        scoreLabel.textContent = "Good, but improvable";
      } else if (scoreLabel) {
        scoreLabel.textContent = "Needs recovery and structure";
      }

      if (recommendation) {
        recommendation.textContent = getScoreRecommendation(score, training, nutrition, mood);
      }
    }

    [trainingSlider, nutritionSlider, moodSlider].forEach((slider) => {
      slider.addEventListener("input", updateScore);
    });

    updateScore();
  }

  function initRevenueCalculator() {
    const conversionSlider = document.getElementById("conversionSlider");
    const conversionValue = document.getElementById("conversionValue");
    const revenueValue = document.getElementById("revenueValue");

    if (!conversionSlider || !conversionValue || !revenueValue) return;

    const projectedUsers = 50000;
    const monthlyPrice = 9.99;

    function formatRevenue(value) {
      if (value >= 1000000) {
        return `\u20ac${(value / 1000000).toFixed(1)}M`;
      }

      return `\u20ac${Math.round(value / 1000)}K`;
    }

    function updateRevenue() {
      const conversion = Number(conversionSlider.value || 0);
      const premiumUsers = projectedUsers * (conversion / 100);
      const annualRevenue = premiumUsers * monthlyPrice * 12;

      conversionValue.textContent = `${conversion}%`;
      revenueValue.textContent = formatRevenue(annualRevenue);
    }

    conversionSlider.addEventListener("input", updateRevenue);
    updateRevenue();
  }

  function initTiltCards() {
    if (prefersReducedMotion() || isMobileLikeViewport()) return;

    const cards = Array.from(
      document.querySelectorAll(
        ".glass-card, .metric-card, .pricing-card, .roadmap-card, .presentation-card, .strategy-card"
      )
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      let tiltFrame = 0;
      let pendingEvent = null;

      function applyTilt() {
        tiltFrame = 0;
        if (!pendingEvent) return;

        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = pendingEvent.clientX - rect.left;
        const y = pendingEvent.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((y / rect.height) - 0.5) * -7;

        card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      card.addEventListener(
        "mousemove",
        (event) => {
          pendingEvent = event;

          if (!tiltFrame) {
            tiltFrame = requestAnimationFrame(applyTilt);
          }
        },
        { passive: true }
      );

      card.addEventListener("mouseleave", () => {
        pendingEvent = null;

        if (tiltFrame) {
          cancelAnimationFrame(tiltFrame);
          tiltFrame = 0;
        }

        card.style.transform = "";
      });
    });
  }

  function init() {
    initRevealAnimations();
    initThemeToggle();
    initFullscreenToggle();
    initTabs();
    initAppPreview();
    initRoadmap();
    initScoreSimulator();
    initRevenueCalculator();
    initTiltCards();
  }

  return {
    init
  };
})();
