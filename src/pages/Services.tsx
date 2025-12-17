import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import websiteImage from "@/assets/service-website.jpg";
import socialImage from "@/assets/service-social.jpg";
import photoImage from "@/assets/service-photo.jpg";

const Services = () => {
  const servicesGrid = useScrollAnimation();
  const packagesSection = useScrollAnimation();
  
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
        "Hospedagem incluída (1º ano)",
        "Formação de gestão básica",
      ],
    },
    {
      title: "SEO e Google Meu Negócio",
      price: "100€ ou 70€/mês",
      description: "Otimização contínua para motores de busca e gestão do perfil Google Meu Negócio para máxima visibilidade local.",
      image: websiteImage,
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
      price: "100€/mês",
      description: "Presença consistente e profissional nas redes sociais com conteúdos planeados e publicações regulares.",
      image: socialImage,
      features: [
        "3 publicações por semana",
        "Design de posts profissionais",
        "Calendário de conteúdos",
        "Gestão de comentários",
        "Relatório mensal de métricas",
        "Estratégia de crescimento",
      ],
    },
    {
      title: "Branding e Criação de Logotipos",
      price: "50€",
      description: "Criação de logo profissional, moderno e minimalista que representa a identidade da sua marca. Serviço completo de branding acessível.",
      image: websiteImage,
      features: [
        "3 propostas iniciais",
        "2 rondas de revisões",
        "Ficheiros em múltiplos formatos",
        "Versões a cores e preto/branco",
        "Manual básico de utilização",
        "Entrega em 5 dias úteis",
      ],
    },
    {
      title: "Fotografia Profissional",
      price: "Desde 100€",
      description: "Sessões fotográficas profissionais para mostrar o seu trabalho, espaço ou produtos com qualidade.",
      image: photoImage,
      features: [
        "Até 2 horas de sessão",
        "20 fotografias editadas",
        "Entrega em alta resolução",
        "Direitos de utilização ilimitados",
        "Edição profissional",
        "Entrega em 7 dias úteis",
      ],
    },
    {
      title: "Vídeo Profissional",
      price: "120€",
      description: "Vídeos curtos e impactantes para websites, redes sociais ou apresentações de projetos.",
      image: photoImage,
      features: [
        "Vídeo até 60 segundos",
        "Filmagem profissional",
        "Edição e pós-produção",
        "Música e legendas incluídas",
        "Otimizado para redes sociais",
        "Entrega em 10 dias úteis",
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

      {/* Packages Info */}
      <section ref={packagesSection.elementRef} className="py-20 bg-secondary text-secondary-foreground">
        <div className={`container mx-auto px-4 transition-all duration-700 ${packagesSection.isVisible ? 'animate-scale-up' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Pacotes Personalizados</h2>
            <p className="text-xl text-secondary-foreground/90 mb-8">
              Precisa de mais do que um serviço? Criamos pacotes personalizados que combinam 
              múltiplos serviços com preços ainda mais competitivos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary-foreground/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Pacote Inicial</h3>
                <p className="text-4xl font-bold text-primary mb-4">450€</p>
                <ul className="text-left space-y-2 text-sm">
                  <li>✓ Website completo</li>
                  <li>✓ Logotipo profissional</li>
                  <li>✓ 1 mês de SEO incluído</li>
                </ul>
              </div>
              <div className="bg-primary text-primary-foreground p-6 rounded-lg transform md:scale-105 shadow-strong">
                <h3 className="text-2xl font-bold mb-3">Pacote Crescimento</h3>
                <p className="text-4xl font-bold mb-4">130€/mês</p>
                <ul className="text-left space-y-2 text-sm">
                  <li>✓ Gestão de redes sociais</li>
                  <li>✓ SEO contínuo</li>
                  <li>✓ Relatórios mensais</li>
                </ul>
              </div>
              <div className="bg-secondary-foreground/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">Pacote Premium</h3>
                <p className="text-4xl font-bold text-primary mb-4">700€</p>
                <ul className="text-left space-y-2 text-sm">
                  <li>✓ Website + Logotipo</li>
                  <li>✓ Fotografia profissional</li>
                  <li>✓ Vídeo promocional</li>
                  <li>✓ 2 meses SEO incluído</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
