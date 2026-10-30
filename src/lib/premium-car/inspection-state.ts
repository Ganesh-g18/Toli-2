export type InspectionPart='leftDoor'|'rightDoor'|'hood'|'mirrors';
export type InspectionAction=InspectionPart|'reset'|'rotate';
export type InspectionState=Record<InspectionPart,boolean>;
export const closedInspection=():InspectionState=>({leftDoor:false,rightDoor:false,hood:false,mirrors:false});
