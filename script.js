document.addEventListener('DOMContentLoaded', function() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');

  window.addEventListener('scroll', function() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  mobileToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      setTimeout(function() {
        btn.textContent = 'Demande envoyée !';
        btn.style.background = '#22c55e';
        contactForm.reset();

        setTimeout(function() {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .why-item, .testimonial-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});