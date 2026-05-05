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

  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("vitora-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      document.documentElement.dataset.theme = savedTheme;
    }

    function updateIcon() {
      const currentTheme = document.documentElement.dataset.theme;
      if (themeToggle) {
        themeToggle.textContent = currentTheme === "dark" ? "☾" : "☀";
      }
    }

    updateIcon();

    if (!themeToggle) return;

    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.dataset.theme = nextTheme;
      localStorage.setItem("vitora-theme", nextTheme);
      updateIcon();
    });
  }

  function initFullscreenToggle() {
    const fullscreenToggle = document.getElementById("fullscreenToggle");

    if (!fullscreenToggle) return;

    fullscreenToggle.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          fullscreenToggle.textContent = "Exit";
        } else {
          await document.exitFullscreen();
          fullscreenToggle.textContent = "Present";
        }
      } catch {
        fullscreenToggle.textContent = "Present";
      }
    });

    document.addEventListener("fullscreenchange", () => {
      fullscreenToggle.textContent = document.fullscreenElement ? "Exit" : "Present";
    });
  }

  function initTabs() {
    const tabButtons = Array.from(document.querySelectorAll(".tab-button"));
    const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach((tabButton) => {
          tabButton.classList.toggle("active", tabButton === button);
        });

        tabPanels.forEach((panel) => {
          panel.classList.toggle("active", panel.id === target);
        });
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
      if (!data || !stageElement || !titleElement || !textElement) return;

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

  function getScoreRecommendation(score, training, nutrition, mood) {
    const lowest = Math.min(training, nutrition, mood);

    if (score >= 85) {
      return "Strong alignment. Keep the current rhythm and use tomorrow for controlled progression.";
    }

    if (lowest === training) {
      return "Training consistency is the weakest signal. Start with a shorter workout and rebuild momentum.";
    }

    if (lowest === nutrition) {
      return "Nutrition is limiting progress. Increase protein and plan one simple high-quality meal today.";
    }

    return "Mental wellbeing needs attention. Reduce intensity slightly and prioritize recovery before pushing harder.";
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

    if (!trainingSlider || !nutritionSlider || !moodSlider) return;

    function updateScore() {
      const training = Number(trainingSlider.value);
      const nutrition = Number(nutritionSlider.value);
      const mood = Number(moodSlider.value);
      const score = Math.round(training * 0.36 + nutrition * 0.34 + mood * 0.3);

      trainingValue.textContent = String(training);
      nutritionValue.textContent = String(nutrition);
      moodValue.textContent = String(mood);

      scoreValue.textContent = `${score}%`;

      if (heroScore) {
        heroScore.textContent = `${score}%`;
      }

      if (score >= 85) {
        scoreLabel.textContent = "Strong daily alignment";
      } else if (score >= 65) {
        scoreLabel.textContent = "Good, but improvable";
      } else {
        scoreLabel.textContent = "Needs recovery and structure";
      }

      recommendation.textContent = getScoreRecommendation(score, training, nutrition, mood);
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
        return `€${(value / 1000000).toFixed(1)}M`;
      }

      return `€${Math.round(value / 1000)}K`;
    }

    function updateRevenue() {
      const conversion = Number(conversionSlider.value);
      const premiumUsers = projectedUsers * (conversion / 100);
      const annualRevenue = premiumUsers * monthlyPrice * 12;

      conversionValue.textContent = `${conversion}%`;
      revenueValue.textContent = formatRevenue(annualRevenue);
    }

    conversionSlider.addEventListener("input", updateRevenue);
    updateRevenue();
  }

  function initTiltCards() {
    const cards = Array.from(
      document.querySelectorAll(".glass-card, .metric-card, .pricing-card, .roadmap-card")
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 7;
        const rotateX = ((y / rect.height) - 0.5) * -7;

        card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function init() {
    initRevealAnimations();
    initThemeToggle();
    initFullscreenToggle();
    initTabs();
    initRoadmap();
    initScoreSimulator();
    initRevenueCalculator();
    initTiltCards();
  }

  return {
    init
  };
})();
