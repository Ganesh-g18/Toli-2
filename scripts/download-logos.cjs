const https = require("https");
const fs = require("fs");

const dir = "D:/Apps/tolimotors-main/tolimotors-main/src/assets/brands";

function download(url, file) {
  return new Promise((resolve, reject) => {
    console.log("GET", url);
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log("Redirect to", res.headers.location);
        download(res.headers.location, file).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        console.log("   status", res.statusCode);
        reject(new Error("status " + res.statusCode));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        fs.writeFileSync(file, Buffer.concat(chunks));
        console.log("   saved", file, Buffer.concat(chunks).length, "bytes");
        resolve();
      });
    });
    req.setTimeout(25000, () => { console.log("   timeout"); req.destroy(new Error("timeout")); });
    req.on("error", (e) => { console.log("   error", e.message); reject(e); });
  });
}

(async () => {
  try {
    await download(
      "https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main/kia-logo.svg",
      dir + "/kia-logo.svg"
    );
  } catch (e) { console.log("kia failed:", e.message); }
  try {
    await download(
      "https://cdn.jsdelivr.net/gh/vehiclespecs/brand-logos@main/mahindra-logo.png",
      dir + "/mahindra-logo.png"
    );
  } catch (e) { console.log("mahindra old failed:", e.message); }
  try {
    await download(
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Mahindra_logo.svg",
      dir + "/mahindra-wikimedia.svg"
    );
  } catch (e) { console.log("mahindra wikimedia failed:", e.message); }
})();