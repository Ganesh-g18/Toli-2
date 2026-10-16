import { expect, it, vi } from 'vitest';
import { requireVehicleAsset, vehicleClasses, vehicleRegistry } from '@/lib/vehicle-model/registry';

it('reserves four distinct visual classes without invented asset paths or component mappings', () => {
  expect(vehicleClasses).toEqual(['suv', 'sedan', 'coupe', 'supercar']);
  expect(Object.keys(vehicleRegistry)).toEqual([...vehicleClasses]);
  expect(vehicleClasses.map(id => vehicleRegistry[id].label)).toEqual(['SUV', 'Sedan', 'Coupe', 'Supercar']);
  for (const id of vehicleClasses) {
    expect(vehicleRegistry[id]).toMatchObject({ id, status: 'asset-required', asset: null });
  }
});

for (const id of vehicleClasses) {
  it(`blocks unavailable ${id} before network loading without substituting another class`, () => {
    const fetch = vi.spyOn(globalThis, 'fetch');
    try {
      expect(() => requireVehicleAsset(id)).toThrow(`${id.toUpperCase()} 3D ASSET REQUIRED`);
      expect(fetch).not.toHaveBeenCalled();
    } finally {
      fetch.mockRestore();
    }
  });
}
