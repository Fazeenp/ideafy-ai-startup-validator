// src/modules/pdf/pdf.service.js
const puppeteer = require("puppeteer");
const Idea = require("../idea/idea.model");

/* ─── helpers ─────────────────────────────────────────── */
const getScoreColor = (score) => {
  if (score >= 75) return { bg: "#d1fae5", text: "#065f46", bar: "#10b981", light: "#ecfdf5" };
  if (score >= 50) return { bg: "#fef3c7", text: "#92400e", bar: "#f59e0b", light: "#fffbeb" };
  return { bg: "#fee2e2", text: "#991b1b", bar: "#ef4444", light: "#fef2f2" };
};

const safe = (val, fallback = "—") =>
  val !== undefined && val !== null && val !== "" ? val : fallback;

const htmlList = (arr) =>
  Array.isArray(arr) && arr.length
    ? `<ul>${arr.map((i) => `<li>${i}</li>`).join("")}</ul>`
    : "<p>—</p>";

/* ─── HTML builder ─────────────────────────────────────── */
const buildHTML = (idea) => {
  const r = idea.result || {};
  const eo = r.executiveOverview || {};
  const fin = r.financials || {};
  const mc = r.marketCompetition || {};
  const pv = r.productValidation || {};
  const rec = r.recommendations || {};

  const score = idea.score ?? r.score ?? 0;
  const sc = getScoreColor(score);

  /* ── sub-components ── */

  // Metric cards (used in exec overview & product validation)
  const metricCards = (metrics = []) =>
    metrics.length
      ? `<div class="metric-row">
          ${metrics
            .map(
              (m) => `
            <div class="metric-card">
              <div class="metric-val">${safe(m.value)}</div>
              <div class="metric-label">${safe(m.label)}</div>
            </div>`
            )
            .join("")}
        </div>`
      : "";

  // KPI chips (used in financials)
  const kpiChips = (kpis = []) =>
    kpis.length
      ? `<div class="kpi-row">
          ${kpis
            .map(
              (k) => `
            <div class="kpi-chip">
              <div class="kpi-val">${safe(k.value)}</div>
              <div class="kpi-label">${safe(k.label)}</div>
            </div>`
            )
            .join("")}
        </div>`
      : "";

  // Revenue table
  const revenueTable = (revenue = []) =>
    revenue.length
      ? `<table class="rev-table">
          <thead><tr><th>Period</th><th>Projected Revenue</th><th>Growth</th></tr></thead>
          <tbody>
            ${revenue
              .map((r, i) => {
                const prev = revenue[i - 1]?.Revenue;
                const growth =
                  prev && prev > 0
                    ? `+${Math.round(((r.Revenue - prev) / prev) * 100)}%`
                    : "—";
                return `<tr>
                  <td>${r.year}</td>
                  <td class="rev-amount">$${r.Revenue.toLocaleString()}</td>
                  <td class="rev-growth ${i > 0 ? "positive" : ""}">${growth}</td>
                </tr>`;
              })
              .join("")}
          </tbody>
        </table>`
      : "";

  // Market share bar chart (stats)
  const marketBars = (stats = []) =>
    stats.length
      ? `<div class="market-bars">
          ${stats
            .map(
              (s) => `
            <div class="market-bar-row">
              <div class="market-bar-name">${s.name}</div>
              <div class="market-bar-track">
                <div class="market-bar-fill" style="width:${s.value}%"></div>
              </div>
              <div class="market-bar-pct">${s.value}%</div>
            </div>`
            )
            .join("")}
        </div>`
      : "";

  // Competitor cards
  const competitorCards = (competitors = []) =>
    competitors.length
      ? `<div class="comp-grid">
          ${competitors
            .map(
              (c) => `
            <div class="comp-card">
              <div class="comp-name">${c.name}</div>
              <div class="comp-detail">${c.detail}</div>
            </div>`
            )
            .join("")}
        </div>`
      : "";

  // Feedback quotes
  const feedbackQuotes = (feedback = []) =>
    feedback.length
      ? `<div class="quotes-wrap">
          ${feedback
            .map(
              (f) => `
            <div class="quote-card">
              <div class="quote-icon">"</div>
              <div class="quote-text">${f}</div>
            </div>`
            )
            .join("")}
        </div>`
      : "";

  // Action groups
  const actionGroups = (actions = []) =>
    actions.length
      ? actions
          .map(
            (a) => `
          <div class="action-group">
            <div class="action-title">${a.title}</div>
            ${htmlList(a.tasks)}
          </div>`
          )
          .join("")
      : "";

  // Risk table
  const riskTable = (risks = []) =>
    risks.length
      ? `<table class="risk-table">
          <thead><tr><th>Risk</th><th>Mitigation</th></tr></thead>
          <tbody>
            ${risks
              .map(
                (r) => `
              <tr>
                <td class="risk-name">${r.risk}</td>
                <td class="risk-mit">${r.mitigation}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>`
      : "";

  // Section wrapper
  const section = (title, body, accentColor = "#6d28d9") => `
    <div class="section">
      <div class="section-header" style="border-left-color:${accentColor}">
        <span>${title}</span>
      </div>
      <div class="section-body">${body}</div>
    </div>`;

  /* ── Full HTML ── */
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }
  html { font-size:13px; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  body { font-family:'Plus Jakarta Sans',sans-serif; background:#fff; color:#1e293b; line-height:1.7; }

  /* ══ COVER ══ */
  .cover {
    width:100%; min-height:297mm;
    background: linear-gradient(145deg, #0d0221 0%, #1a0533 40%, #0f172a 100%);
    color:#fff;
    display:flex; flex-direction:column;
    padding:64px 72px;
    page-break-after:always;
    position:relative; overflow:hidden;
  }
  .cover-blob1 {
    position:absolute; top:-100px; right:-100px;
    width:450px; height:450px; border-radius:50%;
    background:radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 65%);
  }
  .cover-blob2 {
    position:absolute; bottom:-60px; left:60px;
    width:320px; height:320px; border-radius:50%;
    background:radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 65%);
  }
  .cover-blob3 {
    position:absolute; top:40%; left:40%;
    width:200px; height:200px; border-radius:50%;
    background:radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%);
  }

  .cover-top { position:relative; z-index:1; }
  .cover-brand {
    font-family:'JetBrains Mono',monospace;
    font-size:0.65rem; letter-spacing:0.22em;
    text-transform:uppercase; color:rgba(255,255,255,0.4);
    margin-bottom:8px;
  }
  .cover-divider {
    width:40px; height:2px;
    background:linear-gradient(90deg,#7c3aed,#10b981);
    border-radius:2px; margin-bottom:48px;
  }

  .cover-main { position:relative; z-index:1; flex:1; display:flex; flex-direction:column; justify-content:center; }
  .cover-eyebrow {
    font-size:0.72rem; letter-spacing:0.15em; text-transform:uppercase;
    color:rgba(124,58,237,0.9); font-weight:600; margin-bottom:16px;
  }
  .cover-title {
    font-size:3.6rem; font-weight:800; line-height:1.05;
    letter-spacing:-1.5px; margin-bottom:12px;
    background:linear-gradient(135deg,#fff 0%,rgba(167,139,250,0.9) 100%);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  }
  .cover-industry {
    font-size:1rem; color:rgba(255,255,255,0.45);
    margin-bottom:16px; font-weight:400;
  }
  .cover-desc {
    font-size:0.92rem; color:rgba(255,255,255,0.6);
    max-width:520px; line-height:1.8; margin-bottom:56px;
  }

  /* Score pill on cover */
  .cover-score-row { display:flex; align-items:center; gap:28px; }
  .cover-score-pill {
    display:flex; align-items:center; gap:16px;
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:16px; padding:16px 24px;
    backdrop-filter:blur(10px);
  }
  .cover-score-ring {
    width:72px; height:72px; border-radius:50%; flex-shrink:0;
    background:conic-gradient(${sc.bar} ${score * 3.6}deg, rgba(255,255,255,0.1) 0deg);
    display:flex; align-items:center; justify-content:center; position:relative;
  }
  .cover-score-ring::after {
    content:''; position:absolute;
    width:54px; height:54px; border-radius:50%;
    background:#1a0533;
  }
  .cover-score-num {
    position:relative; z-index:1;
    font-size:1.3rem; font-weight:800; color:#fff;
    font-family:'JetBrains Mono',monospace;
  }
  .cover-score-info { }
  .cover-score-label { font-size:0.7rem; color:rgba(255,255,255,0.4); letter-spacing:0.1em; text-transform:uppercase; }
  .cover-score-value { font-size:1.8rem; font-weight:800; color:#fff; }
  .cover-score-status {
    display:inline-block; margin-top:4px;
    background:${sc.bar}33; border:1px solid ${sc.bar}55;
    color:${sc.bar}; border-radius:6px; padding:2px 10px;
    font-size:0.68rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
    font-family:'JetBrains Mono',monospace;
  }

  /* Cover info chips */
  .cover-chips { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
  .cover-chip {
    background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:8px; padding:6px 14px;
    font-size:0.72rem; color:rgba(255,255,255,0.55);
    font-family:'JetBrains Mono',monospace; letter-spacing:0.06em;
  }

  .cover-footer {
    position:relative; z-index:1;
    margin-top:48px; padding-top:24px;
    border-top:1px solid rgba(255,255,255,0.08);
    font-family:'JetBrains Mono',monospace;
    font-size:0.6rem; color:rgba(255,255,255,0.2);
    letter-spacing:0.12em; text-transform:uppercase;
    display:flex; justify-content:space-between;
  }

  /* ══ PAGE HEADER ══ */
  .page-header {
    display:flex; justify-content:space-between; align-items:center;
    padding:22px 56px 14px;
  }
  .page-header-brand {
    font-family:'JetBrains Mono',monospace;
    font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase;
    color:#7c3aed; font-weight:500;
  }
  .page-header-name {
    font-family:'JetBrains Mono',monospace;
    font-size:0.62rem; color:#94a3b8; letter-spacing:0.1em;
  }
  .header-line {
    height:1px; margin:0 56px 36px;
    background:linear-gradient(90deg,#7c3aed 0%,#10b981 50%,transparent 100%);
  }

  /* ══ CONTENT ══ */
  .content { padding:0 56px; }

  /* Score bar (inline page) */
  .inline-score {
    background:${sc.light};
    border:1px solid ${sc.bar}44;
    border-radius:14px; padding:20px 24px;
    display:flex; align-items:center; gap:24px;
    margin-bottom:32px;
  }
  .inline-score-circle {
    width:64px; height:64px; border-radius:50%; flex-shrink:0;
    background:conic-gradient(${sc.bar} ${score * 3.6}deg, #e2e8f0 0deg);
    display:flex; align-items:center; justify-content:center; position:relative;
  }
  .inline-score-circle::after {
    content:''; position:absolute;
    width:48px; height:48px; border-radius:50%;
    background:${sc.light};
  }
  .inline-score-val {
    position:relative; z-index:1;
    font-size:1rem; font-weight:800;
    color:${sc.text}; font-family:'JetBrains Mono',monospace;
  }
  .inline-score-text h3 { font-size:1rem; font-weight:700; color:${sc.text}; }
  .inline-score-text p { font-size:0.8rem; color:${sc.text}; opacity:0.75; margin-top:2px; }
  .inline-score-bar-wrap { flex:1; }
  .inline-score-bar-track { height:7px; border-radius:99px; background:${sc.bar}25; overflow:hidden; }
  .inline-score-bar-fill { height:100%; width:${score}%; background:${sc.bar}; border-radius:99px; }
  .inline-score-pct {
    font-size:0.65rem; color:${sc.text}; margin-top:5px;
    font-family:'JetBrains Mono',monospace; opacity:0.7;
  }

  /* ══ SECTION ══ */
  .section {
    margin-bottom:28px;
    border-radius:12px;
    border:1px solid #e2e8f0;
    overflow:hidden;
    page-break-inside:avoid;
    box-shadow:0 1px 4px rgba(0,0,0,0.05);
  }
  .section-header {
    background:linear-gradient(90deg,#fafafa,#f8f5ff);
    padding:11px 20px;
    font-family:'JetBrains Mono',monospace;
    font-size:0.65rem; font-weight:600;
    letter-spacing:0.18em; text-transform:uppercase;
    color:#6d28d9;
    border-bottom:1px solid #ede9fe;
    border-left:3px solid #7c3aed;
    display:flex; align-items:center; gap:8px;
  }
  .section-body { padding:20px 22px; }

  /* Summary paragraph */
  .summary-text {
    font-size:0.85rem; color:#475569; line-height:1.8;
    border-left:2px solid #e2e8f0; padding-left:14px;
    margin-bottom:16px;
  }

  /* Metric cards */
  .metric-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:16px; }
  .metric-card {
    flex:1; min-width:130px;
    background:linear-gradient(135deg,#f8f5ff,#f0fdf4);
    border:1px solid #e9d5ff;
    border-radius:10px; padding:14px 16px;
  }
  .metric-val { font-size:1.15rem; font-weight:700; color:#4c1d95; }
  .metric-label { font-size:0.7rem; color:#64748b; margin-top:3px; }

  /* Highlights list */
  ul { padding-left:18px; }
  li { font-size:0.83rem; color:#334155; margin-bottom:5px; }

  /* KPI chips */
  .kpi-row { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px; }
  .kpi-chip {
    flex:1; min-width:110px;
    background:#0f172a; border-radius:10px; padding:14px 16px;
    text-align:center;
  }
  .kpi-val { font-size:1.1rem; font-weight:700; color:#fff; font-family:'JetBrains Mono',monospace; }
  .kpi-label { font-size:0.68rem; color:rgba(255,255,255,0.45); margin-top:3px; text-transform:uppercase; letter-spacing:0.08em; }

  /* Revenue table */
  .rev-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
  .rev-table th {
    background:#f8fafc; font-size:0.68rem;
    text-transform:uppercase; letter-spacing:0.12em; color:#64748b;
    padding:8px 14px; text-align:left;
    border-bottom:2px solid #e2e8f0; font-family:'JetBrains Mono',monospace;
  }
  .rev-table td { padding:10px 14px; font-size:0.83rem; color:#1e293b; border-bottom:1px solid #f1f5f9; }
  .rev-table tbody tr:last-child td { border-bottom:none; }
  .rev-amount { font-weight:700; font-family:'JetBrains Mono',monospace; }
  .rev-growth { font-family:'JetBrains Mono',monospace; font-size:0.78rem; color:#64748b; }
  .rev-growth.positive { color:#10b981; font-weight:600; }

  /* Insights bullets */
  .insights-list { margin-top:12px; }
  .insight-item {
    display:flex; gap:10px; align-items:flex-start;
    font-size:0.83rem; color:#475569;
    padding:7px 0; border-bottom:1px solid #f8fafc;
  }
  .insight-item:last-child { border-bottom:none; }
  .insight-dot {
    width:6px; height:6px; border-radius:50%;
    background:#7c3aed; flex-shrink:0; margin-top:6px;
  }

  /* Market bars */
  .market-bars { margin-bottom:16px; }
  .market-bar-row { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
  .market-bar-name { min-width:180px; font-size:0.78rem; color:#334155; font-weight:500; }
  .market-bar-track {
    flex:1; height:10px; border-radius:99px;
    background:#f1f5f9; overflow:hidden;
  }
  .market-bar-fill {
    height:100%; border-radius:99px;
    background:linear-gradient(90deg,#7c3aed,#10b981);
  }
  .market-bar-pct {
    min-width:36px; text-align:right;
    font-size:0.75rem; font-weight:600;
    color:#6d28d9; font-family:'JetBrains Mono',monospace;
  }

  /* Competitor cards */
  .comp-grid { display:flex; flex-direction:column; gap:10px; }
  .comp-card {
    border:1px solid #e2e8f0; border-radius:10px;
    padding:14px 16px;
    background:linear-gradient(90deg,#fafafa,#fff);
  }
  .comp-name { font-size:0.85rem; font-weight:700; color:#1e293b; margin-bottom:4px; }
  .comp-detail { font-size:0.78rem; color:#64748b; line-height:1.7; }

  /* Drivers */
  .driver-item {
    display:flex; gap:12px; align-items:flex-start;
    font-size:0.83rem; color:#334155;
    padding:8px 0; border-bottom:1px solid #f8fafc;
  }
  .driver-item:last-child { border-bottom:none; }
  .driver-num {
    min-width:22px; height:22px; border-radius:50%;
    background:#7c3aed; color:#fff;
    font-size:0.65rem; font-weight:700;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; margin-top:1px;
  }

  /* Pilot trends table */
  .trend-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
  .trend-table th {
    background:#f8fafc; font-size:0.68rem;
    text-transform:uppercase; letter-spacing:0.1em; color:#64748b;
    padding:8px 14px; text-align:left;
    border-bottom:2px solid #e2e8f0; font-family:'JetBrains Mono',monospace;
  }
  .trend-table td { padding:9px 14px; font-size:0.83rem; border-bottom:1px solid #f1f5f9; }
  .trend-table tbody tr:last-child td { border-bottom:none; }
  .trend-val { font-weight:600; font-family:'JetBrains Mono',monospace; color:#4c1d95; }

  /* Quotes */
  .quotes-wrap { display:flex; flex-direction:column; gap:12px; }
  .quote-card {
    background:linear-gradient(90deg,#f8f5ff,#f0fdf4);
    border:1px solid #e9d5ff;
    border-radius:10px; padding:16px 18px;
    position:relative;
  }
  .quote-icon {
    position:absolute; top:10px; left:14px;
    font-size:2.5rem; color:#7c3aed; opacity:0.15;
    line-height:1; font-family:Georgia,serif;
  }
  .quote-text { font-size:0.82rem; color:#475569; line-height:1.75; padding-left:8px; font-style:italic; }

  /* Actions */
  .action-group { margin-bottom:18px; page-break-inside:avoid; }
  .action-title {
    font-size:0.82rem; font-weight:700; color:#1e293b;
    margin-bottom:8px; padding:7px 12px;
    background:#f8fafc; border-left:3px solid #10b981;
    border-radius:0 6px 6px 0;
  }
  .action-group ul { padding-left:18px; }
  .action-group li { font-size:0.81rem; color:#475569; margin-bottom:5px; }

  /* Risk table */
  .risk-table { width:100%; border-collapse:collapse; }
  .risk-table th {
    background:#fff1f2; font-size:0.68rem;
    text-transform:uppercase; letter-spacing:0.1em; color:#991b1b;
    padding:8px 14px; text-align:left;
    border-bottom:2px solid #fecaca; font-family:'JetBrains Mono',monospace;
  }
  .risk-table td { padding:10px 14px; font-size:0.81rem; border-bottom:1px solid #f1f5f9; vertical-align:top; }
  .risk-table tbody tr:last-child td { border-bottom:none; }
  .risk-name { font-weight:600; color:#1e293b; min-width:170px; }
  .risk-mit { color:#475569; line-height:1.7; }

  /* Final note */
  .final-note {
    background:linear-gradient(135deg,#1a0533,#0f172a);
    border-radius:12px; padding:22px 24px;
    margin-top:12px;
  }
  .final-note-label {
    font-family:'JetBrains Mono',monospace;
    font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase;
    color:rgba(124,58,237,0.8); margin-bottom:8px;
  }
  .final-note p { font-size:0.85rem; color:rgba(255,255,255,0.75); line-height:1.85; }

  /* ══ PAGE FOOTER ══ */
  .page-footer {
    text-align:center;
    font-family:'JetBrains Mono',monospace;
    font-size:0.58rem; color:#cbd5e1; letter-spacing:0.12em;
    padding:20px 56px 14px;
    border-top:1px solid #f1f5f9; margin-top:28px;
  }

  @media print {
    .cover { page-break-after:always; }
    .section { page-break-inside:avoid; }
  }
</style>
</head>
<body>

<!-- ══════════════════════════════════════════
     COVER PAGE
══════════════════════════════════════════ -->
<div class="cover">
  <div class="cover-blob1"></div>
  <div class="cover-blob2"></div>
  <div class="cover-blob3"></div>

  <div class="cover-top">
    <div class="cover-brand">Ideafy · Startup Validator</div>
    <div class="cover-divider"></div>
  </div>

  <div class="cover-main">
    <div class="cover-eyebrow">AI-Powered Startup Report</div>
    <div class="cover-title">${safe(idea.businessName, "Untitled Startup")}</div>
    <div class="cover-industry">${safe(idea.industry)} · ${safe(idea.businessModel)}</div>
    <div class="cover-desc">${safe(idea.description)}</div>

    <div class="cover-score-row">
      <div class="cover-score-pill">
        <div class="cover-score-ring">
          <span class="cover-score-num">${score}</span>
        </div>
        <div class="cover-score-info">
          <div class="cover-score-label">Viability Score</div>
          <div class="cover-score-value">${score}<span style="font-size:1rem;opacity:0.4"> / 100</span></div>
          <div class="cover-score-status">${safe(r.status, "Analysed")}</div>
        </div>
      </div>
    </div>

    <div class="cover-chips">
      <span class="cover-chip">🎯 ${safe(idea.targetMarket, "—")}</span>
      <span class="cover-chip">💰 ${safe(idea.funding, "—")} Stage</span>
      <span class="cover-chip">⏱ ${safe(idea.timeline, "—")}</span>
      <span class="cover-chip">👥 ${safe(idea.experience, "—")}</span>
    </div>
  </div>

  <div class="cover-footer">
    <span>Ideafy · Confidential</span>
    <span>${new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }).toUpperCase()}</span>
  </div>
</div>


<!-- ══════════════════════════════════════════
     CONTENT PAGES
══════════════════════════════════════════ -->
<div class="page-header">
  <span class="page-header-brand">Ideafy Startup Validator</span>
  <span class="page-header-name">${safe(idea.businessName)}</span>
</div>
<div class="header-line"></div>
<div class="content">

  <!-- ── Viability Score ── -->
  <div class="inline-score">
    <div class="inline-score-circle">
      <span class="inline-score-val">${score}</span>
    </div>
    <div class="inline-score-text">
      <h3>Viability Score: ${score} / 100</h3>
      <p>${
        score >= 75
          ? "Excellent — strong market fit and execution readiness."
          : score >= 50
          ? "Moderate — key refinements required before scaling."
          : "High risk — significant pivots may be necessary."
      }</p>
    </div>
    <div class="inline-score-bar-wrap">
      <div class="inline-score-bar-track"><div class="inline-score-bar-fill"></div></div>
      <div class="inline-score-pct">${score}% overall viability</div>
    </div>
  </div>

  <!-- ── Executive Overview ── -->
  ${section("Executive Overview", `
    <div class="summary-text">${safe(eo.summary)}</div>
    ${metricCards(eo.metrics)}
    ${
      eo.highlights?.length
        ? `<div style="margin-top:4px;"><strong style="font-size:0.75rem;color:#6d28d9;letter-spacing:0.05em;">KEY HIGHLIGHTS</strong>${htmlList(eo.highlights)}</div>`
        : ""
    }
  `)}

  <!-- ── Financials ── -->
  ${section("Financial Insights", `
    <div class="summary-text">${safe(fin.summary)}</div>
    ${kpiChips(fin.kpis)}
    <strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Revenue Projections</strong>
    <div style="margin-top:10px;">${revenueTable(fin.revenue)}</div>
    ${
      fin.insights?.length
        ? `<div class="insights-list">${fin.insights.map((i) => `<div class="insight-item"><div class="insight-dot"></div><span>${i}</span></div>`).join("")}</div>`
        : ""
    }
  `)}

  <!-- ── Market & Competition ── -->
  ${section("Market & Competition", `
    <div class="summary-text">${safe(mc.summary)}</div>
    <strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Market Share Distribution</strong>
    <div style="margin-top:10px;">${marketBars(mc.stats)}</div>
    ${
      mc.drivers?.length
        ? `<div style="margin:16px 0 6px;"><strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Growth Drivers</strong></div>
          <div>${mc.drivers.map((d, i) => `<div class="driver-item"><div class="driver-num">${i + 1}</div><span>${d}</span></div>`).join("")}</div>`
        : ""
    }
    ${
      mc.competitors?.length
        ? `<div style="margin:16px 0 8px;"><strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Competitor Landscape</strong></div>
          ${competitorCards(mc.competitors)}`
        : ""
    }
    ${
      mc.insights?.length
        ? `<div class="insights-list" style="margin-top:14px;">${mc.insights.map((i) => `<div class="insight-item"><div class="insight-dot"></div><span>${i}</span></div>`).join("")}</div>`
        : ""
    }
  `)}

  <!-- ── Product Validation ── -->
  ${section("Product Validation", `
    <div class="summary-text">${safe(pv.summary)}</div>
    ${metricCards(pv.metrics)}
    ${
      pv.trends?.length
        ? `<strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Pilot Growth Timeline</strong>
          <div style="margin-top:10px;">
            <table class="trend-table">
              <thead><tr><th>Period</th><th>MVP Clients</th><th>Advanced Clients</th></tr></thead>
              <tbody>
                ${pv.trends.map((t) => `<tr><td>${t.month}</td><td class="trend-val">${t.MVP}</td><td class="trend-val">${t.Advanced}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>`
        : ""
    }
    ${
      pv.feedback?.length
        ? `<div style="margin:16px 0 8px;"><strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Client Testimonials</strong></div>
          ${feedbackQuotes(pv.feedback)}`
        : ""
    }
  `)}

  <!-- ── Recommendations ── -->
  ${section("AI Recommendations", `
    <div class="summary-text">${safe(rec.summary)}</div>
    ${rec.actions?.length ? `<div style="margin-bottom:6px;"><strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Action Plan</strong></div>${actionGroups(rec.actions)}` : ""}
    ${rec.risks?.length ? `<div style="margin-bottom:8px;margin-top:14px;"><strong style="font-size:0.72rem;color:#6d28d9;letter-spacing:0.1em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;">Risk Register</strong></div>${riskTable(rec.risks)}` : ""}
    ${
      rec.finalNote
        ? `<div class="final-note" style="margin-top:18px;">
            <div class="final-note-label">Final Assessment</div>
            <p>${rec.finalNote}</p>
          </div>`
        : ""
    }
  `)}

</div>

<div class="page-footer">
  Ideafy Startup Validator · Confidential · ${new Date().getFullYear()} · AI-generated analysis — not financial advice
</div>

</body>
</html>`;
};

/* ─── main export ──────────────────────────────────────── */
const generateIdeaPDF = async (ideaId) => {
  const idea = await Idea.findById(ideaId);
  if (!idea) throw new Error("Idea not found");

  const html = buildHTML(idea);

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();

  // Set viewport to A4-like width for accurate rendering
  await page.setViewport({ width: 1080, height: 1400 });

  await page.setContent(html, { waitUntil: "networkidle0" });

  // Wait for Google Fonts to load
  await page.evaluateHandle("document.fonts.ready");

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0mm", bottom: "0mm", left: "0mm", right: "0mm" },
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = { generateIdeaPDF };