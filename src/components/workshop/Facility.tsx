import './facility.css';

/** Normal-flow shell; the shared owner prewarms the scene only after the real stack mounts. */
export default function Facility(){
 return <section id="inside-toli" className="toli-facility" aria-labelledby="facility-title" data-facility="waiting">
  <header className="facility-heading"><div><p className="system-label">THE WORKSHOP</p><h2 id="facility-title">INSIDE <span>TOLI.</span></h2></div><p id="facility-description">Explore the workshop behind our service, repair and care experience.</p></header>
  <a className="facility-skip" href="#gallery" onClick={e=>{e.preventDefault();const gallery=document.getElementById('gallery');if(gallery){gallery.scrollIntoView({behavior:'auto',block:'start'});gallery.tabIndex=-1;gallery.focus({preventScroll:true});}}}>Continue to the gallery ↓</a>
  <div className="facility-stage" data-facility-host aria-describedby="facility-description">
   <p className="facility-status" role="status" data-facility-status>Preparing workshop</p>
  </div>
  <div className="facility-controls" aria-label="Workshop views">
   <div className="facility-presets">{(['overview','interior','reception'] as const).map((view,i)=><button key={view} type="button" data-workshop-preset={view} aria-pressed={i===1}>{['Overview','Inside','Reception'][i]}</button>)}</div>
   <div className="facility-adjust" aria-label="Adjust workshop view"><button type="button" data-workshop-action="left" aria-label="Rotate workshop left">←</button><button type="button" data-workshop-action="right" aria-label="Rotate workshop right">→</button><button type="button" data-workshop-action="in" aria-label="Zoom into workshop">+</button><button type="button" data-workshop-action="out" aria-label="Zoom out of workshop">−</button></div>
  </div>
  <p className="facility-caption">Explore with a horizontal drag or the view controls. Scroll to continue.</p>
 </section>;
}
