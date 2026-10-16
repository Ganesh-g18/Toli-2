import logo from '@/assets/big-transparent.png';

/** The approved navigation capsule, shared by every full brand mark. The parent owns any link. */
export default function ToliLogoPill({size='standard'}:{size?:'navigation'|'standard'|'compact'}) {
 return <span className={`toli-logo-pill toli-logo-pill-${size}`}><img src={logo} width={1483} height={352} alt="Toli Motors"/></span>;
}
