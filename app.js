// app.js — NUST Admission Helper · Local Chatbot Showdown 2026

(function () {

  // ─── Splash screen ────────────────────────────────────
  const splash      = document.getElementById("splash");
  const appShell    = document.getElementById("appShell");
  const splashStatus = document.getElementById("splashStatus");

  const steps = [
    [400,  "Loading FAQ knowledge base…"],
    [900,  "Building search index…"],
    [1500, "Warming up inference engine…"],
    [2000, "All systems ready ✓"],
  ];
  steps.forEach(([ms, msg]) => {
    setTimeout(() => { if (splashStatus) splashStatus.textContent = msg; }, ms);
  });
  setTimeout(() => {
    splash.classList.add("hide");
    appShell.style.transition = "opacity 0.55s ease";
    appShell.style.opacity    = "1";
    appShell.style.pointerEvents = "";
    setTimeout(() => splash.remove(), 700);
  }, 2600);

  // ─── Animated canvas background ──────────────────────
  const canvas = document.getElementById("bgCanvas");
  const ctx    = canvas.getContext("2d");
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1
    }));
  }

  function drawCanvas() {
    ctx.clearRect(0, 0, W, H);
    const isLight = document.body.classList.contains("light");

    // Draw grid
    ctx.strokeStyle = isLight ? "rgba(0,102,255,0.04)" : "rgba(0,245,212,0.04)";
    ctx.lineWidth = 1;
    const grid = 44;
    for (let x = 0; x < W; x += grid) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += grid) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Draw particles + connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(0,102,255,${p.alpha * 0.6})`
        : `rgba(0,245,212,${p.alpha})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const op = (1 - dist / 110) * 0.12 * p.alpha;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = isLight
            ? `rgba(0,102,255,${op})`
            : `rgba(0,245,212,${op})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawCanvas);
  }

  window.addEventListener("resize", () => { resize(); initParticles(); });
  resize(); initParticles(); drawCanvas();

  // ─── Engine ───────────────────────────────────────────
  const engine = new NUSTEngine(window.FAQ_DATA);

  // ─── DOM ──────────────────────────────────────────────
  const messagesEl = document.getElementById("messages");
  const inputEl    = document.getElementById("userInput");
  const sendBtn    = document.getElementById("sendBtn");
  const clearBtn   = document.getElementById("clearBtn");
  const themeBtn   = document.getElementById("themeBtn");

  // ─── Theme ────────────────────────────────────────────
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // ─── Clear ────────────────────────────────────────────
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".msg-row").forEach(el => el.remove());
    if (!document.getElementById("welcomeCard")) {
      messagesEl.prepend(buildWelcomeCard());
    }
  });

  // ─── Input events ─────────────────────────────────────
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
  });
  sendBtn.addEventListener("click", handleSend);

  // ─── Sidebar topic buttons — highlight only, no auto-send ──
  document.querySelectorAll(".topic-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".topic-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      // Just focus the input so user can type their question
      inputEl.focus();
    });
  });

  // ─── Quick chips — these DO send ─────────────────────
  document.querySelectorAll(".chip, .wchip").forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.q;
      if (q) sendQuery(q);
    });
  });

  // ─── State ────────────────────────────────────────────
  let isTyping = false;

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text || isTyping) return;
    sendQuery(text);
    inputEl.value = "";
    inputEl.style.height = "auto";
  }

  function sendQuery(text) {
    hideWelcome();
    appendUserMsg(text);
    showTyping();
    const delay = 550 + Math.random() * 550;
    setTimeout(() => {
      removeTyping();
      const result = engine.answer(text);
      appendBotMsg(result);
      scrollToBottom();
    }, delay);
  }

  // ─── Hide welcome card ────────────────────────────────
  function hideWelcome() {
    const card = document.getElementById("welcomeCard");
    if (card) {
      card.style.transition = "opacity 0.25s, transform 0.25s";
      card.style.opacity = "0";
      card.style.transform = "translateY(-8px)";
      setTimeout(() => card.remove(), 260);
    }
  }

  // ─── User message ─────────────────────────────────────
  function appendUserMsg(text) {
    const row = document.createElement("div");
    row.className = "msg-row user";
    row.innerHTML = `
      <div class="msg-avatar">YOU</div>
      <div class="msg-bubble">${escHtml(text)}</div>
    `;
    messagesEl.appendChild(row);
    scrollToBottom();
  }

  // ─── Typing indicator ─────────────────────────────────
  let typingRow = null;
  function showTyping() {
    isTyping = true; sendBtn.disabled = true;
    typingRow = document.createElement("div");
    typingRow.className = "msg-row bot";
    typingRow.innerHTML = `
      <div class="msg-avatar">AI</div>
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(typingRow);
    scrollToBottom();
  }
  function removeTyping() {
    isTyping = false; sendBtn.disabled = false;
    if (typingRow) { typingRow.remove(); typingRow = null; }
  }

  // ─── Bot message ──────────────────────────────────────
  function appendBotMsg(result) {
    const row = document.createElement("div");
    row.className = "msg-row bot";
    const confPct = Math.round(result.confidence * 100);
    const topicBadge = result.topic
      ? `<div class="topic-tag">${topicLabel(result.topic)}</div>` : "";
    const confBar = result.confidence > 0
      ? `<div class="confidence">
           <span>match</span>
           <div class="conf-bar"><div class="conf-fill" style="width:0%"></div></div>
           <span>${confPct}%</span>
         </div>` : "";

    row.innerHTML = `
      <div class="msg-avatar">AI</div>
      <div class="msg-bubble">
        ${topicBadge}
        <div class="bot-text">${formatAnswer(result.text)}</div>
        <a class="source-link" href="${result.source}" target="_blank">↗ nust.edu.pk/faqs</a>
        ${confBar}
      </div>
    `;
    messagesEl.appendChild(row);

    setTimeout(() => {
      const fill = row.querySelector(".conf-fill");
      if (fill) fill.style.width = confPct + "%";
    }, 80);
  }

  // ─── Helpers ──────────────────────────────────────────
  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escHtml(str) {
    return str
      .replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function formatAnswer(text) {
    return text.split("\n").map(line => {
      if (line.startsWith("•") || line.match(/^[0-9]+\./)) {
        return `<span style="display:block;padding-left:6px;margin:3px 0">${escHtml(line)}</span>`;
      }
      return escHtml(line);
    }).join("<br>");
  }

  function topicLabel(topic) {
    const m = { net:"NET Exam", admissions:"Admissions", programs:"Programs",
                fees:"Fees & Finance", scholarships:"Scholarships", campus:"Campus Life" };
    return m[topic] || topic;
  }

  function buildWelcomeCard() {
    const d = document.createElement("div");
    d.className = "welcome-card"; d.id = "welcomeCard";
    d.innerHTML = `
      <div class="welcome-badge mono">// LOCAL CHATBOT SHOWDOWN 2026 · NUST</div>
      <div class="welcome-glyph">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,4 54,17 54,43 30,56 6,43 6,17" fill="none" stroke="url(#rwg)" stroke-width="1.5"/>
          <text x="30" y="38" text-anchor="middle" fill="url(#rwg)" font-size="24" font-family="Orbitron" font-weight="900">N</text>
          <defs><linearGradient id="rwg" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop stop-color="#00f5d4"/><stop offset="1" stop-color="#0066ff"/>
          </linearGradient></defs>
        </svg>
      </div>
      <h2>Salaam! I'm your NUST guide.</h2>
      <p>Ask me anything about admissions, programs, the NET exam, scholarships, or campus life.</p>
      <div class="welcome-chips">
        <button class="wchip" data-q="How do I apply to NUST?">How do I apply?</button>
        <button class="wchip" data-q="What is the NET exam?">What is NET?</button>
        <button class="wchip" data-q="What scholarships are available at NUST?">Scholarships</button>
        <button class="wchip" data-q="What programs does NUST offer?">Programs</button>
      </div>
    `;
    d.querySelectorAll(".wchip").forEach(c => c.addEventListener("click", () => sendQuery(c.dataset.q)));
    return d;
  }

})();
