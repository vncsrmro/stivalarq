(() => {
  "use strict";
  const config = window.STIVAL_CONFIG || {};
  const form = document.querySelector("#lead-form");
  const fields = document.querySelector("#fields");
  const button = document.querySelector("#submit");
  const feedback = document.querySelector("#feedback");
  const phone = document.querySelector("#phone");
  const name = document.querySelector("#name");
  const next = document.querySelector("#next-steps");
  const secureUrl = value => {
    try { return new URL(value).protocol === "https:"; } catch { return false; }
  };
  const enabled = config.enabled === true && secureUrl(config.endpoint);
  if (enabled) {
    fields.disabled = false;
    document.querySelector("#availability").textContent = "Preencha seus dados para solicitar o material e acompanhar a comunidade.";
  }
  phone.addEventListener("input", () => phone.setCustomValidity(""));
  name.addEventListener("input", () => name.setCustomValidity(""));
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!enabled || fields.disabled) return;
    let digits = phone.value.replace(/\D/g, "");
    if (digits.length >= 12 && digits.startsWith("55")) digits = digits.slice(2);
    phone.setCustomValidity(/^[1-9]{2}(?:[2-5]\d{7}|9\d{8})$/.test(digits) ? "" : "Informe um WhatsApp brasileiro válido com DDD.");
    name.setCustomValidity(name.value.trim().length >= 2 ? "" : "Informe seu nome.");
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    fields.disabled = true;
    form.setAttribute("aria-busy", "true");
    button.textContent = "Enviando…";
    feedback.dataset.state = "loading";
    feedback.textContent = "Estamos enviando seu cadastro.";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(config.endpoint, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.value.trim(), email: String(data.get("email")).trim(), phone: "+55" + digits, consent: data.get("consent") === "on", source: "stival-mentorias", consentVersion: "1" }),
        signal: controller.signal, credentials: "omit"
      });
      if (!response.ok) throw new Error("http");
      const result = await response.json();
      if (result.ok !== true) throw new Error("unconfirmed");
      feedback.dataset.state = "success";
      feedback.textContent = "Cadastro recebido. Obrigado por dar esse primeiro passo com a gente.";
      button.textContent = "Cadastro recebido ✓";
      for (const [url, title] of [[config.checklistUrl, "Abrir meu checklist ↗"], [config.communityUrl, "Conhecer a comunidade ↗"]]) {
        if (!secureUrl(url)) continue;
        const link = document.createElement("a");
        link.href = url; link.textContent = title; link.target = "_blank"; link.rel = "noopener noreferrer";
        next.append(link);
      }
      next.hidden = next.childElementCount === 0;
      form.reset();
    } catch {
      fields.disabled = false;
      button.textContent = "Tentar novamente ↗";
      feedback.dataset.state = "error";
      feedback.textContent = "Não foi possível confirmar seu cadastro. Seus campos foram preservados; tente novamente em instantes.";
    } finally {
      clearTimeout(timer);
      form.removeAttribute("aria-busy");
      feedback.focus();
    }
  });
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".section-heading, .topics article, .community-grid > div, .mentor > div, .capture-grid > div").forEach(el => {
      el.classList.add("reveal"); observer.observe(el);
    });
  }
  document.querySelectorAll(".portrait img").forEach(img => {
    img.addEventListener("error", () => { img.hidden = true; });
  });
})();
