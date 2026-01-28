
/* ===============================
   NAVBAR SLIDE & SCROLL HIDE
================================ */
const navbar = document.querySelector(".navbar");
window.addEventListener("load", () => {
  setTimeout(() => navbar.classList.add("show"), 150);
});

let lastScroll = window.scrollY;
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if(current > lastScroll && current > 50) {
    navbar.style.transform = "translateY(-120px)";
    navbar.style.opacity = "0";
  } else {
    navbar.style.transform = "translateY(0)";
    navbar.style.opacity = "1";
  }
  lastScroll = current;
});

// ===== Smooth scroll =====
document.getElementById("scrollMenu").addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
});

// ===== Scroll Reveal =====
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) el.classList.add("active");
  });
}
revealOnScroll();
window.addEventListener("scroll", revealOnScroll);

// ===== Hero entrance animation =====
window.addEventListener("load", () => {
  document.querySelector(".hero-text").classList.add("active");
});

// ===== Cursor Trail =====
const cursor = document.createElement("div");
cursor.classList.add("cursor-trail");
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  cursor.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* =====================================================
   BACKGROUND SPARKLES (FULL PAGE, BEHIND CONTENT)
===================================================== */
const canvas = document.createElement("canvas");
canvas.id = "particle-canvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";

/* 🔑 KEY FIX */
canvas.style.zIndex = "1"; // background layer

document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.4 + 0.2;
    this.alpha = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(175, 240, 210, ${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =====================================================
   FORCE CONTENT ABOVE SPARKLES (NO OVERLAP)
===================================================== */
[
  ".menu",
  ".menu-card",
  ".jade-experience",
  ".experience",
  "section",
  "footer"
].forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.style.position = "relative";
    el.style.zIndex = "5";
  });
});

// ===== Parallax gems and hero text =====
const gems = document.querySelectorAll("model-viewer");
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
gems.forEach((gem, i) => {
  const floatOffset = Math.sin(Date.now() / 800 + i) * 15;
  const parallaxOffset = scrollY * (0.02 + i * 0.01);

  gem.style.transform = `translateY(${floatOffset + parallaxOffset}px)`;
});
  const heroText = document.querySelector(".hero-text");
  heroText.style.transform = `translateY(${scrollY * 0.05}px)`;
});

// ===== Menu card tilt + dynamic shadow =====
document.querySelectorAll(".menu-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0,0,0,0.25)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.boxShadow = "0 20px 45px rgba(0,0,0,0.25)";
  });
});

// ===== Navbar scroll background & active link =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  document.querySelectorAll(".navbar a").forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;
    if (
      section.offsetTop - 80 <= window.scrollY &&
      section.offsetTop + section.offsetHeight > window.scrollY
    ) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
});

// ===== Mobile Hamburger Menu =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});

