/* =========================================================================
   Motion per landing-page-design skill (Part B)
   Base curve: cubic-bezier(0.22, 1, 0.36, 1)
   Animate only transform and opacity. Respect prefers-reduced-motion.
   ========================================================================= */

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

// ---- Scroll reveals (B7) ----
// Sections rise Spacing-400 (32px) and fade 0->1 over 600-800ms, once only.
function initScrollReveals() {
  if (reduced.matches) {
    document.querySelectorAll('.will-reveal').forEach((el) => {
      el.classList.add('in');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.will-reveal').forEach((el) => observer.observe(el));
}

// Mark reveal targets
function markRevealTargets() {
  const targets = [
    '.hero__copy',
    '.hero__visual',
    '.tagline-reveal .wrap',
    '.benefits .sechead',
    '.benefit-list',
    '.how-it-works .sechead',
    '.steps',
    '.sec--work .sechead',
    '.gallery',
    '.sec--index .sechead',
    '.idx',
    '.sec--research .sechead',
    '.papers',
    '.sec--toolkit .sechead',
    '.matrix',
    '.sec--certs .sechead',
    '.certs',
    '.faq .sechead',
    '.faq__list',
    '.contact .contact__wrap',
  ];
  targets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add('will-reveal'));
  });
}

// ---- Tagline reveal word by word (B11) ----
function initTaglineReveal() {
  const container = document.querySelector('.tagline-reveal');
  if (!container) return;
  const words = container.querySelectorAll('.reveal-word');
  if (!words.length) return;

  if (reduced.matches) {
    words.forEach((w) => {
      w.classList.add('active');
      w.style.color = '';
    });
    return;
  }

  let triggered = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          words.forEach((w, i) => {
            setTimeout(() => {
              w.classList.add('active');
            }, i * 60); // step each item 60ms, cap total under ~400ms for short lists
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  observer.observe(container);
}

// ---- Mobile menu toggle (animated transform, B7) ----
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('menu');
  const bars = toggle.querySelectorAll('.nav__bars span');
  let open = false;

  function setOpen(isOpen) {
    open = isOpen;
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    // allow layout before animating opacity
    requestAnimationFrame(() => {
      menu.style.opacity = open ? '1' : '0';
      menu.style.visibility = open ? 'visible' : 'hidden';
    });

    // animate hamburger transform between states
    if (open) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = 'none';
      bars[1].style.opacity = '1';
      bars[2].style.transform = 'none';
    }

    // staggered link entrance (B7 navigation)
    const links = menu.querySelectorAll('.menu__links a');
    if (open) {
      links.forEach((link, i) => {
        link.style.transition = `transform 500ms var(--ease, cubic-bezier(0.22,1,0.36,1)) ${i * 60}ms, opacity 300ms var(--ease, cubic-bezier(0.22,1,0.36,1)) ${i * 60}ms`;
        link.style.transform = 'translateY(0)';
        link.style.opacity = '1';
      });
    } else {
      links.forEach((link) => {
        link.style.transform = 'translateY(32px)';
        link.style.opacity = '0';
      });
    }
  }

  toggle.addEventListener('click', () => setOpen(!open));

  // close menu when a link is clicked
  menu.querySelectorAll('.menu__links a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

// ---- Cursor follower (decorative) ----
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => { cursor.style.opacity = '0.8'; cursor.style.transform = 'translate(-50%, -50%) scale(1.6)'; });
    el.addEventListener('mouseleave', () => { cursor.style.opacity = '0.4'; cursor.style.transform = 'translate(-50%, -50%) scale(1)'; });
  });
}

// ---- FAQ accordion ----
function initFAQ() {
  document.querySelectorAll('.faq__q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  markRevealTargets();
  initScrollReveals();
  initTaglineReveal();
  initMobileMenu();
  initCursor();
  initFAQ();
});
