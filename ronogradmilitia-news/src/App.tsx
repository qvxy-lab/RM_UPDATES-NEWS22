import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check, ChevronDown, Info, Menu, Send, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

type TimelineEntry = {
  year: string;
  tools: string;
  description: string;
};

const timeline: TimelineEntry[] = [
  { year: '2019', tools: 'CapCut', description: 'My first steps into editing' },
  { year: '2020', tools: 'CapCut', description: 'Learning the basics and developing my editing style' },
  { year: '2021', tools: 'CapCut', description: 'More experience and more advanced edits' },
  { year: '2022', tools: 'CapCut', description: 'Improving my skills and experimenting with different techniques' },
  { year: '2023', tools: 'CapCut + Alight Motion', description: 'Started moving toward more advanced editing and effects' },
  { year: '2023', tools: 'Alight Motion', description: 'Focused mainly on Alight Motion and pushed my editing further' },
  { year: '2024', tools: 'Alight Motion + ibisPaint', description: 'Expanded from video editing into digital graphics and artwork' },
  { year: '2025', tools: 'Alight Motion', description: 'Continued improving my editing style and techniques' },
  { year: '2026', tools: 'Alight Motion + Node Video', description: 'Started experimenting with more advanced effects and motion editing' },
  { year: '2026', tools: 'Alight Motion + Node Video + After Effects', description: 'Added After Effects to my workflow and began working with professional editing tools' },
  { year: '2026', tools: 'After Effects', description: 'Focused heavily on After Effects and advanced compositing' },
  { year: '2026', tools: 'After Effects + Krita', description: 'Expanded into digital art and graphic design' },
  { year: '2026', tools: 'Krita', description: 'Focused on illustration and detailed digital artwork' },
  { year: '2026', tools: 'Krita + ibisPaint', description: 'Combined different art workflows and techniques' },
  { year: '2026', tools: 'Krita + ibisPaint + Alight Motion', description: 'Bringing together video editing, motion graphics and digital art into one workflow' },
];

const filters = ['All', 'CapCut', 'Alight Motion', 'ibisPaint', 'Node Video', 'After Effects', 'Krita'];

const navigation = [
  { label: 'Information', target: 'information' },
  { label: 'News', target: 'news' },
  { label: 'Archive', target: 'archive' },
  { label: 'Contact', target: 'contact' },
  { label: 'About', target: 'about' },
];

const leadership = [
  ['Leader', '@yyy'],
  ['2nd in Command', '@racermanp'],
  ['3rd in Command', '@aidenyt'],
  ['Head Moderator', '@kapek'],
  ['Moderator', '@j4ck'],
  ['Special Role Owner', '@xyz'],
  ['Special Role Owner', '@zyll'],
];

const serverDetails = [
  ['Name', 'Ronograd Militia [RM]'],
  ['Server ID', '1519721826081702110'],
  ['Owner', '@(neerd-0) yyy'],
  ['Members', '53'],
  ['Channels', '132'],
  ['Roles', '166'],
  ['Creation Date', '25 June 2026, 17:11'],
];

function scrollToSection(target: string, closeMenu?: () => void) {
  closeMenu?.();
  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Wordmark() {
  return <div className="wordmark"><span className="wordmark__block">R</span><span className="wordmark__text">Ronograd Militia News</span></div>;
}

function SiteHeader({ onNavigate, onMenu }: { onNavigate: (target: string) => void; onMenu: () => void }) {
  return (
    <header className="archive-header">
      <div className="site-frame archive-header__inner">
        <Wordmark />
        <nav className="main-nav" aria-label="Primary navigation">
          {navigation.map((item) => <button key={item.target} onClick={() => onNavigate(item.target)} data-testid={`link-nav-${item.target}`}>{item.label}</button>)}
        </nav>
        <button className="menu-toggle" onClick={onMenu} aria-label="Open menu" data-testid="button-menu"><Menu /></button>
      </div>
    </header>
  );
}

function MenuDrawer({ onClose, onNavigate }: { onClose: () => void; onNavigate: (target: string) => void }) {
  return (
    <>
      <button className="drawer-backdrop" aria-label="Close menu" onClick={onClose} data-testid="button-menu-backdrop" />
      <aside className="menu-drawer" aria-label="Menu drawer">
        <div className="menu-drawer__top"><Wordmark /><button className="menu-drawer__close" onClick={onClose} aria-label="Close menu" data-testid="button-close-menu"><X size={14} /></button></div>
        <div className="menu-drawer__nav">
          {navigation.map((item, index) => <button key={item.target} onClick={() => onNavigate(item.target)} data-testid={`drawer-link-${item.target}`}><span className="metadata">0{index + 1}</span> {item.label}</button>)}
        </div>
        <div className="menu-drawer__footer metadata"><span className="red-dot" /> Independent information office / RM / 2026</div>
      </aside>
    </>
  );
}

function Hero({ onNavigate }: { onNavigate: (target: string) => void }) {
  return (
    <section className="dossier-hero" id="information">
      <div className="hero-kicker metadata"><span>Independent information office</span><span>Vol. 00 — 2026</span></div>
      <h1 className="hero-title"><span>Ronograd</span><span>Militia</span><span className="accent">News</span></h1>
      <div className="hero-subline metadata"><span>Issue no. 0042</span><span className="hero-subline__center"><span className="red-dot" /> Signal active</span><span>Est. 2019</span></div>
      <div className="hero-visual" aria-label="Abstract archival signal visual">
        <div className="visual-grid" />
        <div className="visual-orbit" />
        <span className="visual-label visual-label--top">Restricted / Public record</span>
        <span className="visual-label visual-label--right">Field transposition<br />49° 10' N / 19° 20' E</span>
        <span className="visual-label visual-label--bottom">RM / creator dossier / 01</span>
        <span className="visual-label visual-label--center">Information / About / News</span>
        <div className="hero-visual__headline"><span>The signal</span><span>persists.</span></div>
      </div>
      <div className="hero-subline metadata"><span>Archive access: open</span><button className="signal-line" onClick={() => onNavigate('about')} data-testid="button-enter-dossier"><span className="red-dot" /> Open creator dossier <ArrowUpRight size={11} /></button><span>RM / 041</span></div>
    </section>
  );
}

function AboutSection({ onNavigate }: { onNavigate: (target: string) => void }) {
  return (
    <section className="intro-block" id="about">
      <div className="intro-block__heading"><span className="metadata">02 — About the creator</span><h2>About<br /><span>the</span><br />creator</h2></div>
      <div className="intro-block__copy">
        <p>I’m a graphic designer and editor with years of experience in video editing, motion graphics and digital art.</p>
        <p>My experience includes CapCut, Alight Motion, ibisPaint, Node Video, After Effects and Krita. In 2026 I began combining these tools to work across video editing, motion graphics, compositing and digital artwork.</p>
        <p>I’m constantly experimenting with new techniques, improving my skills and pushing my work further. What started as simple mobile editing has grown into a much broader creative workflow.</p>
        <button className="inline-link" onClick={() => onNavigate('archive')} data-testid="button-view-timeline">View the full timeline <ArrowUpRight size={13} /></button>
      </div>
    </section>
  );
}

function TimelineSection() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const visible = useMemo(() => timeline.filter((entry) => filter === 'All' || entry.tools.includes(filter)), [filter]);
  return (
    <section className="section-shell" id="archive">
      <div className="section-heading"><div><span className="metadata">03 — Development record</span><h2 className="section-title">My <span>timeline</span></h2></div><p>Every stage of the workflow, from first steps in mobile editing to a combined practice of motion and digital art.</p></div>
      <div className="timeline-filter" role="tablist" aria-label="Filter timeline by tool">
        {filters.map((item) => <button key={item} className={`filter-chip ${filter === item ? 'is-active' : ''}`} onClick={() => setFilter(item)} role="tab" aria-selected={filter === item} data-testid={`button-filter-${item}`}>{item}</button>)}
      </div>
      <div className="timeline">
        {visible.map((entry, index) => {
          const originalIndex = timeline.indexOf(entry);
          const isOpen = expanded === originalIndex;
          return <button className="timeline-row" key={`${entry.year}-${entry.tools}-${index}`} onClick={() => setExpanded(isOpen ? null : originalIndex)} aria-expanded={isOpen} data-testid={`timeline-entry-${originalIndex}`}>
            <span className="timeline-year">{entry.year}</span>
            <span className="timeline-info"><strong>{entry.tools}</strong><span>{entry.description}</span>{isOpen && <span className="details-reveal red">Record {String(originalIndex + 1).padStart(2, '0')} / Workflow development continued.</span>}</span>
            <span className="timeline-mark" />
          </button>;
        })}
      </div>
    </section>
  );
}

function NewsSection({ onOpenDossier }: { onOpenDossier: (id: string) => void }) {
  const cards = [
    { id: 'creator', number: '01', label: 'Creator file', title: 'Creative workflow', text: 'Video editing, motion graphics, compositing and digital artwork.' },
    { id: 'tools', number: '02', label: 'Tool index', title: 'The toolkit', text: 'CapCut / Alight Motion / ibisPaint / Node Video / After Effects / Krita.' },
    { id: 'rm', number: '03', label: 'Organization file', title: 'Ronograd Militia', text: 'A Discord-based organization established on 25 June 2026.' },
  ];
  return (
    <section className="section-shell" id="news">
      <div className="section-heading"><div><span className="metadata">04 — Information files</span><h2 className="section-title">Latest <span>files</span></h2></div><p>Selected records from the Ronograd Militia information office.</p></div>
      <div className="archive-cards">
        {cards.map((card) => <button key={card.id} className="archive-card" onClick={() => onOpenDossier(card.id)} data-testid={`button-dossier-${card.id}`}>
          <span className="archive-card__number"><span>{card.label}</span><b>FILE / {card.number}</b></span><h3>{card.title}</h3><p>{card.text}</p><span className="archive-card__arrow"><ArrowUpRight size={17} /></span>
        </button>)}
      </div>
    </section>
  );
}

function InformationSection() {
  const [leadershipOpen, setLeadershipOpen] = useState(true);
  const [serverOpen, setServerOpen] = useState(true);
  return (
    <section className="section-shell" id="organization">
      <div className="section-heading"><div><span className="metadata">05 — Organization file</span><h2 className="section-title">Ronograd <span>Militia</span></h2></div><p>Commonly abbreviated as RM. A Discord-based organization with a structured hierarchy.</p></div>
      <div className="insignia-reference">
        <div className="insignia-reference__visual">
          <img src="/rm-insignia-reference.png" alt="Ronograd Militia information and news insignia reference" />
          <span className="metadata insignia-reference__label">Visual record / RM insignia / 01</span>
        </div>
        <div className="insignia-reference__copy">
          <span className="metadata red">Insignia archive</span>
          <h3>The marks behind the signal.</h3>
          <p>The two symbols from the original Ronograd Militia information sheet are now part of the public record. Open the archive image to view the full reference.</p>
          <a className="inline-link" href="/rm-insignia-reference.png" target="_blank" rel="noreferrer">Open visual record <ArrowUpRight size={13} /></a>
        </div>
      </div>
      <div className="dossier-grid">
        <div className="dossier-panel">
          <div className="dossier-panel__head"><span className="metadata">Leadership and administration</span><button className={leadershipOpen ? 'open' : ''} onClick={() => setLeadershipOpen(!leadershipOpen)} data-testid="button-toggle-leadership">{leadershipOpen ? 'Collapse' : 'Expand'} <ChevronDown size={13} /></button></div>
          {leadershipOpen && <div className="dossier-panel__content details-reveal"><div className="role-list">{leadership.map(([position, holder]) => <div className="role-row" key={`${position}-${holder}`}><span>{position}</span><span>{holder}</span></div>)}</div><p className="metadata" style={{ margin: '20px 0 0', lineHeight: 1.6 }}>The Leader represents the highest-ranking authority. The 2nd in Command and 3rd in Command form the subsequent levels of senior leadership. Moderation responsibilities are delegated to the Head Moderator and Moderator.</p></div>}
        </div>
        <div className="dossier-panel">
          <div className="dossier-panel__head"><span className="metadata">Server information</span><button className={serverOpen ? 'open' : ''} onClick={() => setServerOpen(!serverOpen)} data-testid="button-toggle-server">{serverOpen ? 'Collapse' : 'Expand'} <ChevronDown size={13} /></button></div>
          {serverOpen && <div className="dossier-panel__content details-reveal"><table className="facts-table"><tbody>{serverDetails.map(([attribute, value]) => <tr key={attribute}><td>{attribute}</td><td className={attribute === 'Members' ? 'highlight' : ''}>{value}</td></tr>)}</tbody></table></div>}
        </div>
      </div>
      <div className="metadata" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 23 }}><Info size={12} className="red" /> The organization is centered around its Discord server, which serves as the primary platform for communication, administration, and community activity.</div>
    </section>
  );
}

function DossierOverlay({ dossier, onClose }: { dossier: string; onClose: () => void }) {
  const detail: Record<string, { label: string; title: string; copy: string }> = {
    creator: { label: 'Creator file / 01', title: 'Creative workflow', copy: 'What started as simple mobile editing has grown into a much broader creative workflow across video editing, motion graphics, compositing and digital artwork.' },
    tools: { label: 'Tool index / 02', title: 'The toolkit', copy: 'CapCut, Alight Motion, ibisPaint, Node Video, After Effects and Krita form the current working set. Each tool marks a stage of experimentation and skill development.' },
    rm: { label: 'Organization file / 03', title: 'Ronograd Militia', copy: 'Ronograd Militia, commonly abbreviated as RM, is a Discord-based organization established on 25 June 2026. The faction operates through a structured hierarchy consisting of senior command positions, moderation staff, and holders of special roles.' },
  };
  const selected = detail[dossier];
  if (!selected) return null;
  return <><button className="drawer-backdrop" onClick={onClose} aria-label="Close dossier" data-testid="button-dossier-backdrop" /><aside className="menu-drawer" data-testid="panel-dossier-detail"><div className="menu-drawer__top"><span className="metadata red">{selected.label}</span><button className="menu-drawer__close" onClick={onClose} aria-label="Close dossier" data-testid="button-close-dossier"><X size={14} /></button></div><div style={{ paddingTop: 68 }}><h2 style={{ margin: 0, font: '800 65px/.8 var(--app-font-display)', textTransform: 'uppercase' }}>{selected.title}</h2><p style={{ color: '#aaa9a1', fontSize: 14, lineHeight: 1.7, marginTop: 28 }}>{selected.copy}</p><span className="metadata" style={{ display: 'block', marginTop: 52, borderTop: '1px solid #44433d', paddingTop: 14 }}>Record verified / RM / 2026</span></div></aside></>;
}

function ContactSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  };
  return (
    <section className="contact-band" id="contact">
      <div className="contact-band__grid"><div><span className="metadata">06 — Open channel</span><h2>Stay<br /><span>informed.</span></h2><p>For updates from the information office, use the open channel. One message when there is something worth recording. No noise.</p></div><div className="contact-form">{submitted ? <div className="contact-success" data-testid="status-contact-success"><Check size={15} /> Signal received. You are on the list.</div> : <form onSubmit={submit}><label htmlFor="contact-email">Contact / newsletter address</label><div className="contact-form__row"><input id="contact-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="your@email.com" data-testid="input-contact-email" /><button type="submit" data-testid="button-contact-submit">Transmit <Send size={12} /></button></div><small>Local static form. Your address is not transmitted.</small></form>}</div></div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="site-footer__top"><div className="footer-mark">Ronograd Militia <span>News</span></div><div className="metadata">Independent information office<br />Creator dossier / issue 0042</div></div><div className="site-footer__bottom"><p>© 2026 Ronograd Militia News</p><p>Archive access: open <span className="red-dot" /></p></div></footer>;
}

function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dossier, setDossier] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const navigate = (target: string) => {
    setMenuOpen(false);
    if (target === 'archive') setLocation('/#archive');
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div className="app-shell">
      <SiteHeader onNavigate={navigate} onMenu={() => setMenuOpen(true)} />
      <main className="site-frame">
        <Hero onNavigate={navigate} />
        <AboutSection onNavigate={navigate} />
        <TimelineSection />
        <NewsSection onOpenDossier={setDossier} />
        <InformationSection />
        <ContactSection />
        <Footer />
      </main>
      {menuOpen && <MenuDrawer onClose={() => setMenuOpen(false)} onNavigate={navigate} />}
      {dossier && <DossierOverlay dossier={dossier} onClose={() => setDossier(null)} />}
    </div>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Switch><Route path="/" component={Page} /><Route component={NotFound} /></Switch></RoutedErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;