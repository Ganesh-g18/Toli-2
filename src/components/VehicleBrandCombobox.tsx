import VehicleCombobox from './VehicleCombobox';
import { vehicleBrands } from '@/lib/vehicle-brands';
export default function VehicleBrandCombobox(props:{id:string;value:string;onChange:(value:string)=>void}) {
 return <VehicleCombobox {...props} name="brand" label="Vehicle Brand" listLabel="Vehicle brands" placeholder="Search or select brand" options={vehicleBrands} note="Optional. Select a brand or enter your own. Service availability is confirmed by our team."/>;
}
