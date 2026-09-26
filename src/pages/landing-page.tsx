import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, ShoppingBag, Sparkles, Check, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">CriaMZ</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/register">Criar conta</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent mb-6 animate-fade-in">
            <Wand2 className="h-3.5 w-3.5" />
            Transforme ideias em projetos reais
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-slide-up">
            Sua ideia. Seu prompt.
            <br />
            <span className="text-gradient">Seu projeto.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Transforme suas ideias em prompts profissionais para criar Ebooks, SaaS e Lojas online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base h-12 px-8">
              <Link to="/register">
                Começar agora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base h-12 px-8">
              <Link to="/login">Já tenho conta</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              emoji: '📘',
              title: 'Ebook',
              description: 'Crie prompts para gerar ebooks no Gamma.',
              gradient: 'from-blue-500/10 to-cyan-500/10',
              border: 'hover:border-blue-500/30',
            },
            {
              icon: Code2,
              emoji: '💻',
              title: 'SaaS',
              description: 'Transforme sua ideia em um prompt para o Lovable.',
              gradient: 'from-accent/10 to-emerald-500/10',
              border: 'hover:border-accent/30',
            },
            {
              icon: ShoppingBag,
              emoji: '🛒',
              title: 'Loja',
              description: 'Crie um prompt completo para desenvolver sua loja.',
              gradient: 'from-amber-500/10 to-orange-500/10',
              border: 'hover:border-amber-500/30',
            },
          ].map((card, i) => (
            <Card
              key={card.title}
              className={`group relative overflow-hidden border-border ${card.border} transition-all hover:shadow-soft animate-slide-up`}
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <CardHeader className="relative">
                <div className="text-4xl mb-2">{card.emoji}</div>
                <CardTitle className="text-2xl">{card.title}</CardTitle>
                <CardDescription className="text-base">{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <card.icon className="h-4 w-4" />
                  Prompt profissional incluído
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Como funciona</h2>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { step: '1', title: 'Escolher projeto', desc: 'Ebook, SaaS ou Loja' },
            { step: '2', title: 'Responder perguntas', desc: 'Perguntas simples sobre a sua ideia' },
            { step: '3', title: 'Gerar prompt', desc: 'Prompt profissional criado automaticamente' },
            { step: '4', title: 'Copiar e abrir', desc: 'Cole no Gamma ou Lovable e crie' },
          ].map((item, i) => (
            <div key={item.step} className="text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-lg">
                {item.step}
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/5 to-primary/5 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Crie a sua conta gratuita e transforme as suas ideias em projetos reais em minutos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Gratuito', 'Sem limites', 'Prompts profissionais'].map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-sm font-medium">
                <Check className="h-4 w-4 text-accent" />
                {feat}
              </div>
            ))}
          </div>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 text-base h-12 px-8">
            <Link to="/register">
              Começar agora
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold">CriaMZ</span>
          </div>
          <p className="text-sm text-muted-foreground">Sua ideia. Seu prompt. Seu projeto.</p>
        </div>
      </footer>
    </div>
  );
}
