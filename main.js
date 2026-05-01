// Custom Cursor
const cursor = document.getElementById('cursor');
let cursorX = 0, cursorY = 0;
document.addEventListener('mousemove', e => {
  cursorX = e.clientX; cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
});

// Cursor state on hovers
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
document.querySelectorAll('.collection-visual, .h-card-visual, .about-frame-inner, .story-panel').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.remove('hover'); cursor.classList.add('gem'); });
  el.addEventListener('mouseleave', () => cursor.classList.remove('gem'));
});

// Typewriter
const phrases = ['Hecho a mano con amor.', 'Arte que brilla en ti.', 'Piezas únicas del Huila.'];
let pi = 0, ci = 0, typing = true;
const tw = document.getElementById('typewriter');
function typeLoop() {
  if (!tw) return;
  const phrase = phrases[pi];
  if (typing) {
    tw.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { typing = false; setTimeout(typeLoop, 2000); return; }
    setTimeout(typeLoop, 70);
  } else {
    tw.textContent = phrase.slice(0, --ci);
    if (ci === 0) { typing = true; pi = (pi + 1) % phrases.length; setTimeout(typeLoop, 400); return; }
    setTimeout(typeLoop, 35);
  }
}
setTimeout(typeLoop, 1500);

// Nav scroll
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObs.observe(el));
}

// Parallax panels
const parallaxSection = document.getElementById('parallax-visual');
if (parallaxSection) {
  window.addEventListener('scroll', () => {
    const rect = parallaxSection.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    const panels = parallaxSection.querySelectorAll('.story-panel');
    if (panels[0]) panels[0].style.setProperty('--py1', (center * -0.08) + 'px');
    if (panels[1]) panels[1].style.setProperty('--py2', (center * 0.06) + 'px');
    if (panels[2]) panels[2].style.setProperty('--py3', (center * -0.05) + 'px');
  });
}

// Horizontal scroll driven by page scroll
const hTrack = document.getElementById('h-track');
const hSection = hTrack ? hTrack.closest('section') : null;
if (hSection && hTrack) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 900) {
      hTrack.style.transform = ''; // Reset on mobile
      return;
    }
    const rect = hSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight * 0.5)));
    const maxShift = hTrack.scrollWidth - hSection.offsetWidth + 80;
    hTrack.style.transform = `translateX(-${progress * maxShift * 0.6}px)`;
  });
}

// Touch: allow scrolling on mobile
document.addEventListener('touchstart', () => {});

// Hamburger Menu Logic
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}
