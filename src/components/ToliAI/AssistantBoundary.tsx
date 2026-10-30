import { Component, type ReactNode } from 'react';
/** An unavailable optional panel must not take down the service website. */
export default class AssistantBoundary extends Component<{children:ReactNode;onClose():void},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<div className="toli-ai-loading" role="alert">TOLI AI could not load. Please reload to try again. <button type="button" onClick={this.props.onClose}>Close</button></div>:this.props.children;}
}
