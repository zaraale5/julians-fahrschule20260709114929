// NAV TOGGLE (mobile)
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', function () {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(!expanded));
});
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') { navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
});

// SMOOTH SCROLLING FOR NAV LINKS
navMenu.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// SKIP LINK HANDLER
const skipLink = document.querySelector('.skip-link');
skipLink.addEventListener('click', e => {
  const mainContent = document.getElementById('main-content');
  if(mainContent) mainContent.setAttribute('tabindex', '-1');
  mainContent.focus();
});

// INTERSECTION OBSERVER for fade-in animations
const animatedSections = document.querySelectorAll('[data-animate], .features-grid, .standards-grid, .pricing-grid, .team-grid, .testimonials-grid');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Animate sections/containers on scroll
['.features-grid', '.standards-grid', '.pricing-grid', '.team-grid', '.testimonials-grid', '.online-grid', '.faq-list', '.kontakt-grid']
.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.setAttribute('data-animate', '');
    observer.observe(el);
  });
});

// FAQ ACCORDION
const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    const article = btn.parentElement;
    if (!expanded) {
      article.classList.add('active');
      // collapse others
      faqButtons.forEach(b => {
        if(b!==btn){
          b.setAttribute('aria-expanded','false');
          b.parentElement.classList.remove('active');
        }
      });
    } else {
      article.classList.remove('active');
    }
  });
  // keyboard accessibility: toggle on enter/space
  btn.addEventListener('keydown', e => {if(['Enter',' '].includes(e.key)) btn.click();});
});

// FORM VALIDATION
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
if(contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    formFeedback.textContent = '';
    // Basic validate
    ['name','email','message'].forEach(id => {
      const field = contactForm.elements[id];
      if(!field.value.trim() || (id==='email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.value))) {
        valid = false;
        field.setAttribute('aria-invalid','true');
        field.classList.add('invalid');
      } else {
        field.removeAttribute('aria-invalid');
        field.classList.remove('invalid');
      }
    });
    if(!valid) {
      formFeedback.textContent = 'Bitte alle Felder korrekt ausfüllen.';
      formFeedback.classList.remove('success');
      contactForm.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    // Demo feedback (simulate sent)
    formFeedback.textContent = 'Danke, deine Anfrage wurde gesendet!';
    formFeedback.classList.add('success');
    contactForm.reset();
  });
}

// Focus states (for keyboard users) on nav toggle
navToggle.addEventListener('keydown', function(e) {
  if(["Enter"," "].includes(e.key)) navToggle.click();
});

// Accessibility: close menu on outside click
window.addEventListener('click', function(e){
  if(navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open'); navToggle.setAttribute('aria-expanded','false');
  }
});