import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2, BookOpen, Code2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { generatePrompt, getProjectTitle } from '@/lib/prompt-generators';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { ProjectType } from '@/types';
import { cn } from '@/lib/utils';

interface StepConfig {
  id: string;
  title: string;
  field: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'switch';
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  dependsOn?: string;
}

const ebookSteps: StepConfig[] = [
  { id: 'tema', title: 'Qual é o tema?', field: 'tema', type: 'text', placeholder: 'Ex: Marketing digital para iniciantes', required: true },
  { id: 'objetivo', title: 'Qual é o objetivo?', field: 'objetivo', type: 'textarea', placeholder: 'Ex: Ensinar os fundamentos do marketing digital...', required: true },
  { id: 'publico', title: 'Quem é o público-alvo?', field: 'publico', type: 'text', placeholder: 'Ex: Empreendedores e pequenos negócios', required: true },
  {
    id: 'paginas', title: 'Quantas páginas?', field: 'paginas', type: 'radio', required: true,
    options: [
      { label: '10–20 páginas', value: '10-20' },
      { label: '20–40 páginas', value: '20-40' },
      { label: '40–60 páginas', value: '40-60' },
      { label: '60+ páginas', value: '60+' },
    ],
  },
  {
    id: 'estilo', title: 'Qual estilo?', field: 'estilo', type: 'radio', required: true,
    options: [
      { label: 'Premium', value: 'Premium' },
      { label: 'Moderno', value: 'Moderno' },
      { label: 'Minimalista', value: 'Minimalista' },
      { label: 'Profissional', value: 'Profissional' },
      { label: 'Criativo', value: 'Criativo' },
    ],
  },
  {
    id: 'incluir', title: 'O que deve incluir?', field: 'incluir', type: 'checkbox',
    options: [
      { label: 'Capa', value: 'Capa' },
      { label: 'Índice', value: 'Índice' },
      { label: 'Introdução', value: 'Introdução' },
      { label: 'Capítulos', value: 'Capítulos' },
      { label: 'Exemplos', value: 'Exemplos' },
      { label: 'Exercícios', value: 'Exercícios' },
      { label: 'Conclusão', value: 'Conclusão' },
      { label: 'CTA', value: 'CTA' },
    ],
  },
  { id: 'cores', title: 'Cores ou estilo específico? (Opcional)', field: 'cores', type: 'text', placeholder: 'Ex: Azul e dourado, estilo corporativo' },
];

const saasSteps: StepConfig[] = [
  { id: 'ideia', title: 'Qual é a ideia?', field: 'ideia', type: 'textarea', placeholder: 'Ex: Uma plataforma de gestão de tarefas...', required: true },
  { id: 'problema', title: 'Qual problema resolve?', field: 'problema', type: 'textarea', placeholder: 'Ex: As pessoas perdem tempo com planilhas...', required: true },
  { id: 'publico', title: 'Quem vai usar?', field: 'publico', type: 'text', placeholder: 'Ex: Equipas de pequenas empresas', required: true },
  {
    id: 'funcionalidades', title: 'Quais funcionalidades terá?', field: 'funcionalidades', type: 'checkbox',
    options: [
      { label: 'Dashboard', value: 'Dashboard' },
      { label: 'Gestão de utilizadores', value: 'Gestão de utilizadores' },
      { label: 'Notificações', value: 'Notificações' },
      { label: 'Relatórios', value: 'Relatórios' },
      { label: 'Exportação de dados', value: 'Exportação de dados' },
      { label: 'Integração com email', value: 'Integração com email' },
      { label: 'API', value: 'API' },
      { label: 'Chat em tempo real', value: 'Chat em tempo real' },
    ],
  },
  {
    id: 'estilo', title: 'Qual estilo visual?', field: 'estilo', type: 'radio', required: true,
    options: [
      { label: 'Moderno', value: 'Moderno' },
      { label: 'Minimalista', value: 'Minimalista' },
      { label: 'Premium', value: 'Premium' },
      { label: 'Futurista', value: 'Futurista' },
      { label: 'Corporativo', value: 'Corporativo' },
    ],
  },
  { id: 'login', title: 'Precisa de login?', field: 'login', type: 'switch' },
  { id: 'painelAdmin', title: 'Precisa de painel administrativo?', field: 'painelAdmin', type: 'switch' },
  { id: 'pagamentos', title: 'Precisa de pagamentos?', field: 'pagamentos', type: 'switch' },
  {
    id: 'tipoPagamento', title: 'Qual o tipo de pagamento?', field: 'tipoPagamento', type: 'radio',
    dependsOn: 'pagamentos',
    options: [
      { label: 'Pagamento único', value: 'Único' },
      { label: 'Pagamento mensal', value: 'Mensal' },
      { label: 'Pagamento vitalício', value: 'Vitalício' },
    ],
  },
  {
    id: 'preco', title: 'Qual é o preço?', field: 'preco', type: 'text',
    dependsOn: 'pagamentos',
    placeholder: 'Ex: 1500',
  },
];

const lojaSteps: StepConfig[] = [
  { id: 'nome', title: 'Nome da loja', field: 'nome', type: 'text', placeholder: 'Ex: TechStore MZ', required: true },
  { id: 'vende', title: 'O que vende?', field: 'vende', type: 'textarea', placeholder: 'Ex: Eletrónicos e acessórios...', required: true },
  { id: 'publico', title: 'Público-alvo', field: 'publico', type: 'text', placeholder: 'Ex: Jovens adultos 18-35', required: true },
  { id: 'categorias', title: 'Categorias', field: 'categorias', type: 'text', placeholder: 'Ex: Telemóveis, Laptops, Acessórios', required: true },
  {
    id: 'estilo', title: 'Estilo visual', field: 'estilo', type: 'radio', required: true,
    options: [
      { label: 'Premium', value: 'Premium' },
      { label: 'Moderno', value: 'Moderno' },
      { label: 'Minimalista', value: 'Minimalista' },
      { label: 'Luxuoso', value: 'Luxuoso' },
      { label: 'Jovem', value: 'Jovem' },
      { label: 'Profissional', value: 'Profissional' },
    ],
  },
  {
    id: 'paginas', title: 'Quais páginas?', field: 'paginas', type: 'checkbox',
    options: [
      { label: 'Início', value: 'Início' },
      { label: 'Produtos', value: 'Produtos' },
      { label: 'Produto', value: 'Produto' },
      { label: 'Carrinho', value: 'Carrinho' },
      { label: 'Checkout', value: 'Checkout' },
      { label: 'Sobre', value: 'Sobre' },
      { label: 'Contacto', value: 'Contacto' },
      { label: 'FAQ', value: 'FAQ' },
    ],
  },
  {
    id: 'tipoPagamento', title: 'Qual o tipo de pagamento?', field: 'tipoPagamento', type: 'radio',
    options: [
      { label: 'Pagamento único', value: 'Único' },
      { label: 'Pagamento mensal', value: 'Mensal' },
      { label: 'Pagamento vitalício', value: 'Vitalício' },
    ],
  },
  {
    id: 'preco', title: 'Qual é o preço?', field: 'preco', type: 'text',
    placeholder: 'Ex: 1500',
  },
  { id: 'painelAdmin', title: 'Precisa de painel administrativo?', field: 'painelAdmin', type: 'switch' },
];

const typeConfig: Record<ProjectType, { steps: StepConfig[]; emoji: string; icon: typeof BookOpen; label: string }> = {
  ebook: { steps: ebookSteps, emoji: '📘', icon: BookOpen, label: 'Ebook' },
  saas: { steps: saasSteps, emoji: '💻', icon: Code2, label: 'SaaS' },
  loja: { steps: lojaSteps, emoji: '🛒', icon: ShoppingBag, label: 'Loja' },
};

export function CreatePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [type, setType] = useState<ProjectType>('ebook');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const paramType = searchParams.get('type') as ProjectType;
    if (paramType && ['ebook', 'saas', 'loja'].includes(paramType)) {
      setType(paramType);
    }
  }, [searchParams]);

  const config = typeConfig[type];
  const steps = config.steps;
  const currentStep = steps[stepIndex];
  const progress = ((stepIndex + 1) / steps.length) * 100;

  // Filter out steps that depend on a false condition
  const visibleSteps = steps.filter((step) => {
    if (step.dependsOn) {
      return answers[step.dependsOn] === true;
    }
    return true;
  });

  const actualCurrentStep = visibleSteps[stepIndex] || currentStep;
  const actualProgress = visibleSteps.length > 0 ? ((stepIndex + 1) / visibleSteps.length) * 100 : progress;

  const isStepValid = () => {
    if (!actualCurrentStep.required) return true;
    const val = answers[actualCurrentStep.field];
    if (actualCurrentStep.type === 'checkbox') {
      return Array.isArray(val) && val.length > 0;
    }
    return val !== undefined && val !== '' && val !== null;
  };

  const handleNext = () => {
    if (stepIndex < visibleSteps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      handleGenerate();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    const prompt = generatePrompt(type, answers);
    const title = getProjectTitle(type, answers);

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        type,
        answers,
        generated_prompt: prompt,
      })
      .select('id')
      .maybeSingle();

    setGenerating(false);

    if (error || !data) {
      toast.error('Erro ao salvar o projeto. Tente novamente.');
      return;
    }

    toast.success('Prompt gerado com sucesso!');
    navigate(`/app/projects/${data.id}`);
  };

  const setFieldValue = (field: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: string, value: string) => {
    const current = (answers[field] as string[]) || [];
    if (current.includes(value)) {
      setFieldValue(field, current.filter((v) => v !== value));
    } else {
      setFieldValue(field, [...current, value]);
    }
  };

  const selectType = (newType: ProjectType) => {
    setType(newType);
    setStepIndex(0);
    setAnswers({});
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Type selector */}
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to="/app">
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(Object.keys(typeConfig) as ProjectType[]).map((t) => (
          <button
            key={t}
            onClick={() => selectType(t)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              type === t
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            <span>{typeConfig[t].emoji}</span>
            {typeConfig[t].label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Passo {stepIndex + 1} de {visibleSteps.length}
          </span>
          <span className="text-sm font-medium">{Math.round(actualProgress)}%</span>
        </div>
        <Progress value={actualProgress} className="h-2" />
      </div>

      {/* Step */}
      <Card className="animate-fade-in" key={actualCurrentStep.id}>
        <CardContent className="p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6">{actualCurrentStep.title}</h2>

          {actualCurrentStep.type === 'text' && (
            <div className="space-y-2">
              <Input
                placeholder={actualCurrentStep.placeholder}
                value={(answers[actualCurrentStep.field] as string) || ''}
                onChange={(e) => setFieldValue(actualCurrentStep.field, e.target.value)}
                autoFocus
              />
            </div>
          )}

          {actualCurrentStep.type === 'textarea' && (
            <div className="space-y-2">
              <Textarea
                placeholder={actualCurrentStep.placeholder}
                value={(answers[actualCurrentStep.field] as string) || ''}
                onChange={(e) => setFieldValue(actualCurrentStep.field, e.target.value)}
                className="min-h-[120px]"
                autoFocus
              />
            </div>
          )}

          {actualCurrentStep.type === 'radio' && actualCurrentStep.options && (
            <RadioGroup
              value={(answers[actualCurrentStep.field] as string) || ''}
              onValueChange={(v) => setFieldValue(actualCurrentStep.field, v)}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {actualCurrentStep.options.map((opt) => (
                  <label
                    key={opt.value}
                    htmlFor={opt.value}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all hover:bg-muted/50',
                      answers[actualCurrentStep.field] === opt.value
                        ? 'border-accent bg-accent/5'
                        : 'border-border'
                    )}
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          )}

          {actualCurrentStep.type === 'checkbox' && actualCurrentStep.options && (
            <div className="grid gap-3 sm:grid-cols-2">
              {actualCurrentStep.options.map((opt) => {
                const checked = ((answers[actualCurrentStep.field] as string[]) || []).includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all hover:bg-muted/50',
                      checked ? 'border-accent bg-accent/5' : 'border-border'
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleArrayValue(actualCurrentStep.field, opt.value)}
                    />
                    <span className="text-sm font-medium">{opt.label}</span>
                  </label>
                );
              })}
            </div>
          )}

          {actualCurrentStep.type === 'switch' && (
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <span className="text-sm font-medium">{actualCurrentStep.title}</span>
              <Switch
                checked={!!answers[actualCurrentStep.field]}
                onCheckedChange={(v) => setFieldValue(actualCurrentStep.field, v)}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={handleBack}
              variant="ghost"
              disabled={stepIndex === 0 || generating}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isStepValid() || generating}
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  A gerar prompt...
                </>
              ) : stepIndex === visibleSteps.length - 1 ? (
                <>
                  <Check className="h-4 w-4" />
                  Gerar prompt
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
