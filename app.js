/* AIMEET launch preview v1.0.0-preview.3
   All interactions run locally. Scenario tabs are illustrative, not AI calls.
   No analytics, credentials, form submission, or external dependencies. */
(() => {
  'use strict';
  const copy = window.AIMEET_COPY;
  if (!copy || !copy.zh || !copy.en) return;
  const root = document.documentElement;
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const languageButtons = [...document.querySelectorAll('[data-language-toggle]')];
  const tabs = [...document.querySelectorAll('[data-scenario]')];
  const panels = [...document.querySelectorAll('.scenario-panel')];
  const tabList = document.querySelector('[role="tablist"]');
  const announcement = document.getElementById('announcement');
  const media = window.matchMedia('(max-width: 760px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const contact = 'winston@aimeet-ai.com';
  const languageKey = 'aimeet-language';
  let language = 'zh';
  let selectedScenario = 0;
  let replayTimer;
  let announcementTimer;

  function announce(message) {
    clearTimeout(announcementTimer);
    announcement.textContent = '';
    announcementTimer = setTimeout(() => { announcement.textContent = message; }, 35);
  }
  function setMenu(open, restoreFocus = false) {
    const isOpen = open && media.matches;
    mobileMenu.hidden = !isOpen;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', copy[language][isOpen ? 'a11y.menuClose' : 'a11y.menuOpen']);
    if (restoreFocus) menuToggle.focus();
  }
  function preferredLanguage(fallback = 'zh') {
    // Only two whitelisted language values ever affect the DOM.
    let urlLanguage;
    try { urlLanguage = new URL(window.location.href).searchParams.get('lang'); } catch (_) { /* file URL fallback */ }
    if (urlLanguage === 'en') return 'en';
    if (urlLanguage === 'zh' || urlLanguage === 'zh-TW' || urlLanguage === 'zh-Hant') return 'zh';
    try {
      const stored = localStorage.getItem(languageKey);
      return stored === 'zh' || stored === 'en' ? stored : fallback;
    } catch (_) { return fallback; }
  }
  function setLanguage(next, updateURL = true) {
    if (next !== 'zh' && next !== 'en') return;
    language = next;
    clearTimeout(replayTimer);
    panels.forEach(panel => panel.classList.remove('is-replaying'));
    clearTimeout(announcementTimer);
    announcement.textContent = '';
    const words = copy[language];
    root.lang = language === 'zh' ? 'zh-Hant' : 'en';
    root.dataset.language = language;
    document.title = words['meta.title'];
    document.querySelector('meta[name="description"]').content = words['meta.description'];
    // OG/Twitter tags deliberately keep the generated Traditional Chinese default.
    // UI language and document title/description change, but sharing does not rely
    // on a crawler executing JavaScript. No separate English share URL is claimed.
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = words[el.dataset.i18n];
      if (typeof value === 'string') el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      // Markup comes only from our local, versioned copy dictionary.
      const value = words[el.dataset.i18nHtml];
      if (typeof value === 'string') el.innerHTML = value;
    });
    document.querySelectorAll('[data-label-key]').forEach(el => {
      const value = words[el.dataset.labelKey];
      if (typeof value === 'string') el.setAttribute('aria-label', value);
    });
    languageButtons.forEach(button => {
      const footer = button.classList.contains('footer-language');
      button.textContent = language === 'zh' ? (footer ? 'English' : 'EN') : '繁中';
      button.lang = language === 'zh' ? 'en' : 'zh-Hant';
      button.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切換至繁體中文');
    });
    const href = `mailto:${contact}?subject=${encodeURIComponent(words['email.subject'])}&body=${encodeURIComponent(words['email.body'])}`;
    document.querySelectorAll('[data-contact]').forEach(link => { link.href = href; });
    document.getElementById('contact-feedback').textContent = '';
    setMenu(false);
    try { localStorage.setItem(languageKey, language); } catch (_) { /* works when storage is disabled */ }
    if (updateURL && /^https?:$/.test(window.location.protocol)) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.replaceState(null, '', url);
      } catch (_) { /* embedded/local preview may restrict History */ }
    }
  }
  function selectScenario(index, focus = false, notify = true) {
    if (!Number.isInteger(index) || index < 0 || index >= tabs.length) return;
    clearTimeout(replayTimer);
    selectedScenario = index;
    tabs.forEach((tab, i) => {
      const selected = index === i;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('selected', selected);
      panels[i].hidden = !selected;
      panels[i].classList.remove('is-replaying');
    });
    if (focus) tabs[index].focus();
    if (notify) announce(copy[language]['a11y.switched'] + copy[language][`tab${index}.title`]);
  }
  menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) { setMenu(false, true); }
  });
  document.addEventListener('click', event => {
    if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false);
  });
  // This is a disclosure navigation, not a modal. Do not trap keyboard focus.
  document.addEventListener('focusin', event => {
    if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && event.target !== menuToggle) setMenu(false);
  });
  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh')));
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      setMenu(false);
      const hash = link.getAttribute('href');
      const target = hash && document.getElementById(hash.slice(1));
      if (target) requestAnimationFrame(() => target.focus({ preventScroll: true }));
    });
  });
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectScenario(i));
    tab.addEventListener('keydown', event => {
      const previous = media.matches ? 'ArrowLeft' : 'ArrowUp';
      const next = media.matches ? 'ArrowRight' : 'ArrowDown';
      let index = selectedScenario;
      if (event.key === previous) index = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === next) index = (index + 1) % tabs.length;
      else if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else return;
      event.preventDefault();
      selectScenario(index, true);
    });
  });
  document.getElementById('replay').addEventListener('click', () => {
    clearTimeout(replayTimer);
    const panel = panels[selectedScenario];
    panel.classList.remove('is-replaying');
    if (!reducedMotion.matches) {
      void panel.offsetWidth;
      panel.classList.add('is-replaying');
      replayTimer = setTimeout(() => panel.classList.remove('is-replaying'), 950);
    }
    announce(copy[language]['a11y.replayed']);
  });
  document.getElementById('copy-email').addEventListener('click', async () => {
    const feedback = document.getElementById('contact-feedback');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(contact);
      feedback.textContent = copy[language]['contact.copied'];
    } catch (_) {
      // Never claim success if browser/permissions block writing to the clipboard.
      feedback.textContent = copy[language]['contact.copyFailed'];
    }
  });
  function onResize() {
    tabList.setAttribute('aria-orientation', media.matches ? 'horizontal' : 'vertical');
    if (!media.matches) setMenu(false);
  }
  media.addEventListener('change', onResize);
  window.addEventListener('popstate', () => {
    // Hash navigation also emits popstate. Keep the in-memory language when an
    // offline/embedded preview has neither a lang query nor storage access.
    const next = preferredLanguage(language);
    if (next !== language) setLanguage(next, false);
  });
  setLanguage(preferredLanguage(), false);
  selectScenario(0, false, false);
  onResize();
})();
