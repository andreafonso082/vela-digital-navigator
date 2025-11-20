import { Link } from "react-router-dom";
import { Zap, Target, Palette, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-caravel.jpg";
import websiteImage from "@/assets/service-website.jpg";
import socialImage from "@/assets/service-social.jpg";
import photoImage from "@/assets/service-photo.jpg";
import specialistsBg from "@/assets/specialists-bg.avif";
const Home = () => {
  const servicesSection = useScrollAnimation();
  const pillarsSection = useScrollAnimation();
  const specialistsSection = useScrollAnimation();
  const testimonialsSection = useScrollAnimation();
  const ctaSection = useScrollAnimation();
  const services = [{
    title: "Websites Profissionais",
    description: "Websites modernos e responsivos desde 400€",
    image: websiteImage
  }, {
    title: "Gestão de Redes Sociais",
    description: "Presença consistente por apenas 100€/mês",
    image: socialImage
  }, {
    title: "Fotografia & Vídeo",
    description: "Conteúdo visual profissional a partir de 100€",
    image: photoImage
  }];
  const pillars = [{
    icon: Zap,
    title: "Entrega Rápida",
    description: "Projetos concluídos em tempo recorde sem comprometer a qualidade"
  }, {
    icon: Target,
    title: "Preço Acessível",
    description: "Marketing profissional ao alcance de pequenos negócios"
  }, {
    icon: Palette,
    title: "Design Moderno",
    description: "Designs atuais e elegantes que destacam a sua marca"
  }];
  const testimonials = [{
    name: "João Silva",
    role: "Arquiteto",
    content: "A Vela criou o meu website em tempo recorde. Profissionalismo e preço justo!",
    website: "https://example.com"
  }, {
    name: "Maria Costa",
    role: "Proprietária de Café",
    content: "Finalmente tenho presença online sem gastar uma fortuna. Recomendo!",
    website: "https://example.com"
  }, {
    name: "Pedro Santos",
    role: "Consultor",
    content: "Excelente serviço de SEO. Já apareço nas primeiras pesquisas do Google!",
    website: "https://example.com"
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Marketing profissional <br />
            <span className="text-primary">rápido e acessível</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Websites, SEO, Google Meu Negócio, redes sociais e muito mais — tudo ao alcance do seu orçamento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground text-lg px-8 py-6">
                Peça um orçamento
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-secondary">
                Fale connosco
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesSection.elementRef} className="py-20 bg-accent">
        <div className={`container mx-auto px-4 transition-all duration-700 ${servicesSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Os Nossos Serviços
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluções completas de marketing digital para pequenos negócios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => <div key={index} className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-strong transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </div>)}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Ver Todos os Serviços
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Vela */}
      <section ref={pillarsSection.elementRef} className="py-20">
        <div className={`container mx-auto px-4 transition-all duration-700 ${pillarsSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Porque escolher a Vela
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => <div key={index} className="text-center p-8 rounded-lg bg-card shadow-elegant hover:shadow-strong transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <pillar.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section ref={specialistsSection.elementRef} className="relative py-20 text-white">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${specialistsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${specialistsSection.isVisible ? 'animate-scale-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Especialistas em pequenos negócios <span className="text-primary">e arquitetos</span>
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mx-auto mb-8">
            Entendemos as necessidades específicas de pequenos negócios e profissionais independentes. 
            Criamos soluções personalizadas que cabem no seu orçamento e entregam resultados.
          </p>
          <Link to="/about">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary">
              Conheça-nos melhor
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsSection.elementRef} className="py-20">
        <div className={`container mx-auto px-4 transition-all duration-700 ${testimonialsSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              O que dizem os nossos clientes
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel opts={{
            align: "start",
            loop: true
          }} className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, index) => <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                    <div className="bg-card p-8 rounded-lg shadow-elegant h-full mx-2 flex flex-col">
                      <Quote className="text-primary mb-4" size={40} />
                      <p className="text-foreground mb-6 text-lg italic">"{testimonial.content}"</p>
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="font-bold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                        <a 
                          href={testimonial.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1 whitespace-nowrap"
                        >
                          Visitar site <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="bg-card border-border text-foreground hover:bg-accent" />
              <CarouselNext className="bg-card border-border text-foreground hover:bg-accent" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaSection.elementRef} className="py-20 bg-gradient-hero">
        <div className={`container mx-auto px-4 text-center transition-all duration-700 ${ctaSection.isVisible ? 'animate-scale-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Peça o seu orçamento gratuito e sem compromisso. Respondemos em menos de 24 horas.
          </p>
          <Link to="/quote">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Pedir Orçamento Gratuito
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;