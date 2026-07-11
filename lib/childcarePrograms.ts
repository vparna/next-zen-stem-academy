export type ChildcareProgram = {
  slug: string;
  title: string;
  age: string;
  image: string;
  color: string;
  tagline: string;
  description: string;
  bullets: string[];
  curriculum: {
    area: string;
    detail: string;
  }[];
  schedule: string;
  ratio: string;
};

export const childcarePrograms: ChildcareProgram[] = [
  {
    slug: 'little-blossoms',
    title: 'Little Blossoms',
    age: '6 weeks to 12 months',
    image: '/little_blossoms.png',
    color: '#F25022',
    tagline: 'Where Every Moment is a Discovery',
    description:
      'Nurturing daycare environment focusing on sensory discovery, basic motor coordination, and secure, warm bonding. Our trained caregivers provide attentive, individualized care so every infant grows in a safe and loving space.',
    bullets: [
      'Sensory play & exploration',
      'Individualized care routines',
      'Safe, hygienic play space',
    ],
    curriculum: [
      { area: 'Sensory Development', detail: 'Texture boards, sound play, light & shadow exploration, tummy time activities.' },
      { area: 'Motor Skills', detail: 'Grasping toys, supervised crawling tracks, balance cushions, roll & reach exercises.' },
      { area: 'Language & Bonding', detail: 'Narrated routines, responsive cooing, simple songs and lullabies, face-to-face interaction.' },
      { area: 'Routine & Security', detail: 'Consistent feed-sleep-play schedules aligned with each infant\'s individual rhythm.' },
    ],
    schedule: 'Full-day: 7:00 AM – 5:00 PM',
    ratio: '1 caregiver : 3 infants',
  },
  {
    slug: 'tiny-explorers',
    title: 'Tiny Explorers',
    age: '13 to 24 months',
    image: '/tiny_explorers.png',
    color: '#7FBA00',
    tagline: 'Moving, Talking, and Learning Together',
    description:
      'Guided physical movement, early language building, and initial social group interactions to build confidence. Toddlers in this stage are natural scientists — we give them the freedom and structure to explore.',
    bullets: [
      'Language building & story time',
      'Motor skills & physical coordination',
      'Social development through play',
    ],
    curriculum: [
      { area: 'Language & Literacy', detail: 'Daily story time, name recognition games, first words flashcards, music with lyrics.' },
      { area: 'Gross Motor', detail: 'Obstacle courses, walking ramps, ball play, dance & movement sessions.' },
      { area: 'Fine Motor', detail: 'Stacking blocks, shape sorters, large-bead threading, peg boards.' },
      { area: 'Social-Emotional', detail: 'Parallel play groups, emotion identification, simple turn-taking games.' },
    ],
    schedule: 'Full-day: 7:00 AM – 5:00 PM',
    ratio: '1 caregiver : 4 toddlers',
  },
  {
    slug: 'curious-cubs',
    title: 'Curious Cubs',
    age: '2-Year-Olds',
    image: '/curious_cubs.png',
    color: '#00A4EF',
    tagline: 'Asking Why — and Finding Out',
    description:
      'Cognitive exploration, basic puzzle solving, and learning daily group routines to foster emotional growth. Two-year-olds are wired to question everything — our curriculum channels that curiosity into structured learning adventures.',
    bullets: [
      'Cognitive puzzles & shape sorting',
      'Social collaboration exercises',
      'Establishing daily group routines',
    ],
    curriculum: [
      { area: 'Cognitive Development', detail: 'Multi-piece puzzles, colour & shape sorting, cause-and-effect toys, basic counting.' },
      { area: 'Creative Arts', detail: 'Finger painting, playdough sculpting, collage-making, free-draw sessions.' },
      { area: 'Social Skills', detail: 'Group circle time, cooperative building challenges, sharing & empathy role-play.' },
      { area: 'Self-Care & Independence', detail: 'Hand-washing routines, self-feeding practices, tidy-up habits, dressing skills.' },
    ],
    schedule: 'Full-day: 7:00 AM – 5:00 PM',
    ratio: '1 teacher : 5 children',
  },
  {
    slug: 'little-discoverers',
    title: 'Little Discoverers',
    age: '3 to 4-Year-Olds',
    image: '/little_discoverers.png',
    color: '#FFB900',
    tagline: 'Ready to Read, Ready to Lead',
    description:
      'Kindergarten readiness program featuring pre-reading, creative arts, logical thinking, and social skills. Our structured preschool day blends play-based learning with intentional academic foundations to set every child up for lifelong success.',
    bullets: [
      'Pre-reading & phonics introduction',
      'Creative arts & expression sessions',
      'Social-emotional milestone training',
    ],
    curriculum: [
      { area: 'Literacy Readiness', detail: 'Letter recognition, phonics songs, sight word introduction, early writing strokes.' },
      { area: 'STEAM Foundations', detail: 'Simple science experiments, pattern recognition, introductory coding concepts with blocks.' },
      { area: 'Creative Expression', detail: 'Drama & storytelling, watercolour painting, music & rhythm, construction play.' },
      { area: 'Kindergarten Prep', detail: 'Structured group lessons, independent task time, pencil grip, classroom behaviour skills.' },
    ],
    schedule: 'Full-day: 7:00 AM – 5:00 PM  |  Half-day option: 8:00 AM – 12:00 PM',
    ratio: '1 teacher : 8 children',
  },
];

export function getProgramBySlug(slug: string): ChildcareProgram | undefined {
  return childcarePrograms.find((p) => p.slug === slug);
}
