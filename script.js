const root = document.documentElement;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const themeToggle = document.querySelector("[data-theme-toggle]");
const toTop = document.querySelector("[data-to-top]");
const notificationButton = document.querySelector("[data-notifications]");
const notificationPanel = document.querySelector("[data-notification-panel]");
const panelClose = document.querySelector("[data-panel-close]");
const searchOpen = document.querySelector("[data-search-open]");
const searchClose = document.querySelector("[data-search-close]");
const searchModal = document.querySelector("[data-search-modal]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const eventModal = document.querySelector("[data-event-modal]");
const eventForm = document.querySelector("[data-event-form]");
const eventNameInput = document.querySelector("[data-event-name]");
const eventStatus = document.querySelector("[data-event-status]");

const searchable = [
  { label: "Join Scouts membership registration", target: "#join" },
  { label: "Rescue and first aid training", target: "#activities" },
  { label: "Campfire Night Showcase", target: "#events" },
  { label: "Gallery: hiking, campfire, rescue", target: "#gallery" },
  { label: "Admin dashboard and certificates", target: "#resources" },
  { label: "Contact and UAF address", target: "#contact" },
  { label: "Scout oath, law, mission, vision", target: "#history" },
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderActivities(activities) {
  const grid = document.querySelector(".activity-grid");
  if (!grid || !Array.isArray(activities)) return;
  grid.innerHTML = activities
    .map(
      (activity) => `
        <article class="activity-card reveal">
          <div class="card-image ${escapeHtml(activity.imageClass)}"></div>
          <div class="icon-badge">${escapeHtml(activity.icon)}</div>
          <h3>${escapeHtml(activity.title)}</h3>
          <p>${escapeHtml(activity.description)}</p>
          <time datetime="${escapeHtml(activity.datetime)}">${escapeHtml(activity.date)}</time>
          <button type="button" data-gallery-filter="${escapeHtml(activity.category)}">Gallery</button>
        </article>
      `
    )
    .join("");
}

function renderEvents(data) {
  const sliderElement = document.querySelector("[data-slider]");
  const countdownCard = document.querySelector(".countdown-card");
  const archive = document.querySelector(".archive-table");
  if (sliderElement && Array.isArray(data.events)) {
    sliderElement.innerHTML = `${data.events
      .map(
        (event, index) => `
          <article class="event-card${index === 0 ? " is-active" : ""}">
            <div class="event-date"><b>${escapeHtml(event.day)}</b><span>${escapeHtml(event.month)}</span></div>
            <h3>${escapeHtml(event.title)}</h3>
            <p>${escapeHtml(event.description)}</p>
            <button class="event-register" type="button" data-event-register>Register Now</button>
          </article>
        `
      )
      .join("")}
      <div class="slider-controls">
        <button type="button" data-prev aria-label="Previous event">‹</button>
        <button type="button" data-next aria-label="Next event">›</button>
      </div>`;
  }

  if (countdownCard && data.majorEvent) {
    countdownCard.innerHTML = `
      <span class="section-label">${escapeHtml(data.majorEvent.label)}</span>
      <h3>${escapeHtml(data.majorEvent.title)}</h3>
      <p>${escapeHtml(data.majorEvent.description)}</p>
      <div class="countdown" data-countdown="${escapeHtml(data.majorEvent.datetime)}">
        <span><b data-days>00</b>Days</span>
        <span><b data-hours>00</b>Hours</span>
        <span><b data-minutes>00</b>Min</span>
        <span><b data-seconds>00</b>Sec</span>
      </div>`;
  }

  if (archive && Array.isArray(data.pastEvents)) {
    archive.innerHTML = `<div class="table-row table-head"><span>Past Event</span><span>Type</span><span>Outcome</span></div>${data.pastEvents
      .map(
        (event) => `
          <div class="table-row">
            <span>${escapeHtml(event.name)}</span>
            <span>${escapeHtml(event.type)}</span>
            <span>${escapeHtml(event.outcome)}</span>
          </div>
        `
      )
      .join("")}`;
  }
}

function renderStats(stats) {
  const band = document.querySelector(".stats-band");
  if (!band || !Array.isArray(stats)) return;
  band.innerHTML = stats
    .map((stat) => `<div><strong data-counter="${Number(stat.value) || 0}">0</strong><span>${escapeHtml(stat.label)}</span></div>`)
    .join("");
}

function renderTeam(team) {
  const grid = document.querySelector(".team-grid");
  if (!grid || !Array.isArray(team)) return;
  grid.innerHTML = team
    .map(
      (member) => `
        <article class="profile-card reveal">
          <div class="profile-photo ${escapeHtml(member.photoClass)}"></div>
          <h3>${escapeHtml(member.name)}</h3>
          <span>${escapeHtml(member.position)}</span>
          <p>${escapeHtml(member.bio)}</p>
          <div class="socials"><a href="https://www.facebook.com/AgrivarsityScoutsGroupUAF/" aria-label="Facebook">f</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="mailto:scouts@uaf.edu.pk" aria-label="Email">@</a></div>
        </article>
      `
    )
    .join("");
}

function renderNews(news) {
  const grid = document.querySelector(".blog-grid");
  if (!grid || !Array.isArray(news)) return;
  grid.innerHTML = news
    .map(
      (item) => `
        <article class="news-card reveal">
          <span>${escapeHtml(item.category)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `
    )
    .join("");
}

function renderTestimonials(testimonials) {
  const grid = document.querySelector(".testimonial-grid");
  if (!grid || !Array.isArray(testimonials)) return;
  grid.innerHTML = testimonials
    .map((item) => `<blockquote class="reveal">${escapeHtml(item.quote)}<cite>${escapeHtml(item.name)}</cite></blockquote>`)
    .join("");
}

function renderPartners(partners) {
  const section = document.querySelector(".partners");
  if (!section || !Array.isArray(partners)) return;
  section.innerHTML = partners.map((partner) => `<span>${escapeHtml(partner)}</span>`).join("");
}

function refreshDynamicBindings() {
  document.querySelectorAll("[data-counter]").forEach((element) => counterObserver.observe(element));
  bindEventSlider();
  bindEventRegistrationButtons();
  updateCountdown();
  document.querySelectorAll(".reveal").forEach((element) => {
    if (!element.classList.contains("is-visible")) revealObserver.observe(element);
  });
  bindGalleryFilterButtons();
}

async function loadSiteData() {
  try {
    const response = await fetch("data/site-data.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Data request failed: ${response.status}`);
    const data = await response.json();
    renderActivities(data.activities);
    renderEvents(data);
    renderStats(data.stats);
    renderTeam(data.team);
    renderNews(data.news);
    renderTestimonials(data.testimonials);
    renderPartners(data.partners);
    refreshDynamicBindings();
  } catch {
    refreshDynamicBindings();
  }
}

function setTheme(mode) {
  root.classList.toggle("dark", mode === "dark");
  localStorage.setItem("asg-theme", mode);
}

const savedTheme = localStorage.getItem("asg-theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
}

themeToggle?.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark");
});

navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 12;
  header?.classList.toggle("is-scrolled", scrolled);
  toTop?.classList.toggle("is-visible", window.scrollY > 680);
});

toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

notificationButton?.addEventListener("click", () => {
  notificationPanel.classList.toggle("is-open");
});

panelClose?.addEventListener("click", () => {
  notificationPanel.classList.remove("is-open");
});

function openSearch() {
  searchModal.classList.add("is-open");
  searchModal.setAttribute("aria-hidden", "false");
  searchInput.focus();
}

function closeSearch() {
  searchModal.classList.remove("is-open");
  searchModal.setAttribute("aria-hidden", "true");
}

searchOpen?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);

searchModal?.addEventListener("click", (event) => {
  if (event.target === searchModal) closeSearch();
});

searchInput?.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();
  const matches = searchable.filter((item) => item.label.toLowerCase().includes(value));
  searchResults.innerHTML = "";
  if (!value) return;
  if (!matches.length) {
    searchResults.innerHTML = "<span>No matching section found.</span>";
    return;
  }
  matches.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.target;
    link.textContent = item.label;
    link.addEventListener("click", closeSearch);
    searchResults.appendChild(link);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSearch();
    notificationPanel?.classList.remove("is-open");
    closeLightbox();
    closeEventModal();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter);
      const duration = 1300;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.floor(target * eased).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll("[data-counter]").forEach((element) => counterObserver.observe(element));

let slides = [];
let slideIndex = 0;
let sliderTimer;

function showSlide(index) {
  if (!slides.length) return;
  slideIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, current) => slide.classList.toggle("is-active", current === slideIndex));
}

function bindEventSlider() {
  const slider = document.querySelector("[data-slider]");
  slides = Array.from(document.querySelectorAll(".event-card"));
  slideIndex = 0;
  slider?.querySelector("[data-prev]")?.addEventListener("click", () => showSlide(slideIndex - 1));
  slider?.querySelector("[data-next]")?.addEventListener("click", () => showSlide(slideIndex + 1));
  clearInterval(sliderTimer);
  if (slides.length) sliderTimer = setInterval(() => showSlide(slideIndex + 1), 6500);
}

bindEventSlider();

function openEventModal(eventTitle) {
  if (!eventModal || !eventNameInput) return;
  eventNameInput.value = eventTitle || "Selected Event";
  if (eventStatus) eventStatus.textContent = "";
  eventModal.classList.add("is-open");
  eventModal.setAttribute("aria-hidden", "false");
  eventForm?.querySelector('input[name="name"]')?.focus();
}

function closeEventModal() {
  if (!eventModal) return;
  eventModal.classList.remove("is-open");
  eventModal.setAttribute("aria-hidden", "true");
}

function bindEventRegistrationButtons() {
  document.querySelectorAll("[data-event-register]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".event-card");
      const title = card?.querySelector("h3")?.textContent?.trim();
      openEventModal(title);
    });
  });
}

bindEventRegistrationButtons();

function updateCountdown() {
  const countdown = document.querySelector("[data-countdown]");
  if (!countdown) return;
  const target = new Date(countdown.dataset.countdown).getTime();
  const remaining = Math.max(target - Date.now(), 0);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  countdown.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
  countdown.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
  countdown.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
  countdown.querySelector("[data-seconds]").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const typed = document.querySelector("[data-typed]");
if (typed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typed.animate(
    [
      { opacity: 0.72, letterSpacing: "0" },
      { opacity: 1, letterSpacing: "0" },
    ],
    { duration: 900, easing: "ease-out" }
  );
}

const galleryItems = document.querySelectorAll(".gallery-item");

function filterGallery(category) {
  const filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.filter === category));
  galleryItems.forEach((item) => {
    const show = category === "All" || item.dataset.category === category;
    item.hidden = !show;
  });
  document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => filterGallery(button.dataset.filter));
});

function bindGalleryFilterButtons() {
  document.querySelectorAll("[data-gallery-filter]").forEach((button) => {
    button.addEventListener("click", () => filterGallery(button.dataset.galleryFilter));
  });
}

bindGalleryFilterButtons();

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const style = window.getComputedStyle(item).backgroundImage;
    lightboxImage.style.backgroundImage = style;
    lightboxTitle.textContent = item.dataset.title;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.querySelector("[data-event-close]")?.addEventListener("click", closeEventModal);
eventModal?.addEventListener("click", (event) => {
  if (event.target === eventModal) closeEventModal();
});

eventForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  eventStatus.textContent = "Event registration received. The scouts office will contact you after verification.";
  eventForm.reset();
  if (eventNameInput) eventNameInput.value = "";
});

document.querySelector("[data-register-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector("[data-form-status]").textContent =
    "Registration received. The scouts office will contact you after verification.";
  event.currentTarget.reset();
});

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  button.textContent = "Message Sent";
  setTimeout(() => {
    button.textContent = "Send Message";
    event.currentTarget.reset();
  }, 1800);
});

loadSiteData();
