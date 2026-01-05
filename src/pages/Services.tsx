import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import websiteImage from "@/assets/service-website.jpg";
import socialImage from "@/assets/service-social.jpg";
import photoImage from "@/assets/service-photo.jpg";
import seoImage from "@/assets/service-seo.jpg";
import brandingImage from "@/assets/service-branding.jpg";
import aiImage from "@/assets/service-ai.jpg";

const Services = () => {
  const servicesGrid = useScrollAnimation();
  
  
  const services = [
    {
      title: "Criação de Websites e Web Design",
      price: "Desde 500€",
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
      title: "Fotografia e Vídeo Profissional",
      price: "Variável",
      description: "Sessões fotográficas e vídeos profissionais para mostrar o seu trabalho, espaço ou produtos com qualidade.",
      image: photoImage,
      features: [
        "Sessão fotográfica até 2 horas",
        "Fotografias editadas em alta resolução",
        "Vídeos profissionais",
        "Edição e pós-produção completa",
        "Música e legendas incluídas",
        "Direitos de utilização ilimitados",
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
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-accent">
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
