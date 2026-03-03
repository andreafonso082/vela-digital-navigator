import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import websiteImage from "@/assets/service-website.jpg";
import socialImage from "@/assets/service-social.jpg";
import googleAdsImage from "@/assets/service-google-ads.jpg";
import seoImage from "@/assets/service-seo.jpg";
import brandingImage from "@/assets/service-branding.jpg";
import aiImage from "@/assets/service-ai.jpg";

const Services = () => {
  const servicesGrid = useScrollAnimation();
  
  
  const services = [
    {
      title: "Criação de Websites e Web Design",
      price: "Desde 700€",
      description: "Sites baratos e profissionais, modernos e responsivos, otimizados para conversão. Web design personalizado com SEO básico incluído e formação de gestão.",
      image: websiteImage,
      features: [
        "Design moderno e responsivo",
        "SEO básico incluído",
        "Formulários de contacto",
        "Integração com redes sociais",
        "Formação de gestão básica",
      ],
    },
    {
      title: "SEO e Google Meu Negócio",
      price: "100€ ou 70€/mês",
      description: "Otimização contínua para motores de busca e gestão do perfil Google Meu Negócio para máxima visibilidade local.",
      image: seoImage,
      features: [
        "Otimização de palavras-chave",
        "Gestão Google Meu Negócio",
        "Criação de conteúdo otimizado",
        "Relatórios mensais de posicionamento",
        "Análise da concorrência",
        "Link building básico",
      ],
    },
    {
      title: "Gestão de Redes Sociais",
      price: "Desde 120€/mês",
      description: "Presença consistente e profissional nas redes sociais com conteúdos planeados e publicações regulares.",
      image: socialImage,
      features: [
        "2 publicações por semana",
        "Design de posts profissionais",
        "Calendário de conteúdos",
        "Gestão de comentários",
        "Relatório mensal de métricas",
        "Estratégia de crescimento",
      ],
    },
    {
      title: "Branding e Criação de Logotipos",
      price: "70€",
      description: "Criação de logo profissional, moderno e minimalista que representa a identidade da sua marca. Serviço completo de branding acessível.",
      image: brandingImage,
      features: [
        "Conjunto de mockups básicos incluído",
        "2 rondas de revisões",
        "Ficheiros em múltiplos formatos",
        "Versões a cores e preto/branco",
        "Manual básico de utilização",
        "Entrega em 7 dias úteis",
      ],
    },
    {
      title: "Criação e Gestão de Campanhas Google Ads",
      price: "Variável",
      description: "Campanhas de publicidade Google otimizadas para maximizar o retorno do seu investimento com base em resultados reais.",
      image: googleAdsImage,
      features: [
        "Setup inicial de campanha com estudo de palavras-chave",
        "Gestão mensal de campanha",
        "Relatórios de desempenho",
        "Cobrança ao desempenho",
      ],
    },
    {
      title: "Integração de Agentes IA",
      price: "Desde 1000€",
      description: "Agentes de inteligência artificial para automatizar a comunicação e processos do seu negócio através de chat, WhatsApp, chamadas e mais.",
      image: aiImage,
      features: [
        "IA de Chat para website",
        "IA de WhatsApp automatizado",
        "IA de automação de processos",
        "IA de chamadas telefónicas",
        "Treino com dados do seu negócio",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Serviços de Marketing Digital | Web Design e SEO | Agência Vela Algarve</title>
        <meta name="description" content="Serviços de marketing digital da Agência Vela: criação de websites desde 700€, SEO, Google Meu Negócio, gestão de redes sociais, branding e agentes IA. Marketing Tavira e Algarve com preços low-cost." />
        <link rel="canonical" href="https://vela-digital-navigator.lovable.app/services" />
        <meta property="og:title" content="Serviços de Marketing Digital | Web Design e SEO | Agência Vela" />
        <meta property="og:description" content="Serviços de marketing digital: websites desde 700€, SEO, redes sociais e branding." />
        <meta property="og:url" content="https://vela-digital-navigator.lovable.app/services" />
        <meta name="keywords" content="agência de marketing, agência de marketing algarve, marketing algarve, agência criativa, telemarketing, marketing, agência de marketing tavira, marketing tavira, empresa que faz sites, empresa de sites, sites baratos, criação de website, web design, SEO, google meu negócio, gestão de redes sociais, branding, criação de logo, agentes IA, marketing low-cost" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-44 pb-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Web Design, Branding e <span className="text-primary">Marketing Digital</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Agência profissional de criação de websites, gestão de redes sociais, SEO e Google Meu Negócio com preços acessíveis
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesGrid.elementRef} className="py-20">
        <div className={`container mx-auto px-4 transition-all duration-700 ${servicesGrid.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                price={service.price}
                image={service.image}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Services;
