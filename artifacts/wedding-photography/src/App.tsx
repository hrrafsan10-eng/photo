import { useEffect, useMemo, useState } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Heart, MapPin, Play, Search, X } from 'lucide-react';
import { SiteHeader } from '@/components/wedding/SiteHeader';
import { SiteFooter } from '@/components/wedding/SiteFooter';
import { events, films, photo, photos, weddingDays, type WeddingPhoto } from '@/wedding-data';
import './wedding.css';

function FloatingHearts() {
  return <div className="float-hearts" aria-hidden="true">
    {[0, 1, 2, 3].map(n => <span className="float-heart" key={n} />)}
  </div>;
}

function PhotoViewer({ items, index, onChange }: { items: WeddingPhoto[]; index: number | null; onChange: (index: number | null) => void }) {
  const current = index === null ? undefined : items[index];
  const move = (direction: number) => {
    if (index !== null && items.length) onChange((index + direction + items.length) % items.length);
  };
  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'Escape') onChange(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length]);
  if (!current) return null;
  return <div className="viewer-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onChange(null); }}>
    <section className="viewer-dialog" role="dialog" aria-modal="true" aria-labelledby="viewer-title" data-testid="photo-viewer">
      <div className="viewer-head">
        <div><h2 id="viewer-title">{current.title}</h2><p>{current.collection} · {current.photographer}</p></div>
        <button type="button" className="viewer-close" aria-label="Close photo viewer" data-testid="viewer-close" onClick={() => onChange(null)}><X size={19}/></button>
      </div>
      <img className="viewer-photo" src={current.url} alt={current.title} />
      <div className="viewer-controls">
        <button type="button" aria-label="Previous photograph" data-testid="viewer-previous" onClick={() => move(-1)}><ArrowLeft size={19}/></button>
        <span>{index! + 1} / {items.length}</span>
        <button type="button" aria-label="Next photograph" data-testid="viewer-next" onClick={() => move(1)}><ArrowRight size={19}/></button>
      </div>
    </section>
  </div>;
}

function Home() {
  const [film, setFilm] = useState<(typeof films)[number] | null>(null);
  const carouselPhotos = [
    'engagement-candid-01.jpg', 'haldi-candid-01.jpg', 'mehndi-candid-01.jpg', 'nalangu-candid-01.jpg',
    'sangeet-01.jpg', 'engagement-traditional-01.jpg', 'traditional-card-one-01.jpg', 'engagement-candid-02.jpg',
  ];
  const carouselDescriptions = [
    'An intimate engagement evening in Coimbatore',
    'A joyful Haldi celebration',
    'A close detail from the Mehendi gathering',
    'A playful moment during Nalangu',
    'A night of music and dancing at Sangeet',
    'Priyanka and Rohit surrounded by wedding traditions',
    'A family blessing from the wedding ceremony',
    'A quiet, candid moment between the couple',
  ];
  return <>
    <SiteHeader />
    <main id="top">
      <section className="wedding-hero">
        <img src={photo('hero-wide.jpg')} alt="Priyanka and Rohit together beneath wedding flowers" fetchPriority="high" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark"/> OUR WEDDING. FOREVER IN OUR HEARTS.</p>
          <h1>Priyanka <i>&amp;</i><br/>Rohit Aditya</h1>
          <p className="hero-tagline">We said “I do.” You made it unforgettable.</p>
          <p className="hero-place">29 &amp; 30 August 2026 <span>·</span> Coimbatore, India</p>
        </div>
        <div className="hero-foot"><span>A CELEBRATION OF LOVE &amp; TOGETHERNESS</span><a href="#story" data-testid="hero-story-link">Our story <ArrowRight size={16}/></a></div>
      </section>
      <section className="memory-intro section" id="celebrations">
        <p className="eyebrow"><Heart size={15}/> THE CELEBRATIONS, REMEMBERED</p>
        <h2>A Lifetime of Memories, Beautifully Told.</h2>
        <div className="event-dates">{weddingDays.map(day => <span key={day}>{day}</span>)}</div>
      </section>
      <section className="section collections-section">
        <div className="section-heading"><div><p className="eyebrow">EVERY CHAPTER OF OUR CELEBRATION</p><h2>Love, in <em>every frame.</em></h2></div><Link href="/gallery" className="text-link">View the full gallery <ArrowUpRight size={18}/></Link></div>
        <div className="collections-grid">{events.map(event => <Link key={event.id} href={`/gallery?event=${event.id}`} className="collection-card" data-testid={`home-event-${event.id}`}>
          <div className="collection-image"><img src={event.image} alt={`${event.title} celebration`} loading="lazy"/><span className="collection-hover">Explore the collection <ArrowUpRight size={20}/></span></div>
          <div className="collection-caption"><div><h3>{event.title}</h3><p>{event.subtitle}</p></div><span aria-hidden="true">↗</span></div>
          <span className="collection-kind">{event.collections.join(' / ')}</span>
        </Link>)}</div>
      </section>
      <section className="story-band" id="story"><div className="section story-layout">
        <div className="story-photo"><img src={photo('engagement-candid-02.jpg')} alt="Priyanka and Rohit holding hands in a quiet moment" loading="lazy"/><span>A promise for a lifetime.</span></div>
        <div className="story-copy"><p className="eyebrow"><Heart size={15}/> OUR HAPPILY EVER AFTER</p><h2>The wedding was a moment.<br/><em>The love is forever.</em></h2>
          <p>On 29 &amp; 30 August 2026, we celebrated the beginning of our married life in Coimbatore, surrounded by the people who mean the world to us.</p>
          <p>The rituals, the laughter, the happy tears — these are the memories we’ll return to for years to come. To everyone who celebrated with us, near or far: thank you for filling our wedding with so much love.</p>
          <div className="signature">With love, Priyanka &amp; Rohit Aditya</div><Link href="/gallery" className="text-link">A story worth remembering <ArrowRight size={17}/></Link>
        </div>
      </div></section>
      <section className="section films-section">
        <div className="section-heading"><div><p className="eyebrow">PRESS PLAY. FEEL IT ALL AGAIN.</p><h2>Our story, <em>in motion.</em></h2></div><p>The voices. The laughter. The happy tears.</p></div>
        <div className="films-grid">{films.map(item => <button key={item.id} type="button" className="film-tile" onClick={() => setFilm(item)} data-testid={`film-${item.id}`} aria-label={`Play ${item.title}`}>
          <img src={item.image} alt="" loading="lazy"/><span className="play-circle"><Play size={20}/></span><span className="film-copy"><small>{item.subtitle}</small><span>{item.title}</span></span>
        </button>)}</div>
      </section>
      <section className="marquee-band" aria-label="Photographs from our celebrations">
        <div className="marquee-heading"><div><p className="eyebrow">OUR ROOTS. OUR CHOSEN FAMILY.</p><h2>The moments <em>that made it ours.</em></h2></div><p>Move through the moments, stay as long as you like.</p></div>
        <div className="marquee-window" tabIndex={0} aria-label="Wedding photo carousel. Hover or touch to pause, then swipe to explore.">
          <div className="marquee-track">{[...carouselPhotos, ...carouselPhotos].map((filename, index) => <div className="marquee-photo" key={`${filename}-${index}`} aria-hidden={index >= carouselPhotos.length}>
            <img src={photo(filename)} alt={index >= carouselPhotos.length ? '' : carouselDescriptions[index]} loading="lazy"/>
          </div>)}</div>
        </div>
      </section>
      <section className="section closing-note"><p className="eyebrow">WHERE IT ALL CAME TOGETHER</p><h2>A place in our hearts. <em>Coimbatore.</em></h2><p>Beneath the flowers, surrounded by love.</p>
        <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Coimbatore+Tamil+Nadu+India" target="_blank" rel="noreferrer"><MapPin size={16}/> Explore Coimbatore <ArrowUpRight size={16}/></a>
      </section>
    </main>
    <SiteFooter />
    {film && <div className="film-dialog" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setFilm(null); }}>
      <section className="film-modal" role="dialog" aria-modal="true" aria-labelledby="film-title">
        <div className="film-modal-head"><div><h2 id="film-title">{film.title}</h2><p>A film from Priyanka and Rohit’s celebration.</p></div><button type="button" className="viewer-close" aria-label="Close film" onClick={() => setFilm(null)}><X size={19}/></button></div>
        <iframe src={`https://www.youtube.com/embed/${film.id}?autoplay=1&rel=0`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>
      </section>
    </div>}
  </>;
}

function Gallery() {
  const [location, setLocation] = useLocation();
  const eventFromQuery = new URLSearchParams(window.location.search).get('event') ?? undefined;
  const initialEvent = events.find(item => item.id === eventFromQuery);
  const [eventId, setEventId] = useState(initialEvent?.id ?? '');
  const [collection, setCollection] = useState(initialEvent && !['engagement-reception', 'traditional-events'].includes(initialEvent.id) ? initialEvent.collections[0] : 'All Photographs');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(12);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const activeEvent = events.find(item => item.id === eventId);

  useEffect(() => {
    const event = new URLSearchParams(window.location.search).get('event') ?? '';
    if (events.some(item => item.id === event) && event !== eventId) {
      setEventId(event);
      const selected = events.find(item => item.id === event);
      setCollection(selected?.id === 'engagement-reception' || selected?.id === 'traditional-events' ? 'All Photographs' : selected?.collections[0] ?? 'All Photographs');
      setLimit(12);
      setQuery('');
    }
  }, [location]);

  const collectionOptions = !activeEvent
    ? ['All Photographs', 'Candid', 'Traditional', 'Sangeet']
    : activeEvent.id === 'traditional-events'
      ? ['All Photographs', 'Traditional']
      : activeEvent.id === 'engagement-reception'
        ? ['All Photographs', 'Candid', 'Traditional']
        : activeEvent.collections;

  const filtered = useMemo(() => photos.filter(item => {
    if (eventId && item.event !== eventId) return false;
    if (collection === 'Candid' && item.collection !== 'Candid') return false;
    if (collection === 'Traditional' && item.collection !== 'Traditional') return false;
    if (collection === 'Sangeet' && item.collection !== 'Sangeet') return false;
    if (collection === 'Card One' && item.subCollection !== 'Card One') return false;
    if (collection === 'Card Two' && item.subCollection !== 'Card Two') return false;
    const searchable = `${item.title} ${item.photographer} ${item.event} ${item.collection} ${item.subCollection ?? ''}`.toLowerCase();
    return !query || searchable.includes(query.trim().toLowerCase());
  }), [eventId, collection, query]);

  const selectEvent = (id: string) => {
    setEventId(id);
    const selected = events.find(item => item.id === id);
    setCollection(!id || id === 'engagement-reception' || id === 'traditional-events' ? 'All Photographs' : selected?.collections[0] ?? 'All Photographs');
    setLimit(12);
    setQuery('');
    setViewerIndex(null);
    setLocation(id ? `/gallery?event=${id}` : '/gallery');
  };
  const selectCollection = (value: string) => {
    setCollection(value);
    setLimit(12);
    setViewerIndex(null);
  };

  return <>
    <SiteHeader/>
    <main className="gallery-page">
      <section className="section gallery-intro"><Link href="/" className="back-link"><ArrowLeft size={16}/> The Adiya Story</Link><p className="eyebrow">OUR MEMORY BOOK</p>
        <h1>{activeEvent ? activeEvent.title : <>The moments <em>that stay.</em></>}</h1>
        <p>{activeEvent ? activeEvent.subtitle : 'The big feelings. The tiny details. All the magic, one frame at a time.'}</p>
      </section>
      <section className="section gallery-body">
        <div className="event-filters" aria-label="Event categories" role="group">
          <button type="button" className="filter-button" aria-pressed={!eventId} onClick={() => selectEvent('')} data-testid="event-filter-all">All moments</button>
          {events.map(item => <button type="button" className="filter-button" key={item.id} aria-pressed={eventId === item.id} onClick={() => selectEvent(item.id)} data-testid={`event-filter-${item.id}`}>{item.title}</button>)}
        </div>
        <div className="gallery-toolbar">
          <div className="collection-filters" aria-label="Photograph collections" role="group">
            {collectionOptions.map(value => <button type="button" className="filter-button" key={value} aria-pressed={collection === value || value === 'Traditional' && ['Card One', 'Card Two'].includes(collection)} onClick={() => selectCollection(value)} data-testid={`collection-filter-${value.toLowerCase().replaceAll(' ', '-')}`}>{value}</button>)}
          </div>
          <label className="photo-search"><Search size={16}/><input type="search" aria-label="Search photographs" placeholder="Find a moment…" value={query} onChange={event => { setQuery(event.target.value); setLimit(12); setViewerIndex(null); }} data-testid="gallery-search"/>{query && <button type="button" aria-label="Clear search" data-testid="clear-search" onClick={() => { setQuery(''); setLimit(12); }}> <X size={15}/></button>}</label>
        </div>
        {activeEvent?.id === 'traditional-events' && ['Traditional', 'Card One', 'Card Two'].includes(collection) && <div className="nested-filters" role="group" aria-label="Traditional event cards">
          {['Card One', 'Card Two'].map(value => <button type="button" className="filter-button" key={value} aria-pressed={collection === value} onClick={() => selectCollection(value)} data-testid={`traditional-${value.toLowerCase().replace(' ', '-')}`}>{value}</button>)}
        </div>}
        <div className="gallery-summary"><span>{filtered.length} {filtered.length === 1 ? 'photograph' : 'photographs'}</span><span>{activeEvent ? activeEvent.collections.join(' · ') : 'Six celebrations. One love story.'}</span></div>
        {filtered.length ? <div className="photo-masonry">
          {filtered.slice(0, limit).map((item, index) => <button type="button" key={item.id} className="gallery-photo" aria-label={`View ${item.title}`} onClick={() => setViewerIndex(index)} data-testid={`gallery-photo-${item.id}`}>
            <img src={item.url} alt={item.title} loading="lazy"/><span className="photo-context">{item.title}</span>
          </button>)}
        </div> : <div className="empty-gallery"><h2>No moments found.</h2><button type="button" onClick={() => { setQuery(''); selectCollection(collectionOptions[0]); }}>View all photographs</button></div>}
        {filtered.length > limit && <div className="load-more"><button type="button" onClick={() => setLimit(value => value + 12)} data-testid="gallery-load-more">Discover more moments <ArrowDown size={16}/></button></div>}
      </section>
    </main>
    <SiteFooter/>
    <PhotoViewer items={filtered} index={viewerIndex} onChange={setViewerIndex}/>
  </>;
}

function NotFound() {
  return <main className="gallery-intro section"><Link href="/" className="back-link"><ArrowLeft size={16}/> The Adiya Story</Link><p className="eyebrow">A LITTLE DETOUR</p><h1>This page is not in our album.</h1><Link href="/" className="text-link">Return to our story <ArrowRight size={17}/></Link></main>;
}

function App() {
  return <div className="wedding-site"><FloatingHearts/><Switch>
    <Route path="/" component={Home}/>
    <Route path="/gallery" component={Gallery}/>
    <Route component={NotFound}/>
  </Switch></div>;
}

export default App;
