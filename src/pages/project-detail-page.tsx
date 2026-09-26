import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { generatePrompt, getProjectTitle } from '@/lib/prompt-generators';
import { PromptViewer } from '@/components/prompt-viewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/types';
import { toast } from 'sonner';

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

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error || !data) {
        toast.error('Projeto não encontrado.');
        navigate('/app/projects');
        return;
      }
      setProject(data as Project);
      setLoading(false);
    };
    fetchProject();
  }, [id, navigate]);

  const handleEdit = async (newPrompt: string) => {
    if (!project) return;
    const { error } = await supabase
      .from('projects')
      .update({ generated_prompt: newPrompt })
      .eq('id', project.id);
    if (error) {
      toast.error('Erro ao guardar alterações.');
      return;
    }
    setProject({ ...project, generated_prompt: newPrompt });
    toast.success('Prompt atualizado!');
  };

  const handleRegenerate = async () => {
    if (!project) return;
    setRegenerating(true);
    const newPrompt = generatePrompt(project.type, project.answers as Record<string, unknown>);
    const { error } = await supabase
      .from('projects')
      .update({ generated_prompt: newPrompt })
      .eq('id', project.id);
    setRegenerating(false);
    if (error) {
      toast.error('Erro ao regenerar prompt.');
      return;
    }
    setProject({ ...project, generated_prompt: newPrompt });
    toast.success('Prompt regenerado!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to="/app/projects">
            <ArrowLeft className="h-4 w-4" />
            Projetos
          </Link>
        </Button>
      </div>

      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{typeEmojis[project.type]}</span>
          <div>
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted-foreground">
              {typeLabels[project.type]} • {new Date(project.created_at).toLocaleDateString('pt-PT')}
            </p>
          </div>
        </div>
      </div>

      {/* Success banner */}
      <Card className="border-accent/20 bg-accent/5 animate-slide-up">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Seu prompt está pronto! 🚀</p>
            <p className="text-sm text-muted-foreground">Copie o prompt e cole no Gamma ou Lovable para criar o seu projeto.</p>
          </div>
        </CardContent>
      </Card>

      {/* Prompt viewer */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <PromptViewer
          prompt={project.generated_prompt}
          type={project.type}
          onEdit={handleEdit}
          onRegenerate={handleRegenerate}
          isRegenerating={regenerating}
        />
      </div>
    </div>
  );
}
