/* ==========================================================================
   EV BOSS Luxury Dealership - Application Engine
   Focused Edition: Jetour & Deepal Official Collection
   ========================================================================== */

// Vehicle Data Store - Exclusive Deepal & Jetour Inventory
const VEHICLES = [
  {
    id: 'jetour-t2-2026',
    name: 'JETOUR T2 2026',
    dealType: 'ADVENTURE 4X4',
    badge: 'NEW',
    mileage: 'New 100%',
    fuel: 'Hybrid',
    transmission: 'Auto',
    buyPrice: '$49,800',
    buyNumeric: 49800,
    cropImg: 'assets/cars/jetour-t2-hero.jpg',
    hdImg: 'assets/cars/jetour-t2-hero.jpg',
    category: 'jetour',
    type: '4x4 Off-Road SUV',
    year: 2026,
    specs: {
      engine: '2.0L Turbo Direct-Injection + XWD Intelligent 4WD System',
      horsepower: '254 HP & 390 Nm Torque',
      acceleration: '0-60 mph in 7.1s',
      topSpeed: '124 mph',
      drivetrain: 'BorgWarner 6th-Gen Torque Manager with Electronic Rear Differential Lock',
      fuelEconomy: '24 City / 29 Highway MPG',
      interior: 'Desert Khaki Leather with 15.6-inch Snapdragon 8155 Cockpit & Sony 12-Speaker Sound',
      warranty: '5-Year / 60,000-Mile Factory All-Terrain Warranty'
    },
    description: 'The 2026 Jetour T2 (Traveller) redefines the modern adventure SUV. Combining rugged military-inspired geometry with high-luxury appointments, laser-cut matrix LED headlights, wading sensor, and fully automated multi-terrain response modes.'
  },
  {
    id: 'deepal-s07-2026',
    name: 'DEEPAL S07 2026',
    dealType: 'PURE ELECTRIC',
    badge: 'NEW',
    mileage: 'New 100%',
    fuel: 'Electric',
    transmission: 'Auto',
    buyPrice: '$46,500',
    buyNumeric: 46500,
    cropImg: 'assets/cars/deepal-s07-hero.jpg',
    hdImg: 'assets/cars/deepal-s07-hero.jpg',
    category: 'deepal',
    type: 'Electric Luxury SUV',
    year: 2026,
    specs: {
      engine: 'EPA1 High-Efficiency Electric Powertrain (79.97 kWh Ternary Lithium Battery)',
      horsepower: '258 HP & 320 Nm Instant Torque',
      acceleration: '0-60 mph in 6.7s',
      topSpeed: '112 mph',
      drivetrain: 'Rear-Wheel Drive (RWD) with 50:50 Golden Weight Distribution',
      fuelEconomy: '385 Miles Ultra-Long Electric Range (CLTC) / DC Fast Charge 30%-80% in 15 mins',
      interior: 'Sunset Orange Cloud Zero-Gravity Dual Reclining Seats & 15.6-inch Sunflower Rotating Display',
      warranty: '8-Year / 100,000-Mile Electric Battery & Drive Unit Warranty'
    },
    description: 'The 2026 Deepal S07 represents the bleeding edge of futuristic electric design. Featuring frameless doors, interactive front programmable matrix LED petals, augmented reality head-up display (AR-HUD), and an aerodynamic coefficient of just 0.258 Cd.'
  }
];

// Application State
const state = {
  currentFilter: 'all',
  searchQuery: '',
  selectedVehicle: null,
  activePage: 'home'
};

// SVG Icons
const ICONS = {
  gauge: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 12l3.5-3.5"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    <path d="M7.5 15.5h.01M16.5 15.5h.01M12 6.5v.01"/>
  </svg>`,
  petrol: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="5" width="10" height="15" rx="2"/>
    <path d="M6 9h4"/>
    <path d="M13 10h1.5a1.5 1.5 0 0 1 1.5 1.5V17a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-7l-2.5-3"/>
  </svg>`,
  electric: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>`,
  hybrid: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>`,
  autoGear: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="18" r="1.5" fill="currentColor"/>
    <path d="M6 7.5v9M18 7.5v9M6 12h12"/>
  </svg>`,
  arrowDiagonal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 7h10v10M7 7l10 10"/>
  </svg>`
};

// DOM Initializer
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initNavigation();
  initFilters();
  initSearch();
  initModals();
  renderGrid();
});

// Cinematic Hero Slider (Jetour T2 & Deepal S07)
let heroCurrentIndex = 0;
let heroAutoplayTimer = null;
let heroIsPlaying = true;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide-item');
  const dots = document.querySelectorAll('.hero-p-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const playPauseBtn = document.getElementById('heroPlayPauseBtn');

  if (!slides || slides.length === 0) return;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    heroCurrentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    heroAutoplayTimer = setInterval(() => {
      showSlide(heroCurrentIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (heroAutoplayTimer) {
      clearInterval(heroAutoplayTimer);
      heroAutoplayTimer = null;
    }
  }

  // Dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      if (heroIsPlaying) startAutoplay();
    });
  });

  // Next / Prev buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(heroCurrentIndex + 1);
      if (heroIsPlaying) startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(heroCurrentIndex - 1);
      if (heroIsPlaying) startAutoplay();
    });
  }

  // Play / Pause toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      heroIsPlaying = !heroIsPlaying;
      const pauseIcon = playPauseBtn.querySelector('.icon-pause');
      const playIcon = playPauseBtn.querySelector('.icon-play');
      if (heroIsPlaying) {
        startAutoplay();
        if (pauseIcon) pauseIcon.style.display = 'block';
        if (playIcon) playIcon.style.display = 'none';
        showToast('Slideshow resumed');
      } else {
        stopAutoplay();
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'block';
        showToast('Slideshow paused');
      }
    });
  }

  startAutoplay();
}

// Render Vehicle Grid
function renderGrid() {
  const container = document.getElementById('carsGrid');
  if (!container) return;

  const filtered = VEHICLES.filter(v => {
    // Tab filter
    if (state.currentFilter === 'jetour' && v.category !== 'jetour') return false;
    if (state.currentFilter === 'deepal' && v.category !== 'deepal') return false;

    // Search query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q);
      const matchFuel = v.fuel.toLowerCase().includes(q);
      const matchType = v.dealType.toLowerCase().includes(q);
      if (!matchName && !matchFuel && !matchType) return false;
    }

    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-results">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <h3>No matching vehicles found</h3>
        <p>Try resetting the filter tabs.</p>
        <button class="btn-primary-action" style="max-width: 180px; margin: 16px auto 0;" onclick="resetFilters()">View All</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(v => {
    const fuelIcon = v.fuel === 'Electric' ? ICONS.electric : (v.fuel === 'Hybrid' ? ICONS.hybrid : ICONS.petrol);

    return `
      <article class="car-card" data-id="${v.id}">
        <div>
          <!-- Card Header -->
          <div class="card-header">
            <div class="card-title-group">
              <h3 class="card-model-name">${v.name}</h3>
              <span class="card-deal-type">${v.dealType}</span>
            </div>
            <span class="card-badge">${v.badge}</span>
          </div>

          <!-- Car Image -->
          <div class="card-image-wrap" onclick="openVehicleDetail('${v.id}')">
            <img class="card-car-img" src="${v.cropImg}" alt="${v.name}" loading="lazy">
          </div>

          <!-- Specs Row -->
          <div class="card-specs-row">
            <div class="spec-item">
              ${ICONS.gauge}
              <span>${v.mileage}</span>
            </div>
            <div class="spec-item">
              ${fuelIcon}
              <span>${v.fuel}</span>
            </div>
            <div class="spec-item">
              ${ICONS.autoGear}
              <span>${v.transmission}</span>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <div class="card-pricing-block">
            <div class="price-row-buy"><span class="price-label">Price:</span> <span class="price-val">${v.buyPrice}</span></div>
          </div>
          <button class="btn-see-more" onclick="openVehicleDetail('${v.id}')">
            SEE MORE ${ICONS.arrowDiagonal}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// Navigation Handler
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-target');
      navigateTo(targetPage);
    });
  });

  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      showToast('Call us directly at: 055167104');
    });
  }
}

function navigateTo(page) {
  state.activePage = page;
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-target') === page);
  });

  const showcase = document.getElementById('showcaseSection');
  const heroSlider = document.getElementById('heroSlider');
  const controlsBanner = document.querySelector('.controls-banner');
  const newsSec = document.getElementById('newsSection');

  if (page === 'home') {
    if (heroSlider) heroSlider.style.display = 'block';
    if (controlsBanner) controlsBanner.style.display = 'block';
    if (showcase) showcase.style.display = 'block';
    if (newsSec) newsSec.classList.remove('active');
    resetFilters();
  } else if (page === 'news') {
    if (heroSlider) heroSlider.style.display = 'none';
    if (controlsBanner) controlsBanner.style.display = 'none';
    if (showcase) showcase.style.display = 'none';
    if (newsSec) newsSec.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Tab Filter Handlers
function initFilters() {
  const tabs = document.querySelectorAll('.tab-pill');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentFilter = tab.getAttribute('data-filter');
      renderGrid();
    });
  });
}

function resetFilters() {
  state.currentFilter = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('carSearch');
  if (searchInput) searchInput.value = '';
  const tabs = document.querySelectorAll('.tab-pill');
  tabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-filter') === 'all');
  });
  renderGrid();
}

// Real-time Search Handler
function initSearch() {
  const searchInput = document.getElementById('carSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    renderGrid();
  });
}

// Modal Systems
function initModals() {
  // Detail Modal
  const detailModal = document.getElementById('vehicleDetailModal');
  const closeDetail = document.getElementById('closeDetailModal');
  if (closeDetail && detailModal) {
    closeDetail.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) detailModal.classList.remove('active');
    });
  }

  // Contact Modal
  const contactModal = document.getElementById('contactModal');
  const closeContact = document.getElementById('closeContactModal');
  const contactButtons = document.querySelectorAll('.trigger-contact');
  
  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });

  if (closeContact && contactModal) {
    closeContact.addEventListener('click', () => {
      contactModal.classList.remove('active');
    });
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) contactModal.classList.remove('active');
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('leadContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactModal.classList.remove('active');
      showToast('Thank you! Inquiry dispatched to wonder.ahiable@gmail.com and 055167104. We will contact you within 15 minutes.');
      contactForm.reset();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (detailModal) detailModal.classList.remove('active');
      if (contactModal) contactModal.classList.remove('active');
    }
  });
}

// Open Car Detail Modal
function openVehicleDetail(id) {
  const v = VEHICLES.find(car => car.id === id);
  if (!v) return;
  state.selectedVehicle = v;

  const modal = document.getElementById('vehicleDetailModal');
  const title = document.getElementById('modalTitle');
  const badge = document.getElementById('modalBadge');
  const dealType = document.getElementById('modalDealType');
  const img = document.getElementById('modalImg');
  const desc = document.getElementById('modalDesc');
  const specsTable = document.getElementById('modalSpecsBody');
  const buyPriceEl = document.getElementById('modalBuyPrice');

  if (title) title.innerText = v.name;
  if (badge) badge.innerText = v.badge;
  if (dealType) dealType.innerText = v.dealType;
  if (img) {
    img.src = v.cropImg;
    img.alt = v.name;
  }
  if (desc) desc.innerText = v.description;
  if (buyPriceEl) buyPriceEl.innerText = v.buyPrice;

  if (specsTable) {
    specsTable.innerHTML = `
      <tr><td>Engine / Powertrain</td><td>${v.specs.engine}</td></tr>
      <tr><td>Performance Output</td><td>${v.specs.horsepower}</td></tr>
      <tr><td>Acceleration (0-60 mph)</td><td>${v.specs.acceleration}</td></tr>
      <tr><td>Top Speed</td><td>${v.specs.topSpeed}</td></tr>
      <tr><td>Drivetrain System</td><td>${v.specs.drivetrain}</td></tr>
      <tr><td>Efficiency / Range</td><td>${v.specs.fuelEconomy}</td></tr>
      <tr><td>Interior Trim & Tech</td><td>${v.specs.interior}</td></tr>
      <tr><td>Warranty Coverage</td><td>${v.specs.warranty}</td></tr>
    `;
  }

  setupModalCalculator(v);
  modal.classList.add('active');
}

// Interactive Financing Calculator inside modal
function setupModalCalculator(v) {
  const calcContainer = document.getElementById('modalCalculator');
  if (!calcContainer) return;

  calcContainer.innerHTML = `
    <h4 style="font-size: 14px; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; color: var(--dark);">Estimate Monthly Financing</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
      <div class="form-group">
        <label style="font-size: 12px;">Down Payment ($)</label>
        <input type="number" id="financeDownInput" class="form-control" value="${Math.round(v.buyNumeric * 0.2)}" step="1000" oninput="updateFinanceCalc()">
      </div>
      <div class="form-group">
        <label style="font-size: 12px;">Term</label>
        <select id="financeTermSelect" class="form-control" onchange="updateFinanceCalc()">
          <option value="36">36 Months (4.9% APR)</option>
          <option value="48">48 Months (5.4% APR)</option>
          <option value="60" selected>60 Months (5.9% APR)</option>
          <option value="72">72 Months (6.4% APR)</option>
        </select>
      </div>
    </div>
    <div class="calc-result-box">
      <div>
        <div style="font-size: 12px; color: var(--text-muted);">Estimated Monthly Payment</div>
        <div class="calc-result-val" id="financeMonthlyEstimate">$0</div>
      </div>
      <button class="btn-primary-action" style="flex: initial; padding: 8px 18px;" onclick="inquirePurchaseFromModal()">Get Pre-Approved</button>
    </div>
  `;

  updateFinanceCalc();
}

function updateFinanceCalc() {
  const v = state.selectedVehicle;
  if (!v || !v.buyNumeric) return;
  const down = parseFloat(document.getElementById('financeDownInput')?.value || 0);
  const months = parseInt(document.getElementById('financeTermSelect')?.value || 60, 10);
  
  const principal = Math.max(0, v.buyNumeric - down);
  const apr = 0.059;
  const monthlyRate = apr / 12;
  const monthly = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  
  const el = document.getElementById('financeMonthlyEstimate');
  if (el) el.innerText = '$' + Math.round(monthly).toLocaleString() + '/mo';
}

function inquirePurchaseFromModal() {
  const v = state.selectedVehicle;
  document.getElementById('vehicleDetailModal')?.classList.remove('active');
  openContactModal(`I would like to inquire about purchasing the ${v.name} (${v.buyPrice}). Please call me at 055167104.`);
}

// Contact Modal with prefill support
function openContactModal(prefillMessage = '') {
  const modal = document.getElementById('contactModal');
  const select = document.getElementById('contactVehicleSelect');
  const messageInput = document.getElementById('contactMessage');

  if (select) {
    select.innerHTML = '<option value="">-- Select Model (Optional) --</option>' +
      VEHICLES.map(v => `<option value="${v.name}">${v.name} (${v.dealType} - ${v.buyPrice})</option>`).join('');
    
    if (state.selectedVehicle) {
      select.value = state.selectedVehicle.name;
    }
  }

  if (messageInput && prefillMessage) {
    messageInput.value = prefillMessage;
  }

  if (modal) modal.classList.add('active');
}

// Toast System
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
