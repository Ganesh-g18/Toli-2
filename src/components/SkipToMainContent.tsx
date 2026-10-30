export default function SkipToMainContent(){
 return <a className="skip-main" href="#main-content" onClick={event=>{event.preventDefault();const main=document.getElementById('main-content');main?.focus({preventScroll:true});main?.scrollIntoView({block:'start',behavior:'instant'});}}>Skip to main content</a>;
}
