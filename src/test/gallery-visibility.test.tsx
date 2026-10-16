import {cleanup,render,screen,fireEvent,within} from '@testing-library/react';
import {afterEach,it,expect,vi} from 'vitest';
import {MemoryRouter} from 'react-router-dom';
import {readFileSync,readdirSync} from 'node:fs';
import Gallery from '@/components/Gallery';
import Index from '@/pages/Index';
// Isolate homepage composition from unrelated section effects and loading.
vi.mock('@/components/journey/JourneyProvider',()=>({JourneyProvider:({children})=><div>{children}</div>}));
vi.mock('@/components/journey/ExperienceNavigation',()=>({default:()=>null}));
vi.mock('@/components/ScrollProgress',()=>({default:()=>null}));
vi.mock('@/components/Hero',()=>({default:()=> <section id="hero"/>}));
vi.mock('@/components/Services',()=>({default:()=> <section id="services"/>}));
vi.mock('@/components/journey/ComponentExperience',()=>({default:()=> <section id="components"/>}));
vi.mock('@/components/HowItWorks',()=>({default:()=> <section id="process"/>}));
vi.mock('@/components/CtaBanner',()=>({default:()=> <section id="booking"/>}));
vi.mock('@/components/Contact',()=>({default:()=>null}));
vi.mock('@/components/Footer',()=>({default:()=>null}));
vi.mock('@/components/WhatsAppSender',()=>({default:()=>null}));
vi.mock('@/components/journey/TrustChapter',()=>({default:()=> <section id="trust"/>}));
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it.each([false,true])('renders gallery without observers or image load callbacks, reduced motion=%s',reduced=>{
 vi.stubGlobal('IntersectionObserver',undefined);vi.stubGlobal('matchMedia',()=>({matches:reduced,addEventListener:vi.fn(),removeEventListener:vi.fn()}));
 const {container}=render(<Gallery/>);expect(screen.getByRole('heading',{name:'WORKSHOP GALLERY'})).toBeVisible();
 expect(container.querySelectorAll('[data-motion],.text-reveal,.image-reveal')).toHaveLength(0);
 screen.getAllByRole('button',{name:/View Toli Motors gallery image/}).forEach(button=>expect(button).toBeVisible());
 expect(container.querySelector('#gallery')).toBeVisible();
});
it('mounts exactly one standalone Gallery after trust and before the final request on the active homepage',async()=>{
 const {container}=render(<MemoryRouter><Index/></MemoryRouter>);const gallery=screen.getByRole('region',{name:'WORKSHOP GALLERY'});
 expect(gallery).toBeVisible();expect(gallery.closest('details')).toBeNull();expect(container.querySelectorAll('#gallery')).toHaveLength(1);
 await screen.findByText('',{selector:'#booking'});
 expect(container.querySelector('#trust')!.compareDocumentPosition(gallery)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();expect(gallery.compareDocumentPosition(container.querySelector('#booking')!)&Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
it('expands all existing assets and preserves lightbox previous/next navigation',()=>{
 render(<Gallery/>);fireEvent.click(screen.getByRole('button',{name:'SEE MORE'}));const buttons=screen.getAllByRole('button',{name:/View Toli Motors gallery image/});
 const files=readdirSync('src/assets/gallery').filter(f=>/\.(webp|avif)$/.test(f));expect(buttons).toHaveLength(files.length);
 for(const file of files){const bytes=readFileSync(`src/assets/gallery/${file}`);if(file.endsWith('.webp')){expect(bytes.subarray(0,4).toString()).toBe('RIFF');expect(bytes.subarray(8,12).toString()).toBe('WEBP');}else{expect(bytes.subarray(4,12).toString()).toBe('ftypavif');}}
 buttons[0].focus();fireEvent.click(buttons[0]);const dialog=screen.getByRole('dialog');expect(within(dialog).getByRole('img')).toHaveAttribute('alt','Toli Motors gallery image 1');
 fireEvent.click(within(dialog).getByRole('button',{name:'Next image'}));expect(within(dialog).getByRole('img')).toHaveAttribute('alt','Toli Motors gallery image 2');
 fireEvent.click(within(dialog).getByRole('button',{name:'Previous image'}));expect(within(dialog).getByRole('img')).toHaveAttribute('alt','Toli Motors gallery image 1');
 fireEvent.keyDown(window,{key:'Escape'});expect(screen.queryByRole('dialog')).toBeNull();expect(buttons[0]).toHaveFocus();
});
