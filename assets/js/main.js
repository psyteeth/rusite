(function () {
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    var burger = header.querySelector('.burger');
    if (burger) {
      burger.addEventListener('click', function () {
        var open = header.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      header.querySelectorAll('.header__nav a').forEach(function (a) {
        a.addEventListener('click', function () { header.classList.remove('is-open'); });
      });
    }
  }

  // highlight current section in menu
  var links = document.querySelectorAll('.header__nav a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) map[s.id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          if (map[e.target.id]) map[e.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // blog slider arrows
  document.querySelectorAll('.feed').forEach(function (feed) {
    var track = feed.querySelector('.feed__track');
    var prev = feed.querySelector('.feed__arrow--prev');
    var next = feed.querySelector('.feed__arrow--next');
    if (!track || !prev || !next) return;
    var step = function () { var c = track.querySelector('.card'); return c ? c.getBoundingClientRect().width + 40 : track.clientWidth; };
    var update = function () {
      prev.disabled = track.scrollLeft < 5;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 5;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // image lightbox in articles
  var imgs = document.querySelectorAll('.post__body figure img');
  if (imgs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt="">';
    document.body.appendChild(lb);
    var big = lb.querySelector('img');
    imgs.forEach(function (img) {
      img.addEventListener('click', function () { big.src = img.currentSrc || img.src; big.alt = img.alt; lb.classList.add('is-open'); });
    });
    lb.addEventListener('click', function () { lb.classList.remove('is-open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('is-open'); });
  }
})();
