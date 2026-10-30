/** Curated current Indian-market passenger brands. Verified 2026-10-14; see docs/indian-vehicle-brands.md.
 * Suggestions identify vehicles, not workshop service coverage. Legacy/imported brands remain manual entries. */
export const vehicleBrands = ['Aston Martin','Audi','Bentley','BMW','BYD','Citroën','Ferrari','Force Motors','Honda','Hyundai','Isuzu','Jeep','Kia','Lamborghini','Land Rover','Lexus','Lotus','Mahindra','Maruti Suzuki','Maserati','McLaren','Mercedes-Benz','MG','MINI','Nissan','Porsche','Renault','Rolls-Royce','Škoda','Tata','Tesla','Toyota','VinFast','Volkswagen','Volvo'].sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'}));
export const normalizeBrand=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('en').replace(/[^a-z0-9]/g,'');
export function canonicalBrand(value:string){const trimmed=value.trim();return vehicleBrands.find(brand=>normalizeBrand(brand)===normalizeBrand(trimmed))??trimmed;}
