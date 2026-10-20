"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import "@/app/design.css";

export type DesignPageRecord = {
  name: string;
  title: string;
  slug: string;
  html: string;
  css: string;
  logoHtml: string;
};

const navigation = [
  ["About", "About"],
  ["Research", "Research"],
  ["Speaking", "Speaking"],
  ["IntegratedCare", "Integrated Care"],
  ["Consulting", "Consulting"],
  ["Creative", "Creative"],
  ["Education", "Education"],
  ["Contact", "Contact"]
] as const;

const pagePaths: Record<string, string> = {
  Home: "/",
  About: "/about",
  Research: "/research",
  Speaking: "/speaking-media",
  IntegratedCare: "/integrated-care",
  Consulting: "/consulting",
  Creative: "/creative",
  Education: "/education",
  Contact: "/contact",
  Privacy: "/privacy",
  Accessibility: "/accessibility"
};

function pathFor(name: string) {
  return pagePaths[name] ?? "/";
}

function transformSourceForMobile(root: HTMLElement) {
  const px = (value: string | null | undefined) => {
    const match = /^(-?[\d.]+)px$/.exec(value || "");
    return match ? Number.parseFloat(match[1]) : null;
  };

  root.style.overflowWrap = "break-word";
  root.querySelectorAll<HTMLElement>("span").forEach((span) => {
    if (span.style.display === "inline-flex" && span.style.whiteSpace === "nowrap") {
      span.setAttribute("data-lockup", "1");
    }
  });

  root.querySelectorAll<HTMLElement>("*").forEach((element) => {
    if (element.closest("[data-lockup]")) return;
    const style = element.style;
    if ((px(style.paddingTop) ?? 0) > 56) style.paddingTop = "56px";
    if ((px(style.paddingBottom) ?? 0) > 56) style.paddingBottom = "56px";
    if ((px(style.paddingLeft) ?? 0) > 24) style.paddingLeft = "20px";
    if ((px(style.paddingRight) ?? 0) > 24) style.paddingRight = "20px";

    const fontSize = px(style.fontSize);
    if (fontSize !== null && fontSize >= 56) style.fontSize = `${Math.round(fontSize * 0.62)}px`;
    else if (fontSize !== null && fontSize >= 36) style.fontSize = `${Math.round(fontSize * 0.72)}px`;

    if (style.display === "grid") {
      const columns = style.gridTemplateColumns || "";
      const minColumn = /minmax\((\d+)px/.exec(columns);
      style.gridTemplateColumns = /auto-fit/.test(columns) && minColumn && Number(minColumn[1]) <= 260
        ? "repeat(2,minmax(0,1fr))"
        : "minmax(0,1fr)";
      const rowGap = px(style.rowGap);
      if (rowGap !== null && rowGap > 32) style.rowGap = "32px";
    }

    const columnGap = px(style.columnGap);
    if (columnGap !== null && columnGap > 28) style.columnGap = "28px";
    const width = px(style.width);
    if (width !== null && width > 300) {
      style.width = "100%";
      style.maxWidth = "100%";
    }
    const minWidth = px(style.minWidth);
    if (minWidth !== null && minWidth > 280) style.minWidth = "0";
    if (style.display === "flex" && style.flexDirection !== "column" && style.whiteSpace !== "nowrap" && element.children.length > 1) {
      style.flexWrap = "wrap";
    }
    if (element.tagName === "IMG") style.maxWidth = "100%";
    if (element.tagName === "A" && (style.backgroundColor || style.background) && style.padding) {
      style.minHeight = "44px";
      style.display = "inline-flex";
      style.alignItems = "center";
      style.boxSizing = "border-box";
    }
  });

  root.querySelectorAll<HTMLElement>("footer a").forEach((link) => {
    if (!link.closest("[data-lockup]")) {
      link.style.display = "inline-block";
      link.style.padding = "8px 0";
    }
  });
}

function submitContactForm(event: Event, root: HTMLElement) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement) || !root.contains(form)) return;
  event.preventDefault();
  const data = new FormData(form);
  if (!form.reportValidity()) return;
  const kind = String(data.get("type") || "Professional");
  const body = [
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Organization: ${data.get("org") || ""}`,
    "",
    String(data.get("message") || "")
  ].join("\n");
  const mailto = `mailto:Sarah.Lidstone@gmail.com?subject=${encodeURIComponent(`${kind} inquiry`)}&body=${encodeURIComponent(body)}`;
  let status = form.querySelector<HTMLElement>("[data-design-form-status]");
  if (!status) {
    status = document.createElement("div");
    status.dataset.designFormStatus = "true";
    status.className = "design-inline-form-status";
    status.setAttribute("role", "status");
    const fallback = document.createElement("a");
    fallback.dataset.designMailtoFallback = "true";
    fallback.textContent = "Open email draft";
    status.append(document.createTextNode("Your email draft is ready. If it did not open, "), fallback, document.createTextNode("."));
    form.appendChild(status);
  }
  const fallback = status.querySelector<HTMLAnchorElement>("[data-design-mailto-fallback]");
  if (fallback) fallback.href = mailto;
  window.location.href = mailto;
}

export function DesignPage({ page }: { page: DesignPageRecord }) {
  const sourceRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const root = sourceRef.current;
    if (!root) return;
    root.innerHTML = page.html;
    if (mobile) {
      root.querySelector("header")?.remove();
      transformSourceForMobile(root);
    }
    const handleSubmit = (event: Event) => submitContactForm(event, root);
    root.addEventListener("submit", handleSubmit);
    setReady(true);
    setMenuOpen(false);
    return () => root.removeEventListener("submit", handleSubmit);
  }, [page.html, mobile]);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      } else if (event.key === "Tab") {
        const menu = document.querySelector<HTMLElement>(".design-mobile-menu[aria-hidden='false']");
        const focusable = menu?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const activePath = pagePaths[page.name] ?? `/${page.slug}`;

  return (
    <div className="design-page" data-page={page.name} data-ready={ready ? "true" : "false"}>
      <style>{page.css}</style>
      {mobile && (
        <div className="design-mobile-scroll">
          <header className="design-mobile-header">
            <a className="design-mobile-logo" href="/" aria-label="Sarah Lidstone home" dangerouslySetInnerHTML={{ __html: page.logoHtml }} />
            <button
              ref={menuButtonRef}
              className="design-menu-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="design-mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span /><span /><span />
            </button>
          </header>
          <div ref={sourceRef} className="design-source" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      )}
      {!mobile && <div ref={sourceRef} className="design-source design-source-desktop" dangerouslySetInnerHTML={{ __html: page.html }} />}
      {mobile && (
        <div id="design-mobile-menu" className="design-mobile-menu" aria-hidden={!menuOpen}>
          <div className="design-mobile-menu-close-row">
            <button ref={closeButtonRef} className="design-menu-close" type="button" aria-label="Close menu" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <span /><span />
            </button>
          </div>
          <nav className="design-mobile-menu-nav" aria-label="Main navigation">
            {navigation.map(([name, label]) => (
              <a
                key={name}
                href={pathFor(name)}
                aria-current={activePath === pathFor(name) ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >{label}</a>
            ))}
          </nav>
          <a className="design-mobile-menu-cta" href={pathFor("Contact")} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>Inquire</a>
        </div>
      )}
    </div>
  );
}
