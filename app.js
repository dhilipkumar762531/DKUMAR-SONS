    /* ============================================================
   D KUMAR & SONS — MASTER JAVASCRIPT
   Animations · CRUD · 3D Effects · Scroll · Particles
   ============================================================ */

"use strict";

// ═══════════════════════════════════════════
// PRELOADER
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  initAll();
  window.setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.classList.add("hidden");
  }, 500);
});
      
function initAll() {
  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
  initCursor();
  initNavbar();
  initHamburger();
  initHeroParticles();
  initScrollReveal();
  initCounters();
  initProjectFilters();
  initTestimonials();
  initProgressBars();
  initBackToTop();
  initTilt3D();
  initCRUD();
  initSmoothScroll();
  animateHero();
}

// ═══════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mx = 0, my = 0, fx = 0, fy = 0;
  const speed = 0.12;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateFollower() {
    fx += (mx - fx) * speed;
    fy += (my - fy) * speed;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll("a, button, .filter-btn, .service-card, .team-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      follower.style.width = "60px";
      follower.style.height = "60px";
      follower.style.opacity = "0.3";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      follower.style.width = "36px";
      follower.style.height = "36px";
      follower.style.opacity = "0.5";
    });
  });
}

// ═══════════════════════════════════════════
// NAVBAR SCROLL
// ═══════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active nav link highlight
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll(".nav-link").forEach(l => l.style.color = "");
          link.style.color = "var(--gold)";
        }
      }
    });
  });
}

// ═══════════════════════════════════════════
// HAMBURGER MENU
// ═══════════════════════════════════════════
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    hamburger.classList.toggle("active", !isOpen);
    navLinks.classList.toggle("open", !isOpen);
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

// ═══════════════════════════════════════════
// HERO PARTICLES
// ═══════════════════════════════════════════
function initHeroParticles() {
  const container = document.getElementById("heroParticles");
  if (!container) return;

  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 4 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.4 + 0.1;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    // Random: some are gold dots, some are construction-themed
    if (Math.random() > 0.6) {
      p.style.background = "var(--gold)";
      p.style.boxShadow = "0 0 6px var(--gold)";
    } else {
      p.style.background = "rgba(255,255,255,0.3)";
    }

    container.appendChild(p);
  }
}

// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add("revealed");
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach(el => {
    observer.observe(el);
  });
}

// ═══════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════
function initCounters() {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".stat-num").forEach(el => {
          animateCounter(el);
        });
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) counterObs.observe(heroStats);
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

// ═══════════════════════════════════════════
// PROJECT FILTERS
// ═══════════════════════════════════════════
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === "all" || cat === filter) {
          card.style.display = "block";
          card.style.animation = "fadeInCard 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Inject keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// ═══════════════════════════════════════════
// TESTIMONIALS SLIDER
// ═══════════════════════════════════════════
function initTestimonials() {
  const track = document.getElementById("testiTrack");
  const dots = document.querySelectorAll(".testi-dot");
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;
  let autoplay;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * track.parentElement.clientWidth}px)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      if (i === current) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      resetAutoplay();
    });
  });

  window.addEventListener("resize", () => goTo(current));

  function startAutoplay() {
    autoplay = setInterval(() => {
      goTo((current + 1) % total);
    }, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);
    startAutoplay();
  }

  startAutoplay();

  // Swipe support
  let startX = 0;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((current + 1) % total);
      else goTo((current - 1 + total) % total);
      resetAutoplay();
    }
  });
}

// ═══════════════════════════════════════════
// PROGRESS BARS
// ═══════════════════════════════════════════
function initProgressBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".progress-fill").forEach(bar => {
          const width = bar.dataset.width;
          bar.style.width = width + "%";
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const whySection = document.querySelector(".why-us");
  if (whySection) obs.observe(whySection);
}

// ═══════════════════════════════════════════
// BACK TO TOP
// ═══════════════════════════════════════════
function initBackToTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  });
}

// ═══════════════════════════════════════════
// 3D TILT EFFECT
// ═══════════════════════════════════════════
function initTilt3D() {
  document.querySelectorAll(".service-card, .why-card, .team-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.5s ease";
    });
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.1s ease";
    });
  });
}

// ═══════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (href === "#") {
        e.preventDefault();
        return;
      }
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ═══════════════════════════════════════════
// HERO ENTRANCE ANIMATION
// ═══════════════════════════════════════════
function animateHero() {
  const heroItems = document.querySelectorAll(".hero-content .reveal-up");
  heroItems.forEach((item, i) => {
    setTimeout(() => {
      item.classList.add("revealed");
    }, 300 + i * 180);
  });
}

// ═══════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  const icons = { success: "✓", error: "✗", info: "ℹ" };
  toast.textContent = `${icons[type] || ""} ${message}`;
  toast.className = `toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ═══════════════════════════════════════════
// CRUD — CLIENT PORTAL
// ═══════════════════════════════════════════
let projects = [];
let editId = null;
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let filteredData = [];

const STATUSES = ["Submitted", "Under Review", "Approved", "In Progress", "Completed"];

function initCRUD() {
  projects = loadProjects();
  filteredData = [...projects];

  const tbody = document.getElementById("projectTableBody");
  const pagination = document.getElementById("pagination");
  if (tbody) {
    tbody.addEventListener("click", event => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const actions = {
        edit: editProject,
        status: advanceStatus,
        delete: deleteProject
      };
      const action = actions[button.dataset.action];
      if (action) action(button.dataset.id);
    });
  }
  if (pagination) {
    pagination.addEventListener("click", event => {
      const button = event.target.closest("button[data-page]");
      if (button) goToPage(Number(button.dataset.page));
    });
  }
  filterProjects();
}

function loadProjects() {
  try {
    const savedProjects = localStorage.getItem("dks_projects");
    if (!savedProjects) return [];

    const parsedProjects = JSON.parse(savedProjects);
    if (!Array.isArray(parsedProjects)) {
      throw new TypeError("Saved project data must be an array.");
    }
    return parsedProjects;
  } catch (error) {
    console.error("Could not load saved project submissions.", error);
    showToast("Saved projects could not be loaded from this browser.", "error");
    return [];
  }
}

function validateForm() {
  const name = document.getElementById("clientName")?.value.trim();
  const type = document.getElementById("projectType")?.value;
  const budget = document.getElementById("projectBudget")?.value;
  const location = document.getElementById("projectLocation")?.value.trim();
  const desc = document.getElementById("projectDesc")?.value.trim();

  if (!name) return "Client name is required.";
  if (!type) return "Please select a project type.";
  if (!budget || !Number.isFinite(Number(budget)) || Number(budget) <= 0) return "Enter a valid budget.";
  if (!location) return "Project location is required.";
  if (!desc || desc.length < 20) return "Description must be at least 20 characters.";
  return null;
}

function handleSubmit(event) {
  if (event) event.preventDefault();
  const msg = document.getElementById("formMsg");
  const error = validateForm();

  if (error) {
    msg.textContent = error;
    msg.className = "form-msg error";
    return;
  }

  const wasEditing = editId !== null;
  const existingProject = wasEditing ? projects.find(project => project.id === editId) : null;
  if (wasEditing && !existingProject) {
    showToast("This project could not be found. Refresh the list and try again.", "error");
    cancelEdit();
    return;
  }

  const projectData = {
    id: editId || Date.now().toString(),
    clientName: document.getElementById("clientName").value.trim(),
    projectType: document.getElementById("projectType").value,
    budget: parseFloat(document.getElementById("projectBudget").value),
    location: document.getElementById("projectLocation").value.trim(),
    description: document.getElementById("projectDesc").value.trim(),
    startDate: document.getElementById("startDate").value,
    priority: document.getElementById("priority").value,
    status: "Submitted",
    createdAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  };

  const previousProjects = [...projects];
  if (wasEditing) {
    projectData.status = existingProject.status;
    projectData.createdAt = existingProject.createdAt;
    projects = projects.map(project => project.id === editId ? projectData : project);
  } else {
    projects = [projectData, ...projects];
  }

  if (!saveProjects()) {
    projects = previousProjects;
    return;
  }

  if (wasEditing) {
    editId = null;
    document.getElementById("formTitle").innerHTML = '<i class="fas fa-plus-circle"></i> Submit New Project';
    document.getElementById("submitBtn").innerHTML = '<i class="fas fa-paper-plane"></i> Submit Project';
    document.getElementById("cancelBtn").style.display = "none";
    showToast("Project updated successfully!", "info");
  } else {
    showToast("Project submitted successfully!", "success");
  }

  clearForm();
  msg.textContent = wasEditing
    ? "Project updated successfully."
    : "Project submitted successfully! Our team will review it shortly.";
  msg.className = "form-msg success";
  msg.style.display = "";
  currentPage = 1;
  filterProjects();
}

function editProject(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  editId = id;
  document.getElementById("clientName").value = project.clientName;
  document.getElementById("projectType").value = project.projectType;
  document.getElementById("projectBudget").value = project.budget;
  document.getElementById("projectLocation").value = project.location;
  document.getElementById("projectDesc").value = project.description;
  document.getElementById("startDate").value = project.startDate;
  document.getElementById("priority").value = project.priority;

  document.getElementById("formTitle").innerHTML = '<i class="fas fa-edit"></i> Edit Project';
  document.getElementById("submitBtn").innerHTML = '<i class="fas fa-save"></i> Update Project';
  document.getElementById("cancelBtn").style.display = "inline-flex";

  document.getElementById("crud").scrollIntoView({ behavior: "smooth" });
  showToast("Editing project: " + project.clientName, "info");
}

function cancelEdit() {
  editId = null;
  clearForm();
  document.getElementById("formTitle").innerHTML = '<i class="fas fa-plus-circle"></i> Submit New Project';
  document.getElementById("submitBtn").innerHTML = '<i class="fas fa-paper-plane"></i> Submit Project';
  document.getElementById("cancelBtn").style.display = "none";
  document.getElementById("formMsg").style.display = "none";
}

function deleteProject(id) {
  if (!confirm("Are you sure you want to delete this project submission?")) return;
  const previousProjects = projects;
  projects = projects.filter(p => p.id !== id);
  if (!saveProjects()) {
    projects = previousProjects;
    return;
  }
  filterProjects();
  showToast("Project deleted.", "error");
}

function advanceStatus(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;
  const idx = STATUSES.indexOf(project.status);
  if (idx < STATUSES.length - 1) {
    const previousStatus = project.status;
    project.status = STATUSES[idx + 1];
    if (!saveProjects()) {
      project.status = previousStatus;
      return;
    }
    filterProjects();
    showToast(`Status updated to: ${project.status}`, "info");
  } else {
    showToast("Project is already completed!", "info");
  }
}

function clearForm() {
  ["clientName","projectBudget","projectLocation","projectDesc","startDate"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  ["projectType","priority"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.selectedIndex = 0;
  });
}

function saveProjects() {
  try {
    localStorage.setItem("dks_projects", JSON.stringify(projects));
    return true;
  } catch (error) {
    console.error("Could not save project submissions.", error);
    showToast("Project changes could not be saved in this browser.", "error");
    return false;
  }
}

function filterProjects() {
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const status = (document.getElementById("statusFilter")?.value || "");

  filteredData = projects.filter(p => {
    const clientName = String(p.clientName || "").toLowerCase();
    const projectType = String(p.projectType || "").toLowerCase();
    const location = String(p.location || "").toLowerCase();
    const matchSearch = !search ||
      clientName.includes(search) ||
      projectType.includes(search) ||
      location.includes(search);
    const matchStatus = !status || p.status === status;
    return matchSearch && matchStatus;
  });

  currentPage = 1;
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("projectTableBody");
  const empty = document.getElementById("tableEmpty");
  const count = document.getElementById("recordCount");
  if (!tbody) return;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageData = filteredData.slice(start, end);

  if (filteredData.length === 0) {
    tbody.innerHTML = "";
    if (empty) empty.style.display = "block";
    if (count) count.textContent = "0 records";
    renderPagination();
    return;
  }

  if (empty) empty.style.display = "none";
  if (count) count.textContent = `${filteredData.length} record${filteredData.length !== 1 ? "s" : ""}`;

  tbody.innerHTML = pageData.map((p, i) => {
    const status = STATUSES.includes(p.status) ? p.status : "Submitted";
    const priority = String(p.priority || "Normal");
    const statusClass = "status-" + status.replace(/[^A-Za-z0-9-]/g, "-");
    const canAdvance = status !== "Completed";
    const budget = Number(p.budget);
    return `
      <tr>
        <td style="color:var(--text-muted);font-size:0.8rem">${start + i + 1}</td>
        <td>
          <strong style="color:var(--text)">${escapeHTML(p.clientName)}</strong><br/>
          <span style="font-size:0.75rem;color:var(--text-muted)">${escapeHTML(p.createdAt || "")}</span>
        </td>
        <td style="color:var(--text)">${escapeHTML(p.projectType)}</td>
        <td><i class="fas fa-map-marker-alt" style="color:var(--gold);margin-right:4px;font-size:0.7rem"></i>${escapeHTML(p.location)}</td>
        <td style="color:var(--gold);font-weight:700">${Number.isFinite(budget) ? `₹${budget.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr` : "—"}</td>
        <td>
          <span style="
            padding:3px 10px;border-radius:50px;font-size:0.7rem;font-weight:700;
            background:${priority==='Urgent'?'rgba(220,60,60,0.15)':priority==='High'?'rgba(255,165,0,0.15)':'rgba(255,255,255,0.06)'};
            color:${priority==='Urgent'?'#f08080':priority==='High'?'#FFA500':'var(--text-muted)'};
            font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;
          ">${escapeHTML(priority)}</span>
        </td>
        <td><span class="status-badge ${statusClass}">${escapeHTML(status)}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn btn-edit" data-action="edit" data-id="${escapeHTML(p.id)}" aria-label="Edit ${escapeHTML(p.clientName)}" title="Edit">
              <i class="fas fa-pen"></i>
            </button>
            ${canAdvance ? `
            <button class="action-btn btn-status" data-action="status" data-id="${escapeHTML(p.id)}" aria-label="Advance status for ${escapeHTML(p.clientName)}" title="Advance Status">
              <i class="fas fa-arrow-up"></i>
            </button>` : ""}
            <button class="action-btn btn-delete" data-action="delete" data-id="${escapeHTML(p.id)}" aria-label="Delete ${escapeHTML(p.clientName)}" title="Delete">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  renderPagination();
}

function renderPagination() {
  const pag = document.getElementById("pagination");
  if (!pag) return;

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  if (totalPages <= 1) { pag.innerHTML = ""; return; }

  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" type="button" data-page="${i}" aria-label="Go to page ${i}" ${i === currentPage ? 'aria-current="page"' : ""}>${i}</button>`;
  }
  pag.innerHTML = html;
}

function goToPage(page) {
  currentPage = page;
  renderTable();
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = String(str ?? "");
  return div.innerHTML;
}

// ═══════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════
function sendContactForm(event) {
  if (event) event.preventDefault();
  const name = document.getElementById("cName")?.value.trim();
  const email = document.getElementById("cEmail")?.value.trim();
  const service = document.getElementById("cService")?.value;
  const message = document.getElementById("cMessage")?.value.trim();
  const phone = document.getElementById("cPhone")?.value.trim();
  const msg = document.getElementById("contactMsg");

  if (!name || !email || !service || !message) {
    if (msg) {
      msg.textContent = "Please fill in all required fields.";
      msg.className = "form-msg error";
    }
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    if (msg) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg error";
    }
    return;
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Service: ${service}`,
    "",
    message
  ].join("\n");
  const subject = encodeURIComponent(`${service} inquiry from ${name}`);
  window.location.href = `mailto:info@dkumarsons.com?subject=${subject}&body=${encodeURIComponent(body)}`;

  if (msg) {
    msg.textContent = "Your email app should open with this inquiry. Send the email there to complete delivery.";
    msg.className = "form-msg info";
  }
  showToast("Open your email app to send your inquiry.", "info");
}

// ═══════════════════════════════════════════
// NEWSLETTER
// ═══════════════════════════════════════════
function subscribeNewsletter(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.querySelector("input");
  const email = input?.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  showToast("Newsletter signup is not connected yet. Please contact info@dkumarsons.com to subscribe.", "info");
}

// ═══════════════════════════════════════════
// PARALLAX HERO
// ═══════════════════════════════════════════
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scroll = window.scrollY;
    hero.style.backgroundPositionY = `${scroll * 0.4}px`;
  }
});

// ═══════════════════════════════════════════
// FLOATING LABEL INPUTS
// ═══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  // Add ripple effect to gold buttons
  document.querySelectorAll(".btn-gold").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.25); border-radius:50%;
        transform:scale(0); animation:rippleAnim 0.6s ease forwards;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(2.5); opacity: 0; }
    }
    .btn { position: relative; overflow: hidden; }
  `;
  document.head.appendChild(rippleStyle);
});
