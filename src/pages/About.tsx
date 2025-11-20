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
    description: "Analisamos o seu negócio para avaliar como o poderemos ajudar"
  }, {
    step: "Passo 4",
    title: "Sucesso",
    description: "Aplicamos as nossas melhores estratégias e métodos validados e juntos, crescemos o seu negócio como nunca antes!"
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Sobre a <span className="text-primary">Vela</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A agência de marketing digital que navega ao lado dos pequenos negócios
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
              <img alt="Vela Agency Logo" src="/lovable-uploads/4cd54715-777a-47f4-894a-5a1d6a206ac9.png" className="w-72 h-72 object-contain" />
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
              Digitalizar pequenos negócios através de serviços de marketing profissionais, 
              rápidos e acessíveis. Acreditamos que qualquer negócio, independentemente do 
              seu tamanho, merece ter ferramentas digitais de qualidade para crescer e competir 
              no mercado atual.
            </p>
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section ref={processSection.elementRef} className="py-20">
        <div className={`container mx-auto px-4 transition-all duration-700 ${processSection.isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Como Trabalhamos</h2>
            <p className="text-xl text-muted-foreground">O caminho para o sucesso do seu negócio</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative">
              {processSteps.map((step, index) => (
                <div key={index} className="flex-1 text-center">
                  <span className="text-sm font-semibold text-primary mb-2 block">{step.step}</span>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(25%+2rem)] w-[calc(25%-4rem)] h-0.5 bg-primary/30" style={{ left: `calc(${(index + 1) * 25}% - 2rem)`, width: 'calc(25% - 4rem)' }} />
                  )}
                </div>
              ))}
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
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-card shadow-elegant hover:shadow-strong transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <value.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
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
                  <h3 className="text-2xl font-bold text-primary mb-3">Arquitetos e Engenheiros Civis                    </h3>
                  <p className="text-muted-foreground">
                    Compreendemos a importância de portfolios visuais impactantes e otimização para pesquisas locais de serviços de arquitetura. Toda a gente merece a oportunidade de ter uma boa casa. Por isso ajudamos ass pessoas que tratam das suas casa para que elas a possam ajudar a si de maneira mais eficiente!                                            
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-elegant">
                  <h3 className="text-2xl font-bold text-primary mb-3">Clínicas Locais   </h3>
                  <p className="text-muted-foreground">
                    Seja você uma clínica de estética, dentária ou até de animais de estimação, sabemos o que fazer no que toca a dar a conhecer os seus serviços e a mostrar ao mundo o que já fizeram pelos vossos clientes!                                                                                        
                  </p>
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