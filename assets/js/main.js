/* ============================================================
   Janvi Kumari — Digital Banking OS
   Vanilla JS interactions
   ============================================================ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- Loader ---------------- */
  function runLoader() {
    const loader = $("#loader");
    const bar = $("#loaderBar");
    const pct = $("#loaderPct");
    const status = $("#loaderStatus");
    if (!loader) return;

    const steps = [
      "booting kernel…",
      "mounting branch-ops…",
      "syncing digital channels…",
      "warming customer cache…",
      "system operational",
    ];
    if (prefersReduced) {
      loader.classList.add("is-done");
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    let p = 0;
    const timer = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      bar.style.width = p + "%";
      pct.textContent = Math.floor(p) + "%";
      status.textContent = steps[Math.min(steps.length - 1, Math.floor((p / 100) * steps.length))];
      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          loader.classList.add("is-done");
          document.body.style.overflow = "";
          startTyping();
        }, 350);
      }
    }, 220);
  }

  /* ---------------- Typing effect ---------------- */
  function startTyping() {
    const el = $("#typed");
    if (!el) return;
    const phrases = [
      "Probationary Officer • Bank of Maharashtra",
      "Digital Banking & Branch Operations",
      "Customer experience, by design",
      "Operational excellence, every day",
    ];
    if (prefersReduced) { el.textContent = phrases[0]; return; }
    let pi = 0, ci = 0, deleting = false;
    function tick() {
      const cur = phrases[pi];
      el.textContent = cur.slice(0, ci);
      if (!deleting && ci < cur.length) { ci++; setTimeout(tick, 55); }
      else if (!deleting && ci === cur.length) { deleting = true; setTimeout(tick, 1700); }
      else if (deleting && ci > 0) { ci--; setTimeout(tick, 28); }
      else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 350); }
    }
    tick();
  }

  /* ---------------- Particles ---------------- */
  function initParticles() {
    const host = $("#particles");
    if (!host || prefersReduced) return;
    const count = window.innerWidth < 700 ? 14 : 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = "-10px";
      const dur = 12 + Math.random() * 16;
      p.style.animationDuration = dur + "s";
      p.style.animationDelay = -Math.random() * dur + "s";
      p.style.opacity = (0.2 + Math.random() * 0.4).toFixed(2);
      const size = 2 + Math.random() * 3;
      p.style.width = p.style.height = size + "px";
      host.appendChild(p);
    }
  }

  /* ---------------- Mouse spotlight ---------------- */
  function initSpotlight() {
    const sp = $("#spotlight");
    if (!sp || prefersReduced || matchMedia("(pointer: coarse)").matches) { if (sp) sp.style.display = "none"; return; }
    let raf = null;
    window.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        sp.style.left = e.clientX + "px";
        sp.style.top = e.clientY + "px";
        raf = null;
      });
    });
  }

  /* ---------------- Navbar + scroll progress ---------------- */
  function initScroll() {
    const nav = $("#navbar");
    const bar = $("#scrollBar");
    function onScroll() {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("is-scrolled", y > 30);
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Mobile menu ---------------- */
  function initMobileMenu() {
    const burger = $("[data-burger]");
    const menu = $("[data-mobile-menu]");
    if (!burger || !menu) return;
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      menu.hidden = !open;
      burger.setAttribute("aria-expanded", String(open));
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => {
      menu.classList.remove("is-open"); menu.hidden = true; burger.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    const els = $$(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- Counters ---------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const plain = el.dataset.plain === "true";
    if (prefersReduced) { el.textContent = (plain ? target : Math.round(target)) + suffix; return; }
    const dur = 1400;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = plain ? Math.round(target * eased) : Math.round(target * eased);
      el.textContent = (plain ? val : val) + suffix;
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(frame);
  }
  function initCounters() {
    const els = $$("[data-count]");
    if (!("IntersectionObserver" in window)) { els.forEach(animateCount); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- Dashboard bars ---------------- */
  function initBars() {
    const host = $("#bars");
    if (!host) return;
    const data = [
      ["Mon", 62], ["Tue", 78], ["Wed", 71], ["Thu", 88], ["Fri", 95], ["Sat", 54], ["Sun", 40],
    ];
    data.forEach(([label]) => {
      const b = document.createElement("div");
      b.className = "bar";
      b.dataset.label = label;
      host.appendChild(b);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$(".bar", host).forEach((bar, i) => {
            setTimeout(() => { bar.style.height = data[i][1] + "%"; }, prefersReduced ? 0 : i * 90);
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(host);
  }

  /* ---------------- Terminal typing ---------------- */
  function initTerminal() {
    const body = $("#terminalBody");
    const wrap = $("[data-terminal]");
    if (!body || !wrap) return;

    const lines = [
      { c: "t-prompt", t: "janvi@bom", p: true, cmd: "start --service digital-banking" },
      { c: "t-ok", t: "✓ customer-experience module ....... online" },
      { c: "t-ok", t: "✓ branch-operations module ......... online" },
      { c: "t-ok", t: "✓ digital-adoption module .......... online" },
      { c: "t-info", t: "→ 09:04  greeted customer, guided to mobile onboarding" },
      { c: "t-info", t: "→ 10:21  resolved account query, first-contact ✓" },
      { c: "t-info", t: "→ 11:47  helped set up net-banking, digital adoption +1" },
      { c: "t-warn", t: "! 12:30  peak queue detected — rebalanced counters" },
      { c: "t-ok", t: "✓ 13:15  turnaround time within target" },
      { c: "t-dim", t: "// all entries are fictional & illustrative" },
      { c: "t-prompt", t: "janvi@bom", p: true, cmd: "status" },
      { c: "t-ok", t: "system: operational · customers: happy · uptime: 100%" },
    ];

    let started = false;
    function print(i) {
      if (i >= lines.length) {
        setTimeout(() => { body.innerHTML = ""; print(0); }, 4500);
        return;
      }
      const ln = lines[i];
      const div = document.createElement("div");
      div.className = "line";
      if (ln.p) {
        div.innerHTML = `<span class="t-user">${ln.t}</span><span class="t-dim">:~$</span> <span class="t-cmd">${ln.cmd}</span>`;
      } else {
        div.innerHTML = `<span class="${ln.c}">${ln.t}</span>`;
      }
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      setTimeout(() => print(i + 1), prefersReduced ? 200 : (ln.p ? 650 : 480));
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !started) { started = true; print(0); }
      });
    }, { threshold: 0.3 });
    io.observe(wrap);
  }

  /* ---------------- Expandable stack cards ---------------- */
  function initExpand() {
    $$("[data-expand]").forEach((card) => {
      const toggle = () => {
        const open = card.classList.toggle("is-open");
        card.setAttribute("aria-expanded", String(open));
        const t = $(".stack-card__toggle", card);
        if (t) t.textContent = open ? "collapse ↑" : "expand →";
      };
      card.addEventListener("click", toggle);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
  }

  /* ---------------- Tilt ---------------- */
  function initTilt() {
    if (prefersReduced || matchMedia("(pointer: coarse)").matches) return;
    $$("[data-tilt]").forEach((el) => {
      const target = el.querySelector(".glass") || el;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        target.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => { target.style.transform = ""; });
    });
  }

  /* ---------------- Contact modal ---------------- */
  function initModal() {
    const modal = $("#contactModal");
    if (!modal) return;
    let lastFocus = null;
    const open = () => {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      const close = $(".modal__x", modal);
      if (close) close.focus();
      document.addEventListener("keydown", onKey);
    };
    const close = () => {
      modal.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (lastFocus) lastFocus.focus();
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = $$('a[href], button:not([disabled])', modal).filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    $$("[data-open-contact]").forEach((b) => b.addEventListener("click", open));
    $$("[data-close-contact]").forEach((b) => b.addEventListener("click", close));
  }

  /* ---------------- Copy + toast ---------------- */
  function showToast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(() => t.classList.add("is-visible"));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.classList.remove("is-visible");
      setTimeout(() => { t.hidden = true; }, 300);
    }, 2200);
  }
  function initCopy() {
    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
          showToast("Copied: " + text);
        } catch { showToast(text); }
      });
    });
  }

  /* ---------------- Smooth anchor scroll (offset for navbar) ---------------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
      });
    });
  }

  /* ---------------- Year ---------------- */
  function initYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------------- Boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    runLoader();
    initParticles();
    initSpotlight();
    initScroll();
    initMobileMenu();
    initReveal();
    initCounters();
    initBars();
    initTerminal();
    initExpand();
    initTilt();
    initModal();
    initCopy();
    initAnchors();
    initYear();
    if (prefersReduced) startTyping();
  });

  window.addEventListener("load", () => {
    setTimeout(() => { const l = $("#loader"); if (l && !l.classList.contains("is-done")) { l.classList.add("is-done"); document.body.style.overflow = ""; startTyping(); } }, 4000);
  });
})();
