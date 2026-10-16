import { useState } from 'react';
import { Link } from 'wouter';
import { Heart, Menu, X } from 'lucide-react';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="The Adiya Story home" onClick={close}>
      <span className="brand-mark" aria-hidden="true">A</span>
      <span>THE ADIYA STORY<small>PRIYANKA &amp; ROHIT ADITYA</small></span>
    </Link>
    <nav className={`main-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
      <Link href="/#story" onClick={close}>Our story</Link>
      <Link href="/#celebrations" onClick={close}>Celebrations</Link>
      <Link href="/gallery" onClick={close}>The gallery <span aria-hidden="true">↗</span></Link>
    </nav>
    <span className="header-love"><Heart size={14}/> Forever in our hearts</span>
    <button type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} data-testid="mobile-menu-toggle" onClick={() => setOpen(value => !value)}>{open ? <X/> : <Menu/>}</button>
  </header>;
}
