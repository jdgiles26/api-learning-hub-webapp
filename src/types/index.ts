export interface ApiType {
  id: string;
  name: string;
  fullName: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  useCases: string[];
  pros: string[];
  cons: string[];
  whenToUse: string[];
  httpMethod?: string;
  dataFormat: string;
  transport: string;
  codeExamples: CodeExample[];
  architecture: ArchitectureStep[];
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ArchitectureStep {
  step: number;
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningProgress {
  visitedPages: string[];
  completedQuizzes: string[];
  lastVisited: string;
}

export interface ComparisonData {
  feature: string;
  rest: string;
  graphql: string;
  websocket: string;
  grpc: string;
  soap: string;
}
