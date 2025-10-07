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
  {
    id: "1",
    name: "Youth Affairs",
    slug: "youth-affairs",
    description: "Current trends, challenges, and opportunities affecting Kenyan youth across different counties",
    color: "#2E7D8A",
    postsCount: 45
  },
  {
    id: "2",
    name: "County News",
    slug: "county-news",
    description: "Local news and developments from various Kenyan counties, focusing on youth impact",
    color: "#FF8F00",
    postsCount: 32
  },
  {
    id: "3",
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Mental health, sexual health, drug abuse, and wellness topics relevant to Kenyan youth",
    color: "#FF6B6B",
    postsCount: 28
  },
  {
    id: "4",
    name: "Education & Tech",
    slug: "education-tech",
    description: "Digital learning, education technology, and career development for young Kenyans",
    color: "#8E24AA",
    postsCount: 67
  },
  {
    id: "5",
    name: "Social Issues",
    slug: "social-issues",
    description: "Investigative reports on social challenges affecting Kenyan communities",
    color: "#43A047",
    postsCount: 19
  },
  {
    id: "6",
    name: "Lifestyle & Culture",
    slug: "lifestyle-culture",
    description: "Gen Z lifestyle, cultural trends, and social media influences in Kenya",
    color: "#E91E63",
    postsCount: 23
  },
  {
    id: "7",
    name: "Entrepreneurship",
    slug: "entrepreneurship",
    description: "Youth entrepreneurship, digital business, and economic opportunities in Kenya",
    color: "#9C27B0",
    postsCount: 15
  },
  {
    id: "8",
    name: "Investigative Reports",
    slug: "investigative-reports",
    description: "In-depth investigations into critical issues affecting Kenyan youth and communities",
    color: "#3F51B5",
    postsCount: 12
  }
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
    publishedAt: "2024-01-15T10:00:00Z",
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
    publishedAt: "2024-01-12T14:30:00Z",
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
    category: mockCategories[2],
    tags: ["sex work", "nairobi", "public health", "underground economy"],
    publishedAt: "2024-01-10T09:15:00Z",
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
    publishedAt: "2024-01-08T11:45:00Z",
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
    category: mockCategories[6],
    tags: ["entrepreneurship", "digital business", "gen z", "kenya", "innovation"],
    publishedAt: "2024-01-05T16:20:00Z",
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
    category: mockCategories[1],
    tags: ["tech hubs", "kisumu county", "technology", "innovation", "digital economy"],
    publishedAt: "2024-01-03T13:10:00Z",
    readingTime: 6,
    featured: false
  }
];

export const featuredPosts = mockPosts.filter(post => post.featured);
export const recentPosts = [...mockPosts].sort((a, b) => 
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);