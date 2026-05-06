(() => {
  function formatNumber(value) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatCurrency(value) {
    return `EUR ${formatNumber(value)}`;
  }

  function formatFee(value) {
    const amount = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);

    return `EUR ${amount}`;
  }

  function setText(root, selector, value) {
    const element = root.querySelector(selector);
    if (element) element.textContent = value;
  }

  function initPartnerTabs(root) {
    const model = root.querySelector("[data-partner-model]");
    if (!model) return;

    const tabs = Array.from(model.querySelectorAll("[data-partner-tab]"));
    const panels = Array.from(model.querySelectorAll("[data-partner-panel]"));
    if (!tabs.length || !panels.length) return;

    function activateTab(targetKey) {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.partnerTab === targetKey;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.partnerPanel === targetKey;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.partnerTab));

      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;

        const nextTab = tabs[nextIndex];
        activateTab(nextTab.dataset.partnerTab);
        nextTab.focus();
      });
    });

    const initialTab = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
    activateTab(initialTab.dataset.partnerTab);
  }

  function initB2BSimulator(root) {
    const simulator = root.querySelector("[data-b2b-simulator]");
    if (!simulator) return;

    const membersInput = simulator.querySelector("#partnerMembers");
    const adoptionInput = simulator.querySelector("#adoptionRate");
    const feeInput = simulator.querySelector("#licenseFee");
    const upsellInput = simulator.querySelector("#upsellRate");
    const inputs = [membersInput, adoptionInput, feeInput, upsellInput].filter(Boolean);
    if (inputs.length !== 4) return;

    function readNumber(input) {
      const value = Number.parseFloat(input.value);
      return Number.isFinite(value) ? value : 0;
    }

    function updateSimulator() {
      const partnerMembers = readNumber(membersInput);
      const adoptionRate = readNumber(adoptionInput);
      const licenseFee = readNumber(feeInput);
      const upsellRate = readNumber(upsellInput);

      const activeUsers = Math.round(partnerMembers * (adoptionRate / 100));
      const monthlyRecurringRevenue = activeUsers * licenseFee;
      const annualRecurringRevenue = monthlyRecurringRevenue * 12;
      const upsellRevenue = activeUsers * (upsellRate / 100) * licenseFee;

      setText(simulator, '[data-output-for="partnerMembers"]', formatNumber(partnerMembers));
      setText(simulator, '[data-output-for="adoptionRate"]', `${formatNumber(adoptionRate)}%`);
      setText(simulator, '[data-output-for="licenseFee"]', formatFee(licenseFee));
      setText(simulator, '[data-output-for="upsellRate"]', `${formatNumber(upsellRate)}%`);

      setText(simulator, '[data-result="activeUsers"]', formatNumber(activeUsers));
      setText(simulator, '[data-result="mrr"]', formatCurrency(monthlyRecurringRevenue));
      setText(simulator, '[data-result="arr"]', formatCurrency(annualRecurringRevenue));
      setText(simulator, '[data-result="upsellRevenue"]', formatCurrency(upsellRevenue));
    }

    inputs.forEach((input) => input.addEventListener("input", updateSimulator));
    updateSimulator();
  }

  function initSmoothScrolling(root) {
    root.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = root.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", targetId);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.body;
    if (!root || !root.classList.contains("revenue-page")) return;

    initPartnerTabs(root);
    initB2BSimulator(root);
    initSmoothScrolling(document);
  });
})();
