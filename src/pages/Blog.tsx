import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const blogPosts = [
    {
      title: "5 Razões Para Ter um Website Profissional em 2024",
      excerpt: "Descubra porque um website profissional é essencial para o sucesso do seu negócio no mundo digital atual.",
      date: "15 Janeiro 2024",
      category: "Marketing Digital",
      slug: "razoes-website-profissional",
    },
    {
      title: "Como o Google Meu Negócio Pode Aumentar as Suas Vendas",
      excerpt: "Aprenda a otimizar o seu perfil Google Meu Negócio para atrair mais clientes locais e aumentar a visibilidade.",
      date: "10 Janeiro 2024",
      category: "SEO Local",
      slug: "google-meu-negocio",
    },
    {
      title: "Redes Sociais Para Pequenos Negócios: Um Guia Prático",
      excerpt: "Estratégias simples e eficazes para pequenos negócios terem presença consistente nas redes sociais.",
      date: "5 Janeiro 2024",
      category: "Redes Sociais",
      slug: "redes-sociais-guia",
    },
    {
      title: "SEO Para Arquitetos: Como Destacar o Seu Portfolio Online",
      excerpt: "Dicas específicas de SEO para arquitetos mostrarem o seu trabalho e atraírem mais clientes através de pesquisas.",
      date: "28 Dezembro 2023",
      category: "SEO",
      slug: "seo-arquitetos",
    },
    {
      title: "Fotografia Profissional: Vale a Pena o Investimento?",
      excerpt: "Descubra como fotografias profissionais podem transformar a perceção da sua marca e aumentar conversões.",
      date: "20 Dezembro 2023",
      category: "Branding",
      slug: "fotografia-profissional",
    },
    {
      title: "Marketing Low-Cost: Estratégias Que Funcionam",
      excerpt: "Estratégias de marketing eficazes que não vão esvaziar o orçamento do seu pequeno negócio.",
      date: "15 Dezembro 2023",
      category: "Marketing Digital",
      slug: "marketing-low-cost",
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
              Blog <span className="text-primary">Vela</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Dicas, estratégias e insights sobre marketing digital para pequenos negócios
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <article 
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-strong transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-hero" />
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <Button 
                    variant="ghost" 
                    className="group-hover:text-primary p-0 h-auto font-semibold"
                  >
                    Ler mais
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Carregar Mais Artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Subscreva a Nossa Newsletter
            </h2>
            <p className="text-xl text-secondary-foreground/90 mb-8">
              Receba dicas exclusivas de marketing digital diretamente no seu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="O seu melhor email"
                className="flex-1 px-6 py-3 rounded-lg bg-white text-secondary border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-hover text-primary-foreground whitespace-nowrap"
              >
                Subscrever
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
