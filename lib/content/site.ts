export type NavLink = { label: string; href: string };

/** The category bar, in order. Culture, Events and Awards live in the side menu and footer. */
export const NAV: NavLink[] = [
  { label: 'Lifestyle', href: '/category/lifestyle' },
  { label: 'Business', href: '/category/business' },
  { label: 'Technology', href: '/category/tech' },
  { label: 'Real Estate', href: '/category/real-estate' },
  { label: 'Videos', href: '/watch' },
  { label: 'Amazing 100', href: '/amazing-100' },
];

export const ARCHIVE_LINKS: NavLink[] = [
  { label: 'Culture', href: '/category/culture' },
  { label: 'Events', href: '/events' },
  { label: 'Awards 2026', href: '/awards' },
  { label: 'Profiles A–Z', href: '/profiles' },
  { label: 'Women Entrepreneurs', href: '/women-entrepreneurs' },
  { label: 'Young Entrepreneurs', href: '/young-entrepreneurs' },
  { label: 'Watch & Listen', href: '/watch' },
  { label: 'Press releases', href: '/press' },
  { label: 'Explore the Emirates', href: '/emirates/abu-dhabi' },
  { label: 'Join the Archive', href: '/join' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'About', href: '/about' },
  { label: 'عربي', href: '/ar' },
];

/** Social accounts. Replace each href with the platform's real account URL. */
export const SOCIALS: (NavLink & { icon: 'instagram' | 'x' | 'linkedin' | 'youtube' | 'facebook' })[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'X', href: 'https://x.com/', icon: 'x' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'PLATFORM',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Awards 2026', href: '/awards' },
      { label: 'Nominate', href: '/nominate' },
      { label: 'Events', href: '/events' },
      { label: 'Join the Archive', href: '/join' },
      { label: 'Press releases', href: '/press' },
    ],
  },
  {
    title: 'EXPLORE',
    links: [
      { label: 'Profiles', href: '/profiles' },
      { label: 'Culture', href: '/category/culture' },
      { label: 'The Amazing 100', href: '/amazing-100' },
      { label: 'Watch & Listen', href: '/watch' },
      { label: 'Women Entrepreneurs', href: '/women-entrepreneurs' },
      { label: 'Young Entrepreneurs', href: '/young-entrepreneurs' },
      { label: 'The Emirates', href: '/emirates/abu-dhabi' },
      { label: 'Search', href: '/search' },
      { label: 'Newsletter', href: '/newsletter' },
      { label: 'عربي', href: '/ar' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Editorial Policy', href: '/legal/editorial' },
      { label: 'Photo credits', href: '/credits' },
    ],
  },
];

export const CONTACTS = [
  { k: 'EDITORIAL', v: 'editors@amazingemiratis.ae', note: 'Story ideas and corrections' },
  { k: 'PARTNERSHIPS', v: 'partners@amazingemiratis.ae', note: 'Events and sponsorship' },
  { k: 'OFFICE', v: 'Al Maryah Island, Abu Dhabi', note: 'By appointment' },
];

export const EMIRATE_OPTIONS = ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah', 'Lives abroad'];
