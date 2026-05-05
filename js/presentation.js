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
        <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.title)}" loading="lazy" />
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
          <p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>
          <h1>${escapeHtml(slide.title)}</h1>
          <p class="tagline">${escapeHtml(slide.tagline)}</p>
          <p class="lead">${escapeHtml(slide.subtitle)}</p>
          <div class="presenter-line">${escapeHtml(slide.speaker)}</div>
        </div>
        <div class="hero-visual app-preview reveal delay-1" data-app-preview>
          <div class="orbit-ring" aria-hidden="true"></div>
          <button class="floating-chip chip-one active" type="button" data-app-mode="move" aria-pressed="true">
            <span>Move</span>
            <strong>Push Day</strong>
          </button>
          <button class="floating-chip chip-two" type="button" data-app-mode="fuel" aria-pressed="false">
            <span>Fuel</span>
            <strong>Protein +24g</strong>
          </button>
          <button class="floating-chip chip-three" type="button" data-app-mode="mind" aria-pressed="false">
            <span>Mind</span>
            <strong>Sleep 7h 40m</strong>
          </button>

          <div class="phone-frame" aria-label="Interactive Vitora app preview">
            <div class="phone-notch" aria-hidden="true"></div>
            <div class="app-screen" style="--score-percent: 87%;">
              <div class="app-header">
                <div>
                  <small>Vitora today</small>
                  <strong>Daily Coach</strong>
                </div>
                <span class="pulse-dot" aria-hidden="true"></span>
              </div>

              <div class="score-ring" data-app-preview-ring style="--score-percent: 87%;">
                <div>
                  <strong data-app-preview-score>87%</strong>
                  <span data-app-preview-label>Training ready</span>
                </div>
              </div>

              <div class="tab-buttons app-mode-tabs" role="group" aria-label="App preview modes">
                <button class="tab-button active" type="button" data-app-mode="move" aria-pressed="true">Move</button>
                <button class="tab-button" type="button" data-app-mode="fuel" aria-pressed="false">Fuel</button>
                <button class="tab-button" type="button" data-app-mode="mind" aria-pressed="false">Mind</button>
              </div>

              <div class="mini-stack" data-app-preview-stack>
                <div><span>Workout</span><strong>Push Day</strong></div>
                <div><span>Next set</span><strong>Bench 4 x 8</strong></div>
                <div><span>Recovery</span><strong>Ready</strong></div>
              </div>

              <div class="ai-card">
                <span>AI Coach</span>
                <p data-app-preview-coach>Start with bench press, keep two reps in reserve and finish with a short mobility cooldown.</p>
              </div>
            </div>
          </div>
        </div>
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
        <span>${escapeHtml(slide.notes)}</span>
        <strong>${escapeHtml(slide.metrics[0].value)}</strong>
        <div class="market-line" aria-hidden="true"><span></span></div>
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
      ${renderRevenueCalculator()}
      ${renderRoadmap()}
    `;
  }

  function renderModuleTabs() {
    return `
      <div class="section-inner tabs presentation-tabs reveal">
        <div class="tab-buttons" role="tablist" aria-label="Vitora product modules">
          <button class="tab-button active" type="button" data-tab="training">Move</button>
          <button class="tab-button" type="button" data-tab="nutrition">Fuel</button>
          <button class="tab-button" type="button" data-tab="mental">Mind</button>
        </div>

        <div class="tab-panel active" id="training">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Move</p>
              <h3>Personalised training plans for every level and goal.</h3>
              <p>Vitora turns goals, equipment and performance history into a practical training flow.</p>
              <div class="feature-list">
                <div><strong>Goal-based planning</strong><span>Adapted to objective, level and location.</span></div>
                <div><strong>Set logging</strong><span>Weight and repetitions are recorded per set.</span></div>
                <div><strong>Progress feedback</strong><span>Training history becomes visible and motivating.</span></div>
                <div><strong>AI suggestions</strong><span>The coach recommends the next sensible adjustment.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Training plan</span><strong>Push Day</strong></div>
              <div class="workout-list">
                <div><span>Bench press</span><strong>4 x 8-10</strong></div>
                <div><span>Shoulder press</span><strong>3 x 10-12</strong></div>
                <div><span>Lateral raise</span><strong>3 x 12-15</strong></div>
                <div><span>Triceps pushdown</span><strong>3 x 12-15</strong></div>
              </div>
              <div class="suggestion-card">
                <span>AI coaching cue</span>
                <strong>Controlled progression</strong>
                <p>Use recent performance to decide whether the next session should increase load or protect recovery.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-panel" id="nutrition">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Fuel</p>
              <h3>Nutrition tracking with smart meal and macro insights.</h3>
              <p>The nutrition module supports the training goal instead of standing alone as a food diary.</p>
              <div class="feature-list">
                <div><strong>Food tracking</strong><span>Meals, calories and macros stay in one view.</span></div>
                <div><strong>Macro focus</strong><span>Protein, carbs and fat are compared with targets.</span></div>
                <div><strong>Smart tips</strong><span>Guidance is linked to the user's goal.</span></div>
                <div><strong>Training connection</strong><span>Nutrition feedback reacts to activity and progress.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Daily overview</span><strong>1,840 / 2,800 kcal</strong></div>
              <div class="macro-bars">
                <div>
                  <div class="macro-label"><span>Protein</span><strong>142g / 160g</strong></div>
                  <div class="bar"><span style="--value: 89%"></span></div>
                </div>
                <div>
                  <div class="macro-label"><span>Carbs</span><strong>198g / 250g</strong></div>
                  <div class="bar"><span style="--value: 79%"></span></div>
                </div>
                <div>
                  <div class="macro-label"><span>Fat</span><strong>55g / 70g</strong></div>
                  <div class="bar"><span style="--value: 78%"></span></div>
                </div>
              </div>
              <div class="suggestion-card">
                <span>AI nutrition cue</span>
                <strong>More protein</strong>
                <p>Prioritise one protein-rich meal to support today's training goal.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-panel" id="mental">
          <div class="module-layout">
            <div class="module-copy">
              <p class="eyebrow">Mind</p>
              <h3>Mindfulness, sleep coaching and mood tracking.</h3>
              <p>The mental health module connects recovery, motivation and wellbeing to physical progress.</p>
              <div class="feature-list">
                <div><strong>Mood check-ins</strong><span>Users reflect on how they feel after training.</span></div>
                <div><strong>Sleep coaching</strong><span>Recovery becomes part of the daily plan.</span></div>
                <div><strong>Mindfulness</strong><span>Short sessions support calm and consistency.</span></div>
                <div><strong>Pattern detection</strong><span>Vitora links wellbeing signals with training behaviour.</span></div>
              </div>
            </div>
            <div class="module-demo">
              <div class="demo-header"><span>Mood trend</span><strong>Last 10 days</strong></div>
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
                <div><strong>8.2</strong><span>average mood</span></div>
                <div><strong>78%</strong><span>positive effect</span></div>
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
          <p>This demonstrates the core idea from the USP: training, nutrition and mood should create one practical signal for the user.</p>
        </div>
        <div class="simulator-card">
          <div class="simulator-score">
            <span id="scoreValue">87%</span>
            <p id="scoreLabel">Strong daily alignment</p>
          </div>

          <div class="slider-group">
            <label for="trainingSlider"><span>Training consistency</span><strong id="trainingValue">85</strong></label>
            <input id="trainingSlider" type="range" min="0" max="100" value="85" />
          </div>
          <div class="slider-group">
            <label for="nutritionSlider"><span>Nutrition quality</span><strong id="nutritionValue">88</strong></label>
            <input id="nutritionSlider" type="range" min="0" max="100" value="88" />
          </div>
          <div class="slider-group">
            <label for="moodSlider"><span>Mental wellbeing</span><strong id="moodValue">89</strong></label>
            <input id="moodSlider" type="range" min="0" max="100" value="89" />
          </div>

          <div class="ai-recommendation" id="scoreRecommendation">
            Increase protein today and keep tomorrow's training intensity moderate.
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
          ${renderList(slide.integrationPoints)}
        </div>
      </div>
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

  const layouts = {
    cover: renderCover,
    company: renderCompany,
    brand: renderBrand,
    purpose: renderPurpose,
    location: renderLocation,
    market: renderMarket,
    strategy: renderStrategy,
    identity: renderIdentity,
    stakeholders: renderStakeholders,
    responsibility: renderResponsibility,
    communication: renderCommunication,
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
