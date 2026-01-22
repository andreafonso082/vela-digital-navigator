import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Zap, Users, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import velaLogo from "@/assets/vela-logo.png";
const About = () => {
  const storySection = useScrollAnimation();
  const missionSection = useScrollAnimation();
  const valuesSection = useScrollAnimation();
  const processSection = useScrollAnimation();
  const specializationSection = useScrollAnimation();
  const processStep1 = useScrollAnimation();
  const processStep2 = useScrollAnimation();
  const processStep3 = useScrollAnimation();
  const processStep4 = useScrollAnimation();
  const stepAnimations = [processStep1, processStep2, processStep3, processStep4];
  const values = [{
    icon: Target,
    title: "Transparência",
    description: "Preços claros, sem surpresas. O que vê é o que paga."
  }, {
    icon: Zap,
    title: "Rapidez",
    description: "Entregamos projetos em tempo recorde sem comprometer a qualidade."
  }, {
    icon: Users,
    title: "Simplicidade",
    description: "Processos simples e diretos. Marketing sem complicações."
  }, {
    icon: Heart,
    title: "Dedicação",
    description: "Tratamos o seu negócio como se fosse nosso."
  }];
  const processSteps = [{
    step: "Passo 1",
    title: "Primeiro Contacto",
    description: "Seja contactado, contacte ou peça um orçamento"
  }, {
    step: "Passo 2",
    title: "Reunião Online",
    description: "Marque uma reunião online, grátis e sem compromisso"
  }, {
    step: "Passo 3",
    title: "Análise do Negócio",
    description: "Analisamos o seu negócio para avaliar como o iremos ajudar"
  }, {
    step: "Passo 4",
    title: "Sucesso",
    description: "Aplicamos as nossas melhores estratégias e métodos validados e juntos, crescemos o seu negócio como nunca antes!"
  }];
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sobre a Agência Vela | Marketing Digital Tavira e Algarve | Portugal</title>
        <meta name="description" content="Conheça a Agência Vela - agência de marketing digital no Algarve especializada em web design, SEO e branding para pequenos negócios. Marketing Tavira com preços acessíveis e profissionais dedicados." />
        <link rel="canonical" href="https://vela-digital-navigator.lovable.app/about" />
        <meta property="og:title" content="Sobre a Agência Vela | Marketing Digital Tavira e Algarve" />
        <meta property="og:description" content="Conheça a Agência Vela - especialistas em marketing digital no Algarve e Tavira." />
        <meta property="og:url" content="https://vela-digital-navigator.lovable.app/about" />
        <meta name="keywords" content="agência vela, sobre nós, agência de marketing algarve, marketing tavira, especialista marketing, especialista digital, profissional web" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Descobre quem é a Agência       <span className="text-primary">Vela!</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Especialistas em web design, criação de websites e marketing em Portugal que navegam ao lado dos pequenos negócios
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storySection.elementRef} className="py-20">
        <div className={`container mx-auto px-4 transition-all duration-700 ${storySection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">A Nossa História</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A Vela nasceu da frustração de ver pequenos negócios lutarem para ter uma presença 
                  online profissional. Preços inacessíveis, prazos longos e processos complicados 
                  tornavam o marketing digital um luxo inalcançável.
                </p>
                <p>
                  Dois sócios com experiência em marketing e design decidiram mudar isso. Criámos uma agência diferente: rápida, acessível e sem complicações. Como os nossos antepassados portugueses navegaram e descobriram o mundo, também nós queremos ajudar os nossos parceiros a navegar as marés do digital!
                </p>
                <p>
                  Hoje, especializamo-nos em servir negócios locais, oferecendo soluções personalizadas que cabem em qualquer orçamento. Porque acreditamos que todos merecem ter uma presença digital profissional.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img alt="Agência de Marketing Digital Vela - Logo profissional" src="/lovable-uploads/4cd54715-777a-47f4-894a-5a1d6a206ac9.png" className="w-72 h-72 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionSection.elementRef} className="py-20 bg-secondary text-secondary-foreground">
        <div className={`container mx-auto px-4 transition-all duration-700 ${missionSection.isVisible ? 'animate-scale-up' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">A Nossa Missão</h2>
            <p className="text-xl text-secondary-foreground/90 leading-relaxed">
              Impulsão e crescimento de pequenos negócios através de serviços profissionais de marketing digital, 
              web design e automatização. Como gestores de marketing especializados, acreditamos que qualquer negócio 
              merece ter acesso a websites, branding e otimização digital de qualidade para crescer e competir 
              no mercado atual com soluções low-cost.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section ref={processSection.elementRef} className="pt-12 pb-20 mb-0">
        <div className={`container mx-auto px-4 transition-all duration-700 ${processSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-28">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Como Trabalhamos</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary/50"></div>
              <span className="text-primary font-semibold">•</span>
              <div className="h-px w-12 bg-primary/50"></div>
            </div>
            
          </div>

          <div className="max-w-6xl mx-auto relative md:py-[100px]">
            {/* Continuous horizontal line with animation - desktop only */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[50px] right-[50px] h-0.5 bg-primary/30 hidden md:block">
              <div className={`h-full bg-primary transition-all duration-[2000ms] ease-out ${processStep1.isVisible ? 'w-full' : 'w-0'}`} />
            </div>
            
            {/* Mobile layout - stacked cards */}
            <div className="flex flex-col gap-6 md:hidden">
              {processSteps.map((step, index) => <div key={index} className={`bg-card p-6 rounded-lg shadow-elegant transition-all duration-700 ${processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
              transitionDelay: `${index * 150}ms`
            }}>
                  <span className="text-sm font-semibold text-primary mb-2 block">{step.step}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>)}
            </div>

            {/* Desktop layout - timeline */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              {processSteps.map((step, index) => <div key={index} ref={stepAnimations[index].elementRef} className="text-center relative">
                  {/* Dot on the line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary z-10" />
                  
                  {/* Content positioned above or below with directional animation */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-full transition-all duration-700 ease-out ${index % 2 === 0 ? 'bottom-1/2 pb-6' : 'top-1/2 pt-6'} ${stepAnimations[index].isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${index % 2 === 0 ? '-translate-y-8' : 'translate-y-8'}`}`} style={{
                transitionDelay: `${index * 500}ms`
              }}>
                    <span className="text-sm font-semibold text-primary mb-2 block">{step.step}</span>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm px-2">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesSection.elementRef} className="py-20 bg-secondary text-secondary-foreground">
        <div className={`container mx-auto px-4 transition-all duration-700 ${valuesSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Os Nossos Valores</h2>
            <p className="text-xl text-secondary-foreground/90">O que nos guia em cada projeto</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => <div key={index} className="text-center p-6 rounded-lg bg-card shadow-elegant hover:shadow-strong transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Team Focus Section */}
      <section ref={specializationSection.elementRef} className="py-20 bg-accent">
        <div className={`container mx-auto px-4 transition-all duration-700 ${specializationSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
              Especialização que Faz a Diferença
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-center">
                Ao contrário de agências generalistas, focamo-nos em entender profundamente 
                as necessidades específicas dos nossos clientes. Esta especialização permite-nos 
                criar soluções mais eficazes e personalizadas.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-card p-6 rounded-lg shadow-elegant">
                  <h3 className="text-2xl font-bold text-primary mb-3">Arquitetos e Engenheiros Civis</h3>
                  <p className="text-muted-foreground">
                    Compreendemos a importância de portfolios visuais impactantes e otimização para pesquisas locais de serviços de arquitetura. Toda a gente merece a oportunidade de ter uma boa casa. Nós seremos os arquitetos da sua casa digital.                       
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-elegant">
                  <h3 className="text-2xl font-bold text-primary mb-3">Clínicas Locais       </h3>
                  <p className="text-muted-foreground">Seja a sua clínica de estética, dentária ou de animais de estimação, estará seguro connosco! Sabemos as estratégias e métodos para melhor mostrar o seu trabalho e as suas transformações! Faça com que os seus clientes o escolham a si, com toda a segurança e confiança.                                                                                          </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;