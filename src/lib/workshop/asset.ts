/** Photo-referenced architecture, not a survey or live facility data. */
export const workshopAsset = Object.freeze({
  url: 'models/toli-workshop-web-v2.glb',
  source: 'tools/3d/toli-workshop/exports/toli-workshop-web-v2.glb',
  sha256: 'b2461de9d4a12014e7cfbfaf692363f42a6bdf7018b75cd8e7bb7ec929f7dc98',
  bytes: 4076400, triangles: 47255, vertices: 88459, meshes: 18, materials: 18, textures: 8,
  configuration: 'Photo-referenced 2024 workshop configuration; dimensions estimated.',
});
export const workshopUrl = () => `${import.meta.env.BASE_URL}${workshopAsset.url}`;
