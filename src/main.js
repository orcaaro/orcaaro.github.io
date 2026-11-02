import * as defaults from './content.js';

const app = document.querySelector('#app');
let { profile, projects, awards, experiments } = defaults;
const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const introLines = (html='') => String(html).split(/<br\s*\/?>/i).filter(t=>t.trim()).map(t=>`<span class="intro-line">${t}</span>`).join('');
const BASE = new URL(document.baseURI).pathname.replace(/\/$/, '');
const path = () => { let p = location.pathname; if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length); return p.replace(/\/$/, '') || '/'; };
const href = p => (p === '/' ? './' : String(p).replace(/^\//, ''));
const slugPath = slug => `/works/${slug}`;
const socialList = () => Array.isArray(profile.socials) ? profile.socials.filter(s=>s&&typeof s.url==='string'&&typeof s.text==='string') : [];
const social = () => socialList().map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.text)}</a>`).join('');
function footerContactLinks(){
  const phone=esc(profile.phone||'16630429528'),wechat=esc(profile.wechatId||'Will_liu97'),resume=esc(profile.resumeUrl||'#');
  const phoneIcon='<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="11" fill="#111"/><path d="M7.2 5.8c-.5 0-.9.4-1 1-.2 2.5 1.1 5.4 3.5 7.8s5.3 3.7 7.8 3.5c.6 0 1-.5 1-1v-2.4c0-.5-.3-.9-.8-1l-2.5-.5c-.4-.1-.8 0-1 .3l-.8 1a12 12 0 0 1-4.4-4.4l1-.8c.3-.3.4-.7.3-1l-.5-2.5c-.1-.5-.5-.8-1-.8H7.2Z" fill="#fff"/></svg>';
  const wechatIcon='<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path fill="#111" d="M11.2 3C6.1 3 2 6.2 2 10.1c0 2.1 1.2 4 3.2 5.3l-.8 2.7 3.5-1.6c.9.2 1.8.4 2.8.4 5.1 0 9.2-2.9 9.2-6.7S16.3 3 11.2 3Z"/><path fill="#fff" d="M7 8.2a1 1 0 1 0 0 .01Zm8.1 0a1 1 0 1 0 0 .01Z"/><path fill="#111" d="M16.1 12.4c-3.2 0-5.8 2-5.8 4.5s2.6 4.4 5.8 4.4c.7 0 1.3-.1 1.9-.3l2.7 1-.6-2.1c1.1-.8 1.8-1.9 1.8-3.1 0-2.4-2.6-4.4-5.8-4.4Z"/><path fill="#fff" d="M14.2 16.4a.8.8 0 1 0 0 .01Zm4 0a.8.8 0 1 0 0 .01Z"/></svg>';
  const folderIcon='<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path fill="#111" d="M2.5 5.5c0-1.1.9-2 2-2h4.6c.6 0 1.2.3 1.6.8l1 1.4h7.8c1.1 0 2 .9 2 2v9.8c0 1.1-.9 2-2 2h-15c-1.1 0-2-.9-2-2V5.5Z"/><path fill="#fff" d="M2.5 9.2h19v1.6h-19z"/></svg>';
  return '<a class="footer-contact-link" href="tel:'+phone+'">'+phoneIcon+'<span>'+phone+'</span></a><a class="footer-contact-link" href="#" data-copy-wechat aria-label="复制微信号 '+wechat+'">'+wechatIcon+'<span>'+wechat+'</span></a><a class="footer-contact-link resume-link" href="'+resume+'" '+(profile.resumeUrl?'download':'aria-disabled="true"')+'>'+folderIcon+'<span>点击下载我的简历</span></a>';
}
const socialUrl = index => socialList()[index]?.url || '#';
const mailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(profile.emailSubject)}`;

function header(){return `<header class="site-header"><button class="menu-toggle" aria-label="打开菜单"><span>菜单</span></button></header>`}
function footerInner(){return `<div class="manifesto"><p>${esc(profile.manifesto).replace(/\n/g,'<br>')}</p><h2 class="manifesto-contact">联络我</h2></div><div class="footer-links">${footerContactLinks()}</div><div class="availability"><span>整装待发<br>为每一次天马行空</span><span class="wechat-line"><small>通过微信直接联系我：</small><img class="wechat-qr" src="images/wechat-qr.png" alt="微信二维码" loading="lazy"></span><small>通过邮箱直接联系我：</small><a href="${mailLink}">${profile.email}</a></div><div class="footer-bottom"><a href="${href('/')}" data-nav class="footer-brand"><span>Will</span><span>Liu</span></a><span>${profile.copyright}</span><span>${profile.signoff}</span></div>`}
function footer(){return `<footer class="site-footer">${footerInner()}</footer>`}
function navOverlay(){
  const navLink=(label,to,i)=>`<a href="${href(to)}" data-nav><sup>${i}</sup><span class="nav-label">${label}</span><b>↗</b></a>`;
  return `<div class="nav-overlay" aria-hidden="true"><div class="nav-top"><a href="${href('/')}" data-nav class="nav-logo">刘义豪&nbsp;&nbsp;Will Liu</a><button class="menu-close">Close</button></div><nav>${navLink('主页','/',1)}${navLink('项目','/work',2)}${navLink('视频','/info',3)}${navLink('关于我','/about',4)}</nav><div class="nav-foot"><span>${profile.role}</span></div></div>`;
}
function projectCard(p,index){return `<a class="project-card reveal" href="${href(slugPath(p.slug))}" data-nav><div class="project-image tone-${p.tone}"><img loading="lazy" src="${p.image}" alt="${esc(p.title)} project preview"><span class="card-index">${String(index+1).padStart(2,'0')}</span><span class="explore">Explore <b>↗</b></span><div class="project-meta"><span class="kind">${esc(p.kind)}</span><h3>${esc(p.title)}</h3><span class="services">${p.services.map(esc).join(', ')}</span></div></div></a>`}
function home(){const featured=projects.slice(0,8);return `${header()}<main><section class="hero"><div class="hero-orbit" aria-hidden="true"><div class="orbit-list"></div></div><canvas id="reveal-canvas"></canvas><div class="hero-left"><img class="face-mark" src="images/face.svg" alt=""><span class="hero-role">${esc(profile.role)}</span></div><div class="hero-top">${esc(profile.location)}</div><div class="hero-title"><p class="hero-name"><span class="gline">${esc(profile.name)}</span><span class="gline">${esc(profile.brand)}</span></p><h1>${profile.title.map((x,i)=>`<span class="title-line line-${i+1}">${esc(x)}</span>`).join('')}</h1><p class="hero-intro">${introLines(profile.intro)}</p></div><div class="hero-bottom"><span>Scroll to explore <i>↓</i></span><span>© '26</span></div><div class="cursor-label">Move to reveal</div></section><section class="statement-section"><p class="reveal">${profile.statement.split(/\r?\n/).map((line,i)=>`<span class="statement-line line-${i+1}">${esc(line)}</span>`).join('')}</p></section><section class="home-work-stage"><span class="home-work-label">参与项目</span><span class="home-work-years">25-26</span><div class="home-art-scene count-${featured.length}">${featured.map((p,i)=>`<a class="home-art-card art-${i+1}" href="${href(slugPath(p.slug))}" data-nav><img loading="lazy" src="${p.image}" alt="${esc(p.title)}"></a>`).join('')}</div><a class="all-works-link" href="${href('/work')}" data-nav>所有项目</a></section><section class="awards-section section-pad"><div class="section-heading reveal"><div><h2>视频速览</h2></div><span class="award-mark">✳</span></div><div class="award-list">${awards.map(a=>`<div class="award-year reveal"><div class="award-project"><span>${a.year}</span><span>${esc(a.project)}</span></div><div class="award-items">${a.items.map(it=>`<div><span>${esc(it[0])}</span><span>${esc(it[1])}</span><b>↗</b></div>`).join('')}</div></div>`).join('')}</div></section></main>${footer()}${navOverlay()}`}
function workPage(){return `${header()}<main class="work-page"><section class="work-presentation" data-view="cards"><span class="work-year year-24">25</span><div class="work-panel"><h1>项目速览</h1><div class="work-mode"><button class="active" data-mode="cards">Cards</button><span>/</span><button data-mode="sphere">Sphere</button></div><div class="sphere-view">${projects.slice(0,8).map((p,i)=>`<a class="sphere-card sphere-${i+1}" href="${href(slugPath(p.slug))}" data-nav><img src="${p.image}" alt="${esc(p.title)}"></a>`).join('')}</div></div><span class="work-year year-26">26</span></section><div class="work-grid">${projects.map(projectCard).join('')}</div><a class="all-work work-home-link" href="${href('/')}" data-nav><span>返回主页</span><span>↗</span></a></main>${footer()}${navOverlay()}`}
function detailPage(p){const idx=projects.indexOf(p), next=[projects[(idx+1)%projects.length],projects[(idx+2)%projects.length]];return `${header()}<main class="detail-page"><section class="detail-hero"><div class="detail-kicker"><span>${p.kind} / 0${String(idx+1).padStart(2,'0')}</span></div><h1>${esc(p.title)}</h1><div class="detail-lead"><div class="lead-services"><span class="eyebrow">Services</span><p>${p.services.map(esc).join('<br>')||'—'}</p>${p.live?`<a class="live-link" href="${p.live}" target="_blank" rel="noreferrer">Live Site ↗</a>`:''}</div><div class="lead-info"><span class="eyebrow">Info</span><p>${esc(p.info||p.title)}</p></div><span class="lead-divider" aria-hidden="true"></span></div></section><div class="detail-art tone-${p.tone}">${p.video?`<video src="${esc(p.video)}" autoplay muted loop playsinline controls></video>`:`<img src="${esc(p.image)}" alt="${esc(p.title)} project artwork">`}<span>Scroll or explore ↓</span></div>${p.slug==='bleibtgleich25'?'':p.awards?`<section class="detail-awards section-pad"><span class="eyebrow">Awards & Recognitions</span><div>${p.awards.map(a=>`<p><span>${esc(a[0])}</span><span>${esc(a[1])}</span></p>`).join('')}</div></section>`:''}<section class="next-projects section-pad"><div class="next-title"><h2>下一个项目</h2></div><div class="next-grid">${next.map(projectCard).join('')}</div><a class="all-work" href="${href('/work')}" data-nav><span>返回所有项目</span><span>↗</span></a><a class="all-work detail-home-link" href="${href('/')}" data-nav><span>返回主页</span><span>↗</span></a></section></main>${footer()}${navOverlay()}`}
function awardsSectionMarkup(){return `<section class="awards-section section-pad" id="videos"><div class="section-heading reveal"><div><h2>视频速览</h2></div><span class="award-mark">✳</span></div><div class="award-list">${awards.map(a=>`<div class="award-year reveal"><div class="award-project"><span>${a.year}</span><span>${esc(a.project)}</span></div><div class="award-items">${a.items.map(it=>`<div><span>${esc(it[0])}</span><span>${esc(it[1])}</span><b>↗</b></div>`).join('')}</div></div>`).join('')}</div></section>`}
const mailIconSVG='<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="12" r="11" fill="#111"/><path d="M5.5 8.5h13v7h-13z" fill="none" stroke="#fff" stroke-width="1.2"/><path d="M5.5 8.5 12 13l6.5-4.5" fill="none" stroke="#fff" stroke-width="1.2"/></svg>';
function ringPlayerMarkup(){
  return `<div class="ring-player" id="ring-player" aria-hidden="true">
  <div class="player-top">
    <button class="player-back" id="rp-close">← 返回环幕</button>
    <div class="player-title"><span id="rp-title"></span><small id="rp-meta"></small></div>
    <div class="player-count"><span id="rp-index"></span><button class="player-sound" id="rp-sound">有声</button></div>
  </div>
  <div class="player-stage"><video id="rp-video" playsinline preload="metadata"></video></div>
  <div class="player-bar">
    <button id="rp-prev" aria-label="上一条">←</button>
    <div class="player-progress" id="rp-progress"><i id="rp-fill"></i></div>
    <span class="player-time" id="rp-time">0:00 / 0:00</span>
    <button id="rp-play" aria-label="播放/暂停">❚❚</button>
    <button id="rp-next" aria-label="下一条">→</button>
  </div>
  <div class="player-list" id="rp-list"></div>
</div>`;
}
function ringPage(){
  return `${header()}<main class="ring-page" data-goo="off">
    <div class="ring-stage" id="ring-stage"></div>
    <a class="ring-back" href="${href('/')}" data-nav>← 返回主页</a>
    <div class="ring-hud ring-hud-top"><div><span class="ring-name">${esc(profile.name)}</span><span class="ring-role">视频剪辑</span></div></div>
    <div class="ring-hud ring-hud-bottom"><span class="ring-caption" id="ring-caption"></span><span class="ring-hint">转动并点击选中视频</span></div>
    <div class="ring-loader" id="ring-loader"><small>正在加载视频</small><div class="ring-bar"><i id="ring-bar"></i></div></div>
  </main>${ringPlayerMarkup()}${navOverlay()}`;
}
const aboutJobs = [
  {
    period: '2026.01 - 2026.08', company: '波浪号', role: '短视频剪辑',
    points: [
      '参与多部院线电影的多平台影宣短视频制作，高效完成从素材整理到成品输出的全流程工作。在职期间累计视频产出300+、单日最高视频产出量达6条。',
      '熟练运用剪映与Pr完成工作，可独立完成简单图像处理。负责二创、花絮、幕后及现场活动等多类短视频剪辑，同时深度参与前期脚本策划与文案撰写。',
      '擅长挖掘影片核心看点，通过强情绪共鸣提升完播率。单条作品抖音最高点赞2.5w+、快手1.9w+、视频号1.1w+，有效辅助影片话题登上热榜。'
    ]
  },
  {
    period: '2025.06 - 至今', company: '独立剪辑', role: '',
    points: [
      '通过闲鱼、小红书、新片场等平台发布接单。',
      '独立完成信息流、Vlog、影视、游戏、泛娱乐等各类视频的后期剪辑。',
      '同时推进多个项目，确保按时交付。累计交付成品200+，好评率达到95%，交付后平均修改次数少于2次。'
    ]
  },
  {
    period: '2020.08 - 2025.06', company: '飞嘉精密器械有限公司', role: '外贸业务',
    points: [
      '进行北美地区客户开发，优化销售方式，销售额有15%的显著提升。',
      '深入海外社媒，参与搭建社媒账号，培养网感与搜商。'
    ]
  }
];
/* 技能证书：品牌 LOGO + 名称的徽章网格（每行 5 个）。
   icon 均为品牌图标，CSS 里统一转黑白（grayscale）+ 小圆角；
   glyph:true 的图标本身是单色图形，尺寸略小；tem 项用字母替代图标。 */
const aboutSkills = [
  { name: '剪映', icon: 'icons/jianying.png' },
  { name: 'Photoshop', icon: 'icons/adobe-photoshop.svg' },
  { name: 'Premiere Pro', icon: 'icons/adobe-premiere.svg' },
  { name: 'Final Cut Pro', icon: 'icons/finalcutpro.png' },
  { name: 'After Effects', icon: 'icons/adobe-after-effects.svg' },
  { name: 'DaVinci Resolve', icon: 'icons/davinciresolve.svg', glyph: true },
  { name: 'ChatGPT', icon: 'icons/chatgpt.png' },
  { name: 'Seedance', icon: 'icons/bytedance.svg', glyph: true },
  { name: 'WorkBuddy', icon: 'icons/workbuddy.png' },
  { name: '英语专业八级', tem: 'TEM' }
];
function aboutSkillsMarkup(){
  return `<ul class="about-skills">${aboutSkills.map((s, i) => {
    const inner = s.tem
      ? `<span class="skill-tem">${esc(s.tem)}</span>`
      : `<img class="skill-${s.glyph ? 'glyph' : 'app'}" data-goo="media" data-goo-delay="${i * 70}" src="${s.icon}" alt="${esc(s.name)}">`;
    return `<li><span class="skill-tile">${inner}</span><span class="skill-name">${esc(s.name)}</span></li>`;
  }).join('')}</ul>`;
}
function aboutProfileMarkup(){
  return `<section class="about-profile">
    <div class="about-hero">
      <img class="about-portrait" data-goo="media" src="images/about-portrait.jpg" alt="刘义豪照片">
      <div class="about-hero-text">
        <span class="about-eyebrow">关于我</span>
        <h1 class="about-name">刘义豪<span class="about-name-en">Will Liu</span></h1>
        <p class="about-hero-line">视频剪辑 / 视频策划</p>
      </div>
    </div>
    <div class="about-sec">
      <h2>工作经历</h2>
      ${aboutJobs.map(j => `<div class="about-job">
        <div class="about-job-side">
          <span class="about-job-period">${esc(j.period)}</span>
          <span class="about-job-company">${esc(j.company)}</span>
          ${j.role ? `<span class="about-job-role">${esc(j.role)}</span>` : ''}
        </div>
        <ul class="about-job-points">${j.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
    <div class="about-sec">
      <h2>教育背景</h2>
      <div class="about-job">
        <div class="about-job-side">
          <span class="about-job-period">2016.09 - 2020.07</span>
          <span class="about-job-company">河南城建学院</span>
          <span class="about-job-role">翻译</span>
        </div>
      </div>
    </div>
    <div class="about-sec">
      <h2>技能证书</h2>
      ${aboutSkillsMarkup()}
    </div>
    <div class="about-sec">
      <h2>关于我</h2>
      <p class="about-bio">专注于影视/物料/短视频剪辑，熟悉电影/剧集/舞台剧的多官方平台短视频宣传工作流程，独立策划并剪辑出多个爆款视频。B站与小红书等新媒体平台深度用户、梗学家。会写文案、懂点运营、坚持审美。在稳定技术的基础上不断培育思路。自带松弛感但绝不松懈，能够快速自我调节适应新环境，抗压能力够强。</p>
    </div>
  </section>`;
}
function aboutPage(){return `${header()}<main class="about-page" aria-label="关于我">${aboutProfileMarkup()}<div class="about-footer">${footerInner()}</div></main>${navOverlay()}`}
function editorPage(){
  const field=(label,key,value,type='text')=>`<label class="editor-field"><span>${label}</span>${type==='textarea'?`<textarea data-profile="${key}">${esc(value)}</textarea>`:`<input data-profile="${key}" value="${esc(value)}">`}</label>`;
  const upload=(index,kind,path)=>`<div class="editor-upload"><label>替换${kind==='image'?'图片':'视频'}<input type="file" accept="${kind==='image'?'image/*':'video/mp4,video/webm,video/quicktime'}" data-upload-project="${index}" data-upload-field="${kind}"></label><input class="editor-path" data-project-index="${index}" data-field="${kind}" value="${esc(path||'')}" placeholder="uploads/filename"><div class="editor-preview">${kind==='image'?`<img src="${esc(path||'')}" alt="预览">`:path?`<video src="${esc(path)}" controls muted></video>`:`<small>尚未上传视频</small>`}</div></div>`;
  return `<main class="editor-shell"><header class="editor-top"><a href="${href('/')}">← 返回作品网站</a><span>本地作品集编辑器</span></header><h1>编辑作品网站</h1><p class="editor-intro">文字、图片和视频会保存在当前项目中。上传完成后点击保存；图片与视频均可随时替换。</p><form id="site-editor">
    <section class="editor-section"><h2>个人资料</h2><div class="editor-fields">${field('姓名','name',profile.name)}${field('品牌名','brand',profile.brand)}${field('角色','role',profile.role,'textarea')}${field('所在地','location',profile.location)}${field('合作团队','agency',profile.agency)}${field('团队网址','agencyUrl',profile.agencyUrl)}${field('邮箱','email',profile.email)}${field('联系电话','phone',profile.phone)}${field('微信号','wechatId',profile.wechatId)}<div class="editor-upload"><label>上传简历 PDF<input type="file" accept="application/pdf,.pdf" data-upload-profile="resumeUrl"></label><input class="editor-path" data-profile="resumeUrl" value="${esc(profile.resumeUrl||'')}" placeholder="上传 PDF 后自动填写文件地址"><div class="editor-preview">${profile.resumeUrl?`<a href="${esc(profile.resumeUrl)}" download>下载已上传的简历 PDF</a>`:'<small>尚未上传简历 PDF</small>'}</div></div>${field('邮件标题','emailSubject',profile.emailSubject)}${field('首页大标题（每行一项）','title',profile.title.join('\n'),'textarea')}${field('简介','intro',profile.intro,'textarea')}${field('首页宣言','statement',profile.statement,'textarea')}${field('作品页引言','workQuote',profile.workQuote,'textarea')}${field('页脚宣言','manifesto',profile.manifesto,'textarea')}${field('版权文字','copyright',profile.copyright)}${field('页脚署名','signoff',profile.signoff)}${field('社交链接 JSON','socials',JSON.stringify(profile.socials,null,2),'textarea')}<div class="editor-upload"><label>替换首页头像图<input type="file" accept="image/*" data-upload-profile="faceImage"></label><input class="editor-path" data-profile="faceImage" value="${esc(profile.faceImage||'images/face.svg')}"><div class="editor-preview"><img src="${esc(profile.faceImage||'images/face.svg')}" alt="首页头像预览"></div></div></div></section>
    <section class="editor-section"><h2>作品与媒体</h2><div class="editor-projects">${projects.map((p,i)=>`<article class="editor-project"><div class="editor-project-title"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(p.slug)}</strong></div><div class="editor-fields">${[['项目名称','title',p.title],['类型','kind',p.kind],['服务（逗号分隔）','services',p.services.join(', ')],['简介','info',p.info||'']].map(([label,key,value])=>`<label class="editor-field"><span>${label}</span>${key==='info'?`<textarea data-project-index="${i}" data-field="${key}">${esc(value)}</textarea>`:`<input data-project-index="${i}" data-field="${key}" value="${esc(value)}">`}</label>`).join('')}${upload(i,'image',p.image)}${upload(i,'video',p.video)}</div></article>`).join('')}</div></section>
    <section class="editor-section"><h2>奖项与实验作品</h2><div class="editor-fields"><label class="editor-field"><span>视频速览内容 JSON（年份、项目、奖项名称与说明）</span><textarea class="editor-json" data-json="awards">${esc(JSON.stringify(awards,null,2))}</textarea></label><label class="editor-field"><span>Experiments JSON</span><textarea class="editor-json" data-json="experiments">${esc(JSON.stringify(experiments,null,2))}</textarea></label></div><h3 class="editor-subheading">奖项悬停视频</h3><p class="editor-help">鼠标移动到奖项行时显示视频窗口，点击窗口内的播放按钮才开始播放。视频会保持原始宽高比。</p>${awards.map((group,groupIndex)=>group.items.map((item,itemIndex)=>{const video=item[3]||'';return `<div class="editor-award-video"><span>${esc(group.year)} · ${esc(group.project)} / ${esc(item[0])} — ${esc(item[1])}</span><label>上传视频<input type="file" accept="video/mp4,video/webm,video/quicktime" data-upload-award="${groupIndex}" data-award-item="${itemIndex}"></label><input class="editor-path" data-award-video="${groupIndex}" data-award-item="${itemIndex}" value="${esc(video)}" placeholder="uploads/award-video.mp4">${video?`<video src="${esc(video)}" controls muted preload="metadata"></video>`:'<small>尚未上传视频</small>'}</div>`}).join('')).join('')}${experiments.map((e,i)=>`<label class="editor-field editor-experiment"><span>${esc(e.title)} 图片</span><input type="file" accept="image/*" data-upload-experiment="${i}"><input class="editor-path" data-experiment-index="${i}" data-field="image" value="${esc(e.image)}"></label>`).join('')}</section>
    <div class="editor-actions"><span id="editor-status" role="status"></span><button type="submit">保存全部更改</button></div></form></main>`;
}
function scrollToHash(){const id=(location.hash||'').replace(/^#/,'');if(!id)return;requestAnimationFrame(()=>{const el=document.getElementById(id);if(el)el.scrollIntoView({block:'start'})})}
/* 环幕页（/info）：three.js 按需加载，切页时调用 dispose 完全卸载 */
let ringDispose = null, ringToken = 0;
async function mountRingPage(){
  const token = ++ringToken;
  const stage = document.getElementById('ring-stage');
  if (!stage) return;
  let mod;
  try { mod = await import('./ring.js'); }
  catch (error) { console.error('[ring] 加载失败：', error); document.getElementById('ring-loader')?.classList.add('done'); return; }
  if (token !== ringToken || !stage.isConnected) return;
  ringDispose = mod.mountRing(stage, { awards });
}
function render(){const p=path();ringToken++;if(ringDispose){ringDispose();ringDispose=null}document.body.classList.toggle('ring-mode',p==='/info');const detail=p.startsWith('/works/')?projects.find(x=>slugPath(x.slug)===p):null;app.innerHTML=p==='/editor'?editorPage():p==='/work'?workPage():p==='/info'?ringPage():p==='/about'?aboutPage():detail?detailPage(detail):home();const face=document.querySelector('.face-mark');if(face)face.src=profile.faceImage||'images/face.svg';bind();gooInit();scrollToHash();if(p==='/info')mountRingPage();}
/* 路由切换时瞬间回到页面顶部：全局 CSS 有 scroll-behavior:smooth，
   平滑滚动在长页面上会被渲染/图片加载打断，导致移动端停在页面中部。 */
function jumpTop(){const de=document.documentElement;const prev=de.style.scrollBehavior;de.style.scrollBehavior='auto';window.scrollTo(0,0);requestAnimationFrame(()=>{de.style.scrollBehavior=prev})}
function bind(){document.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();history.pushState({},'',a.getAttribute('href'));jumpTop();render();}));window.onpopstate=()=>{jumpTop();render()};if(path()==='/editor'){bindEditor();return;}const menu=document.querySelector('.menu-toggle'), overlay=document.querySelector('.nav-overlay');
const menuLabel=text=>{if(!menu)return;menu.querySelector('span').textContent=text;menu.setAttribute('aria-label',text==='返回'?'关闭菜单，返回主页':'打开菜单')};
const close=()=>{overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');menuLabel('菜单')};
menu?.addEventListener('click',()=>{
  /* 切换式：菜单 → 打开浮层并变为「返回」；返回 → 关闭浮层回到主页 */
  if(overlay.classList.contains('open')){close();return;}
  overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');menuLabel('返回');
});document.querySelector('.menu-close')?.addEventListener('click',close);overlay?.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',close));document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));setupReveal();fitHeroFade();fitHeroIntro();setupHeroOrbit();setupClock();setupAwards();setupExperimentPreview();setupSphereInteraction();scheduleHomeSpread();document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);document.querySelector('.image-lightbox')?.addEventListener('click',e=>{if(e.target.classList.contains('image-lightbox'))closeLightbox()});}
function bindEditor(){
  const form=document.querySelector('#site-editor'),status=document.querySelector('#editor-status');
  const setStatus=(text,error=false)=>{status.textContent=text;status.classList.toggle('error',error)};
  const uploadFile=async(file)=>{
    const bytes=new Uint8Array(await file.arrayBuffer());let binary='';
    for(let i=0;i<bytes.length;i+=0x8000)binary+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    const response=await fetch('api/upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:file.name,type:file.type,data:btoa(binary)})});
    const result=await response.json();if(!response.ok)throw new Error(result.error||'上传失败');return result.path;
  };
  document.querySelectorAll('[data-upload-project],[data-upload-experiment],[data-upload-profile],[data-upload-award]').forEach(input=>input.addEventListener('change',async()=>{
    const file=input.files?.[0];if(!file)return;setStatus('正在上传…');
    try{const url=await uploadFile(file);let target;
      if(input.dataset.uploadProject!==undefined){target=document.querySelector(`[data-project-index="${input.dataset.uploadProject}"][data-field="${input.dataset.uploadField}"]`);const preview=input.closest('.editor-upload')?.querySelector('.editor-preview');if(preview)preview.innerHTML=input.dataset.uploadField==='image'?`<img src="${url}" alt="预览">`:`<video src="${url}" controls muted></video>`;}
      else if(input.dataset.uploadExperiment!==undefined)target=document.querySelector(`[data-experiment-index="${input.dataset.uploadExperiment}"][data-field="image"]`);
      else if(input.dataset.uploadAward!==undefined)target=document.querySelector(`[data-award-video="${input.dataset.uploadAward}"][data-award-item="${input.dataset.awardItem}"]`);
      else {target=document.querySelector(`[data-profile="${input.dataset.uploadProfile}"]`);const preview=input.closest('.editor-upload')?.querySelector('.editor-preview');if(preview)preview.innerHTML=input.dataset.uploadProfile==='resumeUrl'?`<a href="${url}" download>下载已上传的简历 PDF</a>`:`<img src="${url}" alt="首页头像预览">`;}
      if(target)target.value=url;setStatus(`已上传 ${file.name}，保存后生效。`);
    }catch(error){setStatus(error.message,true)}
  }));
  form?.addEventListener('submit',async event=>{
    event.preventDefault();setStatus('正在保存…');
    try{
      profile={...profile};document.querySelectorAll('[data-profile]').forEach(input=>{const key=input.dataset.profile;profile[key]=key==='title'?input.value.split('\n').map(s=>s.trim()).filter(Boolean):input.value.trim()});const parsedSocials=JSON.parse(document.querySelector('[data-profile="socials"]').value);if(!Array.isArray(parsedSocials)||parsedSocials.some(s=>!s||typeof s.text!=='string'||typeof s.url!=='string'))throw new Error('社交链接 JSON 必须是包含 text 与 url 的数组。');profile.socials=parsedSocials;
      projects=projects.map((project,index)=>{const get=key=>document.querySelector(`[data-project-index="${index}"][data-field="${key}"]`)?.value??project[key];return {...project,title:get('title'),kind:get('kind'),services:get('services').split(',').map(s=>s.trim()).filter(Boolean),info:get('info'),image:get('image'),video:get('video')||''}});
      experiments=experiments.map((experiment,index)=>({...experiment,image:document.querySelector(`[data-experiment-index="${index}"][data-field="image"]`)?.value||experiment.image}));
      awards=JSON.parse(document.querySelector('[data-json="awards"]').value).map((group,groupIndex)=>({...group,items:group.items.map((item,itemIndex)=>{const video=document.querySelector(`[data-award-video="${groupIndex}"][data-award-item="${itemIndex}"]`)?.value;return video===undefined?item:[item[0],item[1],item[2],video]} )}));experiments=JSON.parse(document.querySelector('[data-json="experiments"]').value).map((item,index)=>({...item,image:document.querySelector(`[data-experiment-index="${index}"][data-field="image"]`)?.value||item.image}));
      const response=await fetch('api/content',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({profile,projects,awards,experiments})});const result=await response.json();if(!response.ok)throw new Error(result.error||'保存失败');setStatus('已保存到项目。返回网站并刷新即可查看。');
    }catch(error){setStatus(`未保存：${error.message}`,true)}
  });
}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
/* 首页揭图效果开关：访问 ?reveal=legacy 可临时回到原来的模糊圆孔实现 */
const FLUID_REVEAL=new URLSearchParams(location.search).get('reveal')!=='legacy';

/* 首页撕裂下层：浅灰从顶部渐隐，到简介首行（「专注于电影…」）上方正好纯白。
   量取首行相对 hero 的纵向位置写入 CSS 变量 --reveal-fade-y，排版或窗口变化时重算。 */
function fitHeroFade(){
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const intro=hero.querySelector('.hero-intro');
  const first=intro&&(intro.querySelector('.intro-line')||intro);
  if(!first)return;
  const y=Math.max(0,Math.round(first.getBoundingClientRect().top-hero.getBoundingClientRect().top));
  hero.style.setProperty('--reveal-fade-y',y+'px');
  if(!fitHeroFade.bound){
    fitHeroFade.bound=true;
    addEventListener('resize',fitHeroFade);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitHeroFade);
  }
}

/* 首屏自适应兜底：简介底部与首屏底边保持安全距离，
   防止矮视口（手机 SE / 竖屏平板）下简介被 overflow:hidden 裁切、或与底部信息行重叠 */
function fitHeroIntro(){
  const hero=document.querySelector('.hero');
  if(!hero)return;
  const intro=hero.querySelector('.hero-intro');
  if(!intro)return;
  const need=Math.ceil(intro.getBoundingClientRect().bottom-hero.getBoundingClientRect().top)+56;
  hero.style.minHeight=need+'px';
  if(!fitHeroIntro.bound){
    fitHeroIntro.bound=true;
    addEventListener('resize',fitHeroIntro);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitHeroIntro);
  }
}

/* 首页揭图：WebGL2 流体墨迹遮罩（替代原来的模糊圆孔） */
function setupReveal(){
  const cover=document.querySelector('#reveal-canvas');
  if(!cover)return;
  /* 移动端：保留白色遮罩但不做撕开动效（画布保持纯白静态覆盖，文字层在其上；PC 端不变） */
  if(matchMedia('(max-width: 800px)').matches){cover.classList.add('reveal-static');return}
  if(!FLUID_REVEAL)return setupRevealLegacy();
  const probe=document.createElement('canvas');
  if(!probe.getContext('webgl2')||matchMedia('(pointer: coarse)').matches)return setupRevealLegacy();
  try{fluidReveal(cover)}
  catch(error){
    console.error('[reveal] 流体揭图初始化失败，改为直接展示作品环：',error);
    cover.style.display='none';
  }
}

function fluidReveal(cover){
  const gl=cover.getContext('webgl2',{alpha:true,premultipliedAlpha:false,antialias:false});
  if(!gl){cover.style.display='none';return}
  gl.getExtension('EXT_color_buffer_float');
  const FILTER=gl.getExtension('OES_texture_float_linear')?gl.LINEAR:gl.NEAREST;

  /* 手感参数：vel 拖影长度 / decay 消散速度 / radius 笔刷大小 / edge+edgeW 边缘阈值与柔和度
     bottomFade：底部渐白比例，图像在页面底部“溶”进底色（原站 0.18）
     SCROLL_LINK：滚速轻微耦合，快滚时墨迹收敛更快、边缘更活；false 则完全与滚动无关 */
  const CFG={baseW:512,maxH:1440,vel:.6,friction:4,spread:.62,decay:2.6,radius:.0034,force:4,wobble:2.6,grain:.7,edge:.3,edgeW:.06,bottomFade:0,clampV:4};
  const SCROLL_LINK=true;

  const VS=`#version 300 es
precision highp float;in vec2 aPos;out vec2 vUv;
void main(){vUv=aPos*.5+.5;gl_Position=vec4(aPos,0.,1.);}`;
  const FS_SPLAT=`#version 300 es
precision highp float;in vec2 vUv;out vec4 fragColor;
uniform sampler2D uField;uniform float aspectRatio;uniform vec3 color;uniform vec2 point;uniform float radius;
void main(){vec2 p=vUv-point;p.x*=aspectRatio;float g=exp(-dot(p,p)/radius);vec4 f=texture(uField,vUv);
float w=clamp(g*color.x,0.,1.);fragColor=vec4(f.r+g*color.x,mix(f.g,color.y,w),mix(f.b,color.z,w),1.);}`;
  const FS_STEP=`#version 300 es
precision highp float;in vec2 vUv;out vec4 fragColor;
uniform sampler2D uField;uniform vec2 texelSize;uniform float dt,friction,spread,decay,wobble,grain,time;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){return noise(p)*.55+noise(p*2.6)*.3+noise(p*6.3)*.15;}
void main(){
vec2 vel=texture(uField,vUv).gb;vec2 coord=vUv-vel*dt;vec4 s=texture(uField,coord);
float t=time*.3;
vec2 warp=(vec2(fbm(vUv*11.+t),fbm(vUv*11.+37.2-t))-.5)*2.*wobble*texelSize;
vec4 nL=texture(uField,coord+vec2(-texelSize.x,0.)+warp),nR=texture(uField,coord+vec2(texelSize.x,0.)+warp);
vec4 nT=texture(uField,coord+vec2(0.,texelSize.y)+warp),nB=texture(uField,coord+vec2(0.,-texelSize.y)+warp);
float avgD=(nL.r+nR.r+nT.r+nB.r)*.25;vec2 avgV=(nL.gb+nR.gb+nT.gb+nB.gb)*.25;
float d=mix(s.r,avgD,spread);vec2 v=mix(s.gb,avgV,spread*.5);
float g=fbm(vUv*15.+5.1+t*.6);
d*=1./(1.+(decay+grain*decay*(g-.5)*2.)*dt);v*=1./(1.+friction*dt);
fragColor=vec4(max(d,0.),v,1.);}`;
  const FS_MASK=`#version 300 es
precision highp float;in vec2 vUv;out vec4 fragColor;
uniform sampler2D uField;uniform vec3 maskColor;uniform vec2 edge;uniform float bottomFade,time;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){return noise(p)*.55+noise(p*2.6)*.3+noise(p*6.3)*.15;}
void main(){
float d=texture(uField,vUv).r;
if(bottomFade>0.){float n=fbm(vec2(vUv.x*9.,time*.25));d*=smoothstep(0.,bottomFade*(.35+n*1.3),vUv.y);}
float alpha=1.-smoothstep(edge.x,edge.y,d);
fragColor=vec4(maskColor,alpha);}`;

  const compile=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s};
  const vsh=compile(gl.VERTEX_SHADER,VS);
  const program=src=>{const p=gl.createProgram();gl.attachShader(p,vsh);gl.attachShader(p,compile(gl.FRAGMENT_SHADER,src));
    gl.bindAttribLocation(p,0,'aPos');gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS)){console.error('[reveal] shader link failed:',gl.getProgramInfoLog(p));return null}
    const u={};const n=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);
    for(let i=0;i<n;i++){const name=gl.getActiveUniform(p,i).name;u[name]=gl.getUniformLocation(p,name)}return{p,u}};
  const PS=program(FS_SPLAT),PT=program(FS_STEP),PM=program(FS_MASK);
  if(!PS||!PT||!PM){cover.style.display='none';return}

  const target=(w,h)=>{const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,FILTER);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,FILTER);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA16F,w,h,0,gl.RGBA,gl.HALF_FLOAT,null);
    const fbo=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);
    gl.viewport(0,0,w,h);gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
    return{tex,fbo,w,h,attach(unit){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,this.tex);return unit}}};

  const state={read:null,write:null,texelX:0,texelY:0};
  const swap=()=>{const t=state.read;state.read=state.write;state.write=t};

  const vao=gl.createVertexArray();gl.bindVertexArray(vao);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);

  const draw=t=>{if(t){gl.bindFramebuffer(gl.FRAMEBUFFER,t.fbo);gl.viewport(0,0,t.w,t.h)}else{gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,cover.width,cover.height)}gl.drawArrays(gl.TRIANGLE_STRIP,0,4)};

  /* 撕开覆盖层保持纯白；下层（hero 底色）才是浅灰，撕开后露出 */
  const maskRGB=[1,1,1];

  let rect=cover.getBoundingClientRect();
  function resize(){
    if(!cover.isConnected)return;
    const dpr=Math.min(devicePixelRatio||1,2),w=cover.clientWidth,h=cover.clientHeight;
    if(!w||!h)return;
    cover.width=Math.round(w*dpr);cover.height=Math.round(h*dpr);
    const aspect=cover.width/Math.max(cover.height,1);
    let tw,th;
    if(aspect>=1){th=CFG.baseW;tw=Math.min(Math.round(CFG.baseW*aspect),CFG.maxH)}else{tw=CFG.baseW;th=Math.min(Math.round(CFG.baseW/aspect),CFG.maxH)}
    if(!state.read||state.read.w!==tw||state.read.h!==th){
      if(state.read){gl.deleteTexture(state.read.tex);gl.deleteFramebuffer(state.read.fbo);gl.deleteTexture(state.write.tex);gl.deleteFramebuffer(state.write.fbo)}
      state.read=target(tw,th);state.write=target(tw,th);state.texelX=1/tw;state.texelY=1/th;
    }
    rect=cover.getBoundingClientRect();
  }

  const splat=(x,y,vx,vy)=>{gl.useProgram(PS.p);
    gl.uniform1i(PS.u.uField,state.read.attach(0));
    gl.uniform1f(PS.u.aspectRatio,cover.width/cover.height);
    gl.uniform2f(PS.u.point,x,y);
    gl.uniform3f(PS.u.color,CFG.force,vx,vy);
    gl.uniform1f(PS.u.radius,CFG.radius);
    draw(state.write);swap()};

  const pointer={x:.5,y:.5,vx:0,vy:0,init:false};
  let lastEvent=performance.now();
  const stroke=(x0,y0,x1,y1,rvx,rvy)=>{
    const aspect=cover.width/Math.max(cover.height,1);
    const vx=Math.max(-CFG.clampV,Math.min(CFG.clampV,rvx))*CFG.vel;
    const vy=Math.max(-CFG.clampV,Math.min(CFG.clampV,rvy))*CFG.vel;
    const dist=Math.hypot((x1-x0)*aspect,y1-y0);
    const steps=Math.min(12,Math.max(1,Math.ceil(dist/(.45*Math.sqrt(CFG.radius)))));
    for(let i=0;i<steps;i++){const t=steps===1?1:i/(steps-1);splat(x0+(x1-x0)*t,y0+(y1-y0)*t,vx,vy)}
  };
  const move=(e,now=performance.now())=>{
    if(!state.read)return;
    const u=(e.clientX-rect.left)/rect.width,v=1-(e.clientY-rect.top)/rect.height;
    const dt=Math.max((now-lastEvent)/1000,.004);lastEvent=now;
    if(!pointer.init){pointer.x=u;pointer.y=v;pointer.init=true;stroke(u,v,u,v,0,0);return}
    const vx=(u-pointer.x)/dt,vy=(v-pointer.y)/dt;
    stroke(pointer.x,pointer.y,u,v,vx,vy);
    pointer.vx=pointer.vx*.6+vx*.4;pointer.vy=pointer.vy*.6+vy*.4;
    pointer.x=u;pointer.y=v;
  };

  let raf=0,running=false,last=performance.now();
  let scrollE=0,lastScroll=window.scrollY||0;
  const loop=now=>{
    if(!cover.isConnected){teardown();return}
    raf=requestAnimationFrame(loop);
    const dt=Math.min((now-last)/1000,.05);last=now;
    gl.disable(gl.BLEND);
    gl.useProgram(PT.p);
    gl.uniform2f(PT.u.texelSize,state.texelX,state.texelY);
    gl.uniform1f(PT.u.dt,dt);
    gl.uniform1f(PT.u.friction,CFG.friction);
    gl.uniform1f(PT.u.spread,CFG.spread);
    gl.uniform1f(PT.u.decay,CFG.decay*(1+.3*scrollE));
    gl.uniform1f(PT.u.wobble,CFG.wobble*(1+.2*scrollE));
    gl.uniform1f(PT.u.grain,CFG.grain);
    gl.uniform1f(PT.u.time,now*.001);
    gl.uniform1i(PT.u.uField,state.read.attach(0));
    draw(state.write);swap();
    scrollE*=Math.max(0,1-6*dt);
    gl.useProgram(PM.p);
    gl.uniform1i(PM.u.uField,state.read.attach(0));
    gl.uniform3f(PM.u.maskColor,maskRGB[0],maskRGB[1],maskRGB[2]);
    gl.uniform2f(PM.u.edge,CFG.edge,CFG.edge+CFG.edgeW);
    gl.uniform1f(PM.u.bottomFade,CFG.bottomFade);
    gl.uniform1f(PM.u.time,now*.001);
    draw(null);
  };
  const start=()=>{if(running||!state.read)return;running=true;last=performance.now();raf=requestAnimationFrame(loop)};
  const stop=()=>{running=false;cancelAnimationFrame(raf)};
  /* 离屏清场：流体场归零后重画一整面遮罩，滚回来时封面是闭合的（与原站一致） */
  const reseal=()=>{
    if(!state.read||!cover.isConnected)return;
    [state.read,state.write].forEach(t=>{
      gl.bindFramebuffer(gl.FRAMEBUFFER,t.fbo);gl.viewport(0,0,t.w,t.h);
      gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.disable(gl.BLEND);
    gl.useProgram(PM.p);
    gl.uniform1i(PM.u.uField,state.read.attach(0));
    gl.uniform3f(PM.u.maskColor,maskRGB[0],maskRGB[1],maskRGB[2]);
    gl.uniform2f(PM.u.edge,CFG.edge,CFG.edge+CFG.edgeW);
    gl.uniform1f(PM.u.bottomFade,CFG.bottomFade);
    gl.uniform1f(PM.u.time,performance.now()*.001);
    draw(null);
  };
  const teardown=()=>{stop();hero.removeEventListener('pointermove',onMove);hero.removeEventListener('pointerleave',onLeave);
    window.removeEventListener('resize',resize);window.removeEventListener('scroll',onScroll);
    io.disconnect();document.removeEventListener('visibilitychange',onVis);
    const lose=gl.getExtension('WEBGL_lose_context');if(lose)lose.loseContext()};

  const onMove=e=>{
    const list=e.getCoalescedEvents?e.getCoalescedEvents():null;
    if(list&&list.length>1){for(let i=0;i<list.length&&i<8;i++)move(list[i],list[i].timeStamp)}
    else move(e,e.timeStamp||performance.now());
  };
  const onLeave=()=>{pointer.init=false};
  const onScroll=()=>{
    rect=cover.getBoundingClientRect();
    if(!SCROLL_LINK)return;
    const y=window.scrollY||0;
    scrollE=Math.min(1,scrollE+Math.abs(y-lastScroll)/70);
    lastScroll=y;
  };
  const onVis=()=>{document.hidden?stop():start()};
  const hero=cover.closest('.hero')||cover.parentElement;

  hero.addEventListener('pointermove',onMove,{passive:true});
  hero.addEventListener('pointerleave',onLeave);
  addEventListener('resize',resize);
  addEventListener('scroll',onScroll,{passive:true});
  const io=new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){rect=cover.getBoundingClientRect();pointer.init=false;start()}
    else{stop();reseal()}
  },{threshold:0});
  io.observe(cover);
  document.addEventListener('visibilitychange',onVis);
  resize();
  start();
}

function setupRevealLegacy(){
  const cover=document.querySelector('#reveal-canvas');
  if(!cover)return;
  const ctx=cover.getContext('2d');
  let w,h,dpr,active=false,mouse={x:-400,y:-400},target={x:-400,y:-400};
  const resize=()=>{if(!cover.isConnected)return;dpr=Math.min(devicePixelRatio||1,1.5);w=cover.clientWidth;h=cover.clientHeight;cover.width=w*dpr;cover.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
  const onPointer=e=>{if(!cover.isConnected)return;const r=cover.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){active=false;return}active=true;target.x=e.clientX-r.left;target.y=e.clientY-r.top;mouse.x=target.x;mouse.y=target.y};
  const hero=cover.closest('.hero'),onLeave=()=>{active=false};
  resize();window.addEventListener('resize',resize);window.addEventListener('pointermove',onPointer);hero?.addEventListener('pointerleave',onLeave);
  const draw=t=>{
    if(!cover.isConnected){window.removeEventListener('resize',resize);window.removeEventListener('pointermove',onPointer);hero?.removeEventListener('pointerleave',onLeave);return}
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);
    const r=Math.min(72,w*.092)*1.3;
    ctx.save();ctx.globalCompositeOperation='destination-out';
    ctx.globalAlpha=active?1:0;ctx.filter='blur(12px)';ctx.beginPath();ctx.arc(mouse.x,mouse.y,r,0,Math.PI*2);ctx.fill();
    ctx.restore();
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}
/* ===== 首页撕口下：自转作品环（逆向自原站 initOrbitTiles · 不裁剪版） =====
   卡片全部叠在中心点上：布局角 r=(n-progress)/N*2π，x=sin(r)*R、y=0（一条过中心的线）；
   深度 a=((cos r)+1)/2 的 1.3 次幂 → scale/blur/brightness/zIndex；
   整环 24s/圈旋转，卡片反向自转保持正立；每 2.5s 全体步进一槽（osmo 缓动，75ms 错开）。 */
const ORBIT_CFG={xR:1,yR:0,blur:.036,scaleMin:.2,brightMin:.3,stepDur:2500,stagger:75,spinDur:24};
function setupHeroOrbit(){
  const root=document.querySelector('.hero-orbit');
  if(!root)return;
  const list=root.querySelector('.orbit-list');
  if(!list)return;
  list.replaceChildren();
  const items=projects.slice(0,6).map(p=>{const it=document.createElement('div');it.className='orbit-item';it.innerHTML=`<img src="${esc(p.image)}" alt="${esc(p.title)}" draggable="false">`;list.appendChild(it);return it});
  const N=items.length;
  if(N<2)return;
  const state=items.map(()=>({progress:0}));
  const ease=gooEase(.625,.05,0,1);
  let spin=0,stepping=null,running=false,inView=false,raf=0;
  const radius=()=>Math.min(root.clientWidth*.3,440);
  function layout(){
    const R=radius(),blurMax=R*ORBIT_CFG.blur;
    items.forEach((el,n)=>{
      const r=(n-state[n].progress)/N*Math.PI*2;
      const a=(Math.cos(r)+1)/2,s=Math.pow(a,1.3);
      const scale=ORBIT_CFG.scaleMin+(1-ORBIT_CFG.scaleMin)*s;
      const blur=blurMax*(1-s),bright=ORBIT_CFG.brightMin+(1-ORBIT_CFG.brightMin)*s;
      el.style.transform=`rotate(${spin.toFixed(3)}deg) translate(${(Math.sin(r)*R).toFixed(2)}px,0px) rotate(${(-spin).toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      el.style.filter=`blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)})`;
      el.style.zIndex=String(Math.round(1000*s));
    });
  }
  function closestIdx(){let best=0,bd=1e9;state.forEach((st,n)=>{const m=((n-st.progress)%N+N)%N,d=Math.min(m,N-m);if(d<bd){bd=d;best=n}});return best}
  function step(){
    const from=closestIdx();
    const order=state.map((st,n)=>({st,n,off:(n-from+N)%N})).sort((a,b)=>a.off-b.off);
    stepping={t0:performance.now(),tw:order.map((o,i)=>({st:o.st,start:i*ORBIT_CFG.stagger,from:o.st.progress}))};
  }
  function loop(now){
    if(!running||!root.isConnected){running=false;raf=0;return}
    spin=(now/1000%ORBIT_CFG.spinDur)/ORBIT_CFG.spinDur*360;
    if(stepping){
      let done=true;
      for(const t of stepping.tw){
        const p=Math.min(1,Math.max(0,(now-stepping.t0-t.start)/ORBIT_CFG.stepDur));
        t.st.progress=t.from+ease(p);
        if(p<1)done=false;
      }
      if(done)step();
    }
    layout();
    raf=requestAnimationFrame(loop);
  }
  const sync=()=>{const want=inView&&!document.hidden;if(want===running)return;running=want;if(want){step();if(!raf)raf=requestAnimationFrame(loop)}};
  new IntersectionObserver(([e])=>{inView=e.isIntersecting;sync()},{threshold:0}).observe(root);
  document.addEventListener('visibilitychange',sync);
  layout();
}

let clockTimer;
function setupClock(){const el=document.querySelector('.local-time');if(!el)return;clearInterval(clockTimer);const update=()=>{if(!el.isConnected){clearInterval(clockTimer);return}el.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Kyiv',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())};update();clockTimer=setInterval(update,1000)}
const posterOfVideo = src => 'posters/' + String(src||'').split('/').pop().replace(/\.[^.]+$/, '') + '.jpg';
/* 「视频速览」预览面板：PC 悬停触发，移动端（无 hover 设备）点击触发，同一套预览交互 */
function setupAwards(){
  const list=document.querySelector('.award-list');if(!list)return;
  const preview=document.createElement('div');preview.className='award-video-preview';preview.setAttribute('aria-hidden','true');list.append(preview);
  let hideTimer,currentRow=null;
  const close=()=>{clearTimeout(hideTimer);preview.classList.remove('open');preview.setAttribute('aria-hidden','true');preview.innerHTML='';currentRow=null};
  const hide=()=>{clearTimeout(hideTimer);hideTimer=setTimeout(close,420)};
  preview.addEventListener('pointerenter',()=>clearTimeout(hideTimer));preview.addEventListener('pointerleave',hide);
  const groups=[...list.querySelectorAll('.award-year')];
  const show=(row,groupIndex,itemIndex)=>{
    clearTimeout(hideTimer);
    const group=groups[groupIndex];
    const item=awards[groupIndex]?.items[itemIndex]||[],labels=[...row.querySelectorAll('span')].map(el=>el.textContent.trim());
    const project=group.querySelector('.award-project span:nth-child(2)')?.textContent||'';
    const year=group.querySelector('.award-project span:first-child')?.textContent||'';
    const video=item[3]||'';preview.innerHTML=video?`<div class="award-video-frame"><video src="${esc(video)}" poster="${esc(posterOfVideo(video))}" preload="metadata" playsinline aria-label="${esc(`${project} ${labels[1]||''} video`)}"></video><button class="award-video-play" type="button" aria-label="播放视频">▶</button></div><span class="award-video-title">${esc(year)} · ${esc(project)} / ${esc(labels[0]||'Award')} — ${esc(labels[1]||'Recognition')}</span>`:`<div class="award-video-empty"><span>AWARD FILM</span><b>${esc(labels[1]||'Recognition')}</b><small>在编辑器中上传此奖项的视频</small></div>`;
    const rect=row.getBoundingClientRect(),frame=preview.querySelector('.award-video-frame');
    /* 预览框垂直居中于当前行，且整体始终留在视口内（竖向视频放大后高度变化，需按实际高度重算） */
    const place=()=>{const m=12,h=preview.offsetHeight,hh=Math.min((innerHeight-2*m)/2,Math.max(innerHeight*.34,h/2));preview.style.top=`${Math.max(m+hh,Math.min(innerHeight-m-hh,rect.top+rect.height/2))}px`};
    preview.classList.remove('is-portrait');
    place();preview.style.left='';preview.classList.add('open');preview.setAttribute('aria-hidden','false');
    const player=frame?.querySelector('video'),play=frame?.querySelector('.award-video-play');
    player?.addEventListener('loadedmetadata',()=>{
      preview.classList.toggle('is-portrait',player.videoHeight>player.videoWidth);
      player.style.setProperty('--video-ratio',`${player.videoWidth} / ${player.videoHeight}`);
      requestAnimationFrame(place);
    },{once:true});
    play?.addEventListener('click',e=>{e.stopPropagation();try{play.hidden=true;player.controls=true;player.play().catch(()=>{})}catch{play.hidden=false}});
    currentRow=row;
  };
  /* 点击预览模式：触屏设备（hover:none）或窄屏（≤800px，移动端布局） */
  const clickMode=matchMedia('(hover: none)').matches||matchMedia('(max-width: 800px)').matches;
  groups.forEach((group,groupIndex)=>group.querySelectorAll('.award-items>div').forEach((row,itemIndex)=>{
    row.classList.add('award-interactive-row');
    if(!clickMode){
      /* PC：悬停预览（原交互不变） */
      row.addEventListener('pointerenter',()=>show(row,groupIndex,itemIndex));
      row.addEventListener('pointerleave',hide);
    }else{
      /* 移动端：点击行打开预览（带封面，点 ▶ 播放），再点同一行或空白处关闭 */
      row.addEventListener('click',e=>{e.stopPropagation();currentRow===row?close():show(row,groupIndex,itemIndex)});
    }
  }));
  if(clickMode)document.addEventListener('click',e=>{if(currentRow&&!e.target.closest('.award-items>div')&&!e.target.closest('.award-video-preview'))close()});
}
function openLightbox(card){const box=document.querySelector('.image-lightbox');if(!box)return;box.querySelector('img').src=card.dataset.image;box.querySelector('span').textContent=card.dataset.title;box.classList.add('open');box.setAttribute('aria-hidden','false')}
function closeLightbox(){const box=document.querySelector('.image-lightbox');box?.classList.remove('open');box?.setAttribute('aria-hidden','true')}
window.addEventListener('pointermove',e=>{const hero=document.querySelector('.hero'),label=document.querySelector('.cursor-label');if(!hero||!label)return;const r=hero.getBoundingClientRect();label.style.left=`${e.clientX-r.left}px`;label.style.top=`${e.clientY-r.top}px`;label.style.opacity=e.clientY>=r.top&&e.clientY<=r.bottom?'.7':'0'});
document.addEventListener('click',e=>{const button=e.target.closest?.('[data-mode]');if(!button)return;const stage=button.closest('.work-presentation');if(!stage)return;stage.dataset.view=button.dataset.mode;stage.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',b===button))});
function setupExperimentPreview(){
  const grid=document.querySelector('.experiment-grid');if(!grid)return;
  document.querySelector('.experiment-hover-preview')?.remove();
  const preview=document.createElement('div');preview.className='experiment-hover-preview';preview.setAttribute('aria-hidden','true');preview.innerHTML='<img alt=""><span></span>';document.body.append(preview);
  grid.querySelectorAll('.experiment-card').forEach(card=>{
    card.addEventListener('pointerenter',()=>{if(!matchMedia('(hover: hover)').matches)return;preview.querySelector('img').src=card.dataset.image;preview.querySelector('img').alt=card.dataset.title;preview.querySelector('span').textContent=card.dataset.title;preview.classList.add('open')});
    card.addEventListener('pointerleave',()=>preview.classList.remove('open'));
    card.addEventListener('click',()=>openLightbox(card));
  });
}
function setupSphereInteraction(){
  const sphere=document.querySelector('.sphere-view');if(!sphere)return;
  const cards=[...sphere.querySelectorAll('.sphere-card')];
  cards.forEach((card,index)=>{const angle=(index/cards.length)*Math.PI*2,depth=Math.sin(angle),x=50+38*Math.cos(angle),y=50+34*Math.sin(angle),scale=.68+(depth+1)*.18;card.style.left=`${x}%`;card.style.top=`${y}%`;card.style.zIndex=String(20+Math.round(depth*20));card.style.setProperty('--depth',`${Math.round(depth*95)}px`);card.style.setProperty('--scale',scale.toFixed(2));card.style.setProperty('--twist',`${Math.round(Math.cos(angle)*12)}deg`)});
  sphere.addEventListener('pointermove',event=>{const rect=sphere.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;sphere.style.setProperty('--tilt-x',`${(-y*14).toFixed(1)}deg`);sphere.style.setProperty('--tilt-y',`${(x*18).toFixed(1)}deg`)});
  sphere.addEventListener('pointerleave',()=>{sphere.style.setProperty('--tilt-x','0deg');sphere.style.setProperty('--tilt-y','0deg')});
}
let homeSpreadFrame=0;
function scheduleHomeSpread(){if(homeSpreadFrame)return;homeSpreadFrame=requestAnimationFrame(()=>{homeSpreadFrame=0;const stage=document.querySelector('.home-work-stage');if(!stage)return;const cards=[...stage.querySelectorAll('.home-art-card')],rect=stage.getBoundingClientRect(),vh=innerHeight,start=vh*.9,end=-vh*.25,progress=Math.max(0,Math.min(1,(start-rect.top)/(start-end))),eased=1-Math.pow(1-progress,2);cards.forEach(card=>{if(!card.dataset.restTransform)card.dataset.restTransform=getComputedStyle(card).transform;if(progress>=1){card.style.transform='';card.style.scale='';card.style.willChange='';return}const x=rect.left+card.offsetLeft+card.offsetWidth/2,y=rect.top+card.offsetTop+card.offsetHeight/2,cx=rect.left+rect.width/2,cy=rect.top+rect.height*.46,dx=cx-x,dy=cy-y;card.style.willChange='transform';card.style.transform=`translate3d(${dx*(1-eased)}px,${dy*(1-eased)}px,0) scale(${.72+.28*eased}) ${card.dataset.restTransform}`})})}
window.addEventListener('scroll',scheduleHomeSpread,{passive:true});window.addEventListener('resize',scheduleHomeSpread);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();document.querySelector('.nav-overlay.open .menu-close')?.click()}});
document.addEventListener('click',e=>{const resume=e.target.closest?.('.resume-link[aria-disabled="true"]');if(resume){e.preventDefault();return}const link=e.target.closest?.('[data-copy-wechat]');if(!link)return;e.preventDefault();navigator.clipboard?.writeText(profile.wechatId||'Will_liu97').catch(()=>{})});
/* ===== 全站文字：goo 滤镜逐行凝聚（同原站 animateTextReveal 的机制） =====
   每个"自带文本的节点"临时挂一个 SVG filter：feGaussianBlur(stdDeviation=sd)
   + feColorMatrix(alpha' = 20a - 8)。模糊后 alpha < .4 的部分被完全吃掉 → 文字隐形；
   播放时 blur sd → 0（1200ms, cubic-bezier(.25,1,.5,1)），末尾矩阵收拢回 alpha' = a，
   文字从墨团里凝聚出来。
   与首屏版的区别：范围从 hero 扩到全站（main / header / footer 内所有含文本的叶子节点）；
   行与行间隔 90ms（全站共享一条时间线）；进入视口才创建滤镜，未轮到用 .goo-pending 隐身。
   回退：?text=legacy 关闭；或把 GOO_ENABLED 改为 false。 */
const GOO_ENABLED = new URLSearchParams(location.search).get('text') !== 'legacy';
const GOO = {
  dur: 1200,        // 单行凝聚时长（原站节奏，勿再压缩）
  stagger: 90,      // 行与行的间隔（回到与首屏版相同的 90ms）
  startDelay: 180,
  amp: 20, off: -8, // alpha' = amp * a + off，阈值 0.4
  matrixFrom: .62,  // 后 38% 时长把矩阵收拢回 alpha' = a
  sdMin: 14, sdMax: 54
};
const SVG_NS = 'http://www.w3.org/2000/svg';
const GOO_SKIP = 'svg,video,canvas,img,input,textarea,select,script,style,iframe,template,[data-goo="off"]';
let gooSeq = 0, gooTicking = false, gooTimeline = 0, gooIO = null, gooWatchdog = 0, gooPlanned = new WeakSet(), gooActive = new WeakMap();
const gooRunning = [], gooTimers = [];

/* cubic-bezier(x1,y1,x2,y2) 求值，用于复现原站 CustomEase "Out"(0.25,1,0.5,1) */
function gooEase(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const fx = t => ((ax * t + bx) * t + cx) * t;
  const fy = t => ((ay * t + by) * t + cy) * t;
  const dfx = t => (3 * ax * t + 2 * bx) * t + cx;
  return x => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = fx(t) - x;
      if (Math.abs(err) < 1e-5) break;
      const d = dfx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return fy(t < 0 ? 0 : t > 1 ? 1 : t);
  };
}
const gooOut = gooEase(.25, 1, .5, 1);

function gooDefs() {
  let svg = document.getElementById('goo-defs');
  if (!svg) {
    svg = document.createElementNS(SVG_NS, 'svg');
    svg.id = 'goo-defs';
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
    document.body.prepend(svg);
  }
  return svg;
}

function gooMakeFilter(sd) {
  const id = `goo-${++gooSeq}`;
  const filter = document.createElementNS(SVG_NS, 'filter');
  filter.setAttribute('id', id);
  filter.setAttribute('x', '-32%');
  filter.setAttribute('y', '-32%');
  filter.setAttribute('width', '164%');
  filter.setAttribute('height', '164%');
  filter.setAttribute('color-interpolation-filters', 'sRGB');
  const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
  blur.setAttribute('in', 'SourceGraphic');
  blur.setAttribute('stdDeviation', sd.toFixed(2));
  blur.setAttribute('result', 'blur');
  const cm = document.createElementNS(SVG_NS, 'feColorMatrix');
  cm.setAttribute('in', 'blur');
  cm.setAttribute('mode', 'matrix');
  cm.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${GOO.amp} ${GOO.off}`);
  cm.setAttribute('result', 'goo');
  filter.append(blur, cm);
  gooDefs().appendChild(filter);
  return { filter, blur, cm };
}

function gooFinish(r) {
  if (r.done) return;
  r.done = true;
  r.el.classList.remove('goo-pending');
  r.el.style.filter = '';
  r.el.style.opacity = '';
  r.filter?.remove();
  clearTimeout(r.hard);
  gooPlanned.delete(r.el);
}

function gooTick(now) {
  let active = 0;
  for (const r of gooRunning) {
    if (r.done) continue;
    const p = (now - r.t0) / GOO.dur;
    if (p < 0) { active++; continue; }
    if (!r.live) {
      /* 滤镜延迟到开播那一刻才创建：同时存活的滤镜数被限制在 dur/stagger ≈ 9 个 */
      r.live = true;
      const { filter, blur, cm } = gooMakeFilter(r.sd);
      r.filter = filter; r.blur = blur; r.cm = cm;
      r.el.style.filter = `url(#${filter.id})`;
      r.el.classList.remove('goo-pending');
    }
    const q = p > 1 ? 1 : p;
    const b = r.sd * (1 - gooOut(q));
    r.blur.setAttribute('stdDeviation', b < .35 ? '0' : b.toFixed(2));
    const mp = Math.min(1, Math.max(0, (q - GOO.matrixFrom) / (1 - GOO.matrixFrom)));
    const amp = GOO.amp + (1 - GOO.amp) * mp;
    const off = GOO.off + (0 - GOO.off) * mp;
    r.cm.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${amp.toFixed(3)} ${off.toFixed(3)}`);
    if (r.fade) r.el.style.opacity = String(Math.min(1, q / .38).toFixed(3));
    if (q >= 1) gooFinish(r);
    else active++;
  }
  if (active > 0) requestAnimationFrame(gooTick);
  else { gooTicking = false; gooRunning.length = 0; }
}

function gooStart(el, t0) {
  const rect = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const lh = parseFloat(cs.lineHeight) || rect.height || 16;
  const r = {
    el, sd: Math.min(GOO.sdMax, Math.max(GOO.sdMin, rect.height * .6)),
    t0, done: false, live: false, filter: null,
    fade: rect.height > lh * 1.8
  };
  /* 重播场景：排队等待期间先隐身（首播时初始化已统一加过，这里是幂等的） */
  el.classList.add('goo-pending');
  /* 硬保险：即便 rAF 被节流/切到后台，也保证到点后 2.4s 内一定显示 */
  r.hard = setTimeout(() => gooFinish(r), Math.max(0, t0 - performance.now()) + GOO.dur + 1200);
  gooRunning.push(r);
  gooActive.set(el, r);
  gooPlanned.add(el);
  if (!gooTicking) { gooTicking = true; requestAnimationFrame(gooTick); }
}

/* 全站共享一条时间线：谁进入视口就排到队尾，相邻两条间隔 GOO.stagger */
function gooSchedule(list) {
  const now = performance.now();
  if (gooTimeline < now) gooTimeline = now;
  if (gooTimeline - now > 1400) gooTimeline = now + GOO.startDelay; // 积压过久就重排，避免文字迟迟不出现
  for (const el of list) {
    const t0 = Math.max(now + GOO.startDelay, gooTimeline);
    gooTimeline = t0 + GOO.stagger;
    gooStart(el, t0);
  }
}

/* 收集"自带文本的叶子节点"：有直接文本子节点的元素即为一行/一段，取其整体，不再往下钻 */
function gooCollect() {
  const out = [];
  const visit = el => {
    if (!(el instanceof Element) || el.matches(GOO_SKIP)) return;
    if (el.closest('.nav-overlay,.image-lightbox,.award-video-preview,.experiment-hover-preview,.award-preview')) return;
    for (const node of el.childNodes) {
      if (node.nodeType === 3 && node.nodeValue.trim()) { out.push(el); return; }
    }
    for (const child of el.children) visit(child);
  };
  document.querySelectorAll('main,.site-header,.site-footer').forEach(visit);
  return out.filter(el => {
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1;
  });
}

function gooReset() {
  if (gooIO) { gooIO.disconnect(); gooIO = null; }
  if (gooWatchdog) { clearInterval(gooWatchdog); gooWatchdog = 0; }
  gooTimers.forEach(clearTimeout);
  gooTimers.length = 0;
  for (const r of gooRunning) gooFinish(r);
  gooRunning.length = 0;
  gooPlanned = new WeakSet();
  gooActive = new WeakMap();
  gooTicking = false;
  gooTimeline = 0;
  document.querySelectorAll('.goo-pending').forEach(el => el.classList.remove('goo-pending'));
  document.getElementById('goo-defs')?.replaceChildren();
  /* 图片凝聚动画：停掉观察、还原内联样式 */
  if (gooMediaIO) { gooMediaIO.disconnect(); gooMediaIO = null; }
  gooMediaRuns.forEach(r => { r.dead = true; clearTimeout(r.timer); r.el.style.filter = ''; r.el.style.opacity = ''; r.filter.remove(); });
  gooMediaRuns.length = 0;
}

/* 一次性观察：进场播放一次后不再重置（下滑首次出现时播，之后永久可见）。 */

function gooInit() {
  gooReset();
  if (!GOO_ENABLED) return;
  if (path() === '/info') return;                 // 环幕页文字不做凝聚动画
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (path() === '/editor') return;
  const units = gooCollect();
  if (!units.length) return;
  units.forEach(el => el.classList.add('goo-pending'));
  gooIO = new IntersectionObserver(entries => {
    const hit = [];
    for (const e of entries) {
      if (!e.isIntersecting) continue;     // 离场不再处理：已播过的保持可见
      const r = gooActive.get(e.target);
      if (r && !r.done) continue;          // 播放中/排队中，跳过
      gooIO.unobserve(e.target);           // 只在下滑首次出现时播一次
      hit.push(e.target);
    }
    if (!hit.length) return;
    hit.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    gooSchedule(hit);
  }, { threshold: 0 });
  units.forEach(el => gooIO.observe(el));
  /* 看门狗：每 1.5s 检查一次，视口内既没排上队也没在播的 pending 直接放行。
     只救"IO 没触发"的极端情况，不会提前打断正在排队的动画。 */
  gooWatchdog = setInterval(() => {
    let stuck = false;
    document.querySelectorAll('.goo-pending').forEach(el => {
      if (gooPlanned.has(el)) return;
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight && r.height > 0) { el.classList.remove('goo-pending'); stuck = true; }
    });
    if (stuck) console.warn('[goo] watchdog revealed stuck pending text');
  }, 1500);
  gooTimers.push(gooWatchdog);
  gooMediaInit();
}

/* ===== 图片（data-goo="media"）：复用同一套 goo 凝聚 —— 模糊+alpha 阈值+淡入 ===== */
const gooMediaRuns = [];
let gooMediaIO = null;

function gooMediaReveal(el, delay = 0) {
  if (gooMediaRuns.some(r => r.el === el && !r.dead)) return;   // 正在播，不重复触发
  el.dataset.gooPlayed = '1';
  const rect = el.getBoundingClientRect();
  const sd = Math.min(70, Math.max(16, Math.min(rect.width, rect.height) * .2));
  const { filter, blur, cm } = gooMakeFilter(sd);
  const run = { el, filter, dead: false };
  gooMediaRuns.push(run);
  /* 同组图标按 data-goo-delay 依次进场（与文字 90ms 的行间隔同节奏） */
  const start = () => {
    if (run.dead) return;
    el.style.filter = `url(#${filter.id})`;
    el.style.opacity = '0';
    const t0 = performance.now(), dur = GOO.dur * 1.2;
    const tick = now => {
      if (run.dead) return;
      const p = Math.min(1, (now - t0) / dur);
      const q = gooOut(p);
      blur.setAttribute('stdDeviation', (sd * (1 - q)).toFixed(2));
      const mp = Math.min(1, Math.max(0, (q - .58) / .42));
      cm.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${(GOO.amp + (1 - GOO.amp) * mp).toFixed(3)} ${(GOO.off + (0 - GOO.off) * mp).toFixed(3)}`);
      el.style.opacity = String(Math.min(1, q / .5).toFixed(3));
      if (p < 1) requestAnimationFrame(tick);
      else {
        filter.remove(); el.style.filter = ''; el.style.opacity = ''; run.dead = true;
        /* 播完时若已滚出视口：重新隐身，等下次进视口再播 */
        if (el.dataset.gooIn === '1') el.classList.add('is-revealed');
        else { el.classList.remove('is-revealed'); el.style.opacity = '0'; }
      }
    };
    requestAnimationFrame(tick);
  };
  if (delay > 0) run.timer = setTimeout(start, delay);
  else start();
}

function gooMediaInit() {
  const media = [...document.querySelectorAll('[data-goo="media"]')];
  if (!media.length) return;
  if (!GOO_ENABLED || path() === '/info' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    media.forEach(el => el.classList.add('is-revealed'));
    return;
  }
  /* 与文字一致：离场重新隐身，进场重新播（每次滑入都触发） */
  gooMediaIO = new IntersectionObserver(entries => {
    for (const e of entries) {
      const el = e.target;
      el.dataset.gooIn = e.isIntersecting ? '1' : '0';
      const running = gooMediaRuns.some(r => r.el === el && !r.dead);
      if (e.isIntersecting) { if (!running) gooMediaReveal(el, +el.dataset.gooDelay || 0); }
      else if (!running) { el.classList.remove('is-revealed'); el.style.opacity = '0'; }
    }
  }, { threshold: 0 });
  media.forEach(el => gooMediaIO.observe(el));
}

/* 内容来源：本地编辑器 API → 静态 site-content.json（GitHub Pages 等纯静态托管走这条）→ 内置种子。 */
async function initialize(){
  const apply=data=>{if(!data)return;profile=data.profile||profile;projects=data.projects||projects;awards=data.awards||awards;experiments=data.experiments||experiments};
  try{const response=await fetch('api/content');if(response.ok)apply(await response.json())}catch{}
  try{const response=await fetch('src/site-content.json');if(response.ok)apply(await response.json())}catch{}
  render();
}
initialize();
