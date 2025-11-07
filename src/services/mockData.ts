import { Post, Author, Category } from "../types";

export const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Wanjiku Muthoni",
    slug: "wanjiku-muthoni",
    bio: "Award-winning investigative journalist from Nakuru County, specializing in youth affairs and social justice. Wanjiku has covered drug abuse trends in Mombasa, education challenges in rural counties, and the rise of digital nomads in Nairobi. Her work has been featured in The Standard, Nation Media, and various youth-focused platforms.",
    avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/wanjiku_muthoni" },
      { platform: "instagram", url: "https://instagram.com/wanjiku_muthoni" },
      { platform: "website", url: "https://wanjikumuthoni.co.ke" }
    ],
    postsCount: 24
  },
  {
    id: "2",
    name: "Kiprop Chebet",
    slug: "kiprop-chebet",
    bio: "Youth advocate and community organizer from Eldoret, Uasin Gishu County. Kiprop focuses on mental health awareness among Kenyan youth, especially in counties affected by drug abuse. He runs rehabilitation programs and mentors young people transitioning from substance abuse.",
    avatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/kiprop_chebet" },
      { platform: "linkedin", url: "https://linkedin.com/in/kipropchebet" }
    ],
    postsCount: 18
  },
  {
    id: "3",
    name: "Amina Hassan",
    slug: "amina-hassan",
    bio: "Digital content creator and youth influencer from Mombasa County, focusing on Gen Z lifestyle, education technology, and social media trends. Amina covers topics from online safety to digital entrepreneurship among Kenyan youth.",
    avatar: "https://images.pexels.com/photos/3812944/pexels-photo-3812944.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socialLinks: [
      { platform: "instagram", url: "https://instagram.com/amina_hassan" },
      { platform: "website", url: "https://aminahassan.co.ke" }
    ],
    postsCount: 12
  },
  {
    id: "4",
    name: "Otieno Ochieng",
    slug: "otieno-ochieng",
    bio: "Healthcare worker and public health advocate from Kisumu County, specializing in sexual health education and HIV/AIDS prevention among youth. Otieno works with sex workers and vulnerable populations in various counties.",
    avatar: "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/otieno_ochieng" },
      { platform: "linkedin", url: "https://linkedin.com/in/otienoochieng" }
    ],
    postsCount: 15
  },
  {
    id: "5",
    name: "Faith Njeri",
    slug: "faith-njeri",
    bio: "Education technology specialist from Kiambu County, focusing on digital learning solutions for rural schools. Faith covers the digital divide, online education trends, and innovative teaching methods across Kenyan counties.",
    avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
    socialLinks: [
      { platform: "twitter", url: "https://twitter.com/faith_njeri" },
      { platform: "instagram", url: "https://instagram.com/faith_njeri" }
    ],
    postsCount: 20
  }
];

export const mockCategories: Category[] = [
  { id: "1", name: "Think-pieces", slug: "think-pieces", description: "Opinion and essays on contemporary issues", color: "#2E7D8A", postsCount: 45 },
  { id: "2", name: "Short stories", slug: "short-stories", description: "Original short fiction", color: "#FF8F00", postsCount: 32 },
  { id: "3", name: "Poetry", slug: "poetry", description: "Poems and spoken word", color: "#FF6B6B", postsCount: 28 },
  { id: "4", name: "Real Life", slug: "real-life", description: "Lived experiences and human interest", color: "#8E24AA", postsCount: 67 }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Hidden Crisis: Drug Abuse Among Youth in Mombasa County",
    slug: "hidden-crisis-drug-abuse-youth-mombasa",
    content: `Mombasa County has become the epicenter of a growing drug abuse crisis among Kenyan youth, with heroin and bhang use skyrocketing in the past two years. Our investigation reveals how the coastal county's strategic location has made it a major transit point for drug trafficking, directly impacting local youth.

The situation in areas like Bamburi, Shanzu, and Old Town is particularly dire. Young people as young as 14 are being recruited into drug distribution networks, lured by promises of quick money. "I started selling bhang to pay for my school fees," says 17-year-old Ali from Old Town, who now struggles with addiction himself.

Local rehabilitation centers are overwhelmed, with waiting lists stretching for months. Dr. Fatima Hassan, director of the Mombasa Youth Recovery Center, explains: "We're seeing a new pattern where youth are using multiple substances simultaneously, making treatment more complex."

The economic impact is devastating. Tourism, once the backbone of Mombasa's economy, has suffered as drug-related crime increases. Hotel owners report declining bookings, while local businesses struggle with the fallout.

Community leaders are calling for urgent intervention. "We need a multi-sectoral approach involving education, healthcare, law enforcement, and community organizations," says County Youth Officer James Mwangi. "This isn't just a Mombasa problem—it's a national crisis that requires immediate attention."

The rise of social media has also played a role, with drug dealers using platforms like WhatsApp and Telegram to reach young customers. Parents and educators are struggling to keep up with these evolving tactics.

Solutions being implemented include increased police patrols, community awareness programs, and partnerships with NGOs to provide alternative income sources for vulnerable youth. However, experts agree that prevention through education and economic empowerment remains the most effective long-term strategy.`,
    excerpt: "An in-depth investigation into the growing drug abuse crisis affecting youth in Mombasa County, revealing the complex factors driving this national concern.",
    featuredImage: "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ["drug abuse", "mombasa county", "youth crisis", "rehabilitation"],
    publishedAt: "2025-03-12T10:00:00Z",
    readingTime: 8,
    featured: true,
    seo: {
      metaTitle: "The Hidden Crisis: Drug Abuse Among Youth in Mombasa County",
      metaDescription: "Investigative report on the growing drug abuse crisis affecting Kenyan youth in Mombasa County.",
      keywords: ["drug abuse", "mombasa county", "youth crisis", "kenya", "rehabilitation"]
    }
  },
  {
    id: "2",
    title: "Digital Divide: How Rural Counties Struggle with Online Education",
    slug: "digital-divide-rural-counties-online-education",
    content: `The COVID-19 pandemic exposed a stark digital divide in Kenya's education system, with rural counties like Turkana, Marsabit, and Tana River struggling to implement online learning while urban areas adapted relatively smoothly.

In Turkana County, only 15% of students have access to smartphones or computers at home. "We had to create learning centers in community halls where students could access devices," explains Faith Njeri, an education technology specialist working in the region. "But even then, internet connectivity remains a major challenge."

The situation is particularly dire in Marsabit County, where some schools are located in areas with no mobile network coverage. Teachers have resorted to using radio broadcasts to reach students, but this method lacks the interactive element crucial for effective learning.

In Tana River County, the county government has partnered with local NGOs to provide solar-powered internet hubs in remote villages. "We've set up 20 community learning centers across the county," says County Education Officer Mary Wanjiku. "But we need more support from the national government."

The digital divide isn't just about access to devices and internet. Many rural teachers lack the skills to effectively use digital tools for teaching. Training programs have been implemented, but progress is slow due to limited resources.

Students in these counties face additional challenges. "Many of our students come from families that can't afford data bundles," says a teacher from Garissa County. "Even when they have devices, they can't afford to use them regularly."

The Ministry of Education has launched the Digital Learning Program, which aims to provide tablets to all primary school students. However, implementation has been slow, with only 30% of the target reached so far.

Private sector partnerships are emerging as a potential solution. Companies like Safaricom and Airtel have launched programs to provide affordable internet access to schools in underserved areas. However, more comprehensive solutions are needed to bridge the gap completely.

The long-term impact of this digital divide could be devastating for rural communities. Without proper digital literacy, students from these counties will be at a significant disadvantage in the job market, perpetuating cycles of poverty and inequality.`,
    excerpt: "Examining how rural counties in Kenya struggle with online education due to limited digital infrastructure and resources.",
    featuredImage: "https://images.pexels.com/photos/159581/dictionary-reference-book-learning-meaning-159581.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[4],
    category: mockCategories[3],
    tags: ["digital divide", "online education", "rural counties", "education technology"],
    publishedAt: "2025-03-08T14:30:00Z",
    readingTime: 6,
    featured: true
  },
  {
    id: "3",
    title: "Sex Work and Health: The Untold Story of Nairobi's Underground Economy",
    slug: "sex-work-health-nairobi-underground-economy",
    content: `Nairobi's sex work industry operates in the shadows, but its impact on public health and the economy is significant. Our investigation reveals the complex dynamics of this underground economy and its effects on vulnerable populations.

The industry employs thousands of young people, many of them migrants from rural counties seeking economic opportunities in the capital. "I came to Nairobi from Kisumu because there were no jobs back home," says 23-year-old Grace, who has been working in the industry for three years. "It's not what I planned, but it pays the bills."

Health risks are a major concern. HIV prevalence among sex workers in Nairobi is estimated at 29.3%, significantly higher than the national average of 4.9%. Access to healthcare services is limited due to stigma and legal barriers.

Dr. Otieno Ochieng, a healthcare worker specializing in sexual health, explains: "Many sex workers avoid seeking medical care because they fear discrimination or arrest. This creates a public health crisis that affects the entire community."

The economic impact is substantial. Sex work contributes an estimated KSh 15 billion annually to Nairobi's economy, though this figure is difficult to verify due to the industry's underground nature. Many workers support families in rural counties, sending money home for education and healthcare.

Law enforcement approaches vary. While sex work is technically illegal in Kenya, police often turn a blind eye in exchange for bribes. This creates an environment where workers have no legal protection and are vulnerable to exploitation and violence.

NGOs are working to improve conditions. Organizations like the Kenya Sex Workers Alliance provide health services, legal support, and economic alternatives. "We're not trying to promote sex work," says alliance director Jane Muthoni. "We're trying to protect the health and rights of people who are already in this situation."

The government's approach has been inconsistent. While some officials recognize the need for harm reduction programs, others push for stricter enforcement. This policy uncertainty makes it difficult for organizations to provide consistent services.

Solutions being explored include decriminalization, which would allow workers to access legal protections and healthcare services without fear of arrest. However, this remains controversial and faces significant political opposition.

The situation highlights broader issues of economic inequality and lack of opportunities for young people, especially in rural areas. Many sex workers are educated but unable to find employment in their fields of study.`,
    excerpt: "An investigation into Nairobi's sex work industry and its impact on public health, economy, and vulnerable populations.",
    featuredImage: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[3],
    category: mockCategories[0],
    tags: ["sex work", "nairobi", "public health", "underground economy"],
    publishedAt: "2025-03-05T09:15:00Z",
    readingTime: 7,
    featured: false
  },
  {
    id: "4",
    title: "Mental Health Crisis: Depression and Suicide Among Kenyan Youth",
    slug: "mental-health-crisis-depression-suicide-kenyan-youth",
    content: `Kenya is facing a mental health crisis among its youth, with depression and suicide rates rising alarmingly. Our investigation reveals the factors driving this crisis and the inadequate response from the healthcare system.

Statistics from the Ministry of Health show that suicide is now the third leading cause of death among Kenyans aged 15-29. The rate has increased by 58% in the past decade, with young men being particularly vulnerable.

Kiprop Chebet, a youth advocate from Eldoret, explains: "Many young people feel hopeless about their future. They see unemployment, economic hardship, and social pressure, and they don't know where to turn for help."

The stigma surrounding mental health remains a major barrier. Many families still view mental illness as a spiritual problem rather than a medical condition. "When I told my parents I was depressed, they took me to a traditional healer instead of a doctor," says 19-year-old Sarah from Nakuru County.

Access to mental health services is severely limited. Kenya has only 71 psychiatrists for a population of over 50 million people. In rural counties, mental health services are virtually non-existent.

The situation is particularly dire in counties affected by drought and food insecurity. "When people are struggling to feed their families, mental health becomes a luxury they can't afford," says Dr. Wanjiku Muthoni, a psychiatrist working in Turkana County.

Social media has both helped and harmed. While it provides platforms for mental health awareness, it also exposes young people to cyberbullying and unrealistic lifestyle comparisons. "Many of my patients feel inadequate when they compare their lives to what they see on Instagram," says Dr. Hassan from Mombasa.

Solutions being implemented include school-based mental health programs, community awareness campaigns, and training for primary healthcare workers to identify and treat common mental health conditions.

The government has allocated KSh 1.2 billion for mental health services in the current budget, but experts say this is insufficient given the scale of the problem.

Telemedicine is emerging as a potential solution for rural areas. Organizations like Amref Health Africa are using mobile technology to provide mental health support to remote communities.

However, prevention remains the most effective approach. This includes addressing the root causes of mental health issues: poverty, unemployment, family dysfunction, and social isolation.

The crisis calls for a comprehensive response involving the government, healthcare providers, educators, and communities. Without urgent action, the mental health crisis will continue to devastate Kenya's youth population.`,
    excerpt: "Investigating the growing mental health crisis among Kenyan youth, including rising depression and suicide rates.",
    featuredImage: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: ["mental health", "depression", "suicide", "youth crisis", "kenya"],
    publishedAt: "2025-02-28T11:45:00Z",
    readingTime: 9,
    featured: false
  },
  {
    id: "5",
    title: "Gen Z Entrepreneurs: How Young Kenyans Are Building Digital Businesses",
    slug: "gen-z-entrepreneurs-young-kenyans-digital-businesses",
    content: `Kenya's Gen Z is revolutionizing entrepreneurship through digital innovation, creating businesses that address local challenges while leveraging global opportunities. Our series explores how young Kenyans are building successful digital enterprises.

Amina Hassan, a 22-year-old content creator from Mombasa, has built a following of over 500,000 across social media platforms. "I started creating content about Kenyan culture and lifestyle during the pandemic," she explains. "Now I earn more from brand partnerships than I would from a traditional job."

The rise of digital entrepreneurship is particularly strong in counties with good internet infrastructure. Nairobi, Mombasa, and Kisumu are leading the way, but rural areas are also catching up through mobile money and e-commerce platforms.

Many young entrepreneurs are addressing local problems. In Nakuru County, 24-year-old John Kamau developed an app that connects farmers with buyers, eliminating middlemen and increasing profits. "My parents are farmers, so I understand the challenges they face," he says.

The government has recognized the potential of youth entrepreneurship. The Youth Enterprise Development Fund has allocated KSh 10 billion for youth business loans, with a focus on digital enterprises.

However, challenges remain. Access to capital is still a major barrier, especially for young people without collateral. "Banks don't understand our business models," says 21-year-old tech entrepreneur Mary Wanjiku from Kiambu County.

Education is also adapting to support digital entrepreneurship. Universities and technical colleges are introducing courses in digital marketing, e-commerce, and app development.

The success of these young entrepreneurs is inspiring others. "When I see someone my age succeeding, it gives me confidence that I can do it too," says 19-year-old aspiring entrepreneur David from Eldoret.

The trend is also creating new job opportunities. Digital marketing agencies, web development firms, and e-commerce platforms are hiring young people with digital skills.

However, the digital divide remains a challenge. Rural areas with poor internet connectivity struggle to participate in the digital economy. The government is working to expand broadband infrastructure to underserved areas.

The future looks promising for Kenya's digital entrepreneurs. With the right support and infrastructure, they could become a major driver of economic growth and job creation.

The success of these young entrepreneurs demonstrates the potential of Kenya's youth population. With proper support and opportunities, they could transform the country's economy and create a more prosperous future for all Kenyans.`,
    excerpt: "Exploring how Kenya's Gen Z is building successful digital businesses and transforming the country's entrepreneurial landscape.",
    featuredImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[2],
    category: mockCategories[0],
    tags: ["entrepreneurship", "digital business", "gen z", "kenya", "innovation"],
    publishedAt: "2025-02-25T16:20:00Z",
    readingTime: 5,
    featured: false
  },
  {
    id: "6",
    title: "County Spotlight: The Rise of Tech Hubs in Kisumu County",
    slug: "county-spotlight-tech-hubs-kisumu-county",
    content: `Kisumu County is emerging as a major technology hub in western Kenya, with young entrepreneurs and developers creating innovative solutions for local and global markets. Our investigation reveals how the county is positioning itself as a digital innovation center.

The transformation began in 2018 when the first tech hub, LakeHub, was established in Kisumu City. Since then, the county has attracted significant investment in technology infrastructure and talent development.

"Kisumu has the right combination of factors for tech growth," explains Faith Njeri, an education technology specialist working in the region. "We have a young, educated population, good internet connectivity, and a supportive county government."

The county government has been proactive in supporting the tech ecosystem. Governor Anyang' Nyong'o has allocated KSh 500 million for digital infrastructure development, including fiber optic networks and smart city initiatives.

Local universities are also playing a crucial role. Maseno University and Jaramogi Oginga Odinga University of Science and Technology have introduced programs in computer science, software engineering, and data science.

Young developers from Kisumu are creating solutions for local problems. 25-year-old Sarah Ochieng developed a mobile app that helps farmers track crop diseases and access market prices. "I wanted to solve a problem I saw in my community," she explains.

The success of local tech companies is attracting attention from international investors. Several startups from Kisumu have received funding from venture capital firms and development organizations.

However, challenges remain. Access to capital is still limited, and many young developers struggle to find mentorship and guidance. "We need more experienced tech professionals to mentor young developers," says LakeHub director James Mwangi.

The county is also working to address the gender gap in technology. Programs like Women in Tech Kisumu are encouraging more young women to pursue careers in technology.

The impact extends beyond technology. The growth of the tech sector has created jobs in related industries like hospitality, real estate, and transportation.

The success of Kisumu's tech ecosystem is inspiring other counties to invest in digital infrastructure and talent development. Counties like Nakuru, Eldoret, and Mombasa are following similar models.

The future looks bright for Kisumu's technology sector. With continued investment and support, the county could become a major technology hub in East Africa, creating opportunities for young people and driving economic growth.

The rise of tech hubs in Kisumu demonstrates the potential of county-level innovation and the importance of local leadership in driving economic development.`,
    excerpt: "Exploring how Kisumu County is becoming a major technology hub and creating opportunities for young developers and entrepreneurs.",
    featuredImage: "https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[4],
    category: mockCategories[3],
    tags: ["tech hubs", "kisumu county", "technology", "innovation", "digital economy"],
    publishedAt: "2025-02-20T13:10:00Z",
    readingTime: 6,
    featured: false
  },
  // Additional posts to ensure each category has at least 5 items
  {
    id: "7",
    title: "Letters From Nairobi: A City Growing Between Hope and Hustle",
    slug: "letters-from-nairobi-hope-and-hustle",
    content: `Every dawn in 2025 begins with a soundtrack of hawkers, matatus, and construction drills across Nairobi. Young creatives and hustlers spill into the city from Kayole, Githurai, Rongai, and beyond, stitching together gigs to cover rent for a single-room mabati flat. They share breakfast updates on community WhatsApp groups—who is hiring animators, who needs a photographer, where to find reliable internet for a remote interview.

In between the frenzy are small, tender moments that hold the city together. A boda rider returns a lost phone after tracking its owner for three estates; a group of students in Kibera crowdfund transport for their friend’s first day at university; the Buruburu art scene hosts a pop-up that raises money for flood victims in Budalang'i. The hustle is relentless, but so is the hope that Nairobi can feel gentler when neighbours choose kindness.

By night, the city exhales. Rooftop poetry nights fill Ngara warehouses with vulnerability, and DJs stitch cultural memory into amapiano sets. Nairobi’s youth know the headlines are rarely written for them, so they write their own—blog posts, zines, podcasts, and deliberate acts of care that insist the city is worth staying for.`,
    excerpt: "Dispatches from Nairobi’s youth on balancing hustle, tenderness, and the dream of a liveable city.",
    featuredImage: "https://images.pexels.com/photos/936722/pexels-photo-936722.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[0],
    category: mockCategories[0],
    tags: ["nairobi", "essays", "youth"],
    publishedAt: "2025-02-18T09:00:00Z",
    readingTime: 7,
    featured: true
  },
  {
    id: "8",
    title: "The Quiet Politics of Water in Northern Kenya",
    slug: "quiet-politics-of-water-northern-kenya",
    content: `Marsabit’s youth councils have turned water points into negotiation tables. In 2025, the county counts 19 community dams rehabilitated by youth cooperatives who map water flow using open-source tools and drone imagery. Conflicts that once led to months-long feuds are being resolved by WhatsApp mediators who organise shared schedules, ensuring pastoralists from different communities access boreholes without escalation.

Water remains a political bargaining chip. County budgets are contested every quarter, and the national government’s climate adaptation fund still delays disbursement. Yet, young organisers like Halima Guyo are archiving promises and livestreaming public participation forums, making it harder for leaders to backtrack. Their micro-podcasts—recorded under acacia shade using solar kits—document stories of resilience and demand investment that matches the urgency of a heating north.

The essay tracks these conversations across Marsabit, Isiolo, and Samburu, following caravan routes that now carry both water tanks and legal awareness brochures. Youth discuss how every aquifer unlocked is not just a livelihood issue but a way to keep migration voluntary instead of forced.`,
    excerpt: "How youth-led water boards in Marsabit and Samburu are rewriting resource politics in 2025.",
    featuredImage: "https://images.pexels.com/photos/461194/pexels-photo-461194.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[3],
    category: mockCategories[0],
    tags: ["water", "marsabit", "policy", "climate"],
    publishedAt: "2025-02-12T08:00:00Z",
    readingTime: 6,
    featured: false
  },
  {
    id: "9",
    title: "Dust Roads",
    slug: "dust-roads-short-story",
    content: `Mutiso knows the pulse of Thika Road better than any timetable. His matatu, christened *Ngamia Express*, is wrapped in graffiti of Boniface Mwangi, Lupita Nyong’o, and a verse from E-Sir. On this Monday morning, he is racing the sunrise to deliver a promise—he must reach Roysambu by 7:30am to hand Brenda the sketchbook she forgot on Friday.

Traffic stalls near Allsops, and the passengers groan. Mutiso steps out, directing motorists like a conductor guiding an orchestra. A vendor hands him steaming tea, muttering, “You saved my daughter’s school notebook last week.” When he finally reaches Brenda, she is weeping with relief. The sketches inside are her portfolio for a scholarship interview that could take her to design school in Cape Town.

On the return trip, Mutiso allows the usually chaotic playlist to quiet down. The road hums as he watches Nairobi awaken—a reminder that every ride is more than a fare; it is a choreography of strangers holding each other’s futures in transit.`,
    excerpt: "A matatu conductor discovers how a forgotten sketchbook can reroute a life.",
    featuredImage: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[2],
    category: mockCategories[1],
    tags: ["short story", "nairobi", "matatu"],
    publishedAt: "2025-02-15T10:00:00Z",
    readingTime: 8,
    featured: true
  },
  {
    id: "10",
    title: "Sugarcane Smoke",
    slug: "sugarcane-smoke-short-story",
    content: `In Mumias, the smokestacks came back to life early in 2025, but so did the memories of what the factory once took. Achieng’ and her cousin Biko sneak onto the factory grounds at dusk, weaving through the cutting teams to record oral histories for a school archive project. They search for their grandfather’s name among the rusted plaques of union organisers.

They find an elder tending a small apiary between rows of cane. He recalls the scars from the 1980 strikes and the sweetness of paydays that bought bicycles and school uniforms. As night settles, Achieng’ realises the revival of the factory will only matter if it honours such histories. Her recording ends with laughter as the elder gifts them sugarcane shards, insisting, “Carry this smoke home, but remember who taught you to breathe.”`,
    excerpt: "Two cousins trespass into the revived Mumias factory to archive the workers’ memories.",
    featuredImage: "https://images.pexels.com/photos/167964/pexels-photo-167964.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[4],
    category: mockCategories[1],
    tags: ["short story", "mumias", "heritage"],
    publishedAt: "2025-02-11T10:00:00Z",
    readingTime: 7,
    featured: false
  },
  {
    id: "11",
    title: "Borrowed Umbrellas",
    slug: "borrowed-umbrellas-short-story",
    content: `When the April rains batter the Nairobi CBD, Mara ducks into a bookshop on Moi Avenue with nothing but a sketchpad. A stranger—Kamau, an accountant—offers to share his umbrella for the walk to the bus stage. They talk about everything except the weight they both carry: Mara’s fear of showing her art to the world, Kamau’s secret plan to quit auditing and open a vinyl bar in Dagoretti.

After three shared rides and several rainstorms, the umbrella becomes a ritual. The story crescendos when Mara paints the umbrella on a wall in the GoDown Arts Centre, this time with a neon sign that reads, “Borrowed safety should still feel like home.” Kamau finally invites her to see the half-renovated bar, and together they imagine the playlists that will bless strangers seeking shelter.`,
    excerpt: "A shared umbrella becomes the start of an improbable partnership in Nairobi.",
    featuredImage: "https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[0],
    category: mockCategories[1],
    tags: ["short story", "rain", "nairobi"],
    publishedAt: "2025-02-09T10:00:00Z",
    readingTime: 6,
    featured: false
  },
  {
    id: "12",
    title: "A Prayer for Westlands",
    slug: "a-prayer-for-westlands-short-story",
    content: `David, a night guard at a new tech campus in Westlands, keeps a notebook of prayers for strangers. He notes the license plates of ride-hailing drivers who fall asleep in the parking lot, the badge numbers of engineers who forget to eat, and the names of delivery riders who leave with empty bags because orders are cancelled after midnight.

One night he meets Aroji, a janitor pursuing a cybersecurity diploma online. Their conversations become quiet sermons on dignity, safety, and the cost of belonging in a city that rewards speed over care. When a suspicious blackout hits the complex, David and Aroji’s vigilance prevents a data breach. The gratitude from management is minimal, but the community of workers crown them guardians of the campus dawn.`,
    excerpt: "Two night-shift workers guard more than a building—they guard each other.",
    featuredImage: "https://images.pexels.com/photos/220444/pexels-photo-220444.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[1],
    category: mockCategories[1],
    tags: ["short story", "westlands", "night shift"],
    publishedAt: "2025-02-07T10:00:00Z",
    readingTime: 6,
    featured: false
  },
  {
    id: "13",
    title: "The Boda Rider Who Read Neruda",
    slug: "boda-rider-who-read-neruda-short-story",
    content: `Otis ferries parcels across Kisumu by day and delivers poetry by night. In 2025, he starts slipping handwritten Neruda verses into courier envelopes, curious whether anyone notices. When a law student leaves a reply thanking him for “returning softness to deadline days,” Otis begins a city-wide chain of anonymous poems.

Soon, boda riders meet weekly at Impala Park to exchange translated verses in Dholuo, Kiswahili, and Sheng. Their poetry club funds a library-on-wheels that now visits schools from Nyalenda to Ahero. Otis finally signs his name under a poem about Lake Victoria’s moonlit tides, accepting that joy can be the loudest rebellion against a demanding gig economy.`,
    excerpt: "In Kisumu, a courier’s secret poetry project grows into a city-wide book movement.",
    featuredImage: "https://images.pexels.com/photos/3771830/pexels-photo-3771830.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[2],
    category: mockCategories[1],
    tags: ["short story", "kisumu", "poetry"],
    publishedAt: "2025-02-05T10:00:00Z",
    readingTime: 5,
    featured: false
  },
  {
    id: "14",
    title: "When the City Sleeps",
    slug: "when-the-city-sleeps-poem",
    content: `Neon spills on wet tarmac,
matatu horns fade to lullaby hums,
hawkers fold dreams into gunias,
and the city exhales.

We count constellations through blackout windows,
trace our names on fogged glass,
trade secrets with security lights.
When Nairobi sleeps,
we stitch soft dawns
for anyone too weary to dream alone.`,
    excerpt: "Free verse on neon nights and the tenderness found after midnight.",
    featuredImage: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[3],
    category: mockCategories[2],
    tags: ["poetry", "city"],
    publishedAt: "2025-02-14T07:00:00Z",
    readingTime: 2,
    featured: true
  },
  {
    id: "15",
    title: "Ode to Tsavo",
    slug: "ode-to-tsavo-poem",
    content: `Red earth clings to dawn,
trains cut slow hymns across savanna,
elephants etch history into dust.

We whisper prayers into baobab hollows,
carry heat-waves in enamel cups,
count the heartbeat of the park by hoofprints.
Tsavo, teach our tired feet to remember
the patience of migrating giants.`,
    excerpt: "A pastoral ode to Tsavo’s heat, elephants, and patient horizons.",
    featuredImage: "https://images.pexels.com/photos/45201/elephant-carcass-animals-ivory-45201.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[4],
    category: mockCategories[2],
    tags: ["poetry", "nature"],
    publishedAt: "2025-02-13T07:30:00Z",
    readingTime: 2,
    featured: false
  },
  {
    id: "16",
    title: "Mother Tongue",
    slug: "mother-tongue-poem",
    content: `Tongues we store in pockets,
to swap when matatus cross county lines.
I taste home in every vowel,
in the lullabies hidden between Kamba clicks and Gikuyu whispers.

Call me by all my names,
let them gather like elders around a fire,
let them bless the child who refuses to forget
the language that held her first tears.`,
    excerpt: "A poem about belonging, language, and the intimacy of being named.",
    featuredImage: "https://images.pexels.com/photos/374756/pexels-photo-374756.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[0],
    category: mockCategories[2],
    tags: ["poetry", "identity"],
    publishedAt: "2025-02-11T07:30:00Z",
    readingTime: 2,
    featured: false
  },
  {
    id: "17",
    title: "The Weight of a Name",
    slug: "the-weight-of-a-name-poem",
    content: `Names are gourds filled with histories,
heavy with expectation, fragrant with memory.
We inherit syllables like land—
to till, to protect, to question.

If I rename myself,
will my grandmother’s prayers still find me?
I carry their hope like a drumbeat,
steady, relentless, refusing silence.`,
    excerpt: "Lines on inheritance, expectation, and the sacredness of names.",
    featuredImage: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[1],
    category: mockCategories[2],
    tags: ["poetry", "family"],
    publishedAt: "2025-02-10T07:30:00Z",
    readingTime: 2,
    featured: false
  },
  {
    id: "18",
    title: "The Price of Kerosene",
    slug: "price-of-kerosene-real-life",
    content: `Grace Wambui’s nights begin at 9pm when she clocks in at a Juja cold-storage facility. By morning she returns to a one-room house in Witeithie where her twins wait for breakfast. In 2025, the price of kerosene has doubled, forcing her to improvise with a solar cooker donated by a neighbourhood women’s collective.

Grace keeps meticulous spreadsheets tracking every shilling—school lunch programs, chama contributions, a loan for her daughter’s coding bootcamp. The story follows her through night shifts, savings meetings, and the quiet pride she feels when the twins present a science project powered by recycled batteries. Her resilience is not framed as heroism but as a daily negotiation with systems that should be doing more.`,
    excerpt: "A Juja mother budgets hope alongside soaring fuel prices.",
    featuredImage: "https://images.pexels.com/photos/410999/pexels-photo-410999.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[2],
    category: mockCategories[3],
    tags: ["real life", "economy", "family"],
    publishedAt: "2025-02-16T12:00:00Z",
    readingTime: 5,
    featured: false
  },
  {
    id: "19",
    title: "Chokoraa, Not Invisible",
    slug: "chokoraa-not-invisible-real-life",
    content: `2025 finds Nairobi’s street families building their own safety nets. This feature spends a week with the Jacaranda Street Choir, a group of formerly homeless teens who busk outside the National Archives to fund night classes. The choir partners with lawyers offering pro-bono assistance to youths arrested for loitering, documenting abuses and challenging city by-laws.

We follow Amina, a 19-year-old spoken word artist who coordinates meal rotations through a cashless kitty. She leads night walks to keep younger children safe from predatory gangs and to direct them to a new drop-in centre under the Globe Flyover. The piece highlights the community’s advocacy for dignified sanitation facilities and the national conversation their petitions have sparked.`,
    excerpt: "Street families in Nairobi organise choirs, legal aid, and safety patrols to reclaim dignity.",
    featuredImage: "https://images.pexels.com/photos/373289/pexels-photo-373289.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[3],
    category: mockCategories[3],
    tags: ["real life", "nairobi", "community"],
    publishedAt: "2025-02-15T12:30:00Z",
    readingTime: 6,
    featured: true
  },
  {
    id: "20",
    title: "Football on Red Soil",
    slug: "football-on-red-soil-real-life",
    content: `On the red soil pitches of Embu, the Mavuria Queens under-17 squad trains barefoot at sunrise. This longform narrative chronicles their journey to the national youth finals in 2025, coached by a former Harambee Starlets defender who returned home after an ACL injury.

The team hustles for uniforms via a mango-farming cooperative, livestreams matches on TikTok to attract sponsors, and turns an abandoned tea buying centre into a clubhouse. Their success forces county officials to finally grade the pitch and install floodlights. Beyond sport, the Queens mentor primary school girls on menstrual health and financial literacy, demonstrating how community-run clubs can anchor rural economies.`,
    excerpt: "An Embu girls’ team transforms a dusty field into a powerhouse of community pride.",
    featuredImage: "https://images.pexels.com/photos/46798/the-ball-the-game-soccer-46798.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: mockAuthors[4],
    category: mockCategories[3],
    tags: ["real life", "sports", "girls"],
    publishedAt: "2025-02-13T12:00:00Z",
    readingTime: 6,
    featured: false
  }
];

export const featuredPosts = mockPosts.filter(post => post.featured);
export const recentPosts = [...mockPosts].sort((a, b) => 
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);