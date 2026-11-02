// Seed content for the project. Edit the live content at /editor or in site-content.json.
export const profile = {
  name: '刘义豪', brand: 'Will Liu', role: 'Video Editor\n& Copywriter', location: 'Based in Beijing',
  faceImage: 'images/face.svg',
  agency: '', agencyUrl: '',
  title: ['全流程', '视频剪辑', '脚本', '视频策划', '影视宣传'],
  intro: '专注于电影、电视剧以及舞台剧的视频宣传<br>剪辑与策划。在不同项目的官方抖音、快手<br>以及视频号等平台累计产出300余条视频，类型<br>囊括剧情二创/混剪、幕后花絮、路演现场、<br>动态海报、角色阵容、微特辑、艺人合作等。',
  statement: '欢迎来到\n刘义豪的作品集\n下滑、查阅更多...', email: 'hi.bleibtgleich@gmail.com',
  emailSubject: '[Project Inquiry] Hello, bleibtgleich!',
  phone: '16630429528', wechatId: 'Will_liu97', resumeUrl: '',
  socials: [
    { label: 'LinkedIn', text: 'linkedin.com/in/bleibtgleich/', url: 'https://linkedin.com/in/bleibtgleich/' },
    { label: 'Behance', text: 'behance.net/bleibtgleich', url: 'https://behance.net/bleibtgleich' },
    { label: 'Instagram', text: 'instagram.com/bleibtgleich/', url: 'https://instagram.com/bleibtgleich/' },
  ],
  manifesto: '在每一帧素材中\n寻找创意的出口',
  copyright: '‘26 © All Right Reserved', signoff: 'made w/ hate',
  workQuote: 'Crafted through irritation, perfectionism, and the constant feeling that it still could be better.',
};

export const awards = [
  {
    "year": "喜剧/院线/粤语",
    "project": "夜王",
    "items": [
      [
        "剧情二创",
        "趣味/职场",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6ac1697a3b58576098d80e73_award_certificate-bleibtgleich_26-awwwards-sotd.avif",
        "uploads/asset-2fc99de6.mp4"
      ],
      [
        "剧情二创",
        "趣味/情感",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6ac1699e384ea69d8f5264f3_award_certificate-bleibtgleich_26-awwwards-dev.avif",
        "uploads/asset-6ba2bcf9.mp4"
      ]
    ]
  },
  {
    "year": "‘25",
    "project": "bleibtgleich'25",
    "items": [
      [
        "CSS Winner",
        "Site of the Day",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a5fbd21e05930273ded153f_award-certificate-awwwards-sotd.avif",
        ""
      ],
      [
        "GSAP",
        "Site of the Day",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6ac169ae5f590dd7a86692a1_award_certificate-bleibtgleich_26-gsap-sotd.avif",
        ""
      ],
      [
        "Awwwards",
        "Portfolio Honors",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a5fbd2e75a580cbbca15946_award-certificate-awwwards-portfolio-honor.avif",
        ""
      ]
    ]
  },
  {
    "year": "‘24",
    "project": "insta.gallery",
    "items": [
      [
        "Awwwards",
        "Typography Honor",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a5fbeb47d8da1d658ca6bd5_instagallery-award_certificate_awwwards-typography_honor.avif",
        ""
      ],
      [
        "Awwwards",
        "Typography Honor",
        "https://cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a5fbeb47d8da1d658ca6bd5_instagallery-award_certificate_awwwards-typography_honor.avif",
        ""
      ]
    ]
  },
  {
    "year": "‘23",
    "project": "bleibtgleich'23",
    "items": [
      [
        "Behance",
        "BR",
        null,
        ""
      ],
      [
        "Behance",
        "UI",
        null,
        ""
      ]
    ]
  },
  {
    "year": "‘23",
    "project": "bleibtgleich'23",
    "items": [
      [
        "Behance",
        "BR",
        null,
        ""
      ]
    ]
  },
  {
    "year": "‘23",
    "project": "bleibtgleich'23",
    "items": [
      [
        "Behance",
        "BR",
        null,
        ""
      ]
    ]
  },
  {
    "year": "‘23",
    "project": "bleibtgleich'23",
    "items": [
      [
        "Behance",
        "BR",
        null,
        ""
      ]
    ]
  },
  {
    "year": "‘23",
    "project": "bleibtgleich'23",
    "items": [
      [
        "Behance",
        "BR",
        null,
        ""
      ]
    ]
  }
];

// Replace each image value with the path of an uploaded file in /public.
export const projects = [
  { slug:'velor-app', kind:'Case', title:'Velor Dating App', services:['UX/UI Design'], info:'Velor Dating is a dual-mode dating app that adapts to everything from traditional dating to niche relationship preferences through Angel and Demon experiences.', image:'images/velor.svg', tone:'rose' },
  { slug:'bleibtgleich25', kind:'Case', title:"bleibtgleich'25", services:['Development','UX/UI Design'], info:"refined by obsession, driven by hate. bleibtgleich.'25.", image:'images/bleibtgleich25.svg', tone:'lime', awards:[['CSS Winner','Site of the Day'],['GSAP','Site of the Day'],['Awwwards','Portfolio Honors'],['Awwwards','Developer Award'],['Awwwards','Site of the Day'],['CSS Design Awards','WOTD']] },
  { slug:'jds', kind:'Case', title:'JDS', services:['UX/UI Design'], info:'Website concept for a landscape designer, showcasing outdoor spaces through an elegant and immersive digital experience.', image:'uploads/case-003-midang.jpeg', tone:'green' },
  { slug:'nabil-issa', kind:'Case', title:'Nabil Issa', services:['Development','UX/UI Design'], info:'Portfolio website concept for architect Nabil Issa, highlighting projects with timeless, architectural aesthetics.', image:'images/nabil-issa.svg', tone:'sand' },
  { slug:'grabl-app', kind:'Case', title:'Grabl App', services:['Development','UX/UI Design'], info:'Application design for a Windows productivity tool built around seamless drag-and-drop workflows.', image:'images/grabl-app.svg', tone:'blue' },
  { slug:'mkaan', kind:'Case', title:'Mkaan', services:['UX/UI Design'], info:'Mkaan builds luxury real estate in Dubai. The website holds the same standard: measured, elegant, confident enough to let the work talk.', image:'images/mkaan.svg', tone:'gold' },
  { slug:'durak-concept', kind:'Shot', title:'Durak Miniapp', services:['UX/UI Design'], info:'Concept design for a Telegram Mini App bringing the classic card game Durak into a fast, social multiplayer experience.', image:'images/durak.svg', tone:'red' },
  { slug:'metrics-over-aesthetics', kind:'Shot', title:'Metrics over aesthetics', services:['UX/UI Design'], info:'This is a story about how, in 1991, economy replaced aesthetics — and Arial eclipsed Helvetica in Windows. In this poster, I expressed it through the following metaphor: “…through the window, light fell on Arial, eclipsing Helvetica.”', image:'images/metrics.svg', tone:'gray' },
];

export const experiments = [
  { title:'Quiet forms', image:'images/experiment-1.svg' }, { title:'Analog / digital', image:'images/experiment-2.svg' },
  { title:'Type study 01', image:'images/experiment-3.svg' }, { title:'Fragments', image:'images/experiment-4.svg' },
  { title:'Get in touch', image:'images/experiment-5.svg' }, { title:'Motion study', image:'images/experiment-6.svg' },
];
