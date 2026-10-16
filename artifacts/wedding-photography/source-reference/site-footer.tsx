import { Heart, ArrowUp } from 'lucide-react'
import { Link } from '@tanstack/react-router'
export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-names">Priyanka <i>&</i> Rohit Aditya</div><p>#THEADIYASTORY</p><div className="footer-bottom"><span>29 & 30 August 2026 · Coimbatore</span><span>With love & blessings <Heart size={14}/></span><Link to="/" hash="top">Back to the beginning <ArrowUp size={15}/></Link></div></footer>
}