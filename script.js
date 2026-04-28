// ── CURSOR ──
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));
function animCursor() {
  cx += (mx - cx) * 0.15;
  cy += (my - cy) * 0.15;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();

// ── PARTICLES ──
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

const particles = [];
const colors = ['rgba(0,255,65,', 'rgba(0,245,255,', 'rgba(255,0,144,'];

document.addEventListener('mousemove', e => {
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - .5) * 2,
      vy: (Math.random() - .5) * 2 - .5,
      life: 1,
      decay: Math.random() * .02 + .015,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
});

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += .04;
    p.life -= p.decay;
    if (p.life <= 0) { particles.splice(i, 1); continue; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.life + ')';
    ctx.shadowBlur = 6;
    ctx.shadowColor = p.color + '1)';
    ctx.fill();
  }
  requestAnimationFrame(animParticles);
}
animParticles();

// ── TYPEWRITER ──
const phrases = ['Desenvolvedor Full-Stack', 'Amante de Open Source', 'Solucionador de Problemas', 'Criador de Experiências'];
let pi = 0, ci = 0, del = false;
const twEl = document.getElementById('tw-text');
function typewriter() {
  const current = phrases[pi];
  if (!del) {
    twEl.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) { del = true; setTimeout(typewriter, 1800); return; }
    setTimeout(typewriter, 80);
  } else {
    twEl.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(typewriter, 400); return; }
    setTimeout(typewriter, 40);
  }
}
setTimeout(typewriter, 1200);

// ── FADE IN ON SCROLL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll && e.target.querySelectorAll('.skill-bar').forEach(b => {
        b.style.width = b.dataset.w + '%';
      });
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Also observe skill bars globally
document.querySelectorAll('.skill-card').forEach(card => {
  const cardObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      card.querySelectorAll('.skill-bar').forEach(b => b.style.width = b.dataset.w + '%');
      cardObs.disconnect();
    }
  }, { threshold: .3 });
  cardObs.observe(card);
});

// ── FORM ──
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = '✓ MENSAGEM ENVIADA';
  btn.style.background = 'var(--neon-green)';
  btn.style.color = 'var(--dark-bg)';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}