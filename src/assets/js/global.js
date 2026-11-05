window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sazon: {
          marfil: '#F4F4E8',
          cacao: '#643B22',
          cacaoText: '#F4F4E8',
          verdeNoche: '#114622',
          verdeHondo: '#215B33',
          verdeHoja: '#3D8E33',
          hoja: '#7FBA00',
          verdeNutresa: '#1B4332',
          verdeNutresaCard: '#133326',
          verdeNeon: '#66d149',
          texto: '#3F4040',
          texto2: '#5B5E60',
          brandZenu: '#D32F2F',
          brandDoria: '#E65100',
          brandPietran: '#2E7D32',
          brandNoel: '#C2185B'
        }
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      }
    }
  }
};
if (typeof tailwind !== 'undefined') {
  tailwind.config = window.tailwind.config;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !overlay) return;
  const isHidden = sidebar.classList.contains('-translate-x-full');
  if (isHidden) {
    sidebar.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('opacity-0');
    setTimeout(() => overlay.classList.add('hidden'), 300);
    document.body.style.overflow = '';
  }
}

function showToast(message) {
  const toast = document.getElementById('custom-toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => toast.classList.add('hidden'), 3500);
}

function switchTheme(theme) {
  const html = document.documentElement;
  const dayBtn = document.getElementById('themeDayBtn');
  const nightBtn = document.getElementById('themeNightBtn');
  
  if (theme === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
    try { localStorage.setItem('sazon_theme', 'dark'); } catch(e) {}
    if (dayBtn && nightBtn) {
      nightBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D8E33] text-white font-bold shadow-sm transition-all duration-200';
      dayBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200';
    }
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    try { localStorage.setItem('sazon_theme', 'light'); } catch(e) {}
    if (dayBtn && nightBtn) {
      dayBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#3D8E33] text-white font-bold shadow-sm transition-all duration-200';
      nightBtn.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200';
    }
  }
}
window.switchTheme = switchTheme;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = window.tailwind.config;
  }

  if (document.getElementById('themeDayBtn')) {
    try {
      const savedTheme = localStorage.getItem('sazon_theme');
      if (savedTheme === 'dark') {
        switchTheme('dark');
      } else {
        switchTheme('light');
      }
    } catch(e) {
      switchTheme('light');
    }

    document.getElementById('themeDayBtn')?.addEventListener('click', () => switchTheme('light'));
    document.getElementById('themeNightBtn')?.addEventListener('click', () => switchTheme('dark'));
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }

  document.querySelectorAll('[data-action="toggle-sidebar"]').forEach(el => {
    el.addEventListener('click', toggleSidebar);
  });

  document.getElementById('btn-notifications')?.addEventListener('click', () => {
    showToast('Tienes recetas recomendadas en tu despensa');
  });

  document.getElementById('user-profile')?.addEventListener('click', () => {
    showToast('Sesión activa: Mariana Morales (Chef de Comunidad)');
  });

  const searchForm = document.getElementById('search-form');
  searchForm?.addEventListener('submit', (e) => e.preventDefault());

  const searchInput = document.getElementById('global-search');
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      showToast('Buscando: ' + searchInput.value);
    }
  });
});
