function checkReturningUser() {
  const stored = localStorage.getItem('ar-user');
  if (!stored) return;

  const userData = JSON.parse(stored);
  const banner   = document.getElementById('welcome-banner');

  if (userData && userData.name && banner) {
    banner.textContent = `Welcome back, ${userData.name}! Your data has been preloaded.`;
    banner.classList.add('show');

    const nameInput  = document.getElementById('nombre');
    const emailInput = document.getElementById('email');

    if (nameInput)  nameInput.value  = userData.name;
    if (emailInput) emailInput.value = userData.email || '';
  }
}

function saveUserData(name, email) {
  const userData = {
    name,
    email,
    lastVisit: new Date().toISOString()
  };
  localStorage.setItem('ar-user', JSON.stringify(userData));
}

function showFieldError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);

  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
  if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
}

function clearFieldError(fieldId) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  const inputEl = document.getElementById(fieldId);

  if (errorEl) errorEl.classList.remove('show');
  if (inputEl) inputEl.setAttribute('aria-invalid', 'false');
}

function validateForm(fields) {
  let isValid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  ['nombre', 'email', 'mensaje'].forEach(id => clearFieldError(id));

  if (!fields.nombre || fields.nombre.trim().length < 2) {
    showFieldError('nombre', 'Please enter your name (minimum 2 characters).');
    isValid = false;
  }

  if (!fields.email || !emailPattern.test(fields.email)) {
    showFieldError('email', 'Please enter a valid email address.');
    isValid = false;
  }

  if (!fields.mensaje || fields.mensaje.trim().length < 10) {
    showFieldError('mensaje', 'The message must be at least 10 characters long.');
    isValid = false;
  }

  return isValid;
}

function handleSubmit(event) {
  event.preventDefault();

  const fields = {
    nombre:     document.getElementById('nombre')?.value.trim(),
    email:      document.getElementById('email')?.value.trim(),
    region:     document.getElementById('region')?.value,
    mensaje:    document.getElementById('mensaje')?.value.trim(),
    newsletter: document.getElementById('newsletter')?.checked
  };

  if (!validateForm(fields)) return;

  saveUserData(fields.nombre, fields.email);

  const regionText = fields.region !== 'ninguna'
    ? `the <em>${fields.region}</em> region`
    : 'the Argentine landscapes';

  const newsletterNote = fields.newsletter
    ? '<br><br>✅ We have also subscribed you to our newsletter.'
    : '';

  const successHTML = `
    Thank you, <strong>${fields.nombre}</strong>. Your inquiry about ${regionText}
    has been received. We will reply to <strong>${fields.email}</strong> within
    the next 48 hours.${newsletterNote}
  `;

  const successMsg = document.getElementById('success-msg');
  const successEl  = document.getElementById('form-success');
  const formEl     = document.getElementById('contact-form');

  if (successMsg) successMsg.innerHTML = successHTML;

  if (formEl)     formEl.style.display   = 'none';
  if (successEl)  successEl.classList.add('show');
}

function initLiveValidation() {
  const fieldIds = ['nombre', 'email', 'mensaje'];

  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('blur', () => {
      if (el.value.trim() === '') return;

      clearFieldError(id);

      if (id === 'nombre' && el.value.trim().length < 2) {
        showFieldError('nombre', 'Minimum 2 characters.');
      }

      if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        showFieldError('email', 'Invalid email address.');
      }

      if (id === 'mensaje' && el.value.trim().length < 10) {
        showFieldError('mensaje', 'Minimum 10 characters.');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  checkReturningUser();
  initLiveValidation();

  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleSubmit);
});