import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code2, ShoppingBag, ArrowRight, FolderOpen, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const projectCards = [
  {
    type: 'ebook' as const,
    emoji: '📘',
    icon: BookOpen,
    title: 'Criar Ebook',
    description: 'Crie prompts para gerar ebooks no Gamma.',
    accent: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    type: 'saas' as const,
    emoji: '💻',
    icon: Code2,
    title: 'Criar SaaS',
    description: 'Transforme sua ideia em um prompt para o Lovable.',
    accent: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    type: 'loja' as const,
    emoji: '🛒',
    icon: ShoppingBag,
    title: 'Criar Loja',
    description: 'Crie um prompt completo para desenvolver sua loja.',
    accent: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const typeLabels: Record<string, string> = {
  ebook: 'Ebook',
  saas: 'SaaS',
  loja: 'Loja',
};

const typeEmojis: Record<string, string> = {
  ebook: '📘',
  saas: '💻',
  loja: '🛒',
};

export function DashboardPage() {
  const { profile } = useAuth();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      if (!error && data) {
        setRecentProjects(data as Project[]);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Greeting */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold">
          Olá, {profile?.name || 'amigo'}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">O que você quer criar hoje?</p>
      </div>

      {/* Create cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {projectCards.map((card, i) => (
          <Link key={card.type} to={`/app/create?type=${card.type}`}>
            <Card
              className="group cursor-pointer hover:shadow-soft transition-all hover:border-accent/30 animate-slide-up h-full"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <CardHeader>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} mb-2`}>
                  <card.icon className={`h-6 w-6 ${card.accent}`} />
                </div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span>{card.emoji}</span>
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                  Começar
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Meus projetos recentes</h2>
          <Button asChild variant="ghost" size="sm" className="gap-1">
            <Link to="/app/projects">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
                <FolderOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">Ainda não tem projetos criados.</p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                <Link to="/app/create">
                  <PlusCircle className="h-4 w-4" />
                  Criar primeiro projeto
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {recentProjects.map((project) => (
              <Link key={project.id} to={`/app/projects/${project.id}`}>
                <Card className="hover:shadow-soft transition-all hover:border-accent/30 cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg">
                      {typeEmojis[project.type] || '📄'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{project.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {typeLabels[project.type] || project.type} • {new Date(project.created_at).toLocaleDateString('pt-PT')}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
