import sacred from '@/assets/a-sacred-beginning.jpg.asset.json'
import promises from '@/assets/promises-in-bloom.jpg.asset.json'
import hands from '@/assets/hands-of-forever.jpg.asset.json'
import together from '@/assets/together-at-last.jpg.asset.json'
import showered from '@/assets/showered-in-love.jpg.asset.json'
import petals from '@/assets/petals-and-promises.jpg.asset.json'

export const weddingDays = ['DAY 01 — 29 AUGUST 2026', 'DAY 02 — 30 AUGUST 2026']
export const featuredImages = { sacred: sacred.url, promises: promises.url, hands: hands.url, together: together.url, showered: showered.url, petals: petals.url }
export const events = [
  { id: 'engagement-reception', title: 'Engagement & Reception', subtitle: 'An evening to remember', collections: ['Candid', 'Traditional'], image: together.url },
  { id: 'haldi', title: 'Haldi', subtitle: 'Sunshine, smiles & a little mischief', collections: ['Candid'], image: petals.url },
  { id: 'mehendi', title: 'Mehendi', subtitle: 'Love, written in the smallest details', collections: ['Candid'], image: hands.url },
  { id: 'nalangu', title: 'Nalangu', subtitle: 'Traditions with a playful heart', collections: ['Candid'], image: promises.url },
  { id: 'sangeet', title: 'Sangeet', subtitle: 'One more song. One more dance.', collections: ['Sangeet'], image: showered.url },
  { id: 'traditional-events', title: 'Traditional Events', subtitle: 'Where our forever began', collections: ['Traditional'], image: sacred.url },
]
export const films = [
  { title: 'Our wedding film', subtitle: 'The cover film', id: 'PgjgUyKO_sQ' },
  { title: 'A journey through 24 years', subtitle: 'A film to remember', id: 'IbqqZLn9iRM' },
  { title: 'A special film for Priyanka', subtitle: 'Made with love', id: 'Hnlux8p5ojU' },
]
export type WeddingPhoto = { id: string; filename: string; url: string; title: string; event: string; collection: string; photographer: string; source: string }