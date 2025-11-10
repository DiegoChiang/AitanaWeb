// main.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Elementos base
  // =========================
  const header = document.querySelector(".site-header");
  const mainNav = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");

  // =========================
  // Menú móvil
  // =========================
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.toggle("open");
      mainNav.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Cerrar menú al hacer click en un link
    mainNav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // Scroll suave con offset
  // (override para compensar header fijo)
  // =========================
  const headerHeight = () => (header ? header.offsetHeight : 0);

  function smoothScrollTo(targetId) {
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - headerHeight() - 8;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }

  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      // Si es un anchor interno real, prevenimos el default y aplicamos offset
      e.preventDefault();
      smoothScrollTo(href);
    });
  });

  // =========================
  // Simulador de cuotas
  // =========================

  const amountRange = document.getElementById("surgeryAmountRange");
  const amountValue = document.getElementById("surgeryAmountValue");
  const tenureButtons = document.querySelectorAll(".tenure-btn");
  const tenureLabel = document.getElementById("selectedTenureLabel");
  const monthlyFeeEl = document.getElementById("monthlyFee");
  const totalCostEl = document.getElementById("totalCost");
  const annualRateEl = document.getElementById("annualRate");

  // Configuración del simulador
  const ANNUAL_RATE = 0.35; // 35% anual referencial
  const DEFAULT_MONTHS = 6;

  if (annualRateEl) {
    annualRateEl.textContent = `${(ANNUAL_RATE * 100).toFixed(0)}% anual*`;
  }

  function formatCurrency(value) {
    return (
      "S/ " +
      value.toLocaleString("es-PE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  function getSelectedMonths() {
    const activeBtn = document.querySelector(".tenure-btn.active");
    if (activeBtn) {
      const months = parseInt(activeBtn.dataset.months, 10);
      return isNaN(months) ? DEFAULT_MONTHS : months;
    }
    return DEFAULT_MONTHS;
  }

  function calculateMonthlyPayment(amount, months, annualRate) {
    if (!amount || !months) return 0;

    const monthlyRate = annualRate / 12;

    // Fórmula de cuota fija (sistema francés)
    if (monthlyRate === 0) {
      return amount / months;
    }

    const factor = Math.pow(1 + monthlyRate, months);
    const fee = (amount * monthlyRate * factor) / (factor - 1);

    return fee;
  }

  function updateSimulator() {
    if (!amountRange || !amountValue || !monthlyFeeEl || !totalCostEl) return;

    const amount = parseFloat(amountRange.value) || 0;
    const months = getSelectedMonths();

    // Actualizar textos de monto y plazo
    amountValue.textContent = formatCurrency(amount);
    if (tenureLabel) {
      tenureLabel.textContent = `${months} meses`;
    }

    // Calcular cuota
    const monthlyFee = calculateMonthlyPayment(amount, months, ANNUAL_RATE);
    const totalCost = monthlyFee * months;

    monthlyFeeEl.textContent = formatCurrency(monthlyFee);
    totalCostEl.textContent = formatCurrency(totalCost);
  }

  // Listeners del simulador
  if (amountRange) {
    amountRange.addEventListener("input", updateSimulator);
  }

  tenureButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tenureButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateSimulator();
    });
  });

  // Estado inicial del simulador
  if (amountRange) {
    // Asegura que haya un botón activo
    if (!document.querySelector(".tenure-btn.active") && tenureButtons[0]) {
      tenureButtons[0].classList.add("active");
    }
    updateSimulator();
  }

  // =========================
  // FAQ - acordeón
  // =========================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Cerrar todos los demás
      faqItems.forEach((el) => el.classList.remove("active"));

      // Alternar el actual
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // Opcional: abre la primera por defecto
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
  }

  // =========================
  // (Opcional) Pequeño efecto al hacer scroll: sombra en header
  // =========================
  function handleScrollHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScrollHeaderShadow);
  handleScrollHeaderShadow();
});
