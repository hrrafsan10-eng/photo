import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Heart, Play, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { SiteHeader } from '@/components/wedding/site-header'
import { SiteFooter } from '@/components/wedding/site-footer'
import { events, featuredImages, films, weddingDays } from '@/data/wedding'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Priyanka & Rohit Aditya — The Adiya Story' },
    { name: 'description', content: 'Today, a lifetime of memories. Celebrate Priyanka and Rohit Aditya’s wedding, 29 & 30 August 2026 in Coimbatore, through photographs and films.' },
    { property: 'og:title', content: 'Priyanka & Rohit Aditya — The Adiya Story' },
    { property: 'og:description', content: 'Our wedding. Forever in our hearts. A story of love, traditions and the people who made it unforgettable.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: WeddingHome,
})

function WeddingHome() {
  const [film, setFilm] = useState<(typeof films)[number] | null>(null)
  return <><SiteHeader/><main id="top">
    <section className="wedding-hero">
      <img src={featuredImages.sacred} alt="A joyful moment during a traditional Indian wedding ceremony" fetchPriority="high" className="hero-image"/>
      <div className="hero-shade"/>
      <div className="hero-copy"><p className="eyebrow"><span/> OUR WEDDING. FOREVER IN OUR HEARTS.</p><h1>Priyanka <i>&</i><br/>Rohit Aditya</h1><p className="hero-tagline">We said “I do.” You made it unforgettable.</p><p className="hero-place">29 & 30 August 2026 <span>·</span> Coimbatore, India</p><Button asChild variant="outline" className="hero-gallery"><Link to="/gallery">Explore our memories <ArrowUpRight/></Link></Button></div>
      <div className="hero-foot"><span>A CELEBRATION OF LOVE & TOGETHERNESS</span><a href="#story">Our story <ArrowRight size={17}/></a></div>
    </section>
    <section className="memory-intro section" id="celebrations"><p className="eyebrow"><Heart size={15}/> THE CELEBRATIONS, REMEMBERED</p><h2>Today, <em>a lifetime of memories.</em></h2><div className="event-dates">{weddingDays.map(day => <span key={day}>{day}</span>)}</div></section>
    <section className="section collections-section"><div className="section-heading"><div><p className="eyebrow">EVERY CHAPTER OF OUR CELEBRATION</p><h2>Love, in <em>every frame.</em></h2></div><Link to="/gallery" className="text-link">View the full gallery <ArrowUpRight size={19}/></Link></div><div className="collections-grid">{events.map(event => <Link key={event.id} to="/gallery" search={{ event: event.id }} className="collection-card"><div className="collection-image"><img src={event.image} alt={event.title} loading="lazy"/><span className="collection-hover">Explore the collection <ArrowUpRight size={20}/></span></div><div className="collection-caption"><div><h3>{event.title}</h3><p>{event.subtitle}</p></div><ArrowUpRight size={22}/></div><span className="collection-kind">{event.collections.join(' / ')}</span></Link>)}</div></section>
    <section className="story-band" id="story"><div className="section story-layout"><div className="story-photo"><img src={featuredImages.promises} alt="Bride and groom holding hands in traditional wedding attire" loading="lazy"/><span>A promise for a lifetime.</span></div><div className="story-copy"><p className="eyebrow"><Heart size={15}/> OUR HAPPILY EVER AFTER</p><h2>The wedding was a moment.<br/><em>The love is forever.</em></h2><p>On 29 & 30 August 2026, we celebrated the beginning of our married life in Coimbatore, surrounded by the people who mean the world to us.</p><p>The rituals, the laughter, the happy tears — these are the memories we’ll return to for years to come. To everyone who celebrated with us, near or far: thank you for filling our wedding with so much love.</p><div className="signature">With love, Priyanka & Rohit Aditya</div><Link to="/gallery" className="text-link">A story worth remembering <ArrowRight size={18}/></Link></div></div></section>
    <section className="section films-section"><div className="section-heading"><div><p className="eyebrow">PRESS PLAY. FEEL IT ALL AGAIN.</p><h2>Our story, <em>in motion.</em></h2></div><p>The voices. The laughter. The happy tears.</p></div><div className="films-grid">{films.map((item, i) => <Button key={item.id} variant="ghost" className="film-tile" onClick={() => setFilm(item)}><img src={[featuredImages.showered, featuredImages.together, featuredImages.hands][i]} alt="" loading="lazy"/><span className="play-circle"><Play size={22}/></span><span className="film-copy"><small>{item.subtitle}</small><span>{item.title}</span></span></Button>)}</div></section>
    <section className="people-band" id="people"><div className="section people-layout"><div><p className="eyebrow"><Heart size={15}/> OUR ROOTS. OUR CHOSEN FAMILY.</p><h2>Our people.<br/><em>Our whole world.</em></h2><p>The people who made us who we are. The laughter wouldn’t be the same without you.</p><Link to="/gallery" search={{ event: 'engagement-reception' }} className="text-link">All our favourite people <ArrowUpRight size={18}/></Link></div><img src={featuredImages.showered} alt="Newlyweds celebrating with flower petals and their loved ones" loading="lazy"/></div></section>
    <section className="section closing-note"><p className="eyebrow">WHERE IT ALL CAME TOGETHER</p><h2>A place in our hearts. <em>Coimbatore.</em></h2><p>Beneath the flowers, surrounded by love.</p><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Coimbatore+Tamil+Nadu+India" target="_blank" rel="noreferrer"><MapPin size={17}/> Explore Coimbatore <ArrowUpRight size={17}/></a><p className="photo-credit">Stand-in wedding photography from Unsplash. Our memories, beautifully imagined.</p></section>
  </main><SiteFooter/><Dialog open={film !== null} onOpenChange={open => { if (!open) setFilm(null) }}><DialogContent className="film-dialog"><DialogTitle>{film?.title}</DialogTitle><DialogDescription>A film from Priyanka and Rohit’s celebration.</DialogDescription>{film && <iframe src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>}</DialogContent></Dialog></>
}
