(function () {
  'use strict';

  const panelNames = {
    overview: 'Overview',
    classes: 'Classes',
    schedule: 'Schedule',
    students: 'Students',
    instructors: 'Instructors',
    gallery: 'Gallery',
    registrations: 'Registrations',
    payments: 'Payments',
    settings: 'Settings'
  };

  const links = document.querySelectorAll('.sidebar-link[data-panel]');
  const titleEl = document.getElementById('panelTitle');

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const panelId = link.getAttribute('data-panel');
      if (!panelId) return;

      document.querySelectorAll('.sidebar-link').forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');

      document.querySelectorAll('.dashboard-panel').forEach(function (p) {
        p.classList.remove('active');
        if (p.id === 'panel-' + panelId) p.classList.add('active');
      });

      if (titleEl && panelNames[panelId]) titleEl.textContent = panelNames[panelId];
    });
  });
})();
