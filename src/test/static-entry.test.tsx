import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,render,screen} from '@testing-library/react';
import App from '@/App';
vi.mock('@/pages/Index',()=>({default:()=> <h1>Traditional homepage</h1>}));
afterEach(()=>{cleanup();vi.restoreAllMocks();});
it('opens the traditional website at root',async()=>{history.replaceState(null,'','/Toli-2/#/');render(<App/>);expect(await screen.findByRole('heading',{name:'Traditional homepage'})).toBeInTheDocument();expect(document.querySelector('.spatial-experience')).toBeNull();});
it('does not mount the removed experimental showroom deep link',async()=>{vi.spyOn(console,'error').mockImplementation(()=>{});history.replaceState(null,'','/Toli-2/#/3d-production-preview');render(<App/>);expect(await screen.findByRole('heading',{name:'404'})).toBeInTheDocument();expect(document.querySelector('canvas')).toBeNull();});
