/**
 * ARCHITA POROV - PORTFOLIO LOGIC
 * Unified Script: Typewriter, Scroll-Spy, Themes, and Terminal Commands
 */

// 1. THEME LOGIC
const setTheme = (themeName) => {
  const body = document.body;
  const validThemes = ["default", "solarized", "matrix", "hacker"];

  if (themeName === "default") {
    body.removeAttribute("data-theme");
  } else if (validThemes.includes(themeName)) {
    body.setAttribute("data-theme", themeName);
  }

  // Update UI: Highlight active theme button in nav
  document.querySelectorAll(".theme-options button").forEach((btn) => {
    btn.classList.remove("active-theme");
    if (btn.innerText.toLowerCase() === themeName) {
      btn.classList.add("active-theme");
    }
  });
};

// 2. TERMINAL COMMAND LOGIC (Single Unified Function)
function runCmd(input) {
  const args = input.toLowerCase().trim().split(/\s+/); // Splits by any whitespace
  const command = args[0];
  const param = args[1];

  const validSections = [
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
  ];

  switch (command) {
    case "theme":
      if (param) {
        setTheme(param);
      } else {
        showError("Usage: theme [default|solarized|matrix|hacker]");
      }
      break;

    case "help":
      alert(
        "Commands: about, skills, experience, projects, contact, theme [name], clear",
      );
      break;

    case "clear":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;

    default:
      // Check if command is a section name
      if (validSections.includes(command)) {
        const target = document.getElementById(command);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else if (command !== "") {
        showError(`Command not found: ${command}`);
      }
  }
}

// 3. UI HELPERS (Error Display & Typewriter)
const showError = (msg) => {
  const errorDisplay = document.getElementById("terminal-error");
  if (!errorDisplay) return;

  errorDisplay.innerText = msg;
  errorDisplay.classList.add("show");
  setTimeout(() => {
    errorDisplay.classList.remove("show");
    setTimeout(() => {
      errorDisplay.innerText = "";
    }, 300);
  }, 2500);
};

const typeWriter = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    const text = el.innerHTML;
    el.innerHTML = "";
    el.style.visibility = "visible";
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        if (text.charAt(i) === "<") {
          i = text.indexOf(">", i) + 1;
        } else {
          i++;
        }
        el.innerHTML = text.substring(0, i) + '<span class="cursor">_</span>';
      } else {
        el.innerHTML = text;
        clearInterval(typing);
      }
    }, 20);
  });
};

// 4. SCROLL-SPY
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active-link");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active-link");
          }
        });
      }
    });
  },
  { threshold: 0.5 },
);

// 5. INITIALIZATION & EVENT LISTENERS
window.addEventListener("DOMContentLoaded", () => {
  // Set initial state
  setTheme("default");
  typeWriter(".about-descp");

  // Observe sections
  document.querySelectorAll("section").forEach((s) => observer.observe(s));

  // Terminal input listener
  const terminalInput = document.getElementById("terminal-input");
  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        runCmd(terminalInput.value);
        terminalInput.value = "";
      }
    });
  }
});

// Global exposure
window.runCmd = runCmd;

