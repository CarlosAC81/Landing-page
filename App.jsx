/*
  Este arquivo contém toda a interface React da landing page.
  Ele funciona junto com index.html e styles.css, sem precisar de build.
*/

const { useEffect, useState } = React;

// Troque este número pelo WhatsApp real da profissional, usando o formato internacional.
const WHATSAPP_URL = "https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20terapia.";

// Troque pelo endereço real do perfil do Instagram.
const INSTAGRAM_URL = "https://instagram.com/seuusuario";

// Ícone em SVG do WhatsApp, mantido no próprio React para não depender de bibliotecas externas.
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.91c0 2.1.55 4.15 1.6 5.96L.08 24l6.28-1.65a11.9 11.9 0 0 0 5.71 1.45h.01c6.56 0 11.9-5.34 11.9-11.91 0-3.18-1.23-6.17-3.46-8.41ZM12.08 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.86 9.86 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.45-4.44 9.89-9.91 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

// Ícone simples do Instagram em SVG para o rodapé.
function InstagramIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Pequena seta reutilizada nos botões e links.
function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

// Rótulo visual usado no início das seções.
function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function App() {
  // Controla a abertura do menu em telas pequenas.
  const [menuOpen, setMenuOpen] = useState(false);

  // Controla qual pergunta do FAQ está aberta.
  const [openFaq, setOpenFaq] = useState(0);

  // Texto usado na animação de digitação do CTA do hero.
  const [typedText, setTypedText] = useState("");
  const typingText = "me chama no WhatsApp";

  // Executa a digitação uma vez quando o componente entra na tela.
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(typingText.slice(0, index));
      if (index === typingText.length) window.clearInterval(timer);
    }, 95);

    return () => window.clearInterval(timer);
  }, []);

  // Perguntas frequentes exibidas na seção de dúvidas.
  const faqItems = [
    "Como funciona a primeira sessão?",
    "Quanto tempo dura o processo terapêutico?",
    "A terapia online é para mim?",
    "Como agendo um horário?"
  ];

  // Fecha o menu mobile depois que a pessoa escolhe uma âncora.
  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      {/* Cabeçalho semântico para navegação e SEO. */}
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#top" aria-label="Clara Menezes, voltar ao início">Clara <span>Menezes</span></a>

          <nav className="main-nav" aria-label="Navegação principal">
            <a href="#sobre">Sobre mim</a>
            <a href="#atendimento">Abordagem e atendimentos</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>

          <a className="header-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar conversa ↗</a>

          <button className="menu-button" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-menu" aria-label="Navegação mobile">
            <a href="#sobre" onClick={closeMenu}>Sobre mim</a>
            <a href="#atendimento" onClick={closeMenu}>Abordagem e atendimentos</a>
            <a href="#duvidas" onClick={closeMenu}>Dúvidas</a>
            <a className="mobile-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar conversa</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero com um espaço SVG editável no lado direito. */}
        <section className="hero" aria-labelledby="hero-title">
          {/*
            ÁREA PARA INSERIR A IMAGEM SVG DO HERO:
            substitua o conteúdo deste <svg> pelo código SVG da sua imagem.
            Não use <img> aqui: cole diretamente o código <svg>...</svg>.
          */}
          <div className="hero-visual" aria-hidden="true">
            <svg className="hero-svg" viewBox="0 0 620 760" role="img" aria-label="Área reservada para imagem SVG">
              {/* Placeholder visual suave: pode ser removido ao inserir o SVG definitivo. */}
              <rect width="620" height="760" rx="36" fill="#D1E3EB" />
              <circle cx="450" cy="220" r="170" fill="#B4BE64" opacity=".35" />
              <circle cx="330" cy="510" r="220" fill="#FCEA96" opacity=".72" />
              <path d="M0 650C150 550 250 730 420 610s180-10 200-30v180H0Z" fill="#97B7E5" opacity=".55" />
            </svg>
          </div>

          <div className="container">
            <div className="hero-content">
              <p className="eyebrow">✦ Psicologia clínica</p>
              <h1 id="hero-title">Um espaço para <em>você</em> se escutar.</h1>
              <p className="hero-description">Terapia é um encontro cuidadoso com a sua própria história. Vamos construir, no seu tempo, caminhos mais leves e possíveis.</p>

              <div className="hero-actions">
                <a className="primary-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Quero começar <ArrowIcon /></a>
                <a className="whatsapp-type" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} /><span>{typedText}</span><span className="type-cursor" aria-hidden="true" /></a>
                <a className="secondary-link" href="#sobre">Conheça meu trabalho <ArrowIcon /></a>
              </div>

              <p className="hero-note">◉ Atendimento ético, sigiloso e acolhedor</p>
            </div>
          </div>
        </section>

        {/* Segunda seção: o vídeo fica logo no começo, antes do texto de apresentação. */}
        <section id="sobre" className="section section-video" aria-labelledby="sobre-title">
          <div className="container">
            <div className="video-heading">
              <SectionLabel>Conheça meu trabalho</SectionLabel>
              <h2>Um pouco sobre este <em>espaço.</em></h2>
            </div>

            {/*
              ÁREA PARA INSERIR VÍDEO DO YOUTUBE:
              troque VIDEO_ID pelo ID do vídeo, por exemplo: https://www.youtube.com/watch?v=ABC123 → ABC123.
              O arquivo video/README.txt no ZIP explica este ponto novamente.
            */}
            <div className="video-placeholder">
              <div className="video-placeholder-content">
                <span className="video-play">▶</span>
                <strong>Seu vídeo de apresentação</strong>
                <small>Substitua VIDEO_ID no iframe comentado no código</small>
              </div>
              {/* Quando tiver o vídeo, substitua o bloco acima por este iframe:
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Vídeo de apresentação da psicóloga"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              */}
            </div>

            <div className="section-grid video-text-grid">
              <div><SectionLabel>Sobre mim</SectionLabel><h2 id="sobre-title">A sua história merece ser <em>ouvida.</em></h2></div>
              <div className="section-copy">
                <p>Olá, eu sou Clara. Psicóloga clínica e especialista em Terapia Cognitivo-Comportamental. Acredito que olhar para dentro não precisa ser um caminho solitário — e que pequenas mudanças, feitas com cuidado, transformam a forma como vivemos.</p>
                <p>Meu trabalho é oferecer um lugar seguro, sem julgamentos e com escuta genuína, para que você possa compreender seus padrões, elaborar o que sente e encontrar novas possibilidades para o cotidiano.</p>
                <p className="professional-note"><strong>CRP 00/00000</strong> · Psicóloga clínica</p>
              </div>
            </div>
          </div>
        </section>

        {/* Abordagem e atendimento agora formam uma única seção. */}
        <section id="atendimento" className="section section-blue" aria-labelledby="atendimento-title">
          <div className="container section-grid">
            <div><SectionLabel>Abordagem e atendimentos</SectionLabel><h2 id="atendimento-title">Clareza para entender. <em>Cuidado</em> para transformar.</h2></div>
            <div className="section-copy">
              <p>A Terapia Cognitivo-Comportamental é uma abordagem prática e colaborativa. Juntos, vamos observar a relação entre pensamentos, emoções e comportamentos para construir estratégias que façam sentido para a sua vida.</p>
              <div className="cards">
                <article className="card"><span className="card-number">01</span><h3>Escuta sem pressa</h3><p>Um espaço para você chegar como está, com respeito à sua singularidade.</p></article>
                <article className="card accent"><span className="card-number">02</span><h3>Construção conjunta</h3><p>Objetivos claros e ferramentas para levar o cuidado para a rotina.</p></article>
              </div>
              <article className="card online-card"><span className="card-number">◎</span><h3>Terapia online</h3><p>Sessões exclusivamente online, com conforto, privacidade e flexibilidade para cuidar de si onde estiver.</p></article>
            </div>
          </div>
        </section>

        {/* FAQ interativo para responder dúvidas comuns antes do contato. */}
        <section id="duvidas" className="section section-yellow" aria-labelledby="duvidas-title">
          <div className="container section-grid">
            <div><SectionLabel>Antes de começar</SectionLabel><h2 id="duvidas-title">Dúvidas <em>comuns.</em></h2></div>
            <div className="faq-list">
              {faqItems.map((question, index) => (
                <div className="faq-item" key={question}>
                  <button className="faq-question" type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<span>{openFaq === index ? "−" : "+"}</span></button>
                  {openFaq === index && <p className="faq-answer">A primeira sessão é um momento de conversa e acolhimento. Vamos entender o que trouxe você até aqui, conhecer suas expectativas e combinar juntos os próximos passos — com leveza e sem pressa.</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final para aumentar as chances de contato. */}
        <section className="section section-dark" aria-labelledby="cta-title">
          <div className="container section-grid">
            <div><SectionLabel>Um primeiro passo</SectionLabel><h2 id="cta-title">Você não precisa ter todas as respostas para <em>começar.</em></h2></div>
            <div className="section-copy"><p>Vamos conversar sobre o que você está vivendo e descobrir se este espaço pode fazer sentido para você.</p><a className="primary-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar uma conversa <ArrowIcon /></a></div>
          </div>
        </section>
      </main>

      {/* Botão flutuante sempre disponível para abrir o WhatsApp. */}
      <a className="floating-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Falar com Clara pelo WhatsApp"><WhatsAppIcon size={28} /></a>

      {/* Rodapé com Instagram editável. */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <strong className="logo">Clara <span>Menezes</span></strong>
          <a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram da psicóloga"><InstagramIcon size={20} /><span>@seuusuario</span></a>
          <span>© 2024 · Psicologia clínica</span>
        </div>
      </footer>
    </div>
  );
}

// Monta o componente principal no elemento #root definido no HTML.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
