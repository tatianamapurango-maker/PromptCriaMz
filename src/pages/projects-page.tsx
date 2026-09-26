import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, PlusCircle, Trash2, ArrowRight, Loader2, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/confirm-dialog';
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

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setProjects(data as Project[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from('projects').delete().eq('id', deleteId);
    setDeleteId(null);
    if (error) {
      toast.error('Erro ao excluir projeto.');
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    toast.success('Projeto excluído.');
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meus projetos</h1>
          <p className="text-muted-foreground text-sm">Todos os seus prompts gerados.</p>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          <Link to="/app/create">
            <PlusCircle className="h-4 w-4" />
            Novo projeto
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted mb-4">
              <FolderOpen className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">Nenhum projeto ainda</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Crie o seu primeiro projeto e gere um prompt profissional para Gamma ou Lovable.
            </p>
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
          {projects.map((project, i) => (
            <Card
              key={project.id}
              className="group hover:shadow-soft transition-all hover:border-accent/30 animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg shrink-0">
                    {typeEmojis[project.type] || '📄'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {typeLabels[project.type] || project.type} • {new Date(project.created_at).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button asChild size="sm" variant="outline" className="gap-1 flex-1">
                    <Link to={`/app/projects/${project.id}`}>
                      <Eye className="h-3.5 w-3.5" />
                      Abrir
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/5"
                    onClick={() => setDeleteId(project.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir projeto?"
        description="Esta ação não pode ser desfeita. O projeto será permanentemente excluído."
        confirmLabel="Excluir"
        onConfirm={handleDelete}
      />
    </div>
  );
}
