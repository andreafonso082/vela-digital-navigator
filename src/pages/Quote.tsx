import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: [] as string[],
    description: "",
  });

  const services = [
    "Criação de Website (Desde 500€)",
    "SEO e Google Meu Negócio (100 ou 70€/mês)",
    "Gestão de Redes Sociais (120€/mês)",
    "Criação de Logotipo (50€)",
    "Fotografia Profissional (100€)",
    "Vídeo Profissional (120€)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Pedido enviado com sucesso!",
      description: "Receberá o seu orçamento gratuito em 24 horas.",
    });
    
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      services: [],
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceToggle = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Peça o Seu Orçamento Gratuito
            </h1>
            <p className="text-xl mb-4">
              Receba o seu orçamento personalizado em 24 horas
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>Sem Compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span>Resposta em 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-8 md:p-12 rounded-lg shadow-strong">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Informações Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        Nome *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="João"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Sobrenome *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Silva"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="joao@exemplo.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Telefone *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+351 912 345 678"
                      />
                    </div>
                  </div>
                </div>

                {/* Services Selection */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Serviços Desejados</h2>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service} className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors">
                        <Checkbox
                          id={service}
                          checked={formData.services.includes(service)}
                          onCheckedChange={() => handleServiceToggle(service)}
                          className="mt-1"
                        />
                        <label
                          htmlFor={service}
                          className="text-foreground cursor-pointer flex-1"
                        >
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Informações Adicionais</h2>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                      Descreva o seu projeto (opcional)
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="min-h-[150px]"
                      placeholder="Conte-nos mais sobre o que precisa..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-lg py-6"
                  >
                    Receber Orçamento Gratuito
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Ao enviar este formulário, concorda com a nossa política de privacidade
                  </p>
                </div>
              </form>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-accent rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">24h</div>
                <p className="text-sm text-muted-foreground">Tempo de resposta</p>
              </div>
              <div className="text-center p-6 bg-accent rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Gratuito e sem compromisso</p>
              </div>
              <div className="text-center p-6 bg-accent rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quote;
