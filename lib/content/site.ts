export type NavLink = { label: string; href: string };

export const NAV: NavLink[] = [
  { label: 'Business', href: '/category/business' },
  { label: 'Culture', href: '/category/culture' },
  { label: 'Health', href: '/category/health' },
  { label: 'Lifestyle', href: '/category/lifestyle' },
  { label: 'Tech', href: '/category/tech' },
  { label: 'Events', href: '/events' },
  { label: 'Awards', href: '/awards' },
];

export const ARCHIVE_LINKS: NavLink[] = [
  { label: 'Profiles A–Z', href: '/profiles' },
  { label: 'Explore the Emirates', href: '/emirates/abu-dhabi' },
  { label: 'Join the Archive', href: '/join' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'About', href: '/about' },
  { label: 'عربي', href: '/ar' },
];

export const SOCIALS: NavLink[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'YouTube', href: 'https://www.youtube.com/' },
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
    ],
  },
  {
    title: 'EXPLORE',
    links: [
      { label: 'Profiles', href: '/profiles' },
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
