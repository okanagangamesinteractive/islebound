// Placeholder links: replace these when you're ready.
const links = {
  roblox: "",       // e.g. "https://www.roblox.com/games/XXXXXXXX/Islebound"
  robloxGroup: "",  // e.g. "https://www.roblox.com/groups/XXXXXXXX/Islebound"
  discord: "",      // e.g. "https://discord.gg/XXXXXXX"
  trailer: "",      // e.g. "https://www.youtube.com/watch?v=XXXXXXX"
  feedback: ""      // e.g. Google Form link
};

const toast = document.querySelector("[data-toast]");
let toastTimer = null;

function showToast(title, body) {
  if (!toast) return;
  toast.querySelector(".toastTitle").textContent = title;
  toast.querySelector(".toastBody").textContent = body;

  toast.hidden = false;
  toast.style.opacity = "1";

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => (toast.hidden = true), 180);
  }, 2400);
}

function openLink(key) {
  const url = (links[key] || "").trim();
  if (!url) {
    showToast("Placeholder link", "This button will be updated when your links are ready.");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

// Buttons with data-link
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-link]");
  if (!btn) return;
  openLink(btn.getAttribute("data-link"));
});

// Smooth scroll buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-scroll]");
  if (!btn) return;

  const target = btn.getAttribute("data-scroll");
  const el = document.querySelector(target);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Mobile menu toggle (hidden by default)
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector("[data-menu]");

if (hamburger && menu) {
  // Always start hidden
  menu.hidden = true;

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = menu.hidden;     // if hidden, we are about to open it
    menu.hidden = !willOpen;          // toggle
    hamburger.setAttribute("aria-expanded", String(willOpen));
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    if (!menu.hidden) {
      menu.hidden = true;
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  // Close when clicking inside the menu
  menu.addEventListener("click", () => {
    menu.hidden = true;
    hamburger.setAttribute("aria-expanded", "false");
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
