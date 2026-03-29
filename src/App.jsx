import { useState, useEffect } from "react";

// ── DATA ──────────────────────────────────────────────
const DATA = {
name: "Nguyễn Hồng Phúc",
role: "Frontend Developer",
school: "Đại học công nghệ thành phố Hồ Chí Minh (Hutech)",
location: "TP. Hồ Chí Minh",
email: "Phucnhtvh@gmail.com",
github: "https://github.com/Procffux",
facebook: "https://www.facebook.com/nguyen.hong.phuc.199864",
bio: [
"Mình là sinh viên ngành Công nghệ Thông tin tại Trường Đại học Công nghệ TP.HCM (HUTECH), định hướng phát triển Frontend với mong muốn tạo ra những sản phẩm web không chỉ đẹp mà còn mang lại trải nghiệm người dùng tốt và giá trị thực tiễn. Mình có nền tảng về HTML, CSS, JavaScript và đang học thêm các framework hiện đại khác để nâng cao khả năng xây dựng giao diện linh hoạt, tối ưu hiệu năng. Bên cạnh đó, mình cũng chú trọng đến UI/UX, đảm bảo sản phẩm không chỉ thẩm mỹ mà còn rõ ràng, dễ sử dụng và thân thiện với người dùng. Trong quá trình học tập, mình đã tham gia các dự án nhóm đã giúp mình rèn luyện kỹ năng làm việc nhóm, tư duy logic và giải quyết vấn đề. Mình luôn chủ động học hỏi, cập nhật công nghệ mới và sẵn sàng tiếp nhận thử thách để phát triển bản thân. Hiện tại, mình đang tìm kiếm cơ hội thực tập hoặc tham gia các dự án thực tế để tích lũy kinh nghiệm và đóng góp giá trị cho đội nhóm. Mình tin rằng một giao diện tốt không chỉ cần đẹp mà còn phải rõ ràng, nhanh và dễ tiếp cận.",
],
skills: [
{ name: "FRONTEND", tags: ["HTML5", "CSS3", "JavaScript", "Responsive"], color: "blue" },
{ name: "BACKEND ", tags: ["C#", "MySQL", "REST API"], color: "blue" },
{ name: "TOOLS", tags: ["Git", "GitHub", "VS Code"], color: "blue" },
{ name: "UX/UI", tags: ["Bootstrap", "Tailwind CSS"], color: "blue" },
{ name: "LEARNING", tags: ["ReactJS", "Node.js", "TypeScript"], color: "blue" },
{ name: "AI TOOLS", tags: ["Germini", "Chatgpt", "Claude"], color: "blue" },
],
projects: [
{
emoji: "📚",
name: "Website Bán Sách Trực Tuyến",
desc: "Nền tảng thương mại điện tử cho phép người dùng tìm kiếm và xem chi tiết từng đầu sách, thêm vào giỏ hàng và thực hiện thanh toán trực tuyến.",
tags: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
},
{
emoji: "💼",
name: "Website Tuyển Dụng Việc Làm",
desc: "Hệ thống đa vai trò: ứng viên tạo hồ sơ và nộp CV, nhà tuyển dụng đăng tin và quản lý hồ sơ, quản trị viên kiểm duyệt và xem thống kê.",
tags: ["HTML/CSS", "JavaScript", "C#", "SQL Server"],
},
],
};

// ── STYLES ────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
background: var(--bg); color: var(--ink);
font-family: 'Inter', system-ui, sans-serif;
font-size: 16px; line-height: 1.7;
-webkit-font-smoothing: antialiased;
}

:root {
/* Bảng màu Gỗ (Wood Theme) */
--bg: #d7bfa6; /* Màu nền gỗ sáng (Birch/Oak) */
--white: #eaddd0; /* Màu gỗ nhạt hơn cho các thẻ/card */
--ink: #2c1a0b; /* Chữ màu nâu đen (Walnut) */
--ink2: #4a2f18; /* Chữ màu nâu vừa */
--muted: #846046; /* Chữ màu nâu nhạt/trầm */
--border: #c6a687; /* Viền màu gỗ */
--border2: #ad8a68; /* Viền màu gỗ đậm hơn */
--accent: #8b4a20; /* Màu nhấn (Mahogany) */
--accent-light: #e6c8b3; /* Nền nhấn sáng */
--accent-mid: #6e3814; /* Màu nhấn đậm */
--serif: 'Playfair Display', Georgia, serif;
}

/* NAV */
.nav {
position: fixed; top: 0; left: 0; right: 0; z-index: 100;
display: flex; align-items: center; justify-content: space-between;
padding: 0 2.5rem; height: 60px;
background: rgba(215, 191, 166, 0.9); backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
}
.nav-logo { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; color: var(--ink); }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { font-size: 13.5px; color: var(--muted); text-decoration: none; transition: color .2s; }
.nav-links a:hover { color: var(--ink); }
.nav-cta {
display: inline-flex; align-items: center; gap: 6px;
font-size: 13px; font-weight: 500;
background: var(--ink); color: var(--white);
padding: 6px 16px; border-radius: 100px; text-decoration: none;
transition: background .2s, transform .15s;
}
.nav-cta:hover { background: var(--accent); transform: translateY(-1px); }

/* HERO */
.hero {
min-height: 100vh; display: flex; align-items: center;
padding: 6rem 2.5rem 5rem; max-width: 1100px; margin: 0 auto;
}
.hero-inner {
display: grid; grid-template-columns: 1fr auto;
gap: 4rem; align-items: center; width: 100%;
}
.hero-label {
display: inline-flex; align-items: center; gap: 8px;
font-size: 12px; font-weight: 500; color: var(--accent);
background: var(--accent-light); border: 1px solid var(--border2);
padding: 4px 12px; border-radius: 100px; margin-bottom: 1.5rem;
}
.dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: blink 2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
.hero-name {
font-family: var(--serif); font-size: clamp(3rem,5.5vw,4.8rem);
line-height: 1.15; letter-spacing: -.01em; margin-bottom: .75rem;
font-weight: 600;
}
.hero-name em { font-style: italic; color: var(--accent); }
.hero-sub { font-size: 1rem; color: var(--muted); font-weight: 400; margin-bottom: 1.75rem; }
.hero-desc { font-size: 1.05rem; color: var(--ink2); max-width: 480px; line-height: 1.75; font-weight: 300; margin-bottom: 2.5rem; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: .7rem 1.5rem; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all .2s; border: none; cursor: pointer; font-family: 'Inter', sans-serif; }
.btn-dark { background: var(--ink); color: var(--white); }
.btn-dark:hover { background: var(--accent); transform: translateY(-2px); }
.btn-ghost { background: transparent; color: var(--ink2); border: 1px solid var(--border2); }
.btn-ghost:hover { border-color: var(--ink); background: var(--white); transform: translateY(-2px); }
.hero-avatar {
width: 220px; height: 280px; border-radius: 16px;
background: linear-gradient(160deg, var(--white) 0%, var(--bg) 100%);
border: 1px solid var(--border);
display: flex; flex-direction: column; align-items: center; justify-content: center;
gap: 8px; flex-shrink: 0; overflow: hidden;
}
.hero-scroll { margin-top: 4rem; display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--muted); }
.scroll-line { width: 40px; height: 1px; background: var(--border2); }

/* SECTIONS */
.section { padding: 6rem 0; }
.wrapper { max-width: 1100px; margin: 0 auto; padding: 0 2.5rem; }
.divider { height: 1px; background: var(--border); margin: 0 2.5rem; }
.section-head { margin-bottom: 3.5rem; }
.section-num { font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: .12em; text-transform: uppercase; margin-bottom: .5rem; }
.section-title { font-family: var(--serif); font-size: clamp(1.8rem,3vw,2.6rem); line-height: 1.25; font-weight: 600; letter-spacing: -.01em; }
.section-title em { font-style: italic; color: var(--accent); }
.section-note { font-size: .9rem; color: var(--muted); margin-top: .5rem; font-weight: 300; }

/* ABOUT */
.about-section { background: var(--white); }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.about-text p { color: var(--ink2); margin-bottom: 1.1rem; font-weight: 300; font-size: 1rem; line-height: 1.8; }
.about-cards { display: flex; flex-direction: column; gap: 12px; }
.about-card { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 1.1rem 1.25rem; display: flex; align-items: flex-start; gap: 14px; }
.about-card-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
.about-card-label { font-size: 11px; color: var(--muted); font-weight: 500; text-transform: uppercase; letter-spacing: .08em; }
.about-card-val { font-size: 14px; color: var(--ink); font-weight: 500; margin-top: 2px; }

/* SKILLS */
.skills-section { background: var(--bg); }
.skills-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
.skill-card { background: var(--white); border: 1px solid var(--border); border-radius: 10px; padding: 1.5rem; transition: border-color .2s, box-shadow .2s; }
.skill-card:hover { border-color: var(--border2); box-shadow: 0 4px 20px rgba(44,26,11,.08); }
.skill-icon { font-size: 1.5rem; margin-bottom: .75rem; }
.skill-name { font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: .75rem; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { font-size: 11.5px; font-weight: 500; padding: 3px 10px; border-radius: 5px; }
.tag-green { background: var(--accent-light); color: var(--accent); border: 1px solid var(--border2); }
.tag-blue { background: #d7bfa6; color: #4a2f18; border: 1px solid var(--border2); }
.tag-gray { background: #eaddd0; color: #846046; border: 1px solid var(--border); }

/* PROJECTS */
.projects-section { background: var(--white); }
.projects-list { display: flex; flex-direction: column; gap: 1.5rem; }
.project-card {
background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
padding: 2rem 2.25rem; display: grid; grid-template-columns: 1fr auto;
gap: 2rem; align-items: start;
transition: border-color .2s, transform .2s;
position: relative; overflow: hidden;
}
.project-card::before {
content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
background: linear-gradient(to bottom, var(--accent), var(--accent-mid));
border-radius: 3px 0 0 3px; opacity: 0; transition: opacity .2s;
}
.project-card:hover { border-color: var(--border2); transform: translateX(3px); }
.project-card:hover::before { opacity: 1; }
.project-emoji { font-size: 2rem; margin-bottom: .75rem; }
.project-name { font-family: var(--serif); font-weight: 600; font-size: 1.35rem; letter-spacing: -.01em; margin-bottom: .5rem; }
.project-desc { color: var(--ink2); font-size: .9rem; line-height: 1.7; font-weight: 300; margin-bottom: 1.25rem; max-width: 560px; }
.project-stack { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1rem; }
.project-links { display: flex; gap: 10px; }
.project-link { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; font-weight: 500; color: var(--muted); text-decoration: none; padding: 5px 12px; border: 1px solid var(--border); border-radius: 6px; transition: all .15s; }
.project-link:hover { color: var(--accent); border-color: var(--border2); background: var(--accent-light); }
.project-num { font-family: var(--serif); font-style: italic; font-weight: 600; font-size: 3.5rem; color: var(--border2); line-height: 1; flex-shrink: 0; user-select: none; }

/* CONTACT */
.contact-section { background: var(--bg); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.contact-text p { color: var(--ink2); font-weight: 300; font-size: 1rem; line-height: 1.8; margin-bottom: 2rem; }
.contact-socials { display: flex; flex-direction: column; gap: 10px; }
.social-link { display: flex; align-items: center; gap: 12px; padding: .75rem 1rem; background: var(--white); border: 1px solid var(--border); border-radius: 8px; text-decoration: none; color: var(--ink2); font-size: 13.5px; transition: all .2s; }
.social-link:hover { border-color: var(--border2); color: var(--ink); transform: translateX(4px); }
.social-icon { width: 32px; height: 32px; border-radius: 6px; background: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.social-sub { font-size: 11px; color: var(--muted); margin-top: 1px; }
.form { display: flex; flex-direction: column; gap: 14px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-label { font-size: 12.5px; font-weight: 500; color: var(--ink2); }
.form-input, .form-textarea { width: 100%; padding: .7rem 1rem; background: var(--white); color: var(--ink); border: 1px solid var(--border); border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif; transition: border-color .2s, box-shadow .2s; outline: none; resize: none; }
.form-input:focus, .form-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(139, 74, 32, 0.15); }
.form-textarea { height: 120px; line-height: 1.6; }
.form-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--ink); color: var(--white); padding: .8rem 2rem; border-radius: 8px; font-size: 14px; font-weight: 500; font-family: 'Inter', sans-serif; border: none; cursor: pointer; transition: all .2s; }
.form-btn:hover { background: var(--accent); transform: translateY(-2px); }

/* FOOTER */
footer { border-top: 1px solid var(--border); padding: 2rem 2.5rem; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--muted); background: var(--bg); }
footer a { color: var(--muted); text-decoration: none; }
footer a:hover { color: var(--accent); }

/* FADE */
.fade { opacity: 0; transform: translateY(18px); transition: opacity .55s ease, transform .55s ease; }
.fade.visible { opacity: 1; transform: none; }

/* RESPONSIVE */
@media(max-width:768px) {
.nav { padding: 0 1.25rem; }
.nav-links { display: none; }
.wrapper { padding: 0 1.25rem; }
.divider { margin: 0 1.25rem; }
.hero { padding: 5rem 1.25rem 4rem; }
.hero-inner { grid-template-columns: 1fr; }
.hero-avatar { display: none; }
.about-grid, .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
.skills-grid { grid-template-columns: 1fr 1fr; }
.project-card { grid-template-columns: 1fr; }
.project-num { display: none; }
footer { flex-direction: column; gap: 8px; text-align: center; }
}
@media(max-width:480px) { .skills-grid { grid-template-columns: 1fr; } }
`;

// ── HOOKS ─────────────────────────────────────────────
function useFadeIn() {
useEffect(() => {
const obs = new IntersectionObserver(
(entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
{ threshold: 0.1 }
);
document.querySelectorAll(".fade").forEach((el) => obs.observe(el));
return () => obs.disconnect();
}, []);
}

// ── COMPONENTS ────────────────────────────────────────
function Navbar() {
return (
<nav className="nav">
<span className="nav-logo">Nguyễn Hồng Phúc</span>
<ul className="nav-links">
{["about", "skills", "projects", "contact"].map((s) => (
<li key={s}><a href={`#${s}`}>{s === "about" ? "Giới thiệu" : s === "skills" ? "Kỹ năng" : s === "projects" ? "Dự án" : "Liên hệ"}</a></li>
))}
</ul>
<a href={`mailto:${DATA.email}`} className="nav-cta">Liên hệ →</a>
</nav>
);
}

function Hero() {
return (
<div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 2.5rem" }}>
<section className="hero" style={{ paddingLeft: 0, paddingRight: 0 }}>
<div className="hero-inner">
<div>
<h1 className="hero-name">Xin chào, tôi là<br /><em>Nguyễn Hồng Phúc</em></h1>
<p className="hero-sub">Frontend Developer</p>
<p className="hero-desc">Mình đam mê xây dựng giao diện web đẹp, dễ dùng và có ý nghĩa. Đang học hỏi từng ngày và luôn tìm cơ hội phát triển kỹ năng thực chiến.</p>
<div className="hero-actions">
<a href="#projects" className="btn btn-dark">Xem dự án →</a>
<a href="#contact" className="btn btn-ghost">Liên hệ</a>
</div>
</div>
<div className="hero-avatar">
<img
src="/avatar.jpg"
alt="Nguyễn Hồng Phúc"
style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>
</div>
</div>
</section>
</div>
);
}

function About() {
return (
<section id="about" className="section about-section">
<div className="wrapper">
<div className="section-head fade">
<p className="section-num">01 — Giới thiệu</p>
<h2 className="section-title">Xin chào, tôi là <em>Nguyễn Hồng Phúc</em></h2>
<p className="section-note">Sinh viên IT đam mê giao diện và trải nghiệm người dùng</p>
</div>
<div className="about-grid">
<div className="about-text fade">
{DATA.bio.map((p, i) => <p key={i}>{p}</p>)}
</div>
<div className="about-cards fade">
{[
{ icon: "🎓", label: "Trường học", val: DATA.school },
{ icon: "📍", label: "Vị trí", val: DATA.location },
{ icon: "🎯", label: "Định hướng", val: "Frontend Developer" },
{ icon: "📬", label: "Email", val: DATA.email },
].map((c) => (
<div className="about-card" key={c.label}>
<div className="about-card-icon">{c.icon}</div>
<div>
<div className="about-card-label">{c.label}</div>
<div className="about-card-val">{c.val}</div>
</div>
</div>
))}
<div className="about-card">
<a href={DATA.github} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
github.com/Procffux →
</a>
</div>
</div>
</div>
</div>
</section>
);
}

function Skills() {
const colorMap = { green: "tag-green", blue: "tag-blue", gray: "tag-gray" };
return (
<section id="skills" className="section skills-section">
<div className="wrapper">
<div className="section-head fade">
<p className="section-num">02 — Kỹ năng</p>
<h2 className="section-title">Skills</h2>
<p className="section-note">Những công nghệ mình đang học và áp dụng vào dự án</p>
</div>
<div className="skills-grid">
{DATA.skills.map((s) => (
<div className="skill-card fade" key={s.name}>
<div className="skill-icon">{s.icon}</div>
<div className="skill-name">{s.name}</div>
<div className="skill-tags">
{s.tags.map((t) => <span key={t} className={`tag ${colorMap[s.color]}`}>{t}</span>)}
</div>
</div>
))}
</div>
</div>
</section>
);
}

function Projects() {
return (
<section id="projects" className="section projects-section">
<div className="wrapper">
<div className="section-head fade">
<p className="section-num">03 — Dự án</p>
<h2 className="section-title">Những gì tôi đã xây dựng</h2>
<p className="section-note">Các dự án thực tế mình hoàn thành trong quá trình học</p>
</div>
<div className="projects-list">
{DATA.projects.map((p, i) => (
<div className="project-card fade" key={p.name}>
<div>
<div className="project-emoji">{p.emoji}</div>
<h3 className="project-name">{p.name}</h3>
<p className="project-desc">{p.desc}</p>
<div className="project-stack">
{p.tags.map((t) => <span key={t} className="tag tag-green">{t}</span>)}
</div>
</div>
<div className="project-num">0{i + 1}</div>
</div>
))}
</div>
</div>
</section>
);
}

function Contact() {
const [form, setForm] = useState({ name: "", email: "", msg: "" });
const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });
const handleSubmit = () => {
if (!form.name || !form.msg) { alert("Vui lòng điền tên và lời nhắn!"); return; }
const subject = encodeURIComponent(`[Portfolio] Lời nhắn từ ${form.name}`);
const body = encodeURIComponent(`Tên: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`);
window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
};
return (
<section id="contact" className="section contact-section">
<div className="wrapper">
<div className="section-head fade">
<p className="section-num">04 — Liên hệ</p>
<h2 className="section-title">Hãy liên hệ với tôi</h2>
<p className="section-note">Mình luôn sẵn sàng trò chuyện, hợp tác và học hỏi cùng nhau</p>
</div>
<div className="contact-grid">
<div className="contact-text fade">
<div className="contact-socials">
{[
{ href: `mailto:${DATA.email}`, icon: "📧", label: DATA.email, sub: "Email — phản hồi trong 24h" },
{ href: DATA.github, icon: "🐙", label: "github.com/Procffux", sub: "Xem source code các dự án" },
{ href: DATA.facebook, icon: "📘", label: "Nguyễn Hồng Phúc", sub: "Facebook — nhắn tin trực tiếp" },
].map((s) => (
<a key={s.icon} href={s.href} target="_blank" rel="noreferrer" className="social-link">
<div className="social-icon">{s.icon}</div>
<div><div>{s.label}</div><div className="social-sub">{s.sub}</div></div>
</a>
))}
</div>
</div>
<div className="fade">
<div className="form">
{[
{ id: "name", label: "Tên của bạn", type: "input", placeholder: "Nguyễn Văn A" },
{ id: "email", label: "Email", type: "input", placeholder: "your@email.com" },
{ id: "msg", label: "Lời nhắn", type: "textarea", placeholder: "Chào Phúc, mình muốn..." },
].map((f) => (
<div className="form-group" key={f.id}>
<label className="form-label">{f.label}</label>
{f.type === "textarea"
? <textarea id={f.id} className="form-textarea" placeholder={f.placeholder} value={form[f.id]} onChange={handleChange} />
: <input id={f.id} className="form-input" type="text" placeholder={f.placeholder} value={form[f.id]} onChange={handleChange} />}
</div>
))}
<button className="form-btn" onClick={handleSubmit}>Gửi lời nhắn →</button>
</div>
</div>
</div>
</div>
</section>
);
}

// ── APP ───────────────────────────────────────────────
export default function App() {
useFadeIn();
return (
<>
<style>{css}</style>
<Navbar />
<Hero />
<div className="divider" />
<About />
<div className="divider" />
<Skills />
<div className="divider" />
<Projects />
<div className="divider" />
<Contact />
<footer>
<span>© 2026 Nguyễn Hồng Phúc</span>
</footer>
</>
)
}