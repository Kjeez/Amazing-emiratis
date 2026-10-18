export type CategoryKey = 'business' | 'culture' | 'health' | 'lifestyle' | 'tech';
export type StoryCategory = CategoryKey | 'community';

export type Category = {
  key: CategoryKey;
  label: string;
  ar: string;
  count: number;
  people: number;
  dek: string;
  subs: string[];
};

export const CATEGORIES: Category[] = [
  { key: 'business', label: 'Business', ar: 'أعمال', count: 64, people: 48, dek: 'Founders, investors and executives building the UAE economy, from family enterprises to venture-backed start-ups.', subs: ['Entrepreneurship', 'Finance', 'Energy', 'Leadership', 'Real Estate'] },
  { key: 'culture', label: 'Culture', ar: 'ثقافة', count: 52, people: 39, dek: 'Artists, writers, archivists and makers keeping Emirati heritage alive and pushing it somewhere new.', subs: ['Art', 'Literature', 'Heritage', 'Music', 'Film'] },
  { key: 'health', label: 'Health', ar: 'صحة', count: 41, people: 30, dek: 'Doctors, researchers and practitioners changing how the country prevents, treats and thinks about illness.', subs: ['Medicine', 'Research', 'Wellness', 'Mental Health', 'Nutrition'] },
  { key: 'lifestyle', label: 'Lifestyle', ar: 'أسلوب حياة', count: 47, people: 33, dek: 'Fashion, food, design and travel through the eyes of the Emiratis who shape them.', subs: ['Fashion', 'Food', 'Design', 'Travel', 'Sport'] },
  { key: 'tech', label: 'Tech', ar: 'تقنية', count: 38, people: 27, dek: 'Engineers, scientists and founders working on AI, space, mobility and climate.', subs: ['AI', 'Space', 'Fintech', 'Mobility', 'Climate'] },
];

export const STORY_CATEGORY_LABEL: Record<StoryCategory, string> = {
  business: 'Business',
  culture: 'Culture',
  health: 'Health',
  lifestyle: 'Lifestyle',
  tech: 'Tech',
  community: 'Community',
};

export function getCategory(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

/** People listed on each category page. Names resolve to profiles via personHref(). */
export const CATEGORY_PEOPLE: Record<CategoryKey, [name: string, role: string][]> = {
  business: [['Khalid Al Mansoori', 'Founder, Sahra Logistics'], ['Aisha Al Marri', 'Managing Partner, Wadi Capital'], ['Rashid Al Dhaheri', 'CEO, Noor Solar'], ['Fatima Al Qasimi', 'Founder, Bayt Interiors']],
  culture: [['Saeed Al Shamsi', 'Poet & Archivist'], ['Maitha Al Mazrouei', 'Visual Artist'], ['Ahmed Al Ali', 'Film Director'], ['Shamma Al Kaabi', 'Museum Curator']],
  health: [['Dr. Noura Al Ketbi', 'Cardiothoracic Surgeon'], ['Dr. Yousef Al Blooshi', 'Geneticist'], ['Mira Al Hosani', 'Clinical Psychologist'], ['Dr. Hind Al Muhairi', 'Paediatrician']],
  lifestyle: [['Hessa Al Nuaimi', 'Creative Director'], ['Sultan Al Mehairbi', 'Chef & Restaurateur'], ['Reem Al Shehhi', 'Fashion Designer'], ['Majid Al Romaithi', 'Endurance Rider']],
  tech: [['Mariam Al Falasi', 'AI Researcher'], ['Hazza Al Mansouri', 'Mission Engineer'], ['Alia Al Shamsi', 'Founder, Raqam Pay'], ['Abdulla Al Kaabi', 'Climate Scientist']],
};
