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
  const hide = () => { img.style.visibility = 'hidden'; };
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener('error', hide, { once: true });
});

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Solar estimator (rough demo numbers: ~$0.25/kWh, ~1,100 kWh per kW per year in Edmonton).
// Fixed delivery and admin fees stay on the bill, so only ~75% of it is energy solar can replace.
const bill = document.getElementById('bill');
const fmt = (n) => Math.round(n).toLocaleString('en-CA');

function estimate() {
  const monthly = Number(bill.value);
  const yearlyKwh = (monthly * 12 * 0.75) / 0.25;
  const kw = yearlyKwh / 1100;
  document.getElementById('bill-out').textContent = `$${monthly}${monthly == bill.max ? '+' : ''}`;
  document.getElementById('r-size').textContent = kw.toFixed(1);
  document.getElementById('r-panels').textContent = Math.ceil((kw * 1000) / 410);
  document.getElementById('r-prod').textContent = fmt(kw * 1100);
  document.getElementById('r-save').textContent = fmt(monthly * 12 * 0.75);
}
bill.addEventListener('input', estimate);
estimate();

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

form.querySelectorAll('input, textarea').forEach((el) => {
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
    ['service', (v) => v !== '', 'Pick at least one type of job.'],
    ['town', (v) => v.trim().length > 1, 'Please enter your town.'],
  ];

  checks.forEach(([id, ok, message]) => {
    // service is a group of checkboxes, so its value is the ticked options joined together
    const field = id === 'service' ? form.elements.service[0] : form.elements[id];
    const value = id === 'service'
      ? [...form.querySelectorAll('[name="service"]:checked')].map((c) => c.value).join(', ')
      : form.elements[id].value;
    if (!ok(value)) {
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
