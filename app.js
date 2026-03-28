// app.js — NUST Admission Helper · Main Controller

(function () {
  // ─── Init engine ──────────────────────────────────────
  const engine = new NUSTEngine(window.FAQ_DATA);

  // ─── DOM refs ──────────────────────────────────────────
  const messagesEl  = document.getElementById("messages");
  const inputEl     = document.getElementById("userInput");
  const sendBtn     = document.getElementById("sendBtn");
  const clearBtn    = document.getElementById("clearBtn");
  const themeBtn    = document.getElementById("themeBtn");
  const welcomeCard = document.getElementById("welcomeCard");

  // ─── State ────────────────────────────────────────────
  let isTyping = false;

  // ─── Theme ────────────────────────────────────────────
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // ─── Clear ────────────────────────────────────────────
  clearBtn.addEventListener("click", () => {
    // Remove all msg-rows
    document.querySelectorAll(".msg-row").forEach(el => el.remove());
    // Re-show welcome card if it was removed
    if (!document.getElementById("welcomeCard")) {
      const card = buildWelcomeCard();
      messagesEl.prepend(card);
    } else {
      welcomeCard.style.display = "";
    }
  });

  // ─── Send on Enter (not Shift+Enter) ──────────────────
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  // Auto-resize textarea
  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
  });

  sendBtn.addEventListener("click", handleSend);

  // ─── Sidebar topic buttons ─────────────────────────────
  document.querySelectorAll(".topic-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".topic-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const topic = btn.dataset.topic;
      const topicQueries = {
        admissions: "How do I apply to NUST?",
        programs: "What programs does NUST offer?",
        fees: "What is the tuition fee at NUST?",
        campus: "What facilities are available at NUST?",
        net: "What is the NUST Entry Test (NET)?",
        scholarships: "What scholarships are available at NUST?"
      };
      if (topicQueries[topic]) sendQuery(topicQueries[topic]);
    });
  });

  // ─── Quick chips ──────────────────────────────────────
  document.querySelectorAll(".chip, .wchip").forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.q;
      if (q) sendQuery(q);
    });
  });

  // ─── Core send ────────────────────────────────────────
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

    // Simulate a short "thinking" delay for UX
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      removeTyping();
      const result = engine.answer(text);
      appendBotMsg(result);
      scrollToBottom();
    }, delay);
  }

  // ─── Hide welcome ─────────────────────────────────────
  function hideWelcome() {
    const card = document.getElementById("welcomeCard");
    if (card) {
      card.style.transition = "opacity 0.3s, transform 0.3s";
      card.style.opacity = "0";
      card.style.transform = "translateY(-10px)";
      setTimeout(() => card.remove(), 320);
    }
  }

  // ─── Append user message ──────────────────────────────
  function appendUserMsg(text) {
    const row = document.createElement("div");
    row.className = "msg-row user";
    row.innerHTML = `
      <div class="msg-avatar">U</div>
      <div class="msg-bubble">${escHtml(text)}</div>
    `;
    messagesEl.appendChild(row);
    scrollToBottom();
  }

  // ─── Typing indicator ─────────────────────────────────
  let typingRow = null;
  function showTyping() {
    isTyping = true;
    sendBtn.disabled = true;
    typingRow = document.createElement("div");
    typingRow.className = "msg-row bot";
    typingRow.id = "typingIndicator";
    typingRow.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(typingRow);
    scrollToBottom();
  }

  function removeTyping() {
    isTyping = false;
    sendBtn.disabled = false;
    if (typingRow) { typingRow.remove(); typingRow = null; }
  }

  // ─── Append bot message ───────────────────────────────
  function appendBotMsg(result) {
    const row = document.createElement("div");
    row.className = "msg-row bot";

    const confPct = Math.round(result.confidence * 100);
    const topicBadge = result.topic
      ? `<span class="topic-tag">${topicLabel(result.topic)}</span><br>` : "";
    const confBar = result.confidence > 0
      ? `<div class="confidence">
           <span>Match</span>
           <div class="conf-bar"><div class="conf-fill" style="width:${confPct}%"></div></div>
           <span>${confPct}%</span>
         </div>` : "";
    const sourceLink = `<a class="source-link" href="${result.source}" target="_blank">🔗 Official source</a>`;

    row.innerHTML = `
      <div class="msg-avatar">🎓</div>
      <div class="msg-bubble">
        ${topicBadge}
        <div class="bot-text">${formatAnswer(result.text)}</div>
        ${sourceLink}
        ${confBar}
      </div>
    `;
    messagesEl.appendChild(row);

    // Animate confidence bar fill
    setTimeout(() => {
      const fill = row.querySelector(".conf-fill");
      if (fill) fill.style.width = confPct + "%";
    }, 100);
  }

  // ─── Helpers ──────────────────────────────────────────
  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatAnswer(text) {
    // Convert \n to <br>, handle bullet lines
    return text
      .split("\n")
      .map(line => {
        if (line.startsWith("•") || line.startsWith("-")) {
          return `<span style="display:block;padding-left:8px;margin:2px 0">${escHtml(line)}</span>`;
        }
        return escHtml(line);
      })
      .join("<br>");
  }

  function topicLabel(topic) {
    const map = {
      net: "NET Exam",
      admissions: "Admissions",
      programs: "Programs",
      fees: "Fees & Finance",
      scholarships: "Scholarships",
      campus: "Campus Life"
    };
    return map[topic] || topic;
  }

  function buildWelcomeCard() {
    const d = document.createElement("div");
    d.className = "welcome-card";
    d.id = "welcomeCard";
    d.innerHTML = `
      <div class="welcome-glyph">🎓</div>
      <h2>Salaam! I'm your NUST guide.</h2>
      <p>Ask me anything about admissions, programs, the NET exam, scholarships, or campus life. Running fully offline.</p>
      <div class="welcome-chips">
        <button class="wchip" data-q="How do I apply to NUST?">How do I apply?</button>
        <button class="wchip" data-q="What is the NET exam?">What is NET?</button>
        <button class="wchip" data-q="What scholarships are available at NUST?">Scholarships</button>
      </div>
    `;
    d.querySelectorAll(".wchip").forEach(chip => {
      chip.addEventListener("click", () => sendQuery(chip.dataset.q));
    });
    return d;
  }

})();
