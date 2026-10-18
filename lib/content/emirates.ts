export type EmirateSlug = 'abu-dhabi' | 'dubai' | 'sharjah' | 'ajman' | 'umm-al-quwain' | 'ras-al-khaimah' | 'fujairah';

export type Emirate = {
  slug: EmirateSlug;
  name: string;
  ar: string;
  landmark: string;
  /** Long description for the emirate page. */
  blurb: string;
  /** Short description for the homepage switcher. */
  short: string;
  /** Profiles from this emirate in the full archive. */
  count: number;
  places: [name: string, note: string][];
};

export const EMIRATES: Emirate[] = [
  { slug: 'abu-dhabi', name: 'Abu Dhabi', ar: 'أبوظبي', landmark: 'Sheikh Zayed Grand Mosque', count: 64,
    blurb: 'The capital and the largest emirate, home to the federal government, much of the nation’s energy sector and a growing research and cultural district.',
    short: 'The capital, home to the federal government and much of the nation’s energy and research sector.',
    places: [['Saadiyat Cultural District', 'Museums and galleries on the island’s western shore.'], ['Liwa Oasis', 'Date farms at the edge of the Empty Quarter.'], ['Al Ain', 'The garden city, with the oldest falaj irrigation in the country.']] },
  { slug: 'dubai', name: 'Dubai', ar: 'دبي', landmark: 'Dubai Creek at dusk', count: 71,
    blurb: 'A trading port turned global city, and the base for many of the archive’s founders, engineers and designers.',
    short: 'A trading port turned global city, and the base for most of the archive’s founders.',
    places: [['Al Fahidi', 'The restored wind-tower quarter on the creek.'], ['Al Quoz', 'Warehouses turned studios and galleries.'], ['Hatta', 'Mountain villages and reservoirs near the Omani border.']] },
  { slug: 'sharjah', name: 'Sharjah', ar: 'الشارقة', landmark: 'Heart of Sharjah heritage district', count: 38,
    blurb: 'The cultural capital, known for its museums, publishing houses and the region’s oldest book fair.',
    short: 'The cultural capital: museums, publishing and the region’s oldest book fair.',
    places: [['Heart of Sharjah', 'A heritage district restored house by house.'], ['Mleiha', 'Archaeological sites reaching back 130,000 years.'], ['Kalba', 'Mangroves and an east-coast fishing town.']] },
  { slug: 'ajman', name: 'Ajman', ar: 'عجمان', landmark: 'Ajman corniche', count: 17,
    blurb: 'The smallest emirate, with a strong community of educators, craftspeople and small-business owners.',
    short: 'The smallest emirate, with a growing community of educators and small-business owners.',
    places: [['Ajman Museum', 'An eighteenth-century fort on the seafront.'], ['Dhow yard', 'Where wooden boats are still built by hand.'], ['Al Zorah', 'Protected mangroves and lagoons.']] },
  { slug: 'umm-al-quwain', name: 'Umm Al Quwain', ar: 'أم القيوين', landmark: 'Mangrove lagoons', count: 12,
    blurb: 'A quiet coastline of mangroves and islands, and a centre of new marine conservation work.',
    short: 'Mangroves, fishing heritage and a new wave of marine conservation work.',
    places: [['Sinniyah Island', 'An archaeological site and bird sanctuary.'], ['Old Town', 'Coral-stone houses near the fort.'], ['Khor Al Beidah', 'Wetlands home to flamingos.']] },
  { slug: 'ras-al-khaimah', name: 'Ras Al Khaimah', ar: 'رأس الخيمة', landmark: 'Jebel Jais mountains', count: 26,
    blurb: 'Mountains, archaeology and a fast-growing tourism and industry base in the north.',
    short: 'Mountains, archaeology and a fast-growing tourism and industry base.',
    places: [['Jebel Jais', 'The highest peak in the UAE.'], ['Dhayah Fort', 'A hilltop fort above palm groves.'], ['Jazirat Al Hamra', 'An abandoned pearling village.']] },
  { slug: 'fujairah', name: 'Fujairah', ar: 'الفجيرة', landmark: 'Fujairah Fort', count: 22,
    blurb: 'The east coast emirate on the Gulf of Oman, known for its forts, shipping and mountain wadis.',
    short: 'The east coast emirate, facing the Gulf of Oman, known for shipping and its old forts.',
    places: [['Al Bidyah Mosque', 'The oldest mosque still in use in the UAE.'], ['Wadi Wurayah', 'A protected mountain wadi with waterfalls.'], ['Fujairah Fort', 'A sixteenth-century fort above the old town.']] },
];

export function getEmirate(slug: string): Emirate | undefined {
  return EMIRATES.find((e) => e.slug === slug);
}

export function emirateName(slug: EmirateSlug): string {
  return getEmirate(slug)!.name;
}
