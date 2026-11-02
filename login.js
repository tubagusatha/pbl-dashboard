'use strict';

/* ══════════════════════════════════════════════════════
   SiPKL — Modern & Minimalist Authentication Controller
   Politeknik Negeri Jakarta • Frontend Prototype
   Multi-Role: Super Admin, Admin, Mahasiswa, Dosen, KPS, Kajur, Industri
   ══════════════════════════════════════════════════════ */

const ROLE_CONFIG = {
  super_admin: {
    name: 'Super Admin',
    label: 'Username / Email Super Admin',
    placeholder: 'admin@pnj.ac.id',
    demoUser: 'admin@pnj.ac.id',
    demoPass: 'admin123',
    demoText: 'admin@pnj.ac.id • admin123',
    initials: 'SA',
    displayName: 'Super Admin PKL',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  admin: {
    name: 'Admin PKL',
    label: 'Username / Email Admin PKL',
    placeholder: 'admin.pkl@pnj.ac.id',
    demoUser: 'admin.pkl@pnj.ac.id',
    demoPass: 'admin123',
    demoText: 'admin.pkl@pnj.ac.id • admin123',
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
    demoText: '4322010001 (Anita) • mhs123',
    initials: 'AW',
    displayName: 'Anita Wijaya',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  dosen: {
    name: 'Dosen Pembimbing',
    label: 'NIP / Email Dosen',
    placeholder: 'ahmad.s@pnj.ac.id',
    demoUser: 'ahmad.s@pnj.ac.id',
    demoPass: 'dosen123',
    demoText: 'ahmad.s@pnj.ac.id • dosen123',
    initials: 'AS',
    displayName: 'Dr. Ir. Ahmad Setiawan, M.T.',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  kps: {
    name: 'Ketua Program Studi (KPS)',
    label: 'Email Resmi KPS',
    placeholder: 'kps.ti@pnj.ac.id',
    demoUser: 'kps.ti@pnj.ac.id',
    demoPass: 'kps123',
    demoText: 'kps.ti@pnj.ac.id • kps123',
    initials: 'SM',
    displayName: 'Dr. Sari Melati, M.Kom.',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  kajur: {
    name: 'Ketua Jurusan',
    label: 'NIP / Email Ketua Jurusan',
    placeholder: 'kajur.tik@pnj.ac.id',
    demoUser: 'kajur.tik@pnj.ac.id',
    demoPass: 'kajur123',
    demoText: 'kajur.tik@pnj.ac.id • kajur123',
    initials: 'KJ',
    displayName: 'Prof. Dr. Hendra Wijaya',
    redirectUrl: './Super%20Admin%20Page/index.html'
  },
  industri: {
    name: 'Pembimbing Industri',
    label: 'Email Mentor / PIC Industri',
    placeholder: 'tokopedia@mitra.com',
    demoUser: 'tokopedia@mitra.com',
    demoPass: 'mitra123',
    demoText: 'tokopedia@mitra.com • mitra123',
    initials: 'TK',
    displayName: 'PT. Tokopedia (Mentor)',
    redirectUrl: './Super%20Admin%20Page/index.html'
  }
};

let currentRole = 'super_admin';

document.addEventListener('DOMContentLoaded', () => {
  initRoleSelect();
  initDemoHelper();
  initPasswordToggle();
  initFormSubmit();
  initModal();
});

// ── Multi-Role Dropdown Selector ──────────────────────
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
    const demoTitleEl = document.getElementById('demoHelperTitle');
    const demoValEl = document.getElementById('demoHelperVal');

    if (labelEl) labelEl.textContent = cfg.label;
    if (inputEl) {
      inputEl.placeholder = cfg.placeholder;
      inputEl.value = cfg.demoUser;
    }

    const passEl = document.getElementById('userPassword');
    if (passEl) passEl.value = cfg.demoPass;

    if (demoTitleEl) demoTitleEl.textContent = `Akun Demo (${cfg.name})`;
    if (demoValEl) demoValEl.textContent = cfg.demoText;
  });
}

// ── Quick Demo Helper ──────────────────────────────────
function initDemoHelper() {
  const btn = document.getElementById('fillDemoBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cfg = ROLE_CONFIG[currentRole];
    const userEl = document.getElementById('userIdentifier');
    const passEl = document.getElementById('userPassword');

    if (userEl) userEl.value = cfg.demoUser;
    if (passEl) passEl.value = cfg.demoPass;

    showToast('success', `Kredensial ${cfg.name} dimasukkan`);
  });
}

// ── Password Visibility ────────────────────────────────
function initPasswordToggle() {
  const btn = document.getElementById('togglePasswordBtn');
  const passInput = document.getElementById('userPassword');

  if (btn && passInput) {
    btn.addEventListener('click', () => {
      const isPassword = passInput.type === 'password';
      passInput.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
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
      if (btn) btn.classList.remove('loading');
      showToast('success', `Login berhasil sebagai ${cfg.name}. Mengalihkan...`);
      setTimeout(() => {
        window.location.href = cfg.redirectUrl;
      }, 400);
    }, 450);
  });
}

// ── Toast Notification ─────────────────────────────────
function showToast(type, text) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `clean-toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-circle-exclamation'}"></i>
    <span>${text}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
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
