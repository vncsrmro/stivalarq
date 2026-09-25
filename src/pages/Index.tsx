import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Plus, Minus, X, Pause, Play } from 'lucide-react';
import { contact, media, projects, services, type MediaSlot } from '@/data/stival';
import { ProjectTypePicker } from '@/components/ProjectTypePicker';
import '@/styles/stival.css';

const logoLight = '/brand/logo-marfim.svg';
const logoDark = '/brand/logo-petroleo.svg';
const manifesto = 'Projetar para a saúde é compreender que cada espaço faz parte de uma vida.';
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
function Symbol({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 120 108" fill="currentColor" aria-hidden="true"><path d="M0 0h120v28H32v38H0zM42 40h78v68H82V66H42zM0 77h57v31H0z" /></svg>;
}
function Picture({ name, alt = '', className = '', eager = false }: { name: string; alt?: string; className?: string; eager?: boolean }) {
  return <img className={className} src={`/media/${name}-1600.webp`} srcSet={`/media/${name}-800.webp 800w, /media/${name}-1600.webp 1600w${name === 'hero' ? ', /media/hero-2200.webp 2200w' : ''}`} sizes="(max-width: 700px) 100vw, 85vw" alt={alt} loading={eager ? 'eager' : 'lazy'} {...{ fetchpriority: eager ? 'high' : 'auto' }} decoding="async" />;
}
function Film({ slot, paused, className = '', onReady, onProgress }: { slot: MediaSlot; paused: boolean; className?: string; onReady?: () => void; onProgress?: (seconds: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [near, setNear] = useState(slot === media.hero);
  const [visible, setVisible] = useState(slot === media.hero);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const preload = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setNear(true); }, { rootMargin: '300px' });
    const observer = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting));
    preload.observe(host.current); observer.observe(host.current);
    return () => { preload.disconnect(); observer.disconnect(); };
  }, []);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const sync = () => {
      if (paused || !visible || document.hidden) el.pause();
      else el.play().catch(() => { setPlaying(false); onReady?.(); });
    };
    sync(); document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, [paused, visible, near, onReady]);
  return <div ref={host} className={`film ${className}`}>
    <img src={slot.poster} alt="" loading={slot === media.hero ? 'eager' : 'lazy'} onLoad={() => { if (paused) onReady?.(); }} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = `/media/${slot.image}-1600.webp`; onReady?.(); }} />
    {near && slot.video && !failed && <video ref={video} className={playing ? 'is-playing' : ''} muted loop playsInline preload={paused ? 'none' : 'auto'} autoPlay={!paused && visible} poster={slot.poster} onLoadedData={onReady} onTimeUpdate={e => onProgress?.(e.currentTarget.currentTime)} onPlaying={() => { setPlaying(true); onReady?.(); }} onError={e => { if (e.target === e.currentTarget) { setFailed(true); onReady?.(); } }} aria-hidden="true">
      <source src={slot.mobile} type="video/webm" media="(max-width: 700px)" />
      <source src={slot.mobileFallback} type="video/mp4" media="(max-width: 700px)" />
      <source src={slot.video} type="video/webm" /><source src={slot.fallback} type="video/mp4" />
    </video>}
  </div>;
}

function BrandLoader({ mediaReady, onReveal }: { mediaReady: boolean; onReveal: () => void }) {
  const [minimum, setMinimum] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [exit, setExit] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let active = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const min = window.setTimeout(() => setMinimum(true), reduced ? 0 : 1300);
    const limit = window.setTimeout(() => setExit(true), 5000);
    document.fonts.ready.then(() => { if (active) setFontsReady(true); });
    return () => { active = false; clearTimeout(min); clearTimeout(limit); };
  }, []);
  useEffect(() => { if (minimum && fontsReady && mediaReady) setExit(true); }, [minimum, fontsReady, mediaReady]);
  useEffect(() => {
    if (!exit) return;
    onReveal();
    const timer = window.setTimeout(() => setGone(true), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1100);
    return () => clearTimeout(timer);
  }, [exit, onReveal]);
  useEffect(() => {
    if (gone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [gone]);
  if (gone) return null;
  return <div className={`brand-loader ${exit ? 'is-exiting' : ''}`} aria-label="Carregando Stival" role="status">
    <div className="loader-panel loader-panel-left" /><div className="loader-panel loader-panel-right" />
    <div className="loader-guide loader-guide-left" /><div className="loader-guide loader-guide-center" /><div className="loader-guide loader-guide-right" />
    <div className="loader-brand"><Symbol /><span>STIVAL</span><p>ARQUITETURA PARA A SAÚDE</p></div>
    <div className="loader-bottom"><span>ESPAÇO, PROPÓSITO E VIDA</span><button onClick={() => setExit(true)}>Entrar no site <ArrowUpRight size={14} /></button></div>
  </div>;
}

export default function Index() {
  const root = useRef<HTMLDivElement>(null);
  const projectSection = useRef<HTMLElement>(null);
  const projectTrack = useRef<HTMLDivElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [service, setService] = useState<number | null>(0);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [conceptPhase, setConceptPhase] = useState(0);
  const onHeroReady = useCallback(() => setHeroReady(true), []);
  const revealSite = useCallback(() => setReady(true), []);
  const [contactLink, setContactLink] = useState('');
  const [projectType, setProjectType] = useState('');
  const [typeError, setTypeError] = useState(false);
  const typeButton = useRef<HTMLButtonElement>(null);
  const reduced = systemReduced || paused;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSystemReduced(mq.matches);
    sync(); mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    el.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame = 0;
    const el = root.current;
    const manifestoEl = el?.querySelector<HTMLElement>('.manifesto');
    const interlude = el?.querySelector<HTMLElement>('.interlude');
    const onFrame = () => {
      frame = 0;
      if (!el) return;
      const h = window.innerHeight, y = window.scrollY;
      setScrolled(y > 60);
      el.style.setProperty('--hero-y', `${reduced ? 0 : Math.min(y * .26, h * .3)}px`);
      el.style.setProperty('--hero-scale', `${reduced ? 1 : 1.045 + Math.min(y / h, 1) * .055}`);
      if (manifestoEl) {
        const r = manifestoEl.getBoundingClientRect();
        el.style.setProperty('--read', `${reduced ? 1.4 : clamp((h * .85 - r.top) / (h * .64), 0, 1.4)}`);
      }
      if (projectSection.current && projectTrack.current) {
        const r = projectSection.current.getBoundingClientRect();
        const p = window.innerWidth > 900 && !reduced ? clamp(-r.top / Math.max(r.height - h, 1)) : 0;
        const distance = Math.max(projectTrack.current.scrollWidth - window.innerWidth, 0);
        projectTrack.current.style.transform = `translate3d(${-p * distance}px,0,0)`;
        setActiveProject(Math.min(2, Math.round(p * 2)));
        el.style.setProperty('--project-progress', `${p}`);
      }
      if (interlude) {
        const r = interlude.getBoundingClientRect();
        el.style.setProperty('--interlude-y', `${reduced ? 0 : clamp((h - r.top) / (h + r.height)) * 90 - 45}px`);
      }
      el.style.setProperty('--page-progress', `${y / Math.max(document.documentElement.scrollHeight - h, 1)}`);
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(onFrame); };
    window.addEventListener('scroll', request, { passive: true }); window.addEventListener('resize', request); request();
    return () => { window.removeEventListener('scroll', request); window.removeEventListener('resize', request); cancelAnimationFrame(frame); };
  }, [reduced]);
  useEffect(() => { if (menuOpen) menuDialog.current?.showModal(); else menuDialog.current?.close(); }, [menuOpen]);
  useEffect(() => { if (project !== null) projectDialog.current?.showModal(); else projectDialog.current?.close(); }, [project]);
  useEffect(() => {
    if (!menuOpen && project === null) return;
    const original = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, [menuOpen, project]);
  function goProject(index: number) {
    const target = projectSection.current;
    if (!target) return;
    if (reduced || window.innerWidth <= 900) target.querySelectorAll('.project-card')[index]?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + ((target.offsetHeight - window.innerHeight) * index / 2), behavior: 'smooth' });
  }
  function openProject(index: number) { setSlide(0); setProject(index); }
  function composeContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!projectType) { setTypeError(true); typeButton.current?.focus(); typeButton.current?.click(); return; }
    const data = new FormData(e.currentTarget);
    const message = `Olá, Gustavo! Sou ${String(data.get('name')).trim()}.\nTenho interesse em ${data.get('type')}.\n${String(data.get('message')).trim()}`;
    setContactLink(`${contact.whatsapp}?text=${encodeURIComponent(message)}`);
  }
  const current = project === null ? null : projects[project];

  return <div ref={root} className={`stival-site ${ready ? 'is-ready' : ''} ${reduced ? 'reduce-motion' : ''}`}>
    <BrandLoader mediaReady={heroReady} onReveal={revealSite} />
    <div className="site-content" {...(!ready ? { inert: '' } : {})}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#inicio" aria-label="Stival — início" className="header-logo"><img src={logoLight} alt="stival" width="436" height="108" /></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#visao">O olhar</a><a href="#projetos">Projetos</a><a href="#especialidade">Especialidade</a><a href="#sobre">O arquiteto</a></nav>
      <div className="header-actions"><a href="#contato" className="header-contact">Vamos conversar <ArrowUpRight size={16} /></a><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir menu" aria-haspopup="dialog"><span /><span /></button></div><div className="reading-progress" />
    </header>
    <main id="conteudo">
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <Film slot={media.hero} paused={reduced} className="hero-film" onReady={onHeroReady} /><div className="hero-shade" />
        <div className="hero-topline"><span>ARQUITETURA PARA A SAÚDE</span><span>GUSTAVO STIVAL · BRASIL</span></div>
        <div className="hero-content"><p className="eyebrow hero-kicker"><span className="tiny-square" /> ESPAÇO, PROPÓSITO E VIDA</p><h1 id="hero-title"><span className="line-mask"><span>Arquitetura que</span></span><span className="line-mask"><span>cuida de pessoas<span className="hero-period">.</span></span></span></h1><div className="hero-bottom"><p>Precisão nas decisões.<br />Sensibilidade em cada espaço.</p><a className="text-link light" href="#projetos">Explore nossos projetos <ArrowDownRight size={23} /></a></div></div>
        <div className="hero-foot"><a href="#visao" className="scroll-cue"><span className="scroll-line" /> ROLE PARA DESCOBRIR</a><span className="image-caption">STIVAL · VISUALIZAÇÕES DE PROJETOS</span><button className="motion-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Retomar animações' : 'Pausar animações'}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
      </section>
      <section className="manifesto section-pad" id="visao" aria-labelledby="manifesto-title">
        <div className="section-rail" data-reveal><span className="eyebrow">01 / NOSSO OLHAR</span><Symbol /><span className="eyebrow">A FORMA DO CUIDADO</span></div>
        <h2 id="manifesto-title" className="manifesto-text">{manifesto.split(' ').map((word, i, words) => <span key={i} className="manifesto-word" style={{ '--word': i / words.length } as CSSProperties}>{word} </span>)}</h2>
        <div className="manifesto-bottom" data-reveal><span className="small-index">(ST)</span><p>Conectamos arquitetura, operação e experiência humana. Um olhar especializado para transformar necessidades complexas em ambientes claros, funcionais e acolhedores.</p><a href="#especialidade" className="text-link">Conheça a nossa atuação <ArrowUpRight size={20} /></a></div>
      </section>
      <section className="project-section" id="projetos" ref={projectSection} aria-labelledby="projects-title"><div className="project-sticky">
        <div className="project-heading"><div><p className="eyebrow">02 / PROJETOS SELECIONADOS</p><h2 id="projects-title">O cuidado ganha forma<span>.</span></h2></div><div className="project-controls"><span className="project-count">0{activeProject + 1}<span> / 03</span></span><button onClick={() => goProject(Math.max(0, activeProject - 1))} aria-label="Projeto anterior" disabled={activeProject === 0 && !reduced}><ArrowLeft size={20} /></button><button onClick={() => goProject(Math.min(2, activeProject + 1))} aria-label="Próximo projeto" disabled={activeProject === 2 && !reduced}><ArrowRight size={20} /></button></div></div>
        <div className="project-window"><div ref={projectTrack} className="project-track">{projects.map((item, i) => <article className="project-card" key={item.id}><button className="project-image-button" onClick={() => openProject(i)} aria-label={`Ver projeto: ${item.name}`}><Picture name={item.image} alt={item.alt} /><div className="project-image-shade" /><div className="project-image-top"><span>{item.category}</span><span>{item.number} / 03</span></div><h3>{item.title.split('\n').map((line, n) => <span key={n}>{line}</span>)}</h3><span className="project-open">Explorar projeto <ArrowUpRight size={20} /></span><span className="project-round"><ArrowUpRight /></span></button><div className="project-caption"><div><h4>{item.name}</h4><span>{item.client}</span></div><span>ESTUDO DE PROJETO / 3D</span></div></article>)}</div></div><div className="project-meter"><span /></div>
      </div></section>
      <section className="interlude" aria-labelledby="interlude-title"><Film slot={media.interlude} paused={reduced} onProgress={seconds => setConceptPhase(Math.min(3, Math.floor(seconds / 5)))} /><div className="interlude-shade" /><div className="interlude-copy" data-reveal><p className="eyebrow">TÉCNICA E SENSIBILIDADE, NO MESMO PROJETO.</p><h2 id="interlude-title">A escala é do projeto.<br />O olhar é humano.</h2><div className="interlude-action"><a className="circle-link" href="#especialidade" aria-label="Conheça a especialidade"><ArrowDown size={25} /></a><span>DA IDEIA AO ESPAÇO QUE CUIDA</span></div></div><div className="interlude-filmline" aria-hidden="true"><div className="interlude-phases">{['VISÃO', 'TRAÇO', 'MATÉRIA', 'ESPAÇO'].map((phase, index) => <span key={phase} className={conceptPhase === index ? 'is-current' : ''}><i />{String(index + 1).padStart(2, '0')} / {phase}</span>)}</div></div></section>
      <section className="expertise section-pad" id="especialidade" aria-labelledby="expertise-title"><div className="expertise-intro" data-reveal><p className="eyebrow">03 / ESPECIALIDADE</p><h2 id="expertise-title">Visão integrada.<br /><span>Decisões precisas.</span></h2><p>Do planejamento aos detalhes que fazem a diferença no cotidiano de um ambiente de saúde.</p></div><div className="expertise-layout"><div className="service-visual" data-reveal><Picture name={services[service ?? 0].image} alt={services[service ?? 0].alt} key={service ?? 0} /><span>IMAGEM CONCEITUAL · {services[service ?? 0].title.toUpperCase()}</span></div><div className="service-list">{services.map((item, i) => <div className={`service-row ${service === i ? 'is-open' : ''}`} key={item.title}><button aria-expanded={service === i} aria-controls={`service-${i}`} onClick={() => setService(service === i ? null : i)}><span className="service-number">0{i + 1}</span><h3>{item.title}</h3>{service === i ? <Minus size={20} /> : <Plus size={20} />}</button><div id={`service-${i}`} className="service-detail" hidden={service !== i}><p>{item.detail}</p><span>{item.tags}</span></div></div>)}</div></div></section>
      <section className="about section-pad" id="sobre" aria-labelledby="about-title"><div className="about-photo" data-reveal><div className="about-photo-frame"><img src="/media/gustavo-atual-1200.webp" srcSet="/media/gustavo-atual-600.webp 600w, /media/gustavo-atual-1200.webp 1122w" sizes="(max-width: 600px) calc(100vw - 64px), 42vw" alt="Retrato atualizado de Gustavo Stival, arquiteto e urbanista" loading="lazy" width="1122" height="1402" /></div><div className="about-photo-footer"><span>GUSTAVO STIVAL<br />ARQUITETO E URBANISTA</span><Symbol /></div></div><div className="about-copy" data-reveal><p className="eyebrow">04 / QUEM ESTÁ À FRENTE</p><h2 id="about-title">Um olhar atento.<br />Uma visão de<br /><em>conjunto.</em></h2><p>À frente do escritório, Gustavo Stival reúne sua trajetória em arquitetura e urbanismo à especialização em ambientes de saúde.</p><p>Da complexidade de um hospital à experiência de uma clínica, cada projeto parte da escuta e de uma compreensão cuidadosa de quem vai ocupar o espaço.</p><a className="text-link" href="#contato">Converse com o Gustavo <ArrowUpRight size={20} /></a></div></section>
      <section className="contact-section section-pad" id="contato" aria-labelledby="contact-title"><div className="contact-top" data-reveal><p className="eyebrow">05 / VAMOS CONSTRUIR O PRÓXIMO PASSO</p><Symbol /></div><div className="contact-grid"><div data-reveal><h2 id="contact-title">Seu próximo<br />projeto começa<br />com uma <em>conversa.</em></h2><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={19} /></a><a className="contact-phone" href={contact.whatsapp} target="_blank" rel="noreferrer">{contact.phone}</a></div><form className="contact-form" onSubmit={composeContact} onChange={() => setContactLink('')}><label htmlFor="contact-name">Como podemos chamar você?</label><input id="contact-name" name="name" placeholder="Seu nome" required maxLength={100} autoComplete="name" /><label htmlFor="contact-type">O que você está planejando?</label><ProjectTypePicker value={projectType} onChange={value => { setProjectType(value); setTypeError(false); setContactLink(''); }} invalid={typeError} buttonRef={typeButton} /><label htmlFor="contact-message">Conte um pouco sobre o projeto</label><textarea id="contact-message" name="message" placeholder="Local, necessidades, momento do projeto…" rows={2} maxLength={1500} required /><button className="submit-button" type="submit">Preparar conversa <ArrowUpRight size={20} /></button><p className="form-note">Sua mensagem será preparada para o WhatsApp. O envio é feito por você.</p>{contactLink && <div className="contact-result" role="status"><p>Mensagem pronta. Continue no WhatsApp para enviar.</p><a href={contactLink} target="_blank" rel="noreferrer">Abrir conversa <ArrowUpRight size={18} /></a></div>}</form></div></section>
    </main>
    <footer className="site-footer" aria-label="Rodapé">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="footer-brandmark" href="#inicio" aria-label="Stival, voltar ao início"><img src={logoDark} alt="stival" width="436" height="108" /></a>
          <p>Arquitetura para a saúde.</p>
          <span>Precisão para projetar.<br />Visão para cuidar.</span>
        </div>
        <nav className="footer-column" aria-label="Navegação do rodapé">
          <h2>Explore</h2>
          <a href="#visao">Nosso olhar</a><a href="#projetos">Projetos</a><a href="#especialidade">Especialidade</a><a href="#sobre">Gustavo Stival</a>
        </nav>
        <div className="footer-column footer-connect">
          <h2>Entre em contato</h2>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.whatsapp} target="_blank" rel="noreferrer">{contact.phone}</a>
          <a className="footer-social" href={contact.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>
        </div>
      </div>
      <div className="footer-legal"><p>© {new Date().getFullYear()} Stival. Todos os direitos reservados.</p><a href="#inicio">Voltar ao topo <ArrowUpRight size={15} /></a></div>
    </footer>
    <dialog ref={menuDialog} className="menu-dialog" onCancel={() => setMenuOpen(false)} onClick={e => { if (e.target === e.currentTarget) setMenuOpen(false); }} aria-labelledby="menu-title"><div className="menu-inner"><div className="menu-head"><img src={logoLight} alt="stival" width="180" /><button autoFocus onClick={() => setMenuOpen(false)} aria-label="Fechar menu"><X /></button></div><h2 id="menu-title" className="sr-only">Navegação</h2><nav aria-label="Menu expandido">{[['O olhar', 'visao'], ['Projetos', 'projetos'], ['Especialidade', 'especialidade'], ['O arquiteto', 'sobre'], ['Vamos conversar', 'contato']].map(([title, id], i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{title}<ArrowUpRight /></a>)}</nav><a className="menu-email" href={`mailto:${contact.email}`}>{contact.email}</a></div></dialog>
    <dialog ref={projectDialog} className="project-dialog" aria-labelledby="project-modal-title" onCancel={() => setProject(null)} onClick={e => { if (e.target === e.currentTarget) setProject(null); }} onKeyDown={e => { if (!current) return; if (e.key === 'ArrowRight') { e.preventDefault(); setSlide((slide + 1) % current.gallery.length); } if (e.key === 'ArrowLeft') { e.preventDefault(); setSlide((slide - 1 + current.gallery.length) % current.gallery.length); } }}>{current && <div className="project-dialog-inner"><div className="project-dialog-head"><p className="eyebrow">{current.client}</p><button autoFocus onClick={() => setProject(null)} aria-label="Fechar projeto"><X /></button></div><div className="gallery-image"><Picture name={current.gallery[slide]} alt={`${current.alt} — vista ${slide + 1}`} eager /><div className="gallery-buttons"><button onClick={() => setSlide((slide - 1 + current.gallery.length) % current.gallery.length)} aria-label="Imagem anterior"><ArrowLeft /></button><span aria-live="polite">{slide + 1} / {current.gallery.length}</span><button onClick={() => setSlide((slide + 1) % current.gallery.length)} aria-label="Próxima imagem"><ArrowRight /></button></div></div><div className="project-dialog-copy"><div><h2 id="project-modal-title">{current.name}</h2><span>{current.place} · Estudo de projeto / visualização 3D</span></div><p>{current.description}</p></div><a className="text-link" href="#contato" onClick={() => setProject(null)}>Conversar sobre um projeto <ArrowUpRight size={20} /></a></div>}</dialog>
    </div>
  </div>;
}

