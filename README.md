# 🎓 NUST Admission Helper

An offline AI chatbot that answers frequently asked questions for prospective NUST students. Built for the **Local Chatbot Showdown 2026**.

## What it does

Students applying to NUST often struggle to find quick, reliable answers about admissions, the NET exam, programs, fees, and scholarships. This chatbot solves that — instantly, offline, and without any signup or internet connection after the initial load.

## Features

- 💬 Natural language Q&A powered by a local keyword inference engine
- 📚 Knowledge base built from official NUST FAQ data (nust.edu.pk/faqs)
- ⚡ Fully offline — no API calls, no data sent anywhere
- 🎨 Futuristic UI with animated particle background, dark/light mode
- 🗂️ Topic sidebar for Admissions, NET Exam, Programs, Fees, Scholarships, Campus Life
- 🚀 Splash screen intro with live loading sequence
- 📊 Match confidence indicator on every answer
- 🔗 Direct link to official NUST source on every response

## How to run

1. Download all 5 files into one folder
2. Open `index.html` in any browser
3. That's it — no installs, no setup

## Files

| File | Purpose |
|---|---|
| `index.html` | App structure and UI |
| `style.css` | All styling, themes, animations |
| `app.js` | Chat logic, splash screen, canvas background |
| `engine.js` | Offline keyword search and scoring engine |
| `faq-data.js` | NUST FAQ knowledge base |

## Tech stack

Pure HTML · CSS · Vanilla JavaScript — zero dependencies, zero frameworks.

---

Data source: [nust.edu.pk/faqs](https://nust.edu.pk/faqs/)
