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
  };
  const mother = MOTHERS.find((m) => m.name === canon);
  if (mother) {
    rec.group = 'mother';
    rec.glyph = mother.glyph;
    rec.pointed = mother.pointed;
    rec.element = mother.element;
    rec.place = mother.place;
    return rec;
  }
  const dbl = DOUBLES.find((d) => d.name === canon);
  if (dbl) {
    rec.group = 'double';
    rec.glyph = dbl.glyph;
    rec.pointed = dbl.pointed;
    rec.planet = dbl.planet;
    rec.day = dbl.day;
    rec.gate = dbl.gate;
    rec.foundation = FOUNDATIONS[canon];
    return rec;
  }
  const simple = LETTERS.find((l) => l.name === canon);
  if (simple) {
    rec.group = 'simple';
    rec.glyph = simple.glyph;
    rec.pointed = simple.pointed;
    rec.sign = simple.sign;
    rec.month = MONTHS[simple.sign];
    rec.sense = simple.sense;
    rec.organ = simple.organ;
    rec.element = simple.element;
    return rec;
  }
  return rec;
}
