const VitoraPresentation = (() => {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMeta(slide, index, total) {
    return `
      <div class="slide-meta">
        <span>${escapeHtml(slide.section)}</span>
        <span>${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
        ${slide.speaker ? `<span>${escapeHtml(slide.speaker)}</span>` : ""}
      </div>
    `;
  }

  function renderImage(slide) {
    if (!slide.image) return "";

    return `
      <figure class="slide-image-frame">
        <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.title)}" loading="lazy" decoding="async" />
      </figure>
    `;
  }

  function renderMetrics(metrics = [], className = "metric-grid") {
    return `
      <div class="${className}">
        ${metrics
          .map(
            (metric) => `
              <article class="presentation-card metric-tile">
                <strong>${escapeHtml(metric.value)}</strong>
                <span>${escapeHtml(metric.label)}</span>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderList(items = [], className = "clean-list") {
    return `
      <ul class="${className}">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    `;
  }

  function renderNotes(slide) {
    if (!slide.notes) return "";

    return `<p class="slide-note">${escapeHtml(slide.notes)}</p>`;
  }

  function renderCover(slide) {
    return `
      <div class="cover-layout">
        <div class="cover-copy reveal">
          <p class="eyebrow hero-pill">The future of healthy living</p>
          <h1 class="hero-title">
            <span>Your health.</span>
            <span>Your habits.</span>
            <span>Your future.</span>
          </h1>
          <p class="lead">${escapeHtml(slide.subtitle)}</p>
          <div class="hero-actions">
            <a class="primary-button" href="#slide-06">Try the Demo <span aria-hidden="true">&#8594;</span></a>
            <a class="secondary-button" href="#slide-09">How it works</a>
          </div>
          <div class="hero-stats" aria-label="Vitora product metrics">
            <div><strong>87%</strong><span>Health Score</span></div>
            <div><strong>8,421</strong><span>Steps today</span></div>
            <div><strong>1,840</strong><span>Calories burned</span></div>
          </div>
        </div>
        <div class="hero-visual app-preview reveal delay-1" data-app-preview>
          <div class="orbit-ring" aria-hidden="true"></div>
          <button class="floating-chip chip-one active" type="button" data-app-mode="move" aria-pressed="true">
            <span>Plan</span>
            <strong>Weekly habits</strong>
          </button>
          <button class="floating-chip chip-two" type="button" data-app-mode="fuel" aria-pressed="false">
            <span>Eat</span>
            <strong>Balanced dinner</strong>
          </button>
          <button class="floating-chip chip-three" type="button" data-app-mode="mind" aria-pressed="false">
            <span>Coach</span>
            <strong>Kind feedback</strong>
          </button>

          <div class="phone-frame" aria-label="Interactive Vitora app preview">
            <div class="phone-notch" aria-hidden="true"></div>
            <div class="app-screen" style="--score-percent: 87%;">
              <div class="app-header">
                <div>
                  <small>Vitora today</small>
                  <strong>Habit Coach</strong>
                </div>
                <span class="pulse-dot" aria-hidden="true"></span>
              </div>

              <div class="score-ring" data-app-preview-ring style="--score-percent: 87%;">
                <div>
                  <strong data-app-preview-score>87%</strong>
                  <span data-app-preview-label>Habits aligned</span>
                </div>
              </div>

              <div class="tab-buttons app-mode-tabs" role="group" aria-label="App preview modes">
                <button class="tab-button active" type="button" data-app-mode="move" aria-pressed="true">Plan</button>
                <button class="tab-button" type="button" data-app-mode="fuel" aria-pressed="false">Eat</button>
                <button class="tab-button" type="button" data-app-mode="mind" aria-pressed="false">Coach</button>
              </div>

              <div class="mini-stack" data-app-preview-stack>
                <div><span>Goal</span><strong>3 balanced meals</strong></div>
                <div><span>Habit</span><strong>Evening walk</strong></div>
                <div><span>Progress</span><strong>On track</strong></div>
              </div>

              <div class="ai-card">
                <span>AI Coach</span>
                <p data-app-preview-coach>Keep today's plan simple: prepare one balanced meal and log how it supports your energy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cover-feature-intro reveal delay-2">
        <h2>All-in-one. All for you.</h2>
        <p>Vitora combines health tracking, AI coaching and rewarding experiences in one simple app.</p>
      </div>
      <div class="cover-feature-strip reveal delay-2" aria-label="Vitora product pillars">
        <article>
          <span aria-hidden="true">+</span>
          <strong>Track</strong>
          <p>Activity, nutrition and sleep in one calm view.</p>
        </article>
        <article>
          <span aria-hidden="true">AI</span>
          <strong>Understand</strong>
          <p>Personal insights that explain what matters next.</p>
        </article>
        <article>
          <span aria-hidden="true">&#9673;</span>
          <strong>Improve</strong>
          <p>Plans that adapt to real routines and energy.</p>
        </article>
        <article>
          <span aria-hidden="true">$</span>
          <strong>Get rewarded</strong>
          <p>Motivation loops for sustainable healthy choices.</p>
        </article>
        <article>
          <span aria-hidden="true">&#8756;</span>
          <strong>Connect</strong>
          <p>A supportive ecosystem around everyday wellbeing.</p>
        </article>
      </div>
    `;
  }

  function renderCompany(slide) {
    return `
      <div class="split-layout company-layout">
        <div class="section-heading left reveal">
          <h2>${escapeHtml(slide.title)}</h2>
          <p>${escapeHtml(slide.intro)}</p>
          <p>${escapeHtml(slide.body)}</p>
        </div>
        <div class="reveal delay-1">
          ${renderMetrics(slide.metrics, "metric-grid two")}
        </div>
      </div>
      ${
        slide.profile
          ? `
            <div class="profile-grid reveal">
              ${slide.profile
                .map(
                  (item) => `
                    <article class="profile-card">
                      <span>${escapeHtml(item.label)}</span>
                      <strong>${escapeHtml(item.value)}</strong>
                    </article>
                  `
                )
                .join("")}
            </div>
          `
          : ""
      }
      <div class="section-inner reveal">
        ${renderNotes(slide)}
      </div>
    `;
  }

  function renderBrand(slide) {
    return `
      <div class="brand-foundation">
        <div class="brand-lockup reveal">
          <span class="stage-mark">V</span>
          <strong>VITORA</strong>
          <small>${escapeHtml(slide.tagline)}</small>
        </div>
        <div class="usp-panel reveal delay-1">
          <p class="eyebrow">Our USP</p>
          <h2>${escapeHtml(slide.usp)}</h2>
        </div>
      </div>
      <div class="pillar-row">
        ${slide.pillars
          .map(
            (pillar, pillarIndex) => `
              <article class="presentation-card reveal delay-${Math.min(pillarIndex + 1, 3)}">
                <span class="card-number">${String(pillarIndex + 1).padStart(2, "0")}</span>
                <h3>${escapeHtml(pillar.title)}</h3>
                <p>${escapeHtml(pillar.text)}</p>
          </article>
        `
          )
          .join("")}
      </div>
      ${renderModuleTabs()}
      ${renderScoreSimulator()}
    `;
  }

  function renderPurpose(slide) {
    return `
      <div class="statement-grid">
        ${slide.statements
          .map(
            (statement, index) => `
              <article class="purpose-panel reveal delay-${Math.min(index, 3)}">
                <span>${escapeHtml(statement.label)}</span>
                <h3>${escapeHtml(statement.title)}</h3>
                <p>${escapeHtml(statement.text)}</p>
              </article>
            `
          )
          .join("")}
      </div>
      ${
        slide.values
          ? `
            <div class="section-heading reveal values-heading">
              <p class="eyebrow">Corporate Values</p>
              <h3>The principles behind every product and communication decision.</h3>
            </div>
            <div class="value-grid">
              ${slide.values
                .map(
                  (value, index) => `
                    <article class="value-card reveal delay-${Math.min(index, 3)}">
                      <span>${String(index + 1).padStart(2, "0")}</span>
                      <h3>${escapeHtml(value.title)}</h3>
                      <p>${escapeHtml(value.text)}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          `
          : ""
      }
      <div class="section-inner reveal">
        ${renderNotes(slide)}
      </div>
    `;
  }

  function renderLocation(slide) {
    return `
      <div class="location-layout">
        <div class="location-map reveal">
          <p class="eyebrow">${escapeHtml(slide.region)}</p>
          <h2>${escapeHtml(slide.place)}</h2>
          ${renderMetrics(slide.facts, "location-facts")}
        </div>
        <div class="reason-grid">
          ${slide.reasons
            .map(
              (reason, index) => `
                <article class="presentation-card reveal delay-${Math.min(index, 3)}">
                  <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(reason.title)}</h3>
                  <p>${escapeHtml(reason.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderMarket(slide) {
    return `
      <div class="market-layout">
        <div class="reveal">
          <h2>${escapeHtml(slide.title)}</h2>
          ${renderMetrics(slide.metrics, "metric-grid")}
        </div>
        <div class="persona-panel reveal delay-1">
          <p class="eyebrow">Our target user</p>
          <h3>${escapeHtml(slide.personaTitle)}</h3>
          ${renderList(slide.persona)}
        </div>
      </div>
      <div class="market-signal reveal">
        <span>${escapeHtml(slide.signalLabel || slide.notes || "Market focus")}</span>
        <strong>${escapeHtml(slide.signalValue || slide.metrics?.[0]?.value || "")}</strong>
        <div class="market-line" aria-hidden="true"><span></span></div>
      </div>
    `;
  }

  function renderProblem(slide) {
    return `
      <div class="problem-layout">
        <div class="problem-lead reveal">
          <p class="eyebrow">Business need</p>
          <h2>${escapeHtml(slide.title)}</h2>
          <p>${escapeHtml(slide.intro)}</p>
          <div class="problem-highlight">${escapeHtml(slide.challenge)}</div>
        </div>
        <div class="problem-grid">
          ${slide.points
            .map(
              (point, index) => `
                <article class="presentation-card reveal delay-${Math.min(index + 1, 3)}">
                  <span class="card-number">${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(point.title)}</h3>
                  <p>${escapeHtml(point.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="section-inner reveal">
        ${renderNotes(slide)}
      </div>
    `;
  }

  function renderStrategy(slide) {
    return `
      <div class="section-heading reveal">
        <h2>${escapeHtml(slide.title)} - ${escapeHtml(slide.subtitle)}</h2>
      </div>
      <div class="strategy-grid">
        ${slide.pillars
          .map(
            (pillar, index) => `
              <article class="strategy-card reveal delay-${Math.min(index, 3)}">
                <span>${escapeHtml(pillar.number)}</span>
                <h3>${escapeHtml(pillar.title)}</h3>
                <p>${escapeHtml(pillar.text)}</p>
              </article>
            `
          )
          .join("")}
      </div>
      ${slide.includeCalculator === false ? "" : renderRevenueCalculator()}
      ${slide.includeRoadmap === false ? "" : renderRoadmap()}
    `;
  }

  function renderModuleTabs() {
    return `
      <div class="section-inner tabs presentation-tabs reveal">
        <div class="tab-buttons" role="tablist" aria-label="Vitora product modules">
          <button class="tab-button active" type="button" data-tab="training">Plan</button>
          <button class="tab-button" type="button" data-tab="nutrition">Fuel</button>
          <button class="tab-button" type="button" data-tab="mental">Reflect</button>
        </div>

        <div class="tab-panel active" id="training">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Plan</p>
              <h3>Personalized habit plans for realistic weight-management goals.</h3>
              <p>Vitora turns goals, schedules and lifestyle limits into simple weekly actions.</p>
              <div class="feature-list">
                <div><strong>Goal-based planning</strong><span>Adapted to personal objectives and routines.</span></div>
                <div><strong>Habit logging</strong><span>Meals, movement and reflection stay in one calm view.</span></div>
                <div><strong>Progress feedback</strong><span>Small wins become visible and motivating.</span></div>
                <div><strong>AI suggestions</strong><span>The coach recommends the next realistic adjustment.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Weekly habit plan</span><strong>Week 03</strong></div>
              <div class="workout-list">
                <div><span>Breakfast habit</span><strong>Protein + fiber</strong></div>
                <div><span>Lunch routine</span><strong>Balanced plate</strong></div>
                <div><span>Evening habit</span><strong>Short walk</strong></div>
                <div><span>Reflection</span><strong>2 min check-in</strong></div>
              </div>
              <div class="suggestion-card">
                <span>AI coaching cue</span>
                <strong>Keep it realistic</strong>
                <p>Choose one nutrition habit before adding another target, so progress stays sustainable.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-panel" id="nutrition">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Fuel</p>
              <h3>Nutrition tracking with smart meal and habit insights.</h3>
              <p>The nutrition module supports sustainable routines instead of acting as a restrictive food diary.</p>
              <div class="feature-list">
                <div><strong>Food tracking</strong><span>Meals and patterns stay visible without obsession.</span></div>
                <div><strong>Balance focus</strong><span>Protein, fiber and regular meals are prioritized.</span></div>
                <div><strong>Smart tips</strong><span>Guidance is linked to the user's goal and context.</span></div>
                <div><strong>Sustainable choices</strong><span>Recommendations can include planet-aware food options.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Daily overview</span><strong>Balanced day</strong></div>
              <div class="macro-bars">
                <div>
                  <div class="macro-label"><span>Protein</span><strong>Strong</strong></div>
                  <div class="bar"><span style="--value: 89%"></span></div>
                </div>
                <div>
                  <div class="macro-label"><span>Vegetables</span><strong>Good</strong></div>
                  <div class="bar"><span style="--value: 79%"></span></div>
                </div>
                <div>
                  <div class="macro-label"><span>Regular meals</span><strong>Stable</strong></div>
                  <div class="bar"><span style="--value: 78%"></span></div>
                </div>
              </div>
              <div class="suggestion-card">
                <span>AI nutrition cue</span>
                <strong>Balanced dinner</strong>
                <p>Prioritize one protein-rich, vegetable-based dinner and keep the evening routine simple.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-panel" id="mental">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Reflect</p>
              <h3>Supportive check-ins for motivation and everyday wellbeing.</h3>
              <p>The reflection module connects progress, energy and motivation to practical next steps.</p>
              <div class="feature-list">
                <div><strong>Mood check-ins</strong><span>Users reflect on motivation without judgment.</span></div>
                <div><strong>Routine support</strong><span>Recovery and energy become part of the plan.</span></div>
                <div><strong>Empathy cues</strong><span>Language avoids shame and unrealistic pressure.</span></div>
                <div><strong>Pattern detection</strong><span>Vitora links wellbeing signals with habit behavior.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Reflection trend</span><strong>Last 10 days</strong></div>
              <div class="mood-chart" aria-label="Mood trend from 1 to 10">
                <span style="--height: 60%">6</span>
                <span style="--height: 70%">7</span>
                <span style="--height: 50%">5</span>
                <span style="--height: 80%">8</span>
                <span style="--height: 80%">8</span>
                <span style="--height: 70%">7</span>
                <span style="--height: 90%">9</span>
                <span style="--height: 80%">8</span>
                <span style="--height: 70%">7</span>
                <span style="--height: 80%">8</span>
              </div>
              <div class="mental-stats">
                <div><strong>8.2</strong><span>average motivation</span></div>
                <div><strong>78%</strong><span>habit stability</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderScoreSimulator() {
    return `
      <div class="presentation-demo-grid reveal">
        <div class="section-heading left">
          <p class="eyebrow">Interactive demo</p>
          <h3>Try the Vitora alignment score.</h3>
          <p>This demonstrates the core idea from the USP: habits, nutrition and coaching reflection should create one practical signal for the user.</p>
        </div>
        <div class="simulator-card">
          <div class="simulator-score">
            <span id="scoreValue">87%</span>
            <p id="scoreLabel">Strong daily alignment</p>
          </div>

          <div class="slider-group">
            <label for="trainingSlider"><span>Habit consistency</span><strong id="trainingValue">85</strong></label>
            <input id="trainingSlider" type="range" min="0" max="100" value="85" />
          </div>
          <div class="slider-group">
            <label for="nutritionSlider"><span>Nutrition quality</span><strong id="nutritionValue">88</strong></label>
            <input id="nutritionSlider" type="range" min="0" max="100" value="88" />
          </div>
          <div class="slider-group">
            <label for="moodSlider"><span>Coaching reflection</span><strong id="moodValue">89</strong></label>
            <input id="moodSlider" type="range" min="0" max="100" value="89" />
          </div>

          <div class="ai-recommendation" id="scoreRecommendation">
            Keep today's goal simple: one balanced meal, one realistic habit and one short reflection.
          </div>
        </div>
      </div>
    `;
  }

  function renderRevenueCalculator() {
    return `
      <div class="section-inner calculator-card presentation-calculator reveal">
        <div>
          <p class="eyebrow">Live revenue model</p>
          <h3>Adjust the premium conversion rate.</h3>
          <p>This supports the premium freemium pillar and shows how subscription conversion changes projected recurring revenue.</p>
        </div>

        <div class="calculator-controls">
          <label for="conversionSlider">
            <span>Premium conversion</span>
            <strong id="conversionValue">10%</strong>
          </label>
          <input id="conversionSlider" type="range" min="1" max="25" value="10" />

          <div class="revenue-output">
            <span>Projected ARR</span>
            <strong id="revenueValue">EUR 599K</strong>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoadmap() {
    return `
      <div class="section-inner presentation-roadmap reveal">
        <div class="section-heading left">
          <p class="eyebrow">Implementation path</p>
          <h3>From MVP to scalable health platform.</h3>
          <p>The roadmap remains interactive so the presenter can explain each phase without leaving the deck flow.</p>
        </div>

        <div class="roadmap" id="roadmapCards">
          <article class="roadmap-card active" data-roadmap="0">
            <span>Q1 2025</span>
            <h3>MVP launch</h3>
            <p>iOS and Android app, all three modules and a beta community.</p>
          </article>
          <article class="roadmap-card" data-roadmap="1">
            <span>Q2-Q3 2025</span>
            <h3>Growth</h3>
            <p>App Store launch, social features and barcode scanner.</p>
          </article>
          <article class="roadmap-card" data-roadmap="2">
            <span>Q4 2025</span>
            <h3>Monetization</h3>
            <p>Premium features, subscriptions and wearable integrations.</p>
          </article>
          <article class="roadmap-card" data-roadmap="3">
            <span>2026+</span>
            <h3>Scaling</h3>
            <p>EU expansion, B2B gym partnerships and Series A preparation.</p>
          </article>
        </div>

        <div class="roadmap-detail">
          <span id="roadmapStage">Current focus</span>
          <h3 id="roadmapTitle">MVP launch</h3>
          <p id="roadmapText">
            The first product phase focuses on validating the core experience:
            one app, three modules and an early user community.
          </p>
        </div>
      </div>
    `;
  }

  function renderIdentity(slide) {
    return `
      <div class="identity-hero reveal">
        <p class="eyebrow">Brand essence</p>
        <h2>${escapeHtml(slide.essence)}</h2>
        <p>${escapeHtml(slide.essenceNote)}</p>
      </div>
      <div class="identity-grid">
        ${slide.columns
          .map(
            (column, index) => `
              <article class="identity-panel reveal delay-${Math.min(index + 1, 3)}">
                <span>${escapeHtml(column.kicker)}</span>
                <h3>${escapeHtml(column.title)}</h3>
                <p>${escapeHtml(column.text)}</p>
                ${renderList(column.items)}
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderStakeholders(slide) {
    return `
      <div class="definition-panel reveal">
        <h2>${escapeHtml(slide.title)}</h2>
        <p>${escapeHtml(slide.definition)}</p>
      </div>
      <div class="stakeholder-grid">
        ${slide.groups
          .map(
            (group, index) => `
              <article class="stakeholder-panel reveal delay-${Math.min(index + 1, 3)}">
                <span>${escapeHtml(group.label)}</span>
                <h3>${escapeHtml(group.title)}</h3>
                <div class="stakeholder-list">
                  ${group.items
                    .map(
                      (item) => `
                        <div>
                          <strong>${escapeHtml(item.title)}</strong>
                          <small>${escapeHtml(item.text)}</small>
                        </div>
                      `
                    )
                    .join("")}
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderResponsibility(slide) {
    return `
      ${
        slide.statement
          ? `
            <div class="definition-panel reveal">
              <h2>${escapeHtml(slide.title)}</h2>
              <p>${escapeHtml(slide.statement)}</p>
            </div>
          `
          : ""
      }
      ${renderMetrics(slide.commitments, "metric-grid three-wide")}
      <div class="responsibility-grid">
        ${slide.lanes
          .map(
            (lane, index) => `
              <article class="responsibility-lane reveal delay-${Math.min(index, 3)}">
                <span>${escapeHtml(lane.label)}</span>
                <h3>${escapeHtml(lane.title)}</h3>
                ${renderList(lane.items)}
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderCommunication(slide) {
    return `
      <div class="communication-layout">
        <div class="channel-panel reveal">
          <p class="eyebrow">How we communicate</p>
          <h2>${escapeHtml(slide.channelTitle)}</h2>
          <div class="channel-grid">
            ${slide.channels
              .map(
                (channel) => `
                  <div>
                    <strong>${escapeHtml(channel.title)}</strong>
                    <span>${escapeHtml(channel.text)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="integration-panel reveal delay-1">
          <p class="eyebrow">Integration</p>
          <h3>One brand, one voice.</h3>
          <p>${escapeHtml(slide.integration)}</p>
          ${
            slide.tone
              ? `
                <div class="tone-panel">
                  <strong>Tone of Voice</strong>
                  ${renderList(slide.tone)}
                </div>
              `
              : ""
          }
          ${renderList(slide.integrationPoints)}
        </div>
      </div>
    `;
  }

  function renderService(slide) {
    return `
      <div class="section-heading reveal">
        <p class="eyebrow">Product and service definition</p>
        <h2>${escapeHtml(slide.title)}</h2>
        <p>${escapeHtml(slide.intro)}</p>
      </div>
      <div class="service-grid">
        ${slide.steps
          .map(
            (step, index) => `
              <article class="service-card reveal delay-${Math.min(index, 3)}">
                <span>${escapeHtml(step.number)}</span>
                <h3>${escapeHtml(step.title)}</h3>
                <p>${escapeHtml(step.text)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderJourney(slide) {
    return `
      <div class="section-heading reveal">
        <p class="eyebrow">Customer experience</p>
        <h2>${escapeHtml(slide.title)}</h2>
      </div>
      <div class="journey-track">
        ${slide.stages
          .map(
            (stage, index) => `
              <article class="journey-stage reveal delay-${Math.min(index, 3)}">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <h3>${escapeHtml(stage.title)}</h3>
                <p>${escapeHtml(stage.text)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function renderOperations(slide) {
    return `
      <div class="operations-layout">
        <div class="role-grid reveal">
          ${slide.roles
            .map(
              (role, index) => `
                <article class="role-card delay-${Math.min(index, 3)}">
                  <h3>${escapeHtml(role.title)}</h3>
                  <p>${escapeHtml(role.text)}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="operations-side reveal delay-1">
          <div>
            <p class="eyebrow">Key partners</p>
            ${renderList(slide.partners)}
          </div>
          <div>
            <p class="eyebrow">Operational process</p>
            ${renderList(slide.process)}
          </div>
        </div>
      </div>
    `;
  }

  function renderRevenue(slide) {
    return `
      <div class="pricing-grid revenue-grid">
        ${slide.models
          .map((model, index) => {
            const delayClass = `delay-${Math.min(index, 3)}`;
            const cardContent = `
              <div class="pricing-top">
                <span>${escapeHtml(model.title)}</span>
                <strong>${escapeHtml(model.price)}</strong>
              </div>
              ${renderList(model.items)}
              ${
                model.href
                  ? `<span class="pricing-card-cta">${escapeHtml(model.cta || "Explore model")}</span>`
                  : ""
              }
            `;

            if (model.href) {
              return `
                <a
                  class="pricing-card pricing-card-link reveal ${delayClass}"
                  href="${escapeHtml(model.href)}"
                  aria-label="${escapeHtml(model.ariaLabel || `Open ${model.title}`)}"
                >
                  ${cardContent}
                </a>
              `;
            }

            return `
              <article class="pricing-card reveal ${delayClass}">
                ${cardContent}
              </article>
            `;
          })
          .join("")}
      </div>
      <div class="assumption-panel reveal">
        <p class="eyebrow">Financial logic</p>
        ${renderList(slide.assumptions)}
      </div>
      ${renderRevenueCalculator()}
    `;
  }

  function renderThanks(slide) {
    return `
      <div class="thanks-panel reveal">
        <span class="stage-mark">V</span>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.subtitle)}</p>
        <strong>${escapeHtml(slide.tagline)}</strong>
        <small>${escapeHtml(slide.footer)}</small>
      </div>
    `;
  }

  function renderConclusion(slide) {
    return `
      <div class="conclusion-panel reveal">
        <span class="stage-mark">V</span>
        <p class="eyebrow">Conclusion</p>
        <h2>${escapeHtml(slide.title)}</h2>
        <p class="lead">${escapeHtml(slide.subtitle)}</p>
        ${renderList(slide.takeaways, "takeaway-list")}
        <strong>${escapeHtml(slide.tagline)}</strong>
        <small>${escapeHtml(slide.footer)}</small>
      </div>
    `;
  }

  const layouts = {
    cover: renderCover,
    problem: renderProblem,
    company: renderCompany,
    brand: renderBrand,
    purpose: renderPurpose,
    location: renderLocation,
    market: renderMarket,
    strategy: renderStrategy,
    identity: renderIdentity,
    stakeholders: renderStakeholders,
    service: renderService,
    journey: renderJourney,
    operations: renderOperations,
    revenue: renderRevenue,
    responsibility: renderResponsibility,
    communication: renderCommunication,
    conclusion: renderConclusion,
    thanks: renderThanks
  };

  function renderFooter(slide, index, total) {
    const nextSlide = window.VitoraSlides[index + 1];
    const href = nextSlide ? `#${nextSlide.id}` : "#slide-01";
    const label = nextSlide ? "Next slide" : "Back to start";

    return `
      <footer class="slide-footer">
        <span>${escapeHtml(slide.transitionText || slide.duration || "Presentation flow")}</span>
        <a href="${href}">${label} <span aria-hidden="true">&#8594;</span></a>
      </footer>
    `;
  }

  function renderSlide(slide, index, total) {
    const layoutRenderer = layouts[slide.layout] || renderCompany;

    return `
      <section class="section web-slide ${slide.layout}-slide" id="${escapeHtml(slide.id)}" data-section>
        <div class="section-inner">
          ${renderMeta(slide, index, total)}
          ${renderImage(slide)}
          ${layoutRenderer(slide, index, total)}
          ${renderFooter(slide, index, total)}
        </div>
      </section>
    `;
  }

  function renderNavigation(slides) {
    const nav = document.getElementById("mainNav");
    if (!nav) return;

    nav.innerHTML = slides
      .map((slide) => {
        const label = slide.section.includes("|") ? slide.section.split("|").pop().trim() : slide.section;
        return `<a href="#${escapeHtml(slide.id)}">${escapeHtml(label)}</a>`;
      })
      .join("");
  }

  function render() {
    const deck = document.getElementById("slideDeck");
    const slides = Array.isArray(window.VitoraSlides) ? window.VitoraSlides : [];

    if (!deck || !slides.length) return;

    deck.innerHTML = slides.map((slide, index) => renderSlide(slide, index, slides.length)).join("");
    renderNavigation(slides);
  }

  return {
    render
  };
})();
