# 🎓 NUST Admission Helper — Offline Chatbot

A **fully offline** FAQ chatbot for NUST prospective students.  
No internet required after initial setup · No API keys · No GPU needed · Runs on 8GB RAM / i5 13th Gen.

---

## 📁 File Structure

```
nust-chatbot/
├── index.html      ← Main UI entry point
├── style.css       ← All styling (dark/light theme, animations)
├── faq-data.js     ← NUST FAQ knowledge base (edit this to add more Q&As)
├── engine.js       ← Offline search/matching engine (no ML needed)
├── app.js          ← Chat logic, UI interactions, rendering
└── README.md       ← This file
```

---

## 🚀 How to Run

### Option A — Just open in browser (simplest)
1. Download all 5 files into the same folder
2. Double-click `index.html` → opens in your browser
3. Done! No server needed.

### Option B — VS Code Live Server (recommended for dev)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Chat at `http://localhost:5500`

---

## ➕ Adding More FAQs

Open `faq-data.js` and add entries to the `FAQ_DATA` array:

```js
{
  id: "unique-id",
  topic: "admissions",          // net | admissions | programs | fees | scholarships | campus
  question: "Your question?",
  answer: "Detailed answer here.\n• Bullet point\n• Another point",
  keywords: ["keyword1", "keyword2", "keyword3"],
  confidence: 1.0               // 0.0 – 1.0
}
```

Data source: https://nust.edu.pk/faqs/

---

## 🔧 Optional: Plug in Ollama for Real AI Answers

If you want real LLM responses (still offline), install Ollama:

```bash
# 1. Install Ollama from https://ollama.com
# 2. Pull a small model
ollama pull llama3.2:3b      # ~2GB, fast on i5

# 3. Start Ollama (runs on localhost:11434)
ollama serve
```

Then in `engine.js`, replace the `answer()` method with an Ollama API call:

```js
async answerWithOllama(query) {
  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2:3b",
      prompt: `You are a NUST admissions expert. Answer this question based only on NUST FAQ data:\n\n${query}\n\nAnswer concisely:`,
      stream: false
    })
  });
  const data = await res.json();
  return data.response;
}
```

---

## 🏆 Hackathon Highlights

| Feature | Detail |
|---|---|
| 🔌 Fully Offline | Zero internet dependency after load |
| ⚡ Fast | Answers in <1 second on any hardware |
| 🎨 Beautiful UI | Dark/light mode, animated, responsive |
| 🔍 Smart Search | Keyword + token scoring engine |
| 📱 Responsive | Works on mobile and desktop |
| 🧩 Extensible | Easy to add more FAQ entries |
| 🤖 AI-ready | Drop-in Ollama integration instructions included |

---

## 🛠️ Hardware Requirements

- RAM: 8 GB ✅
- GPU: Not required ✅  
- CPU: i5 13th Gen or lower ✅
- OS: Windows / macOS / Linux ✅

---

Made for NUST Hackathon · Data from nust.edu.pk/faqs
