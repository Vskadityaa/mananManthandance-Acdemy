(function () {
  'use strict';

  // --- Header scroll
  const header = document.getElementById('header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // --- Schedule data
  const scheduleData = {
    mon: [
      { time: '9:00 AM', name: 'Ballet Basics', level: 'Beginner' },
      { time: '11:00 AM', name: 'Contemporary', level: 'Intermediate' },
      { time: '6:00 PM', name: 'Hip-Hop', level: 'All levels' },
    ],
    tue: [
      { time: '10:00 AM', name: 'Salsa', level: 'Beginner' },
      { time: '5:30 PM', name: 'Jazz', level: 'Intermediate' },
      { time: '7:00 PM', name: 'Bollywood', level: 'All levels' },
    ],
    wed: [
      { time: '9:30 AM', name: 'Ballet', level: 'Advanced' },
      { time: '4:00 PM', name: 'Hip-Hop Kids', level: 'Kids' },
      { time: '6:30 PM', name: 'Contemporary', level: 'All levels' },
    ],
    thu: [
      { time: '10:00 AM', name: 'Salsa', level: 'Intermediate' },
      { time: '6:00 PM', name: 'Hip-Hop', level: 'Beginner' },
      { time: '7:30 PM', name: 'Jazz', level: 'All levels' },
    ],
    fri: [
      { time: '9:00 AM', name: 'Ballet', level: 'All levels' },
      { time: '5:00 PM', name: 'Bollywood', level: 'Beginner' },
      { time: '6:30 PM', name: 'Contemporary', level: 'Advanced' },
    ],
    sat: [
      { time: '10:00 AM', name: 'Open Workshop', level: 'All' },
      { time: '12:00 PM', name: 'Salsa Social', level: 'All levels' },
      { time: '2:00 PM', name: 'Hip-Hop', level: 'All levels' },
    ],
  };

  const scheduleList = document.getElementById('scheduleList');
  const scheduleTabs = document.querySelectorAll('.schedule-tab');

  function renderSchedule(day) {
    const items = scheduleData[day] || [];
    if (!scheduleList) return;
    scheduleList.innerHTML = items
      .map(
        (item) => `
      <div class="schedule-item">
        <span class="time">${item.time}</span>
        <span class="name">${item.name}</span>
        <span class="level">${item.level}</span>
      </div>
    `
      )
      .join('');
  }

  scheduleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      scheduleTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderSchedule(tab.getAttribute('data-day'));
    });
  });
  renderSchedule('mon');

  // --- Testimonials slider
  const track = document.querySelector('.testimonials-track');
  const dotsContainer = document.getElementById('testimonialDots');
  const testimonials = document.querySelectorAll('.testimonial');

  if (track && dotsContainer && testimonials.length) {
    let index = 0;
    const total = testimonials.length;

    testimonials.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) btn.classList.add('active');
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    });

    const dots = dotsContainer.querySelectorAll('button');

    function goTo(i) {
      index = ((i % total) + total) % total;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === index));
    }

    setInterval(() => goTo(index + 1), 5000);
  }

  // --- Scroll-triggered animations
  const animated = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  animated.forEach((el) => observer.observe(el));

  // --- Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      // Simulate submit (replace with real API later)
      setTimeout(() => {
        btn.textContent = 'Sent! We\'ll be in touch.';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
        }, 3000);
      }, 800);
    });
  }

  // --- Optional: cursor glow follow (desktop)
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(min-width: 901px)').matches) {
    let x = 0,
      y = 0;
    document.addEventListener('mousemove', (e) => {
      x = e.clientX;
      y = e.clientY;
    });
    function updateGlow() {
      cursorGlow.style.left = x + 'px';
      cursorGlow.style.top = y + 'px';
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }
})();
