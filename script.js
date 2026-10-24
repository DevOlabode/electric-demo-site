// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

// Hide an image's frame gracefully if a photo fails to load
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; }, { once: true });
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Quote form (demo: validates, then shows a message instead of sending)
const form = document.getElementById('quote-form');
const status = document.getElementById('form-status');

function setError(field, message) {
  const wrap = field.closest('.field');
  wrap.classList.add('invalid');
  let msg = wrap.querySelector('.error');
  if (!msg) {
    msg = document.createElement('span');
    msg.className = 'error';
    wrap.appendChild(msg);
  }
  msg.textContent = message;
  field.setAttribute('aria-invalid', 'true');
}

function clearError(field) {
  const wrap = field.closest('.field');
  wrap.classList.remove('invalid');
  wrap.querySelector('.error')?.remove();
  field.removeAttribute('aria-invalid');
}

form.querySelectorAll('input, select, textarea').forEach((el) => {
  el.addEventListener('input', () => clearError(el));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.textContent = '';
  status.className = 'form-status';

  let firstBad = null;
  const checks = [
    ['name', (v) => v.trim().length > 1, 'Please enter your name.'],
    ['phone', (v) => v.replace(/\D/g, '').length >= 10, 'Please enter a 10-digit phone number.'],
    ['email', (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'That email doesn’t look right.'],
    ['service', (v) => v !== '', 'Please choose a type of job.'],
    ['town', (v) => v.trim().length > 1, 'Please enter your town.'],
  ];

  checks.forEach(([id, ok, message]) => {
    const field = document.getElementById(id);
    if (!ok(field.value)) {
      setError(field, message);
      firstBad ||= field;
    } else {
      clearError(field);
    }
  });

  if (firstBad) {
    firstBad.focus();
    return;
  }

  const name = document.getElementById('name').value.trim().split(' ')[0];
  status.textContent = `Thanks ${name}. On a real site this would go straight to the owner’s inbox. This is a demo, so nothing was sent.`;
  status.classList.add('ok');
  form.reset();
});
