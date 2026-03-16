import { useState, useEffect, useRef } from "react";

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #F5F1EC; --bg2: #EDE8DF; --surface: #FFFFFF;
      --border: #DDD7CE; --accent: #7C6B5A; --accent2: #B8A899;
      --text: #2C2420; --text2: #6B5E56; --text3: #A0948A;
      --user-bubble: #5C4D40; --user-text: #F5F1EC;
      --radius: 12px; --shadow: 0 2px 12px rgba(0,0,0,0.07);
    }
    html, body, #root { height: 100%; }
    body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    body::before {
      content: ''; position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.4;
    }
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:translateY(0);} }
    @keyframes fadeIn { from { opacity:0;} to { opacity:1;} }
    @keyframes pulse { 0%,100% { opacity:0.4; transform:scale(1);} 50% { opacity:1; transform:scale(1.2);} }
    @keyframes breatheIn { 0% { transform:scale(1); opacity:0.6;} 100% { transform:scale(1.5); opacity:1;} }
    @keyframes breatheOut { 0% { transform:scale(1.5); opacity:1;} 100% { transform:scale(1); opacity:0.6;} }
    @keyframes spin { to { transform: rotate(360deg); } }
    .screen { min-height:100dvh; display:flex; flex-direction:column; width:100%; }

    /* NAV */
    .nav { display:flex; align-items:center; justify-content:space-between; padding:18px 32px; border-bottom:1px solid var(--border); background:var(--bg); position:sticky; top:0; z-index:100; }
    .nav-logo { display:flex; align-items:center; gap:8px; font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:500; color:var(--text); cursor:pointer; }
    .nav-logo svg { color:var(--accent); }
    .nav-links { display:flex; align-items:center; gap:6px; }
    .nav-link { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--text2); cursor:pointer; padding:6px 12px; border-radius:6px; transition:color 0.2s, background 0.2s; }
    .nav-link:hover { color:var(--text); background:var(--bg2); }

    /* LANDING */
    .landing-center { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 24px; text-align:center; width:100%; }
    .confidential-badge { display:inline-flex; align-items:center; gap:6px; background:var(--bg2); border:1px solid var(--border); border-radius:20px; padding:6px 14px; font-size:12px; color:var(--text2); margin-bottom:40px; animation:fadeUp 0.4s 0.1s ease both; }
    .landing-h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(42px,7vw,72px); font-weight:500; line-height:1.1; color:var(--text); animation:fadeUp 0.4s 0.2s ease both; }
    .landing-h1 span { color:var(--accent); }
    .landing-sub { font-size:17px; color:var(--text2); max-width:440px; line-height:1.65; margin-top:18px; animation:fadeUp 0.4s 0.3s ease both; }
    .btn-primary { display:inline-flex; align-items:center; gap:8px; background:var(--user-bubble); color:var(--user-text); border:none; border-radius:8px; padding:14px 28px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; cursor:pointer; margin-top:36px; transition:transform 0.2s, box-shadow 0.2s, background 0.2s; animation:fadeUp 0.4s 0.4s ease both; }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(92,77,64,0.25); background:#4A3D32; }
    .btn-primary:active { transform:translateY(0); }
    .landing-guest-note { font-size:12px; color:var(--text3); margin-top:12px; animation:fadeUp 0.4s 0.45s ease both; }
    .landing-pillars { display:flex; gap:40px; margin-top:64px; animation:fadeUp 0.4s 0.5s ease both; flex-wrap:wrap; justify-content:center; }
    .pillar { text-align:center; }
    .pillar-title { font-weight:500; font-size:14px; color:var(--text); }
    .pillar-sub { font-size:12px; color:var(--text3); margin-top:3px; }
    .landing-footer { padding:20px 32px; font-size:12px; color:var(--text3); text-align:center; border-top:1px solid var(--border); }

    /* ONBOARDING */
    .onboarding-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; }
    .onboarding-card { width:100%; max-width:560px; animation:fadeUp 0.4s ease both; }
    .step-label { font-size:12px; color:var(--text3); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:12px; }
    .onboarding-h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(26px,4vw,34px); font-weight:500; line-height:1.2; color:var(--text); margin-bottom:6px; }
    .onboarding-sub { font-size:14px; color:var(--text2); margin-bottom:28px; line-height:1.55; }
    .option-cards { display:flex; flex-direction:column; gap:10px; }
    .option-card { display:flex; align-items:center; gap:14px; background:var(--surface); border:1.5px solid var(--border); border-radius:var(--radius); padding:16px 18px; cursor:pointer; transition:border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .option-card:hover { border-color:var(--accent2); background:#FAF7F4; transform:translateY(-1px); box-shadow:var(--shadow); }
    .option-icon { width:36px; height:36px; border-radius:8px; background:var(--bg2); display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0; }
    .option-text { flex:1; }
    .option-title { font-size:15px; font-weight:500; color:var(--text); }
    .option-desc { font-size:13px; color:var(--text2); margin-top:2px; }

    /* CHAT */
    .chat-screen { display:flex; flex-direction:column; height:100dvh; overflow:hidden; }
    .chat-nav { display:flex; align-items:center; justify-content:space-between; padding:14px 24px; border-bottom:1px solid var(--border); background:var(--bg); flex-shrink:0; }
    .chat-nav-left { display:flex; align-items:center; gap:10px; }
    .chat-logo { display:flex; align-items:center; gap:7px; font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:500; color:var(--text); }
    .chat-nav-right { display:flex; align-items:center; gap:12px; }
    .session-timer { font-size:12px; color:var(--text3); display:flex; align-items:center; gap:4px; }
    .end-btn { background:none; border:1px solid var(--border); border-radius:6px; padding:6px 14px; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text2); cursor:pointer; transition:all 0.2s; }
    .end-btn:hover { border-color:var(--accent2); color:var(--text); background:var(--bg2); }
    .messages-area { flex:1; overflow-y:auto; padding:32px 24px; display:flex; flex-direction:column; gap:16px; scroll-behavior:smooth; }
    .messages-area::-webkit-scrollbar { width:4px; }
    .messages-area::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }
    .bubble-wrap { display:flex; animation:fadeUp 0.35s ease both; }
    .bubble-wrap.user { justify-content:flex-end; }
    .bubble-wrap.ai { justify-content:flex-start; }
    .bubble { max-width:min(76%,520px); padding:13px 17px; border-radius:var(--radius); font-size:15px; line-height:1.65; }
    .bubble.user { background:var(--user-bubble); color:var(--user-text); border-bottom-right-radius:4px; }
    .bubble.ai { background:var(--surface); color:var(--text); border:1px solid var(--border); border-bottom-left-radius:4px; box-shadow:var(--shadow); }
    .typing-dots { display:flex; align-items:center; gap:5px; padding:14px 18px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); border-bottom-left-radius:4px; box-shadow:var(--shadow); }
    .dot { width:6px; height:6px; border-radius:50%; background:var(--accent2); animation:pulse 1.2s ease-in-out infinite; }
    .dot:nth-child(2) { animation-delay:0.2s; }
    .dot:nth-child(3) { animation-delay:0.4s; }
    .chat-input-area { flex-shrink:0; padding:16px 24px 20px; border-top:1px solid var(--border); background:var(--bg); }
    .chat-input-row { display:flex; align-items:flex-end; gap:10px; background:var(--surface); border:1.5px solid var(--border); border-radius:10px; padding:10px 10px 10px 16px; transition:border-color 0.2s, box-shadow 0.2s; }
    .chat-input-row:focus-within { border-color:var(--accent2); box-shadow:0 0 0 3px rgba(124,107,90,0.1); }
    .chat-textarea { flex:1; background:none; border:none; outline:none; font-family:'DM Sans',sans-serif; font-size:15px; color:var(--text); resize:none; line-height:1.55; max-height:120px; min-height:24px; }
    .chat-textarea::placeholder { color:var(--text3); }
    .send-btn { width:36px; height:36px; border-radius:7px; background:var(--user-bubble); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:background 0.2s, transform 0.15s; color:white; }
    .send-btn:hover { background:#4A3D32; transform:scale(1.05); }
    .send-btn:disabled { background:var(--bg2); cursor:not-allowed; transform:none; }
    .chat-footer-note { text-align:center; font-size:11px; color:var(--text3); margin-top:8px; letter-spacing:0.02em; display:flex; align-items:center; justify-content:center; gap:4px; }

    /* SESSION END SUMMARY */
    .summary-screen { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; }
    .summary-end-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:36px 32px; max-width:520px; width:100%; box-shadow:var(--shadow); animation:fadeUp 0.4s ease both; }
    .summary-end-header { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:500; margin-bottom:6px; }
    .summary-end-sub { font-size:14px; color:var(--text2); margin-bottom:24px; }
    .summary-end-text { font-size:15px; color:var(--text2); line-height:1.7; background:var(--bg); border-radius:10px; padding:18px 20px; margin-bottom:24px; border:1px solid var(--border); font-style:italic; }
    .tags-section { margin-bottom:24px; }
    .tags-label { font-size:12px; color:var(--text3); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:10px; }
    .tags-grid { display:flex; flex-wrap:wrap; gap:8px; }
    .tag-chip { padding:6px 14px; border-radius:20px; font-size:13px; font-weight:500; cursor:pointer; border:1.5px solid var(--border); background:var(--bg); color:var(--text2); transition:all 0.15s; }
    .tag-chip:hover { border-color:var(--accent2); background:#FAF7F4; }
    .tag-chip.selected { background:var(--user-bubble); color:var(--user-text); border-color:var(--user-bubble); }
    .summary-actions { display:flex; flex-direction:column; gap:8px; }

    /* SESSIONS */
    .sessions-wrap { flex:1; overflow-y:auto; }
    .sessions-screen { padding:48px 24px; max-width:640px; width:100%; margin:0 auto; }
    .sessions-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:28px; animation:fadeUp 0.4s ease both; }
    .sessions-title { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:500; }
    .sessions-count { font-size:14px; color:var(--text2); margin-top:3px; }
    .new-btn { display:flex; align-items:center; gap:6px; background:var(--user-bubble); color:var(--user-text); border:none; border-radius:8px; padding:10px 18px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:background 0.2s, transform 0.15s, box-shadow 0.2s; }
    .new-btn:hover { background:#4A3D32; transform:translateY(-1px); box-shadow:0 4px 14px rgba(92,77,64,0.22); }
    .session-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px 22px; cursor:pointer; margin-bottom:12px; transition:border-color 0.2s, box-shadow 0.2s, transform 0.15s; animation:fadeUp 0.4s ease both; display:flex; align-items:flex-start; justify-content:space-between; }
    .session-card:hover { border-color:var(--accent2); box-shadow:var(--shadow); transform:translateY(-1px); }
    .session-tags { display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap; }
    .tag { font-size:11px; padding:3px 9px; border-radius:20px; font-weight:500; letter-spacing:0.03em; }
    .tag-pattern { background:#EDE8F5; color:#6B5CAD; }
    .tag-overwhelm { background:#FDF0E8; color:#AD6B3A; }
    .tag-vent { background:#E8F5EE; color:#3A8A5C; }
    .tag-reflect { background:#E8F0FD; color:#3A5CAD; }
    .tag-progress { background:#FDF5E8; color:#AD8A3A; }
    .tag-complete { background:#E8F5EE; color:#3A8A5C; }
    .tag-user { background:var(--bg2); color:var(--text2); }
    .session-title { font-size:16px; font-weight:500; color:var(--text); margin-bottom:5px; line-height:1.3; }
    .session-preview { font-size:13px; color:var(--text2); line-height:1.5; margin-bottom:10px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
    .session-meta { display:flex; gap:14px; font-size:12px; color:var(--text3); align-items:center; flex-wrap:wrap; }
    .session-meta span { display:flex; align-items:center; gap:4px; }
    .session-arrow { color:var(--text3); flex-shrink:0; margin-left:12px; margin-top:2px; }
    .empty-state { text-align:center; padding:80px 24px; animation:fadeUp 0.4s ease both; }
    .empty-icon { width:56px; height:56px; border-radius:50%; background:var(--bg2); display:flex; align-items:center; justify-content:center; margin:0 auto 16px; font-size:24px; }
    .empty-title { font-family:'Cormorant Garamond',serif; font-size:22px; margin-bottom:8px; }
    .empty-sub { font-size:14px; color:var(--text2); line-height:1.55; }

    /* SESSION DETAIL */
    .session-detail-wrap { flex:1; overflow-y:auto; }
    .session-detail-screen { padding:40px 24px; max-width:640px; width:100%; margin:0 auto; }
    .session-detail-back { display:flex; align-items:center; gap:8px; background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--text2); margin-bottom:28px; padding:0; transition:color 0.2s; }
    .session-detail-back:hover { color:var(--text); }
    .session-detail-title { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:500; margin-bottom:6px; }
    .session-detail-meta { font-size:13px; color:var(--text3); margin-bottom:12px; }
    .session-detail-user-tags { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:24px; }
    .summary-box { background:var(--bg2); border:1px solid var(--border); border-radius:var(--radius); padding:20px 22px; margin-bottom:28px; }
    .summary-label { font-size:11px; font-weight:500; color:var(--text3); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:8px; }
    .summary-text { font-size:14px; color:var(--text2); line-height:1.65; }
    .transcript-bubble-wrap { margin-bottom:14px; }
    .transcript-label { font-size:10px; color:var(--text3); letter-spacing:0.06em; text-transform:uppercase; margin-bottom:4px; padding:0 2px; }
    .transcript-label.user-label { text-align:right; }

    /* MODAL */
    .modal-overlay { position:fixed; inset:0; background:rgba(44,36,32,0.35); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:24px; animation:fadeIn 0.25s ease both; }
    .modal { background:var(--surface); border-radius:16px; padding:36px 32px; max-width:420px; width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.15); animation:fadeUp 0.3s ease both; }
    .modal-icon { width:48px; height:48px; border-radius:50%; background:var(--bg2); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px; }
    .modal-title { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:500; margin-bottom:8px; }
    .modal-body { font-size:14px; color:var(--text2); line-height:1.6; margin-bottom:20px; }
    .modal-tabs { display:flex; border:1px solid var(--border); border-radius:8px; overflow:hidden; margin-bottom:16px; }
    .modal-tab { flex:1; background:none; border:none; padding:10px; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--text2); cursor:pointer; transition:all 0.2s; }
    .modal-tab.active { background:var(--user-bubble); color:var(--user-text); }
    .input-field { width:100%; background:var(--bg); border:1.5px solid var(--border); border-radius:8px; padding:11px 14px; font-family:'DM Sans',sans-serif; font-size:15px; color:var(--text); outline:none; margin-bottom:10px; transition:border-color 0.2s, box-shadow 0.2s; }
    .input-field:focus { border-color:var(--accent2); box-shadow:0 0 0 3px rgba(124,107,90,0.1); }
    .input-field::placeholder { color:var(--text3); }
    .input-error { font-size:12px; color:#C0392B; margin-bottom:10px; margin-top:-4px; }
    .modal-actions { display:flex; flex-direction:column; gap:8px; margin-top:4px; }
    .btn-modal-primary { width:100%; background:var(--user-bubble); color:var(--user-text); border:none; border-radius:8px; padding:13px; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:500; cursor:pointer; transition:background 0.2s, transform 0.15s; display:flex; align-items:center; justify-content:center; gap:8px; }
    .btn-modal-primary:hover:not(:disabled) { background:#4A3D32; transform:translateY(-1px); }
    .btn-modal-primary:disabled { background:var(--accent2); cursor:not-allowed; }
    .btn-modal-secondary { width:100%; background:none; color:var(--text2); border:1px solid var(--border); border-radius:8px; padding:11px; font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer; transition:all 0.2s; }
    .btn-modal-secondary:hover { background:var(--bg2); color:var(--text); }

    /* CRISIS */
    .crisis-screen { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#FDF8F6; }
    .crisis-card { background:var(--surface); border:1px solid #E8D0C8; border-radius:16px; padding:40px 36px; max-width:480px; width:100%; box-shadow:0 4px 24px rgba(0,0,0,0.07); animation:fadeUp 0.4s ease both; }
    .crisis-icon { width:52px; height:52px; border-radius:50%; background:#FEF0EE; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:20px; }
    .crisis-title { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:500; margin-bottom:12px; }
    .crisis-body { font-size:15px; color:var(--text2); line-height:1.65; margin-bottom:28px; }
    .crisis-resources { display:flex; flex-direction:column; gap:10px; margin-bottom:24px; }
    .crisis-link { display:flex; align-items:center; gap:12px; background:var(--bg); border:1px solid var(--border); border-radius:10px; padding:13px 16px; text-decoration:none; color:var(--text); transition:border-color 0.2s, background 0.2s, transform 0.15s; }
    .crisis-link:hover { border-color:var(--accent2); background:#FAF7F4; transform:translateY(-1px); }
    .crisis-link-icon { font-size:18px; }
    .crisis-link-text { flex:1; }
    .crisis-link-title { font-size:14px; font-weight:500; }
    .crisis-link-sub { font-size:12px; color:var(--text2); margin-top:1px; }
    .crisis-return { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text3); cursor:pointer; padding:4px; text-decoration:underline; transition:color 0.2s; }
    .crisis-return:hover { color:var(--text2); }

    /* BREATHING */
    .breathing-screen { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 24px; text-align:center; animation:fadeIn 0.4s ease both; }
    .breath-circle { width:120px; height:120px; border-radius:50%; background:radial-gradient(circle, var(--accent2) 0%, var(--bg2) 100%); margin:0 auto 32px; }
    .breath-circle.inhale { animation:breatheIn 4s ease forwards; }
    .breath-circle.hold { transform:scale(1.5); opacity:1; }
    .breath-circle.exhale { animation:breatheOut 8s ease forwards; }
    .breath-label { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:500; margin-bottom:8px; }
    .breath-sub { font-size:14px; color:var(--text2); margin-bottom:32px; }
    .breath-skip { background:none; border:none; font-family:'DM Sans',sans-serif; font-size:13px; color:var(--text3); cursor:pointer; text-decoration:underline; }

    /* ADMIN */
    .admin-wrap { flex:1; overflow-y:auto; }
    .admin-screen { padding:40px 32px; max-width:900px; width:100%; margin:0 auto; }
    .admin-title { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:500; margin-bottom:4px; }
    .admin-sub { font-size:14px; color:var(--text2); margin-bottom:32px; }
    .admin-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(160px,1fr)); gap:16px; margin-bottom:32px; }
    .stat-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:20px 22px; animation:fadeUp 0.4s ease both; }
    .stat-value { font-family:'Cormorant Garamond',serif; font-size:36px; font-weight:500; color:var(--text); line-height:1; }
    .stat-label { font-size:13px; color:var(--text2); margin-top:4px; }
    .admin-section { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius); padding:24px; margin-bottom:16px; animation:fadeUp 0.4s ease both; }
    .admin-section-title { font-size:12px; font-weight:500; color:var(--text3); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:20px; }
    .bar-chart { display:flex; flex-direction:column; gap:12px; }
    .bar-row { display:flex; align-items:center; gap:12px; }
    .bar-label { font-size:13px; color:var(--text2); width:130px; flex-shrink:0; }
    .bar-track { flex:1; background:var(--bg2); border-radius:4px; height:10px; overflow:hidden; }
    .bar-fill { height:100%; background:var(--accent); border-radius:4px; transition:width 0.8s ease; }
    .bar-count { font-size:13px; color:var(--text3); width:24px; text-align:right; flex-shrink:0; }
    .day-chart { display:flex; align-items:flex-end; gap:3px; height:100px; padding-top:8px; }
    .day-bar { flex:1; background:var(--accent2); border-radius:3px 3px 0 0; min-height:3px; transition:height 0.5s ease; cursor:default; }
    .day-bar:hover { background:var(--accent); }
    .crisis-list { display:flex; flex-direction:column; gap:8px; }
    .crisis-item { display:flex; align-items:center; gap:12px; padding:10px 14px; background:var(--bg); border-radius:8px; font-size:13px; }
    .crisis-dot { width:8px; height:8px; border-radius:50%; background:#C0392B; flex-shrink:0; }
    .admin-login { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; }
    .admin-login-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:40px 36px; max-width:380px; width:100%; animation:fadeUp 0.4s ease both; }

    .spinner { width:16px; height:16px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; }

    @media (max-width:600px) {
      .nav { padding:14px 16px; }
      .sessions-screen { padding:32px 16px; }
      .session-detail-screen { padding:28px 16px; }
      .modal { padding:28px 20px; }
      .crisis-card { padding:28px 20px; }
      .messages-area { padding:20px 16px; }
      .chat-input-area { padding:12px 16px 16px; }
      .admin-screen { padding:24px 16px; }
      .summary-end-card { padding:28px 20px; }
    }
  `}</style>
);

// ── Icons ─────────────────────────────────────────────────────────────────────
const LeafIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
const ArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const ArrowLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const SendIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>;
const LockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const CalIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const MsgIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const ClockIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

// ── Constants ─────────────────────────────────────────────────────────────────
const INTENT_OPTIONS = [
  { id:"overwhelm", icon:"⚡", title:"Something just happened",   desc:"I feel overwhelmed and need to process" },
  { id:"vent",      icon:"💬", title:"I need to talk it out",      desc:"I want to vent and get things off my chest" },
  { id:"pattern",   icon:"🔄", title:"I keep noticing a pattern",  desc:"I want to understand why this keeps happening" },
  { id:"reflect",   icon:"🌿", title:"I want to reflect",          desc:"I'm calm and want to think something through" },
];
const STYLE_OPTIONS = [
  { id:"listen",    icon:"🎧", title:"Just listen",        desc:"Let me talk it out — reflect back what you hear" },
  { id:"questions", icon:"💭", title:"Ask me questions",   desc:"Help me think by asking thoughtful follow-ups" },
  { id:"analyze",   icon:"🔍", title:"Help me understand", desc:"Analyze patterns and help me see what's happening" },
];
const SESSION_TAGS   = ["work","relationships","anxiety","family","self-worth","anger","grief","other"];
const CRISIS_WORDS   = ["kill myself","suicide","want to die","end my life","harm myself","hurt myself","self harm","cut myself","overdose","don't want to live","not worth living"];
const TAG_MAP        = { overwhelm:"tag-overwhelm", vent:"tag-vent", pattern:"tag-pattern", reflect:"tag-reflect" };
const TAG_LABEL      = { overwhelm:"Overwhelm", vent:"Vent", pattern:"Pattern", reflect:"Reflection" };
const ADMIN_PW       = "admin2024";

// ── Helpers ───────────────────────────────────────────────────────────────────
const isCrisis    = t => CRISIS_WORDS.some(k => t.toLowerCase().includes(k));
const formatDate  = d => new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
const formatTimer = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
const ls          = (k,fb) => { try{ const v=localStorage.getItem(k); return v?JSON.parse(v):fb; }catch{ return fb; } };
const lsSet       = (k,v) => { try{ localStorage.setItem(k,JSON.stringify(v)); }catch{} };

// ── API ───────────────────────────────────────────────────────────────────────
async function callClaude(messages, system) {
  const r = await fetch("/api/chat",{
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages }),
  });
  const d = await r.json();
  return d.content?.map(b=>b.text||"").join("") || "I'm here. Take your time.";
}
async function genTitle(messages) {
  const convo = messages.slice(0,8).map(m=>`${m.role}: ${m.content}`).join("\n");
  const r = await fetch("/api/chat",{
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:20,
      messages:[{role:"user",content:`Give a private 4–6 word title for this reflection. Only the title.\n\n${convo}`}] }),
  });
  const d = await r.json();
  return d.content?.[0]?.text?.trim() || "Untitled Reflection";
}
async function genSummary(messages) {
  const convo = messages.map(m=>`${m.role}: ${m.content}`).join("\n");
  const r = await fetch("/api/chat",{
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:220,
      messages:[{role:"user",content:`Write a warm, private 3–4 sentence summary of this reflection session. Third person. Return only the summary.\n\n${convo}`}] }),
  });
  const d = await r.json();
  return d.content?.[0]?.text?.trim() || "";
}
function buildSystem(intent, style) {
  const im = { overwhelm:"The user is feeling overwhelmed after something just happened.", vent:"The user wants to vent.", pattern:"The user wants to understand a recurring pattern.", reflect:"The user wants to reflect calmly." };
  const sm = { listen:"Listen and reflect back. Do not analyze.", questions:"Ask one thoughtful open question at a time.", analyze:"Gently help spot patterns and gain insight." };
  return `You are a calm reflection partner for "Get Grounded". Context: ${im[intent]||""} Style: ${sm[style]||""}
Rules: 1-4 sentences max. One question per message. Never say "I hear you", "That must be so hard", "I understand". No advice unless asked. No bullet points. No therapy-speak. Be warm, grounded, curious. Early: open questions only. Later: gently reflect patterns. If crisis signals detected, respond with care and say they deserve real support.`;
}

// ── Auth hook ─────────────────────────────────────────────────────────────────
function useAuth() {
  const [user, setUser] = useState(() => ls("gg_user", null));
  const login = (email, pw) => {
    const users = ls("gg_users", []);
    const u = users.find(u=>u.email===email&&u.password===pw);
    if (!u) return "Invalid email or password.";
    setUser(u); lsSet("gg_user", u); return null;
  };
  const signup = (email, pw) => {
    if (!email||!pw) return "Please fill in all fields.";
    if (pw.length<8) return "Password must be at least 8 characters.";
    const users = ls("gg_users",[]);
    if (users.find(u=>u.email===email)) return "An account with this email already exists.";
    const nu = { id:Date.now(), email, password:pw, createdAt:new Date().toISOString() };
    lsSet("gg_users",[...users,nu]); setUser(nu); lsSet("gg_user",nu); return null;
  };
  const logout = () => { setUser(null); lsSet("gg_user",null); };
  return { user, login, signup, logout };
}

// ── Sessions hook ─────────────────────────────────────────────────────────────
function useSessions(user) {
  const key = user ? `gg_sessions_${user.id}` : "gg_sessions_guest";
  const [sessions, setSessions] = useState(() => ls(key, []));
  const save = s => { setSessions(s); lsSet(key, s); };
  useEffect(() => {
    if (user) {
      const gSessions = ls("gg_sessions_guest", []);
      if (gSessions.length>0) {
        const merged = [...ls(key,[]), ...gSessions];
        lsSet(key, merged); setSessions(merged); lsSet("gg_sessions_guest", []);
      }
    }
  }, [user?.id]);
  return { sessions, save };
}

// ── BREATHING ─────────────────────────────────────────────────────────────────
function BreathingScreen({ onDone }) {
  const [phase, setPhase] = useState("inhale");
  const [count, setCount] = useState(4);
  useEffect(() => {
    const phases=[{name:"inhale",dur:4000,c:4},{name:"hold",dur:7000,c:7},{name:"exhale",dur:8000,c:8}];
    let idx=0,timer,ct;
    const run=()=>{
      const p=phases[idx%3]; setPhase(p.name); setCount(p.c);
      let c=p.c; ct=setInterval(()=>{c--;setCount(c);},1000);
      timer=setTimeout(()=>{clearInterval(ct);idx++;if(idx>=9)onDone();else run();},p.dur);
    };
    run(); return()=>{clearTimeout(timer);clearInterval(ct);};
  },[]);
  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="breathing-screen">
        <div className={`breath-circle ${phase}`}/>
        <div className="breath-label">{{inhale:"Breathe in",hold:"Hold",exhale:"Breathe out"}[phase]}</div>
        <div className="breath-sub">{count}</div>
        <button className="breath-skip" onClick={onDone}>Skip exercise</button>
      </div>
    </div>
  );
}

// ── AUTH MODAL ────────────────────────────────────────────────────────────────
function AuthModal({ onClose, auth, defaultTab="signup", note="" }) {
  const [tab, setTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const handle = () => {
    setErr(""); setLoading(true);
    const e = tab==="signup" ? auth.signup(email,pw) : auth.login(email,pw);
    setLoading(false);
    if (e) { setErr(e); return; }
    onClose(true);
  };
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose(false)}>
      <div className="modal">
        <div className="modal-icon">🌿</div>
        <div className="modal-title">{tab==="signup"?"Save your reflections":"Welcome back"}</div>
        <div className="modal-body">{note || (tab==="signup"?"Create a free account to keep a private record of your sessions.":"Sign in to access your saved reflections.")}</div>
        <div className="modal-tabs">
          <button className={`modal-tab${tab==="signup"?" active":""}`} onClick={()=>{setTab("signup");setErr("");}}>Sign up</button>
          <button className={`modal-tab${tab==="login"?" active":""}`} onClick={()=>{setTab("login");setErr("");}}>Log in</button>
        </div>
        <input className="input-field" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <input className="input-field" placeholder="Password (min 8 chars)" type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handle()}/>
        {err && <div className="input-error">{err}</div>}
        <div className="modal-actions">
          <button className="btn-modal-primary" onClick={handle} disabled={loading}>
            {loading?<span className="spinner"/>:(tab==="signup"?"Create Account":"Log In")}
          </button>
          <button className="btn-modal-secondary" onClick={()=>onClose(false)}>Continue without saving</button>
        </div>
      </div>
    </div>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────────
function LandingPage({ onStart, onReflections, onLogin, onLogout, user }) {
  return (
    <div className="screen">
      <nav className="nav">
        <div className="nav-logo"><LeafIcon/>Get Grounded</div>
        <div className="nav-links">
          {user ? (
            <>
              <button className="nav-link" onClick={onReflections}>My Reflections</button>
              <button className="nav-link" onClick={onLogout}>Sign Out</button>
            </>
          ) : (
            <button className="nav-link" onClick={onLogin}>Log In</button>
          )}
        </div>
      </nav>
      <div className="landing-center">
        <div className="confidential-badge"><LockIcon/>&nbsp;Your reflections are confidential</div>
        <h1 className="landing-h1">Process your thoughts<br/><span>with clarity</span></h1>
        <p className="landing-sub">A guided thinking tool that helps you sort through what you're feeling and find your ground.</p>
        <button className="btn-primary" onClick={onStart}>Start a Reflection&nbsp;<ArrowRight/></button>
        <p className="landing-guest-note">No account needed. Your reflections are private.</p>
        <div className="landing-pillars">
          {[["Process","Talk through what happened"],["Understand","See the patterns clearly"],["Ground","Find clarity before reacting"]].map(([t,s])=>(
            <div key={t} className="pillar"><div className="pillar-title">{t}</div><div className="pillar-sub">{s}</div></div>
          ))}
        </div>
      </div>
      <div className="landing-footer">This is not therapy. Get Grounded is a thinking tool, not a substitute for professional support.</div>
    </div>
  );
}

// ── INTENT ────────────────────────────────────────────────────────────────────
function IntentPage({ onNext }) {
  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="onboarding-wrap">
        <div className="onboarding-card">
          <div className="step-label">Step 1 of 2</div>
          <h2 className="onboarding-h2">What brings you here?</h2>
          <p className="onboarding-sub">Choose what feels closest. There's no wrong answer.</p>
          <div className="option-cards">
            {INTENT_OPTIONS.map(o=>(
              <div key={o.id} className="option-card" onClick={()=>onNext(o.id)}>
                <div className="option-icon">{o.icon}</div>
                <div className="option-text"><div className="option-title">{o.title}</div><div className="option-desc">{o.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STYLE ─────────────────────────────────────────────────────────────────────
function StylePage({ onNext }) {
  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="onboarding-wrap">
        <div className="onboarding-card">
          <div className="step-label">Step 2 of 2</div>
          <h2 className="onboarding-h2">How would you like me to support you?</h2>
          <p className="onboarding-sub">You can always change this during the conversation.</p>
          <div className="option-cards">
            {STYLE_OPTIONS.map(o=>(
              <div key={o.id} className="option-card" onClick={()=>onNext(o.id)}>
                <div className="option-icon">{o.icon}</div>
                <div className="option-text"><div className="option-title">{o.title}</div><div className="option-desc">{o.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CHAT ──────────────────────────────────────────────────────────────────────
function ChatPage({ intent, style, onEnd, onCrisis }) {
  const [messages, setMessages] = useState([{role:"assistant",content:"I'm here. Go ahead — say whatever you need to say."}]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const bottomRef  = useRef(null);
  const textaRef   = useRef(null);
  const startedAt  = useRef(Date.now());
  const system     = buildSystem(intent, style);

  useEffect(()=>{
    const t=setInterval(()=>setElapsed(Math.floor((Date.now()-startedAt.current)/1000)),1000);
    return()=>clearInterval(t);
  },[]);
  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);

  const resize=e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,120)+"px";};

  const send=async()=>{
    const text=input.trim(); if(!text||loading) return;
    if(isCrisis(text)){onCrisis();return;}
    const updated=[...messages,{role:"user",content:text}];
    setMessages(updated); setInput("");
    if(textaRef.current) textaRef.current.style.height="auto";
    setLoading(true);
    try{
      const reply=await callClaude(updated.map(m=>({role:m.role,content:m.content})),system);
      if(isCrisis(reply)){onCrisis();return;}
      setMessages(p=>[...p,{role:"assistant",content:reply}]);
    }catch{
      setMessages(p=>[...p,{role:"assistant",content:"Take a moment. I'm still here when you're ready."}]);
    }finally{setLoading(false);}
  };

  return (
    <div className="chat-screen">
      <div className="chat-nav">
        <div className="chat-nav-left">
          <div className="chat-logo"><LeafIcon/>Get Grounded</div>
        </div>
        <div className="chat-nav-right">
          <span className="session-timer"><ClockIcon/>&nbsp;{formatTimer(elapsed)}</span>
          <button className="end-btn" onClick={()=>onEnd(messages,elapsed)}>End Session</button>
        </div>
      </div>
      <div className="messages-area">
        {messages.map((m,i)=>(
          <div key={i} className={`bubble-wrap ${m.role==="user"?"user":"ai"}`}>
            <div className={`bubble ${m.role==="user"?"user":"ai"}`}>{m.content}</div>
          </div>
        ))}
        {loading&&<div className="bubble-wrap ai"><div className="typing-dots"><div className="dot"/><div className="dot"/><div className="dot"/></div></div>}
        <div ref={bottomRef}/>
      </div>
      <div className="chat-input-area">
        <div className="chat-input-row">
          <textarea ref={textaRef} className="chat-textarea" placeholder="Type what's on your mind..." rows={1}
            value={input} onChange={e=>{setInput(e.target.value);resize(e);}}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
          <button className="send-btn" onClick={send} disabled={!input.trim()||loading}><SendIcon/></button>
        </div>
        <div className="chat-footer-note"><LockIcon/>&nbsp;Your reflections are confidential · This is not therapy</div>
      </div>
    </div>
  );
}

// ── SESSION END ───────────────────────────────────────────────────────────────
function SessionEndPage({ messages, elapsed, intent, style, onSave, user, auth }) {
  const [summary,  setSummary]  = useState("");
  const [title,    setTitle]    = useState("");
  const [tags,     setTags]     = useState([]);
  const [genDone,  setGenDone]  = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(()=>{
    Promise.all([genSummary(messages), genTitle(messages)])
      .then(([s,t])=>{setSummary(s);setTitle(t);})
      .finally(()=>setGenDone(true));
  },[]);

  const toggleTag=t=>setTags(p=>p.includes(t)?p.filter(x=>x!==t):p.length<3?[...p,t]:p);

  const doSave=()=>{
    onSave({id:Date.now(),date:new Date().toISOString(),intent,style,title,summary,tags,duration:elapsed,messages,status:"complete"});
  };
  const handleSave=()=>{ if(!user){setShowAuth(true);}else{doSave();} };

  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="summary-screen">
        <div className="summary-end-card">
          <div className="summary-end-header">Here's what came up</div>
          <div className="summary-end-sub">A private summary of your reflection</div>
          <div className="summary-end-text">
            {!genDone ? "Generating your summary…" : (summary || "Your thoughts were heard.")}
          </div>
          <div className="tags-section">
            <div className="tags-label">Tag this session (optional, up to 3)</div>
            <div className="tags-grid">
              {SESSION_TAGS.map(t=>(
                <button key={t} className={`tag-chip${tags.includes(t)?" selected":""}`} onClick={()=>toggleTag(t)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="summary-actions">
            <button className="btn-modal-primary" onClick={handleSave} disabled={!genDone}>
              {!genDone?<span className="spinner"/>:(user?"Save Reflection":"Save & Create Account")}
            </button>
            <button className="btn-modal-secondary" onClick={()=>onSave(null)}>Discard & Go Home</button>
          </div>
        </div>
      </div>
      {showAuth&&(
        <AuthModal auth={auth} onClose={ok=>{setShowAuth(false);if(ok)doSave();}} defaultTab="signup"
          note="Create a free account to save this reflection. No profile required."/>
      )}
    </div>
  );
}

// ── CRISIS ────────────────────────────────────────────────────────────────────
function CrisisScreen({ onReturn }) {
  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="crisis-screen">
        <div className="crisis-card">
          <div className="crisis-icon">🤍</div>
          <div className="crisis-title">You deserve real support right now.</div>
          <div className="crisis-body">It sounds like you may be going through something very serious. This app isn't equipped to give you the support you deserve in moments like this. Please reach out to someone who can truly help.</div>
          <div className="crisis-resources">
            <a className="crisis-link" href="tel:988"><span className="crisis-link-icon">📞</span><div className="crisis-link-text"><div className="crisis-link-title">Call or Text 988</div><div className="crisis-link-sub">Suicide & Crisis Lifeline (US)</div></div></a>
            <a className="crisis-link" href="sms:741741&body=HOME"><span className="crisis-link-icon">💬</span><div className="crisis-link-text"><div className="crisis-link-title">Text HOME to 741741</div><div className="crisis-link-sub">Crisis Text Line — available 24/7</div></div></a>
            <a className="crisis-link" href="https://findahelpline.com" target="_blank" rel="noreferrer"><span className="crisis-link-icon">🌍</span><div className="crisis-link-text"><div className="crisis-link-title">Find local resources</div><div className="crisis-link-sub">findahelpline.com — global directory</div></div></a>
            <a className="crisis-link" href="tel:911"><span className="crisis-link-icon">🚨</span><div className="crisis-link-text"><div className="crisis-link-title">Call 911</div><div className="crisis-link-sub">If you or someone is in immediate danger</div></div></a>
          </div>
          <button className="crisis-return" onClick={onReturn}>Return to session when you're ready</button>
        </div>
      </div>
    </div>
  );
}

// ── SESSIONS LIST ─────────────────────────────────────────────────────────────
function SessionsPage({ sessions, onNew, onView, onHome, user, onLogin, onLogout }) {
  return (
    <div className="screen">
      <nav className="nav">
        <div className="nav-logo" onClick={onHome}><LeafIcon/>Get Grounded</div>
        <div className="nav-links">
          <button className="nav-link" onClick={onHome}>Home</button>
          {user?(<><span className="nav-link" style={{cursor:"default"}}>{user.email.split("@")[0]}</span><button className="nav-link" onClick={onLogout}>Sign Out</button></>)
          :(<button className="nav-link" onClick={onLogin}>Log In</button>)}
        </div>
      </nav>
      <div className="sessions-wrap">
        <div className="sessions-screen">
          <div className="sessions-header">
            <div>
              <div className="sessions-title">My Reflections</div>
              <div className="sessions-count">{sessions.length} session{sessions.length!==1?"s":""}</div>
            </div>
            <button className="new-btn" onClick={onNew}><PlusIcon/>&nbsp;New</button>
          </div>
          {sessions.length===0?(
            <div className="empty-state">
              <div className="empty-icon">🌿</div>
              <div className="empty-title">No reflections yet</div>
              <div className="empty-sub">Your reflections will appear here.<br/>They're only visible to you.</div>
            </div>
          ):sessions.slice().reverse().map((s,i)=>(
            <div key={s.id||i} className="session-card" style={{animationDelay:`${i*0.05}s`}} onClick={()=>onView(s)}>
              <div style={{flex:1}}>
                <div className="session-tags">
                  {s.intent&&<span className={`tag ${TAG_MAP[s.intent]||"tag-reflect"}`}>{TAG_LABEL[s.intent]||s.intent}</span>}
                  <span className={`tag ${s.status==="complete"?"tag-complete":"tag-progress"}`}>{s.status==="complete"?"Complete":"In progress"}</span>
                </div>
                <div className="session-title">{s.title||"Untitled Reflection"}</div>
                {s.summary&&<div className="session-preview">{s.summary}</div>}
                <div className="session-meta">
                  <span><CalIcon/>&nbsp;{formatDate(s.date)}</span>
                  <span><MsgIcon/>&nbsp;{s.messages?.filter(m=>m.role==="user").length||0} messages</span>
                  {s.duration&&<span><ClockIcon/>&nbsp;{formatTimer(s.duration)}</span>}
                </div>
              </div>
              <div className="session-arrow"><ChevronRight/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SESSION DETAIL ────────────────────────────────────────────────────────────
function SessionDetailPage({ session, onBack }) {
  return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div></nav>
      <div className="session-detail-wrap">
        <div className="session-detail-screen">
          <button className="session-detail-back" onClick={onBack}><ArrowLeft/>&nbsp;Back</button>
          <div className="session-detail-title">{session.title||"Untitled Reflection"}</div>
          <div className="session-detail-meta">
            {formatDate(session.date)}&nbsp;·&nbsp;{session.messages?.filter(m=>m.role==="user").length} messages
            {session.duration?<>&nbsp;·&nbsp;{formatTimer(session.duration)}</>:null}
          </div>
          {session.tags?.length>0&&(
            <div className="session-detail-user-tags">
              {session.tags.map(t=><span key={t} className="tag tag-user">{t}</span>)}
            </div>
          )}
          {session.summary&&(
            <div className="summary-box">
              <div className="summary-label">Session Summary</div>
              <div className="summary-text">{session.summary}</div>
            </div>
          )}
          {session.messages?.map((m,i)=>(
            <div key={i} className="transcript-bubble-wrap">
              <div className={`transcript-label${m.role==="user"?" user-label":""}`}>{m.role==="user"?"You":"Get Grounded"}</div>
              <div className={`bubble-wrap ${m.role==="user"?"user":"ai"}`}>
                <div className={`bubble ${m.role==="user"?"user":"ai"}`}>{m.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────
function AdminPage({ onExit }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw]         = useState("");
  const [err, setErr]       = useState("");

  const allUsers    = ls("gg_users", []);
  const guestS      = ls("gg_sessions_guest", []);
  const userS       = allUsers.flatMap(u=>ls(`gg_sessions_${u.id}`,[]) );
  const allSessions = [...guestS, ...userS];

  const intentCounts = INTENT_OPTIONS.reduce((a,o)=>{a[o.id]=allSessions.filter(s=>s.intent===o.id).length;return a;},{});
  const maxIntent    = Math.max(...Object.values(intentCounts),1);
  const avgMsgs      = allSessions.length>0 ? Math.round(allSessions.reduce((a,s)=>a+(s.messages?.filter(m=>m.role==="user").length||0),0)/allSessions.length) : 0;
  const crisisEvents = allSessions.filter(s=>s.is_crisis||false);

  const last14 = Array.from({length:14},(_,i)=>{
    const d=new Date(); d.setDate(d.getDate()-13+i);
    const key=d.toISOString().slice(0,10);
    return { label:d.toLocaleDateString("en-US",{month:"short",day:"numeric"}), count:allSessions.filter(s=>s.date?.slice(0,10)===key).length };
  });
  const maxDay = Math.max(...last14.map(d=>d.count),1);

  if (!authed) return (
    <div className="screen">
      <nav className="nav"><div className="nav-logo"><LeafIcon/>Get Grounded</div><button className="nav-link" onClick={onExit}>← Back</button></nav>
      <div className="admin-login">
        <div className="admin-login-card">
          <div className="modal-icon">🔐</div>
          <div className="modal-title">Admin Dashboard</div>
          <div className="modal-body">Enter the admin password to continue.</div>
          <input className="input-field" type="password" placeholder="Password" value={pw}
            onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&(pw===ADMIN_PW?setAuthed(true):setErr("Incorrect password."))}/>
          {err&&<div className="input-error">{err}</div>}
          <button className="btn-modal-primary" onClick={()=>pw===ADMIN_PW?setAuthed(true):setErr("Incorrect password.")}>Enter</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="screen">
      <nav className="nav">
        <div className="nav-logo"><LeafIcon/>Get Grounded</div>
        <button className="nav-link" onClick={onExit}>← Exit Admin</button>
      </nav>
      <div className="admin-wrap">
        <div className="admin-screen">
          <div className="admin-title">Admin Dashboard</div>
          <div className="admin-sub">Aggregate data only. No individual session content is shown.</div>

          <div className="admin-grid">
            {[
              {v:allSessions.length,   l:"Total Sessions"},
              {v:allUsers.length,      l:"Registered Users"},
              {v:guestS.length,        l:"Guest Sessions"},
              {v:avgMsgs,              l:"Avg Messages / Session"},
              {v:crisisEvents.length,  l:"Crisis Events"},
              {v:allSessions.length>0?Math.round((userS.length/allSessions.length)*100)+"%":"—", l:"Registered Session %"},
            ].map((s,i)=>(
              <div key={i} className="stat-card" style={{animationDelay:`${i*0.07}s`}}>
                <div className="stat-value">{s.v}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="admin-section">
            <div className="admin-section-title">Sessions by Intent</div>
            <div className="bar-chart">
              {INTENT_OPTIONS.map(o=>(
                <div key={o.id} className="bar-row">
                  <div className="bar-label">{o.title.split(" ").slice(0,3).join(" ")}</div>
                  <div className="bar-track"><div className="bar-fill" style={{width:`${(intentCounts[o.id]/maxIntent)*100}%`}}/></div>
                  <div className="bar-count">{intentCounts[o.id]}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-section">
            <div className="admin-section-title">Daily Sessions — Last 14 Days</div>
            <div className="day-chart">
              {last14.map((d,i)=>(
                <div key={i} className="day-bar" style={{height:`${(d.count/maxDay)*100}%`}} title={`${d.label}: ${d.count}`}/>
              ))}
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:11,color:"var(--text3)"}}>
              <span>{last14[0].label}</span><span>{last14[last14.length-1].label}</span>
            </div>
          </div>

          {crisisEvents.length>0&&(
            <div className="admin-section">
              <div className="admin-section-title">Crisis Events — timestamps only, no content</div>
              <div className="crisis-list">
                {crisisEvents.slice(-10).reverse().map((s,i)=>(
                  <div key={i} className="crisis-item">
                    <div className="crisis-dot"/>
                    <span style={{flex:1,color:"var(--text2)"}}>{formatDate(s.date)}</span>
                    <span style={{color:"var(--text3)"}}>{TAG_LABEL[s.intent]||"Unknown"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,       setScreen]       = useState("landing");
  const [intent,       setIntent]       = useState(null);
  const [style,        setStyle]        = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatElapsed,  setChatElapsed]  = useState(0);
  const [viewSession,  setViewSession]  = useState(null);
  const [breathing,    setBreathing]    = useState(false);
  const [showAuth,     setShowAuth]     = useState(false);

  const auth = useAuth();
  const { sessions, save: saveSessions } = useSessions(auth.user);

  // Admin route via hash
  useEffect(()=>{
    if(window.location.hash==="#admin") setScreen("admin");
    const h=()=>{if(window.location.hash==="#admin")setScreen("admin");};
    window.addEventListener("hashchange",h);
    return()=>window.removeEventListener("hashchange",h);
  },[]);

  const goHome=()=>{ window.location.hash=""; setScreen("landing"); };

  const handleStyleNext=s=>{
    setStyle(s);
    if(intent==="overwhelm"){ setBreathing(true); }
    else setScreen("chat");
  };

  const handleChatEnd=(msgs,elapsed)=>{
    setChatMessages(msgs); setChatElapsed(elapsed); setScreen("session-end");
  };

  const handleSessionSave=session=>{
    if(session){ saveSessions([...sessions,session]); setScreen("sessions"); }
    else goHome();
  };

  if(breathing) return (
    <><FontLoader/><BreathingScreen onDone={()=>{setBreathing(false);setScreen("chat");}}/></>
  );

  return (
    <>
      <FontLoader/>
      {screen==="landing"        && <LandingPage onStart={()=>setScreen("intent")} onReflections={()=>setScreen("sessions")} onLogin={()=>setShowAuth(true)} onLogout={auth.logout} user={auth.user}/>}
      {screen==="intent"         && <IntentPage onNext={i=>{setIntent(i);setScreen("style");}}/>}
      {screen==="style"          && <StylePage onNext={handleStyleNext}/>}
      {screen==="chat"           && <ChatPage intent={intent} style={style} onEnd={handleChatEnd} onCrisis={()=>setScreen("crisis")}/>}
      {screen==="session-end"    && <SessionEndPage messages={chatMessages} elapsed={chatElapsed} intent={intent} style={style} onSave={handleSessionSave} user={auth.user} auth={auth}/>}
      {screen==="crisis"         && <CrisisScreen onReturn={()=>setScreen("chat")}/>}
      {screen==="sessions"       && <SessionsPage sessions={sessions} onNew={()=>setScreen("intent")} onView={s=>{setViewSession(s);setScreen("session-detail");}} onHome={goHome} user={auth.user} onLogin={()=>setShowAuth(true)} onLogout={auth.logout}/>}
      {screen==="session-detail" && viewSession && <SessionDetailPage session={viewSession} onBack={()=>setScreen("sessions")}/>}
      {screen==="admin"          && <AdminPage onExit={goHome}/>}
      {showAuth && <AuthModal auth={auth} onClose={ok=>{setShowAuth(false);}} defaultTab="login"/>}
    </>
  );
}