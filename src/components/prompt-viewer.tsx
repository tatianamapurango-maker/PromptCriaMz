import { useState } from 'react';
import { Check, Copy, Pencil, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CopyButton } from '@/components/copy-button';
import { getExternalUrl, getExternalLabel } from '@/lib/prompt-generators';
import type { ProjectType } from '@/types';
import { cn } from '@/lib/utils';

interface PromptViewerProps {
  prompt: string;
  type: ProjectType;
  onEdit?: (newPrompt: string) => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  className?: string;
}

export function PromptViewer({
  prompt,
  type,
  onEdit,
  onRegenerate,
  isRegenerating = false,
  className,
}: PromptViewerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  const handleSaveEdit = () => {
    onEdit?.(editedPrompt);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedPrompt(prompt);
    setIsEditing(false);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            className="min-h-[400px] resize-y font-mono text-sm leading-relaxed"
            placeholder="Edite o seu prompt..."
          />
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <Check className="h-4 w-4" />
              Guardar alterações
            </Button>
            <Button onClick={handleCancelEdit} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-muted/30 p-6 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground/90 font-sans">
              {isRegenerating ? 'A gerar o seu prompt...' : prompt}
            </pre>
          </div>

          <div className="flex flex-wrap gap-2">
            <CopyButton text={prompt} />

            {onEdit && (
              <Button
                onClick={() => {
                  setEditedPrompt(prompt);
                  setIsEditing(true);
                }}
                variant="outline"
                className="gap-2"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            )}

            {onRegenerate && (
              <Button
                onClick={onRegenerate}
                variant="outline"
                className="gap-2"
                disabled={isRegenerating}
              >
                <RefreshCw className={cn('h-4 w-4', isRegenerating && 'animate-spin')} />
                {isRegenerating ? 'A gerar...' : 'Gerar novamente'}
              </Button>
            )}

            <Button
              asChild
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href={getExternalUrl(type)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                {getExternalLabel(type)}
              </a>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
