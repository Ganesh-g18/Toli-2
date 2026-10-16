import { describe, it, expect, vi, afterEach } from "vitest";
import { sceneQuality, sceneDpr, storyPose, storyProgress, performanceDecision } from "@/lib/vehicle-policy";
import { canonicalSectionHash, installSectionLinks } from "@/lib/section-links";
import { publishDepth, subscribeDepth } from "@/lib/depth-channel";

afterEach(()=>{vi.restoreAllMocks();document.body.innerHTML='';history.replaceState(null,'','/');});
describe('optional vehicle policy',()=>{
  it('uses capability and data savings for fallback while retaining reduced-motion manual inspection',()=>{
    expect(sceneQuality(767,false)).toBe('tablet');expect(sceneQuality(1920,true)).toBe('desktop');
    expect(sceneQuality(1440,false,true)).toBe('tablet');expect(sceneQuality(768,false)).toBe('tablet');expect(sceneQuality(1024,false)).toBe('desktop');
    expect(sceneDpr('desktop',3)).toBe(1.5);expect(sceneDpr('tablet',3)).toBe(1);
  });
  it('enters from depth, separates modestly and completely reassembles at exit',()=>{
    expect(storyPose(0)).toMatchObject({entry:0,separation:0});expect(storyPose(.5).separation).toBeGreaterThan(.5);
    expect(storyPose(1)).toEqual({entry:1,separation:0,exit:1});
    expect(storyProgress(1200,600,900)).toBe(0);expect(storyProgress(-1000,600,900)).toBe(1);
  });
  it('downgrades measured slow active frames, stops severe stalls, and ignores insufficient evidence',()=>{
    expect(performanceDecision([100],false)).toBe('keep');expect(performanceDecision(Array(36).fill(35),false)).toBe('lower');
    expect(performanceDecision(Array(36).fill(35),true)).toBe('keep');expect(performanceDecision(Array(36).fill(80),true)).toBe('fallback');
  });
  it('shares DOM pointer values and removes subscribers on cleanup',()=>{
    const node=document.createElement('div'), listener=vi.fn();const off=subscribeDepth(node,listener);
    publishDepth(node,{x:.2,y:-.3});expect(listener).toHaveBeenCalledWith({x:.2,y:-.3});off();publishDepth(node,{x:0,y:0});expect(listener).toHaveBeenCalledTimes(1);
  });
});
describe('existing homepage section URLs',()=>{
  it('normalizes only known legacy sections, leaving legal and unknown routes intact',()=>{
    expect(canonicalSectionHash('#services')).toBe('#/#services');expect(canonicalSectionHash('#contact')).toBe('#/#contact');
    expect(canonicalSectionHash('#/privacy-policy')).toBe('#/privacy-policy');expect(canonicalSectionHash('#unknown')).toBe('#unknown');
  });
  it('waits for lazy HTML sections on a direct legacy URL and cleans up observation',async()=>{
    history.replaceState(null,'','/#services');const scroll=vi.fn();Object.defineProperty(Element.prototype,'scrollIntoView',{configurable:true,value:scroll});
    const off=installSectionLinks();expect(location.hash).toBe('#/#services');
    const section=document.createElement('section');section.id='services';document.body.append(section);
    await new Promise(resolve=>setTimeout(resolve,0));expect(scroll).toHaveBeenCalledTimes(1);off();
    window.dispatchEvent(new HashChangeEvent('hashchange'));expect(scroll).toHaveBeenCalledTimes(1);
  });
});

it('allows only explicitly eligible phones into the tablet scene, honoring motion and data preferences',()=>{
 expect(sceneQuality(390,false,false,true)).toBe('tablet');expect(sceneQuality(390,false)).toBe('tablet');expect(sceneQuality(390,false,false,false)).toBe('fallback');expect(sceneQuality(390,true,false,true)).toBe('tablet');expect(sceneQuality(390,false,true,true)).toBe('tablet');
});
