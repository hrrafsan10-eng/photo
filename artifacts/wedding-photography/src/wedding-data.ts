export const photo = (filename: string) => `/photos/${filename}`;

export const weddingDays = ['DAY 01 — 29 AUGUST 2026', 'DAY 02 — 30 AUGUST 2026'];

export const events = [
  { id: 'engagement-reception', title: 'Engagement & Reception', subtitle: 'An evening to remember', collections: ['Candid', 'Traditional'], image: photo('engagement-candid-01.jpg') },
  { id: 'haldi', title: 'Haldi', subtitle: 'Sunshine, smiles & a little mischief', collections: ['Candid'], image: photo('haldi-candid-01.jpg') },
  { id: 'mehendi', title: 'Mehendi', subtitle: 'Love, written in the smallest details', collections: ['Candid'], image: photo('mehndi-candid-01.jpg') },
  { id: 'nalangu', title: 'Nalangu', subtitle: 'Traditions with a playful heart', collections: ['Candid'], image: photo('nalangu-candid-01.jpg') },
  { id: 'sangeet', title: 'Sangeet', subtitle: 'One more song. One more dance.', collections: ['Sangeet'], image: photo('sangeet-01.jpg') },
  { id: 'traditional-events', title: 'Traditional Events', subtitle: 'Where our forever began', collections: ['Traditional'], image: photo('traditional-card-one-01.jpg') },
];

export type WeddingPhoto = {
  id: string;
  filename: string;
  url: string;
  title: string;
  event: string;
  collection: string;
  subCollection?: string;
  photographer: string;
};

const entries: Array<[string, string, string, string, string, string?]> = [
  ['engagement-candid-01.jpg', 'An evening we will keep', 'engagement-reception', 'Candid', 'A family celebration'],
  ['engagement-candid-02.jpg', 'A moment between us', 'engagement-reception', 'Candid', 'The quiet joy'],
  ['engagement-traditional-01.jpg', 'A promise in silk', 'engagement-reception', 'Traditional', 'The ceremony'],
  ['engagement-traditional-02.jpg', 'Blessings all around', 'engagement-reception', 'Traditional', 'A cherished ritual'],
  ['haldi-candid-01.jpg', 'Sunshine and turmeric', 'haldi', 'Candid', 'A little mischief'],
  ['haldi-candid-02.jpg', 'Laughter in the courtyard', 'haldi', 'Candid', 'Golden afternoon'],
  ['mehndi-candid-01.jpg', 'Love in every detail', 'mehendi', 'Candid', 'The henna hour'],
  ['mehndi-candid-02.jpg', 'A joyful little pause', 'mehendi', 'Candid', 'Hands of art'],
  ['nalangu-candid-01.jpg', 'Tradition, with a smile', 'nalangu', 'Candid', 'A playful ritual'],
  ['nalangu-candid-02.jpg', 'A day full of laughter', 'nalangu', 'Candid', 'Together in tradition'],
  ['sangeet-01.jpg', 'One more song', 'sangeet', 'Sangeet', 'The dance floor'],
  ['sangeet-02.jpg', 'Our night in motion', 'sangeet', 'Sangeet', 'A celebration in rhythm'],
  ['traditional-card-one-01.jpg', 'Where forever began', 'traditional-events', 'Traditional', 'Card One', 'Card One'],
  ['traditional-card-one-02.jpg', 'A sacred beginning', 'traditional-events', 'Traditional', 'Card One', 'Card One'],
  ['traditional-card-two-01.jpg', 'A family blessing', 'traditional-events', 'Traditional', 'Card Two', 'Card Two'],
  ['traditional-card-two-02.jpg', 'The warmth of home', 'traditional-events', 'Traditional', 'Card Two', 'Card Two'],
];

export const photos: WeddingPhoto[] = entries.map(([filename, title, event, collection, photographer, subCollection]) => ({
  id: `${event}-${filename}`,
  filename,
  url: photo(filename),
  title,
  event,
  collection,
  photographer: `The Adiya Story · ${photographer}`,
  ...(subCollection ? { subCollection } : {}),
}));

export const films = [
  { title: 'Our wedding film', subtitle: 'The cover film', id: 'PgjgUyKO_sQ', image: photo('sangeet-01.jpg') },
  { title: 'A journey through 24 years', subtitle: 'A film to remember', id: 'IbqqZLn9iRM', image: photo('engagement-candid-01.jpg') },
  { title: 'A special film for Priyanka', subtitle: 'Made with love', id: 'Hnlux8p5ojU', image: photo('engagement-traditional-01.jpg') },
];
