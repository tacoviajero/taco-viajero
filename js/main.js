const header = document.querySelector("[data-header]") || document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const updateHeader = () => {
  if (!header || !header.hasAttribute("data-header")) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const setMenuOpen = (isOpen) => {
  if (!header || !menuToggle || !mobileMenu) return;
  header.classList.toggle("is-menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  mobileMenu.hidden = !isOpen;
};

updateHeader();
if (header?.hasAttribute("data-header")) {
  window.addEventListener("scroll", updateHeader, { passive: true });
}

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!header.classList.contains("is-menu-open"));
});

mobileMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header?.classList.contains("is-menu-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.querySelectorAll('.nav a[href$="-anchor"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!window.matchMedia("(min-width: 901px)").matches || !header) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    const targetTop = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
    window.scrollTo({ top: targetTop, behavior: reduceMotion.matches ? "auto" : "smooth" });
  });
});

if (document.querySelector(".h360-page")) {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();

      if (hash === "#inicio" || hash === "#home") {
        window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
        history.pushState(null, "", hash);
        return;
      }

      const visibleTarget = target.querySelector(".h360-section-heading") || target;
      const anchorGap = 28;
      const targetTop = visibleTarget.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 0) - anchorGap;

      window.scrollTo({ top: Math.max(0, targetTop), behavior: reduceMotion.matches ? "auto" : "smooth" });
      history.pushState(null, "", hash);
    });
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const mainImage = carousel.querySelector("[data-carousel-main]");
  const caption = carousel.querySelector("[data-carousel-caption]");
  let thumbs = [...carousel.querySelectorAll("[data-carousel-thumb]")];
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  let activeIndex = 0;

  for (let index = thumbs.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [thumbs[index], thumbs[swapIndex]] = [thumbs[swapIndex], thumbs[index]];
  }

  thumbs.forEach((thumb) => thumb.parentElement.appendChild(thumb));

  const showSlide = (index) => {
    if (!thumbs.length) return;
    activeIndex = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[activeIndex];

    thumbs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    thumb.classList.add("is-active");
    thumb.setAttribute("aria-pressed", "true");

    mainImage.src = thumb.dataset.src;
    mainImage.alt = thumb.dataset.alt || "";
    caption.textContent = thumb.dataset.caption || "";
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => showSlide(index));
  });

  previous?.addEventListener("click", () => showSlide(activeIndex - 1));
  next?.addEventListener("click", () => showSlide(activeIndex + 1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });
  showSlide(0);
});

document.querySelectorAll("[data-contact-form]").forEach((form) => {
  const nameInput = form.querySelector("[name='name']");
  const emailInput = form.querySelector("[name='email']");
  const messageInput = form.querySelector("[name='message']");
  const status = form.querySelector("[data-form-status]");
  const homeUrl = form.dataset.homeUrl || "../";
  const subject = form.dataset.subject || "Contacto desde Taco Viajero";
  const recipient = "juan@tacoviajero.com";

  const setError = (input, message) => {
    const error = form.querySelector(`[data-error-for="${input.name}"]`);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message || "";
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fields = [...form.elements].filter((field) => field.name && !field.disabled);
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    let isValid = true;

    if (name.length < 2) {
      setError(nameInput, form.dataset.nameError || "Escribe tu nombre.");
      isValid = false;
    } else {
      setError(nameInput, "");
    }

    if (!isValidEmail(email)) {
      setError(emailInput, form.dataset.emailError || "Escribe un correo válido.");
      isValid = false;
    } else {
      setError(emailInput, "");
    }

    if (!message) {
      setError(messageInput, form.dataset.messageError || "Escribe un comentario.");
      isValid = false;
    } else {
      setError(messageInput, "");
    }

    fields.forEach((field) => {
      if (!field.required || ["name", "email", "message"].includes(field.name)) return;
      if (!field.value.trim()) {
        setError(field, field.dataset.error || "Completa este campo.");
        isValid = false;
      } else {
        setError(field, "");
      }
    });

    if (!isValid) {
      if (status) status.textContent = form.dataset.invalidStatus || "Revisa los campos marcados.";
      return;
    }

    const body = fields.map((field) => {
      const label = form.querySelector(`label[for="${field.id}"]`);
      const labelText = label?.textContent?.trim() || field.name;
      return `${labelText}: ${field.value.trim()}`;
    }).join("\n");

    if (status) status.textContent = form.dataset.sendingStatus || "Abriendo tu correo...";
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.setTimeout(() => {
      window.location.href = homeUrl;
    }, 900);
  });
});
