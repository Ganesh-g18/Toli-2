const fs = require("fs");
const dir = "D:/Apps/tolimotors-main/tolimotors-main/src/assets/brands";
const files = ["mahindra-logo.png", "mahindra-logo-new.png", "mahindra-new-logo.png", "kia-logo.svg", "kia-new.svg"];
for (const f of files) {
  const p = dir + "/" + f;
  if (!fs.existsSync(p)) { console.log(f, "MISSING"); continue; }
  const buf = fs.readFileSync(p);
  let info = buf.length + " bytes";
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    info += " PNG " + w + "x" + h;
  } else if (buf.slice(0, 4).toString() === "RIFF") {
    info += " WEBP";
  } else if (buf.slice(0, 2).toString() === "BM") {
    info += " BMP";
  } else {
    let s = buf.slice(0, 120).toString();
    if (s.trim().startsWith("<")) info += " XML/SVG";
    else info += " unknown (" + s.replace(/\s+/g, " ").slice(0, 40) + ")";
  }
  console.log(f, info);
}