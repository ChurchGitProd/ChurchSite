// tina/config.ts
import { defineConfig } from "tinacms";

// tina/adminCustomizer.ts
var SCRIPTURA_ADMIN_CSS = `
  :root {
    --scriptura-navy-950: #0a1b32;
    --scriptura-navy-900: #0e2646;
    --scriptura-navy-800: #163b6c;
    --scriptura-navy-700: #1d4b8a;
    --scriptura-blue-600: #305cde;
    --scriptura-blue-500: #4a75ea;
    --scriptura-blue-50: #eff4ff;
    --scriptura-gold-600: #b59154;
    --scriptura-gold-500: #c8a46a;
    --scriptura-gold-400: #dfbe87;
    --scriptura-gold-50: #fcf9f2;
    --scriptura-slate-50: #f8fafc;
    --scriptura-slate-100: #f1f5f9;
    --scriptura-slate-200: #e2e8f0;
    --scriptura-slate-300: #cbd5e1;
    --scriptura-slate-400: #94a3b8;
    --scriptura-slate-500: #64748b;
    --scriptura-slate-600: #475569;
    --scriptura-slate-700: #334155;
    --scriptura-slate-800: #1e293b;
    --scriptura-slate-900: #0f172a;
  }

  body, html {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
    background-color: var(--scriptura-slate-50) !important;
    color: var(--scriptura-slate-900) !important;
  }

  /* Custom Scrollbars */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--scriptura-slate-100);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--scriptura-slate-300);
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--scriptura-navy-700);
  }

  /* Sidebar header brand banner */
  .scriptura-sidebar-header {
    background: linear-gradient(135deg, var(--scriptura-navy-950) 0%, var(--scriptura-navy-800) 100%);
    padding: 20px 18px 16px;
    border-bottom: 2px solid var(--scriptura-gold-500);
    color: #ffffff;
  }
  .scriptura-sidebar-logo-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
  }
  .scriptura-sidebar-icon {
    width: 32px;
    height: 32px;
    background: rgba(200, 164, 106, 0.2);
    border: 1px solid var(--scriptura-gold-500);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--scriptura-gold-400);
  }
  .scriptura-sidebar-title {
    font-family: 'Cinzel', 'Times New Roman', Times, 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #ffffff;
    line-height: 1.2;
  }
  .scriptura-sidebar-subtitle {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--scriptura-gold-400);
    font-weight: 600;
    margin-bottom: 12px;
    display: block;
  }
  .scriptura-sidebar-links-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .scriptura-sidebar-home-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 500;
    color: #e2e8f0;
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 10px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .scriptura-sidebar-home-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }
  .scriptura-sidebar-site-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    font-weight: 500;
    color: var(--scriptura-gold-400);
    background: rgba(200, 164, 106, 0.15);
    border: 1px solid rgba(200, 164, 106, 0.3);
    padding: 4px 10px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .scriptura-sidebar-site-btn:hover {
    background: var(--scriptura-gold-500);
    color: var(--scriptura-navy-950);
  }

  /* Sidebar navigation items (strictly scoped to sidebar container, excluding custom dashboard) */
  div[class*="w-96"] a[href*="#/collections/"]:not(.scriptura-dashboard a):not(.scriptura-quick-btn):not(.scriptura-card-link):not(.scriptura-card-action-btn) {
    padding: 7px 12px !important;
    margin: 1px 0 !important;
    border-radius: 6px !important;
    font-size: 13.5px !important;
    font-weight: 500 !important;
    transition: all 0.15s ease !important;
    color: var(--scriptura-slate-700) !important;
    border-left: 3px solid transparent !important;
  }
  div[class*="w-96"] a[href*="#/collections/"]:not(.scriptura-dashboard a):not(.scriptura-quick-btn):not(.scriptura-card-link):not(.scriptura-card-action-btn):hover {
    background-color: var(--scriptura-slate-100) !important;
    color: var(--scriptura-navy-800) !important;
    border-left-color: var(--scriptura-blue-600) !important;
  }
  div[class*="w-96"] a[href*="#/collections/"].text-blue-600,
  div[class*="w-96"] a[href*="#/collections/"][class*="text-blue-600"] {
    background-color: var(--scriptura-blue-50) !important;
    color: var(--scriptura-navy-800) !important;
    font-weight: 600 !important;
    border-left-color: var(--scriptura-gold-500) !important;
  }

  /* Category separators in sidebar */
  .scriptura-nav-category {
    font-size: 10.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--scriptura-navy-800);
    padding: 16px 10px 6px 10px;
    margin-top: 6px;
    border-top: 1px solid var(--scriptura-slate-200);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .scriptura-nav-category:first-of-type {
    border-top: none;
    padding-top: 10px;
    margin-top: 0;
  }

  /* Form inputs & focus rings */
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="url"]:focus,
  input[type="search"]:focus,
  textarea:focus,
  select:focus {
    border-color: var(--scriptura-blue-600) !important;
    box-shadow: 0 0 0 3px rgba(48, 92, 222, 0.18) !important;
    outline: none !important;
  }

  /* Field labels */
  label {
    font-size: 13px !important;
    font-weight: 600 !important;
    color: var(--scriptura-slate-700) !important;
  }

  /* Primary Buttons */
  button[type="submit"],
  button.bg-blue-500,
  button.bg-blue-600 {
    background: linear-gradient(135deg, var(--scriptura-navy-800) 0%, var(--scriptura-blue-600) 100%) !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
    font-size: 13.5px !important;
    box-shadow: 0 2px 4px rgba(22, 59, 108, 0.2) !important;
    border: none !important;
  }
  button[type="submit"]:hover,
  button.bg-blue-500:hover,
  button.bg-blue-600:hover {
    background: linear-gradient(135deg, var(--scriptura-navy-900) 0%, var(--scriptura-navy-800) 100%) !important;
    box-shadow: 0 4px 8px rgba(22, 59, 108, 0.3) !important;
  }

  /* Executive Editorial Dashboard */
  .scriptura-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 32px 60px;
  }
  .scriptura-hero {
    background: linear-gradient(135deg, var(--scriptura-navy-950) 0%, var(--scriptura-navy-800) 70%, var(--scriptura-navy-700) 100%);
    border-radius: 12px;
    padding: 32px 36px;
    color: #ffffff;
    border-bottom: 4px solid var(--scriptura-gold-500);
    box-shadow: 0 10px 25px -5px rgba(10, 27, 50, 0.2);
    margin-bottom: 28px;
    position: relative;
    overflow: hidden;
  }
  .scriptura-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(200, 164, 106, 0.18);
    border: 1px solid rgba(200, 164, 106, 0.35);
    color: var(--scriptura-gold-400);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    margin-bottom: 12px;
  }
  .scriptura-hero-badge-dot {
    width: 7px;
    height: 7px;
    background: #22c55e;
    border-radius: 50%;
    display: inline-block;
  }
  .scriptura-hero-title {
    font-family: 'Cinzel', 'Times New Roman', Times, 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 6px;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  .scriptura-hero-subtitle {
    font-size: 16px;
    font-weight: 600;
    color: var(--scriptura-gold-400);
    margin: 0 0 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .scriptura-hero-desc {
    font-size: 14.5px;
    color: #cbd5e1;
    margin: 0;
    max-width: 700px;
    line-height: 1.5;
  }

  /* Compact Quick Actions Bar */
  .scriptura-quick-actions-bar {
    background: #ffffff;
    border: 1px solid var(--scriptura-slate-200);
    border-radius: 10px;
    padding: 16px 20px;
    margin-bottom: 32px;
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
  }
  .scriptura-quick-actions-title {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--scriptura-slate-500);
    margin-bottom: 12px;
  }
  .scriptura-quick-actions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
  .scriptura-quick-btn {
    background: var(--scriptura-slate-100);
    color: var(--scriptura-navy-800) !important;
    border: 1px solid var(--scriptura-slate-200) !important;
    border-left: 1px solid var(--scriptura-slate-200) !important;
    font-size: 13px;
    font-weight: 600;
    padding: 8px 16px !important;
    border-radius: 6px !important;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer !important;
    pointer-events: auto !important;
    transition: all 0.15s ease;
    user-select: none;
    line-height: 1.4;
  }
  .scriptura-quick-btn:hover {
    background: var(--scriptura-blue-600) !important;
    color: #ffffff !important;
    border-color: var(--scriptura-blue-600) !important;
    border-left-color: var(--scriptura-blue-600) !important;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(48, 92, 222, 0.25);
  }
  .scriptura-quick-btn:focus-visible {
    outline: 2px solid var(--scriptura-blue-600) !important;
    outline-offset: 2px !important;
  }
  .scriptura-quick-btn.primary {
    background: linear-gradient(135deg, var(--scriptura-navy-800) 0%, var(--scriptura-navy-700) 100%) !important;
    color: #ffffff !important;
    border: 1px solid var(--scriptura-navy-800) !important;
    border-left: 1px solid var(--scriptura-navy-800) !important;
    box-shadow: 0 2px 4px rgba(22, 59, 108, 0.2);
  }
  .scriptura-quick-btn.primary:hover {
    background: linear-gradient(135deg, var(--scriptura-navy-900) 0%, var(--scriptura-blue-600) 100%) !important;
    color: #ffffff !important;
    border-color: var(--scriptura-blue-600) !important;
    border-left-color: var(--scriptura-blue-600) !important;
    box-shadow: 0 4px 8px rgba(48, 92, 222, 0.35);
  }
  .scriptura-quick-btn.gold {
    background: var(--scriptura-gold-50) !important;
    color: var(--scriptura-navy-950) !important;
    border: 1px solid rgba(200, 164, 106, 0.5) !important;
    border-left: 1px solid rgba(200, 164, 106, 0.5) !important;
  }
  .scriptura-quick-btn.gold:hover {
    background: var(--scriptura-gold-500) !important;
    border-color: var(--scriptura-gold-500) !important;
    border-left-color: var(--scriptura-gold-500) !important;
    color: var(--scriptura-navy-950) !important;
    box-shadow: 0 2px 6px rgba(200, 164, 106, 0.3);
  }

  /* Dashboard Section Headers */
  .scriptura-section-head {
    margin: 32px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--scriptura-slate-200);
  }
  .scriptura-section-title {
    font-family: 'Cinzel', 'Times New Roman', Times, 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--scriptura-navy-900);
    letter-spacing: 0.05em;
    margin: 0;
  }
  .scriptura-section-explainer {
    font-size: 13px;
    color: var(--scriptura-slate-500);
    margin: 4px 0 0;
  }

  /* Grid of Cards */
  .scriptura-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
  .scriptura-grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 16px;
  }

  /* Card styling */
  .scriptura-card {
    background: #ffffff;
    border: 1px solid var(--scriptura-slate-200);
    border-radius: 10px;
    padding: 18px;
    transition: all 0.18s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
  }
  .scriptura-card:hover {
    border-color: var(--scriptura-blue-600);
    box-shadow: 0 8px 18px rgba(14, 38, 70, 0.08);
    transform: translateY(-2px);
  }
  .scriptura-card-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }
  .scriptura-card-icon {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
    background: var(--scriptura-slate-100);
    color: var(--scriptura-navy-800);
  }
  .scriptura-card.featured .scriptura-card-icon {
    background: var(--scriptura-gold-50);
    color: var(--scriptura-gold-600);
    border: 1px solid rgba(200, 164, 106, 0.3);
  }
  .scriptura-card-name {
    font-weight: 600;
    font-size: 14.5px;
    color: var(--scriptura-navy-900);
    margin: 0 0 3px;
    line-height: 1.3;
  }
  .scriptura-card-desc {
    font-size: 12.5px;
    color: var(--scriptura-slate-500);
    margin: 0;
    line-height: 1.4;
  }
  .scriptura-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid var(--scriptura-slate-100);
  }
  .scriptura-card-link {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--scriptura-blue-600);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .scriptura-card-link:hover {
    color: var(--scriptura-navy-900);
    text-decoration: underline;
  }
  .scriptura-card-action-btn {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--scriptura-navy-800);
    background: var(--scriptura-slate-100);
    padding: 4px 10px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .scriptura-card-action-btn:hover {
    background: var(--scriptura-blue-600);
    color: #ffffff;
  }

  /* Editorial Guidelines Card */
  .scriptura-guide-card {
    background: #ffffff;
    border: 1px solid var(--scriptura-slate-200);
    border-left: 4px solid var(--scriptura-gold-500);
    border-radius: 8px;
    padding: 20px 24px;
    margin-top: 40px;
  }
  .scriptura-guide-title {
    font-family: 'Cinzel', 'Times New Roman', Times, 'Palatino Linotype', Palatino, Georgia, serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--scriptura-navy-950);
    margin: 0 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    letter-spacing: 0.04em;
  }
  .scriptura-guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }
  .scriptura-guide-item-title {
    font-size: 11.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--scriptura-navy-800);
    margin-bottom: 4px;
  }
  .scriptura-guide-item-text {
    font-size: 12.5px;
    color: var(--scriptura-slate-600);
    margin: 0;
    line-height: 1.45;
  }

  /* Responsive Mobile Topbar */
  .scriptura-mobile-bar {
    display: none;
  }

  /* Overlay Backdrop for Mobile Drawer */
  #scriptura-admin-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45) !important;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    z-index: 9990 !important;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  #scriptura-admin-overlay.active {
    display: block !important;
    pointer-events: auto !important;
  }

  /* Close button inside sidebar drawer */
  .scriptura-sidebar-close-btn {
    display: none;
    margin-left: auto;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 6px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;
    z-index: 10010 !important;
  }
  .scriptura-sidebar-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Tablet layout adjustments (769px - 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .scriptura-grid-4,
    .scriptura-grid-3 {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .scriptura-dashboard {
      padding: 20px 24px 50px !important;
    }
  }

  /* Mobile layout adjustments (<= 768px) */
  @media (max-width: 768px) {
    /* Make Tina's sidebar container an off-canvas drawer */
    div[class*="border-r"][class*="w-96"] {
      position: fixed !important;
      top: 0 !important;
      bottom: 0 !important;
      left: 0 !important;
      width: 300px !important;
      max-width: 85vw !important;
      z-index: 10000 !important;
      background: #ffffff !important;
      transform: translateX(-100%) !important;
      transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: none !important;
      border-right: 1px solid var(--scriptura-slate-200) !important;
      display: flex !important;
      flex-direction: column !important;
      filter: none !important;
      -webkit-filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      opacity: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      text-rendering: optimizeLegibility !important;
      backface-visibility: hidden !important;
      -webkit-backface-visibility: hidden !important;
    }
    div[class*="border-r"][class*="w-96"].scriptura-drawer-open {
      transform: translateX(0) !important;
      box-shadow: 8px 0 30px rgba(15, 23, 42, 0.25) !important;
      filter: none !important;
      -webkit-filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      opacity: 1 !important;
    }

    div[class*="border-r"][class*="w-96"] * {
      filter: none !important;
      -webkit-filter: none !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }

    div[class*="border-r"][class*="w-96"] div[class*="overflow-auto"] {
      -webkit-overflow-scrolling: touch !important;
    }

    .scriptura-sidebar-close-btn {
      display: inline-flex !important;
    }

    /* Show mobile topbar */
    .scriptura-mobile-bar {
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(135deg, var(--scriptura-navy-950) 0%, var(--scriptura-navy-800) 100%);
      padding: 10px 14px;
      color: #ffffff;
      border-bottom: 2px solid var(--scriptura-gold-500);
      position: sticky;
      top: 0;
      z-index: 9000;
      width: 100%;
      box-sizing: border-box;
    }
    .scriptura-mobile-bar-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .scriptura-mobile-hamburger {
      width: 44px;
      height: 44px;
      min-width: 44px;
      min-height: 44px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(200, 164, 106, 0.35);
      border-radius: 6px;
      color: #ffffff;
      font-size: 22px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .scriptura-mobile-hamburger:hover {
      background: rgba(255, 255, 255, 0.22);
    }
    .scriptura-mobile-bar-title {
      font-family: 'Cinzel', serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #ffffff;
      line-height: 1.2;
    }
    .scriptura-mobile-bar-badge {
      font-size: 10px;
      color: var(--scriptura-gold-400);
      text-transform: uppercase;
      font-weight: 600;
      display: block;
      letter-spacing: 0.04em;
    }

    /* Dashboard mobile spacing & cards */
    .scriptura-dashboard {
      padding: 14px 12px 40px !important;
      max-width: 100% !important;
      overflow-x: hidden !important;
      box-sizing: border-box !important;
    }
    .scriptura-hero {
      padding: 20px 16px !important;
      border-radius: 8px !important;
      margin-bottom: 18px !important;
    }
    .scriptura-hero-title {
      font-size: 20px !important;
      line-height: 1.25 !important;
    }
    .scriptura-hero-subtitle {
      font-size: 12.5px !important;
      margin-bottom: 8px !important;
    }
    .scriptura-hero-desc {
      font-size: 13px !important;
      line-height: 1.45 !important;
    }
    .scriptura-quick-actions-bar {
      padding: 14px 12px !important;
      margin-bottom: 20px !important;
    }
    .scriptura-quick-actions-list {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 8px !important;
    }
    .scriptura-quick-btn {
      display: flex !important;
      justify-content: center !important;
      text-align: center !important;
      padding: 10px 8px !important;
      font-size: 12px !important;
      width: 100% !important;
      box-sizing: border-box !important;
      min-height: 42px !important;
    }
    .scriptura-grid-4,
    .scriptura-grid-3 {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
    .scriptura-card {
      padding: 15px 14px !important;
    }
    .scriptura-card-name {
      font-size: 14px !important;
    }
    .scriptura-guide-card {
      padding: 16px 14px !important;
      margin-top: 24px !important;
    }
    .scriptura-guide-grid {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
  }

  /* Extra small mobile screens (<= 480px) */
  @media (max-width: 480px) {
    .scriptura-quick-actions-list {
      grid-template-columns: 1fr !important;
    }
    .scriptura-hero-title {
      font-size: 18px !important;
    }
    .scriptura-hero-badge {
      font-size: 11px !important;
    }
    .scriptura-card-footer {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 8px !important;
    }
    .scriptura-card-footer a {
      text-align: center !important;
      justify-content: center !important;
      padding: 7px 10px !important;
    }
  }
`;
function setupAdminEnhancements() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  if (!document.getElementById("scriptura-google-fonts")) {
    const fontLink = document.createElement("link");
    fontLink.id = "scriptura-google-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    document.head.appendChild(fontLink);
  }
  if (!document.getElementById("scriptura-admin-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "scriptura-admin-styles";
    styleEl.innerHTML = SCRIPTURA_ADMIN_CSS;
    document.head.appendChild(styleEl);
  }
  function openDrawer() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]');
    const overlay = document.getElementById("scriptura-admin-overlay");
    if (navContainer) navContainer.classList.add("scriptura-drawer-open");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]');
    const overlay = document.getElementById("scriptura-admin-overlay");
    if (navContainer) navContainer.classList.remove("scriptura-drawer-open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  function injectSidebarHeader() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]');
    if (navContainer && !document.getElementById("scriptura-sidebar-brand")) {
      const brandBanner = document.createElement("div");
      brandBanner.id = "scriptura-sidebar-brand";
      brandBanner.className = "scriptura-sidebar-header";
      brandBanner.innerHTML = `
        <div class="scriptura-sidebar-logo-row">
          <div class="scriptura-sidebar-icon">\u{1F4D6}</div>
          <div style="flex: 1;">
            <div class="scriptura-sidebar-title">SCRIPTURA</div>
          </div>
          <button type="button" class="scriptura-sidebar-close-btn" id="scriptura-close-drawer-btn" aria-label="Close sidebar">\u2715</button>
        </div>
        <span class="scriptura-sidebar-subtitle">Digital Library CMS</span>
        <div class="scriptura-sidebar-links-row">
          <a href="#/" class="scriptura-sidebar-home-btn">Dashboard</a>
          <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-sidebar-site-btn">Live Site \u2197</a>
        </div>
      `;
      navContainer.insertBefore(brandBanner, navContainer.firstChild);
      const closeBtn = brandBanner.querySelector("#scriptura-close-drawer-btn");
      if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    }
  }
  function injectMobileBarAndOverlay() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]');
    if (navContainer && navContainer.parentElement) {
      let overlay = document.getElementById("scriptura-admin-overlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "scriptura-admin-overlay";
        overlay.setAttribute("role", "presentation");
        overlay.setAttribute("aria-hidden", "true");
        overlay.addEventListener("click", closeDrawer);
        navContainer.parentElement.insertBefore(overlay, navContainer);
      } else if (overlay.parentElement !== navContainer.parentElement) {
        navContainer.parentElement.insertBefore(overlay, navContainer);
      }
    } else if (!document.getElementById("scriptura-admin-overlay")) {
      const overlay = document.createElement("div");
      overlay.id = "scriptura-admin-overlay";
      overlay.setAttribute("role", "presentation");
      overlay.setAttribute("aria-hidden", "true");
      overlay.addEventListener("click", closeDrawer);
      document.body.appendChild(overlay);
    }
    if (navContainer) {
      const mainWrapper = navContainer.parentElement;
      if (mainWrapper && !document.getElementById("scriptura-admin-mobile-bar")) {
        const mobileBar = document.createElement("div");
        mobileBar.id = "scriptura-admin-mobile-bar";
        mobileBar.className = "scriptura-mobile-bar";
        mobileBar.innerHTML = `
          <div class="scriptura-mobile-bar-left">
            <button type="button" id="scriptura-hamburger-btn" class="scriptura-mobile-hamburger" aria-label="Open navigation drawer">\u2630</button>
            <div>
              <div class="scriptura-mobile-bar-title">SCRIPTURA</div>
              <span class="scriptura-mobile-bar-badge">Digital Library CMS</span>
            </div>
          </div>
          <div class="scriptura-mobile-bar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-sidebar-site-btn">Live Site \u2197</a>
          </div>
        `;
        mainWrapper.parentElement?.insertBefore(mobileBar, mainWrapper);
        const hamburgerBtn = mobileBar.querySelector("#scriptura-hamburger-btn");
        if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
      }
    }
    const linksContainer = document.querySelector('div[class*="px-6"][class*="overflow-auto"]');
    if (linksContainer) {
      const links = linksContainer.querySelectorAll('a[href*="#/"]');
      links.forEach((link) => {
        if (!link.getAttribute("data-drawer-wired")) {
          link.setAttribute("data-drawer-wired", "true");
          link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
              closeDrawer();
            }
          });
        }
      });
    }
    const brandBanner = document.getElementById("scriptura-sidebar-brand");
    if (brandBanner) {
      const brandLinks = brandBanner.querySelectorAll('a[href*="#/"]');
      brandLinks.forEach((link) => {
        if (!link.getAttribute("data-drawer-wired")) {
          link.setAttribute("data-drawer-wired", "true");
          link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
              closeDrawer();
            }
          });
        }
      });
    }
  }
  function injectSidebarCategories() {
    const linksContainer = document.querySelector('div[class*="px-6"][class*="overflow-auto"]');
    if (!linksContainer) return;
    if (linksContainer.querySelector(".scriptura-nav-category")) return;
    const links = Array.from(linksContainer.querySelectorAll('a[href*="#/collections/"]'));
    if (links.length === 0) return;
    const categoryMappings = [
      { href: "#/collections/book/", label: "CONTENT LIBRARY" },
      { href: "#/collections/home/", label: "SITE PAGES" },
      { href: "#/collections/books/", label: "DIRECTORY SETTINGS" },
      { href: "#/collections/page/", label: "GENERAL" }
    ];
    categoryMappings.forEach(({ href, label }) => {
      const targetLink = links.find((l) => (l.getAttribute("href") || "").startsWith(href));
      if (targetLink && targetLink.parentElement) {
        const catDiv = document.createElement("div");
        catDiv.className = "scriptura-nav-category";
        catDiv.textContent = label;
        targetLink.parentElement.insertBefore(catDiv, targetLink);
      }
    });
  }
  function renderCustomDashboard() {
    const currentHash = window.location.hash || "#/";
    if (currentHash !== "#/" && currentHash !== "" && currentHash !== "#") {
      return;
    }
    const headers = document.querySelectorAll("h3");
    let welcomeHeader = null;
    for (let i = 0; i < headers.length; i++) {
      const h = headers[i];
      if (h.textContent && h.textContent.includes("Welcome to Tina")) {
        welcomeHeader = h;
        break;
      }
    }
    if (welcomeHeader) {
      const headerParent = welcomeHeader.closest('div[class*="border-b"]') || welcomeHeader.parentElement;
      const pageContainer = headerParent ? headerParent.parentElement : null;
      if (headerParent && pageContainer && !document.getElementById("scriptura-custom-dashboard")) {
        headerParent.style.display = "none";
        const defaultBody = headerParent.nextElementSibling;
        if (defaultBody) defaultBody.style.display = "none";
        const dashboardEl = document.createElement("div");
        dashboardEl.id = "scriptura-custom-dashboard";
        dashboardEl.className = "scriptura-dashboard";
        dashboardEl.innerHTML = `
          <!-- 6. WELCOME SECTION -->
          <div class="scriptura-hero">
            <div class="scriptura-hero-badge">
              <span class="scriptura-hero-badge-dot"></span>
              CMS Connected
            </div>
            <h1 class="scriptura-hero-title">SCRIPTURA Digital Library</h1>
            <div class="scriptura-hero-subtitle">Editorial Control Center</div>
            <p class="scriptura-hero-desc">
              Manage theological publications, study materials, digital resources and site content from one place.
            </p>
          </div>

          <!-- 7. QUICK ACTIONS -->
          <div class="scriptura-quick-actions-bar">
            <div class="scriptura-quick-actions-title">Quick Actions</div>
            <div class="scriptura-quick-actions-list">
              <a href="#/collections/new/book" class="scriptura-quick-btn gold" title="Create a new Book document" aria-label="Create a new Book">+ New Book</a>
              <a href="#/collections/new/lesson" class="scriptura-quick-btn gold" title="Create a new Bible Lesson document" aria-label="Create a new Bible Lesson">+ New Lesson</a>
              <a href="#/collections/new/magazine" class="scriptura-quick-btn gold" title="Create a new Magazine document" aria-label="Create a new Magazine">+ New Magazine</a>
              <a href="#/collections/new/dailyLetter" class="scriptura-quick-btn gold" title="Create a new Daily Letter document" aria-label="Create a new Daily Letter">+ New Daily Letter</a>
              <a href="#/collections/edit/home/index" class="scriptura-quick-btn primary" title="Open Home page editor" aria-label="Open Home page editor">\u270F Edit Home Page</a>
              <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-quick-btn" title="Open live public website" aria-label="Open live public website">\u2197 Open Live Site</a>
            </div>
          </div>

          <!-- 8. CORE SITE PAGES -->
          <div class="scriptura-section-head">
            <h2 class="scriptura-section-title">SITE PAGES</h2>
          </div>
          <div class="scriptura-grid-4">
            <!-- Home -->
            <div class="scriptura-card featured">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F3E0}</div>
                <div>
                  <div class="scriptura-card-name">Home</div>
                  <p class="scriptura-card-desc">Manage homepage announcements, featured content and highlights.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/home/index" class="scriptura-card-link" title="Open Home page editor">Edit Page &rarr;</a>
                <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <!-- About Us -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u2139\uFE0F</div>
                <div>
                  <div class="scriptura-card-name">About Us</div>
                  <p class="scriptura-card-desc">Manage mission statement, historical narrative and leadership.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/about/index" class="scriptura-card-link" title="Open About Us page editor">Edit Page &rarr;</a>
                <a href="/about" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <!-- Contact -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4DE}</div>
                <div>
                  <div class="scriptura-card-name">Contact</div>
                  <p class="scriptura-card-desc">Manage contact information, office hours and inquiry channels.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/contact/index" class="scriptura-card-link" title="Open Contact page editor">Edit Page &rarr;</a>
                <a href="/contact" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <!-- Seminars & Zoom -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4BB}</div>
                <div>
                  <div class="scriptura-card-name">Seminars & Zoom</div>
                  <p class="scriptura-card-desc">Manage seminar schedules, topics and webinar access details.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/zoomInfo/index" class="scriptura-card-link" title="Open Seminars & Zoom editor">Edit Page &rarr;</a>
                <a href="/zoom-info" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>
          </div>

          <!-- 9. CONTENT LIBRARY -->
          <div class="scriptura-section-head">
            <h2 class="scriptura-section-title">CONTENT LIBRARY</h2>
          </div>
          <div class="scriptura-grid-3">
            <!-- Books -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4DA}</div>
                <div>
                  <div class="scriptura-card-name">Books</div>
                  <p class="scriptura-card-desc">Theological books and academic publications.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/book/~" class="scriptura-card-link">View Books &rarr;</a>
                <a href="#/collections/new/book" class="scriptura-card-action-btn">+ Add Book</a>
              </div>
            </div>

            <!-- Bible Lessons -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4D6}</div>
                <div>
                  <div class="scriptura-card-name">Bible Lessons</div>
                  <p class="scriptura-card-desc">Expository studies and teaching materials.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/lesson/~" class="scriptura-card-link">View Lessons &rarr;</a>
                <a href="#/collections/new/lesson" class="scriptura-card-action-btn">+ Add Lesson</a>
              </div>
            </div>

            <!-- Magazines -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4F0}</div>
                <div>
                  <div class="scriptura-card-name">Magazines</div>
                  <p class="scriptura-card-desc">Quarterly academic periodicals and published journals.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/magazine/~" class="scriptura-card-link">View Magazines &rarr;</a>
                <a href="#/collections/new/magazine" class="scriptura-card-action-btn">+ Add Magazine</a>
              </div>
            </div>

            <!-- Daily Newsletter -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u2709\uFE0F</div>
                <div>
                  <div class="scriptura-card-name">Daily Newsletter</div>
                  <p class="scriptura-card-desc">Pastoral reflections and daily devotional letters.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/dailyLetter/~" class="scriptura-card-link">View Newsletter &rarr;</a>
                <a href="#/collections/new/dailyLetter" class="scriptura-card-action-btn">+ Add Letter</a>
              </div>
            </div>

            <!-- Scripture References -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F4DC}</div>
                <div>
                  <div class="scriptura-card-name">Scripture References</div>
                  <p class="scriptura-card-desc">Cross-references, verses and study notes.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/bibleReference/~" class="scriptura-card-link">View References &rarr;</a>
                <a href="#/collections/new/bibleReference" class="scriptura-card-action-btn">+ Add Reference</a>
              </div>
            </div>

            <!-- Video Lectures -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F3A5}</div>
                <div>
                  <div class="scriptura-card-name">Video Lectures</div>
                  <p class="scriptura-card-desc">Recorded theological and academic lectures.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/video/~" class="scriptura-card-link">View Videos &rarr;</a>
                <a href="#/collections/new/video" class="scriptura-card-action-btn">+ Add Video</a>
              </div>
            </div>

            <!-- Sacred Images -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F5BC}\uFE0F</div>
                <div>
                  <div class="scriptura-card-name">Sacred Images</div>
                  <p class="scriptura-card-desc">Historical photographs, manuscripts and sacred art.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/bibleImage/~" class="scriptura-card-link">View Images &rarr;</a>
                <a href="#/collections/new/bibleImage" class="scriptura-card-action-btn">+ Add Image</a>
              </div>
            </div>

            <!-- Digital Library -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F3DB}\uFE0F</div>
                <div>
                  <div class="scriptura-card-name">Digital Library</div>
                  <p class="scriptura-card-desc">Theological treatises, commentaries and references.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/libraryResource/~" class="scriptura-card-link">View Library &rarr;</a>
                <a href="#/collections/new/libraryResource" class="scriptura-card-action-btn">+ Add Volume</a>
              </div>
            </div>

            <!-- Historical Archives -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F5C4}\uFE0F</div>
                <div>
                  <div class="scriptura-card-name">Historical Archives</div>
                  <p class="scriptura-card-desc">Archival records, historical papers and documentation.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/archiveDocument/~" class="scriptura-card-link">View Archives &rarr;</a>
                <a href="#/collections/new/archiveDocument" class="scriptura-card-action-btn">+ Add Document</a>
              </div>
            </div>

            <!-- Web Resources -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F310}</div>
                <div>
                  <div class="scriptura-card-name">Web Resources</div>
                  <p class="scriptura-card-desc">External scholarly databases, tools and research portals.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/usefulResource/~" class="scriptura-card-link">View Resources &rarr;</a>
                <a href="#/collections/new/usefulResource" class="scriptura-card-action-btn">+ Add Resource</a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">\u{1F517}</div>
                <div>
                  <div class="scriptura-card-name">Quick Links</div>
                  <p class="scriptura-card-desc">Curated shortcuts and high-priority resource links.</p>
                </div>
              </div>
              <div class="scriptura-card-footer">
                <a href="#/collections/quickLink/~" class="scriptura-card-link">View Links &rarr;</a>
                <a href="#/collections/new/quickLink" class="scriptura-card-action-btn">+ Add Link</a>
              </div>
            </div>
          </div>

          <!-- 10. DIRECTORY SETTINGS -->
          <div class="scriptura-section-head">
            <h2 class="scriptura-section-title">DIRECTORY SETTINGS</h2>
            <p class="scriptura-section-explainer">
              These settings control the headings, descriptions and presentation of the public directory pages.
            </p>
          </div>
          <div class="scriptura-grid-4">
            <div class="scriptura-card">
              <div class="scriptura-card-name">Books Directory</div>
              <p class="scriptura-card-desc">Header, description and search settings on /books.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/books/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/books" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Lessons Directory</div>
              <p class="scriptura-card-desc">Headline and introductory copy on /lessons.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/lessons/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/lessons" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Magazines Directory</div>
              <p class="scriptura-card-desc">Periodical archive banner on /magazines.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/magazines/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/magazines" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Newsletter Directory</div>
              <p class="scriptura-card-desc">Subscription notes and lead copy on /newsletter.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/newsletter/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/newsletter" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">References Directory</div>
              <p class="scriptura-card-desc">Scripture search overview and banner on /references.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/references/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/references" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Videos Directory</div>
              <p class="scriptura-card-desc">Lecture catalog header and copy on /videos.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/videos/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/videos" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Images Directory</div>
              <p class="scriptura-card-desc">Exhibition gallery banner and copy on /images.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/images/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/images" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Library Directory</div>
              <p class="scriptura-card-desc">Repository catalog header and copy on /library.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/library/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/library" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Archives Directory</div>
              <p class="scriptura-card-desc">Historical archive introduction on /archives.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/archives/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/archives" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Resources Directory</div>
              <p class="scriptura-card-desc">Web directory header and copy on /resources.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/resources/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/resources" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>

            <div class="scriptura-card">
              <div class="scriptura-card-name">Quick Links Directory</div>
              <p class="scriptura-card-desc">Navigation matrix banner and copy on /quick-links.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/edit/quickLinks/index" class="scriptura-card-link">Edit Settings &rarr;</a>
                <a href="/quick-links" target="_blank" rel="noopener noreferrer" class="scriptura-card-action-btn">View Live</a>
              </div>
            </div>
          </div>

          <!-- SECTION: GENERAL -->
          <div class="scriptura-section-head">
            <h2 class="scriptura-section-title">GENERAL</h2>
          </div>
          <div class="scriptura-grid-4">
            <div class="scriptura-card">
              <div class="scriptura-card-name">Standard Pages</div>
              <p class="scriptura-card-desc">General site pages and secondary institutional content.</p>
              <div class="scriptura-card-footer">
                <a href="#/collections/page/~" class="scriptura-card-link">View Pages &rarr;</a>
                <a href="#/collections/new/page" class="scriptura-card-action-btn">+ Add Page</a>
              </div>
            </div>
          </div>

          <!-- 11. EDITORIAL GUIDANCE -->
          <div class="scriptura-guide-card">
            <div class="scriptura-guide-title">
              \u{1F4DC} Editorial Guidelines
            </div>
            <div class="scriptura-guide-grid">
              <div>
                <div class="scriptura-guide-item-title">Content Quality</div>
                <p class="scriptura-guide-item-text">Keep titles clear and descriptive.</p>
              </div>
              <div>
                <div class="scriptura-guide-item-title">Theological Accuracy</div>
                <p class="scriptura-guide-item-text">Verify scripture references, authorship and publication details before publishing.</p>
              </div>
              <div>
                <div class="scriptura-guide-item-title">Media</div>
                <p class="scriptura-guide-item-text">Use appropriately sized images and meaningful alt text.</p>
              </div>
              <div>
                <div class="scriptura-guide-item-title">Links</div>
                <p class="scriptura-guide-item-text">Verify external URLs before publishing.</p>
              </div>
            </div>
          </div>
        `;
        pageContainer.appendChild(dashboardEl);
      }
    }
  }
  function attachYouTubeDurationSafeguard() {
    const urlInputs = document.querySelectorAll('input[name="videoUrl"], input[name$=".videoUrl"]');
    urlInputs.forEach((urlInput) => {
      if (urlInput.dataset.ytDurationBound) return;
      urlInput.dataset.ytDurationBound = "true";
      const fetchAndSetDuration = async () => {
        const val = urlInput.value?.trim();
        if (!val) return;
        const isYt = val.includes("youtube.com") || val.includes("youtu.be");
        if (!isYt) return;
        const form = urlInput.closest("form") || document;
        const durationInput = form.querySelector('input[name="duration"], input[name$=".duration"]');
        if (!durationInput) return;
        try {
          const res = await fetch(`/api/youtube/duration?url=${encodeURIComponent(val)}`);
          const data = await res.json();
          if (data && data.success && data.duration) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(durationInput, data.duration);
            } else {
              durationInput.value = data.duration;
            }
            durationInput.dispatchEvent(new Event("input", { bubbles: true }));
            durationInput.dispatchEvent(new Event("change", { bubbles: true }));
            durationInput.dispatchEvent(new Event("blur", { bubbles: true }));
          }
        } catch {
        }
      };
      urlInput.addEventListener("blur", fetchAndSetDuration);
    });
  }
  function checkUI() {
    injectMobileBarAndOverlay();
    injectSidebarHeader();
    injectSidebarCategories();
    renderCustomDashboard();
    attachYouTubeDurationSafeguard();
  }
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });
  window.addEventListener("hashchange", function() {
    if (window.location.hash !== "#/" && window.location.hash !== "" && window.location.hash !== "#") {
      const cd = document.getElementById("scriptura-custom-dashboard");
      if (cd) cd.remove();
    }
    setTimeout(checkUI, 50);
    setTimeout(checkUI, 200);
    setTimeout(checkUI, 500);
  });
  const observer = new MutationObserver(function() {
    checkUI();
  });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      observer.observe(document.body, { childList: true, subtree: true });
      checkUI();
    });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
    checkUI();
  }
  setInterval(checkUI, 1e3);
}
var scripturaCmsCallback = (cms) => {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    setupAdminEnhancements();
  }
  return cms;
};

// tina/components/YouTubeUrlField.tsx
import React, { useState, useRef } from "react";
import { wrapFieldsWithMeta } from "tinacms";
var YouTubeUrlField = wrapFieldsWithMeta((props) => {
  const { input, field, form } = props;
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [statusType, setStatusType] = useState("info");
  const lastFetchedUrlRef = useRef("");
  const fetchDuration = async (urlToFetch, force = false) => {
    const trimmed = (urlToFetch || "").trim();
    if (!trimmed) {
      setStatusMessage(null);
      return;
    }
    if (!force && trimmed === lastFetchedUrlRef.current) {
      return;
    }
    const isYt = trimmed.includes("youtube.com") || trimmed.includes("youtu.be") || trimmed.includes("youtube-nocookie.com");
    if (!isYt) {
      setStatusMessage("Please enter a valid YouTube URL (e.g. https://www.youtube.com/watch?v=...)");
      setStatusType("warning");
      return;
    }
    setLoading(true);
    setStatusMessage("Querying YouTube for duration...");
    setStatusType("info");
    try {
      const res = await fetch(`/api/youtube/duration?url=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      lastFetchedUrlRef.current = trimmed;
      if (data.success && data.duration) {
        setStatusMessage(`Auto-detected duration: ${data.duration}`);
        setStatusType("success");
        if (form && typeof form.change === "function") {
          form.change("duration", data.duration);
        }
      } else if (data.error) {
        setStatusMessage(data.error);
        setStatusType(data.canManualEdit ? "warning" : "error");
      } else {
        setStatusMessage("Unable to auto-detect duration. You may enter it manually.");
        setStatusType("warning");
      }
    } catch (err) {
      setStatusMessage("Network error checking duration. Manual entry is enabled.");
      setStatusType("warning");
    } finally {
      setLoading(false);
    }
  };
  const handleBlur = (e) => {
    input.onBlur(e);
    if (input.value && input.value !== lastFetchedUrlRef.current) {
      fetchDuration(input.value);
    }
  };
  const handleManualDetect = (e) => {
    e.preventDefault();
    fetchDuration(input.value, true);
  };
  return React.createElement("div", { style: { width: "100%" } }, React.createElement(
    "input",
    {
      type: "text",
      id: input.name,
      name: input.name,
      value: input.value || "",
      onChange: input.onChange,
      onBlur: handleBlur,
      placeholder: "https://www.youtube.com/watch?v=...",
      style: {
        width: "100%",
        padding: "10px 12px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #cbd5e1",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        transition: "border-color 0.15s ease, box-shadow 0.15s ease"
      }
    }
  ), React.createElement(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "6px",
        fontSize: "12px",
        lineHeight: "1.4"
      }
    },
    React.createElement("div", { style: { flex: 1, marginRight: "8px" } }, loading && React.createElement("span", { style: { color: "#305cde", fontWeight: 500 } }, "\u23F3 Querying YouTube for duration..."), !loading && statusMessage && React.createElement(
      "span",
      {
        style: {
          color: statusType === "success" ? "#15803d" : statusType === "warning" ? "#b45309" : statusType === "error" ? "#b91c1c" : "#475569",
          fontWeight: statusType === "success" ? 600 : 400
        }
      },
      statusType === "success" ? "\u2713 " : "\u2139 ",
      statusMessage
    ), !loading && !statusMessage && React.createElement("span", { style: { color: "#64748b" } }, "Duration will be retrieved automatically from YouTube when entered.")),
    React.createElement(
      "button",
      {
        type: "button",
        onClick: handleManualDetect,
        disabled: loading || !input.value,
        style: {
          padding: "4px 10px",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          borderRadius: "4px",
          border: "1px solid #cbd5e1",
          backgroundColor: loading || !input.value ? "#f1f5f9" : "#eff4ff",
          color: loading || !input.value ? "#94a3b8" : "#1d4b8a",
          cursor: loading || !input.value ? "not-allowed" : "pointer",
          flexShrink: 0,
          transition: "all 0.15s ease"
        },
        title: "Detect duration from YouTube"
      },
      loading ? "Detecting..." : "Detect Duration"
    )
  ));
});
var YouTubeUrlField_default = YouTubeUrlField;

// tina/config.ts
var validatePdfField = (val) => {
  if (!val) return void 0;
  const clean = String(val).split("?")[0].split("#")[0].toLowerCase().trim();
  if (!clean.endsWith(".pdf")) {
    return "Please select or upload a valid PDF document (.pdf extension required).";
  }
  return void 0;
};
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || process.env.GITHUB_CLIENT_ID || "";
var token = process.env.TINA_TOKEN || process.env.GITHUB_TOKEN || "";
var config_default = defineConfig({
  branch,
  clientId,
  token,
  cmsCallback: scripturaCmsCallback,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "book",
        label: "Books",
        path: "content/books",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "abstract",
            label: "Scholarly Abstract",
            description: "Scholarly abstract or comprehensive summary for this monograph",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "format",
            label: "Format / Badge",
            options: ["Monograph", "Manual"],
            required: true
          },
          {
            type: "string",
            name: "subject",
            label: "Subject",
            options: ["Hermeneutics", "Biblical Archaeology", "Covenant Theology"],
            required: true
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true
          },
          {
            type: "string",
            name: "featured",
            label: "Featured",
            options: ["yes", "no"]
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Book Monograph PDF",
            description: "Upload or select a PDF monograph file for digital download",
            ui: {
              validate: validatePdfField
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Book Overview / Abstract",
            isBody: true
          }
        ]
      },
      {
        name: "lesson",
        label: "Bible Lessons",
        path: "content/lessons",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "book",
            label: "Book of the Bible",
            required: true
          },
          {
            type: "string",
            name: "chapters",
            label: "Chapters",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "content",
            label: "Lesson Content",
            isBody: true
          },
          {
            type: "string",
            name: "teacher",
            label: "Teacher / Author",
            required: true
          },
          {
            type: "string",
            name: "division",
            label: "Biblical Division",
            options: ["Pentateuch", "Historical Books", "Gospels & Acts", "Epistles"],
            required: true
          },
          {
            type: "string",
            name: "difficulty",
            label: "Difficulty Level",
            options: ["beginner", "intermediate", "advanced"],
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Lesson Cover Image",
            description: "Optional cover image for this expository lesson"
          }
        ]
      },
      {
        name: "magazine",
        label: "Magazines",
        path: "content/magazines",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "issue",
            label: "Issue",
            required: true
          },
          {
            type: "string",
            name: "season",
            label: "Season / Issue",
            options: ["Spring", "Summer", "Fall", "Winter"]
          },
          {
            type: "string",
            name: "year",
            label: "Year",
            options: ["2024", "2023", "2022", "2021"]
          },
          {
            type: "string",
            name: "topic",
            label: "Topic",
            options: ["Biblical Studies", "Systematic Theology", "Church History", "Ethics"]
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image"
          },
          {
            type: "string",
            name: "publishDate",
            label: "Publish Date"
          },
          {
            type: "number",
            name: "articlesCount",
            label: "Articles Count"
          },
          {
            type: "number",
            name: "contributorsCount",
            label: "Contributors Count"
          },
          {
            type: "number",
            name: "pagesCount",
            label: "Pages Count"
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / Tag"
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Magazine Issue PDF",
            description: "Upload or select a PDF magazine issue file for digital download",
            ui: {
              validate: validatePdfField
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Issue Content / Overview",
            isBody: true
          }
        ]
      },
      {
        name: "dailyLetter",
        label: "Daily Newsletter",
        path: "content/newsletter",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Contributing Scholar / Author",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Summary",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Devotional Reflection",
            isBody: true
          }
        ]
      },
      {
        name: "bibleReference",
        label: "Scripture References",
        path: "content/references",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "image",
            label: "Reference Image"
          },
          {
            type: "string",
            name: "author",
            label: "Author / Scholar",
            required: true
          },
          {
            type: "string",
            name: "testament",
            label: "Testament",
            options: ["Old Testament", "New Testament"],
            required: true
          },
          {
            type: "string",
            name: "genre",
            label: "Biblical Genre",
            options: ["Prophecy", "Law", "Poetry & Wisdom", "Gospels", "Epistles"],
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Commentary Body",
            isBody: true
          }
        ]
      },
      {
        name: "video",
        label: "Video Lectures",
        path: "content/videos",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "series",
            label: "Series Tag",
            options: ["Hermeneutics Series", "Archaeology Series", "Covenant Series"],
            required: true
          },
          {
            type: "string",
            name: "speaker",
            label: "Speaker",
            options: ["Dr. Charles Vance", "Prof. Julian Mercer", "Dr. Thomas Keller"],
            required: true
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true
          },
          {
            type: "string",
            name: "duration",
            label: "Video Duration",
            required: true
          },
          {
            type: "string",
            name: "recordedDate",
            label: "Recorded Date"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Video Thumbnail"
          },
          {
            type: "string",
            name: "videoUrl",
            label: "YouTube Video URL",
            description: "Paste a YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)",
            ui: {
              component: YouTubeUrlField_default
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Lecture Notes & Outline",
            isBody: true
          }
        ]
      },
      {
        name: "bibleImage",
        label: "Sacred Images",
        path: "content/images",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category / Classification",
            options: ["Archaeology", "Manuscript", "Manuscripts", "Scribal Study", "Diagrams"],
            required: true
          },
          {
            type: "string",
            name: "scripture",
            label: "Scripture Reference",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "image",
            label: "High-Resolution Image",
            required: true
          },
          {
            type: "string",
            name: "date",
            label: "Historical Date / Era"
          },
          {
            type: "string",
            name: "citation",
            label: "Archival Citation & Attribution"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Commentary Body",
            isBody: true
          }
        ]
      },
      {
        name: "libraryResource",
        label: "Digital Library",
        path: "content/library",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Commentaries",
              "Lexicons",
              "Historical Documents",
              "Theological Treatises",
              "Research Papers"
            ],
            required: true
          },
          {
            type: "string",
            name: "era",
            label: "Historical Era",
            options: [
              "Patristic Era",
              "Reformation",
              "Modern Scholarship",
              "Contemporary"
            ],
            required: true
          },
          {
            type: "string",
            name: "badge",
            label: "Badge / Classification",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "author",
            label: "Author / Scholar"
          },
          {
            type: "string",
            name: "primaryDetail",
            label: "Primary Metadata"
          },
          {
            type: "string",
            name: "detailIcon",
            label: "Detail Icon",
            options: ["calendar", "languages", "user", "scroll", "graduation-cap"]
          },
          {
            type: "string",
            name: "tags",
            label: "Metadata Tags",
            list: true
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Research Document PDF",
            description: "Upload or select a research paper or treatise PDF file for digital consultation",
            ui: {
              validate: validatePdfField
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Resource Overview / Content Outline",
            isBody: true
          }
        ]
      },
      {
        name: "archiveDocument",
        label: "Historical Archives",
        path: "content/archives",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Historical Commentary",
              "Seminar Transcript",
              "Manuscript Documentation"
            ],
            required: true
          },
          {
            type: "string",
            name: "catalogRef",
            label: "Catalog Reference",
            required: true
          },
          {
            type: "string",
            name: "dateLabel",
            label: "Date / Published Label",
            required: true
          },
          {
            type: "string",
            name: "attributionRole",
            label: "Attribution Role"
          },
          {
            type: "string",
            name: "attributionName",
            label: "Attribution Name"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "actionLabel",
            label: "Action Button Label"
          },
          {
            type: "string",
            name: "actionType",
            label: "Action Type",
            options: ["download", "link"]
          },
          {
            type: "image",
            name: "pdfFile",
            label: "Archival Document / Transcript PDF",
            description: "Upload or select an archival facsimile or transcript PDF file",
            ui: {
              validate: validatePdfField
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Document Content / Overview",
            isBody: true
          }
        ]
      },
      {
        name: "usefulResource",
        label: "Web Resources",
        path: "content/resources",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Bible Software",
              "Commentaries",
              "Lexicons & Dictionaries",
              "Academic Journals",
              "Church History",
              "Original Languages"
            ],
            required: true
          },
          {
            type: "string",
            name: "pricingType",
            label: "Pricing Type",
            options: [
              "Free",
              "Paid",
              "Open Access"
            ],
            required: true
          },
          {
            type: "string",
            name: "rating",
            label: "Rating",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail Image"
          },
          {
            type: "string",
            name: "externalUrl",
            label: "External Website URL"
          },
          {
            type: "string",
            name: "actionLabel",
            label: "Action Button Label"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Overview / Notes",
            isBody: true
          }
        ]
      },
      {
        name: "quickLink",
        label: "Quick Links",
        path: "content/quick-links",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle / Metric",
            required: true
          },
          {
            type: "string",
            name: "targetUrl",
            label: "Target URL",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icon",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Quick Guide / Overview",
            isBody: true
          }
        ]
      },
      {
        name: "home",
        label: "Home",
        path: "content/home",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badgeText",
                label: "Hero Badge Text",
                description: "Pill badge at top of hero (e.g. PREMIUM DIGITAL BIBLE LIBRARY & SCHOLARLY ARCHIVE)"
              },
              {
                type: "string",
                name: "headingLine1",
                label: "Heading Line 1 (Bold Blue)",
                description: "First line in bold blue sans-serif typography (e.g. Unveiling the Depth of)"
              },
              {
                type: "string",
                name: "headingLine2",
                label: "Heading Line 2 (Gold Script)",
                description: "Second line in elegant gold handwritten script typography (e.g. Holy Scripture)"
              },
              {
                type: "string",
                name: "headline",
                label: "Combined Headline (Fallback)",
                description: "Legacy combined title fallback"
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline / Description",
                required: true,
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "ctaText",
                label: "Primary CTA Button Text",
                required: true
              },
              {
                type: "string",
                name: "ctaLink",
                label: "Primary CTA Button Destination Link",
                required: true
              },
              {
                type: "string",
                name: "secondaryCtaText",
                label: "Secondary CTA Button Text",
                required: true
              },
              {
                type: "string",
                name: "secondaryCtaLink",
                label: "Secondary CTA Button Destination Link",
                required: true
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Featured Image"
              }
            ]
          },
          {
            type: "object",
            name: "scriptureOfTheDay",
            label: "Scripture of the Day",
            fields: [
              {
                type: "string",
                name: "verse",
                label: "Verse Text",
                required: true
              },
              {
                type: "string",
                name: "reference",
                label: "Scripture Reference",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredLessons",
            label: "Featured Lessons Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title",
                required: true
              },
              {
                type: "object",
                name: "lesson1",
                label: "Lesson 1",
                fields: [
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                    required: true
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                    required: true
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true
                  },
                  {
                    type: "string",
                    name: "readTime",
                    label: "Read Time",
                    required: true
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Lesson Image"
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Lesson Route / URL (optional)",
                    description: "Target route for this lesson (e.g. /lessons/genesis-1-11-the-theology-of-creation)"
                  }
                ]
              },
              {
                type: "object",
                name: "lesson2",
                label: "Lesson 2",
                fields: [
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true
                  },
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference",
                    required: true
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                    required: true
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    required: true
                  },
                  {
                    type: "string",
                    name: "readTime",
                    label: "Read Time",
                    required: true
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Lesson Image"
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Lesson Route / URL (optional)",
                    description: "Target route for this lesson (e.g. /lessons/grace-justification-and-new-life)"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "newsletter",
            label: "Newsletter Signup Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Newsletter Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Newsletter Description",
                required: true
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "zoomMeeting",
            label: "Upcoming Zoom Meeting",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Meeting Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Meeting Description",
                required: true
              },
              {
                type: "string",
                name: "date",
                label: "Meeting Date",
                required: true
              },
              {
                type: "string",
                name: "time",
                label: "Meeting Time",
                required: true
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Button Link",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "latestReferences",
            label: "Latest Bible References Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title"
              },
              {
                type: "object",
                name: "items",
                label: "Reference Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "reference",
                    label: "Scripture Reference"
                  },
                  {
                    type: "string",
                    name: "category",
                    label: "Category"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "tags",
                    label: "Tags",
                    list: true
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Link"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "featuredVideos",
            label: "Featured Bible Videos Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title"
              },
              {
                type: "object",
                name: "items",
                label: "Video Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "series",
                    label: "Series Tag"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "duration",
                    label: "Duration"
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Cover Image"
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Link"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "galleryPreview",
            label: "Bible Image Gallery Preview Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title"
              },
              {
                type: "object",
                name: "items",
                label: "Gallery Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Image Title"
                  },
                  {
                    type: "string",
                    name: "category",
                    label: "Category / Tag"
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "featuredPublications",
            label: "Featured Books & Magazines Section",
            fields: [
              {
                type: "string",
                name: "sectionTitle",
                label: "Section Title"
              },
              {
                type: "object",
                name: "book",
                label: "Featured Book",
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "coverImage",
                    label: "Cover Image"
                  },
                  {
                    type: "string",
                    name: "downloadLink",
                    label: "Download Link"
                  }
                ]
              },
              {
                type: "object",
                name: "magazine",
                label: "Featured Magazine",
                fields: [
                  {
                    type: "string",
                    name: "badge",
                    label: "Badge"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "issue",
                    label: "Issue / Number"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "image",
                    name: "coverImage",
                    label: "Cover Image"
                  },
                  {
                    type: "string",
                    name: "readLink",
                    label: "Read Link"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "announcementsWidget",
            label: "Platform Announcements Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title"
              },
              {
                type: "object",
                name: "items",
                label: "Announcements",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "date",
                    label: "Date"
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "usefulToolsWidget",
            label: "Useful Tools Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title"
              },
              {
                type: "object",
                name: "tools",
                label: "Tools",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Tool Name"
                  },
                  {
                    type: "string",
                    name: "link",
                    label: "Tool Link"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "quickStudyLinksWidget",
            label: "Quick Study Links Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Widget Title"
              },
              {
                type: "object",
                name: "links",
                label: "Study Links",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Link Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Target Route / URL",
                    required: true
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    options: [
                      "BookOpen",
                      "Bookmark",
                      "Clipboard",
                      "Folder",
                      "FileText",
                      "Video",
                      "Image",
                      "Globe"
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "quarterlyNewsletter",
            label: "Pre-Footer Quarterly Newsletter Strip",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description"
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text"
              }
            ]
          }
        ]
      },
      {
        name: "about",
        label: "About Us",
        path: "content/about",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "introTitle",
            label: "Introduction Title",
            required: true
          },
          {
            type: "string",
            name: "introParagraph1",
            label: "Introduction Paragraph 1",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "introParagraph2",
            label: "Introduction Paragraph 2",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "object",
            name: "mission",
            label: "Mission Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Mission Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Mission Description",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "vision",
            label: "Vision Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Vision Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Vision Description",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "statementOfFaith",
            label: "Statement of Faith",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "point1Title",
                label: "Point 1 Title",
                required: true
              },
              {
                type: "string",
                name: "point1Text",
                label: "Point 1 Text",
                required: true
              },
              {
                type: "string",
                name: "point2Title",
                label: "Point 2 Title",
                required: true
              },
              {
                type: "string",
                name: "point2Text",
                label: "Point 2 Text",
                required: true
              },
              {
                type: "string",
                name: "point3Title",
                label: "Point 3 Title",
                required: true
              },
              {
                type: "string",
                name: "point3Text",
                label: "Point 3 Text",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "quoteWidget",
            label: "Quote Widget",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote Text",
                required: true
              },
              {
                type: "string",
                name: "author",
                label: "Quote Author",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "leadershipTitle",
            label: "Leadership Section Title"
          },
          {
            type: "object",
            name: "leadership",
            label: "Academic Leadership",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name}${item.role ? " \u2014 " + item.role : ""}` : "Leadership Member"
              })
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Scholar Name",
                required: true
              },
              {
                type: "string",
                name: "role",
                label: "Role / Position",
                required: true
              },
              {
                type: "image",
                name: "avatar",
                label: "Avatar / Portrait Image",
                required: true
              },
              {
                type: "string",
                name: "bio",
                label: "Biography",
                required: true,
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          {
            type: "object",
            name: "academicOffice",
            label: "Academic Office Contact Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "address",
                label: "Address"
              },
              {
                type: "string",
                name: "email",
                label: "Email"
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text"
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Button Link"
              }
            ]
          }
        ]
      },
      {
        name: "contact",
        label: "Contact",
        path: "content/contact",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "emailCard",
            label: "Email Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "email",
                label: "Email Address",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "phoneCard",
            label: "Phone Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "locationCard",
            label: "Location Contact Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "address",
                label: "Address",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "contactForm",
            label: "Contact Form Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Form Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Form Description",
                required: true
              },
              {
                type: "string",
                name: "submitButtonText",
                label: "Submit Button Text",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "officeHours",
            label: "Office Hours Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "weekdayHours",
                label: "Weekday Hours",
                required: true
              },
              {
                type: "string",
                name: "saturdayHours",
                label: "Saturday Hours",
                required: true
              },
              {
                type: "string",
                name: "sundayHours",
                label: "Sunday Hours",
                required: true
              },
              {
                type: "string",
                name: "note",
                label: "Note",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "mapLocation",
            label: "Map Location Section",
            fields: [
              {
                type: "image",
                name: "imageUrl",
                label: "Map Image URL"
              },
              {
                type: "string",
                name: "addressText",
                label: "Map Address Overlay Text"
              }
            ]
          },
          {
            type: "object",
            name: "additionalInfo",
            label: "Additional Information Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title"
              },
              {
                type: "string",
                name: "items",
                label: "Information Points",
                list: true
              }
            ]
          }
        ]
      },
      {
        name: "zoomInfo",
        label: "Seminars & Zoom",
        path: "content/zoom-info",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredMeeting",
            label: "Featured Meeting Card",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true
              },
              {
                type: "string",
                name: "time",
                label: "Time",
                required: true
              },
              {
                type: "string",
                name: "duration",
                label: "Duration",
                required: true
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true
              },
              {
                type: "string",
                name: "zoomUrl",
                label: "Real Zoom Meeting Link",
                description: "Paste the actual Zoom meeting URL."
              }
            ]
          },
          {
            type: "object",
            name: "speakerCard",
            label: "Speaker Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "string",
                name: "role",
                label: "Role",
                required: true
              },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                required: true
              },
              {
                type: "image",
                name: "avatarUrl",
                label: "Speaker Avatar Image",
                description: "Upload or select an avatar image for the featured speaker"
              }
            ]
          },
          {
            type: "object",
            name: "meetingAccessCard",
            label: "Meeting Access Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "platform",
                label: "Platform",
                required: true
              },
              {
                type: "string",
                name: "meetingId",
                label: "Meeting ID",
                required: true
              },
              {
                type: "string",
                name: "passcode",
                label: "Passcode",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "preparationCard",
            label: "Preparation Card",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
                required: true
              },
              {
                type: "string",
                name: "reading1",
                label: "Reading 1",
                required: true
              },
              {
                type: "string",
                name: "reading2",
                label: "Reading 2",
                required: true
              },
              {
                type: "string",
                name: "reading3",
                label: "Reading 3",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "sessionsTitle",
            label: "Sessions Section Title",
            required: true
          },
          {
            type: "object",
            name: "sessions",
            label: "Upcoming & Past Sessions",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.title ? `${item.title}${item.date ? " \u2014 " + item.date : ""}` : "Seminar Session"
              })
            },
            fields: [
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Session Title",
                required: true
              },
              {
                type: "string",
                name: "status",
                label: "Status (e.g. Upcoming, Recording Available)",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true,
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "string",
                name: "speaker",
                label: "Speaker / Faculty",
                required: true
              },
              {
                type: "string",
                name: "timeOrActionText",
                label: "Time or Action Text (e.g. '7:00 PM EST' or 'Watch Recording \u2192')"
              },
              {
                type: "string",
                name: "actionUrl",
                label: "Action URL (e.g. /videos for recordings)"
              },
              {
                type: "boolean",
                name: "isDashed",
                label: "Use dashed border style"
              }
            ]
          },
          {
            type: "object",
            name: "relatedScripture",
            label: "Related Scripture Widget",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "scripture1Title",
                label: "Scripture 1 Title",
                required: true
              },
              {
                type: "string",
                name: "scripture1Subtitle",
                label: "Scripture 1 Subtitle",
                required: true
              },
              {
                type: "string",
                name: "scripture2Title",
                label: "Scripture 2 Title",
                required: true
              },
              {
                type: "string",
                name: "scripture2Subtitle",
                label: "Scripture 2 Subtitle",
                required: true
              },
              {
                type: "string",
                name: "scripture3Title",
                label: "Scripture 3 Title",
                required: true
              },
              {
                type: "string",
                name: "scripture3Subtitle",
                label: "Scripture 3 Subtitle",
                required: true
              }
            ]
          }
        ]
      },
      {
        name: "books",
        label: "Books Directory",
        path: "content/books",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredBook",
            label: "Featured Book Spotlight",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image"
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true
              },
              {
                type: "string",
                name: "abstractButtonText",
                label: "Abstract Button Text",
                required: true
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Featured Book PDF",
                description: "Upload or select a PDF file for this featured spotlight monograph",
                ui: {
                  validate: validatePdfField
                }
              }
            ]
          },
          {
            type: "string",
            name: "submissionsTitle",
            label: "Submissions Widget Title",
            required: true
          },
          {
            type: "string",
            name: "submissionsDescription",
            label: "Submissions Widget Description",
            required: true
          },
          {
            type: "string",
            name: "submissionsButtonText",
            label: "Submissions Button Text",
            required: true
          }
        ]
      },
      {
        name: "lessons",
        label: "Lessons Directory",
        path: "content/lessons",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredLesson",
            label: "Featured Lesson Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "teacher",
                label: "Teacher",
                required: true
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true
              },
              {
                type: "image",
                name: "image",
                label: "Featured Spotlight Cover Image (Optional)",
                description: "Upload or choose an image for this featured lesson spotlight."
              }
            ]
          },
          {
            type: "string",
            name: "progressTitle",
            label: "Progress Widget Title",
            required: true
          },
          {
            type: "string",
            name: "progressCourse",
            label: "Progress Course Name",
            required: true
          },
          {
            type: "string",
            name: "progressPercentage",
            label: "Progress Percentage",
            required: true
          },
          {
            type: "string",
            name: "progressDescription",
            label: "Progress Description",
            required: true
          },
          {
            type: "string",
            name: "progressButtonText",
            label: "Progress Button Text",
            required: true
          },
          {
            type: "string",
            name: "seminarTitle",
            label: "Seminar Widget Title",
            required: true
          }
        ]
      },
      {
        name: "magazines",
        label: "Magazines Directory",
        path: "content/magazines",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredIssue",
            label: "Featured Issue Hero",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                required: true
              },
              {
                type: "image",
                name: "coverImage",
                label: "Cover Image"
              },
              {
                type: "string",
                name: "readButtonText",
                label: "Read Button Text",
                required: true
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Magazine Issue PDF",
                description: "Upload or select a PDF for digital magazine download",
                ui: {
                  validate: validatePdfField
                }
              }
            ]
          },
          {
            type: "string",
            name: "spotlightTitle",
            label: "Spotlight Section Title",
            required: true
          },
          {
            type: "string",
            name: "archiveTitle",
            label: "Archive Section Title",
            required: true
          }
        ]
      },
      {
        name: "newsletter",
        label: "Newsletter Directory",
        path: "content/newsletter",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredDevotional",
            label: "Featured Devotional",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "scripture",
                label: "Scripture Quote",
                required: true
              },
              {
                type: "string",
                name: "content",
                label: "Content",
                required: true
              },
              {
                type: "string",
                name: "date",
                label: "Date",
                required: true
              },
              {
                type: "image",
                name: "coverImage",
                label: "Devotional Background Cover Image (Optional)",
                description: "Upload or select a subtle background cover image for the featured devotional card"
              }
            ]
          },
          {
            type: "object",
            name: "signupCTA",
            label: "Signup CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true
              },
              {
                type: "string",
                name: "privacyNote",
                label: "Privacy Note",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "scriptureQuote",
            label: "Scripture Quote Banner",
            fields: [
              {
                type: "string",
                name: "quote",
                label: "Quote",
                required: true
              },
              {
                type: "string",
                name: "reference",
                label: "Reference",
                required: true
              }
            ]
          }
        ]
      },
      {
        name: "references",
        label: "References Directory",
        path: "content/references",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredReference",
            label: "Featured Reference Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "crossReferences",
                label: "Cross References",
                required: true
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "topicsTitle",
            label: "Topics Widget Title",
            required: true
          },
          {
            type: "string",
            name: "relatedLessonTitle",
            label: "Related Lesson Widget Title",
            required: true
          },
          {
            type: "string",
            name: "relatedLessonCourse",
            label: "Related Lesson Course Name",
            required: true
          },
          {
            type: "string",
            name: "relatedLessonDescription",
            label: "Related Lesson Description",
            required: true
          },
          {
            type: "string",
            name: "relatedLessonButtonText",
            label: "Related Lesson Button Text",
            required: true
          },
          {
            type: "image",
            name: "relatedLessonImage",
            label: "Related Lesson Course Thumbnail (Optional)",
            description: "Upload or select an image for the Related Lesson Course widget in the sidebar"
          }
        ]
      },
      {
        name: "videos",
        label: "Videos Directory",
        path: "content/videos",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredVideo",
            label: "Featured Video Hero",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "speaker",
                label: "Speaker",
                required: true
              },
              {
                type: "string",
                name: "scripture",
                label: "Scripture",
                required: true
              },
              {
                type: "string",
                name: "recorded",
                label: "Recorded Date",
                required: true
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
                required: true
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Featured YouTube Video URL (Optional)",
                description: "Paste a YouTube link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)"
              },
              {
                type: "image",
                name: "coverImage",
                label: "Featured Cover Image / Thumbnail (Optional)",
                description: "Upload or choose a custom cover image to display in the hero section."
              }
            ]
          },
          {
            type: "string",
            name: "lecturesTitle",
            label: "Lectures Section Title",
            required: true
          }
        ]
      },
      {
        name: "images",
        label: "Images Directory",
        path: "content/images",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredImage",
            label: "Featured Image Spotlight",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "scriptureLabel",
                label: "Scripture Label",
                required: true
              },
              {
                type: "string",
                name: "scriptureQuote",
                label: "Scripture Quote",
                required: true
              },
              {
                type: "string",
                name: "scriptureReference",
                label: "Scripture Reference",
                required: true
              },
              {
                type: "string",
                name: "downloadButtonText",
                label: "Download Button Text",
                required: true
              },
              {
                type: "string",
                name: "citationButtonText",
                label: "Citation Button Text",
                required: true
              },
              {
                type: "image",
                name: "image",
                label: "Featured Image"
              }
            ]
          },
          {
            type: "string",
            name: "archiveTitle",
            label: "Archive Section Title",
            required: true
          }
        ]
      },
      {
        name: "library",
        label: "Library Directory",
        path: "content/library",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "object",
            name: "featuredResource",
            label: "Featured Resource Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                required: true
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "categoriesTitle",
            label: "Categories Widget Title",
            required: true
          },
          {
            type: "string",
            name: "popularTitle",
            label: "Popular Resources Widget Title",
            required: true
          },
          {
            type: "string",
            name: "recentTitle",
            label: "Recent Additions Widget Title",
            required: true
          }
        ]
      },
      {
        name: "archives",
        label: "Archives Directory",
        path: "content/archives",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "catalogInfo",
            label: "Catalog Info Text",
            required: true
          },
          {
            type: "object",
            name: "featuredArchive",
            label: "Featured Archive Block",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "catalogRef",
                label: "Catalog Reference",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "category",
                label: "Category",
                required: true
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true
              },
              {
                type: "image",
                name: "pdfFile",
                label: "Featured Document PDF",
                description: "Upload or select a PDF file for this featured archival document (optional)",
                ui: {
                  validate: validatePdfField
                }
              }
            ]
          },
          {
            type: "string",
            name: "classificationsTitle",
            label: "Classifications Widget Title",
            required: true
          },
          {
            type: "object",
            name: "accessPolicy",
            label: "Access Policy Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              }
            ]
          }
        ]
      },
      {
        name: "resources",
        label: "Resources Directory",
        path: "content/resources",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredResource",
            label: "Featured Resource Banner",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "rating",
                label: "Rating",
                required: true
              },
              {
                type: "string",
                name: "linkText",
                label: "Link Text",
                required: true
              },
              {
                type: "string",
                name: "linkUrl",
                label: "Link URL",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "string",
            name: "popularResourcesTitle",
            label: "Popular Resources Title",
            required: true
          },
          {
            type: "string",
            name: "recentAdditionsTitle",
            label: "Recent Additions Title",
            required: true
          },
          {
            type: "string",
            name: "categoryTagsTitle",
            label: "Category Tags Title",
            required: true
          }
        ]
      },
      {
        name: "quickLinks",
        label: "Quick Links Directory",
        path: "content/quick-links",
        format: "md",
        match: {
          include: "index"
        },
        fields: [
          {
            type: "string",
            name: "announcementText",
            label: "Announcement Bar Text",
            required: true
          },
          {
            type: "string",
            name: "announcementSubtext",
            label: "Announcement Subtext"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline",
                required: true
              }
            ]
          },
          {
            type: "object",
            name: "featuredBanner",
            label: "Featured Access Banner",
            fields: [
              {
                type: "string",
                name: "badge",
                label: "Badge Text",
                required: true
              },
              {
                type: "string",
                name: "tag",
                label: "Tag",
                required: true
              },
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                required: true
              },
              {
                type: "string",
                name: "button1Text",
                label: "Button 1 Text",
                required: true
              },
              {
                type: "string",
                name: "button1Link",
                label: "Button 1 Link",
                required: true
              },
              {
                type: "string",
                name: "button2Text",
                label: "Button 2 Text",
                required: true
              },
              {
                type: "string",
                name: "button2Link",
                label: "Button 2 Link",
                required: true
              },
              {
                type: "string",
                name: "button3Text",
                label: "Button 3 Text",
                required: true
              },
              {
                type: "string",
                name: "button3Link",
                label: "Button 3 Link",
                required: true
              }
            ]
          },
          {
            type: "string",
            name: "categorySectionTitle",
            label: "Category Section Title",
            required: true
          },
          {
            type: "string",
            name: "searchSectionTitle",
            label: "Search Section Title",
            required: true
          },
          {
            type: "string",
            name: "searchPlaceholder",
            label: "Search Placeholder",
            required: true
          },
          {
            type: "string",
            name: "shortcutsSectionTitle",
            label: "Shortcuts Section Title",
            required: true
          }
        ]
      },
      {
        name: "page",
        label: "Standard Pages",
        path: "content/pages",
        format: "mdx",
        match: {
          include: "*",
          exclude: "index"
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "headline",
                label: "Headline",
                required: true
              },
              {
                type: "string",
                name: "subheadline",
                label: "Subheadline"
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text"
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Button Link"
              },
              {
                type: "image",
                name: "heroImage",
                label: "Hero Image"
              }
            ]
          }
        ]
      },
      {
        name: "global",
        label: "Website Navigation & Branding",
        path: "content/global",
        format: "json",
        match: {
          include: "index"
        },
        ui: {
          global: true
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Website Brand Name",
            description: "Displayed in header and footer (e.g. SCRIPTURA)",
            required: true
          },
          {
            type: "string",
            name: "siteTagline",
            label: "Brand Subtitle / Tagline",
            description: "Displayed under brand name (e.g. Digital Library)"
          },
          {
            type: "string",
            name: "logoIcon",
            label: "Brand Logo Icon / Emoji",
            description: "Logo icon or emoji displayed in header badge (e.g. \u{1F4DA})"
          },
          {
            type: "string",
            name: "footerDescription",
            label: "Footer Brand Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "copyrightText",
            label: "Copyright Notice Text",
            description: "Text after copyright year (e.g. All rights reserved.)"
          },
          {
            type: "object",
            name: "topNavLinks",
            label: "Top Navigation Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Navigation Link"
              })
            },
            fields: [
              { type: "string", name: "id", label: "Identifier (e.g. home, about, contact)", required: true },
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true }
            ]
          },
          {
            type: "object",
            name: "navSections",
            label: "Navigation Dropdown Menus",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `Dropdown: ${item.label}` : "Dropdown Menu"
              })
            },
            fields: [
              { type: "string", name: "id", label: "Menu ID (e.g. bible, hub, connect)", required: true },
              { type: "string", name: "label", label: "Menu Label (e.g. Bible, Knowledge Hub)", required: true },
              {
                type: "object",
                name: "items",
                label: "Dropdown Sub-Links",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label ? `${item.label} (${item.href})` : "Sub-Link"
                  })
                },
                fields: [
                  { type: "string", name: "id", label: "Link ID", required: true },
                  { type: "string", name: "label", label: "Link Label", required: true },
                  { type: "string", name: "href", label: "Destination URL", required: true }
                ]
              }
            ]
          },
          {
            type: "string",
            name: "footerQuickLinksTitle",
            label: "Footer Quick Links Column Title"
          },
          {
            type: "object",
            name: "footerQuickLinks",
            label: "Footer Quick Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link"
              })
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true }
            ]
          },
          {
            type: "string",
            name: "footerResourcesTitle",
            label: "Footer Resources Column Title"
          },
          {
            type: "object",
            name: "footerResources",
            label: "Footer Resources Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link"
              })
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true }
            ]
          },
          {
            type: "string",
            name: "footerConnectTitle",
            label: "Footer Connect Column Title"
          },
          {
            type: "object",
            name: "footerConnect",
            label: "Footer Connect Links",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label} (${item.href})` : "Footer Link"
              })
            },
            fields: [
              { type: "string", name: "label", label: "Link Label", required: true },
              { type: "string", name: "href", label: "Destination URL", required: true }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
