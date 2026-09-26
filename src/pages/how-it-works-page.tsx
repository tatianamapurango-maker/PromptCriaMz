import { Link } from 'react-router-dom';
import { BookOpen, Code2, ShoppingBag, ArrowRight, Wand2, ClipboardCopy, ExternalLink, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: Wand2,
    title: '1. Escolher o tipo de projeto',
    description: 'Decida o que quer criar: um Ebook, uma aplicação SaaS ou uma Loja online. Cada tipo tem perguntas específicas para gerar o melhor prompt.',
  },
  {
    icon: ClipboardCopy,
    title: '2. Responder perguntas simples',
    description: 'Respondemos algumas perguntas sobre a sua ideia — tema, público-alvo, estilo, funcionalidades. As respostas ajudam a criar um prompt detalhado e profissional.',
  },
  {
    icon: CheckCircle,
    title: '3. Gerar o prompt',
    description: 'O CriaMZ transforma as suas respostas num prompt completo e profissional, pronto para usar. Pode editar ou gerar novamente se quiser.',
  },
  {
    icon: ExternalLink,
    title: '4. Copiar e abrir no Gamma/Lovable',
    description: 'Copie o prompt com um clique e abra o Gamma (para Ebooks) ou o Lovable (para SaaS e Lojas) numa nova aba. Cole o prompt e comece a criar.',
  },
];

const types = [
  { icon: BookOpen, emoji: '📘', title: 'Ebook', description: 'Prompts para criar ebooks profissionais no Gamma.', target: 'Gamma' },
  { icon: Code2, emoji: '💻', title: 'SaaS', description: 'Prompts para criar aplicações web no Lovable.', target: 'Lovable' },
  { icon: ShoppingBag, emoji: '🛒', title: 'Loja', description: 'Prompts para criar lojas online no Lovable.', target: 'Lovable' },
];

export function HowItWorksPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Como funciona o CriaMZ</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Transforme as suas ideias em prompts profissionais em 4 passos simples.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <Card key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardContent className="flex gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent shrink-0">
                <step.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">Tipos de projeto</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {types.map((type, i) => (
            <Card key={type.title} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardHeader>
                <div className="text-3xl mb-2">{type.emoji}</div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription>{type.description}</CardDescription>
                <div className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mt-2">
                  <ExternalLink className="h-3 w-3" />
                  {type.target}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Link to="/app/create">
            Começar a criar
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
