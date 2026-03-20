export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "minimalist-manifesto-2026",
    title: "The Minimalist Manifesto: Summer 2026",
    category: "Trends",
    excerpt: "Discover the understated elegance of mono-neutrality. This season, we explore architectural silhouettes and the power of ivory silk.",
    content: "The Summer 2026 collection is a testament to the power of restraint. In an age of digital noise, we return to the quiet confidence of mono-neutrality. Architectural silhouettes meet fluid motion, creating a narrative of structured ease. The highlight of the season is our signature ivory silk—sourced from sustainable mills and woven with a finish that catches the light like morning dew on linen. Minimalism is not about lack; it is about the perfection of what remains.",
    date: "March 15, 2026",
    imageUrl: "/jaurnal4.png",
    author: "Elena Vance"
  },
  {
    id: "paris-fashion-week-bts",
    title: "Behind the Curtains: Paris Fashion Week",
    category: "BTS",
    excerpt: "A raw look into the high-stakes world of haute couture. From the first stitch to the final walk, witness the evolution of a collection.",
    content: "Paris in March is a whirlwind of creative tension. Behind the velvet curtains of the Palais de Tokyo, the air is thick with the scent of steam irons and hairspray. Our atelier team has spent over 400 hours on a single draped gown, ensuring every fold tells a story. Amidst the chaos of casting and final fittings, there is a singular moment of calm—the minute before the music starts. This is where the vision becomes reality. Haute couture is more than clothing; it is the physical manifestation of a dream.",
    date: "March 10, 2026",
    imageUrl: "/jaurnal3.png",
    author: "Julian Thorne"
  },
  {
    id: "mastering-silk-scarf",
    title: "Mastering the Silk Scarf: A Styling Guide",
    category: "Styling",
    excerpt: "More than an accessory, the silk scarf is a narrative tool. Learn five transformative ways to drape, knot, and wear our signature silks.",
    content: "A silk scarf is perhaps the most versatile item in a woman's wardrobe. It can be a headband in the morning, a belt by noon, and a classic neck-tie by sunset. Our guide focuses on the 'Ascot Knot' for formal elegance and the 'Shoulder Drap' for a more relaxed, bohemian aesthetic. When choosing a scarf, look for hand-rolled edges—a hallmark of quality that ensures the fabric drapes with intention rather than gravity. Let your silk be the bridge between your outfit and your personality.",
    date: "March 05, 2026",
    imageUrl: "/jaurnal2.png",
    author: "Sophie Marceau"
  },
  {
    id: "soul-of-material",
    title: "The Soul of Material: Sustainable Linen",
    category: "Artisanal",
    excerpt: "Unpacking the timeless allure of flax. Explore the harvest and weaving techniques that make our Belgian linen a lifetime companion.",
    content: "Linen is the oldest textile known to humanity, yet it feels entirely modern. Our journey begins in the flax fields of Belgium, where the unique climate produces fibers of exceptional strength and luster. Unlike synthetic alternatives, linen breathes with the wearer, cooling in the heat and insulating in the chill. We treat our materials with organic dyes, preserving the natural 'slub' that gives each piece its unique character. To wear linen is to wear a piece of the earth, refined by centuries of tradition.",
    date: "February 28, 2026",
    imageUrl: "/jaurnal1.png",
    author: "Marc Andre"
  }
];

export const JOURNAL_CONFIG = {
  title: "The Journal",
  subtitle: "Insights into the Art of Living Well",
  intro: "A curated space for those who appreciate the finer details of craftsmanship, styling, and the stories behind the seams."
};
