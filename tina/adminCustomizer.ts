/**
 * SCRIPTURA Digital Library — TinaCMS Admin Experience Enhancements
 * 
 * Provides dignified theological branding, refined color palette,
 * clear collection categorization in the sidebar, and an Executive
 * Editorial Control Center for the dashboard (#/) view.
 */

export const SCRIPTURA_ADMIN_CSS = `
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

export function setupAdminEnhancements() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // 1. Inject Fonts (with offline fallback handled in CSS)
  if (!document.getElementById("scriptura-google-fonts")) {
    const fontLink = document.createElement("link");
    fontLink.id = "scriptura-google-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
    document.head.appendChild(fontLink);
  }

  // 2. Inject Stylesheet
  if (!document.getElementById("scriptura-admin-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "scriptura-admin-styles";
    styleEl.innerHTML = SCRIPTURA_ADMIN_CSS;
    document.head.appendChild(styleEl);
  }

  function openDrawer() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]') as HTMLElement | null;
    const overlay = document.getElementById("scriptura-admin-overlay");
    if (navContainer) navContainer.classList.add("scriptura-drawer-open");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]') as HTMLElement | null;
    const overlay = document.getElementById("scriptura-admin-overlay");
    if (navContainer) navContainer.classList.remove("scriptura-drawer-open");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // 3. Injections for Sidebar & Dashboard
  function injectSidebarHeader() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]');
    if (navContainer && !document.getElementById("scriptura-sidebar-brand")) {
      const brandBanner = document.createElement("div");
      brandBanner.id = "scriptura-sidebar-brand";
      brandBanner.className = "scriptura-sidebar-header";
      brandBanner.innerHTML = `
        <div class="scriptura-sidebar-logo-row">
          <div class="scriptura-sidebar-icon">📖</div>
          <div style="flex: 1;">
            <div class="scriptura-sidebar-title">SCRIPTURA</div>
          </div>
          <button type="button" class="scriptura-sidebar-close-btn" id="scriptura-close-drawer-btn" aria-label="Close sidebar">✕</button>
        </div>
        <span class="scriptura-sidebar-subtitle">Digital Library CMS</span>
        <div class="scriptura-sidebar-links-row">
          <a href="#/" class="scriptura-sidebar-home-btn">Dashboard</a>
          <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-sidebar-site-btn">Live Site ↗</a>
        </div>
      `;
      navContainer.insertBefore(brandBanner, navContainer.firstChild);

      const closeBtn = brandBanner.querySelector("#scriptura-close-drawer-btn");
      if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    }
  }

  function injectMobileBarAndOverlay() {
    const navContainer = document.querySelector('div[class*="border-r"][class*="w-96"]') as HTMLElement | null;
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
            <button type="button" id="scriptura-hamburger-btn" class="scriptura-mobile-hamburger" aria-label="Open navigation drawer">☰</button>
            <div>
              <div class="scriptura-mobile-bar-title">SCRIPTURA</div>
              <span class="scriptura-mobile-bar-badge">Digital Library CMS</span>
            </div>
          </div>
          <div class="scriptura-mobile-bar-right">
            <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-sidebar-site-btn">Live Site ↗</a>
          </div>
        `;
        mainWrapper.parentElement?.insertBefore(mobileBar, mainWrapper);

        const hamburgerBtn = mobileBar.querySelector("#scriptura-hamburger-btn");
        if (hamburgerBtn) hamburgerBtn.addEventListener("click", openDrawer);
      }
    }

    // Auto-close on link click in mobile view
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

    // Auto-close on sidebar brand links in mobile view
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
      { href: "#/collections/page/", label: "GENERAL" },
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
    let welcomeHeader: HTMLHeadingElement | null = null;
    for (let i = 0; i < headers.length; i++) {
      const h = headers[i];
      if (h.textContent && h.textContent.includes("Welcome to Tina")) {
        welcomeHeader = h as HTMLHeadingElement;
        break;
      }
    }

    if (welcomeHeader) {
      const headerParent = (welcomeHeader.closest('div[class*="border-b"]') || welcomeHeader.parentElement) as HTMLElement | null;
      const pageContainer = headerParent ? headerParent.parentElement : null;

      if (headerParent && pageContainer && !document.getElementById("scriptura-custom-dashboard")) {
        headerParent.style.display = "none";
        const defaultBody = headerParent.nextElementSibling as HTMLElement | null;
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
              <a href="#/collections/edit/home/index" class="scriptura-quick-btn primary" title="Open Home page editor" aria-label="Open Home page editor">✏ Edit Home Page</a>
              <a href="/" target="_blank" rel="noopener noreferrer" class="scriptura-quick-btn" title="Open live public website" aria-label="Open live public website">↗ Open Live Site</a>
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
                <div class="scriptura-card-icon">🏠</div>
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
                <div class="scriptura-card-icon">ℹ️</div>
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
                <div class="scriptura-card-icon">📞</div>
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
                <div class="scriptura-card-icon">💻</div>
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
                <div class="scriptura-card-icon">📚</div>
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
                <div class="scriptura-card-icon">📖</div>
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
                <div class="scriptura-card-icon">📰</div>
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
                <div class="scriptura-card-icon">✉️</div>
                <div>
                  
                  <p class="scriptura-card-desc">Pastoral reflections and daily devotional letters.</p>
                </div>
              </div> 
            </div>

            <!-- Scripture References -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">📜</div>
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
                <div class="scriptura-card-icon">🎥</div>
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
                <div class="scriptura-card-icon">🖼️</div>
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
                <div class="scriptura-card-icon">🏛️</div>
                <div>
                  
                  <p class="scriptura-card-desc">Theological treatises, commentaries and references.</p>
                </div>
              </div> 
            </div>

            <!-- Historical Archives -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">🗄️</div>
                <div>
                  
                  <p class="scriptura-card-desc">Archival records, historical papers and documentation.</p>
                </div>
              </div> 
            </div>

            <!-- Web Resources -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">🌐</div>
                <div>
                  
                  <p class="scriptura-card-desc">External scholarly databases, tools and research portals.</p>
                </div>
              </div> 
            </div>

            <!-- Quick Links -->
            <div class="scriptura-card">
              <div class="scriptura-card-top">
                <div class="scriptura-card-icon">🔗</div>
                <div>
                  
                  <p class="scriptura-card-desc">Curated shortcuts and high-priority resource links.</p>
                </div>
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
              
              <p class="scriptura-card-desc">Subscription notes and lead copy on /newsletter.</p> 
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
              
              <p class="scriptura-card-desc">Repository catalog header and copy on /library.</p> 
            </div>

            <div class="scriptura-card">
              
              <p class="scriptura-card-desc">Historical archive introduction on /archives.</p> 
            </div>

            <div class="scriptura-card">
              
              <p class="scriptura-card-desc">Web directory header and copy on /resources.</p> 
            </div>

            <div class="scriptura-card">
              
              <p class="scriptura-card-desc">Navigation matrix banner and copy on /quick-links.</p> 
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
              📜 Editorial Guidelines
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
    const urlInputs = document.querySelectorAll<HTMLInputElement>('input[name="videoUrl"], input[name$=".videoUrl"]');
    urlInputs.forEach((urlInput) => {
      if (urlInput.dataset.ytDurationBound) return;
      urlInput.dataset.ytDurationBound = "true";

      const fetchAndSetDuration = async () => {
        const val = urlInput.value?.trim();
        if (!val) return;
        const isYt = val.includes("youtube.com") || val.includes("youtu.be");
        if (!isYt) return;

        const form = urlInput.closest("form") || document;
        const durationInput = form.querySelector<HTMLInputElement>('input[name="duration"], input[name$=".duration"]');
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
          // Dual safeguard non-blocking
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

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });

  window.addEventListener("hashchange", function () {
    if (window.location.hash !== "#/" && window.location.hash !== "" && window.location.hash !== "#") {
      const cd = document.getElementById("scriptura-custom-dashboard");
      if (cd) cd.remove();
    }
    setTimeout(checkUI, 50);
    setTimeout(checkUI, 200);
    setTimeout(checkUI, 500);
  });

  const observer = new MutationObserver(function () {
    checkUI();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      observer.observe(document.body, { childList: true, subtree: true });
      checkUI();
    });
  } else {
    observer.observe(document.body, { childList: true, subtree: true });
    checkUI();
  }

  setInterval(checkUI, 1000);
}

let activeCms: any = null;

export function nextFreeScriptureDay(): number {
  try {
    const forms: any[] = activeCms?.state?.forms ?? [];
    const form = forms.find(({ tinaForm }) => tinaForm?.values?.scriptureOfTheDay)?.tinaForm;
    const entries: any[] = form?.values?.scriptureOfTheDay?.dailyVerses ?? [];
    const used = new Set(entries.map((entry) => Number(entry?.day)).filter(Boolean));
    for (let day = 1; day <= 31; day++) if (!used.has(day)) return day;
  } catch {
    // Fall through to default
  }
  return 1;
}

export const scripturaCmsCallback = (cms: any) => {
  activeCms = cms;
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    setupAdminEnhancements();
  }
  return cms;
};
