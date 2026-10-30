import './recovery.css';
import {Component,createElement,useEffect,useRef,type ReactNode} from 'react';
import {StandardLink} from './Recovery';
function reloadCurrentRelease(){window.location.reload();}
export function ChunkFailure({label,close}:{label:string;close?:()=>void}){
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus({preventScroll:true});},[]);
 return <section className="stage-chunk-failure" role="alert"><h2 ref={heading} tabIndex={-1}>{label} could not open.</h2><p>Reload to use the current website release. Your unsent in-tab draft will be cleared.</p><button onClick={reloadCurrentRelease}>Reload current release</button> <StandardLink/>{close&&<> <button onClick={close}>Close</button></>}</section>;
}
/** No automatic reload: a failed browser module may remain rejected for this document. */
export class ChunkBoundary extends Component<{children:ReactNode;label:string;close?:()=>void},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?createElement(ChunkFailure,{label:this.props.label,close:this.props.close}):this.props.children;}
}
