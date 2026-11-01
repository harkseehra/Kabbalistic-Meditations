// Letter, sign, and organ correspondences follow Sefer Yetzirah, chapter 5,
// as used on the 32 Paths page. The one-line notes are plain-language
// descriptions, not quoted teaching.

// The twelve elemental letters, in zodiac order.
export const LETTERS = [
  { glyph: 'ה', name: 'He',    pointed: 'הֵא',   translit: 'HEH',     sign: 'Aries',       start: [3, 21],  end: [4, 19],  organ: 'right hand',  sense: 'speech',   note: 'What you say, and what you make with your hands.' },
  { glyph: 'ו', name: 'Vav',   pointed: 'וָו',   translit: 'VAHV',    sign: 'Taurus',      start: [4, 20],  end: [5, 20],  organ: 'right kidney', sense: 'thought',  note: 'The quiet thinking underneath everything else.' },
  { glyph: 'ז', name: 'Zayin', pointed: 'זַיִן', translit: 'ZAH-yin', sign: 'Gemini',      start: [5, 21],  end: [6, 20],  organ: 'right foot',   sense: 'walking',  note: 'Where you actually go, not where you plan to go.' },
  { glyph: 'ח', name: 'Chet',  pointed: 'חֵית', translit: 'KHET',    sign: 'Cancer',      start: [6, 21],  end: [7, 22],  organ: 'left hand',   sense: 'sight',    note: 'What you see, and what seeing does to you.' },
  { glyph: 'ט', name: 'Tet',   pointed: 'טֵית', translit: 'TET',     sign: 'Leo',         start: [7, 23],  end: [8, 22],  organ: 'left kidney',  sense: 'hearing',  note: 'What you hear when nobody is talking.' },
  { glyph: 'י', name: 'Yud',   pointed: 'יוֹד',  translit: 'YOD',     sign: 'Virgo',       start: [8, 23],  end: [9, 22],  organ: 'left foot',    sense: 'action',   note: 'The step you take, not the step you think about.' },
  { glyph: 'ל', name: 'Lamed', pointed: 'לָמֶד', translit: 'LAH-med', sign: 'Libra',       start: [9, 23],  end: [10, 22], organ: 'gallbladder',  sense: 'desire',   note: 'What you want, plain and simple.' },
  { glyph: 'נ', name: 'Nun',   pointed: 'נוּן',  translit: 'NOON',    sign: 'Scorpio',     start: [10, 23], end: [11, 21], organ: 'intestines',   sense: 'smell',    note: 'What you sense before you understand it.' },
  { glyph: 'ס', name: 'Samekh', pointed: 'סָמֶךְ', translit: 'SAH-mekh', sign: 'Sagittarius', start: [11, 22], end: [12, 21], organ: 'spleen',      sense: 'sleep',    note: 'Rest, and what restores you.' },
  { glyph: 'ע', name: 'Ayin',  pointed: 'עַיִן', translit: 'AH-yin',  sign: 'Capricorn',   start: [12, 22], end: [1, 19],  organ: 'liver',       sense: 'anger',    note: 'Heat in the body, and what it burns.' },
  { glyph: 'צ', name: 'Tzadi', pointed: 'צָדִי', translit: 'TSAH-dee', sign: 'Aquarius',    start: [1, 20],  end: [2, 18],  organ: 'stomach',     sense: 'taste',    note: 'What you take in, and what you keep.' },
  { glyph: 'ק', name: 'Kuf',   pointed: 'קוֹף',  translit: 'KOF',     sign: 'Pisces',      start: [2, 19],  end: [3, 20],  organ: 'pancreas',    sense: 'laughter', note: 'The release after the tension.' },
];

// Day names, in order, with the holy name of the day and its sefirah.
// Source: the daily mapping used in the morning briefing (Zohar / Sha'arei Orah).
export const HOLY_NAMES = [
  { day: 'Sunday',   name: 'El',           pointed: 'אֵל',             sefirah: 'Chesed' },
  { day: 'Monday',   name: 'Elohim',       pointed: 'אֱלֹהִים',         sefirah: 'Gevurah' },
  { day: 'Tuesday',  name: 'YHWH',         pointed: 'יְהוָה',           sefirah: 'Tiferet' },
  { day: 'Wednesday', name: 'YHWH Tzevaot', pointed: 'יְהוָה צְבָאוֹת', sefirah: 'Netzach' },
  { day: 'Thursday', name: 'Elohim Tzevaot', pointed: 'אֱלֹהִים צְבָאוֹת', sefirah: 'Hod' },
  { day: 'Friday',   name: 'Shaddai',      pointed: 'שַׁדַּי',           sefirah: 'Yesod' },
  { day: 'Saturday', name: 'Adonai',       pointed: 'אֲדֹנָי',           sefirah: 'Malkhut' },
];

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

function norm360(x) {
  x = x % 360;
  return x < 0 ? x + 360 : x;
}

// Sun sign from the calendar date, using the standard tropical boundaries.
// Boundary days are approximate by a day; the page says so.
export function sunLetter(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const idx = LETTERS.findIndex((l) => {
    const [sm, sd] = l.start;
    const [em, ed] = l.end;
    if (sm <= em) return (m === sm && d >= sd) || (m === em && d <= ed) || (m > sm && m < em);
    return (m === sm && d >= sd) || (m === em && d <= ed) || m > sm || m < em;
  });
  return LETTERS[idx === -1 ? 0 : idx];
}

// Moon longitude, low-precision series (Meeus, largest terms only).
// Good to roughly a third of a degree — plenty for a sign, except within
// about a degree of a cusp, which the page flags.
export function moonLongitude(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const t = (jd - 2451545.0) / 36525;
  const lp = norm360(218.316 + 481267.8813 * t);
  const D = norm360(297.850 + 445267.1115 * t);
  const M = norm360(357.529 + 35999.0503 * t);
  const Mp = norm360(134.963 + 477198.8676 * t);
  const F = norm360(93.272 + 483202.0175 * t);
  const r = Math.PI / 180;
  const lon = lp
    + 6.289 * Math.sin(Mp * r)
    - 1.274 * Math.sin((Mp - 2 * D) * r)
    + 0.658 * Math.sin(2 * D * r)
    - 0.214 * Math.sin(2 * Mp * r)
    - 0.110 * Math.sin(D * r)
    - 0.114 * Math.sin(2 * F * r);
  return { longitude: norm360(lon), signIndex: Math.floor(norm360(lon) / 30) };
}

export function moonLetter(date) {
  const { longitude, signIndex } = moonLongitude(date);
  const sign = SIGNS[signIndex];
  const letter = LETTERS.find((l) => l.sign === sign);
  const intoSign = longitude - signIndex * 30;
  const nearCusp = intoSign < 1 || intoSign > 29;
  return { letter, longitude, nearCusp };
}

export function holyNameOfDay(date) {
  return HOLY_NAMES[date.getDay()];
}
