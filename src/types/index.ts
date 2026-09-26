export type ProjectType = 'ebook' | 'saas' | 'loja';

export interface Profile {
  id: string;
  name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  type: ProjectType;
  answers: Record<string, unknown>;
  generated_prompt: string;
  created_at: string;
  updated_at: string;
}

export interface EbookAnswers {
  tema: string;
  objetivo: string;
  publico: string;
  paginas: string;
  estilo: string;
  incluir: string[];
  cores: string;
}

export interface SaasAnswers {
  ideia: string;
  problema: string;
  publico: string;
  funcionalidades: string[];
  estilo: string;
  login: boolean;
  painelAdmin: boolean;
  pagamentos: boolean;
  tipoPagamento: string;
  preco: string;
}

export interface LojaAnswers {
  nome: string;
  vende: string;
  publico: string;
  categorias: string;
  estilo: string;
  paginas: string[];
  tipoPagamento: string;
  preco: string;
  painelAdmin: boolean;
}

export type AnyAnswers = EbookAnswers | SaasAnswers | LojaAnswers | Record<string, unknown>;
