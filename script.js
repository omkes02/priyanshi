/* ============================================
   🌸 COMFORT CLOUD — JavaScript
   Interactive features for Deepu's comfort
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingElements();
  initDigitalHug();
  initBreathingExercise();
  initTipsCarousel();
  initAffirmations();
  initComfortSounds();
  initYogaCards();
  initScrollReveal();
  initNavHighlight();
});

/* ============================================
   FLOATING BACKGROUND ELEMENTS
   ============================================ */
function initFloatingElements() {
  const container = document.getElementById('floating-bg');
  const emojis = [
    { text: '💜', className: 'heart' },
    { text: '💕', className: 'heart' },
    { text: '🩷', className: 'heart' },
    { text: '✨', className: 'sparkle' },
    { text: '⭐', className: 'star' },
    { text: '☁️', className: 'cloud' },
    { text: '🌸', className: 'heart' },
    { text: '🦋', className: 'sparkle' },
  ];

  function createFloater() {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const el = document.createElement('span');
    el.className = `floater ${emoji.className}`;
    el.textContent = emoji.text;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (15 + Math.random() * 20) + 's';
    el.style.fontSize = (14 + Math.random() * 18) + 'px';
    el.style.animationDelay = '0s';
    container.appendChild(el);

    el.addEventListener('animationend', () => el.remove());
  }

  // Create initial batch
  for (let i = 0; i < 6; i++) {
    setTimeout(() => createFloater(), i * 800);
  }

  // Keep spawning
  setInterval(createFloater, 3000);
}

/* ============================================
   DIGITAL HUG
   ============================================ */
function initDigitalHug() {
  const btn = document.getElementById('hug-btn');
  const messageEl = document.getElementById('hug-message');

  const messages = [
    "You're the strongest person I know, Deepu 💪✨",
    "This will pass, I promise. Hang in there 🌈",
    "You deserve all the chocolate in the world right now 🍫💜",
    "Sending you the warmest, biggest virtual hug 🤗",
    "You're doing amazing, even on your hardest days 🌟",
    "It's okay to cry, it's okay to rest, it's okay to just be 🌸",
    "Imagine me wrapping you in the softest blanket 🧸",
    "You are loved more than you could ever know 💕",
    "Your strength inspires me, Deepu 🌻",
    "The world is so much better with you in it 🌍💜",
    "Take all the time you need. I'll be right here 🤍",
    "Hot water bottle + blanket + you = perfect combo 🔥🛌",
    "You're not alone in this. Never ever 💗",
    "One hour at a time, one breath at a time 🫧",
    "Treat yourself like the queen you are today 👑",
  ];

  let lastIndex = -1;

  btn.addEventListener('click', () => {
    // Burst animation
    btn.classList.remove('hugging');
    void btn.offsetWidth; // trigger reflow
    btn.classList.add('hugging');

    // Create ripple
    const ripple = document.createElement('div');
    ripple.className = 'hug-ripple';
    btn.parentElement.appendChild(ripple);
    ripple.style.left = (btn.offsetLeft + btn.offsetWidth / 2 - 80) + 'px';
    ripple.style.top = (btn.offsetTop + btn.offsetHeight / 2 - 80) + 'px';
    setTimeout(() => ripple.remove(), 1000);

    // Create burst hearts
    for (let i = 0; i < 8; i++) {
      createBurstHeart(btn);
    }

    // Show message
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * messages.length);
    } while (newIndex === lastIndex && messages.length > 1);
    lastIndex = newIndex;

    messageEl.classList.remove('show');
    setTimeout(() => {
      messageEl.textContent = messages[newIndex];
      messageEl.classList.add('show');
    }, 200);
  });

  function createBurstHeart(origin) {
    const heart = document.createElement('span');
    heart.textContent = ['💕', '💜', '💗', '🩷', '✨', '🌸'][Math.floor(Math.random() * 6)];
    heart.style.position = 'absolute';
    heart.style.fontSize = (16 + Math.random() * 16) + 'px';
    heart.style.left = (origin.offsetLeft + origin.offsetWidth / 2) + 'px';
    heart.style.top = (origin.offsetTop + origin.offsetHeight / 2) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '10';
    heart.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    heart.style.opacity = '1';
    origin.parentElement.appendChild(heart);

    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * Math.random());
      const distance = 80 + Math.random() * 120;
      heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => heart.remove(), 1100);
  }
}

/* ============================================
   BREATHING EXERCISE (4-7-8)
   ============================================ */
function initBreathingExercise() {
  const circle = document.getElementById('breathe-circle');
  const textEl = document.getElementById('breathe-text');
  const timerEl = document.getElementById('breathe-timer');
  const btn = document.getElementById('breathe-btn');
  const countEl = document.getElementById('breathe-count');

  let isRunning = false;
  let breathCount = 0;
  let currentTimeout = null;
  let countdownInterval = null;

  btn.addEventListener('click', () => {
    if (isRunning) {
      stopBreathing();
    } else {
      startBreathing();
    }
  });

  function startBreathing() {
    isRunning = true;
    btn.textContent = 'Pause ⏸️';
    btn.classList.add('active');
    runCycle();
  }

  function stopBreathing() {
    isRunning = false;
    btn.textContent = 'Start Breathing 🌬️';
    btn.classList.remove('active');
    circle.className = 'breathe-circle';
    textEl.textContent = 'Tap Start';
    timerEl.textContent = '';
    clearTimeout(currentTimeout);
    clearInterval(countdownInterval);
  }

  function runCycle() {
    if (!isRunning) return;

    // INHALE (4 seconds)
    circle.className = 'breathe-circle inhale';
    textEl.textContent = 'Breathe in...';
    startCountdown(4);

    currentTimeout = setTimeout(() => {
      if (!isRunning) return;

      // HOLD (7 seconds)
      circle.className = 'breathe-circle hold';
      textEl.textContent = 'Hold...';
      startCountdown(7);

      currentTimeout = setTimeout(() => {
        if (!isRunning) return;

        // EXHALE (8 seconds)
        circle.className = 'breathe-circle exhale';
        textEl.textContent = 'Breathe out...';
        startCountdown(8);

        currentTimeout = setTimeout(() => {
          if (!isRunning) return;
          breathCount++;
          countEl.textContent = `Breaths completed: ${breathCount} 🌟`;
          runCycle();
        }, 8000);
      }, 7000);
    }, 4000);
  }

  function startCountdown(seconds) {
    clearInterval(countdownInterval);
    let remaining = seconds;
    timerEl.textContent = remaining;
    countdownInterval = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        timerEl.textContent = remaining;
      } else {
        timerEl.textContent = '';
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
}

/* ============================================
   TIPS CAROUSEL
   ============================================ */
function initTipsCarousel() {
  const carousel = document.getElementById('tips-carousel');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');

  const scrollAmount = 280;

  leftBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
}

/* ============================================
   AFFIRMATIONS
   ============================================ */
function initAffirmations() {
  const affirmations = [
    "You are so much stronger than you think, Deepu 🌟",
    "It's okay to not be okay today. Give yourself grace 💜",
    "Your body is doing something incredible, even when it hurts 🌸",
    "Take it slow. The world can wait for you 🌙",
    "You deserve comfort, rest, and all the snacks 🍪",
    "Pain is temporary, but your beautiful strength is forever 💪",
    "Be as gentle with yourself as you would be with a friend 🤍",
    "You are worthy of love and care — especially your own 🌷",
    "One moment at a time. You've got this, Deepu 🦋",
    "The storm will pass and sunshine will return 🌈",
    "Right now, your only job is to take care of you 💆‍♀️",
    "You are so much more than what your body is going through 🌻",
  ];

  const textEl = document.getElementById('affirmation-text');
  const dotsContainer = document.getElementById('affirmation-dots');
  const prevBtn = document.getElementById('affirmation-prev');
  const nextBtn = document.getElementById('affirmation-next');

  let currentIndex = 0;
  let autoTimer = null;

  // Create dots
  affirmations.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = `affirmation-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    textEl.classList.add('fade-out');

    setTimeout(() => {
      currentIndex = index;
      textEl.textContent = affirmations[currentIndex];
      textEl.classList.remove('fade-out');

      // Update dots
      dotsContainer.querySelectorAll('.affirmation-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }, 400);

    resetAutoPlay();
  }

  function next() {
    goTo((currentIndex + 1) % affirmations.length);
  }

  function prev() {
    goTo((currentIndex - 1 + affirmations.length) % affirmations.length);
  }

  function resetAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Initial display
  textEl.textContent = affirmations[0];
  resetAutoPlay();
}

/* ============================================
   COMFORT SOUNDS (Web Audio API)
   ============================================ */
function initComfortSounds() {
  let audioCtx = null;
  const activeSounds = {};

  const soundCards = document.querySelectorAll('.sound-card');

  soundCards.forEach(card => {
    const soundType = card.dataset.sound;
    const slider = card.querySelector('.sound-slider');

    card.addEventListener('click', (e) => {
      if (e.target === slider) return; // Don't toggle when using slider

      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (activeSounds[soundType]) {
        stopSound(soundType);
        card.classList.remove('active');
      } else {
        startSound(soundType, slider.value / 100);
        card.classList.add('active');
      }
    });

    slider.addEventListener('input', () => {
      if (activeSounds[soundType]) {
        activeSounds[soundType].gainNode.gain.setTargetAtTime(
          slider.value / 100 * 0.5,
          audioCtx.currentTime,
          0.1
        );
      }
    });
  });

  function startSound(type, volume) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume * 0.5;
    gainNode.connect(audioCtx.destination);

    let nodes = [];

    switch (type) {
      case 'rain':
        nodes = createRain(gainNode);
        break;
      case 'ocean':
        nodes = createOcean(gainNode);
        break;
      case 'wind':
        nodes = createWind(gainNode);
        break;
      case 'fire':
        nodes = createFire(gainNode);
        break;
      case 'birds':
        nodes = createBirds(gainNode);
        break;
      case 'night':
        nodes = createNight(gainNode);
        break;
    }

    activeSounds[type] = { gainNode, nodes, intervals: [] };
  }

  function stopSound(type) {
    const sound = activeSounds[type];
    if (!sound) return;

    sound.gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);

    setTimeout(() => {
      sound.nodes.forEach(node => {
        try { node.stop(); } catch (e) { /* ignore */ }
        try { node.disconnect(); } catch (e) { /* ignore */ }
      });
      sound.gainNode.disconnect();
      if (sound.intervals) {
        sound.intervals.forEach(id => clearInterval(id));
      }
    }, 500);

    delete activeSounds[type];
  }

  // --- Sound Generators ---

  function createNoiseBuffer(seconds) {
    const bufferSize = audioCtx.sampleRate * seconds;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  function createRain(destination) {
    const noise = audioCtx.createBufferSource();
    noise.buffer = createNoiseBuffer(4);
    noise.loop = true;

    const highpass = audioCtx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 4000;

    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 8000;
    bandpass.Q.value = 0.5;

    noise.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(destination);
    noise.start();

    return [noise];
  }

  function createOcean(destination) {
    const noise = audioCtx.createBufferSource();
    noise.buffer = createNoiseBuffer(4);
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;

    // Modulate filter for wave effect
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 400;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    // Volume modulation for waves
    const volLfo = audioCtx.createOscillator();
    volLfo.frequency.value = 0.1;
    const volLfoGain = audioCtx.createGain();
    volLfoGain.gain.value = 0.3;

    const mainGain = audioCtx.createGain();
    mainGain.gain.value = 0.7;

    volLfo.connect(volLfoGain);
    volLfoGain.connect(mainGain.gain);
    volLfo.start();

    noise.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(destination);

    return [noise, lfo, volLfo];
  }

  function createWind(destination) {
    const noise = audioCtx.createBufferSource();
    noise.buffer = createNoiseBuffer(4);
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 2;

    // Slow modulation
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 600;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    noise.connect(filter);
    filter.connect(destination);
    noise.start();

    return [noise, lfo];
  }

  function createFire(destination) {
    const noise = audioCtx.createBufferSource();
    noise.buffer = createNoiseBuffer(4);
    noise.loop = true;

    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1500;
    bandpass.Q.value = 0.8;

    const crackleGain = audioCtx.createGain();
    crackleGain.gain.value = 0.4;

    noise.connect(bandpass);
    bandpass.connect(crackleGain);
    crackleGain.connect(destination);
    noise.start();

    // Random crackle pops
    const intervalId = setInterval(() => {
      if (!activeSounds.fire) return;
      const pop = audioCtx.createOscillator();
      pop.frequency.value = 200 + Math.random() * 300;
      const popGain = audioCtx.createGain();
      popGain.gain.value = 0.1 + Math.random() * 0.15;
      popGain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.02, 0.01);
      pop.connect(popGain);
      popGain.connect(destination);
      pop.start();
      pop.stop(audioCtx.currentTime + 0.05);
    }, 150 + Math.random() * 300);

    activeSounds.fire = activeSounds.fire || {};
    activeSounds.fire.intervals = activeSounds.fire.intervals || [];
    activeSounds.fire.intervals.push(intervalId);

    return [noise];
  }

  function createBirds(destination) {
    const nodes = [];

    // Create periodic chirps
    const intervalId = setInterval(() => {
      if (!activeSounds.birds) return;

      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      const baseFreq = 2000 + Math.random() * 3000;
      osc.frequency.value = baseFreq;

      const chirpGain = audioCtx.createGain();
      chirpGain.gain.value = 0;

      // Chirp envelope
      const now = audioCtx.currentTime;
      const chirpLen = 0.05 + Math.random() * 0.1;
      chirpGain.gain.setValueAtTime(0, now);
      chirpGain.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.07, now + chirpLen * 0.3);
      chirpGain.gain.linearRampToValueAtTime(0, now + chirpLen);

      // Frequency sweep
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq * (0.8 + Math.random() * 0.4), now + chirpLen);

      osc.connect(chirpGain);
      chirpGain.connect(destination);
      osc.start(now);
      osc.stop(now + chirpLen + 0.05);
    }, 300 + Math.random() * 1200);

    activeSounds.birds = activeSounds.birds || {};
    activeSounds.birds.intervals = activeSounds.birds.intervals || [];
    activeSounds.birds.intervals.push(intervalId);

    return nodes;
  }

  function createNight(destination) {
    // Soft crickets-like sound
    const noise = audioCtx.createBufferSource();
    noise.buffer = createNoiseBuffer(4);
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 5000;
    filter.Q.value = 5;

    const nightGain = audioCtx.createGain();
    nightGain.gain.value = 0.15;

    // Slow pulsing
    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 3;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.1;

    lfo.connect(lfoGain);
    lfoGain.connect(nightGain.gain);
    lfo.start();

    noise.connect(filter);
    filter.connect(nightGain);
    nightGain.connect(destination);
    noise.start();

    return [noise, lfo];
  }
}

/* ============================================
   YOGA CARDS
   ============================================ */
function initYogaCards() {
  const cards = document.querySelectorAll('.yoga-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');

      // Close all
      cards.forEach(c => c.classList.remove('expanded'));

      // Toggle current
      if (!wasExpanded) {
        card.classList.add('expanded');
        // Update hint text
        card.querySelector('.yoga-expand-hint').textContent = 'tap to collapse ↑';
      } else {
        card.querySelector('.yoga-expand-hint').textContent = 'tap to expand ↓';
      }

      // Reset other hints
      cards.forEach(c => {
        if (c !== card) {
          c.querySelector('.yoga-expand-hint').textContent = 'tap to expand ↓';
        }
      });
    });
  });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   NAVIGATION HIGHLIGHT
   ============================================ */
function initNavHighlight() {
  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.nav-dot');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach(dot => {
          dot.classList.toggle('active', dot.dataset.section === id);
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach(section => observer.observe(section));
}
