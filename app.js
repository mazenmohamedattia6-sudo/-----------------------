// ══════════ الأوض (عدّل الكلام هنا زي ما تحب) ══════════
// ترتيب الشبكة: الصف الفوقاني من الشمال لليمين، وبعدين الصف التحتاني
const ROOMS = [
  { id: 'kids', emoji: '🧸', name: 'أوضة ليلى ويزن',
    furn: [{ e: '🧸', x: 12, y: 18 }, { e: '🎈', x: 58, y: 10 }, { e: '🛏️', x: 34, y: 44 }],
    text: 'أحلى حلم عندي…\nليلى بتيجي تجري في حضنك وتقولك "واحشتيني يا ماما"،\nوأنا شايل يزن وبتفرج عليكِ.\nوإنتِ أم حلوة وجميلة أوي يا ملك.',
    chips: ['ليلى', 'يزن', 'حضنك ليهم', 'إن شاء الله 🤲'] },
  { id: 'bed', emoji: '🛏️', name: 'أوضة النوم',
    furn: [{ e: '🛏️', x: 24, y: 40 }, { e: '🌙', x: 62, y: 10 }],
    text: 'السرير ده أنا اللي هعمله، وأدلّعك.\nوأرجع من يوم طويل ألاقي نفسي في حضنك،\nأنام وأرتاح، وإنتِ تطبطبي عليا.',
    chips: ['السرير عليا', 'حضنك قبل النوم', 'طبطبة بعد يوم طويل', 'دلع 🥰'] },
  { id: 'balcony', emoji: '☕', name: 'البلكونة',
    furn: [{ e: '☕', x: 20, y: 38 }, { e: '🪴', x: 62, y: 38 }, { e: '🌙', x: 40, y: 6 }],
    text: 'هعملك الهوتشكليت، ونقف في البلكونة نتكلم ونضحك،\nونفتكر خناقاتنا ونضحك عليها.\nوأنا مش عايز غير ده.',
    chips: ['هوتشكليت', 'كلام وضحك', 'نفتكر خناقاتنا', 'القمر معانا 🌙'] },
  { id: 'living', emoji: '🎬', name: 'الصالون',
    furn: [{ e: '🛋️', x: 16, y: 40 }, { e: '📺', x: 58, y: 24 }, { e: '🍿', x: 62, y: 54 }],
    text: 'بحب أوي لما نتفرج على فيلم مع بعض.\nمش مهم الفيلم إيه…\nالمهم إنتِ جنبي، وأنا ماسك إيدك.',
    chips: ['فيلم وإنتِ جنبي', 'حضن وبطانية', 'نتخانق على الفيلم 😄'] },
  { id: 'kitchen', emoji: '🍳', name: 'المطبخ',
    furn: [{ e: '🍳', x: 14, y: 22 }, { e: '🥘', x: 56, y: 26 }, { e: '🍽️', x: 36, y: 54 }],
    text: 'عايز أطبخ معاكِ لما نتجوز، وأعملك الأكل اللي تحبيه.\nوكنت مبسوط أوي لما طبخنا مع بعض.\nوبعد الأكل… الأطباق عليا.',
    chips: ['نطبخ مع بعض', 'أكلك المفضل', 'الأطباق عليا'] },
  { id: 'door', emoji: '🚪', name: 'الباب',
    furn: [{ e: '🚪', x: 34, y: 28 }, { e: '👟', x: 12, y: 60 }, { e: '💐', x: 62, y: 56 }],
    text: 'أول ما تدخلي البيت… مش هتشيلي أي حاجة.\nأنا اللي هشيل كل حاجة.\nإنتِ بس ادخلي وارتاحي.',
    chips: ['مفيش حاجة تتشال عليكِ', 'بيت فيه أمان', 'حضن عند الباب 🤍'] },
];

const FINAL = {
  title: 'البيت اتنوّر 💗',
  text: 'البيت ده لسه حلم يا ملك…\nبس أي مكان إنتِ فيه هيبقى بيتي.\nإن شاء الله نبنيه مع بعض، أوضة أوضة.\n\nبحبك. 🌙\n— مازن، أبو ليلي',
};

// ══════════ تخزين ══════════
const KEY = 'malak_house_lit_v1';
let lit = [];
try { lit = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { lit = []; }
if (!Array.isArray(lit)) lit = [];
function save() { try { localStorage.setItem(KEY, JSON.stringify(lit)); } catch (e) {} }

// ══════════ البناء ══════════
const house    = document.getElementById('house');
const floors   = document.getElementById('floors');
const panel    = document.getElementById('panel');
const countEl  = document.getElementById('lit-count');
document.getElementById('room-total').textContent = ROOMS.length;

const roomEls = {};
let selected = null;

function mk(tag, cls, txt) { const e = document.createElement(tag); if (cls) e.className = cls; if (txt !== undefined) e.textContent = txt; return e; }

ROOMS.forEach(r => {
  const b = mk('button', 'room');
  b.type = 'button';
  b.setAttribute('aria-label', 'أوضة: ' + r.name);
  r.furn.forEach(f => {
    const s = mk('span', 'furn', f.e);
    s.style.left = f.x + '%'; s.style.top = f.y + '%';
    b.appendChild(s);
  });
  b.appendChild(mk('span', 'hint', '💡'));
  b.appendChild(mk('span', 'lbl', r.name));
  b.addEventListener('click', () => openRoom(r.id));
  floors.appendChild(b);
  roomEls[r.id] = b;
});

function allLit() { return ROOMS.every(r => lit.includes(r.id)); }

function refresh() {
  ROOMS.forEach(r => roomEls[r.id].classList.toggle('lit', lit.includes(r.id)));
  countEl.textContent = lit.length;
  house.classList.toggle('all', allLit());
}

function showPanel(title, text, chips, cls) {
  panel.innerHTML = '';
  const wrap = mk('div', 'p-in' + (cls ? ' ' + cls : ''));
  wrap.appendChild(mk('h3', 'p-title', title));
  wrap.appendChild(mk('p', 'p-text', text));
  if (chips && chips.length) {
    const c = mk('div', 'chips');
    chips.forEach(t => c.appendChild(mk('span', 'chip', t)));
    wrap.appendChild(c);
  }
  panel.appendChild(wrap);
}

function openRoom(id) {
  const r = ROOMS.find(x => x.id === id);
  if (!r) return;
  Object.keys(roomEls).forEach(k => roomEls[k].classList.remove('sel'));
  roomEls[id].classList.add('sel', 'seen');
  selected = id;

  const wasAllLit = allLit();
  if (!lit.includes(id)) { lit.push(id); save(); }
  refresh();
  showPanel(r.emoji + '  ' + r.name, r.text, r.chips);
  sparkle(5);

  if (!wasAllLit && allLit()) {
    setTimeout(() => {
      showPanel(FINAL.title, FINAL.text, null, 'p-final');
      hearts(30);
    }, 3800);
  }
}

function showEmpty() {
  panel.innerHTML = '';
  const e = mk('p', 'p-empty', 'دوسي على أي أوضة تنوّريها 💡\nوشوفي اللي نفسي يبقى فيها');
  e.style.whiteSpace = 'pre-line';
  panel.appendChild(e);
}

document.getElementById('reset').addEventListener('click', () => {
  if (!confirm('تأكيد: تطفّي كل الأنوار؟')) return;
  lit = []; save(); selected = null;
  Object.keys(roomEls).forEach(k => roomEls[k].classList.remove('sel', 'seen'));
  refresh(); showEmpty();
});

// ══════════ تأثيرات ══════════
function floatEmoji(list, n, big) {
  for (let k = 0; k < n; k++) {
    setTimeout(() => {
      const h = document.createElement('div');
      h.className = 'float-p';
      h.textContent = list[Math.floor(Math.random() * list.length)];
      h.style.cssText += `left:${10 + Math.random() * 80}vw;font-size:${.8 + Math.random() * (big ? 1.2 : .7)}rem;animation-duration:${2.2 + Math.random() * 2.4}s;`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 5500);
    }, k * 130);
  }
}
function sparkle(n) { floatEmoji(['✨', '💡', '💗'], n, false); }
function hearts(n)  { floatEmoji(['💗', '🏠', '✨', '🌙', '💌'], n, true); }

// ── الخلفية ──
const bgC = document.getElementById('bg-canvas'), bgX = bgC.getContext('2d');
function resizeBg() { bgC.width = innerWidth; bgC.height = innerHeight; }
resizeBg(); window.addEventListener('resize', resizeBg);
const pts = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * .7 + .15, vx: (Math.random() - .5) * .1, vy: (Math.random() - .5) * .1, a: Math.random(), da: (Math.random() - .5) * .005, c: Math.random() > .5 ? '201,168,76' : '201,107,138' }));
function drawBg() {
  const w = bgC.width, h = bgC.height; bgX.clearRect(0, 0, w, h);
  pts.forEach(p => {
    p.x += p.vx / w; p.y += p.vy / h; p.a += p.da;
    if (p.a < .05 || p.a > .82) p.da *= -1;
    if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0; if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;
    const px = p.x * w, py = p.y * h, g = bgX.createRadialGradient(px, py, 0, px, py, p.r * 6);
    g.addColorStop(0, `rgba(${p.c},${p.a})`); g.addColorStop(1, `rgba(${p.c},0)`);
    bgX.beginPath(); bgX.arc(px, py, p.r * 6, 0, Math.PI * 2); bgX.fillStyle = g; bgX.fill();
  });
  requestAnimationFrame(drawBg);
}
drawBg();

// ══════════ تشغيل ══════════
refresh();
if (allLit()) showPanel(FINAL.title, FINAL.text, null, 'p-final'); else showEmpty();
