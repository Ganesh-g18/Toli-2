import { describe,it,expect,vi,afterEach } from 'vitest';
import { chapterFor,chooseDock,journeyPose,sceneService } from '@/lib/journey';
import { publishDepth,subscribePageDepth } from '@/lib/depth-channel';
describe('full-site automotive story',()=>{
 it('maps the actual four process steps and settles the final vehicle',()=>{
  expect([0,1,2,3].map(step=>chapterFor('process',.5,step))).toEqual(['inspection','pickup','service','ready']);
  expect(journeyPose('parts',.5).split).toBeGreaterThan(0);expect(journeyPose('ready',.9).split).toBe(0);expect(journeyPose('completion',.9)).toMatchObject({split:0,scan:0,clean:1});
  expect(journeyPose('service',-10).scan).toBe(0);expect(journeyPose('service',10).scan).toBe(1);
 });
 it('chooses one visible dock and pauses during quiet reading sections',()=>{
  expect(chooseDock([{top:1600,bottom:2000,height:400},{top:-600,bottom:-200,height:400}],900)).toBe(-1);
  expect(chooseDock([{top:100,bottom:500,height:400},{top:650,bottom:1050,height:400}],900)).toBe(0);
  expect(chooseDock([{top:-300,bottom:100,height:400},{top:300,bottom:700,height:400}],900)).toBe(1);
 });
 it('maps only actual service categories to illustrative components',()=>{
  expect([0,1,2,3,4,5,6,7,8].map(sceneService)).toEqual([0,1,2,3,0,0,0,0,0]);
  expect(chapterFor('services',.5)).toBe('parts');expect(chapterFor('services',1)).toBe('ready');
 });
 it('shares existing damped pointer input across sections and unsubscribes',()=>{
  const listener=vi.fn(),node=document.createElement('div'),off=subscribePageDepth(listener);
  publishDepth(node,{x:.1,y:.2});expect(listener).toHaveBeenCalledWith(node,{x:.1,y:.2});off();publishDepth(node,{x:0,y:0});expect(listener).toHaveBeenCalledTimes(1);
 });
});
afterEach(()=>vi.restoreAllMocks());

import { activeNavigation } from '@/lib/navigation-state';
it('keeps navigation synchronized with physical page order instead of link order',()=>{
 expect(activeNavigation([{id:'services',top:-100},{id:'offers',top:-1500},{id:'about',top:900}])).toBe('services');
 expect(activeNavigation([{id:'services',top:600},{id:'offers',top:-50}])).toBe('offers');
});
