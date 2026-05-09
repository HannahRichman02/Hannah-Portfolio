/* ============================================================
   HANNAH RICHMAN — main.js
   You don't need to edit this file. All editable content lives
   in content.js.
   ============================================================ */

(function () {
  "use strict";

  const C = window.SITE_CONTENT;
  if (!C) {
    console.error("content.js failed to load before main.js");
    return;
  }

  /* ---------- Inject color variables onto :root ---------- */
  const root = document.documentElement;
  Object.entries(C.colors || {}).forEach(([key, value]) => {
    root.style.setProperty("--" + key, value);
  });
  document.title = (C.site && C.site.name) ? C.site.name + " — Portfolio" : "Portfolio";

  /* ---------- Inject favicon from content.js ---------- */
  if (C.site && C.site.favicon) {
    const head = document.head || document.getElementsByTagName("head")[0];
    document.querySelectorAll("link[rel~='icon']").forEach(n => n.parentNode.removeChild(n));
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = C.site.favicon;
    head.appendChild(link);
    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = C.site.favicon;
    head.appendChild(apple);
  }

  /* ---------- Detect which page we're on ---------- */
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const currentPage = path.replace(".html", "") || "index";

  /* ---------- Render the header ---------- */
  function renderHeader() {
    const slot = document.querySelector("[data-mount='header']");
    if (!slot) return;
    const navLinks = (C.nav || []).map(item => {
      const linkPage = item.href.replace(".html", "").toLowerCase();
      const isActive = (linkPage === currentPage) || (currentPage === "index" && linkPage === "index") || (currentPage === "project" && linkPage === "design");
      return `<a class="nav__link" href="${item.href}" data-active="${isActive}">${escape(item.label)}</a>`;
    }).join("");

    const logoMark = (C.site && C.site.logo)
      ? `<img class="mark mark--img" src="${escape(C.site.logo)}" alt="" aria-hidden="true">`
      : `<span class="mark" aria-hidden="true"></span>`;

    slot.outerHTML = `
      <header class="header" role="banner">
        <div class="header__bar">
          <a class="header__brand" href="index.html" aria-label="${escape(C.site.name)} home">
            ${logoMark}
            <span>${escape(C.site.name)}</span>
          </a>
          <div class="header__meta mono" aria-hidden="true">
            <span>${escape(C.site.role || "")}</span>
            <span>${escape(C.site.issue || "")}</span>
            <span>${escape(C.site.year || "")}</span>
            <span>${escape(C.site.location || "")}</span>
          </div>
          <nav class="header__nav" aria-label="Main">${navLinks}</nav>
        </div>
      </header>
    `;
  }

  /* ---------- Render the ticker ---------- */
  function renderTicker(left, right) {
    const slot = document.querySelector("[data-mount='ticker']");
    if (!slot) return;
    const items = []
      .concat(left || [])
      .concat([C.site.year, C.site.location])
      .concat(right || []);
    const repeated = items.concat(items);
    const inner = repeated.map(item =>
      `<span>${escape(item)}</span><span class="dot" aria-hidden="true"></span>`
    ).join("");
    slot.outerHTML = `
      <div class="ticker" aria-hidden="true">
        <div class="ticker__track">${inner}</div>
        <div class="ticker__track">${inner}</div>
      </div>
    `;
  }

  /* ---------- Render the footer ---------- */
  function renderFooter() {
    const slot = document.querySelector("[data-mount='footer']");
    if (!slot) return;
    const socials = (C.socials || []).map(s =>
      `<a href="${s.url}" target="_blank" rel="noopener">${escape(s.label)}</a>`
    ).join("");
    slot.outerHTML = `
      <footer class="footer" role="contentinfo">
        <div class="footer__row">
          <span>${escape(C.site.copyright || "")}</span>
          <span>${escape(C.site.role || "")}</span>
        </div>
        <div class="footer__row">
          <div class="footer__socials">${socials}</div>
          <span>${escape(C.site.location || "")} / ${escape(C.site.year || "")}</span>
        </div>
      </footer>
    `;
  }

  /* ---------- Reel embed helper ----------
     Supports three providers:
       "youtube" — id is the YouTube video id
       "vimeo"   — id is the Vimeo video id
       "file"    — id is a path to a local .mp4 / .webm file
     Optional reel.poster (any provider) — path to a still image.
     For youtube/vimeo, a poster turns the embed into a
     click-to-play facade (the iframe only loads after click,
     so the page is faster too). For file, it's the native
     <video poster=""> attribute.                               */
  function embedReel(container, reel, label) {
    if (!container || !reel) return;
    const hasPoster = !!reel.poster;
    const captionHTML = `
      <div class="reel__caption">
        <span><span class="dot"></span>${escape(label || "REEL")}</span>
        <span>PRESS PLAY</span>
      </div>
    `;

    if ((reel.provider === "youtube" || reel.provider === "vimeo") && hasPoster) {
      container.innerHTML = `
        <div class="reel__frame reel__frame--facade">
          <button class="reel__poster" type="button"
                  aria-label="Play ${escape(label || "reel")}">
            <img src="${escape(reel.poster)}" alt="">
            <span class="reel__play" aria-hidden="true"></span>
          </button>
        </div>
        ${captionHTML}
      `;
      container.querySelector(".reel__poster").addEventListener("click", function () {
        const frame = container.querySelector(".reel__frame");
        let src = "";
        if (reel.provider === "youtube") {
          src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(reel.id)}?autoplay=1&rel=0`;
        } else {
          src = `https://player.vimeo.com/video/${encodeURIComponent(reel.id)}?autoplay=1`;
        }
        frame.classList.remove("reel__frame--facade");
        frame.innerHTML = `<iframe src="${src}"
                                   title="${escape(label || "Demo reel")}"
                                   allow="autoplay; fullscreen; picture-in-picture"
                                   allowfullscreen></iframe>`;
      });
      return;
    }

    let frame = "";
    if (reel.provider === "youtube") {
      const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(reel.id)}?rel=0`;
      frame = `<iframe src="${src}"
                       title="${escape(label || "Demo reel")}"
                       allow="autoplay; fullscreen; picture-in-picture"
                       allowfullscreen
                       loading="lazy"></iframe>`;
    } else if (reel.provider === "vimeo") {
      const src = `https://player.vimeo.com/video/${encodeURIComponent(reel.id)}`;
      frame = `<iframe src="${src}"
                       title="${escape(label || "Demo reel")}"
                       allow="autoplay; fullscreen; picture-in-picture"
                       allowfullscreen
                       loading="lazy"></iframe>`;
    } else if (reel.provider === "file") {
      const poster = reel.poster ? ` poster="${escape(reel.poster)}"` : "";
      const sources = (reel.sources && reel.sources.length)
        ? reel.sources
        : (reel.id ? [{ src: reel.id, type: guessType(reel.id) }] : []);
      const sourceTags = sources.map(s =>
        `<source src="${escape(s.src)}"${s.type ? ` type="${escape(s.type)}"` : ""}>`
      ).join("");
      frame = `<video controls preload="metadata" playsinline${poster}
                      title="${escape(label || "Demo reel")}">
                 ${sourceTags}
                 Your browser can't play this video. <a href="${escape(sources[0] ? sources[0].src : "#")}">Download it instead.</a>
               </video>`;
    }
    container.innerHTML = `
      <div class="reel__frame">${frame}</div>
      ${captionHTML}
    `;
  }

  function guessType(path) {
    const ext = (path.split(".").pop() || "").toLowerCase();
    if (ext === "mp4")  return "video/mp4";
    if (ext === "webm") return "video/webm";
    if (ext === "ogv" || ext === "ogg") return "video/ogg";
    if (ext === "mov")  return "video/quicktime";
    return "";
  }

  /* ---------- Image with fallback to a styled placeholder ----------
     The img is emitted with data-fallback-title; bindFallbacks()
     wires up an error listener after the markup is in the DOM.    */
  function imageWithFallback(src, alt, fallbackText) {
    const safeText = escape(fallbackText || alt || "image");
    if (!src) {
      return `<div class="img-fallback"><span>${safeText}</span></div>`;
    }
    return `<img src="${escape(src)}"
                 alt="${escape(alt || "")}"
                 data-fallback-title="${escape(fallbackText || alt || "image")}">`;
  }

  function bindFallbacks(root) {
    (root || document).querySelectorAll("img[data-fallback-title]").forEach(img => {
      if (img.__fbBound) return;
      img.__fbBound = true;
      img.addEventListener("error", function () {
        const title = this.getAttribute("data-fallback-title") || "";
        const wrap = document.createElement("div");
        wrap.className = "img-fallback";
        const span = document.createElement("span");
        span.textContent = title;
        wrap.appendChild(span);
        if (this.parentElement) this.parentElement.replaceChild(wrap, this);
      }, { once: true });
    });
  }

  /* ---------- Tiny markdown-style formatter ----------
     Used for paragraph text on About + project text blocks.
     Supported syntax:
       blank line       paragraph break
       **bold**         <strong>
       *italic*         <em>
       [text](url)      <a href> (only http://, https://, mailto: allowed)
     Everything else is plain text. HTML is escaped first, so
     readers can't inject markup by accident.                    */
  function formatText(value) {
    if (!value) return "";
    let s = escape(value);
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g,
      function (m, text, url) {
        const isExternal = /^https?:/.test(url);
        const attrs = isExternal ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${url}"${attrs}>${text}</a>`;
      });
    s = s.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
    const paras = s.split(/\n\s*\n/).map(p => p.replace(/\n/g, "<br>"));
    return paras.map(p => `<p>${p}</p>`).join("");
  }

  /* ---------- Tiny escape helper ---------- */
  function escape(value) {
    if (value === undefined || value === null) return "";
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ---------- Mailto fallback ----------
     Many machines have no default mail client registered, so a bare
     mailto: link silently does nothing. This helper rewrites every
     mailto link inside `root` so that:
       - the address is always visible in the link text,
       - clicking copies the address to the clipboard,
       - a brief "COPIED" confirmation is shown inline,
       - the native mailto: behavior still fires for users who do
         have a mail client configured.                              */
  function bindMailtoFallbacks(root) {
    const scope = root || document;
    const links = scope.querySelectorAll('a[href^="mailto:"]');
    links.forEach(function (a) {
      if (a.dataset.mailtoBound === "1") return;
      a.dataset.mailtoBound = "1";

      const address = (a.getAttribute("href") || "").replace(/^mailto:/i, "").split("?")[0].trim();
      if (!address) return;

      const labelEl = a.querySelector("[data-email-label]") || a.querySelector("#email-label");
      const baseLabel = labelEl ? labelEl.textContent : a.textContent;
      const labelHasAddress = baseLabel.toLowerCase().indexOf(address.toLowerCase()) !== -1;

      if (!labelHasAddress) {
        const newLabel = baseLabel.trim() ? baseLabel.trim() + " · " + address : address;
        if (labelEl) {
          labelEl.textContent = newLabel;
        } else {
          a.textContent = newLabel;
        }
      }
      a.setAttribute("title", "Click to copy " + address);
      a.setAttribute("aria-label", "Email " + address + " (click to copy address)");

      a.addEventListener("click", function () {
        copyText(address);
        flashCopied(a, address, labelEl);
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
      return;
    }
    legacyCopy(text);
  }

  function legacyCopy(text) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    } catch (e) { /* clipboard not supported; address is still visible */ }
  }

  function flashCopied(el, address, labelEl) {
    const target = labelEl || el;
    if (target.dataset.flashing === "1") return;
    target.dataset.flashing = "1";
    const original = target.textContent;
    target.textContent = "COPIED · " + address;
    setTimeout(function () {
      target.textContent = original;
      delete target.dataset.flashing;
    }, 1800);
  }

  /* ---------- SHA-256 helper used by vault and hash-tool ---------- */
  async function sha256(text) {
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  /* ---------- Expose helpers on a single namespace ---------- */
  window.HR = {
    content: C,
    currentPage,
    renderHeader,
    renderTicker,
    renderFooter,
    embedReel,
    imageWithFallback,
    bindFallbacks,
    bindMailtoFallbacks,
    formatText,
    escape,
    sha256
  };

  /* ---------- Auto-mount on DOM ready ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    bindFallbacks();
    bindMailtoFallbacks();
    /* Re-bind whenever new content is injected by page scripts. */
    new MutationObserver(() => {
      bindFallbacks();
      bindMailtoFallbacks();
    }).observe(document.body, {
      childList: true,
      subtree: true
    });
  });

})();
