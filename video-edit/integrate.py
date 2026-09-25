from pathlib import Path
p=Path('src/data/stival.ts');s=p.read_text(encoding='utf-8-sig');s=s.replace("// Add MP4/WebM paths here. Posters remain the fallback for loading and reduced motion.","// Edited loops. WebM preferred, MP4 fallback; mobile sources avoid the desktop download.")
s=s.replace("export const media = { hero: { image: 'hero', video: '' }, interlude: { image: 'enfermagem-2', video: '' } };", """export type MediaSlot = { image: string; video: string; fallback: string; mobile: string; mobileFallback: string; poster: string };
export const media: Record<'hero' | 'interlude', MediaSlot> = {
  hero: { image: 'hero', video: '/videos/hero.webm', fallback: '/videos/hero.mp4', mobile: '/videos/hero-mobile.webm', mobileFallback: '/videos/hero-mobile.mp4', poster: '/videos/hero-poster.webp' },
  interlude: { image: 'enfermagem-2', video: '/videos/interlude.webm', fallback: '/videos/interlude.mp4', mobile: '/videos/interlude-mobile.webm', mobileFallback: '/videos/interlude-mobile.mp4', poster: '/videos/interlude-poster.webp' },
};""");p.write_text(s,encoding='utf8')
p=Path('src/pages/Index.tsx');s=p.read_text(encoding='utf-8-sig').replace("services } from '@/data/stival'","services, type MediaSlot } from '@/data/stival'")
a=s.index('function Film(');b=s.index('\nexport default function Index()',a)
s=s[:a]+'''function Film({ slot, paused, className = '', onReady }: { slot: MediaSlot; paused: boolean; className?: string; onReady?: () => void }) {
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
    {near && slot.video && !failed && <video ref={video} className={playing ? 'is-playing' : ''} muted loop playsInline preload={paused ? 'none' : 'auto'} autoPlay={!paused && visible} poster={slot.poster} onLoadedData={onReady} onPlaying={() => { setPlaying(true); onReady?.(); }} onError={() => { setFailed(true); onReady?.(); }} aria-hidden="true">
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
    <div className="loader-brand"><Symbol /><span>STIVAL</span><p>ARQUITETURA & CONSULTORIA EM SAÚDE</p></div>
    <div className="loader-bottom"><span>ESPAÇO, PROPÓSITO E VIDA</span><button onClick={() => setExit(true)}>Entrar no site <ArrowUpRight size={14} /></button></div>
  </div>;
}
''' +s[b:]
s=s.replace('useEffect, useRef, useState,', 'useCallback, useEffect, useRef, useState,')
s=s.replace('const [systemReduced, setSystemReduced] = useState(false);',"const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);")
s=s.replace("const [ready, setReady] = useState(false);", "const [ready, setReady] = useState(false);\n  const [heroReady, setHeroReady] = useState(false);\n  const onHeroReady = useCallback(() => setHeroReady(true), []);\n  const revealSite = useCallback(() => setReady(true), []);")
s=s.replace('    const timer = window.setTimeout(() => setReady(true), 80);\n    return () => { observer.disconnect(); window.clearTimeout(timer); };','    return () => observer.disconnect();')
s=s.replace('<a className="skip-link"', '<BrandLoader mediaReady={heroReady} onReveal={revealSite} />\n    <div className="site-content" {...(!ready ? { inert: \'\' } : {})}>\n    <a className="skip-link"',1)
s=s.replace('paused={reduced} className="hero-film"','paused={reduced} className="hero-film" onReady={onHeroReady}')
s=s.replace('UNIMED AMERICANA · ESTUDO DE PROJETO','STIVAL · VISUALIZAÇÕES DE PROJETOS')
s=s.replace('POSTOS DE ENFERMAGEM · UNIMED AMERICANA','AMBIENTES DE SAÚDE · VISUALIZAÇÕES DE PROJETOS')
s=s.replace('  </div>;\n}', '  </div>;\n}',1)
# Closing site-content wrapper, only final return.
pos=s.rfind('  </div>;');s=s[:pos]+'    </div>\n'+s[pos:]
p.write_text(s,encoding='utf8')
