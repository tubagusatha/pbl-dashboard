'use strict';

/* ══════════════════════════════════════════════════════
   SiPKL — Minimalist Authentication Controller
   Politeknik Negeri Jakarta • Frontend Prototype
   ══════════════════════════════════════════════════════ */

const ROLE_CONFIG = {
  super_admin: {
    name: 'Super Admin',
    label: 'Username atau Email',
    placeholder: 'admin@pnj.ac.id',
    demoUser: 'admin@pnj.ac.id',
    demoPass: 'admin123',
    initials: 'SA',
    displayName: 'Super Admin PKL',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  admin: {
    name: 'Admin PKL',
    label: 'Username atau Email',
    placeholder: 'admin.pkl@pnj.ac.id',
    demoUser: 'admin.pkl@pnj.ac.id',
    demoPass: 'admin123',
    initials: 'AD',
    displayName: 'Admin PKL',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  mahasiswa: {
    name: 'Mahasiswa',
    label: 'Nomor Induk Mahasiswa (NIM)',
    placeholder: '4322010001',
    demoUser: '4322010001',
    demoPass: 'mhs123',
    initials: 'AW',
    displayName: 'Anita Wijaya',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  dosen: {
    name: 'Dosen Pembimbing',
    label: 'NIP atau Email Dosen',
    placeholder: 'ahmad.s@pnj.ac.id',
    demoUser: 'ahmad.s@pnj.ac.id',
    demoPass: 'dosen123',
    initials: 'AS',
    displayName: 'Dr. Ir. Ahmad Setiawan, M.T.',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  kps: {
    name: 'Koordinator KPS',
    label: 'Email Resmi KPS',
    placeholder: 'kps.ti@pnj.ac.id',
    demoUser: 'kps.ti@pnj.ac.id',
    demoPass: 'kps123',
    initials: 'SM',
    displayName: 'Dr. Sari Melati, M.Kom.',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  kajur: {
    name: 'Ketua Jurusan',
    label: 'NIP atau Email Ketua Jurusan',
    placeholder: 'kajur.tik@pnj.ac.id',
    demoUser: 'kajur.tik@pnj.ac.id',
    demoPass: 'kajur123',
    initials: 'KJ',
    displayName: 'Prof. Dr. Hendra Wijaya',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  industri: {
    name: 'Pembimbing Industri',
    label: 'Email Mentor Industri',
    placeholder: 'tokopedia@mitra.com',
    demoUser: 'tokopedia@mitra.com',
    demoPass: 'mitra123',
    initials: 'TK',
    displayName: 'PT. Tokopedia (Mentor)',
    redirectUrl: './Super%20Admin%20Page/index.html'
  }
};

let currentRole = 'super_admin';

document.addEventListener('DOMContentLoaded', () => {
  initRoleSelect();
  initPasswordToggle();
  initFormSubmit();
  initModal();
});

// ── Role Select Dropdown ──────────────────────────────
function initRoleSelect() {
  const select = document.getElementById('roleSelect');
  if (!select) return;

  select.addEventListener('change', () => {
    const role = select.value;
    if (!ROLE_CONFIG[role]) return;
    currentRole = role;

    const cfg = ROLE_CONFIG[role];
    const labelEl = document.getElementById('identifierLabel');
    const inputEl = document.getElementById('userIdentifier');
    const passEl = document.getElementById('userPassword');

    if (labelEl) labelEl.textContent = cfg.label;
    if (inputEl) {
      inputEl.placeholder = cfg.placeholder;
      inputEl.value = cfg.demoUser;
    }
    if (passEl) {
      passEl.value = cfg.demoPass;
    }
  });
}

// ── Password Visibility Toggle ────────────────────────
function initPasswordToggle() {
  const btn = document.getElementById('togglePasswordBtn');
  const passInput = document.getElementById('userPassword');

  if (btn && passInput) {
    btn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      }
    });
  }
}

// ── Form Submission ────────────────────────────────────
function initFormSubmit() {
  const form = document.getElementById('loginForm');
  const btn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userInput = document.getElementById('userIdentifier').value.trim();
    const passInput = document.getElementById('userPassword').value.trim();

    if (!userInput || !passInput) {
      showToast('error', 'Silakan isi username dan kata sandi');
      return;
    }

    if (btn) btn.classList.add('loading');

    const cfg = ROLE_CONFIG[currentRole];
    const session = {
      role: currentRole,
      roleName: cfg.name,
      name: cfg.displayName,
      identifier: userInput,
      initials: cfg.initials,
      loginAt: new Date().toISOString()
    };

    localStorage.setItem('sipkl_session', JSON.stringify(session));

    setTimeout(() => {
      window.location.href = cfg.redirectUrl;
    }, 380);
  });
}

// ── Toast Notification ─────────────────────────────────
function showToast(type, text) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-circle-exclamation'}"></i>
    <span>${text}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(6px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

// ── Modal ──────────────────────────────────────────────
function initModal() {
  const forgotLink = document.getElementById('forgotPasswordLink');
  const modal = document.getElementById('modalForgot');
  const closeBtn = document.getElementById('closeForgotBtn');

  if (forgotLink && modal) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}
