/** Independent prerequisites; whichever becomes true last may request a demand frame. */
export function workshopFrameReady(s:{asset:boolean;active:boolean;owner:boolean;visible:boolean;context:boolean;width:number;height:number;camera:boolean;model:boolean}) {
 return s.asset&&s.active&&s.owner&&s.visible&&s.context&&s.camera&&s.model&&Number.isFinite(s.width)&&Number.isFinite(s.height)&&s.width>0&&s.height>0;
}
