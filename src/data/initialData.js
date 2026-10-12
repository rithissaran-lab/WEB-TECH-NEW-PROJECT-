// ConnectHub Initial Mock Dataset
// Realistic demo data for social media interactions

export const CURRENT_DEMO_USER = {
  id: 'usr_me',
  username: 'alexrivera',
  name: 'Alex Rivera',
  title: 'Senior Product Designer & Photographer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
  coverPhoto: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80',
  bio: 'Crafting digital experiences & capturing urban moments 🌆 | React & Figma enthusiast | Based in San Francisco 🌉',
  website: 'https://alexrivera.design',
  location: 'San Francisco, CA',
  joinedDate: 'Joined March 2023',
  followersCount: 1420,
  followingCount: 382,
  postsCount: 18,
  verified: true,
};

export const SAMPLE_USERS = [
  {
    id: 'usr_1',
    username: 'sarah_j',
    name: 'Sarah Jenkins',
    title: 'Architectural Photographer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Chasing brutalist geometries and golden hour reflections 📐 | Leica M11 | Author of "Lines & Shadows"',
    website: 'https://sarahjenkins.photo',
    location: 'Berlin, Germany',
    joinedDate: 'Joined January 2023',
    followersCount: 4890,
    followingCount: 215,
    postsCount: 34,
    verified: true,
    isFollowing: true,
  },
  {
    id: 'usr_2',
    username: 'marcus_dev',
    name: 'Marcus Chen',
    title: 'Full Stack Engineer & Tech Speaker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Building open-source tools & AI interfaces ⚡ | Coffee obsessed ☕ | Speaking at JSConf Global',
    website: 'https://github.com/marcuschen',
    location: 'Seattle, WA',
    joinedDate: 'Joined June 2022',
    followersCount: 12400,
    followingCount: 410,
    postsCount: 52,
    verified: true,
    isFollowing: false,
  },
  {
    id: 'usr_3',
    username: 'elena_travels',
    name: 'Elena Rostova',
    title: 'Adventure Filmmaker',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Climbing peaks and documenting remote cultures around the globe 🏔️ | 43 countries & counting ✈️',
    website: 'https://elenarostova.vlog',
    location: 'Zurich, Switzerland',
    joinedDate: 'Joined August 2023',
    followersCount: 8930,
    followingCount: 198,
    postsCount: 41,
    verified: true,
    isFollowing: true,
  },
  {
    id: 'usr_4',
    username: 'david_kim',
    name: 'David Kim',
    title: 'Culinary Artist & Food Stylist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Fermentation geek, sourdough baker, and restaurant pop-up host 🍜 | Recipes on Substack',
    website: 'https://kimkitchen.substack.com',
    location: 'Seoul & NYC',
    joinedDate: 'Joined November 2023',
    followersCount: 3120,
    followingCount: 289,
    postsCount: 29,
    verified: false,
    isFollowing: false,
  },
  {
    id: 'usr_5',
    username: 'priya_designs',
    name: 'Priya Sharma',
    title: 'Brand Strategist & 3D Artist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Exploring generative art, bold typography, and cyberpunk palettes 🎨 | Blender + Spline mentor',
    website: 'https://priyasharma.studio',
    location: 'London, UK',
    joinedDate: 'Joined February 2024',
    followersCount: 6540,
    followingCount: 310,
    postsCount: 38,
    verified: true,
    isFollowing: true,
  },
  {
    id: 'usr_6',
    username: 'liam_sound',
    name: 'Liam Vance',
    title: 'Ambient Music Producer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&h=400&q=80',
    bio: 'Synthesizers, tape loops, and field recordings from rainy forests 🎧 | New EP "Solitude" out now',
    website: 'https://liamvance.bandcamp.com',
    location: 'Vancouver, Canada',
    joinedDate: 'Joined April 2024',
    followersCount: 2190,
    followingCount: 140,
    postsCount: 15,
    verified: false,
    isFollowing: false,
  }
];

export const INITIAL_STORIES = [
  {
    id: 'story_me',
    author: CURRENT_DEMO_USER,
    isUser: true,
    hasUnseen: false,
    stories: [
      {
        id: 's_0',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Sunrise over Dubai skyline ✨ What a morning view!',
        timeAgo: '2h ago',
      }
    ]
  },
  {
    id: 'story_1',
    author: SAMPLE_USERS[0], // Sarah Jenkins
    hasUnseen: true,
    stories: [
      {
        id: 's_1_1',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Reflections on glass facade in Frankfurt 🏢 Glass & steel harmony',
        timeAgo: '4h ago',
      },
      {
        id: 's_1_2',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Minimalist studio lighting for today’s photoshoot 💡',
        timeAgo: '3h ago',
      }
    ]
  },
  {
    id: 'story_2',
    author: SAMPLE_USERS[1], // Marcus Chen
    hasUnseen: true,
    stories: [
      {
        id: 's_2_1',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Late night coding session 💻 Refactoring the state engine!',
        timeAgo: '5h ago',
      }
    ]
  },
  {
    id: 'story_3',
    author: SAMPLE_USERS[2], // Elena Rostova
    hasUnseen: true,
    stories: [
      {
        id: 's_3_1',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Yosemite valley at twilight 🌲 The air here is pure magic.',
        timeAgo: '6h ago',
      },
      {
        id: 's_3_2',
        image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Misty pine ridge morning hike 🥾',
        timeAgo: '1h ago',
      }
    ]
  },
  {
    id: 'story_4',
    author: SAMPLE_USERS[4], // Priya Sharma
    hasUnseen: true,
    stories: [
      {
        id: 's_4_1',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'New 3D fluid render study in Blender 🟣 Loving this iridescent flow!',
        timeAgo: '8h ago',
      }
    ]
  },
  {
    id: 'story_5',
    author: SAMPLE_USERS[3], // David Kim
    hasUnseen: false,
    stories: [
      {
        id: 's_5_1',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&h=1200&q=80',
        caption: 'Fresh grain bowl with avocado & tahini drizzle 🥗',
        timeAgo: '11h ago',
      }
    ]
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post_1',
    author: {
      id: SAMPLE_USERS[0].id,
      username: SAMPLE_USERS[0].username,
      name: SAMPLE_USERS[0].name,
      avatar: SAMPLE_USERS[0].avatar,
      verified: true,
    },
    content: 'Brutalist architecture in raw morning sunlight. The way natural light carves shadows across concrete always inspires my design perspective. Which angle do you prefer? 🏛️📐',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1080&h=800&q=85',
    location: 'Berlin Kulturforum, Germany',
    createdAt: '2 hours ago',
    timestamp: Date.now() - 7200000,
    tags: ['#architecture', '#minimalism', '#photography', '#urban'],
    likes: ['alexrivera', 'marcus_dev', 'priya_designs', 'david_kim'],
    comments: [
      {
        id: 'c_1_1',
        author: {
          username: 'alexrivera',
          name: 'Alex Rivera',
          avatar: CURRENT_DEMO_USER.avatar,
        },
        text: 'The geometric contrast here is incredible Sarah! The shadow falloff is so clean.',
        createdAt: '1 hour ago',
        timestamp: Date.now() - 3600000,
      },
      {
        id: 'c_1_2',
        author: {
          username: 'marcus_dev',
          name: 'Marcus Chen',
          avatar: SAMPLE_USERS[1].avatar,
        },
        text: 'Looks like a futuristic render! Incredible framing.',
        createdAt: '30 mins ago',
        timestamp: Date.now() - 1800000,
      }
    ],
    category: 'Architecture'
  },
  {
    id: 'post_2',
    author: {
      id: CURRENT_DEMO_USER.id,
      username: CURRENT_DEMO_USER.username,
      name: CURRENT_DEMO_USER.name,
      avatar: CURRENT_DEMO_USER.avatar,
      verified: true,
    },
    content: 'Just deployed the new design system component library! Clean tokens, glassmorphism layers, and responsive micro-interactions. Social media should feel fast, responsive, and delightful to use. What do you all think? 🚀✨',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1080&h=720&q=85',
    location: 'Design Studio • San Francisco',
    createdAt: '4 hours ago',
    timestamp: Date.now() - 14400000,
    tags: ['#webdev', '#designsystems', '#uiux', '#frontend'],
    likes: ['sarah_j', 'elena_travels', 'priya_designs'],
    comments: [
      {
        id: 'c_2_1',
        author: {
          username: 'priya_designs',
          name: 'Priya Sharma',
          avatar: SAMPLE_USERS[4].avatar,
        },
        text: 'The color harmony and typography hierarchy is pristine Alex! Love the purple-blue gradient accents.',
        createdAt: '3 hours ago',
        timestamp: Date.now() - 10800000,
      }
    ],
    category: 'Tech'
  },
  {
    id: 'post_3',
    author: {
      id: SAMPLE_USERS[2].id,
      username: SAMPLE_USERS[2].username,
      name: SAMPLE_USERS[2].name,
      avatar: SAMPLE_USERS[2].avatar,
      verified: true,
    },
    content: 'Spent the weekend camped at 8,000 feet in the Swiss Alps. Waking up above the cloud inversion is a reminder of how vast and serene the earth truly is. Breathe it in. 🏔️❄️✨',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&h=750&q=85',
    location: 'Zermatt, Switzerland',
    createdAt: '6 hours ago',
    timestamp: Date.now() - 21600000,
    tags: ['#mountains', '#wanderlust', '#swissalps', '#nature'],
    likes: ['alexrivera', 'sarah_j', 'david_kim', 'liam_sound', 'marcus_dev'],
    comments: [
      {
        id: 'c_3_1',
        author: {
          username: 'sarah_j',
          name: 'Sarah Jenkins',
          avatar: SAMPLE_USERS[0].avatar,
        },
        text: 'That golden morning light on the peaks is breathtaking Elena!',
        createdAt: '5 hours ago',
        timestamp: Date.now() - 18000000,
      },
      {
        id: 'c_3_2',
        author: {
          username: 'liam_sound',
          name: 'Liam Vance',
          avatar: SAMPLE_USERS[5].avatar,
        },
        text: 'I can hear the quiet stillness through this photograph.',
        createdAt: '4 hours ago',
        timestamp: Date.now() - 14400000,
      }
    ],
    category: 'Travel'
  },
  {
    id: 'post_4',
    author: {
      id: SAMPLE_USERS[4].id,
      username: SAMPLE_USERS[4].username,
      name: SAMPLE_USERS[4].name,
      avatar: SAMPLE_USERS[4].avatar,
      verified: true,
    },
    content: 'Experimenting with procedural iridescent materials and chromatic dispersion in 3D. When light interacts with curved glass surfaces, pure serendipity occurs. 🌈🔮',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1080&h=800&q=85',
    location: 'Digital Realm • London',
    createdAt: '9 hours ago',
    timestamp: Date.now() - 32400000,
    tags: ['#3dart', '#blender', '#generative', '#digitalart'],
    likes: ['alexrivera', 'marcus_dev', 'elena_travels'],
    comments: [
      {
        id: 'c_4_1',
        author: {
          username: 'alexrivera',
          name: 'Alex Rivera',
          avatar: CURRENT_DEMO_USER.avatar,
        },
        text: 'This texture shader is wild! Are you rendering this in Cycles or Octane?',
        createdAt: '7 hours ago',
        timestamp: Date.now() - 25200000,
      }
    ],
    category: 'Design'
  },
  {
    id: 'post_5',
    author: {
      id: SAMPLE_USERS[3].id,
      username: SAMPLE_USERS[3].username,
      name: SAMPLE_USERS[3].name,
      avatar: SAMPLE_USERS[3].avatar,
      verified: false,
    },
    content: 'Hand-pulled artisanal ramen with 18-hour slow simmered tonkotsu broth, charred chashu, and ajitsuke tamago egg. Cooking is chemistry, patience, and love. 🍜🥢🔥',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1080&h=800&q=85',
    location: 'East Village, New York',
    createdAt: '14 hours ago',
    timestamp: Date.now() - 50400000,
    tags: ['#ramen', '#foodie', '#culinaryart', '#nyceats'],
    likes: ['sarah_j', 'elena_travels', 'marcus_dev'],
    comments: [
      {
        id: 'c_5_1',
        author: {
          username: 'marcus_dev',
          name: 'Marcus Chen',
          avatar: SAMPLE_USERS[1].avatar,
        },
        text: 'Booking a flight to NYC solely for a bowl of this.',
        createdAt: '12 hours ago',
        timestamp: Date.now() - 43200000,
      }
    ],
    category: 'Food'
  },
  {
    id: 'post_6',
    author: {
      id: SAMPLE_USERS[1].id,
      username: SAMPLE_USERS[1].username,
      name: SAMPLE_USERS[1].name,
      avatar: SAMPLE_USERS[1].avatar,
      verified: true,
    },
    content: 'Productivity tip: keep your workspace minimalist. Mechanical keyboard, single high-refresh display, plants, and natural light. Less clutter = more flow state. What is your essential desk setup item? ⌨️🌿🖥️',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1080&h=720&q=85',
    location: 'Seattle Tech Hub',
    createdAt: '1 day ago',
    timestamp: Date.now() - 86400000,
    tags: ['#workspace', '#developer', '#productivity', '#minimaldesk'],
    likes: ['alexrivera', 'sarah_j', 'priya_designs'],
    comments: [
      {
        id: 'c_6_1',
        author: {
          username: 'alexrivera',
          name: 'Alex Rivera',
          avatar: CURRENT_DEMO_USER.avatar,
        },
        text: 'A good monitor light bar and warm coffee mug are non-negotiable!',
        createdAt: '22 hours ago',
        timestamp: Date.now() - 79200000,
      }
    ],
    category: 'Tech'
  }
];

export const INITIAL_SAVED_POST_IDS = ['post_1', 'post_3'];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'like',
    actor: SAMPLE_USERS[0], // Sarah Jenkins
    content: 'liked your post: "Just deployed the new design system component library!"',
    postId: 'post_2',
    postPreview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&h=120&q=80',
    timeAgo: '10m ago',
    read: false,
  },
  {
    id: 'notif_2',
    type: 'comment',
    actor: SAMPLE_USERS[4], // Priya Sharma
    content: 'commented: "The color harmony and typography hierarchy is pristine Alex!"',
    postId: 'post_2',
    postPreview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&h=120&q=80',
    timeAgo: '45m ago',
    read: false,
  },
  {
    id: 'notif_3',
    type: 'follow',
    actor: SAMPLE_USERS[1], // Marcus Chen
    content: 'started following you.',
    postId: null,
    timeAgo: '2h ago',
    read: false,
  },
  {
    id: 'notif_4',
    type: 'mention',
    actor: SAMPLE_USERS[0], // Sarah Jenkins
    content: 'mentioned you in a comment on their post.',
    postId: 'post_1',
    postPreview: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=120&h=120&q=80',
    timeAgo: '1d ago',
    read: true,
  },
  {
    id: 'notif_5',
    type: 'like',
    actor: SAMPLE_USERS[2], // Elena Rostova
    content: 'liked your comment on their photo from Zermatt.',
    postId: 'post_3',
    postPreview: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=120&h=120&q=80',
    timeAgo: '2d ago',
    read: true,
  }
];

export const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&h=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80',
];

export const PRESET_POST_IMAGES = [
  {
    name: 'Neon Cyberpunk',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&h=800&q=85',
  },
  {
    name: 'Sunset Coastline',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1080&h=800&q=85',
  },
  {
    name: 'Coffee & Books',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1080&h=800&q=85',
  },
  {
    name: 'Night Cityscape',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1080&h=800&q=85',
  },
  {
    name: 'Modern Art Gallery',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&h=800&q=85',
  },
  {
    name: 'Alpine Forest Road',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1080&h=800&q=85',
  }
];
