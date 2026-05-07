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

  function readNumber(input) {
    const value = Number.parseFloat(input.value);
    return Number.isFinite(value) ? value : 0;
  }

  function formatMonths(value) {
    const amount = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    }).format(value);

    return `${amount} months`;
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

    const organizationsInput = simulator.querySelector("#partnerOrganizations");
    const membersInput = simulator.querySelector("#membersPerPartner");
    const adoptionInput = simulator.querySelector("#adoptionRate");
    const licenseFeeInput = simulator.querySelector("#licenseFee");
    const platformFeeInput = simulator.querySelector("#platformFee");
    const upsellInput = simulator.querySelector("#upsellRate");
    const inputs = [organizationsInput, membersInput, adoptionInput, licenseFeeInput, platformFeeInput, upsellInput].filter(Boolean);
    if (inputs.length !== 6) return;

    function updateSimulator() {
      const partnerOrganizations = readNumber(organizationsInput);
      const membersPerPartner = readNumber(membersInput);
      const adoptionRate = readNumber(adoptionInput);
      const licenseFee = readNumber(licenseFeeInput);
      const platformFee = readNumber(platformFeeInput);
      const upsellRate = readNumber(upsellInput);

      const totalPotentialMembers = Math.round(partnerOrganizations * membersPerPartner);
      const activeUsers = Math.round(totalPotentialMembers * (adoptionRate / 100));
      const monthlyLicenseRevenue = activeUsers * licenseFee;
      const monthlyPlatformRevenue = partnerOrganizations * platformFee;
      const totalMonthlyB2BRevenue = monthlyLicenseRevenue + monthlyPlatformRevenue;
      const annualRecurringRevenue = totalMonthlyB2BRevenue * 12;
      const upsellRevenue = activeUsers * (upsellRate / 100) * licenseFee;

      setText(simulator, '[data-output-for="partnerOrganizations"]', formatNumber(partnerOrganizations));
      setText(simulator, '[data-output-for="membersPerPartner"]', formatNumber(membersPerPartner));
      setText(simulator, '[data-output-for="adoptionRate"]', `${formatNumber(adoptionRate)}%`);
      setText(simulator, '[data-output-for="licenseFee"]', formatFee(licenseFee));
      setText(simulator, '[data-output-for="platformFee"]', formatCurrency(platformFee));
      setText(simulator, '[data-output-for="upsellRate"]', `${formatNumber(upsellRate)}%`);

      setText(simulator, '[data-result="totalPotentialMembers"]', formatNumber(totalPotentialMembers));
      setText(simulator, '[data-result="activeUsers"]', formatNumber(activeUsers));
      setText(simulator, '[data-result="monthlyLicenseRevenue"]', formatCurrency(monthlyLicenseRevenue));
      setText(simulator, '[data-result="monthlyPlatformRevenue"]', formatCurrency(monthlyPlatformRevenue));
      setText(simulator, '[data-result="totalMonthlyB2BRevenue"]', formatCurrency(totalMonthlyB2BRevenue));
      setText(simulator, '[data-result="arr"]', formatCurrency(annualRecurringRevenue));
      setText(simulator, '[data-result="upsellRevenue"]', formatCurrency(upsellRevenue));
    }

    inputs.forEach((input) => input.addEventListener("input", updateSimulator));
    updateSimulator();
  }

  function initFreemiumSimulator(root) {
    const simulator = root.querySelector("[data-freemium-simulator]");
    if (!simulator) return;

    const freeUsersInput = simulator.querySelector("#freeUsers");
    const activeRateInput = simulator.querySelector("#monthlyActiveRate");
    const conversionRateInput = simulator.querySelector("#premiumConversionRate");
    const premiumPriceInput = simulator.querySelector("#monthlyPremiumPrice");
    const retentionRateInput = simulator.querySelector("#monthlyRetentionRate");
    const inputs = [freeUsersInput, activeRateInput, conversionRateInput, premiumPriceInput, retentionRateInput].filter(Boolean);
    if (inputs.length !== 5) return;

    function updateSimulator() {
      const freeUsers = readNumber(freeUsersInput);
      const monthlyActiveRate = readNumber(activeRateInput);
      const premiumConversionRate = readNumber(conversionRateInput);
      const monthlyPremiumPrice = readNumber(premiumPriceInput);
      const monthlyRetentionRate = readNumber(retentionRateInput);

      const monthlyActiveUsers = Math.round(freeUsers * (monthlyActiveRate / 100));
      const convertedPremiumUsers = Math.round(monthlyActiveUsers * (premiumConversionRate / 100));
      const monthlyPremiumRevenue = convertedPremiumUsers * monthlyPremiumPrice;
      const annualPremiumRevenue = monthlyPremiumRevenue * 12;
      const retainedPremiumUsers = Math.round(convertedPremiumUsers * (monthlyRetentionRate / 100));

      setText(simulator, '[data-output-for="freeUsers"]', formatNumber(freeUsers));
      setText(simulator, '[data-output-for="monthlyActiveRate"]', `${formatNumber(monthlyActiveRate)}%`);
      setText(simulator, '[data-output-for="premiumConversionRate"]', `${formatNumber(premiumConversionRate)}%`);
      setText(simulator, '[data-output-for="monthlyPremiumPrice"]', formatFee(monthlyPremiumPrice));
      setText(simulator, '[data-output-for="monthlyRetentionRate"]', `${formatNumber(monthlyRetentionRate)}%`);

      setText(simulator, '[data-result="monthlyActiveUsers"]', formatNumber(monthlyActiveUsers));
      setText(simulator, '[data-result="convertedPremiumUsers"]', formatNumber(convertedPremiumUsers));
      setText(simulator, '[data-result="monthlyPremiumRevenue"]', formatCurrency(monthlyPremiumRevenue));
      setText(simulator, '[data-result="annualPremiumRevenue"]', formatCurrency(annualPremiumRevenue));
      setText(simulator, '[data-result="retainedPremiumUsers"]', formatNumber(retainedPremiumUsers));
    }

    inputs.forEach((input) => input.addEventListener("input", updateSimulator));
    updateSimulator();
  }

  function initSubscriptionSimulator(root) {
    const simulator = root.querySelector("[data-subscription-simulator]");
    if (!simulator) return;

    const subscribersInput = simulator.querySelector("#payingSubscribers");
    const priceInput = simulator.querySelector("#monthlySubscriptionPrice");
    const churnInput = simulator.querySelector("#monthlyChurnRate");
    const acquisitionCostInput = simulator.querySelector("#averageAcquisitionCost");
    const inputs = [subscribersInput, priceInput, churnInput, acquisitionCostInput].filter(Boolean);
    if (inputs.length !== 4) return;

    function updateSimulator() {
      const payingSubscribers = readNumber(subscribersInput);
      const monthlySubscriptionPrice = readNumber(priceInput);
      const monthlyChurnRate = readNumber(churnInput);
      const averageAcquisitionCost = readNumber(acquisitionCostInput);

      const monthlyRecurringRevenue = payingSubscribers * monthlySubscriptionPrice;
      const annualRecurringRevenue = monthlyRecurringRevenue * 12;
      const estimatedCustomerLifetime = 1 / (monthlyChurnRate / 100);
      const simplifiedCustomerLifetimeValue = monthlySubscriptionPrice * estimatedCustomerLifetime;
      const estimatedAcquisitionPayback = averageAcquisitionCost / monthlySubscriptionPrice;

      setText(simulator, '[data-output-for="payingSubscribers"]', formatNumber(payingSubscribers));
      setText(simulator, '[data-output-for="monthlySubscriptionPrice"]', formatFee(monthlySubscriptionPrice));
      setText(simulator, '[data-output-for="monthlyChurnRate"]', `${formatNumber(monthlyChurnRate)}%`);
      setText(simulator, '[data-output-for="averageAcquisitionCost"]', formatCurrency(averageAcquisitionCost));

      setText(simulator, '[data-result="monthlyRecurringRevenue"]', formatCurrency(monthlyRecurringRevenue));
      setText(simulator, '[data-result="annualRecurringRevenue"]', formatCurrency(annualRecurringRevenue));
      setText(simulator, '[data-result="estimatedCustomerLifetime"]', formatMonths(estimatedCustomerLifetime));
      setText(simulator, '[data-result="simplifiedCustomerLifetimeValue"]', formatCurrency(simplifiedCustomerLifetimeValue));
      setText(simulator, '[data-result="estimatedAcquisitionPayback"]', formatMonths(estimatedAcquisitionPayback));
    }

    inputs.forEach((input) => input.addEventListener("input", updateSimulator));
    updateSimulator();
  }

  function scrollTargetToTop(target, behavior = "smooth") {
    const topbar = document.querySelector(".revenue-topbar");
    const topbarBottom = topbar ? topbar.getBoundingClientRect().bottom : 0;
    const breathingRoom = window.innerWidth <= 820 ? 22 : 28;
    const targetPadding = target.classList.contains("revenue-section")
      ? Number.parseFloat(window.getComputedStyle(target).paddingTop) || 0
      : 0;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY + targetPadding - topbarBottom - breathingRoom;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior
    });
  }

  function initSmoothScrolling(root) {
    root.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = root.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        scrollTargetToTop(target);
        history.pushState(null, "", targetId);
      });
    });
  }

  function restoreInitialAnchor() {
    const targetId = window.location.hash ? window.location.hash.slice(1) : "";
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    const restoreTarget = () => scrollTargetToTop(target, "auto");

    requestAnimationFrame(() => {
      restoreTarget();
      window.setTimeout(restoreTarget, 160);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.body;
    if (!root || !root.classList.contains("revenue-page")) return;

    initPartnerTabs(root);
    initB2BSimulator(root);
    initFreemiumSimulator(root);
    initSubscriptionSimulator(root);
    initSmoothScrolling(document);
    restoreInitialAnchor();
  });
})();
