import { db, categoriesTable, authorsTable, postsTable, tagsTable, postTagsTable } from "./index.js";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("🌱 Seeding database...");

  // Categories
  const categories = await db.insert(categoriesTable).values([
    { name: "Stories", slug: "stories", description: "Short fiction and narratives" },
    { name: "Poetry", slug: "poetry", description: "Verse and spoken word" },
    { name: "Essays", slug: "essays", description: "Long-form commentary and analysis" },
    { name: "Reviews", slug: "reviews", description: "Literary criticism and book reviews" },
  ]).returning();
  console.log(`✓ Created ${categories.length} categories`);

  // Authors
  const authors = await db.insert(authorsTable).values([
    {
      name: "Nicolas Mokua",
      bio: "Founder and editor of Mokua Literary Platform. Writer based in Nairobi.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=nicolas",
      socialLinks: { twitter: "@nicolasmokua", website: "https://mokua.com" },
    },
    {
      name: "Wanjiru Mwangi",
      bio: "Poet and essayist exploring identity and belonging.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiru",
      socialLinks: { twitter: "@wanjirumwangi" },
    },
    {
      name: "Ochieng Odhiambo",
      bio: "Fiction writer and literary critic from Kisumu.",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ochieng",
      socialLinks: {},
    },
  ]).returning();
  console.log(`✓ Created ${authors.length} authors`);

  // Tags
  const tags = await db.insert(tagsTable).values([
    { name: "Nairobi", slug: "nairobi" },
    { name: "Identity", slug: "identity" },
    { name: "Diaspora", slug: "diaspora" },
    { name: "Matatu", slug: "matatu" },
    { name: "Literary Criticism", slug: "literary-criticism" },
    { name: "East Africa", slug: "east-africa" },
    { name: "Urban Life", slug: "urban-life" },
    { name: "Migration", slug: "migration" },
    { name: "Culture", slug: "culture" },
    { name: "Politics", slug: "politics" },
  ]).returning();
  console.log(`✓ Created ${tags.length} tags`);

  // Posts
  const posts = await db.insert(postsTable).values([
    {
      title: "The Weight of Homecoming",
      slug: "the-weight-of-homecoming",
      excerpt: "A woman returns to Nairobi after a decade abroad and finds the city familiar and foreign all at once — a meditation on return, identity, and the space between who we were and who we have become.",
      content: `<p>The plane descended through thick clouds, and suddenly there it was: Nairobi. The rust-red earth, the patchwork of tin roofs, the endless matatu routes threading through the city's arteries like veins.</p>

<p>Ten years. A decade of winters in London, of calling home only on Sunday afternoons when the rates were cheaper, of explaining to colleagues that yes, I grew up here, but no, I don't feel Kenyan enough anymore.</p>

<p>The airport hadn't changed much. Same chaotic baggage claim, same taxi drivers calling out "Madame! Madame!" as I emerged with my single suitcase. But everything else felt different. Or perhaps I was the one who had changed.</p>

<p>My mother's house in Kilimani smelled the same — frying onions, jasmine from the garden, that particular Nairobi dust that settles on everything. She hugged me longer than usual, her small frame trembling slightly.</p>

<p>"You've become so thin," she said, which is what Kenyan mothers say when they haven't seen you in too long.</p>

<p>That first week, I walked. From Kilimani to Yaya Centre, through the maze of Upper Hill, down to the railway station where my grandfather once worked. The matatus had new names now — 'Barcelona', 'Washington', 'Money Heist' — but they still played benga at volumes that could wake the dead.</p>

<p>In London, I had learned to be quiet. To keep my voice low on the Tube, to apologize when someone bumped into me, to explain my existence in ways that made others comfortable. Here, people spoke loudly, argued passionately, lived expansively. I found myself flinching at first, then slowly, slowly, remembering how to take up space.</p>

<p>The old haunts were gone. The bookstore where I spent my teenage years was now a mobile money shop. The café where we planned our futures was a Subway. But the jacarandas still bloomed purple in October. The rain still came in sudden, violent bursts that turned the streets to rivers. Some things endure.</p>

<p>My friends had scattered. Some to Toronto, to Sydney, to that endless diaspora. The ones who remained had children now, mortgages, businesses. We met for drinks at places that hadn't existed when I left, and talked about things I didn't understand — new politicians, new scandals, new songs. I nodded and smiled, feeling the gap between us like a physical thing.</p>

<p>But then, one evening, something shifted. I was at a friend's house in Westlands, and someone put on an old Gidi Gidi Maji Maji track. Without thinking, I was on my feet, dancing the way we used to at house parties in high school, all hips and hands and joy. My friends cheered, and for a moment, I was home. Not the home I had left, but a home nonetheless.</p>

<p>That's the thing about returning. You expect to find the place you left, but time has passed there too. The city has grown around your absence, formed new scars, new celebrations. You have to learn to love it not as it was, but as it is. And you have to learn to love yourself not as you were, but as you've become.</p>

<p>I'm still here, three months later. I've started writing again. In the mornings, I sit on my mother's veranda with chai and watch the neighborhood wake up. The children walking to school in their bright uniforms. The vegetable vendor calling out her prices. The distant sound of church choirs practicing.</p>

<p>Some days I think I'll stay. Others, I feel the pull of London, of my other life, my other self. But for now, I'm here. Learning the weight of homecoming. Learning that home is not a place you return to, but a place you continually arrive at.</p>`,
      contentType: "story",
      categoryId: categories[0].id,
      authorId: authors[0].id,
      status: "published",
      isFeatured: true,
      readingTime: 6,
      publishedAt: new Date("2026-03-26"),
      seoTitle: "The Weight of Homecoming | Mokua",
      seoDescription: "A meditation on return, identity, and the space between who we were and who we have become.",
    },
    {
      title: "Ode to the Matatu Driver",
      slug: "ode-to-the-matatu-driver",
      excerpt: "A tribute to the matatu driver as urban philosopher.",
      content: `Oh navigator of Nairobi's arterial rush,
conductor of chaos, choreographer of near-miss—
you who read the city's pulse like a wrist,
who know which junction breeds which jam,
which pothole swallows which shock absorber,
which cop takes which bribe on which day of the week.

You are the unacknowledged aristocrat of Avenue,
the duke of Double M, the sultan of Sacco.
Your sound system is your scripture,
your graffiti your manifesto,
your speed your theology.

The rest of us clutch our seats,
sweat through our deodorant,
pray to gods we forgot we believed in—
but you,
you are serene as a lake at dawn,
your hands light on the wheel
like a lover's on familiar skin.

This city would seize without you.
The suits in their sealed cars,
the students with their headphones,
the mothers with their market bags—
all suspended in your web of knowing,
all delivered to their destinations
by your daily grace.

So here is my offering:
not the extra ten shillings you never return,
but this recognition,
this small song
for the urban philosopher
who makes the impossible possible
every single Nairobi morning.`,
      contentType: "poem",
      categoryId: categories[1].id,
      authorId: authors[1].id,
      status: "published",
      isFeatured: false,
      readingTime: 2,
      publishedAt: new Date("2026-03-24"),
    },
    {
      title: "On the Poverty of Literary Criticism in East Africa",
      slug: "on-the-poverty-of-literary-criticism-in-east-africa",
      excerpt: "A diagnosis of the critical ecosystem that should surround East African literature and does not.",
      content: `<p>There is a strange loneliness to being a writer in East Africa. Not the loneliness of composition—that is universal—but the loneliness that comes after, when the work is done and seeks its readers, its interlocutors, its critics.</p>

<p>In other literary cultures, a book does not exist in isolation. It enters a conversation. Reviewers engage with it. Scholars contextualize it. Fellow writers respond to it. The work grows through this contact, finds its place in a tradition, contributes to an ongoing dialogue about what literature is and what it should do.</p>

<p>Here, that ecosystem is thin to the point of transparency. Our newspapers, when they still have books sections, prefer celebrity profiles and press releases. Our universities produce literary scholars who write for international journals about postcolonial theory, not for local readers about local books. Our literary magazines are few, underfunded, and irregular.</p>

<p>The result is a kind of atrophy. Writers publish into a void. Books appear and disappear without leaving ripples. There is no sustained critical conversation about the direction of our literature, no rigorous engagement with individual works, no sense of a shared project of understanding ourselves through our writing.</p>

<p>This is not a complaint about personal neglect. It is an observation about systemic failure. A healthy literary culture requires not just writers and readers, but mediators—reviewers, critics, editors, anthologizers—who help works find their audiences and help audiences find the language to respond.</p>

<p>We have the writers. We have the readers, though perhaps not enough. What we lack is everything in between.</p>

<p>Consider: when was the last time a major Kenyan novel received more than two reviews in local publications? When did a Ugandan short story collection generate a month of debate and discussion? When did a Tanzanian poet's new book become an event that people argued about at dinner parties?</p>

<p>It happens, occasionally. But it is the exception, not the rule.</p>

<p>The absence matters. Without criticism, literature becomes a hobby, not a serious engagement with our condition. Without review infrastructure, good books sink while bad books float. Without a culture of literary discussion, reading becomes a private act, disconnected from public life.</p>

<p>What would it take to change this?</p>

<p>Funding, certainly. Literary journalism does not pay, which means it is either done as a labor of love (unsustainable) or not done at all. We need fellowships for critics, publications that treat book reviews as essential content, training programs that teach the craft of serious reviewing.</p>

<p>But we also need a shift in attitude. Writers must stop seeing critics as enemies or PR agents and start seeing them as necessary partners in the literary enterprise. Readers must demand more than plot summaries. Publishers must invest in the long-term health of the ecosystem, not just the short-term sales of individual titles.</p>

<p>And we need institutions. A literary review that publishes regularly. A critics' circle that meets to discuss standards and methods. A prize for literary journalism that recognizes the best writing about our books.</p>

<p>The poverty of our critical culture is not inevitable. It is the result of choices we have made, structures we have allowed to decay, conversations we have failed to start.</p>

<p>We can make different choices. We can build what we lack. But first, we must recognize the poverty for what it is: a collective failure of attention and care, and a collective opportunity for change.</p>`,
      contentType: "essay",
      categoryId: categories[2].id,
      authorId: authors[2].id,
      status: "published",
      isFeatured: false,
      readingTime: 8,
      publishedAt: new Date("2026-03-22"),
    },
  ]).returning();
  console.log(`✓ Created ${posts.length} posts`);

  // Post tags (link posts to tags)
  await db.insert(postTagsTable).values([
    { postId: posts[0].id, tagId: tags[0].id }, // Nairobi
    { postId: posts[0].id, tagId: tags[1].id }, // Identity
    { postId: posts[0].id, tagId: tags[2].id }, // Diaspora
    { postId: posts[1].id, tagId: tags[0].id }, // Nairobi
    { postId: posts[1].id, tagId: tags[5].id }, // East Africa
    { postId: posts[1].id, tagId: tags[6].id }, // Urban Life
    { postId: posts[2].id, tagId: tags[4].id }, // Literary Criticism
    { postId: posts[2].id, tagId: tags[5].id }, // East Africa
  ]);
  console.log(`✓ Linked posts to tags`);

  console.log("\n✅ Seed complete!");
  console.log(`   ${categories.length} categories`);
  console.log(`   ${authors.length} authors`);
  console.log(`   ${tags.length} tags`);
  console.log(`   ${posts.length} posts`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
