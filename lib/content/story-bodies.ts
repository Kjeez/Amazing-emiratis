/** Full story text. Only stories listed here have a body; the rest show a "being prepared" note. */

export type StoryBlock =
  /** Body paragraph. `dropCap` sets the first letter as a large gold initial. */
  | { type: 'p'; text: string; dropCap?: boolean }
  | { type: 'quote'; text: string; cite: string }
  | { type: 'h2'; text: string }
  | { type: 'figure'; label: string; ratio: string; caption: string };

export type StoryBody = {
  /** Word(s) at the end of the title set in gold italics on the story page. */
  titleEm?: string;
  heroLabel: string;
  heroCaption: string;
  heroCredit: string;
  /** People in the story; names resolve to profiles via personHref(). */
  subjects: { name: string; role: string }[];
  tags: string[];
  blocks: StoryBlock[];
};

export const STORY_BODIES: Record<string, StoryBody> = {
  'hamdan-bin-mohammed-crown-prince-poet-rider': {
    titleEm: 'Endurance Rider',
    heroLabel: 'hero photograph 21:10 — Dubai',
    heroCaption: 'Dubai.',
    heroCredit: '',
    subjects: [{ name: 'Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum', role: 'Crown Prince of Dubai' }],
    tags: ['Leadership', 'Dubai', 'Poetry', 'Fazza', 'Equestrian'],
    blocks: [
      { type: 'p', dropCap: true, text: 'Sheikh Hamdan bin Mohammed bin Rashid Al Maktoum was born in Dubai on 14 November 1982, the son of Sheikh Mohammed bin Rashid Al Maktoum and Sheikha Hind bint Maktoum bin Juma Al Maktoum. He was educated in Dubai, at the Rashid School for Boys and the Dubai School of Government, before continuing his studies in the United Kingdom.' },
      { type: 'p', text: 'He graduated from the Royal Military Academy Sandhurst in 2001 and later attended the London School of Economics.' },
      { type: 'h2', text: 'A life in public office' },
      { type: 'p', text: 'His public career began early. He served as Deputy Ruler of Dubai from January 2006, and in September of that year was appointed Chairman of the Dubai Executive Council. On 1 February 2008 he was named Crown Prince of Dubai.' },
      { type: 'p', text: 'In July 2024 his responsibilities widened to the federal government. He was appointed Deputy Prime Minister and Minister of Defence of the UAE, taking over the defence portfolio from his father, who had held it since the formation of the UAE in 1971.' },
      { type: 'p', text: 'Among the initiatives associated with him is Dubai Global, launched in June 2022 to establish 50 commercial representative offices for Dubai across five continents.' },
      { type: 'h2', text: 'Fazza' },
      { type: 'p', text: 'Outside government he is widely known by his pen name, Fazza, under which he publishes romantic and patriotic poetry in Arabic. The name is commonly translated as “the one who helps”. He has recited his work in public, including at the Dubai Poetry Forum in 2011.' },
      { type: 'p', text: 'His interest in the arts extends to photography: in 2011 he founded the Hamdan International Photography Award.' },
      { type: 'h2', text: 'In the saddle' },
      { type: 'p', text: 'He is also an accomplished endurance rider. He won individual gold at the Alltech FEI World Equestrian Games in Normandy in 2014, and a bronze medal at the 2010 Games, and has led teams of UAE riders at international championships.' },
      { type: 'p', text: 'His other pursuits include skydiving, scuba diving off Fujairah, wildlife and photography, which he shares with more than 17 million followers on Instagram (as of April 2025).' },
      { type: 'p', text: 'This profile was compiled from the public record. Amazing Emiratis has not interviewed Sheikh Hamdan for it.' },
    ],
  },
  'new-couture-of-the-desert': {
    titleEm: 'Desert',
    heroLabel: 'hero photograph 21:10 — designers in the studio',
    heroCaption: 'Reem Al Shehhi in her Al Quoz studio, September 2026.',
    heroCredit: 'Photograph: Ahmed Al Ali',
    subjects: [
      { name: 'Reem Al Shehhi', role: 'Fashion Designer, Dubai' },
      { name: 'Hessa Al Nuaimi', role: 'Creative Director, Ajman' },
      { name: 'Shamma Al Kaabi', role: 'Textile Artist, Sharjah' },
    ],
    tags: ['Fashion', 'Heritage', 'Craft', 'Women in Design', 'Paris Fashion Week'],
    blocks: [
      { type: 'p', dropCap: true, text: 'In a converted warehouse in Al Quoz, rolls of hand-woven sadu lie next to bolts of Italian wool crepe. Reem Al Shehhi pulls one of each from the shelf and lays them side by side on the cutting table. “People think you have to choose,” she says. “Heritage or modern. Here we never had to.”' },
      { type: 'p', text: 'Al Shehhi is one of three Emirati designers whose work has moved, in the space of four years, from private appointments in Dubai to the official calendars of Paris and Milan. Their collections are built around garments most of the world still files under tradition: the abaya, the kandura, the shayla. On the runway, those shapes read as something else entirely.' },
      { type: 'p', text: 'What links them is a refusal to treat the past as decoration. Embroidery patterns come from family archives. Dyes are tested against swatches their grandmothers kept in tin boxes. The tailoring, though, is precise and current, closer to Savile Row than to the souk.' },
      { type: 'quote', text: '“We are not reviving anything. These clothes never stopped being worn. We are just cutting them for the life people live now.”', cite: 'Reem Al Shehhi' },
      { type: 'h2', text: 'The archive in the cupboard' },
      { type: 'p', text: 'For Hessa Al Nuaimi, the starting point was a cedar chest in her grandmother’s house in Ajman. Inside were twenty-three garments, some more than seventy years old, each wrapped in muslin. She photographed every seam before she cut a single pattern of her own.' },
      { type: 'p', text: 'Her second collection used none of the original fabrics, but every silhouette could be traced back to that chest. Buyers in Paris asked for the reference images. She declined. “They are not mood boards,” she says. “They are my family.”' },
      { type: 'figure', label: 'inline photograph 4:3 — archive garments', ratio: '4/3', caption: 'Garments from the Al Nuaimi family archive, photographed before restoration.' },
      { type: 'h2', text: 'Made here' },
      { type: 'p', text: 'All three designers produce in the UAE. Between them they employ more than sixty artisans, most of them women, many trained in techniques that were close to disappearing a generation ago. Talli braiding, once taught only at home, now has a waiting list at the studio in Sharjah.' },
      { type: 'p', text: 'That choice has costs. Production is slower and more expensive than outsourcing would be. None of them regrets it. “If it is made somewhere else,” Al Shehhi says, “then it is a costume of us. It is not us.”' },
      { type: 'p', text: 'Their next shows open in Paris in March. Each will close, as every one of their shows has, with a single abaya in black.' },
    ],
  },
};

export function getStoryBody(slug: string): StoryBody | undefined {
  return STORY_BODIES[slug];
}
