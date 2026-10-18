export type LegalKey = 'privacy' | 'terms' | 'editorial';

export type LegalDoc = { key: LegalKey; nav: string; title: string; updated: string; intro: string; sections: [heading: string, body: string][] };

export const LEGAL_DOCS: LegalDoc[] = [
  { key: 'privacy', nav: 'Privacy', title: 'Privacy Policy', updated: '1 OCTOBER 2026',
    intro: 'This policy explains what personal information Amazing Emiratis collects, why we collect it, and how you can control it.',
    sections: [
      ['What we collect', 'Information you give us directly, such as your name and email when you subscribe, nominate someone or apply to the archive, and basic analytics about how the site is used.'],
      ['How we use it', 'To send the newsletters you choose, to review nominations and applications, and to improve the site. We do not sell personal information.'],
      ['Who we share it with', 'Only service providers who help us run the site and send email, under contracts that require them to protect it, and authorities where the law requires.'],
      ['Your rights', 'You can ask to see, correct or delete the information we hold about you at any time by writing to us.'],
    ] },
  { key: 'terms', nav: 'Terms of Use', title: 'Terms of Use', updated: '1 OCTOBER 2026',
    intro: 'These terms apply to everyone who reads, subscribes to or submits material to Amazing Emiratis.',
    sections: [
      ['Using the site', 'You may read and share our stories for personal, non-commercial purposes, with a link back to the original.'],
      ['Submissions', 'When you submit a nomination or application, you confirm the information is accurate and that you have permission to share any photographs.'],
      ['Intellectual property', 'All text, photography and design on the site belong to Amazing Emiratis or our contributors unless stated otherwise.'],
      ['Changes', 'We may update these terms. The date at the top of this page shows when they last changed.'],
    ] },
  { key: 'editorial', nav: 'Editorial Policy', title: 'Editorial Policy', updated: '1 SEPTEMBER 2026',
    intro: 'Amazing Emiratis is an independent editorial publication. These are the standards our editors and writers follow.',
    sections: [
      ['Independence', 'Profiles and stories are never paid for. Sponsors and partners have no say in who is featured or what is written.'],
      ['Accuracy', 'Every fact is checked against records and at least two independent sources. Quotes are recorded and confirmed with the speaker.'],
      ['Corrections', 'When we make a mistake we correct it promptly and note the correction at the end of the story.'],
      ['Selection', 'People are selected by the editorial board on the basis of their work and its impact, regardless of title, wealth or connections.'],
    ] },
];

export function getLegalDoc(key: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.key === key);
}
