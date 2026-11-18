/**
 * Master Stories: what leads the homepage's moving hero, in order.
 * When someone is profiled, put their profile first so the profile, their story and
 * any video sit on top of the site. Mix in stories and news (press releases) freely.
 */
export type MasterItem =
  | { kind: 'profile'; person: string; story?: string; media?: string }
  | { kind: 'story'; story: string }
  | { kind: 'news'; press: string; photo?: string };

export const MASTER_STORIES: MasterItem[] = [
  { kind: 'profile', person: 'hamdan-bin-mohammed', story: 'hamdan-bin-mohammed-crown-prince-poet-rider', media: 'fazza-dubai-poetry-forum' },
  { kind: 'story', story: 'new-couture-of-the-desert' },
  { kind: 'news', press: 'awards-2026-jury', photo: 'event/awards-ceremony' },
  { kind: 'story', story: 'family-offices-funding-next-generation-of-founders' },
  { kind: 'story', story: 'calligrapher-restoring-sharjah-manuscripts' },
  { kind: 'story', story: 'mission-control-lunar-rover' },
];
