export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    subTasks: Todo[];
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string;
    analysis?: TaskAnalysis;
}

export interface TaskAnalysis {
    subtasks: string[];
    estimatedTime?: string;
    complexity?: 'simple' | 'medium' | 'complex';
    resources?: string[];
    notes?: string;
}

export interface AIResponse {
    analysis: string;
    error?: string;
} 