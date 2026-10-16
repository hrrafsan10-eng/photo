import { Link } from 'wouter';
import { Heart } from 'lucide-react';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-names">Priyanka <i>&amp;</i> Rohit Aditya</div>
    <p>#THEADIYASTORY</p>
    <div className="footer-bottom">
      <span>29 &amp; 30 August 2026 · Coimbatore</span>
      <span>With love &amp; blessings <Heart size={13}/></span>
      <Link href="/#top">Back to the beginning <span aria-hidden="true">↑</span></Link>
    </div>
  </footer>;
}
