'use strict';
/* ════════════════════════════════════════════════
   SiPKL — Admin App Logic
   Politeknik Negeri Jakarta
   Actors: Mahasiswa, Admin, KPS, Ketua Jurusan,
           Dosen Pembimbing, Industri, SISTEM
   ════════════════════════════════════════════════ */

// ── Data ─────────────────────────────────────────
const DB = {
  mahasiswa: [
    { nim:'4322010001', nama:'Anita Wijaya',      jur:'Teknik Informatika',   co:'PT. Tokopedia',        dos:'Dr. Ir. Ahmad S.',    st:'Selesai',   prog:100, init:'AW', clr:'#4f8ef7,#22d3ee' },
    { nim:'4322010002', nama:'Budi Santoso',      jur:'Teknik Informatika',   co:'PT. Telkom Indonesia', dos:'Dr. Sari M.',         st:'Pending',   prog:30,  init:'BS', clr:'#a78bfa,#4f8ef7' },
    { nim:'4322010003', nama:'Siti Rahayu',       jur:'Administrasi Bisnis',  co:'PT. Bank Mandiri',     dos:'Dr. Budi, M.T.',      st:'Selesai',   prog:100, init:'SR', clr:'#34d399,#22d3ee' },
    { nim:'4322010004', nama:'Reza Firmansyah',   jur:'Teknik Mesin',         co:'PT. Astra Intl.',      dos:'Prof. Hendra',        st:'Sedang PKL',prog:65,  init:'RF', clr:'#fbbf24,#f87171' },
    { nim:'4322010005', nama:'Dewi Susanti',      jur:'Akuntansi',            co:'PT. Bank BRI',         dos:'Dr. Sari M.',         st:'Selesai',   prog:100, init:'DS', clr:'#a78bfa,#34d399' },
    { nim:'4322010006', nama:'Muhammad Farhan',   jur:'Teknik Informatika',   co:'PT. Gojek',            dos:'Dr. Ir. Ahmad S.',    st:'Sedang PKL',prog:78,  init:'MF', clr:'#f87171,#fbbf24' },
    { nim:'4322010007', nama:'Rio Prasetyo',      jur:'Teknik Sipil',         co:'PT. Pertamina',        dos:'Prof. Hendra',        st:'Sedang PKL',prog:55,  init:'RP', clr:'#22d3ee,#4f8ef7' },
    { nim:'4322010008', nama:'Laila Putri',       jur:'Teknik Informatika',   co:'PT. PLN',              dos:'Dr. Budi, M.T.',      st:'Sedang PKL',prog:72,  init:'LP', clr:'#a78bfa,#fbc2eb' },
    { nim:'4322010009', nama:'Arif Nugroho',      jur:'Teknik Mesin',         co:'PT. Toyota Astra',     dos:'Prof. Hendra',        st:'Belum Mulai',prog:0,  init:'AN', clr:'#34d399,#4f8ef7' },
    { nim:'4322010010', nama:'Nadia Sari',        jur:'Administrasi Bisnis',  co:'PT. Unilever',         dos:'Dr. Sari M.',         st:'Sedang PKL',prog:48,  init:'NS', clr:'#fbbf24,#f87171' },
  ],
  pengajuan: [
    { nama:'Budi Santoso',    nim:'4322010002', jur:'Teknik Informatika',  co:'PT. Telkom Indonesia',   pos:'IT Support Intern',         tgl:'28 Okt 2026', init:'BS', clr:'#4f8ef7,#22d3ee' },
    { nama:'Arif Nugroho',    nim:'4322010009', jur:'Teknik Mesin',        co:'PT. Toyota Astra Motor', pos:'Manufacturing Intern',      tgl:'27 Okt 2026', init:'AN', clr:'#34d399,#22d3ee' },
    { nama:'Cindy Permata',   nim:'4322010015', jur:'Teknik Informatika',  co:'PT. Shopee Indonesia',   pos:'Backend Developer Intern',  tgl:'27 Okt 2026', init:'CP', clr:'#f87171,#fbbf24' },
    { nama:'Doni Kurniawan',  nim:'4322010018', jur:'Akuntansi',           co:'KAP Ernst & Young',      pos:'Audit Intern',              tgl:'26 Okt 2026', init:'DK', clr:'#a78bfa,#4f8ef7' },
    { nama:'Eka Rahmawati',   nim:'4322010021', jur:'Administrasi Bisnis', co:'PT. Garuda Indonesia',   pos:'HR Intern',                 tgl:'26 Okt 2026', init:'ER', clr:'#fbbf24,#f87171' },
    { nama:'Fajar Aditya',    nim:'4322010024', jur:'Teknik Sipil',        co:'PT. Waskita Karya',      pos:'Site Engineer Intern',      tgl:'25 Okt 2026', init:'FA', clr:'#22d3ee,#4f8ef7' },
  ],
  logbook: [
    { nama:'Reza Firmansyah', init:'RF', clr:'#fbbf24,#f87171', ket:'Analisis kebutuhan sistem modul inventory perusahaan',                   tgl:'29 Okt 2026', tipe:'Industri', ok:false },
    { nama:'Muhammad Farhan', init:'MF', clr:'#f87171,#fbbf24', ket:'Rapat bimbingan kampus — progress laporan bab 3',                        tgl:'29 Okt 2026', tipe:'Kampus',   ok:true  },
    { nama:'Laila Putri',     init:'LP', clr:'#a78bfa,#fbc2eb', ket:'Testing dan debugging aplikasi web e-commerce internal',                 tgl:'28 Okt 2026', tipe:'Industri', ok:true  },
    { nama:'Nadia Sari',      init:'NS', clr:'#fbbf24,#f87171', ket:'Pembuatan laporan mingguan & dokumentasi proses bisnis',                 tgl:'28 Okt 2026', tipe:'Kampus',   ok:false },
    { nama:'Rio Prasetyo',    init:'RP', clr:'#22d3ee,#4f8ef7', ket:'Survei lapangan proyek konstruksi jembatan — Bekasi Barat',              tgl:'27 Okt 2026', tipe:'Industri', ok:true  },
    { nama:'Anita Wijaya',    init:'AW', clr:'#4f8ef7,#22d3ee', ket:'Presentasi hasil PKL kepada pembimbing industri & tim manajemen',       tgl:'26 Okt 2026', tipe:'Industri', ok:true  },
  ],
  laporan: [
    { judul:'Pengembangan Sistem Informasi Inventory Berbasis Web', mhs:'Anita Wijaya',    nim:'4322010001', tgl:'20 Okt 2026',     st:'Disetujui', clr:'#4f8ef7,#22d3ee' },
    { judul:'Analisis Perancangan Sistem Rekrutmen Digital',        mhs:'Siti Rahayu',     nim:'4322010003', tgl:'18 Okt 2026',     st:'Disetujui', clr:'#34d399,#22d3ee' },
    { judul:'Implementasi Machine Learning untuk Anomali Detection', mhs:'Muhammad Farhan', nim:'4322010006', tgl:'15 Okt 2026',     st:'Review',    clr:'#f87171,#fbbf24' },
    { judul:'Perancangan Audit Internal Berbasis Sistem Digital',   mhs:'Dewi Susanti',    nim:'4322010005', tgl:'12 Okt 2026',     st:'Disetujui', clr:'#a78bfa,#34d399' },
    { judul:'Optimasi Proses Produksi dengan Lean Manufacturing',   mhs:'Reza Firmansyah', nim:'4322010004', tgl:'Belum Submit',    st:'Pending',   clr:'#fbbf24,#f87171' },
    { judul:'Studi Kelayakan Proyek Konstruksi Jembatan Tipe T',   mhs:'Rio Prasetyo',    nim:'4322010007', tgl:'Belum Submit',    st:'Pending',   clr:'#22d3ee,#4f8ef7' },
  ],
  nilai: [
    { nim:'4322010001', nama:'Anita Wijaya',    ni:96, nk:95, ndi:97, akhir:95.8, grade:'A' },
    { nim:'4322010006', nama:'Muhammad Farhan', ni:93, nk:95, ndi:94, akhir:94.2, grade:'A' },
    { nim:'4322010005', nama:'Dewi Susanti',    ni:92, nk:94, ndi:93, akhir:92.7, grade:'A' },
    { nim:'4322010007', nama:'Rio Prasetyo',    ni:91, nk:92, ndi:91, akhir:91.5, grade:'A' },
    { nim:'4322010008', nama:'Laila Putri',     ni:90, nk:91, ndi:92, akhir:90.9, grade:'A' },
    { nim:'4322010003', nama:'Siti Rahayu',     ni:88, nk:90, ndi:87, akhir:88.4, grade:'B' },
    { nim:'4322010010', nama:'Nadia Sari',      ni:85, nk:87, ndi:84, akhir:85.4, grade:'B' },
    { nim:'4322010004', nama:'Reza Firmansyah', ni:0,  nk:0,  ndi:0,  akhir:0,    grade:'-' },
  ],
  industri: [
    { nama:'PT. Telkom Indonesia',   tipe:'BUMN — Telekomunikasi', mhs:18, icon:'fa-satellite-dish', clr:'#f87171,#fbbf24' },
    { nama:'PT. Tokopedia',          tipe:'Swasta — E-Commerce',   mhs:15, icon:'fa-cart-shopping',  clr:'#4f8ef7,#22d3ee' },
    { nama:'PT. Gojek',              tipe:'Swasta — Teknologi',    mhs:12, icon:'fa-motorcycle',     clr:'#34d399,#22d3ee' },
    { nama:'PT. Bank BRI',           tipe:'BUMN — Perbankan',      mhs:22, icon:'fa-landmark',       clr:'#a78bfa,#4f8ef7' },
    { nama:'PT. Pertamina',          tipe:'BUMN — Energi',         mhs:10, icon:'fa-gas-pump',       clr:'#fbbf24,#f87171' },
    { nama:'PT. Astra International',tipe:'Swasta — Otomotif',     mhs:14, icon:'fa-car',            clr:'#22d3ee,#4f8ef7' },
    { nama:'PT. PLN (Persero)',      tipe:'BUMN — Listrik',        mhs:9,  icon:'fa-bolt',           clr:'#a78bfa,#34d399' },
    { nama:'KAP Ernst & Young',      tipe:'Swasta — Konsultasi',   mhs:7,  icon:'fa-chart-line',     clr:'#f87171,#a78bfa' },
  ],
  dosen: [
    { nama:'Dr. Ir. Ahmad Setiawan, M.T.', bid:'Teknik Informatika',  email:'ahmad.s@pnj.ac.id', tlp:'+62812-0001-0001', mhs:12, init:'AS', clr:'#4f8ef7,#22d3ee' },
    { nama:'Dr. Sari Melati, M.Kom.',      bid:'Sistem Informasi',    email:'sari.m@pnj.ac.id',  tlp:'+62812-0001-0002', mhs:15, init:'SM', clr:'#34d399,#22d3ee' },
    { nama:'Dr. Budi Santosa, M.T.',       bid:'Teknik Mesin',        email:'budi.s@pnj.ac.id',  tlp:'+62812-0001-0003', mhs:10, init:'BS', clr:'#fbbf24,#f87171' },
    { nama:'Prof. Dr. Hendra Wijaya',      bid:'Teknik Sipil',        email:'hendra.w@pnj.ac.id',tlp:'+62812-0001-0004', mhs:18, init:'HW', clr:'#a78bfa,#4f8ef7' },
    { nama:'Dr. Rina Dewi, M.Ak.',         bid:'Akuntansi',           email:'rina.d@pnj.ac.id',  tlp:'+62812-0001-0005', mhs:11, init:'RD', clr:'#f87171,#fbbf24' },
    { nama:'Dr. Farida Hanum, M.M.',       bid:'Administrasi Bisnis', email:'farida.h@pnj.ac.id',tlp:'+62812-0001-0006', mhs:9,  init:'FH', clr:'#a78bfa,#34d399' },
  ],
  feed: [
    { actor:'Budi Santoso',       desc:'Mengajukan form PKL ke PT. Telkom Indonesia',            dot:'fd-blue',   badge:'Pengajuan', bc:'fb-blue',   time:'09:32 WIB' },
    { actor:'Siti Rahayu',        desc:'Laporan akhir diverifikasi oleh Dr. Budi, M.T.',          dot:'fd-green',  badge:'Selesai',   bc:'fb-green',  time:'08:15 WIB' },
    { actor:'Reza Firmansyah',    desc:'Menginput logbook bimbingan industri — minggu ke-8',      dot:'fd-amber',  badge:'Logbook',   bc:'fb-amber',  time:'07:48 WIB' },
    { actor:'PT. Gojek (Industri)',desc:'Mengirimkan nilai bimbingan 3 mahasiswa ke sistem',      dot:'fd-cyan',   badge:'Nilai',     bc:'fb-cyan',   time:'07:10 WIB' },
    { actor:'Sistem (OTOMATIS)',  desc:'Kalkulasi 198 nilai akhir berhasil dikerjakan',           dot:'fd-green',  badge:'Sistem',    bc:'fb-green',  time:'08:00 WIB' },
    { actor:'Sistem (OTOMATIS)',  desc:'5 mahasiswa mendapat peringatan deadline logbook',        dot:'fd-red',    badge:'Alert',     bc:'fb-red',    time:'00:00 WIB' },
  ],
};

// ── DOM Ready ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSessionUser();
  setDate();
  initNav();
  initSidebar();
  initSearch();
  initNotif();
  buildDashboard();
  buildMahasiswaTable();
  buildPengajuan();
  buildLogbook();
  buildLaporan();
  buildNilai();
  buildIndustri();
  buildDosen();
  animateCounters();
});

// ── Date ──────────────────────────────────────────
function setDate() {
  const el = document.getElementById('todayDate');
  if (el) el.textContent = new Date().toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

// ── Navigation ────────────────────────────────────
const PAGE_LABELS = {
  dashboard:'Beranda', mahasiswa:'Data Mahasiswa', pengajuan:'Pengajuan Masuk',
  logbook:'Monitoring Logbook', laporan:'Laporan Akhir', penilaian:'Penilaian & Nilai',
  sistem:'Log Sistem', industri:'Mitra Industri', dosen:'Dosen Pembimbing',
};

function initNav() {
  document.querySelectorAll('.sidenav-item[data-page]').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      goToPage(item.dataset.page);
    });
  });
}

function goToPage(id) {
  document.querySelectorAll('.sidenav-item').forEach(n => n.classList.remove('active'));
  const nav = document.querySelector(`.sidenav-item[data-page="${id}"]`);
  if (nav) nav.classList.add('active');

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(`page-${id}`);
  if (pg) pg.classList.add('active');

  const crumb = document.getElementById('crumbCur');
  if (crumb) crumb.textContent = PAGE_LABELS[id] || id;

  // Close mobile sidebar
  if (window.innerWidth < 840) closeMobileSidebar();
}
window.goToPage = goToPage;

// ── Sidebar (mobile) ──────────────────────────────
function initSidebar() {
  const ham = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobOverlay');

  if (ham) ham.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
  if (overlay) overlay.addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('mobOverlay')?.classList.remove('open');
}

// ── Search shortcut ───────────────────────────────
function initSearch() {
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('globalSearch')?.focus();
    }
    if (e.key === 'Escape') {
      document.getElementById('globalSearch')?.blur();
      closeAllPopups();
    }
  });
}

// ── Notifications ──────────────────────────────────
function initNotif() {
  const btn = document.getElementById('notifTrigger');
  const drop = document.getElementById('notifDrop');

  btn?.addEventListener('click', e => {
    e.stopPropagation();
    drop.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!drop?.contains(e.target) && e.target !== btn) drop?.classList.remove('open');
  });

  document.getElementById('ndClear')?.addEventListener('click', () => {
    const ndList = document.getElementById('ndList');
    ndList.innerHTML = `<div style="padding:20px;text-align:center;color:var(--txt-3);font-size:13px;"><i class="fa-regular fa-bell-slash" style="font-size:24px;display:block;margin-bottom:8px;"></i>Tidak ada notifikasi</div>`;
    const bubble = document.getElementById('notifBubble');
    if (bubble) bubble.style.display = 'none';
    showRichToast('ok', 'Notifikasi', 'Semua notifikasi telah dihapus');
  });
}

// ── Counter Animation ─────────────────────────────
function animateCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        let start = 0;
        const dur = 1200;
        const t0 = performance.now();
        const ease = t => 1 - Math.pow(1-t, 3);
        const tick = now => {
          const p = Math.min((now - t0) / dur, 1);
          el.textContent = Math.round(start + target * ease(p)).toLocaleString('id-ID');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

// ── Charts ─────────────────────────────────────────
function buildDashboard() {
  buildLineChart();
  buildDonut();
  buildFeed();
  buildScores();
}

function buildLineChart() {
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;

  const cfg = {
    labels: ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
    ds: [
      { label:'Pengajuan', data:[32,45,38,60,54,70], color:'#4f8ef7' },
      { label:'Selesai',   data:[18,30,25,48,42,58], color:'#34d399' },
    ]
  };

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: cfg.labels,
      datasets: cfg.ds.map(d => ({
        label: d.label,
        data: d.data,
        borderColor: d.color,
        backgroundColor: d.color + '18',
        borderWidth: 2,
        pointBackgroundColor: d.color,
        pointBorderColor: '#161b25',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true, tension: 0.45,
      })),
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color:'#7f8ea8', font:{ family:'Plus Jakarta Sans', size:12 }, usePointStyle:true, pointStyleWidth:8 } },
        tooltip: { backgroundColor:'#1c2333', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#e8ecf4', bodyColor:'#7f8ea8', padding:12, cornerRadius:8 },
      },
      scales: {
        x: { grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#4a566b', font:{ family:'Plus Jakarta Sans', size:11 } }, border:{ display:false } },
        y: { grid:{ color:'rgba(255,255,255,0.04)' }, ticks:{ color:'#4a566b', font:{ family:'Plus Jakarta Sans', size:11 } }, border:{ display:false } },
      },
      interaction: { mode:'index', intersect:false },
    },
  });

  // Tab filter
  document.getElementById('chartTabs')?.querySelectorAll('.tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('chartTabs').querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function buildDonut() {
  const ctx = document.getElementById('donutChart');
  const legend = document.getElementById('donutLegend');
  if (!ctx) return;

  const items = [
    { label:'Sedang PKL', val:142, color:'#4f8ef7' },
    { label:'Selesai',    val:68,  color:'#34d399' },
    { label:'Pending',    val:25,  color:'#fbbf24' },
    { label:'Belum Mulai',val:12,  color:'#f87171' },
  ];

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: items.map(i => i.label),
      datasets: [{ data: items.map(i => i.val), backgroundColor: items.map(i => i.color), borderColor:'#161b25', borderWidth:3, hoverOffset:6 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout:'72%',
      plugins: {
        legend: { display:false },
        tooltip: { backgroundColor:'#1c2333', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, titleColor:'#e8ecf4', bodyColor:'#7f8ea8', padding:12, cornerRadius:8 },
      },
    },
  });

  if (legend) {
    items.forEach(it => {
      const div = document.createElement('div');
      div.className = 'dl-item';
      div.innerHTML = `<div class="dl-dot" style="background:${it.color}"></div><span class="dl-name">${it.label}</span><span class="dl-val">${it.val}</span>`;
      legend.appendChild(div);
    });
  }
}

function buildFeed() {
  const el = document.getElementById('dashFeed');
  if (!el) return;
  DB.feed.forEach(f => {
    const d = document.createElement('div');
    d.className = 'feed-item';
    d.innerHTML = `
      <div class="feed-dot ${f.dot}"></div>
      <div class="feed-txt">
        <div class="feed-actor">${f.actor}</div>
        <div class="feed-desc">${f.desc}</div>
        <div class="feed-time">${f.time}</div>
      </div>
      <span class="feed-badge ${f.bc}">${f.badge}</span>
    `;
    el.appendChild(d);
  });
}

function buildScores() {
  const el = document.getElementById('dashScores');
  if (!el) return;
  const top5 = DB.nilai.filter(n => n.akhir > 0).slice(0, 5);
  top5.forEach((n, i) => {
    const ranks = ['rank-1','rank-2','rank-3','rank-n','rank-n'];
    const div = document.createElement('div');
    div.className = 'sc-item';
    div.onclick = () => showRichToast('info', n.nama, `Nilai akhir: ${n.akhir} — Grade ${n.grade}`);
    div.innerHTML = `
      <div class="sc-rank ${ranks[i]}">${i+1}</div>
      <div class="sc-ava" style="background:linear-gradient(135deg,${DB.mahasiswa.find(m=>m.nim===n.nim)?.clr||'#4f8ef7,#22d3ee'})">${n.nama.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
      <div class="sc-info"><div class="sc-name">${n.nama}</div><div class="sc-co">${DB.mahasiswa.find(m=>m.nim===n.nim)?.co||''}</div></div>
      <div class="sc-score">${n.akhir.toFixed(1)}</div>
    `;
    el.appendChild(div);
  });
}

// ── Mahasiswa Table ───────────────────────────────
function buildMahasiswaTable() {
  const tbody = document.getElementById('mhsBody');
  if (!tbody) return;

  const pillMap = { 'Sedang PKL':'pill-blue', 'Selesai':'pill-green', 'Pending':'pill-amber', 'Belum Mulai':'pill-red' };

  DB.mahasiswa.forEach((m, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" class="chk"></td>
      <td><span class="nim-tag">${m.nim}</span></td>
      <td>
        <div class="mhs-cell">
          <div class="mhs-ava" style="background:linear-gradient(135deg,${m.clr})">${m.init}</div>
          <div>
            <div class="mhs-name">${m.nama}</div>
            <div class="mhs-email">${m.nim.toLowerCase()}@mhs.pnj.ac.id</div>
          </div>
        </div>
      </td>
      <td>${m.jur}</td>
      <td>${m.co}</td>
      <td>${m.dos}</td>
      <td><span class="pill ${pillMap[m.st]||'pill-amber'}">${m.st}</span></td>
      <td>
        <div class="bar-cell">
          <div class="bar-track"><div class="bar-fill" style="width:${m.prog}%"></div></div>
          <span class="bar-pct">${m.prog}%</span>
        </div>
      </td>
      <td>
        <div class="act-btns">
          <button class="act-btn act-view" title="Detail" data-i="${i}"><i class="fa-solid fa-eye"></i></button>
          <button class="act-btn act-edit" title="Edit" data-i="${i}"><i class="fa-solid fa-pen"></i></button>
          <button class="act-btn act-del" title="Hapus" data-i="${i}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Row actions
  tbody.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const i = parseInt(btn.dataset.i);
    const m = DB.mahasiswa[i];
    if (btn.classList.contains('act-view')) openDetailMhs(m);
    if (btn.classList.contains('act-edit')) showRichToast('info', 'Edit Mahasiswa', `Membuka form edit untuk ${m.nama}...`);
    if (btn.classList.contains('act-del')) {
      showConfirmDialog(`Hapus data ${m.nama}?`, 'Data yang dihapus tidak dapat dikembalikan.', () => {
        showRichToast('ok', 'Berhasil', `Data ${m.nama} telah dihapus`);
        btn.closest('tr').style.transition = 'all 0.3s';
        btn.closest('tr').style.opacity = '0';
        btn.closest('tr').style.transform = 'translateX(30px)';
        setTimeout(() => btn.closest('tr').remove(), 300);
      }, 'danger');
    }
  });

  // Select all
  document.getElementById('chkAll')?.addEventListener('change', e => {
    tbody.querySelectorAll('.chk').forEach(c => c.checked = e.target.checked);
  });

  // Search
  document.getElementById('mhsSearch')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    tbody.querySelectorAll('tr').forEach(tr => {
      tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

// ── Detail Mahasiswa ──────────────────────────────
function openDetailMhs(m) {
  document.getElementById('detailMhsTitle').textContent = m.nama;
  const pillMap = { 'Sedang PKL':'pill-blue', 'Selesai':'pill-green', 'Pending':'pill-amber', 'Belum Mulai':'pill-red' };

  document.getElementById('detailMhsBody').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;padding-bottom:18px;border-bottom:1px solid var(--line);margin-bottom:18px;">
      <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,${m.clr});display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;">${m.init}</div>
      <div>
        <div style="font-size:17px;font-weight:800;">${m.nama}</div>
        <div style="font-size:12px;color:var(--txt-3);font-family:'JetBrains Mono',monospace;">${m.nim}</div>
        <span class="pill ${pillMap[m.st]} mt-2" style="display:inline-flex;margin-top:6px;">${m.st}</span>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
      ${dRow('Jurusan', m.jur)}
      ${dRow('Perusahaan PKL', m.co)}
      ${dRow('Dosen Pembimbing', m.dos)}
      ${dRow('Email', m.nim.toLowerCase()+'@mhs.pnj.ac.id')}
      ${dRow('Semester', '6 (Aktif)')}
      ${dRow('Progres PKL', m.prog + '%')}
    </div>
    <div style="margin-top:16px;">
      <div style="font-size:11px;font-weight:700;color:var(--txt-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Progress PKL</div>
      <div class="bar-track" style="height:8px;"><div class="bar-fill" style="width:${m.prog}%"></div></div>
    </div>
    <div style="margin-top:16px;padding:12px;background:var(--bg-4);border-radius:var(--r-md);border:1px solid var(--line);">
      <div style="font-size:11px;font-weight:700;color:var(--txt-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Nilai Komponen</div>
      ${(() => {
        const n = DB.nilai.find(x => x.nim === m.nim);
        if (!n || !n.akhir) return '<div style="font-size:12px;color:var(--txt-3);">Nilai belum tersedia</div>';
        return `<div style="display:flex;gap:16px;flex-wrap:wrap;">
          ${dBadge('Industri', n.ni)}
          ${dBadge('Dosen Kampus', n.nk)}
          ${dBadge('Dosen Industri', n.ndi)}
          ${dBadge('Nilai Akhir', n.akhir.toFixed(1), '#fbbf24')}
        </div>`;
      })()}
    </div>
  `;
  openPopup('popupDetailMhs');
}

function dRow(key, val) {
  return `<div><div style="font-size:11px;color:var(--txt-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">${key}</div><div style="font-size:13px;font-weight:600;">${val}</div></div>`;
}
function dBadge(key, val, clr='var(--blue)') {
  return `<div style="text-align:center;"><div style="font-size:18px;font-weight:800;color:${clr};font-family:'JetBrains Mono',monospace;">${val}</div><div style="font-size:11px;color:var(--txt-3);">${key}</div></div>`;
}

// ── Pengajuan ──────────────────────────────────────
function buildPengajuan() {
  const wrap = document.getElementById('pengajuanWrap');
  if (!wrap) return;

  DB.pengajuan.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pj-card';
    card.innerHTML = `
      <div class="pj-top">
        <div class="pj-ava" style="background:linear-gradient(135deg,${p.clr})">${p.init}</div>
        <div style="flex:1">
          <div class="pj-name">${p.nama}</div>
          <div class="pj-nim">${p.nim} · ${p.jur}</div>
        </div>
        <span class="pill pill-amber">Pending</span>
      </div>
      <div class="pj-info">
        <div class="pj-row"><i class="fa-solid fa-building"></i><span>${p.co}</span></div>
        <div class="pj-row"><i class="fa-solid fa-briefcase"></i><span>${p.pos}</span></div>
        <div class="pj-row"><i class="fa-regular fa-calendar"></i><span>Diajukan: ${p.tgl}</span></div>
      </div>
      <div class="pj-actions">
        <button class="pj-approve"><i class="fa-solid fa-check"></i> Setujui</button>
        <button class="pj-reject"><i class="fa-solid fa-xmark"></i> Tolak</button>
      </div>
    `;

    card.querySelector('.pj-approve').addEventListener('click', () => {
      showConfirmDialog(
        `Setujui pengajuan ${p.nama}?`,
        `PKL di ${p.co} sebagai ${p.pos}`,
        () => {
          removeCard(card);
          showRichToast('ok', 'Pengajuan Disetujui', `${p.nama} — ${p.co}`);
          appendTerminalLog(`OK    :: Pengajuan ${p.nama} (${p.nim}) disetujui → ${p.co}`);
        }
      );
    });

    card.querySelector('.pj-reject').addEventListener('click', () => {
      showConfirmDialog(
        `Tolak pengajuan ${p.nama}?`,
        'Mahasiswa akan mendapat notifikasi penolakan.',
        () => {
          removeCard(card);
          showRichToast('err', 'Pengajuan Ditolak', `${p.nama} — ${p.co}`);
          appendTerminalLog(`WARN  :: Pengajuan ${p.nama} ditolak oleh admin`);
        },
        'danger'
      );
    });

    wrap.appendChild(card);
  });
}

function removeCard(card) {
  card.style.transition = 'all 0.35s var(--ease)';
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9) translateY(-10px)';
  setTimeout(() => card.remove(), 350);
}

// ── Logbook ────────────────────────────────────────
function buildLogbook() {
  const list = document.getElementById('lbList');
  if (!list) return;
  DB.logbook.forEach(lb => {
    const el = document.createElement('div');
    el.className = 'lb-entry';
    el.innerHTML = `
      <div class="lb-ava" style="background:linear-gradient(135deg,${lb.clr})">${lb.init}</div>
      <div class="lb-main">
        <div class="lb-name">${lb.nama}</div>
        <div class="lb-text">${lb.ket}</div>
      </div>
      <div class="lb-meta">
        <span class="pill ${lb.tipe === 'Industri' ? 'pill-blue' : 'pill-amber'}" style="font-size:10px;">${lb.tipe}</span>
        <span class="lb-date">${lb.tgl}</span>
        <span class="pill ${lb.ok ? 'pill-green' : 'pill-amber'}" style="font-size:10px;padding:2px 7px;">${lb.ok ? 'Verified ✓' : 'Pending'}</span>
      </div>
    `;
    el.addEventListener('click', () => {
      if (!lb.ok) {
        showConfirmDialog('Verifikasi logbook ini?', `${lb.nama} — ${lb.ket.slice(0,50)}...`, () => {
          lb.ok = true;
          el.querySelector('.lb-meta span:last-child').className = 'pill pill-green';
          el.querySelector('.lb-meta span:last-child').textContent = 'Verified ✓';
          showRichToast('ok', 'Logbook Diverifikasi', lb.nama);
        });
      }
    });
    list.appendChild(el);
  });
}

// ── Laporan ────────────────────────────────────────
function buildLaporan() {
  const grid = document.getElementById('laporanGrid');
  if (!grid) return;
  const iconMap = {
    'Disetujui': { icon:'fa-file-circle-check',    bg:'rgba(52,211,153,0.15)',  clr:'#34d399' },
    'Review':    { icon:'fa-file-magnifying-glass', bg:'rgba(79,142,247,0.15)',  clr:'#4f8ef7' },
    'Pending':   { icon:'fa-file-circle-question',  bg:'rgba(251,191,36,0.15)', clr:'#fbbf24' },
  };
  DB.laporan.forEach(l => {
    const meta = iconMap[l.st] || iconMap['Pending'];
    const card = document.createElement('div');
    card.className = 'lap-card';
    card.innerHTML = `
      <div class="lap-icon" style="background:${meta.bg};color:${meta.clr};"><i class="fa-solid ${meta.icon}"></i></div>
      <div class="lap-title">${l.judul}</div>
      <div class="lap-student">${l.mhs} · ${l.nim}</div>
      <div class="lap-foot">
        <span class="lap-date">${l.tgl}</span>
        <div class="lap-acts">
          <button class="act-btn act-view" title="Lihat" onclick="showRichToast('info','Laporan','Membuka laporan PDF...')"><i class="fa-solid fa-eye"></i></button>
          <button class="act-btn act-edit" title="Download" onclick="showRichToast('ok','Download','Mengunduh ${l.mhs}.pdf...')"><i class="fa-solid fa-download"></i></button>
        </div>
      </div>
    `;
    card.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      showLaporanDetail(l, meta);
    });
    grid.appendChild(card);
  });
}

function showLaporanDetail(l, meta) {
  const overlay = document.getElementById('popupOverlay');
  // Reuse confirm popup as quick detail
  const p = document.getElementById('popupConfirm');
  document.getElementById('confirmTitle').textContent = 'Detail Laporan';
  document.getElementById('confirmIcon').style.background = meta.bg;
  document.getElementById('confirmIcon').style.color = meta.clr;
  document.getElementById('confirmIcon').innerHTML = `<i class="fa-solid ${meta.icon}"></i>`;
  document.getElementById('confirmMsg').innerHTML = `<strong style="font-size:14px;">${l.judul}</strong><br><br>
    <span style="color:var(--txt-2);font-size:12px;">Mahasiswa: ${l.mhs} (${l.nim})<br>Tanggal submit: ${l.tgl}<br>Status: ${l.st}</span>`;
  document.getElementById('confirmOkBtn').textContent = 'Download';
  document.getElementById('confirmOkBtn').className = 'btn btn-primary';
  document.getElementById('confirmOkBtn').onclick = () => {
    showRichToast('ok','Download',`Mengunduh laporan ${l.mhs}...`);
    closePopup('popupConfirm');
  };
  openPopup('popupConfirm');
}

// ── Nilai ──────────────────────────────────────────
function buildNilai() {
  const tbody = document.getElementById('nilaiBody');
  if (!tbody) return;
  const gradeClass = { 'A':'grade-A','B':'grade-B','C':'grade-C','D':'grade-D','-':'grade-x' };
  DB.nilai.forEach(n => {
    const tr = document.createElement('tr');
    const has = n.akhir > 0;
    tr.innerHTML = `
      <td><span class="nim-tag">${n.nim}</span></td>
      <td style="font-weight:700;color:var(--txt);">${n.nama}</td>
      <td style="font-family:'JetBrains Mono',monospace;">${has ? n.ni : '—'}</td>
      <td style="font-family:'JetBrains Mono',monospace;">${has ? n.nk : '—'}</td>
      <td style="font-family:'JetBrains Mono',monospace;">${has ? n.ndi : '—'}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800;color:#fbbf24;">${has ? n.akhir.toFixed(1) : '—'}</td>
      <td><div class="grade-box ${gradeClass[n.grade]||'grade-x'}">${n.grade}</div></td>
      <td><span class="pill ${has?'pill-green':'pill-amber'}">${has?'Selesai':'Proses'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ── Industri ───────────────────────────────────────
function buildIndustri() {
  const grid = document.getElementById('industriGrid');
  if (!grid) return;
  DB.industri.forEach(ind => {
    const [c1] = ind.clr.split(',');
    const card = document.createElement('div');
    card.className = 'ind-card';
    card.innerHTML = `
      <div class="ind-logo" style="background:${c1}22;color:${c1};">
        <i class="fa-solid ${ind.icon}" style="font-size:20px;"></i>
      </div>
      <div class="ind-name">${ind.nama}</div>
      <div class="ind-type">${ind.tipe}</div>
      <div class="ind-stats">
        <div><span class="is-num" style="color:var(--blue);">${ind.mhs}</span><span class="is-lbl"> Mahasiswa</span></div>
        <div><span class="is-num" style="color:var(--green);">Aktif</span><span class="is-lbl"> Status</span></div>
      </div>
    `;
    card.addEventListener('click', () => {
      showRichToast('info', ind.nama, `${ind.tipe} — ${ind.mhs} mahasiswa aktif`);
    });
    grid.appendChild(card);
  });
}

// ── Dosen ──────────────────────────────────────────
function buildDosen() {
  const grid = document.getElementById('dosenGrid');
  if (!grid) return;
  DB.dosen.forEach(d => {
    const card = document.createElement('div');
    card.className = 'dos-card';
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,${d.clr});display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;">${d.init}</div>
        <div>
          <div class="dos-name">${d.nama}</div>
          <div class="dos-title">${d.bid} · ${d.mhs} Mahasiswa</div>
        </div>
      </div>
      <div class="dos-contact">
        <div class="dos-row"><i class="fa-solid fa-envelope"></i><span>${d.email}</span></div>
        <div class="dos-row"><i class="fa-solid fa-phone"></i><span>${d.tlp}</span></div>
      </div>
    `;
    card.addEventListener('click', () => {
      showRichToast('info', d.nama, `${d.bid} — Membimbing ${d.mhs} mahasiswa`);
    });
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════════
//  POPUP / MODAL SYSTEM
// ══════════════════════════════════════════════════

function openPopup(id) {
  document.getElementById('popupOverlay').classList.add('open');
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openPopup = openPopup;

function closePopup(id) {
  document.getElementById(id).classList.remove('open');
  // If no other popup open, close overlay
  const anyOpen = document.querySelector('.popup.open');
  if (!anyOpen) {
    document.getElementById('popupOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}
window.closePopup = closePopup;

function closeAllPopups() {
  document.querySelectorAll('.popup.open').forEach(p => p.classList.remove('open'));
  document.getElementById('popupOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// Close when clicking overlay
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('popupOverlay')?.addEventListener('click', closeAllPopups);
});

// Confirm Dialog
let _confirmCb = null;
function showConfirmDialog(title, msg, onConfirm, type = 'warn') {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').textContent = msg;
  const icon = document.getElementById('confirmIcon');
  const btn = document.getElementById('confirmOkBtn');

  if (type === 'danger') {
    icon.style.background = 'rgba(248,113,113,0.15)';
    icon.style.color = '#f87171';
    icon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    btn.className = 'btn btn-danger';
    btn.textContent = 'Ya, Hapus';
  } else {
    icon.style.background = 'rgba(251,191,36,0.15)';
    icon.style.color = '#fbbf24';
    icon.innerHTML = '<i class="fa-solid fa-circle-question"></i>';
    btn.className = 'btn btn-primary';
    btn.textContent = 'Ya, Lanjutkan';
  }

  _confirmCb = onConfirm;
  btn.onclick = () => { if (_confirmCb) _confirmCb(); closePopup('popupConfirm'); };
  openPopup('popupConfirm');
}
window.showConfirmDialog = showConfirmDialog;

// Add Mahasiswa Form
function openAddMahasiswaForm() { openPopup('popupAddMhs'); }
window.openAddMahasiswaForm = openAddMahasiswaForm;

function submitAddMahasiswa() {
  const nim = document.getElementById('fNIM').value.trim();
  const nama = document.getElementById('fNama').value.trim();
  const jur = document.getElementById('fJurusan').value;
  const co = document.getElementById('fPerusahaan').value.trim();

  if (!nim || !nama || !jur || !co) {
    showRichToast('warn', 'Form tidak lengkap', 'Mohon isi semua field yang bertanda *');
    return;
  }

  showLoading('Menyimpan data mahasiswa...');
  setTimeout(() => {
    hideLoading();
    closePopup('popupAddMhs');
    showRichToast('ok', 'Berhasil Ditambahkan', `${nama} (${nim}) — ${co}`);
    appendTerminalLog(`OK    :: Mahasiswa baru ditambahkan: ${nama} (${nim}) → ${co}`);
    // Reset form
    ['fNIM','fNama','fPerusahaan'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('fJurusan').value = '';
  }, 1400);
}
window.submitAddMahasiswa = submitAddMahasiswa;

// Export Dialog
function showExportDialog() { openPopup('popupExport'); }
window.showExportDialog = showExportDialog;

function doExport() {
  const fmt = document.querySelector('input[name="exportFmt"]:checked')?.value || 'xlsx';
  showLoading(`Mengekspor data ke .${fmt}...`);
  setTimeout(() => {
    hideLoading();
    closePopup('popupExport');
    showRichToast('ok', 'Export Berhasil', `File data-pkl-${new Date().toISOString().slice(0,10)}.${fmt} siap diunduh`);
  }, 1800);
}
window.doExport = doExport;

// Flow Detail
function showFlowDetail() { openPopup('popupFlow'); }
window.showFlowDetail = showFlowDetail;

// Sistem Process Detail
const sistemInfo = {
  kalkulasi: {
    title: 'Kalkulasi & Rekapitulasi Nilai Akhir',
    desc: 'Sistem secara otomatis menghitung nilai akhir PKL dari semua komponen dengan bobot yang telah dikonfigurasi admin. Proses ini dilakukan oleh aktor <strong>Sistem</strong> dalam alur BPMN.',
    lastRun: 'Hari ini, 08:00 WIB',
    status: '198 / 247 berhasil',
    durasi: '13 detik',
  },
  verifikasi: {
    title: 'Verifikasi Jumlah Bimbingan',
    desc: 'Sistem memverifikasi bahwa minimal jumlah pertemuan bimbingan terpenuhi sebelum mahasiswa dapat submit laporan akhir.',
    lastRun: 'Kemarin, 22:00 WIB',
    status: '230 mahasiswa lolos',
    durasi: '5 detik',
  },
  simpan: {
    title: 'Menyimpan Form Pengajuan',
    desc: 'Setelah ditandatangani, sistem secara otomatis menyimpan dan mengarsipkan form pengajuan ke database.',
    lastRun: '2 hari lalu',
    status: '12 form tersimpan',
    durasi: '2 detik',
  },
  notif: {
    title: 'Notifikasi Deadline Logbook',
    desc: 'Setiap awal minggu, sistem menjalankan cron job untuk memeriksa dan mengirim reminder ke mahasiswa yang belum mengisi logbook.',
    lastRun: 'Hari ini, 00:00 WIB',
    status: '5 mahasiswa diberi peringatan',
    durasi: '3 detik',
  },
};

function showSistemDetail(key) {
  const info = sistemInfo[key];
  if (!info) return;
  document.getElementById('sistemTitle').innerHTML = `<i class="fa-solid fa-server"></i> ${info.title}`;
  document.getElementById('sistemBody').innerHTML = `
    <p style="font-size:13px;color:var(--txt-2);line-height:1.6;margin-bottom:16px;">${info.desc}</p>
    <div class="sd-meta">
      ${sdRow('Terakhir dijalankan', info.lastRun)}
      ${sdRow('Hasil', info.status)}
      ${sdRow('Durasi eksekusi', info.durasi)}
    </div>
  `;
  openPopup('popupSistem');
}
window.showSistemDetail = showSistemDetail;

function sdRow(key, val) {
  return `<div class="sd-row"><span class="sd-key">${key}</span><span class="sd-val">${val}</span></div>`;
}

function runFromModal() {
  closePopup('popupSistem');
  runSistemKalkulasi();
}
window.runFromModal = runFromModal;

// Run Sistem Kalkulasi
function runSistemKalkulasi() {
  showLoading('Menjalankan proses sistem...');
  const msgs = [
    'INFO  :: Proses kalkulasi nilai dimulai...',
    'INFO  :: Mengambil data nilai dari 247 mahasiswa',
    'OK    :: 198 nilai berhasil dikalkulasi',
    'WARN  :: 49 data nilai belum lengkap',
    'OK    :: Rekapitulasi disimpan ke database',
    'OK    :: Proses selesai dalam 13 detik',
  ];
  let i = 0;
  const interval = setInterval(() => {
    appendTerminalLog(msgs[i]);
    i++;
    if (i >= msgs.length) {
      clearInterval(interval);
      hideLoading();
      showRichToast('ok', 'Proses Selesai', 'Sistem berhasil merekap 198 nilai mahasiswa');
    }
  }, 280);
}
window.runSistemKalkulasi = runSistemKalkulasi;

// Filter Dialog (stub)
function openFilterDialog() {
  showRichToast('info', 'Filter', 'Fitur filter lanjutan sedang dikembangkan');
}
window.openFilterDialog = openFilterDialog;

// Add Industri / Dosen forms
function openAddIndustriForm() {
  showRichToast('info', 'Tambah Mitra', 'Form tambah mitra industri akan segera tersedia');
}
function openAddDosenForm() {
  showRichToast('info', 'Tambah Dosen', 'Form tambah dosen pembimbing akan segera tersedia');
}
window.openAddIndustriForm = openAddIndustriForm;
window.openAddDosenForm = openAddDosenForm;

// ══════════════════════════════════════════════════
//  TOAST NOTIFICATION
// ══════════════════════════════════════════════════
const TOAST_ICONS = {
  ok:   'fa-circle-check',
  err:  'fa-circle-xmark',
  warn: 'fa-triangle-exclamation',
  info: 'fa-circle-info',
};

function showRichToast(type, title, msg = '') {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;

  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `
    <i class="toast-i fa-solid ${TOAST_ICONS[type] || TOAST_ICONS.info}"></i>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()"><i class="fa-solid fa-xmark"></i></button>
    <div class="toast-progress"></div>
  `;

  wrap.appendChild(t);
  setTimeout(() => {
    t.classList.add('toast-out');
    setTimeout(() => t.remove(), 300);
  }, 3500);
}
window.showRichToast = showRichToast;

// ── Loading ────────────────────────────────────────
function showLoading(msg = 'Memproses...') {
  const el = document.getElementById('loadingOverlay');
  const msgEl = document.getElementById('loadingMsg');
  if (msgEl) msgEl.textContent = msg;
  el?.classList.add('active');
}
function hideLoading() {
  document.getElementById('loadingOverlay')?.classList.remove('active');
}
window.showLoading = showLoading;
window.hideLoading = hideLoading;

// ── Terminal Log ───────────────────────────────────
function appendTerminalLog(text) {
  const box = document.getElementById('terminalBox');
  if (!box) return;
  const ts = new Date().toLocaleString('sv').replace('T', ' ');
  const cls = text.includes('OK') ? 'term-ok' : text.includes('WARN') ? 'term-warn' : text.includes('ERROR') ? 'term-err' : 'term-info';
  const line = document.createElement('div');
  line.className = `term-line ${cls}`;
  line.textContent = `[${ts}] ${text}`;
  box.insertBefore(line, box.firstChild);
}

// ── Session & Auth Integration ─────────────────────
function initSessionUser() {
  try {
    const raw = localStorage.getItem('sipkl_session');
    if (!raw) return;
    const session = JSON.parse(raw);
    const fullnameEl = document.querySelector('.user-fullname');
    const badgeEl = document.querySelector('.user-badge');
    const sidebarAva = document.getElementById('sidebarAva');
    const topAvatar = document.getElementById('topAvatar');

    if (fullnameEl && session.name) fullnameEl.textContent = session.name;
    if (badgeEl && session.roleName) badgeEl.textContent = session.roleName;
    if (sidebarAva && session.initials) sidebarAva.textContent = session.initials;
    if (topAvatar && session.initials) topAvatar.textContent = session.initials;
  } catch (err) {
    console.warn('Session parse error:', err);
  }
}
window.initSessionUser = initSessionUser;

function handleLogout() {
  showConfirmDialog(
    'Keluar dari sistem?',
    'Sesi Anda akan diakhiri dan dialihkan kembali ke halaman login utama.',
    () => {
      localStorage.removeItem('sipkl_session');
      showRichToast('info', 'Logout', 'Sesi berhasil diakhiri');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 600);
    },
    'warn'
  );
}
window.handleLogout = handleLogout;

