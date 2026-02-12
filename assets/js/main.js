/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]",
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

/* ===== LIGHTBOX / CAROUSEL BEHAVIOR ===== */
(function () {
  const workItems = Array.from(document.querySelectorAll(".work__img"));
  if (!workItems.length) return;

  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lb-image");
  const lbClose = document.getElementById("lb-close");
  const lbNext = document.getElementById("lb-next");
  const lbPrev = document.getElementById("lb-prev");

  let currentGallery = [];
  let currentIndex = 0;

  function parseGallery(item) {
    const raw = item.getAttribute("data-gallery");
    if (raw) {
      return raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    const img = item.querySelector("img");
    return img ? [img.getAttribute("src")] : [];
  }

  function openGallery(gallery, startIndex = 0) {
    if (!gallery || !gallery.length) return;
    currentGallery = gallery;
    currentIndex =
      ((startIndex % gallery.length) + gallery.length) % gallery.length;
    lbImage.src = currentGallery[currentIndex];
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.setAttribute("aria-hidden", "true");
    lbImage.src = "";
    document.body.style.overflow = "";
    currentGallery = [];
  }

  function next() {
    if (currentGallery.length) openGallery(currentGallery, currentIndex + 1);
  }
  function prev() {
    if (currentGallery.length) openGallery(currentGallery, currentIndex - 1);
  }

  workItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const gallery = parseGallery(item);
      const thumb = item.querySelector("img");
      let start = 0;
      if (thumb) {
        const src = thumb.getAttribute("src");
        const idx = gallery.indexOf(src);
        if (idx !== -1) start = idx;
      }
      openGallery(gallery, start);
    });
  });

  lbClose.addEventListener("click", close);
  lbNext.addEventListener("click", next);
  lbPrev.addEventListener("click", prev);

  // click overlay to close
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  // keyboard navigation
  window.addEventListener("keydown", function (e) {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
  });
})();
