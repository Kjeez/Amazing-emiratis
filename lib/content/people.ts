import { isHiddenCategory } from './categories';
import type { EmirateSlug } from './emirates';

export type PersonCategory = 'Leadership' | 'Business' | 'Culture' | 'Health' | 'Lifestyle' | 'Tech' | 'Community';

export type Person = {
  slug: string;
  name: string;
  nameAr?: string;
  role: string;
  roleAr?: string;
  category: PersonCategory;
  emirate: EmirateSlug;
  /** Won an Amazing Emiratis Award in 2025. */
  winner: boolean;
  born: number;
  knownFor: string;
  /** Only words the person has said on the record; leave out rather than paraphrase. */
  quote?: string;
  bio: string;
  bio2: string;
  /** One-line summary used on cards. */
  short: string;
  milestones: [year: string, text: string][];
  /** Stories about this person (slugs), shown first under "Featured in". */
  stories?: string[];
  /** Videos and podcast episodes about this person (slugs from media.ts). */
  media?: string[];
  /** Where the facts come from, for profiles compiled from the public record. */
  source?: string;
};

const ALL_PERSON_CATEGORIES: PersonCategory[] = ['Leadership', 'Business', 'Culture', 'Health', 'Lifestyle', 'Tech', 'Community'];
export const PERSON_CATEGORIES = ALL_PERSON_CATEGORIES.filter((c) => !isHiddenCategory(c.toLowerCase()));

const ALL_PEOPLE: Person[] = [
  {
    // Compiled from the public record (Wikipedia, checked 18 November 2026). No quotes are attributed.
    slug: 'hamdan-bin-mohammed', name: 'Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum', nameAr: 'الشيخ حمدان بن محمد بن راشد آل مكتوم',
    role: 'Crown Prince of Dubai', roleAr: 'ولي عهد دبي', category: 'Leadership', emirate: 'dubai', winner: false, born: 1982,
    knownFor: 'Public service, poetry as Fazza, endurance riding',
    bio: 'Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum has been Crown Prince of Dubai since February 2008. In July 2024 he was also appointed Deputy Prime Minister and Minister of Defence of the UAE, succeeding his father, Sheikh Mohammed bin Rashid Al Maktoum, as defence minister.',
    bio2: 'Known by his pen name Fazza, he writes romantic and patriotic poetry in Arabic. He is also a world champion endurance rider, winning individual gold at the 2014 FEI World Equestrian Games in Normandy, and founded the Hamdan International Photography Award in 2011.',
    short: 'Crown Prince of Dubai, Minister of Defence of the UAE, and the poet known as Fazza.',
    milestones: [
      ['1982', 'Born in Dubai on 14 November'],
      ['2001', 'Graduates from the Royal Military Academy Sandhurst'],
      ['2006', 'Appointed Chairman of the Dubai Executive Council'],
      ['2008', 'Becomes Crown Prince of Dubai'],
      ['2011', 'Founds the Hamdan International Photography Award'],
      ['2014', 'Individual endurance gold, FEI World Equestrian Games, Normandy'],
      ['2024', 'Appointed Deputy Prime Minister and Minister of Defence of the UAE'],
    ],
    stories: ['hamdan-bin-mohammed-crown-prince-poet-rider'],
    media: ['fazza-dubai-poetry-forum', 'dubai-future-solutions'],
    source: 'Compiled from the public record. Amazing Emiratis has not interviewed Sheikh Hamdan for this profile.',
  },
  {
    slug: 'mariam-al-falasi', name: 'Mariam Al Falasi', nameAr: 'مريم الفلاسي', role: 'AI Researcher', roleAr: 'باحثة في الذكاء الاصطناعي', category: 'Tech', emirate: 'abu-dhabi', winner: true, born: 1991,
    knownFor: 'Arabic speech recognition',
    quote: 'A machine should understand how my grandmother speaks, not only how a newsreader does.',
    bio: 'Mariam Al Falasi leads a research group building speech recognition for Gulf Arabic dialects. Her models now sit inside government services, banking apps and in-car systems used by millions of people every day.',
    bio2: 'She studied computer science in Abu Dhabi and London, then returned to set up a lab focused on the dialects that commercial systems ignored. Her team has recorded more than 40,000 hours of everyday speech from all seven Emirates.',
    short: 'The researcher behind Arabic speech recognition now used by millions every day, on building technology that understands how the region actually speaks.',
    milestones: [['2014', 'Graduates in computer science'], ['2018', 'Completes PhD in speech processing, London'], ['2021', 'Founds the Gulf Dialects Lab'], ['2025', 'Wins Amazing Emiratis Award for Technology']],
  },
  {
    slug: 'khalid-al-mansoori', name: 'Khalid Al Mansoori', nameAr: 'خالد المنصوري', role: 'Founder, Sahra Logistics', roleAr: 'مؤسس صحراء للخدمات اللوجستية', category: 'Business', emirate: 'dubai', winner: false, born: 1984,
    knownFor: 'Cold-chain logistics',
    quote: 'Every date that reaches a shelf fresh is a promise we kept.',
    bio: 'Khalid Al Mansoori turned a two-truck delivery business into the region’s fastest-growing cold-chain network, moving fresh food and medicine across the Gulf.',
    bio2: 'Sahra Logistics now runs more than 400 refrigerated vehicles and three temperature-controlled hubs. Al Mansoori still drives a route himself one morning a month.',
    short: 'Turned a two-truck fleet into the region’s fastest cold-chain network.',
    milestones: [['2009', 'Starts Sahra with two trucks'], ['2015', 'Opens first cold-storage hub in Jebel Ali'], ['2020', 'Moves vaccine shipments across the UAE'], ['2024', 'Expands to Oman and Saudi Arabia']],
  },
  {
    slug: 'noura-al-ketbi', name: 'Dr. Noura Al Ketbi', nameAr: 'د. نورة الكتبي', role: 'Cardiothoracic Surgeon', roleAr: 'جرّاحة قلب وصدر', category: 'Health', emirate: 'abu-dhabi', winner: true, born: 1979,
    knownFor: 'Minimally invasive heart surgery',
    quote: 'The smallest incision is a kind of respect.',
    bio: 'Dr. Noura Al Ketbi pioneered minimally invasive heart procedures in the UAE and has performed more than 2,000 operations.',
    bio2: 'She trains surgeons from across the region and runs a programme that brings children with congenital heart conditions from rural areas to specialist care.',
    short: 'Pioneered minimally invasive heart procedures in the UAE.',
    milestones: [['2005', 'Qualifies as a surgeon'], ['2012', 'First keyhole valve repair in the UAE'], ['2019', 'Launches paediatric outreach programme'], ['2025', 'Wins Amazing Emiratis Award for Health']],
  },
  {
    slug: 'saeed-al-shamsi', name: 'Saeed Al Shamsi', nameAr: 'سعيد الشامسي', role: 'Poet & Archivist', roleAr: 'شاعر وموثّق', category: 'Culture', emirate: 'sharjah', winner: true, born: 1968,
    knownFor: 'Nabati poetry archive',
    quote: 'A poem nobody remembers is a house nobody lives in.',
    bio: 'Saeed Al Shamsi has spent three decades recording Nabati poetry from elders across the Emirates, building one of the largest oral archives in the Gulf.',
    bio2: 'His recordings, now digitised, include more than 6,000 poems. He also writes and publishes his own verse.',
    short: 'Records Nabati poetry from elders before it is lost.',
    milestones: [['1994', 'Begins recording elders in Kalba'], ['2006', 'Publishes first collection'], ['2017', 'Archive digitised with Sharjah library'], ['2025', 'Wins Amazing Emiratis Award for Culture']],
  },
  {
    slug: 'hessa-al-nuaimi', name: 'Hessa Al Nuaimi', role: 'Creative Director', category: 'Lifestyle', emirate: 'ajman', winner: false, born: 1990,
    knownFor: 'Heritage-led fashion',
    quote: 'The archive is not a mood board. It is my family.',
    bio: 'Hessa Al Nuaimi designs collections built on garments from her family archive, reworked with contemporary tailoring.',
    bio2: 'Her label shows in Paris and produces entirely in the UAE, working with artisans trained in talli braiding and sadu weaving.',
    short: 'Brings Emirati craft into contemporary fashion.',
    milestones: [['2016', 'Photographs family garment archive'], ['2019', 'Launches first collection'], ['2023', 'Debuts at Paris Fashion Week'], ['2026', 'Opens Sharjah craft studio']],
  },
  {
    slug: 'omar-al-zaabi', name: 'Omar Al Zaabi', role: 'Youth Mentor', category: 'Community', emirate: 'ras-al-khaimah', winner: false, born: 1987,
    knownFor: 'STEM mentoring',
    quote: 'Talent is everywhere. Opportunity has to be carried there.',
    bio: 'Omar Al Zaabi has coached more than 3,000 students into science and engineering careers through a mentoring network he started at his old school.',
    bio2: 'The programme now runs in 40 schools across the northern Emirates, pairing students with working engineers.',
    short: 'Has coached over 3,000 students into STEM careers.',
    milestones: [['2012', 'Starts weekend robotics club'], ['2016', 'Programme expands to ten schools'], ['2021', 'First mentees graduate as engineers'], ['2025', 'Reaches 40 schools']],
  },
  {
    slug: 'aisha-al-marri', name: 'Aisha Al Marri', role: 'Managing Partner, Wadi Capital', category: 'Business', emirate: 'dubai', winner: true, born: 1983,
    knownFor: 'Venture investment',
    quote: 'Patient money builds things that last.',
    bio: 'Aisha Al Marri runs one of the region’s most active early-stage funds, with investments in climate, logistics and health technology.',
    bio2: 'She has backed more than 60 companies and mentors first-time founders through a free programme.',
    short: 'Runs one of the region’s most active early-stage funds.',
    milestones: [['2010', 'Joins family office'], ['2017', 'Co-founds Wadi Capital'], ['2022', 'Closes third fund'], ['2025', 'Wins Amazing Emiratis Award for Business']],
  },
  {
    slug: 'hazza-al-mansouri', name: 'Hazza Al Mansouri', role: 'Mission Engineer', category: 'Tech', emirate: 'dubai', winner: false, born: 1993,
    knownFor: 'Lunar rover operations',
    quote: 'We plan every move on the Moon twice on Earth.',
    bio: 'Hazza Al Mansouri is part of the team guiding the next Emirati lunar rover, responsible for navigation and surface operations.',
    bio2: 'He joined the space programme straight from university and has worked on three missions.',
    short: 'Guides the navigation of the next Emirati lunar rover.',
    milestones: [['2016', 'Joins national space programme'], ['2020', 'Works on Mars mission operations'], ['2023', 'Leads rover navigation team'], ['2026', 'Lunar mission preparation']],
  },
  {
    slug: 'maitha-al-mazrouei', name: 'Maitha Al Mazrouei', role: 'Visual Artist', category: 'Culture', emirate: 'abu-dhabi', winner: false, born: 1995,
    knownFor: 'Desert landscape painting',
    quote: 'Liwa taught me that sand has more colours than paint.',
    bio: 'Maitha Al Mazrouei paints large-scale landscapes of the Liwa desert using pigments made from local minerals.',
    bio2: 'Her work has been shown in Abu Dhabi, Venice and Seoul.',
    short: 'Paints the Liwa desert with pigments made from local minerals.',
    milestones: [['2017', 'First solo show, Abu Dhabi'], ['2021', 'Residency in Seoul'], ['2024', 'Shown at the Venice Biennale'], ['2026', 'Commissioned for national museum']],
  },
  {
    slug: 'sultan-al-mehairbi', name: 'Sultan Al Mehairbi', role: 'Chef & Restaurateur', category: 'Lifestyle', emirate: 'fujairah', winner: false, born: 1986,
    knownFor: 'Emirati cuisine',
    quote: 'Harees is slow food. That is the point.',
    bio: 'Sultan Al Mehairbi runs restaurants dedicated to Emirati home cooking, using recipes collected from families on the east coast.',
    bio2: 'He works directly with fishermen and date farmers in Fujairah and Ras Al Khaimah.',
    short: 'Cooks Emirati home recipes collected from east-coast families.',
    milestones: [['2011', 'Opens first restaurant in Fujairah'], ['2018', 'Publishes recipe archive'], ['2022', 'Opens in Dubai'], ['2025', 'Starts culinary apprenticeship']],
  },
  {
    slug: 'mira-al-hosani', name: 'Mira Al Hosani', role: 'Clinical Psychologist', category: 'Health', emirate: 'umm-al-quwain', winner: false, born: 1988,
    knownFor: 'Community mental health',
    quote: 'The majlis was always a place to talk. We just added listening.',
    bio: 'Mira Al Hosani runs community sessions on mental health hosted in neighbourhood majlis, aimed at reducing stigma among families.',
    bio2: 'The format has been adopted by health authorities in four Emirates.',
    short: 'Hosts mental-health conversations in neighbourhood majlis.',
    milestones: [['2014', 'Qualifies as clinical psychologist'], ['2019', 'First majlis session in Umm Al Quwain'], ['2023', 'Adopted by health authorities'], ['2026', 'Launches training for facilitators']],
  },
  {
    slug: 'alia-al-shamsi', name: 'Alia Al Shamsi', role: 'Founder, Raqam Pay', category: 'Tech', emirate: 'sharjah', winner: false, born: 1992,
    knownFor: 'Digital payments',
    quote: 'A payment should feel like a handshake.',
    bio: 'Alia Al Shamsi founded Raqam Pay, a payments platform used by small shops and market traders across the UAE.',
    bio2: 'More than 30,000 merchants now use Raqam to accept digital payments.',
    short: 'Built the payments platform used by 30,000 small merchants.',
    milestones: [['2018', 'Leaves banking to start Raqam'], ['2020', 'Launches with 200 merchants'], ['2023', 'Reaches 20,000 merchants'], ['2025', 'Licensed as a payments provider']],
  },
];

ALL_PEOPLE.push(
  {
    slug: 'reem-al-shehhi', name: 'Reem Al Shehhi', role: 'Founder, Shehhi Atelier', category: 'Lifestyle', emirate: 'dubai', winner: false, born: 1993,
    knownFor: 'Heritage tailoring',
    quote: 'People think you have to choose between heritage and modern. Here we never had to.',
    bio: 'Reem Al Shehhi founded her own label in an Al Quoz warehouse, cutting abayas and kanduras from hand-woven sadu alongside Italian wool crepe.',
    bio2: 'The atelier now shows in Paris and Milan and produces entirely in the UAE, employing artisans trained in talli braiding and embroidery.',
    short: 'Runs a fashion label that takes heritage textiles to Paris and Milan.',
    milestones: [['2016', 'Graduates in fashion design'], ['2019', 'Opens her Al Quoz studio'], ['2023', 'First show in Paris'], ['2026', 'Shows in Milan']],
    stories: ['new-couture-of-the-desert'],
  },
  {
    slug: 'mahra-al-ameri', name: 'Mahra Al Ameri', role: 'Founder, Bayt Al Bunn', category: 'Business', emirate: 'dubai', winner: false, born: 1996,
    knownFor: 'Specialty coffee roasting',
    quote: 'Gahwa was always our first welcome. I wanted the beans to be ours too.',
    bio: 'Mahra Al Ameri started roasting coffee in a rented corner of an Al Quoz warehouse and now supplies cafés and hotels across the Emirates.',
    bio2: 'Her roastery runs a training programme that has taught more than 200 young Emiratis to roast and brew.',
    short: 'Built a specialty roastery from one rented corner in Al Quoz.',
    milestones: [['2019', 'First roast in Al Quoz'], ['2021', 'Opens training academy'], ['2024', 'Supplies 60 cafés and hotels'], ['2026', 'Opens second roastery in Sharjah']],
    stories: ['coffee-roasters-of-al-quoz'],
  },
  {
    slug: 'latifa-al-mazrouei', name: 'Latifa Al Mazrouei', role: 'Co-founder, Ghaf Robotics', category: 'Tech', emirate: 'abu-dhabi', winner: false, born: 1997,
    knownFor: 'Reforestation drones',
    quote: 'A drone can plant in an hour what a team plants in a week. The ghaf does the rest.',
    bio: 'Latifa Al Mazrouei co-founded Ghaf Robotics, which uses drones to seed native trees across degraded desert land.',
    bio2: 'The company works with volunteer groups and landowners in four Emirates and has seeded more than a million native trees.',
    short: 'Seeds native ghaf trees across the desert with drones.',
    milestones: [['2019', 'Graduates in mechanical engineering'], ['2021', 'Co-founds Ghaf Robotics'], ['2023', 'First large-scale planting season'], ['2025', 'Passes one million seeds planted']],
    stories: ['volunteers-who-plant-ghaf-trees'],
  },
  {
    slug: 'noor-al-hammadi', name: 'Noor Al Hammadi', role: 'Founder, Sadu Lab', category: 'Business', emirate: 'sharjah', winner: false, born: 1995,
    knownFor: 'Craft e-commerce',
    quote: 'Our grandmothers sold through word of mouth. We just made the mouth bigger.',
    bio: 'Noor Al Hammadi runs Sadu Lab, an online marketplace that sells hand-woven and embroidered work by Emirati craftswomen.',
    bio2: 'More than 150 artisans sell through the platform, which handles photography, shipping and payments for them.',
    short: 'Sells Emirati craftswomen’s work to buyers around the world.',
    milestones: [['2018', 'Leaves banking to start Sadu Lab'], ['2020', 'Launches with 20 artisans'], ['2023', 'Ships to 30 countries'], ['2026', 'Passes 150 artisans']],
  },
  {
    slug: 'humaid-al-falahi', name: 'Humaid Al Falahi', role: 'Founder, Dhow Games', category: 'Tech', emirate: 'abu-dhabi', winner: false, born: 1998,
    knownFor: 'Game development',
    quote: 'Our grandparents told stories around the fire. We tell them with a controller.',
    bio: 'Humaid Al Falahi founded Dhow Games, a studio making mobile games set in the history and landscapes of the Gulf.',
    bio2: 'Its first title, a pearl-diving adventure, has been downloaded more than two million times, and the studio now employs 25 developers and artists.',
    short: 'Makes games set in the Gulf’s history and landscapes.',
    milestones: [['2020', 'Graduates in computer science'], ['2021', 'Founds Dhow Games'], ['2023', 'First game passes one million downloads'], ['2026', 'Opens second studio']],
  },
  {
    slug: 'sultan-al-ketbi', name: 'Sultan Al Ketbi', role: 'Founder, Wadi Ride', category: 'Business', emirate: 'ras-al-khaimah', winner: false, born: 1997,
    knownFor: 'Electric bike sharing',
    quote: 'The mountains were always our playground. Now you can ride them without the noise.',
    bio: 'Sultan Al Ketbi runs Wadi Ride, an electric-bike sharing service for the mountain trails and towns of Ras Al Khaimah and Fujairah.',
    bio2: 'The company operates more than 600 bikes and works with hotels and tour operators to open new trail routes.',
    short: 'Runs an electric-bike network across the northern mountains.',
    milestones: [['2019', 'Completes engineering degree'], ['2022', 'Launches Wadi Ride with 40 bikes'], ['2024', 'Expands to Fujairah'], ['2026', 'Passes 600 bikes']],
  },
  {
    slug: 'khalifa-al-blooshi', name: 'Khalifa Al Blooshi', role: 'Co-founder, Mahsool', category: 'Business', emirate: 'fujairah', winner: false, born: 1999,
    knownFor: 'Farm-to-table marketplace',
    quote: 'Every farm in the east coast has a story. We just help people find it.',
    bio: 'Khalifa Al Blooshi co-founded Mahsool, an online marketplace that sells dates, honey and vegetables directly from family farms.',
    bio2: 'More than 300 farms sell through the platform, which handles packing and same-day delivery across the Emirates.',
    short: 'Sells produce from family farms straight to homes.',
    milestones: [['2021', 'Graduates in business'], ['2022', 'Co-founds Mahsool'], ['2024', 'Passes 100 farms'], ['2026', 'Passes 300 farms']],
  },
);

/** Profiles currently shown: everyone outside hidden sections. */
export const PEOPLE: Person[] = ALL_PEOPLE.filter((p) => !isHiddenCategory(p.category.toLowerCase()));

export type Collection = { slug: string; title: string; titleEm: string; intro: string; cta: string; people: string[] };

/** Curated collections of profiles, each with its own page (/<slug>) and homepage section. */
export const COLLECTIONS: Record<'women' | 'young', Collection> = {
  women: {
    slug: 'women-entrepreneurs',
    title: 'Women',
    titleEm: 'Entrepreneurs',
    intro: 'Emirati women building companies, from venture capital and payments to heritage fashion, coffee and craft.',
    cta: 'Know a founder who belongs here? Tell us about her. The editors review every application.',
    people: ['aisha-al-marri', 'alia-al-shamsi', 'reem-al-shehhi', 'hessa-al-nuaimi', 'noor-al-hammadi', 'mahra-al-ameri'],
  },
  young: {
    slug: 'young-entrepreneurs',
    title: 'Young',
    titleEm: 'Entrepreneurs',
    intro: 'Founders who started their companies in their twenties, from games and electric bikes to reforestation and farm-to-table food.',
    cta: 'Know a young founder who belongs here? Put them forward. The editors review every application.',
    people: ['humaid-al-falahi', 'latifa-al-mazrouei', 'sultan-al-ketbi', 'khalifa-al-blooshi', 'mahra-al-ameri', 'noor-al-hammadi'],
  },
};

export function collectionPeople(c: Collection): Person[] {
  return c.people.map((s) => bySlug.get(s)).filter((p): p is Person => Boolean(p));
}

export const SPOTLIGHT_LEAD = 'mariam-al-falasi';
export const SPOTLIGHT = ['khalid-al-mansoori', 'saeed-al-shamsi', 'omar-al-zaabi', 'aisha-al-marri'];

/** Total profiles in the archive (the sample data holds only a selection). */
export const ARCHIVE_TOTALS = { profiles: 250, industries: 45 };

const bySlug = new Map(PEOPLE.map((p) => [p.slug, p]));

export function getPerson(slug: string): Person | undefined {
  return bySlug.get(slug);
}

export function findPersonByName(name: string): Person | undefined {
  const n = name.trim().toLowerCase();
  return PEOPLE.find((p) => p.name.toLowerCase() === n);
}

/** Profile page for a person in the archive, or a search for people without a profile yet. */
export function personHref(name: string): string {
  const p = findPersonByName(name);
  return p ? `/profiles/${p.slug}` : `/search?q=${encodeURIComponent(name)}`;
}

export function peopleInEmirate(emirate: EmirateSlug): Person[] {
  return PEOPLE.filter((p) => p.emirate === emirate);
}
