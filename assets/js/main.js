function setupSiteHeader() {
  const header = document.querySelector(".js-site-header");

  if (!header) {
    return;
  }

  const menuToggle = header.querySelector(".js-header-menu-toggle");
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function setMenuOpen(isOpen) {
    header.dataset.menuOpen = String(isOpen);
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    menuToggle?.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(header.dataset.menuOpen !== "true");
  });

  mediaQuery.addEventListener("change", () => {
    setMenuOpen(false);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  setMenuOpen(false);
}

setupSiteHeader();
