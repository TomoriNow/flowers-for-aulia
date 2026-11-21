// The bouquet is a cloud of 3D points. Each frame the cloud is turned, flattened
// onto a character grid, and every filled cell shows a letter of the message.

const LETTERS = 'MADEWITHLOVEFORMYDEARESTAULIA~SEAN';
const HEAD_SCALE = 2;
const BIND_Y = -0.3; // where the stems are tied together
const CAMERA_TILT = 0.4; // a side-on view, tipped down onto the blooms
const CELL_W = 0.6; // width of one letter, in ems
const CELL_H = 1.15; // line height, in ems
const MIN_LETTER_PX = 10;
const MAX_LETTER_PX = 24;
const TARGET_COLS = 72; // letters across the bouquet when the screen has room
const GATHER_SECONDS = 6;
const SCATTER_SECONDS = 0.7;
const SPIN = 0.3; // radians per second

type Kind = 'r' | 't' | 's' | 'l' | 'b'; // rose, tulip, stem, leaf, ribbon
type Head = { rose: boolean; angle: number; radius: number; height: number; tilt: number };
type Point = {
  head: number; // index into heads, or -1 for stems, leaves and ribbon
  x: number; y: number; z: number;
  kind: Kind;
  tone: number; // 0 deep, 1 mid, 2 light
  delay: number; // 0..0.55, when this point joins the bouquet
  traveller: boolean; // visible while still flying in
  fromX: number; fromY: number; // scattered position, as a fraction of the grid
};

const button = document.getElementById('bouquet') as HTMLButtonElement;
const art = document.getElementById('art') as HTMLPreElement;
const side = document.querySelector('.side') as HTMLElement;
const message = document.querySelector('.msg') as HTMLElement;
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = matchMedia('(min-aspect-ratio: 7/5)'); // same breakpoint as the stylesheet

// One rose in the middle, ringed by three tulips and three roses.
const heads: Head[] = [{ rose: true, angle: 0, radius: 0, height: 0.55, tilt: 0 }];
for (let i = 0; i < 6; i++) {
  const rose = i % 2 === 1;
  // Roses lean further out than tulips, so their open faces turn towards you as they pass the front.
  heads.push({ rose, angle: i * 1.047 + 0.3, radius: 0.5, height: 0.36, tilt: rose ? 1.05 : 0.6 });
}

let points: Point[] = [];
// How far the finished bouquet reaches: sideways from the centre line, and up and down on screen.
let reach = 1, topY = 1, bottomY = -1;

// Moves a bloom's point from the bloom's own space to its place in the bouquet.
function place(p: Point, open: number): [number, number, number] {
  if (p.head < 0) return [p.x, p.y, p.z];
  const h = heads[p.head];
  const size = (0.3 + 0.7 * open) * HEAD_SCALE, width = 0.4 + 0.6 * open;
  const x = p.x * size * width, z = p.z * size * width, y = p.y * size;
  const cosTilt = Math.cos(h.tilt), sinTilt = Math.sin(h.tilt);
  const tx = x * cosTilt + y * sinTilt;
  const cos = Math.cos(h.angle), sin = Math.sin(h.angle);
  return [tx * cos - z * sin + cos * h.radius, -x * sinTilt + y * cosTilt + h.height, tx * sin + z * cos + sin * h.radius];
}

// Tall screens get a long-stemmed bouquet so it fills the height.
function build(stemEnd: number) {
  points = [];
  const add = (head: number, x: number, y: number, z: number, kind: Kind, tone: number, delay: number) => {
    const n = points.length;
    points.push({
      head, x, y, z, kind, tone,
      delay: delay + ((n * 7) % 10) * 0.005,
      traveller: n % 20 === 0,
      fromX: Math.random(),
      fromY: Math.random(),
    });
  };

  heads.forEach((h, i) => {
    const cos = Math.cos(h.angle), sin = Math.sin(h.angle);
    // Distance of this stem from the centre line at a given height.
    const spread = (y: number) =>
      y < BIND_Y
        ? 0.03 + h.radius * 0.3 * (BIND_Y - y) / (BIND_Y - stemEnd)
        : 0.03 + (h.radius - 0.03) * Math.pow((y - BIND_Y) / (h.height - BIND_Y), 1.6);

    for (let u = 0; u <= 1; u += 0.012) {
      const y = stemEnd + u * (h.height - stemEnd), q = spread(y);
      add(-1, cos * q, y, sin * q, 's', 1, u * 0.25);
    }

    if (h.radius > 0) {
      // One leaf per stem, reaching outwards under the blooms.
      const y0 = -0.14 + 0.1 * (i % 3), q = spread(y0), dir = h.angle + (i % 2 ? 0.5 : -0.5);
      for (let p = 0; p <= 1; p += 0.03) {
        for (let w = -1; w <= 1; w += 0.15) {
          const across = w * 0.09 * Math.sin(p * Math.PI);
          add(-1,
            cos * q + Math.cos(dir) * p * 0.46 - Math.sin(dir) * across,
            y0 + p * 0.2 - p * p * 0.16,
            sin * q + Math.sin(dir) * p * 0.46 + Math.cos(dir) * across,
            'l', Math.abs(w) < 0.1 ? 2 : 1, 0.2 + p * 0.05);
        }
      }
    }

    const delay = 0.3 + 0.02 * i;
    if (h.rose) {
      // A rose is one long petal strip wound into a spiral around a deep heart. Each full
      // winding switches between lit and shaded, which gives the rings you see from the front.
      const steps = 320;
      for (let j = 0; j < steps; j++) {
        const f = j / steps, turn = f * 19, r = 0.02 + 0.125 * f;
        const lit = Math.floor(turn / (Math.PI * 2)) % 2 === 1;
        for (let v = 0; v <= 1.001; v += 0.125) {
          const q = r * (0.5 + 0.5 * Math.sin(v * Math.PI / 2));
          const tone = lit ? (v > 0.4 ? 2 : 1) : 0;
          add(i, Math.cos(turn) * q, v * (0.15 - 0.06 * f), Math.sin(turn) * q, 'r', tone, delay);
        }
      }
    } else {
      // A tulip is a tall egg-shaped cup with three pointed petal tips.
      for (let turn = 0; turn < Math.PI * 2; turn += 0.08) {
        const petal = Math.abs(Math.cos(1.5 * turn)), rim = 0.66 + 0.34 * petal;
        for (let v = 0; v <= rim; v += 0.04) {
          const q = 0.085 * Math.pow(Math.sin(0.35 + v * 2.2), 0.7);
          const tone = v > rim - 0.1 ? 2 : v < 0.2 || petal < 0.22 ? 0 : 1;
          add(i, Math.cos(turn) * q, v * 0.33, Math.sin(turn) * q, 't', tone, delay);
        }
      }
    }
  });

  // The ribbon: a band around the stems, with a two-loop bow and two tails.
  for (let turn = 0; turn < Math.PI * 2; turn += 0.1) {
    for (let y = BIND_Y - 0.05; y < BIND_Y + 0.06; y += 0.02) add(-1, Math.cos(turn) * 0.1, y, Math.sin(turn) * 0.1, 'b', 2, 0.15);
    for (const s of [-1, 1]) add(-1, s * (0.13 + Math.cos(turn) * 0.11), BIND_Y + Math.sin(turn) * 0.08, 0.12, 'b', 2, 0.16);
  }
  for (let p = 0; p <= 1; p += 0.03) {
    for (const s of [-1, 1]) add(-1, s * (0.03 + p * 0.12), BIND_Y - p * 0.3, 0.12, 'b', 2, 0.17);
  }

  // Measure the finished bouquet from every side, so the grid can be sized to hold all of it.
  reach = 0; topY = -9; bottomY = 9;
  const cosT = Math.cos(CAMERA_TILT), sinT = Math.sin(CAMERA_TILT);
  for (const p of points) {
    const [x, y, z] = place(p, 1), r = Math.hypot(x, z);
    reach = Math.max(reach, r);
    topY = Math.max(topY, y * cosT + r * sinT);
    bottomY = Math.min(bottomY, y * cosT - r * sinT);
  }
}

let cols = 0, rows = 0, zoom = 0; // zoom = columns per unit of bouquet
let depth = new Float32Array(0);
let owner = new Int8Array(0); // which bloom fills each cell, or -1
let cells: (string | null)[] = [];
let wasWide: boolean | null = null;

// Picks the letter size and grid for this screen: as many letters as fit, never smaller than readable.
function fit() {
  if (wide.matches !== wasWide) {
    wasWide = wide.matches;
    build(wasWide ? -0.9 : -1.1);
  }
  const vw = innerWidth, vh = innerHeight;
  const boxW = wasWide ? vw - 32 - vw * 0.04 - side.getBoundingClientRect().width : vw - 32;
  const boxH = wasWide ? vh - 48 : vh * 0.64;
  const span = topY - bottomY;
  const pxPerUnit = Math.min(boxW / (2 * reach), boxH / span);
  const letter = Math.max(MIN_LETTER_PX, Math.min(MAX_LETTER_PX, (pxPerUnit * 2 * reach) / (TARGET_COLS * CELL_W)));
  cols = Math.max(20, Math.floor(Math.min(boxW, pxPerUnit * 2 * reach) / (letter * CELL_W)));
  zoom = (cols - 2) / (2 * reach);
  rows = Math.ceil(span * zoom * CELL_W / CELL_H) + 2;
  depth = new Float32Array(cols * rows);
  owner = new Int8Array(cols * rows);
  cells = new Array(cols * rows);
  art.style.fontSize = letter + 'px';
}

const ease = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 3));

let gather = still || location.hash === '#full' ? 1 : 0; // 0 = letters scattered, 1 = bouquet complete
let gathering = true;
let angle = 0.4;
let fling = 0;
let lastTime = 0;
let dragging = false;
let lastX = 0;
let dragged = 0;

function draw() {
  depth.fill(-9);
  cells.fill(null);
  owner.fill(-1);
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const cosT = Math.cos(CAMERA_TILT), sinT = Math.sin(CAMERA_TILT);
  const rowZoom = zoom * CELL_W / CELL_H;

  for (const p of points) {
    const arrive = ease((gather - p.delay) / 0.45);
    if (arrive < 0.8 && !p.traveller) continue;

    const open = p.head < 0 ? 1 : ease((gather - 0.45 - 0.02 * p.head) / 0.4);
    const [x, y, z] = place(p, open);
    const sx = x * cosA + z * sinA, sz = -x * sinA + z * cosA;
    const sy = y * cosT - sz * sinT, d = y * sinT + sz * cosT;
    const fromCol = p.fromX * cols, fromRow = p.fromY * rows;
    const col = Math.round(fromCol + (cols / 2 + sx * zoom - fromCol) * arrive);
    const row = Math.round(fromRow + (1 + (topY - sy) * rowZoom - fromRow) * arrive);
    if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

    const i = row * cols + col;
    if (d > depth[i]) {
      depth[i] = d;
      // Petals at the back of the bouquet drop one tone so it reads as round.
      cells[i] = p.kind + Math.max(0, p.tone - (d < -0.15 ? 1 : 0));
      owner[i] = arrive === 1 ? p.head : -1;
    }
  }

  // Leave a one-letter gap wherever two different blooms meet, so each flower keeps its outline.
  for (let i = 0; i < cols * rows - cols; i++) {
    const a = owner[i];
    if (a < 0) continue;
    const right = owner[i + 1], below = owner[i + cols];
    if ((right >= 0 && right !== a) || (below >= 0 && below !== a)) cells[i] = null;
  }

  let html = '';
  let open: string | null = null;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const i = row * cols + col, cls = cells[i];
      if (cls !== open) {
        if (open) html += '</span>';
        if (cls) html += `<span class="${cls}">`;
        open = cls;
      }
      html += cls ? LETTERS[i % LETTERS.length] : ' ';
    }
    if (open) { html += '</span>'; open = null; }
    html += '\n';
  }
  art.innerHTML = html;
}

function tick(time: number) {
  const dt = Math.min(0.05, (time - lastTime) / 1000 || 0);
  lastTime = time;
  if (gathering) {
    gather = Math.min(1, gather + dt / GATHER_SECONDS);
  } else {
    gather = Math.max(0, gather - dt / SCATTER_SECONDS);
    if (gather === 0) gathering = true;
  }
  if (gather > 0.9 && gathering) message.classList.add('shown');
  if (!dragging) {
    angle += (SPIN + fling) * dt;
    fling *= 0.95;
  }
  draw();
  requestAnimationFrame(tick);
}

function turn(by: number) {
  angle += by;
  if (still) draw();
}

button.addEventListener('pointerdown', (e) => {
  dragging = true;
  lastX = e.clientX;
  dragged = 0;
  button.setPointerCapture(e.pointerId);
});
button.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  dragged += Math.abs(dx);
  fling = dx * 0.5;
  turn(dx * 0.012);
});
button.addEventListener('pointerup', () => { dragging = false; });
button.addEventListener('pointercancel', () => { dragging = false; });
// A tap, click, Enter or Space: scatter the letters. A drag that ends here is not a tap.
button.addEventListener('click', () => {
  if (dragged < 6) {
    if (still) turn(Math.PI / 4); // no flying letters: show the next side instead
    else gathering = false;
  }
  dragged = 0;
});
button.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    turn(e.key === 'ArrowLeft' ? -0.2 : 0.2);
    e.preventDefault();
  }
});

addEventListener('resize', () => {
  fit();
  if (still) draw();
});

fit();
if (still || gather === 1) message.classList.add('shown');
if (still) draw();
else requestAnimationFrame(tick);
