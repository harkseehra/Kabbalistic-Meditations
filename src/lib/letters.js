// One shared source for every letter on the site: gematria, gates,
// shape, and the Sefer Yetzirah correspondences. Prayer, Heaven Gates,
// horoscope, birth chart, codex and Pokedox all read from here, so a
// value is never written twice.
//
// Gematria: the standard values, 1 to 400.
// Gates: the letters of the letter's full name, as pointed on the
// prayer page. Vav, Mem and Nun are locked letters — each is its own
// dimension: the letter returns to itself in its own spelling.
// Shape: the gematria drawn as points on a circle — the same drawing
// the horoscope and birth-chart pages use. Two points join into a
// line, 3 to 10 join into their polygon, bigger numbers read as a
// ring of dots.
// Correspondences: Sefer Yetzirah, chapters 3–5, Warsaw 1884 on
// Sefaria. Foundations of the doubles and the Hebrew months come
// from the codex, which states them the same way.

import { LETTERS, DOUBLES, MOTHERS } from './transits.js';

export const GEMATRIA = {
  Alef: 1, Bet: 2, Gimel: 3, Dalet: 4, He: 5, Vav: 6, Zayin: 7,
  Chet: 8, Tet: 9, Yud: 10, Kaf: 20, Lamed: 30, Mem: 40, Nun: 50,
  Samekh: 60, Ayin: 70, Peh: 80, Tzadi: 90, Kuf: 100, Resh: 200,
  Shin: 300, Tav: 400,
  // Aliases the horoscope, birth-chart and codex pages use for the
  // same letters.
  Yod: 10, Pe: 80, Qof: 100,
};

// Aliases to their canonical names, as used on the prayer page and
// in transits.js.
export const CANONICAL = { Yod: 'Yud', Pe: 'Peh', Qof: 'Kuf' };

export function canonicalName(name) {
  return CANONICAL[name] || name;
}

export function gematriaOf(name) {
  return GEMATRIA[canonicalName(name)] || GEMATRIA[name] || 0;
}

// The letter's full name, pointed — how the name is written with
// its accent marks, so it can be read aloud correctly. Built from
// the pointed names in transits.js, so it is never typed twice.
export const POINTED = {};
for (const arr of [MOTHERS, DOUBLES, LETTERS]) {
  for (const rec of arr) POINTED[rec.name] = rec.pointed;
}
POINTED.Yod = POINTED.Yud;
POINTED.Pe = POINTED.Peh;
POINTED.Qof = POINTED.Kuf;

export function pointedOf(name) {
  return POINTED[canonicalName(name)] || POINTED[name] || '';
}

// The name sounded out, in plain letters — Bet is Bay-eet. The
// simples in transits.js carry their own transliterations; these
// follow the same shape for all twenty-two, so a name can be read
// even by someone who cannot read Hebrew.
export const TRANSLIT = {
  Alef: 'Ah-lef', Bet: 'Bay-eet', Gimel: 'Ghee-mel', Dalet: 'Dah-let',
  He: 'Hay', Vav: 'Vahv', Zayin: 'Zah-yin', Chet: 'Khet', Tet: 'Tet',
  Yud: 'Yod', Kaf: 'Kahf', Lamed: 'Lah-med', Mem: 'Mem', Nun: 'Noon',
  Samekh: 'Sah-mekh', Ayin: 'Ah-yin', Peh: 'Pay', Tzadi: 'Tsah-dee',
  Kuf: 'Kof', Resh: 'Raysh', Shin: 'Sheen', Tav: 'Tahv',
  Yod: 'Yod', Pe: 'Pay', Qof: 'Kof',
};

export function translitOf(name) {
  return TRANSLIT[canonicalName(name)] || TRANSLIT[name] || '';
}

export const GATES = {
  Alef: ['Alef', 'Lamed', 'Peh'],
  Bet: ['Bet', 'Yud', 'Tav'],
  Gimel: ['Gimel', 'Yud', 'Mem', 'Lamed'],
  Dalet: ['Dalet', 'Lamed', 'Tav'],
  He: ['He', 'Alef'],
  Vav: ['Vav', 'Vav'],
  Zayin: ['Zayin', 'Yud', 'Nun'],
  Chet: ['Chet', 'Yud', 'Tav'],
  Tet: ['Tet', 'Yud', 'Tav'],
  Yud: ['Yud', 'Vav', 'Dalet'],
  Kaf: ['Kaf', 'Peh'],
  Lamed: ['Lamed', 'Mem', 'Dalet'],
  Mem: ['Mem', 'Mem'],
  Nun: ['Nun', 'Vav', 'Nun'],
  Samekh: ['Samekh', 'Mem', 'Kaf'],
  Ayin: ['Ayin', 'Yud', 'Nun'],
  Peh: ['Peh', 'Alef'],
  Tzadi: ['Tzadi', 'Dalet', 'Yud'],
  Kuf: ['Kuf', 'Vav', 'Peh'],
  Resh: ['Resh', 'Yud', 'Shin'],
  Shin: ['Shin', 'Yud', 'Nun'],
  Tav: ['Tav', 'Vav'],
};

// Locked letters — each is its own dimension.
export const LOCKED = ['Vav', 'Mem', 'Nun'];

export function isLocked(name) {
  return LOCKED.includes(canonicalName(name));
}

export function gatesOf(name) {
  return GATES[canonicalName(name)] || [];
}

// Glyph to canonical name, for looking a letter up from a single
// Hebrew character — the prayer rows and the codex table carry
// the glyph.
export const GLYPHS = {
  'א': 'Alef', 'ב': 'Bet', 'ג': 'Gimel', 'ד': 'Dalet', 'ה': 'He',
  'ו': 'Vav', 'ז': 'Zayin', 'ח': 'Chet', 'ט': 'Tet', 'י': 'Yud',
  'כ': 'Kaf', 'ל': 'Lamed', 'מ': 'Mem', 'נ': 'Nun', 'ס': 'Samekh',
  'ע': 'Ayin', 'פ': 'Peh', 'צ': 'Tzadi', 'ק': 'Kuf', 'ר': 'Resh',
  'ש': 'Shin', 'ת': 'Tav',
};

export function letterFromGlyph(glyph) {
  return GLYPHS[glyph] || null;
}

// Foundations of the seven doubles, Sefer Yetzirah chapter 4,
// as stated on the codex.
export const FOUNDATIONS = {
  Bet: 'Life', Gimel: 'Peace', Dalet: 'Wisdom', Kaf: 'Grace',
  Peh: 'Beauty', Resh: 'Fertility', Tav: 'Sovereignty',
};

// Hebrew months of the twelve signs, as stated on the codex.
export const MONTHS = {
  Aries: 'Nisan', Taurus: 'Iyyar', Gemini: 'Siwan', Cancer: 'Tammuz',
  Leo: 'Av', Virgo: 'Elul', Libra: 'Tishri', Scorpio: 'Marcheshwan',
  Sagittarius: 'Kislew', Capricorn: 'Tevet', Aquarius: 'Shevat',
  Pisces: 'Adar',
};

// Usual weather for each sign's season in Mississauga — the daytime
// high a day in those dates usually reaches, from the Toronto
// Pearson 1991–2020 climate normals (Environment and Climate Change
// Canada). Pearson sits in Mississauga. Simple, as asked: one word
// and a range.
export const WEATHER = {
  Aries: { label: 'Cool', range: '5–12' },
  Taurus: { label: 'Mild', range: '12–19' },
  Gemini: { label: 'Warm', range: '19–24' },
  Cancer: { label: 'Warm', range: '24–27' },
  Leo: { label: 'Warm', range: '26–27' },
  Virgo: { label: 'Warm', range: '22–26' },
  Libra: { label: 'Mild', range: '15–22' },
  Scorpio: { label: 'Cool', range: '8–15' },
  Sagittarius: { label: 'Cold', range: '2–8' },
  Capricorn: { label: 'Cold', range: '-1–2' },
  Aquarius: { label: 'Cold', range: '-1–0' },
  Pisces: { label: 'Cold', range: '0–5' },
};

export function weatherText(sign) {
  const w = WEATHER[sign];
  return w ? w.label + ', ' + w.range + '°C' : '';
}

// The sign's English dates, from the dates in transits.js —
// Aries Mar 21 – Apr 19.
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function englishDates(sign) {
  const l = LETTERS.find((x) => x.sign === sign);
  if (!l) return '';
  return MONTH_SHORT[l.start[0] - 1] + ' ' + l.start[1] + ' – ' + MONTH_SHORT[l.end[0] - 1] + ' ' + l.end[1];
}

// The strongest days of a planet — the dates when the Sun stands in
// the signs that planet rules, from the Pokedox: a day is strongest
// when the Sun stands in the signs its planet rules. Ranges that
// run together are joined; the rest are listed.
const DAY_OF_YEAR = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

function ord(m, d) {
  return DAY_OF_YEAR[m - 1] + d;
}

function ordToString(o) {
  let n = o;
  while (n > 365) n -= 365;
  for (let m = 12; m >= 1; m--) {
    if (n > DAY_OF_YEAR[m - 1]) return MONTH_SHORT[m - 1] + ' ' + (n - DAY_OF_YEAR[m - 1]);
  }
  return MONTH_SHORT[0] + ' ' + n;
}

export function strongestDays(planet) {
  const signs = LETTERS.filter((l) => l.planet === planet);
  if (!signs.length) return null;
  const ranges = signs.map((s) => {
    const start = ord(s.start[0], s.start[1]);
    let end = ord(s.end[0], s.end[1]);
    if (end < start) end += 365;
    return { start, end, sign: s.sign };
  });
  ranges.sort((a, b) => a.start - b.start);
  const n = ranges.length;
  if (n === 1) {
    const r = ranges[0];
    return { text: ordToString(r.start) + ' – ' + ordToString(r.end) + ' — Sun in ' + r.sign };
  }
  // Cut the year at its largest gap, then merge what runs together.
  const gaps = [];
  for (let i = 0; i < n - 1; i++) gaps.push({ idx: i, gap: ranges[i + 1].start - ranges[i].end });
  gaps.push({ idx: n - 1, gap: ranges[0].start + 365 - ranges[n - 1].end });
  gaps.sort((a, b) => b.gap - a.gap);
  const cut = gaps[0].idx;
  const rotated = [];
  for (let k = 0; k < n; k++) {
    const r = ranges[(cut + 1 + k) % n];
    const shift = cut + 1 + k >= n ? 365 : 0;
    rotated.push({ start: r.start + shift, end: r.end + shift, sign: r.sign });
  }
  const merged = [];
  for (const r of rotated) {
    const last = merged[merged.length - 1];
    if (last && r.start <= last.end + 1) {
      last.end = Math.max(last.end, r.end);
      last.signs.push(r.sign);
    } else {
      merged.push({ start: r.start, end: r.end, signs: [r.sign] });
    }
  }
  const parts = merged.map((m) => ordToString(m.start) + ' – ' + ordToString(m.end));
  const names = merged.flatMap((m) => m.signs);
  return { text: parts.join(' · ') + ' — Sun in ' + names.join(' and ') };
}

// The shape a gematria value draws: the number of points, and what
// those points form.
export function shapeName(n) {
  if (n === 1) return 'a dot';
  if (n === 2) return 'a line';
  if (n === 3) return 'a triangle';
  if (n === 4) return 'a square';
  if (n === 5) return 'a pentagon';
  if (n === 6) return 'a hexagon';
  if (n === 7) return 'a heptagon';
  if (n === 8) return 'an octagon';
  if (n === 9) return 'a nonagon';
  if (n === 10) return 'a decagon';
  return 'a ring';
}

export function shapeCaption(name) {
  const n = gematriaOf(name);
  if (n === 1) return '1 point — a dot';
  return n + ' points — ' + shapeName(n);
}

// The shape mark, server-side: the same drawing the horoscope and
// birth-chart pages build client-side. N points on a circle; 2 joins
// into a line, 3–10 join into their polygon, bigger numbers read as
// a ring of dots. The tint comes from --shape-ink, the icon tint,
// in both themes.
export function shapeSVG(name, size) {
  const n = gematriaOf(name);
  if (!n) return '';
  const s = size || (n > 10 ? 60 : 44);
  const c = s / 2, r = s / 2 - 4;
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    pts.push([c + r * Math.cos(a), c + r * Math.sin(a)]);
  }
  const dotR = n > 100 ? 1.5 : n > 20 ? 2 : 3;
  let inner = '';
  if (n === 2) {
    inner += '<line x1="' + pts[0][0].toFixed(1) + '" y1="' + pts[0][1].toFixed(1) + '" x2="' + pts[1][0].toFixed(1) + '" y2="' + pts[1][1].toFixed(1) + '" stroke="currentColor" stroke-width="1.5"/>';
  } else if (n > 2 && n <= 10) {
    inner += '<polygon points="' + pts.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ') + '" fill="none" stroke="currentColor" stroke-width="1.5"/>';
  }
  pts.forEach((p) => {
    inner += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + dotR + '" fill="currentColor"/>';
  });
  const label = canonicalName(name) + ' — ' + n + (n === 1 ? ' point' : ' points');
  return '<span class="shape-mark" role="img" aria-label="' + label + '"><svg width="' + s + '" height="' + s + '" viewBox="0 0 ' + s + ' ' + s + '" aria-hidden="true">' + inner + '</svg></span>';
}

// The full record of a letter: its gematria, its gates, its shape,
// and everything Sefer Yetzirah gives it — planet, day and face gate
// and foundation for a double; sign, Hebrew month, sense and organ
// for a simple; element and place for a mother.
export function letterRecord(name) {
  const canon = canonicalName(name);
  const n = gematriaOf(canon);
  const rec = {
    name: canon,
    gematria: n,
    gates: gatesOf(canon),
    locked: isLocked(canon),
    shape: shapeCaption(canon),
    pointed: pointedOf(canon),
    translit: translitOf(canon),
  };
  const mother = MOTHERS.find((m) => m.name === canon);
  if (mother) {
    rec.group = 'mother';
    rec.glyph = mother.glyph;
    rec.element = mother.element;
    rec.place = mother.place;
    rec.signs = LETTERS.filter((l) => l.mother === canon).map((l) => l.sign);
    return rec;
  }
  const dbl = DOUBLES.find((d) => d.name === canon);
  if (dbl) {
    rec.group = 'double';
    rec.glyph = dbl.glyph;
    rec.planet = dbl.planet;
    rec.day = dbl.day;
    rec.gate = dbl.gate;
    rec.foundation = FOUNDATIONS[canon];
    rec.strongest = strongestDays(dbl.planet);
    return rec;
  }
  const simple = LETTERS.find((l) => l.name === canon);
  if (simple) {
    rec.group = 'simple';
    rec.glyph = simple.glyph;
    rec.sign = simple.sign;
    rec.month = MONTHS[simple.sign];
    rec.dates = englishDates(simple.sign);
    rec.weather = weatherText(simple.sign);
    rec.sense = simple.sense;
    rec.organ = simple.organ;
    rec.element = simple.element;
    rec.mother = simple.mother;
    rec.planet = simple.planet;
    const ruler = DOUBLES.find((d) => d.planet === simple.planet);
    rec.rulerDay = ruler ? ruler.day : '';
    return rec;
  }
  return rec;
}
