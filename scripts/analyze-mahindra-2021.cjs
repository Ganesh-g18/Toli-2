const fs = require("fs");
const zlib = require("zlib");

const file = "D:/Downloads/Toli/Mahindra-Logo-2021-768x432.png";
const b = fs.readFileSync(file);
const w = b.readUInt32BE(16);
const h = b.readUInt32BE(20);
const ct = b[25];
let idat = Buffer.alloc(0);
let off = 8;
while (off < b.length) {
  const len = b.readUInt32BE(off);
  const type = b.toString("ascii", off + 4, off + 8);
  if (type === "IDAT") idat = Buffer.concat([idat, b.slice(off + 8, off + 8 + len)]);
  off += 12 + len;
}
const raw = zlib.inflateSync(idat);
const bpp = ct === 6 ? 4 : 3;
const stride = w * bpp;
const out = Buffer.alloc(w * h * 4);
let pos = 0;
let prev = Buffer.alloc(stride);
for (let y = 0; y < h; y++) {
  const filter = raw[pos++];
  const line = raw.slice(pos, pos + stride);
  pos += stride;
  const recon = Buffer.alloc(stride);
  for (let i = 0; i < stride; i++) {
    const a = i >= bpp ? recon[i - bpp] : 0;
    const bb = prev[i];
    const c = prev[i - bpp] || 0;
    let val = line[i];
    if (filter === 1) val = (val + a) & 0xff;
    else if (filter === 2) val = (val + bb) & 0xff;
    else if (filter === 3) val = (val + ((a + bb) >> 1)) & 0xff;
    else if (filter === 4) {
      const p = a + bb - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - bb), pc = Math.abs(p - c);
      const pr = pa <= pb && pa <= pc ? a : pb <= pc ? bb : c;
      val = (val + pr) & 0xff;
    }
    recon[i] = val;
  }
  for (let x = 0; x < w; x++) {
    const i = x * bpp;
    const o = (y * w + x) * 4;
    if (ct === 6) {
      out[o] = recon[i]; out[o + 1] = recon[i + 1]; out[o + 2] = recon[i + 2]; out[o + 3] = recon[i + 3];
    } else {
      out[o] = recon[i]; out[o + 1] = recon[i + 1]; out[o + 2] = recon[i + 2]; out[o + 3] = 255;
    }
  }
  prev = recon;
}

// bbox of non-transparent pixels
let minX = w, minY = h, maxX = -1, maxY = -1, count = 0;
const colors = {};
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const o = (y * w + x) * 4;
  if (out[o + 3] > 40) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    count++;
    const key = Math.round(out[o] / 16) * 16 + "," + Math.round(out[o + 1] / 16) * 16 + "," + Math.round(out[o + 2] / 16) * 16;
    colors[key] = (colors[key] || 0) + 1;
  }
}
console.log("opaque px:", count, "(transparent bg)");
console.log("bbox:", minX + "," + minY, "->", maxX + "," + maxY, "| content ", ((maxX-minX+1)/w*100).toFixed(0), "%w x", ((maxY-minY+1)/h*100).toFixed(0), "%h");
console.log("top colors:");
for (const [c, n] of Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log("  ", c, n);

// ASCII map
const ROWS = 10, COLS = 28;
console.log("\nASCII map (*=content, #=dense):");
for (let ry = 0; ry < ROWS; ry++) {
  let line = "";
  for (let cx = 0; cx < COLS; cx++) {
    const x0 = Math.floor(cx / COLS * w), y0 = Math.floor(ry / ROWS * h);
    let cnt = 0;
    for (let dy = 0; dy < Math.floor(h / ROWS); dy++) for (let dx = 0; dx < 4; dx++) {
      const xx = x0 + dx, yy = y0 + dy;
      if (xx < w && yy < h) { const o = (yy * w + xx) * 4; if (out[o + 3] > 40) cnt++; }
    }
    const total = Math.floor(h / ROWS) * 4;
    line += cnt / total > 0.5 ? "#" : cnt / total > 0.12 ? "*" : ".";
  }
  console.log(line);
}