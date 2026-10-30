const responsive=import.meta.glob<string>('/src/assets/gallery-responsive/*.webp',{eager:true,query:'?url',import:'default'});
const modules=import.meta.glob<string>('/src/assets/gallery/*.{jpg,jpeg,png,webp,avif,gif}',{eager:true,query:'?url',import:'default'});
// Visually audited original metadata, arranged below into editorial groups.
// Captions describe visible content, not the result of any service.
const sequence: [string,string,number,number][]=[
 ['gallery-1.webp','Workshop exterior viewed from across the road',1440,1080],
 ['gallery-6.webp','Vehicles parked inside the workshop service bays',1728,1296],
 ['gallery-5.webp','Workshop reception and glass partition',1728,1296],
 ['WhatsApp Image 2026-08-06 at 8.16.55 AM.webp','People gathered in front of an event backdrop',810,1080],
 ['WhatsApp Image 2026-08-06 at 8.09.20 AM.webp','Workshop frontage and parked vehicles beside the road',1440,1080],
 ['gallery-2.webp','Wide view along the workshop floor',1434,1080],
 ['gallery-7.webp','Office desk inside the workshop',1440,1080],
 ['WhatsApp Image 2026-08-06 at 8.216.56 AM.webp','Group photograph inside the workshop at an event',1440,1080],
 ['gallery-4.avif','Front entrance of the Toli Motors workshop',1728,1301],
 ['gallery-3.webp','Vehicles and equipment inside the workshop',1440,1080],
 ['WhatsApp Image 2026-08-06 at 8.16.552 AM.webp','People standing together at a workshop event',810,1080],
 ['WhatsApp Image 2026-08-06 at 8.09.21 2AM.webp','Roadside view of the workshop and parked vehicles',1440,1080],
 ['WhatsApp Image 2026-08-06 at 8.16.582 AM.webp','Event group photograph in front of a display backdrop',810,1080],
 ['WhatsApp Image 2026-08-06 at 8.09.21 AM.webp','Workshop frontage viewed across the road',1440,1080],
 ['WhatsApp Image 2026-08-06 2at 8.16.56 AM.webp','People gathered on a red carpet at a workshop event',810,1080],
 ['WhatsApp Image 2026-08-06 at 8.09.25 2AM.webp','Wide roadside view of the workshop frontage',1440,1080],
];
const editorialOrder=['gallery-6.webp','gallery-4.avif','gallery-5.webp','gallery-7.webp',
 'gallery-1.webp','WhatsApp Image 2026-08-06 at 8.16.55 AM.webp','gallery-2.webp','WhatsApp Image 2026-08-06 at 8.216.56 AM.webp',
 'gallery-3.webp','WhatsApp Image 2026-08-06 at 8.09.20 AM.webp','WhatsApp Image 2026-08-06 at 8.16.552 AM.webp','WhatsApp Image 2026-08-06 at 8.09.21 2AM.webp',
 'WhatsApp Image 2026-08-06 at 8.09.21 AM.webp','WhatsApp Image 2026-08-06 at 8.16.582 AM.webp','WhatsApp Image 2026-08-06 at 8.09.25 2AM.webp','WhatsApp Image 2026-08-06 2at 8.16.56 AM.webp'];
export const galleryCounter=(index:number,count:number)=>`${String(index+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
export const galleryImages=editorialOrder.map(file=>sequence.find(entry=>entry[0]===file)!).map(([file,caption,width,height],index)=>({sizes:`(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) ${index===0||index===3?'92':'46'}vw, ${[58,42,25,17,75,25,42,58,42,58,25,75,33,17,33,17][index]}vw`,srcSet:[480,960].filter(size=>size<width).map(size=>`${responsive[`/src/assets/gallery-responsive/${file}.${size}.webp`]} ${size}w`).concat(`${modules[`/src/assets/gallery/${file}`]} ${width}w`).join(', '),src:modules[`/src/assets/gallery/${file}`],file,caption,width,height,alt:`Toli Motors gallery image ${index+1}: ${caption}`}));
