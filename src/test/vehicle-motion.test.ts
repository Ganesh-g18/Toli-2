import { expect,it } from 'vitest';
import { dampBlend,motion,retainStep } from '@/lib/vehicle-motion';
it('bounds resumed frame damping and gives camera more weight than component feedback',()=>{
 expect(dampBlend(5000,motion.camera)).toBe(dampBlend(40,motion.camera));expect(dampBlend(-20,motion.camera)).toBe(0);
 expect(dampBlend(16,motion.camera)).toBeLessThan(dampBlend(16,motion.component));
});
it('expires a manual preview on meaningful forward or reverse scroll',()=>{
 expect(retainStep(500,520)).toBe(true);expect(retainStep(500,570)).toBe(false);expect(retainStep(500,430)).toBe(false);
});
