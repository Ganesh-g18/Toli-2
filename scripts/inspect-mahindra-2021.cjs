const fs = require("fs");

function pngInfo(file) {
  const b = fs.readFileSync(file);
  const w = b.readUInt32BE(16);
  const h = b.readUInt32BE(20);
  const ct = b[25];
  const colorTypes = { 0: "grayscale", 2: "RGB", 3: "palette", 4: "gray+alpha", 6: "RGBA" };
  console.log(file, "->", w + "x" + h, colorTypes[ct] || "ct=" + ct, (b.length / 1024).toFixed(1) + " KB");
}

pngInfo("D:/Downloads/Toli/Mahindra-Logo-2021-768x432.png");