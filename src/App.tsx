import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Activity, Aperture, ChevronRight, Crosshair, Github, Globe2, Menu, Play, Radio, Send, SlidersHorizontal, Terminal, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    eyebrow: 'Geospatial intelligence / 2024',
    title: 'Read the ground\nbetween the lines.',
    emphasis: 'ground',
    description: 'A field console that turns noisy satellite, sensor, and human reports into a shared operating picture. Built for the thirty seconds before a decision.',
    tags: ['Python', 'H3 indexing', 'WebGL', 'Human-in-loop'],
    route: '/field',
    kind: 'geo',
  },
  {
    number: '02',
    eyebrow: 'Adaptive learning / 2023',
    title: 'A curriculum\nthat notices.',
    emphasis: 'notices.',
    description: 'A learning environment that models what a person can do, not just what they have clicked. Every next exercise is earned by evidence.',
    tags: ['TypeScript', 'Knowledge graphs', 'Item response', 'Local-first'],
    route: '/learn',
    kind: 'learn',
  },
  {
    number: '03',
    eyebrow: 'Generative media / 2022',
    title: 'Make the machine\nhold a frame.',
    emphasis: 'frame.',
    description: 'A visual laboratory for directing generative systems with rhythm, reference, and restraint. Less prompt box, more edit suite.',
    tags: ['Diffusion', 'Motion design', 'ControlNet', 'Creative tools'],
    route: '/studio',
    kind: 'studio',
  },
];

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`nf-reveal-scroll ${className}`}>{children}</div>;
}

function Logo() {
  return (
    <Link href="/" className="nf-logo" data-testid="link-logo">
      <span className="nf-logo-mark">NF</span>
      <span>NEURAL FIELD</span>
    </Link>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`nf-nav ${open ? 'mobile-open' : ''}`} data-testid="navigation-main">
      <Logo />
      <div className="nf-nav-links">
        <a href="#work" data-testid="link-work">Selected work</a>
        <a href="#method" data-testid="link-method">Method</a>
        <a href="#contact" className="nf-nav-cta" data-testid="link-contact">Start a conversation <ArrowUpRight size={13} /></a>
      </div>
      <button className="nf-menu" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-menu">
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="nf-hero" data-testid="section-hero">
      <div className="nf-hero-grid" />
      <div className="nf-container nf-hero-inner">
        <div>
          <div className="nf-kicker nf-mono"><span>Independent AI systems engineer</span><span>—</span><span>SF / Remote</span></div>
          <h1>Systems with<br /><em>something</em><br />to say.</h1>
          <p className="nf-hero-deck">I design and ship intelligent tools for people working at the edge of what is known. Fifteen years turning research-shaped ideas into things you can actually use.</p>
          <div className="nf-hero-actions">
            <a href="#work" className="nf-button" data-testid="button-explore-work">Explore the work <ArrowDown size={15} /></a>
            <a href="#contact" className="nf-button secondary" data-testid="button-contact-hero">Get in touch <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="nf-hero-note" data-testid="display-field-note">
          <div className="nf-note-head">
            <span className="nf-mono">FIELD NOTE / 041</span>
            <Activity size={17} />
          </div>
          <div className="nf-orbit">
            <div className="nf-orbit-ring" />
            <div className="nf-orbit-ring two" />
            <div className="nf-orbit-dot" />
            <div className="nf-orbit-core">BUILD / OBSERVE</div>
          </div>
          <div className="nf-note-footer">
            <div className="nf-note-metric"><span className="nf-mono nf-note-label">Years in the loop</span><strong>15</strong></div>
            <div className="nf-note-metric"><span className="nf-mono nf-note-label">Current state</span><strong>CURIOUS</strong></div>
          </div>
        </div>
      </div>
      <div className="nf-scroll nf-mono"><span>Scroll to inspect</span><ArrowDown size={13} /></div>
    </section>
  );
}

function Statement() {
  return (
    <section className="nf-statement" id="method" data-testid="section-method">
      <div className="nf-container nf-statement-inner">
        <div className="nf-section-label nf-mono">01 / Point of view</div>
        <div>
          <h2>Useful intelligence is not a magic trick. It is <em>good instrumentation</em> plus a human who knows what to ask.</h2>
          <div className="nf-statement-copy">
            <p><strong>I care about the seams.</strong><br />The handoff between a model and a map. The moment a confidence score becomes a choice. The controls that make a complex system feel legible without sanding off its edge.</p>
            <p>My work lives where product design, applied research, and production engineering overlap. I prototype in public, measure what matters, and keep a small distance from the hype cycle.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === 'geo') {
    return (
      <div className="nf-project-visual nf-geo-visual" data-testid="visual-project-field">
        <div className="nf-map-lines" />
        <span className="nf-signal a" /><span className="nf-signal b" /><span className="nf-signal c" />
        <span className="nf-mono" style={{ position: 'absolute', left: 18, top: 16, color: 'rgba(218,255,95,.7)' }}>LIVE / WEST COAST</span>
      </div>
    );
  }
  if (kind === 'learn') {
    return (
      <div className="nf-project-visual nf-learn-visual" data-testid="visual-project-learn">
        <div className="nf-learn-window">
          <span className="nf-mono">PATH / 03 — ACTIVE</span>
          <h4>Distributed systems, without the fog.</h4>
          <div className="nf-progress"><i /></div>
          <div className="nf-learn-foot"><span>68% explored</span><span>12 min left</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className="nf-project-visual nf-studio-visual" data-testid="visual-project-studio">
      <div className="nf-studio-frame"><div className="nf-studio-play"><span><Play size={17} fill="currentColor" /></span></div></div>
      <span className="nf-mono" style={{ position: 'absolute', left: 18, bottom: 16, color: 'rgba(245,223,202,.66)' }}>SEQUENCE / 04 — 00:12</span>
    </div>
  );
}

function Work() {
  return (
    <section className="nf-work" id="work" data-testid="section-work">
      <div className="nf-container">
        <div className="nf-work-head">
          <div><div className="nf-mono" style={{ color: 'hsl(var(--accent))' }}>02 / Selected systems</div><h2>Things I put<br /><span className="nf-serif">through their paces.</span></h2></div>
          <p>Three working studies, built to be opened, poked, and disagreed with. The details are the point.</p>
        </div>
        {projects.map((project) => (
          <Reveal key={project.number}>
          <article className="nf-project" data-testid={`card-project-${project.number}`}>
            <div className="nf-project-meta"><span className="nf-project-number">{project.number}</span><small className="nf-mono">{project.eyebrow}</small></div>
            <div className="nf-project-body">
              <div>
                <h3>{project.title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line.includes(project.emphasis) ? <span>{line}</span> : line}</span>)}</h3>
                <p className="nf-project-desc">{project.description}</p>
                <div className="nf-tags">{project.tags.map((tag) => <span className="nf-tag" key={tag}>{tag}</span>)}</div>
                <Link className="nf-project-link" href={project.route} data-testid={`link-demo-${project.number}`}>Open the working study <ArrowRight size={15} /></Link>
              </div>
              <Link href={project.route} data-testid={`link-visual-${project.number}`}><ProjectVisual kind={project.kind} /></Link>
            </div>
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="nf-principles" data-testid="section-principles">
      <div className="nf-container">
        <div className="nf-principles-head"><div><div className="nf-mono">03 / Working principles</div><h2>Keep the<br />signal.</h2></div><p>I am not interested in adding intelligence as a decorative layer. The system should earn its place in the room.</p></div>
        <div className="nf-principle-grid">
          <div className="nf-principle"><b>01</b><h3>Instrument before automating.</h3><p>First make the invisible observable. Then decide which parts deserve a model.</p></div>
          <div className="nf-principle"><b>02</b><h3>Make uncertainty visible.</h3><p>Confidence is not a footnote. It is part of the interface and part of the decision.</p></div>
          <div className="nf-principle"><b>03</b><h3>Leave a handle for the human.</h3><p>Good tools create leverage without creating dependency. Every system needs an override.</p></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="nf-contact" id="contact" data-testid="section-contact">
      <div className="nf-container nf-contact-inner">
        <div><div className="nf-mono" style={{ color: 'hsl(var(--accent))' }}>04 / Contact</div><h2>Let's make<br /><em>the next tool.</em></h2></div>
        <div>
          <p className="nf-contact-copy">Have a hard problem, a half-formed system, or a map with too many layers? I like starting there. Tell me what the current version gets wrong.</p>
          <div className="nf-contact-links">
            <a className="nf-contact-link" href="mailto:hello@neuralfield.engineer" data-testid="link-email">hello@neuralfield.engineer <Send size={14} /></a>
            <a className="nf-contact-link" href="https://github.com/yaksharth/neural-field-portfolio" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={14} /> GitHub / neural-field-portfolio</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="nf-container nf-footer" data-testid="footer-main"><span className="nf-mono">Neural Field / Independent practice</span><span className="nf-mono">Built slowly. Shipped often. © 2025</span></footer>;
}

function Home() {
  return <div className="nf-page"><SiteNav /><main><Hero /><Statement /><Work /><Principles /><Contact /></main><Footer /></div>;
}

function DemoShell({ children, section, label, title, description }: { children: ReactNode; section: string; label: string; title: ReactNode; description: string }) {
  return (
    <div className="nf-demo-shell">
      <div className="nf-container">
        <div className="nf-demo-nav">
          <Link href="/" className="nf-demo-back nf-mono" data-testid="link-back-home"><ArrowLeft size={14} /> Back to Neural Field</Link>
          <span className="nf-demo-brand nf-mono">Neural Field / {section}</span>
        </div>
        <div className="nf-demo-title">
          <div><span className="nf-mono" style={{ color: 'hsl(var(--primary))' }}>{label}</span><h1>{title}</h1></div>
          <p>{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

const fieldPoints = [
  { id: 'A-17', name: 'Bay fringe', x: '32%', y: '34%', confidence: '0.91', note: 'Thermal anomaly, 14 min persistence' },
  { id: 'C-04', name: 'Transit corridor', x: '60%', y: '51%', confidence: '0.78', note: 'Pattern shift across 3 passes' },
  { id: 'R-22', name: 'Ridge line', x: '74%', y: '40%', confidence: '0.64', note: 'Low-light movement signature' },
];

function FieldDemo() {
  const [mode, setMode] = useState('heat');
  const [region, setRegion] = useState('West Coast');
  const [selected, setSelected] = useState(fieldPoints[0]);
  return (
    <DemoShell section="01" label="Geospatial intelligence / working study" title={<>Read the <em>ground.</em></>} description="A console for combining imperfect signals without pretending they are certainty. Select a region, change the layer, inspect a point.">
      <div className="nf-console" data-testid="demo-field-console">
        <div className="nf-console-bar"><div className="nf-console-dots"><i /><i /><i /></div><span className="nf-mono">FIELD_CONSOLE / LOCAL SIMULATION</span><span className="nf-mono"><Radio size={12} style={{ verticalAlign: 'middle' }} /> connected</span></div>
        <div className="nf-console-layout">
          <aside className="nf-console-sidebar">
            <h4 className="nf-mono">Region</h4>
            {['West Coast', 'North Sea', 'Baltic Grid'].map((item) => <button className={`nf-control ${region === item ? 'active' : ''}`} onClick={() => setRegion(item)} key={item} data-testid={`button-region-${item.toLowerCase().replaceAll(' ', '-')}`}><Globe2 size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} />{item}</button>)}
            <h4 className="nf-mono" style={{ marginTop: 30 }}>Layers</h4>
            <button className={`nf-control ${mode === 'heat' ? 'active' : ''}`} onClick={() => setMode('heat')} data-testid="button-layer-heat"><Activity size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} />Anomaly field</button>
            <button className={`nf-control ${mode === 'signals' ? 'active' : ''}`} onClick={() => setMode('signals')} data-testid="button-layer-signals"><Crosshair size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} />Signal traces</button>
            <div style={{ marginTop: 28, color: 'rgba(237,240,222,.48)' }} className="nf-mono"><SlidersHorizontal size={12} style={{ verticalAlign: 'middle', marginRight: 7 }} /> 3 sources aligned</div>
          </aside>
          <div className={`nf-console-main ${mode === 'signals' ? 'signals-on' : ''}`}>
            <div className="nf-demo-map" data-testid="display-field-map">
              <div className="nf-map-coast" />
              <div className="nf-map-hud"><div className="nf-hud-chip"><span className="nf-mono">Active region</span><strong>{region}</strong></div><div className="nf-hud-chip"><span className="nf-mono">Model confidence</span><strong>{selected.confidence}</strong></div></div>
              {fieldPoints.map((point) => <button key={point.id} className={`nf-map-point ${selected.id === point.id ? 'selected' : ''}`} style={{ left: point.x, top: point.y }} onClick={() => setSelected(point)} aria-label={`Inspect ${point.name}`} data-testid={`button-map-point-${point.id}`} />)}
              <div className="nf-map-tooltip" style={{ left: `calc(${selected.x} - 42px)`, top: `calc(${selected.y} + 30px)` }} data-testid="display-selected-signal"><strong>{selected.id} / {selected.name}</strong><span>{selected.note}</span></div>
              <div className="nf-mono" style={{ position: 'absolute', bottom: 18, left: 20, color: 'rgba(237,240,222,.48)' }}>37.7749° N &nbsp; 122.4194° W &nbsp; / &nbsp; 14:32:08 UTC</div>
            </div>
          </div>
        </div>
      </div>
      <div className="nf-demo-lower">
        <div className="nf-info-block"><span className="nf-mono" style={{ color: 'hsl(var(--primary))' }}>The premise</span><h3>Maps are arguments.</h3><p>Field is a study in making model output inspectable. Spatial indexing keeps the system fast; the interface keeps it honest.</p></div>
        <div className="nf-data-list"><div className="nf-data-card"><span>Ingest latency</span><strong>240ms</strong></div><div className="nf-data-card"><span>Sources in view</span><strong>03 / 03</strong></div><div className="nf-data-card"><span>False positive rate</span><strong>4.8%</strong></div></div>
      </div>
    </DemoShell>
  );
}

const modules = [
  { title: 'Systems thinking', time: '12 min / active' },
  { title: 'Distributed systems', time: '28 min / next' },
  { title: 'Model evaluation', time: '41 min / locked' },
];

function LearnDemo() {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const handleCheck = () => setFeedback(answer.trim().toLowerCase().includes('queue') ? 'Correct. The queue is the boundary.' : 'Close. Look for the component that absorbs bursts.');
  return (
    <DemoShell section="02" label="Adaptive learning / working study" title={<>A curriculum that <em>notices.</em></>} description="A local-first learning space that adapts to evidence of understanding. Choose a module, answer the exercise, and watch the path respond.">
      <div className="nf-learn-app" data-testid="demo-learn-app">
        <aside className="nf-learn-side">
          <div className="nf-mono" style={{ color: 'hsl(var(--accent))' }}>PATH / ENGINEERING</div>
          <h3>Good systems<br />stay curious.</h3>
          <p>Three threads, one evolving path. Your recent answers shape what comes next.</p>
          <div style={{ marginTop: 18 }}>{modules.map((module, index) => <button key={module.title} className={`nf-module ${active === index ? 'active' : ''}`} onClick={() => { setActive(index); setFeedback(''); }} data-testid={`button-module-${index}`}><b>{module.title}</b><span>{module.time}</span></button>)}</div>
        </aside>
        <section className="nf-learn-main">
          <div className="nf-learn-main-head"><div><span className="nf-mono">Current thread / {active + 1} of 3</span><h2>Read the<br /><em>boundary.</em></h2></div><div className="nf-learn-stat">MASTERY<strong>{active === 0 ? '68%' : active === 1 ? '32%' : '08%'}</strong></div></div>
          <div className="nf-lesson">
            <div className="nf-lesson-label">EXERCISE {active + 4} / DIAGNOSTIC</div>
            <h3>{active === 0 ? 'Where does pressure go?' : active === 1 ? 'What survives a restart?' : 'What would you measure first?'}</h3>
            <p>{active === 0 ? 'A service receives ten times its usual traffic. Latency rises, but the database is healthy. Name the component you would inspect first.' : active === 1 ? 'A worker crashes midway through a job. Which property tells you the work can continue safely?' : 'Two model versions look identical on accuracy. Name one measurement that could still change the release decision.'}</p>
            <div className="nf-exercise">
              <header><span>SHORT ANSWER</span><span>+ 12 XP</span></header>
              <code>{active === 0 ? 'traffic → [ ? ] → service → database' : active === 1 ? 'job_started → [ ? ] → job_finished' : 'accuracy = 0.91  /  [ ? ] = release signal'}</code>
              <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Type your reasoning, not just the noun." data-testid="input-learning-answer" />
              <button className="nf-learn-button" onClick={handleCheck} data-testid="button-check-answer">Check my thinking <ChevronRight size={13} style={{ verticalAlign: 'middle' }} /></button>
              <div className="nf-feedback" data-testid="status-learning-feedback">{feedback}</div>
            </div>
          </div>
        </section>
      </div>
    </DemoShell>
  );
}

const styles = ['Tactile grain', 'Night bloom', 'Archive light', 'Signal wash'];

function StudioDemo() {
  const [style, setStyle] = useState(styles[0]);
  const [prompt, setPrompt] = useState('A machine learning lab after everyone has gone home; indicator lights, wet pavement, one unresolved question.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [frame, setFrame] = useState(4);
  const generate = () => {
    setIsGenerating(true);
    window.setTimeout(() => { setIsGenerating(false); setFrame((value) => value === 24 ? 4 : value + 4); }, 900);
  };
  return (
    <DemoShell section="03" label="Generative media / working study" title={<>Make it hold a <em>frame.</em></>} description="A creative control surface for directing generative media with rhythm, reference, and restraint. Edit the prompt, choose a treatment, render a new frame.">
      <div className="nf-studio-app" data-testid="demo-studio-app">
        <div className="nf-studio-toolbar"><strong><Aperture size={15} style={{ verticalAlign: 'middle', marginRight: 8, color: 'hsl(var(--primary))' }} />STILL / MOVING</strong><span className="nf-mono">SEQUENCE 04 — {isGenerating ? 'RENDERING' : 'READY'}</span><span className="nf-mono"><Terminal size={12} style={{ verticalAlign: 'middle' }} /> local pipeline</span></div>
        <div className="nf-studio-workspace">
          <aside className="nf-studio-controls">
            <label className="nf-mono">Director's note</label>
            <textarea className="nf-prompt" rows={6} value={prompt} onChange={(event) => setPrompt(event.target.value)} data-testid="input-studio-prompt" />
            <label className="nf-mono" style={{ marginTop: 21 }}>Treatment</label>
            <div className="nf-style-list">{styles.map((item) => <button className={`nf-style ${style === item ? 'active' : ''}`} onClick={() => setStyle(item)} key={item} data-testid={`button-style-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div>
            <button className="nf-generate" onClick={generate} disabled={isGenerating} data-testid="button-generate-frame">{isGenerating ? 'Rendering frame…' : 'Render next frame'} <ArrowRight size={13} style={{ verticalAlign: 'middle' }} /></button>
          </aside>
          <div className="nf-studio-canvas" data-testid="display-studio-canvas">
            <div className="nf-canvas-caption">{style.toUpperCase()} / GUIDANCE 0.74 / SEED 49012</div>
            <div className={`nf-canvas-image ${isGenerating ? 'is-generating' : ''}`}><div className="nf-canvas-caption" style={{ top: 'auto', bottom: 14, left: 18 }}>PROMPT // {prompt.slice(0, 54)}{prompt.length > 54 ? '…' : ''}</div></div>
            <div className="nf-timeline">{Array.from({ length: 6 }).map((_, index) => <i className={index < frame / 4 ? 'active' : ''} key={index} />)}</div>
          </div>
        </div>
      </div>
      <div className="nf-demo-lower">
        <div className="nf-info-block"><span className="nf-mono" style={{ color: 'hsl(var(--primary))' }}>The premise</span><h3>Prompting is blocking.</h3><p>Studio treats generation as a sequence, not a slot machine. Direction, versioning, and the good old delete key all belong in the loop.</p></div>
        <div className="nf-data-list"><div className="nf-data-card"><span>Current treatment</span><strong>{style}</strong></div><div className="nf-data-card"><span>Frames in sequence</span><strong>{frame} / 24</strong></div><div className="nf-data-card"><span>Human edits</span><strong>07</strong></div></div>
      </div>
    </DemoShell>
  );
}

function Router() {
  return (
    <ErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/field" component={FieldDemo} />
        <Route path="/learn" component={LearnDemo} />
        <Route path="/studio" component={StudioDemo} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary><Router /></RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;