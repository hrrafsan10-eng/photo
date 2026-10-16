import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/wedding-monogram.png.asset.json'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <Link to="/" className="brand" aria-label="The Adiya Story home"><img src={logo.url} alt=""/><span>THE ADIYA STORY<small>PRIYANKA & ROHIT ADITYA</small></span></Link>
    <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
      <Link to="/" hash="story" onClick={() => setOpen(false)}>Our story</Link>
      <Link to="/" hash="celebrations" onClick={() => setOpen(false)}>Celebrations</Link>
      <Link to="/" hash="people" onClick={() => setOpen(false)}>Our people</Link>
      <Link to="/gallery" onClick={() => setOpen(false)}>The gallery <ArrowUpRight size={15}/></Link>
    </nav>
    <span className="header-love"><Heart size={15}/> Forever in our hearts</span>
    <Button className="menu-toggle" variant="ghost" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button>
  </header>
}