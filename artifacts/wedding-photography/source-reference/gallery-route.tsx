import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft, ArrowDown, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/wedding/site-header'
import { SiteFooter } from '@/components/wedding/site-footer'
import { PhotoViewer } from '@/components/wedding/photo-viewer'
import { events } from '@/data/wedding'
import { photos } from '@/data/photos'

export const Route = createFileRoute('/gallery')({
  validateSearch: (search: Record<string, unknown>): { event?: string | undefined } => ({ event: typeof search['event'] === 'string' && events.some(e => e.id === search['event']) ? search['event'] : undefined }),
  head: () => ({ meta: [
    { title: 'The Wedding Gallery — Priyanka & Rohit Aditya' },
    { name: 'description', content: 'Explore the Adiya Story wedding gallery: engagement and reception, haldi, mehendi, nalangu, sangeet and traditional celebrations.' },
    { property: 'og:title', content: 'The Wedding Gallery — The Adiya Story' },
    { property: 'og:description', content: 'Every chapter of our celebration, in photographs. A collection of love, laughter and traditions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }), component: Gallery,
})
function Gallery() {
  const { event } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [collection, setCollection] = useState('All')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(24)
  const [index, setIndex] = useState<number | null>(null)
  const activeEvent = events.find(e => e.id === event)
  const filtered = photos.filter(p => (!event || p.event === event) && (collection === 'All' || p.collection === collection) && (!query || `${p.title} ${p.photographer}`.toLowerCase().includes(query.toLowerCase())))
  const selectEvent = (id?: string) => { setCollection('All'); setLimit(24); setQuery(''); navigate({ search: { event: id } }) }
  return <><SiteHeader/><main className="gallery-page"><section className="section gallery-intro"><Link to="/" className="back-link"><ArrowLeft size={17}/> The Adiya Story</Link><p className="eyebrow">OUR MEMORY BOOK</p><h1>{activeEvent ? activeEvent.title : <>The moments <em>that stay.</em></>}</h1><p>{activeEvent ? activeEvent.subtitle : 'The big feelings. The tiny details. All the magic, one frame at a time.'}</p></section>
    <section className="section gallery-body"><div className="event-filters" aria-label="Event categories"><Button variant="ghost" aria-pressed={!event} onClick={() => selectEvent()}>All moments</Button>{events.map(e => <Button key={e.id} variant="ghost" aria-pressed={event === e.id} onClick={() => selectEvent(e.id)}>{e.title}</Button>)}</div><div className="gallery-toolbar"><div className="collection-filters" aria-label="Collections">{['All', ...(activeEvent?.collections ?? ['Candid', 'Traditional', 'Sangeet'])].map(c => <Button key={c} variant="ghost" aria-pressed={collection === c} onClick={() => { setCollection(c); setLimit(24) }}>{c === 'All' ? 'All photographs' : c}</Button>)}</div><label className="photo-search"><Search size={17}/><input aria-label="Search photographs" placeholder="Find a moment…" value={query} onChange={e => { setQuery(e.target.value); setLimit(24) }}/>{query && <Button variant="ghost" size="icon" aria-label="Clear search" onClick={() => setQuery('')}><X size={15}/></Button>}</label></div><div className="gallery-summary"><span>{filtered.length} photographs</span><span>{activeEvent ? activeEvent.collections.join(' · ') : 'Six celebrations. One love story.'}</span></div>
    {filtered.length ? <div className="photo-masonry">{filtered.slice(0,limit).map((p,i) => <Button key={p.id} variant="ghost" className="gallery-photo" aria-label={`View ${p.title}`} onClick={() => setIndex(i)}><img src={p.url} alt={p.title} loading="lazy"/><span className="photo-context">{p.title}</span></Button>)}</div> : <div className="empty-gallery"><h2>No moments found.</h2><Button variant="link" onClick={() => { setQuery(''); setCollection('All') }}>View all photographs <ArrowLeft size={16}/></Button></div>}
    {filtered.length > limit && <div className="load-more"><Button variant="outline" onClick={() => setLimit(n => n + 24)}>Discover more moments <ArrowDown size={17}/></Button></div>}<p className="photo-credit">Stand-in photographs by the Unsplash community. Photographer credits accompany every image.</p></section></main><SiteFooter/><PhotoViewer photos={filtered} index={index} onChange={setIndex}/></>
}