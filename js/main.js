
(() => {
  'use strict';

  const SHOW_PLACEHOLDERS = true;

  /* flow.type: 'in' (cyan) | 'mid' (indigo) | 'out' (emerald) */
  const PROJECTS = [
    {
      id: 'djezzy-big-data-ml',
      accent: 'indigo',
      category: 'Big Data & Machine Learning Engineering',
      title: 'Big Data Platform at a Telecom Company (Djezzy): POS Analytics & ML',
      context: "Master's final-year project at Djezzy",
      objective: 'Analyze and predict the behavior of points of sale with big data and machine learning, to optimize performance and distribution networks.',
      stack: ['Apache NiFi', 'Apache Kafka', 'ClickHouse', 'Apache Airflow', 'Python', 'Docker', 'XGBoost', 'K-Means'],
      flow: [
  { label: 'Multi-Source Data Ingestion', type: 'in' },
  { label: 'Event Streaming Layer', type: 'in' },
  { label: 'Analytical Storage', type: 'mid' },
  { label: 'ML Analytics & Scoring', type: 'out' }
            ],
      bar: 'Orchestrated end to end by Apache Airflow, containerized with Docker',
      highlights: [
  'Architected and deployed a fully containerized Big Data platform covering the entire lifecycle from multi-frequency ingestion to predictive analytics.',
  'Engineered a hybrid processing architecture: a Hot Path (NiFi + Kafka) for low-latency streaming alerts and a Cold Path for high-performance OLAP analytics in ClickHouse.',
  'Designed a Medallion Architecture using dbt and Kimball Star Schema modeling with SCD to preserve historical business trends.',
  'Automated pipeline orchestration using Apache Airflow, incorporating retry policies, backpressure handling, SLA tracking, and real-time failure alerts.',
  'Built an In-Warehouse Feature Store directly in ClickHouse to drive rapid feature engineering for Machine Learning workloads.',
  'Deployed Machine Learning solutions to solve key business challenges: behavioral segmentation, proactive POS dormancy prediction, and transaction volume forecasting with automated concept drift detection.',
  'Surfaced actionable business intelligence through interactive Apache Superset dashboards, enabling spatial risk analysis and 7-day forward-looking forecasting.'
],
      metrics: [
        { value: 'Full lifecycle', label: 'ingestion to insights' },
        { value: '3', label: 'machine learning use cases' },
        { value: 'Batch + stream', label: 'ingestion modes' }
      ],
      links: [],
      cover: null,
      gallery: [
        { type: 'image', src: 'assets/p1_global_arch.png', alt: 'Global architecture', caption: 'Global architecture' },
       
        { type: 'image', src: 'assets/p1_medallion.png', alt: 'Medallion architecture', caption: 'Medallion architecture' },
      ]
    },
    {
      id: 'data-warehouse-bi',
      accent: 'cyan',
      category: 'Data Warehousing & Business Intelligence',
      title: 'Data Warehouse & Business Intelligence',
      context: 'Personal project',
      objective: 'Design a data warehouse and interactive dashboards to analyze company performance.',
      stack: ['Data warehouse', 'Dimensional modeling', 'ETL', 'Interactive dashboards'],
      flow: [
        { label: 'Source data', type: 'in' },
        { label: 'ETL processes', type: 'in' },
        { label: 'Dimensional warehouse', type: 'mid' },
        { label: 'Interactive dashboards', type: 'out' }
      ],
      bar: 'From operational data to company performance insights',
      highlights: [
        'Designed a data warehouse based on dimensional modeling.',
        'Implemented ETL processes to load and prepare the data.',
        'Developed interactive dashboards to analyze company performance.'
      ],
      metrics: [
        { value: 'Dimensional', label: 'data model' },
        { value: 'ETL', label: 'loading processes' },
        { value: 'Interactive', label: 'dashboards' }
      ],
      links: [{ label: 'View on GitHub', href: 'https://github.com/medanis7/BI-Project.git' }],
      cover: null,
      gallery: [
       { type: 'image', src: 'assets/p2_dashboard1.png', alt: 'Medallion architecture', caption: 'Medallion architecture' },
       { type: 'image', src: 'assets/p2_dashboard2.png', alt: 'Medallion architecture', caption: 'Medallion architecture' },
      ]
    },
    {
      id: 'skin-safe',
      accent: 'emerald',
      category: 'Deep Learning & Mobile Development',
      title: 'Skin Safe: skin cancer detection with deep learning',
      context: "Bachelor's final-year project",
      objective: 'A mobile app that detects skin cancer from images using a convolutional neural network.',
      stack: ['Python', 'CNN (Deep Learning)', 'Flutter', 'Firebase'],
      flow: [
        { label: 'Skin images', type: 'in' },
        { label: 'Preprocessing', type: 'in' },
        { label: 'CNN model (Python)', type: 'mid' },
        { label: 'Flutter app', type: 'out' }
      ],
      bar: 'User authentication and data storage on Firebase',
      highlights: [
        'Designed and developed a mobile application that integrates an image classification model for skin cancer detection.',
        'Preprocessed the images, then trained and evaluated the convolutional neural network in Python.',
        'Integrated the model into a Flutter application with user authentication and data storage on Firebase.'
      ],
      metrics: [
        { value: 'CNN', label: 'image classification' },
        { value: 'Flutter', label: 'mobile app' },
        { value: 'Firebase', label: 'auth and storage' }
      ],
      links: [{ label: 'View on Kaggle', href: 'https://www.kaggle.com/code/anismd7/notebook5f697ff691' }],
      cover: null,
      gallery: [
        { type: 'video', src: 'assets/p3_skin_safe.mp4', poster: 'assets/p3_skin_safe_poster.jpg', caption: 'Teaser' },

      ]
    }
  ];

  /* ---------------------------------------------------------
     Helpers
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smooth = () => (reduceMotion.matches ? 'auto' : 'smooth');
  const icon = (id, size = 18) =>
    `<svg class="icon" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  const galleryOf = (p) => (p.gallery || []).filter((g) => SHOW_PLACEHOLDERS || g.type !== 'placeholder');

  /* ---------------------------------------------------------
     Media pieces
     --------------------------------------------------------- */
  function diagramEl(p) {
    const el = document.createElement('div');
    el.className = 'media';
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Architecture: ' + p.flow.map((n) => n.label).join(', then '));
    const nodes = p.flow
      .map((n, i) =>
        `${i ? `<span class="flow__sep" aria-hidden="true">${icon('chevron-right', 16)}</span>` : ''}<span class="node node--${n.type}">${n.label}</span>`)
      .join('');
    el.innerHTML = `<div class="media__inner"><div class="flow">${nodes}</div>${p.bar ? `<p class="flow__bar">${p.bar}</p>` : ''}</div>`;
    return el;
  }

  function imageEl(item, fallbackAlt) {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || fallbackAlt;
    img.loading = 'lazy';
    img.draggable = false;
    return img;
  }

  function videoEl(item, fallbackLabel) {
    const v = document.createElement('video');
    v.src = item.src;
    if (item.poster) v.poster = item.poster;
    v.controls = true;
    v.playsInline = true;
    v.preload = 'metadata';
    v.setAttribute('aria-label', item.alt || item.caption || fallbackLabel);
    return v;
  }

  function placeholderEl(item) {
    const el = document.createElement('div');
    el.className = 'slide-ph';
    el.innerHTML = `${icon('image', 40)}<p class="slide-ph__title">${item.caption || 'Image or video'}</p><p class="slide-ph__hint">Placeholder: add your file in js/main.js</p>`;
    return el;
  }

  /* Card media: your cover image, or the generated diagram */
  function buildCardMedia(p) {
    if (p.cover) {
      const wrap = document.createElement('div');
      wrap.className = 'media media--file';
      const inner = document.createElement('div');
      inner.className = 'media__inner';
      inner.style.height = '100%';
      inner.append(imageEl(p.cover, p.title));
      wrap.append(inner);
      return wrap;
    }
    return diagramEl(p);
  }

  /* ---------------------------------------------------------
     Carousel of projects
     --------------------------------------------------------- */
  const root = $('#carousel');
  const track = $('.carousel__track', root);
  const dotsWrap = $('.carousel__dots', root);
  const prevBtn = $('[data-dir="-1"]', root);
  const nextBtn = $('[data-dir="1"]', root);
  let cards = [];

  const badgesHTML = (stack, limit = Infinity) => {
    const shown = stack.slice(0, limit);
    const extra = stack.length - shown.length;
    return shown.map((t) => `<li class="badge">${t}</li>`).join('')
      + (extra > 0 ? `<li class="badge">+${extra} more</li>` : '');
  };
  const factsHTML = (metrics) =>
    metrics.map((m) => `<div><dt>${m.label}</dt><dd>${m.value}</dd></div>`).join('');

  function buildCards() {
    PROJECTS.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.accent = p.accent;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${i + 1} of ${PROJECTS.length}: ${p.title}`);

      const media = document.createElement('div');
      media.className = 'card__media';
      media.append(buildCardMedia(p));
      const extras = galleryOf(p).length;
      if (extras) {
        const chip = document.createElement('span');
        chip.className = 'media-chip';
        chip.innerHTML = `${icon('image', 15)} ${extras} ${extras === 1 ? 'photo or video' : 'photos & videos'}`;
        media.append(chip);
      }
      media.addEventListener('click', () => openProject(i, card));

      const body = document.createElement('div');
      body.className = 'card__body';
      body.innerHTML = `
        <p class="category">${p.category}</p>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__objective">${p.objective}</p>
        <ul class="badges" aria-label="Technology stack">${badgesHTML(p.stack, 5)}</ul>
        <dl class="facts">${factsHTML(p.metrics)}</dl>
        <div class="card__cta"><button class="btn btn--primary" type="button">View project details</button></div>`;
      $('button', body).addEventListener('click', () => openProject(i, card));

      card.append(media, body);
      track.append(card);

      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Show project ${i + 1}: ${p.title}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.append(dot);
    });
    cards = $$('.card', track);
  }

  const padLeft = () => parseFloat(getComputedStyle(track).paddingLeft) || 0;
  const cardLeft = (i) => cards[i].offsetLeft - padLeft();

  function currentIndex() {
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 4) return cards.length - 1;
    let best = 0, bestDist = Infinity;
    cards.forEach((_, i) => {
      const d = Math.abs(cardLeft(i) - track.scrollLeft);
      if (d < bestDist) { best = i; bestDist = d; }
    });
    return best;
  }

  function goTo(i, behavior = smooth()) {
    const idx = Math.max(0, Math.min(cards.length - 1, i));
    track.scrollTo({ left: cardLeft(idx), behavior });
  }

  function syncControls() {
    const idx = currentIndex();
    $$('.dot', dotsWrap).forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }

  function initCarousel() {
    buildCards();
    let ticking = false;
    track.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { syncControls(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', syncControls);

    prevBtn.addEventListener('click', () => goTo(currentIndex() - 1));
    nextBtn.addEventListener('click', () => goTo(currentIndex() + 1));

    track.addEventListener('keydown', (e) => {
      if (e.target !== track) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(currentIndex() - 1); }
    });

    // Mouse drag (touch and trackpads already scroll natively)
    let down = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if (e.target.closest('button, video, a')) return;
      down = true; moved = 0; startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      track.scrollLeft = startScroll - dx;
    });
    const endDrag = () => {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      if (moved > 4) goTo(currentIndex());
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', (e) => {
      if (moved > 4) { e.preventDefault(); e.stopPropagation(); moved = 0; }
    }, true);
    track.addEventListener('dragstart', (e) => e.preventDefault());

    syncControls();
  }

  /* ---------------------------------------------------------
     Gallery inside the dialog (swipe through images and videos)
     --------------------------------------------------------- */
  function buildGallery(p) {
    const slides = [];
    if (p.cover) slides.push({ type: 'image', src: p.cover.src, alt: p.cover.alt, caption: p.cover.caption });
    slides.push({ type: 'diagram', caption: 'Architecture' });
    slides.push(...galleryOf(p));

    const g = document.createElement('div');
    g.className = 'gallery';
    g.setAttribute('role', 'region');
    g.setAttribute('aria-roledescription', 'carousel');
    g.setAttribute('aria-label', `${p.title}: photos and videos`);

    const gTrack = document.createElement('div');
    gTrack.className = 'gallery__track';
    gTrack.tabIndex = 0;

    slides.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'gallery__slide';
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
      if (s.type === 'image') slide.append(imageEl(s, p.title));
      else if (s.type === 'video') slide.append(videoEl(s, `Video of ${p.title}`));
      else if (s.type === 'placeholder') slide.append(placeholderEl(s));
      else slide.append(diagramEl(p));
      if (s.caption && s.type !== 'placeholder' && s.type !== 'diagram') {
        const cap = document.createElement('p');
        cap.className = 'gallery__caption';
        cap.textContent = s.caption;
        slide.append(cap);
      }
      gTrack.append(slide);
    });
    g.append(gTrack);

    if (slides.length > 1) {
      const prev = document.createElement('button');
      prev.type = 'button'; prev.className = 'gallery__nav gallery__nav--prev';
      prev.setAttribute('aria-label', 'Previous image or video');
      prev.innerHTML = icon('chevron-left', 20);
      const next = document.createElement('button');
      next.type = 'button'; next.className = 'gallery__nav gallery__nav--next';
      next.setAttribute('aria-label', 'Next image or video');
      next.innerHTML = icon('chevron-right', 20);

      const bar = document.createElement('div');
      bar.className = 'gallery__bar';
      const dots = document.createElement('div');
      dots.className = 'carousel__dots';
      dots.setAttribute('role', 'group');
      dots.setAttribute('aria-label', 'Choose an image or video');
      const count = document.createElement('span');
      count.className = 'gallery__count';
      count.setAttribute('aria-hidden', 'true');
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.type = 'button'; d.className = 'dot';
        d.setAttribute('aria-label', `Show item ${i + 1} of ${slides.length}`);
        d.addEventListener('click', () => go(i));
        dots.append(d);
      });
      bar.append(dots, count);
      g.append(prev, next, bar);

      const idx = () => Math.round(gTrack.scrollLeft / gTrack.clientWidth);
      const go = (i) => gTrack.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * gTrack.clientWidth, behavior: smooth() });
      const sync = () => {
        const i = idx();
        $$('.dot', dots).forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
        count.textContent = `${i + 1} / ${slides.length}`;
        prev.disabled = i === 0;
        next.disabled = i === slides.length - 1;
        $$('video', gTrack).forEach((v, k) => { if (v.closest('.gallery__slide') !== gTrack.children[i]) v.pause(); });
      };
      let t = 0;
      gTrack.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(sync); }, { passive: true });
      prev.addEventListener('click', () => go(idx() - 1));
      next.addEventListener('click', () => go(idx() + 1));
      gTrack.addEventListener('keydown', (e) => {
        if (e.target !== gTrack) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); go(idx() + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx() - 1); }
      });
      requestAnimationFrame(sync);
    }
    return g;
  }

  /* ---------------------------------------------------------
     Project dialog
     --------------------------------------------------------- */
  const dlg = $('#project-dialog');

  function openProject(i, trigger) {
    const p = PROJECTS[i];
    $('.modal__panel', dlg).dataset.accent = p.accent;
    $('#modal-media').replaceChildren(buildGallery(p));
    $('#modal-category').textContent = p.category;
    $('#modal-title').textContent = p.title;
    $('#modal-context').textContent = p.context || '';
    $('#modal-objective').textContent = p.objective;
    $('#modal-highlights').innerHTML = p.highlights.map((h) => `<li>${h}</li>`).join('');
    $('#modal-facts').innerHTML = factsHTML(p.metrics);
    $('#modal-stack').innerHTML = badgesHTML(p.stack);
    $('#modal-links').innerHTML = (p.links || [])
      .map((l) => `<a class="btn btn--ghost" href="${l.href}" target="_blank" rel="noopener">${icon('external')} ${l.label}</a>`)
      .join('');
    dlg._trigger = trigger;
    dlg.showModal();
    $('.modal__panel', dlg).scrollTop = 0;
  }

  function initDialog() {
    $('#modal-close').addEventListener('click', () => dlg.close());
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', () => {
      $$('video', dlg).forEach((v) => v.pause());
      const t = dlg._trigger;
      if (t && document.contains(t)) (t.querySelector('.card__cta button') || t).focus({ preventScroll: true });
    });
  }

  /* ---------------------------------------------------------
     Nav, scroll spy
     --------------------------------------------------------- */
  function initNav() {
    const toggle = $('.nav-toggle');
    const nav = $('#site-nav');
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

    const links = new Map($$('.site-nav a').map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const a = links.get(en.target.id);
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------------------------------------------------------
     Scroll-in reveal: each section animates as it's reached.
     Elements get a small staggered delay based on their order.
     With JS disabled, nothing gets the .reveal class, so the
     page renders fully visible with no animation at all.
     --------------------------------------------------------- */
  function initReveal() {
    const stagger = (list, step = 90) =>
      list.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i, 6) * step}ms`; });

    // Elements with their own transition (.skill, .card): state class only.
    const panels = [...$$('.skill'), ...cards];
    panels.forEach((el) => el.classList.add('reveal'));
    stagger($$('.skill'));
    stagger(cards);

    // Plain elements: state class + a timing class, since they don't
    // already define a transition of their own.
    const fades = [
      $('.hero__copy'), $('.lifecycle'),
      $('.about__text'), $('.about__edu'),
      $('#skills .section__head'),
      $('#projects .section__head'), $('.carousel'),
      ...$$('.contact__list, .contact > div')
    ].filter(Boolean);
    fades.forEach((el, i) => {
      el.classList.add('reveal', 'reveal-fade');
      el.style.transitionDelay = `${(i % 2) * 110}ms`;
    });

    const all = [...panels, ...fades];
    if (reduceMotion.matches) { all.forEach((el) => el.classList.add('is-visible')); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    all.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  initCarousel();
  initDialog();
  initNav();
  initReveal();
})();
