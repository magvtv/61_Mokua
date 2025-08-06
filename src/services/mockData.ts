import { Post, Author, Category } from '../types';

export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    bio: 'Award-winning novelist and literary critic with over 15 years of experience in contemporary fiction. Sarah\'s work has been featured in The New Yorker, Atlantic Monthly, and Harper\'s Magazine.',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/sarahchen' },
      { platform: 'instagram', url: 'https://instagram.com/sarahchen_writer' },
      { platform: 'website', url: 'https://sarahchen.com' }
    ],
    postsCount: 24
  },
  {
    id: '2',
    name: 'Marcus Thompson',
    slug: 'marcus-thompson',
    bio: 'Poet laureate and professor of creative writing at Columbia University. Marcus specializes in modernist poetry and has published six collections of poetry.',
    avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/marcuspoet' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/marcusthompson' }
    ],
    postsCount: 18
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    slug: 'elena-rodriguez',
    bio: 'Emerging voice in literary fiction, focusing on immigrant experiences and magical realism. Elena\'s debut novel won the 2023 Emerging Writers Award.',
    avatar: 'https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/elena_writes' },
      { platform: 'website', url: 'https://elenarodriguez.writer' }
    ],
    postsCount: 12
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Fiction',
    slug: 'fiction',
    description: 'Contemporary and classic fiction reviews, analysis, and original stories',
    color: '#2E7D8A',
    postsCount: 45
  },
  {
    id: '2',
    name: 'Poetry',
    slug: 'poetry',
    description: 'Original poems, poetry analysis, and reviews of poetry collections',
    color: '#FF8F00',
    postsCount: 32
  },
  {
    id: '3',
    name: 'Essays',
    slug: 'essays',
    description: 'Literary essays, cultural commentary, and personal narratives',
    color: '#FF6B6B',
    postsCount: 28
  },
  {
    id: '4',
    name: 'Reviews',
    slug: 'reviews',
    description: 'In-depth book reviews and literary criticism',
    color: '#8E24AA',
    postsCount: 67
  },
  {
    id: '5',
    name: 'Interviews',
    slug: 'interviews',
    description: 'Conversations with authors, poets, and literary figures',
    color: '#43A047',
    postsCount: 19
  },
  {
    id: '6',
    name: 'Literary Criticism',
    slug: 'literary-criticism',
    description: 'Academic analysis and theoretical approaches to literature',
    color: '#E91E63',
    postsCount: 23
  },
  {
    id: '7',
    name: 'Writing Tips',
    slug: 'writing-tips',
    description: 'Practical advice for aspiring writers and creative writing techniques',
    color: '#9C27B0',
    postsCount: 15
  },
  {
    id: '8',
    name: 'Book Lists',
    slug: 'book-lists',
    description: 'Curated reading lists and recommendations for different genres and themes',
    color: '#3F51B5',
    postsCount: 12
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Transformative Power of Magical Realism in Contemporary Literature',
    slug: 'transformative-power-magical-realism',
    content: `Magical realism continues to captivate readers and critics alike, offering a unique lens through which authors can explore complex social, political, and personal themes. This literary technique, which seamlessly blends fantastical elements with realistic narratives, has evolved significantly since its Latin American origins.

In contemporary literature, we see authors like Isabel Allende, Haruki Murakami, and Erin Morgenstern pushing the boundaries of what magical realism can achieve. Their works demonstrate how this genre can address universal human experiences while maintaining cultural specificity.

The power of magical realism lies in its ability to make the extraordinary seem ordinary and the ordinary seem extraordinary. When Gabriel García Márquez wrote about characters who lived for centuries or ascended to heaven, he wasn't merely creating fantasy—he was commenting on the cyclical nature of history and the transcendent power of love and memory.

Today's magical realist authors face different challenges and opportunities. In our hyperconnected, technology-saturated world, the line between reality and fantasy has become increasingly blurred. Authors must navigate this landscape while maintaining the essential quality that makes magical realism so compelling: its ability to reveal deeper truths about the human condition.

The future of magical realism looks bright, with emerging voices bringing fresh perspectives and cultural backgrounds to this rich tradition. As our world becomes more complex, the need for literature that can capture its contradictions and possibilities becomes ever more essential.`,
    excerpt: 'Exploring how magical realism continues to evolve in contemporary literature, offering authors powerful tools to examine complex themes while maintaining cultural authenticity.',
    featuredImage: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[2],
    category: mockCategories[0],
    tags: ['magical realism', 'contemporary literature', 'literary analysis'],
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    featured: true,
    seo: {
      metaTitle: 'The Transformative Power of Magical Realism in Contemporary Literature',
      metaDescription: 'Discover how magical realism continues to evolve and captivate readers in contemporary literature.',
      keywords: ['magical realism', 'contemporary literature', 'literary analysis', 'Gabriel García Márquez']
    }
  },
  {
    id: '2',
    title: 'Finding Voice: A Journey Through Modern Poetry',
    slug: 'finding-voice-modern-poetry',
    content: `Poetry has always been the most intimate of literary forms, requiring poets to distill their deepest thoughts and emotions into concentrated language. In the modern era, poets face unique challenges in finding and developing their authentic voice.

The journey to poetic voice often begins with imitation. Young poets read widely, absorbing the rhythms and techniques of their literary heroes. This is not only natural but necessary—it's how we learn any art form. The key is knowing when to move beyond imitation toward innovation.

Consider the evolution of poets like Maya Angelou, who began by mastering traditional forms before developing her distinctive style that combined personal narrative with universal themes. Her journey illustrates how technical proficiency can serve as a foundation for authentic expression.

Modern poetry offers unprecedented freedom in form and subject matter. Poets can draw from slam poetry, spoken word, digital media, and traditional forms to create hybrid works that speak to contemporary experiences. This freedom, however, comes with the responsibility to make deliberate choices about form and content.

The most compelling contemporary poets are those who understand that voice isn't just about style—it's about perspective. They bring unique viewpoints to universal experiences, helping readers see familiar things in new ways. This is the eternal promise and challenge of poetry: to make the familiar strange and the strange familiar.`,
    excerpt: 'An exploration of how contemporary poets develop their authentic voice in an era of unprecedented creative freedom.',
    featuredImage: 'https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[1],
    category: mockCategories[1],
    tags: ['poetry', 'creative writing', 'literary voice'],
    publishedAt: '2024-01-12T14:30:00Z',
    readingTime: 6,
    featured: true
  },
  {
    id: '3',
    title: 'The Art of Literary Translation: Bridging Cultures Through Words',
    slug: 'art-literary-translation',
    content: `Literary translation is perhaps one of the most underappreciated arts in the literary world. Translators must not only convert words from one language to another but also capture the soul, rhythm, and cultural nuances of the original work.

The challenges facing literary translators are immense. They must navigate different grammatical structures, cultural references, and idiomatic expressions while maintaining the author's voice and style. It's a delicate balance between fidelity to the source text and accessibility to the target audience.

Consider the work of translators like Edith Grossman, who brought the works of Gabriel García Márquez and Mario Vargas Llosa to English-speaking audiences. Her translations don't just convey meaning—they recreate the magic and rhythm of the original Spanish prose.

In our globalized world, literary translation plays a crucial role in fostering cross-cultural understanding. Through translated works, readers can experience perspectives and stories from cultures vastly different from their own. This exchange enriches both individual readers and the broader literary landscape.

The digital age has brought new opportunities and challenges for translators. Online tools can assist with basic translation tasks, but they cannot replicate the human intuition required for truly great literary translation. The best translators remain those who are not just bilingual but bicultural, understanding the deep contexts that inform both languages.`,
    excerpt: 'Examining the complex art of literary translation and its vital role in connecting cultures through literature.',
    featuredImage: 'https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[0],
    category: mockCategories[2],
    tags: ['translation', 'literature', 'cultural exchange'],
    publishedAt: '2024-01-10T09:15:00Z',
    readingTime: 7,
    featured: false
  },
  {
    id: '4',
    title: 'Revisiting Toni Morrison: The Bluest Eye at 50',
    slug: 'toni-morrison-bluest-eye-50',
    content: `Fifty years after its publication, Toni Morrison's debut novel "The Bluest Eye" remains as relevant and powerful as ever. This masterwork of American literature continues to challenge readers and provide insights into the lasting effects of racism and beauty standards on individual psychology and community dynamics.

Morrison's unflinching examination of how societal beauty standards can destroy a young girl's sense of self-worth feels particularly urgent in our current social media age. The novel's protagonist, Pecola Breedlove, internalizes the message that blue eyes represent beauty and worth, leading to her psychological destruction.

What makes Morrison's approach so powerful is her refusal to simplify complex social issues. She doesn't present easy villains or heroes but instead shows how systemic racism affects entire communities, creating cycles of pain and displacement that are passed from generation to generation.

The novel's structure, told through multiple perspectives and time periods, demonstrates Morrison's innovative approach to narrative. She uses these techniques not for their own sake but to illuminate different aspects of her characters' experiences and to show how individual stories connect to larger historical forces.

Reading "The Bluest Eye" today, we're struck by how Morrison anticipated many contemporary discussions about representation, identity, and the psychological effects of racism. Her work remains essential reading for anyone seeking to understand the complexities of American society and the power of literature to illuminate difficult truths.`,
    excerpt: 'A retrospective look at Toni Morrison\'s groundbreaking debut novel and its continued relevance fifty years after publication.',
    featuredImage: 'https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[0],
    category: mockCategories[3],
    tags: ['Toni Morrison', 'American literature', 'literary analysis', 'racism'],
    publishedAt: '2024-01-08T11:45:00Z',
    readingTime: 9,
    featured: false
  },
  {
    id: '5',
    title: 'Conversations with Emerging Voices: The Future of Literary Fiction',
    slug: 'conversations-emerging-voices',
    content: `The literary landscape is constantly evolving, shaped by new voices that bring fresh perspectives and innovative approaches to storytelling. In this series of conversations with emerging authors, we explore the themes, challenges, and inspirations that drive the next generation of literary fiction writers.

These authors, representing diverse backgrounds and experiences, share a common commitment to pushing the boundaries of what literary fiction can achieve. They're not content to simply imitate the masters of the past but instead seek to create new forms and explore previously unexamined territories.

One recurring theme in these conversations is the challenge of writing authentically about contemporary experience. How do you capture the complexity of modern life, with its technology, global connectivity, and rapidly changing social dynamics, while still creating timeless art?

Many of these emerging voices are also grappling with questions of representation and responsibility. They understand that literature has the power to shape how we see ourselves and others, and they take this responsibility seriously. Their work often explores identity, belonging, and the search for meaning in an increasingly fragmented world.

What gives us hope for the future of literary fiction is the dedication and innovation of these emerging writers. They're not afraid to experiment with form, tackle difficult subjects, or challenge readers' expectations. Their work promises to enrich and expand the literary canon for generations to come.`,
    excerpt: 'An exploration of the themes and innovations driving the next generation of literary fiction writers.',
    featuredImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[2],
    category: mockCategories[4],
    tags: ['emerging authors', 'literary fiction', 'contemporary literature'],
    publishedAt: '2024-01-05T16:20:00Z',
    readingTime: 5,
    featured: false
  },
  {
    id: '6',
    title: 'The Resurgence of Epistolary Fiction in the Digital Age',
    slug: 'epistolary-fiction-digital-age',
    content: `Epistolary fiction—novels told through letters, diary entries, and other documents—has experienced a surprising resurgence in our digital age. Authors are finding new ways to use this classical form to explore contemporary themes and communication methods.

The traditional letter has been joined by emails, text messages, social media posts, and even dating app conversations as vehicles for storytelling. Authors like Jennifer Egan in "A Visit from the Goon Squad" and Sara Levine in "Treasure Island!!!" have shown how these modern forms of communication can be used to create compelling narratives.

What makes epistolary fiction particularly suited to our current moment is its ability to capture the fragmented, multi-voiced nature of contemporary communication. We live in an age where our relationships and identities are mediated through various digital platforms, each with its own conventions and limitations.

The form also allows authors to explore themes of authenticity and performance. When characters communicate through written forms—whether letters or social media posts—they're consciously crafting their identities and relationships. This mirrors how we all engage with digital communication, constantly curating our public personas.

Modern epistolary fiction also reflects our anxiety about connection and disconnection. Despite being more connected than ever before, many people feel increasingly isolated. Authors use the epistolary form to explore this paradox, showing how digital communication can both bridge and create distance between people.`,
    excerpt: 'How contemporary authors are revitalizing the epistolary novel form using modern communication methods.',
    featuredImage: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: mockAuthors[1],
    category: mockCategories[0],
    tags: ['epistolary fiction', 'digital age', 'modern literature'],
    publishedAt: '2024-01-03T13:10:00Z',
    readingTime: 6,
    featured: false
  }
];

export const featuredPosts = mockPosts.filter(post => post.featured);
export const recentPosts = [...mockPosts].sort((a, b) => 
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);