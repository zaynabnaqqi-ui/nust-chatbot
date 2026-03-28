// engine.js — Offline FAQ Retrieval Engine
// Uses keyword matching + TF-IDF-style scoring — no internet required.

class NUSTEngine {
  constructor(faqData) {
    this.data = faqData;
    this.stopwords = new Set([
      "a","an","the","is","it","of","in","on","at","to","for","and","or",
      "but","with","that","this","was","are","be","as","by","from","have",
      "has","had","do","does","did","will","would","could","should","i",
      "me","my","you","your","we","what","how","when","where","who","which"
    ]);
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(t => t.length > 1 && !this.stopwords.has(t));
  }

  score(query, faq) {
    const qTokens = this.tokenize(query);
    const haystack = [
      faq.question,
      faq.answer,
      ...(faq.keywords || [])
    ].join(" ").toLowerCase();

    let score = 0;

    // Exact keyword match (highest weight)
    for (const kw of (faq.keywords || [])) {
      if (query.toLowerCase().includes(kw.toLowerCase())) {
        score += 5;
      }
    }

    // Token overlap
    for (const token of qTokens) {
      if (haystack.includes(token)) {
        score += 1;
      }
    }

    // Question similarity bonus
    const qLow = query.toLowerCase();
    const fqLow = faq.question.toLowerCase();
    const overlap = qTokens.filter(t => fqLow.includes(t)).length;
    score += overlap * 2;

    // Apply pre-computed confidence
    score *= (faq.confidence || 1.0);

    return score;
  }

  search(query, topK = 1) {
    if (!query.trim()) return [];

    const scored = this.data.map(faq => ({
      faq,
      score: this.score(query, faq)
    }));

    scored.sort((a, b) => b.score - a.score);

    const best = scored.slice(0, topK).filter(r => r.score > 0);
    return best;
  }

  answer(query) {
    const results = this.search(query, 3);

    if (results.length === 0 || results[0].score < 1.5) {
      return {
        text: "I'm sorry, I couldn't find a specific answer to that question in the NUST FAQ database. For the most accurate and up-to-date information, please visit the official NUST FAQ page at nust.edu.pk/faqs/ or contact NUST admissions directly.",
        confidence: 0,
        topic: null,
        source: "https://nust.edu.pk/faqs/"
      };
    }

    const best = results[0];
    const maxPossible = 20; // rough normalization
    const confScore = Math.min(1, best.score / maxPossible);

    return {
      text: best.faq.answer,
      confidence: confScore,
      topic: best.faq.topic,
      question: best.faq.question,
      source: "https://nust.edu.pk/faqs/"
    };
  }
}

window.NUSTEngine = NUSTEngine;
