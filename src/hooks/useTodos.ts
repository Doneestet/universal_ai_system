import { useState, useCallback } from 'react';
import type { Todo, TaskAnalysis } from '@/types';
import { analyzeTask, parseAnalysis } from '@/services/ai';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addTodo = useCallback(async (text: string) => {
        console.log('Adding todo:', text);
        if (!text.trim()) {
            console.log('Empty todo text, skipping');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            // Create base todo
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: text.trim(),
                completed: false,
                subTasks: []
            };
            console.log('Created new todo:', newTodo);

            // Add todo immediately for better UX
            setTodos(prev => {
                console.log('Current todos:', prev);
                return [...prev, newTodo];
            });

            // Analyze task with AI
            console.log('Starting AI analysis...');
            const { analysis, error: aiError } = await analyzeTask(text);

            if (aiError) {
                console.error('AI analysis error:', aiError);
                setError(aiError);
                return;
            }

            // Parse the analysis
            console.log('Parsing AI analysis...');
            const taskAnalysis = parseAnalysis(analysis);

            // Create subtasks from analysis
            const subtasks: Todo[] = taskAnalysis.subtasks.map((text, index) => ({
                id: `${newTodo.id}-${index}`,
                text,
                completed: false,
                subTasks: []
            }));
            console.log('Created subtasks:', subtasks);

            // Update todo with analysis and subtasks
            setTodos(prev => {
                const updated = prev.map(todo =>
                    todo.id === newTodo.id
                        ? {
                            ...todo,
                            subTasks: subtasks,
                            analysis: taskAnalysis
                        }
                        : todo
                );
                console.log('Updated todos:', updated);
                return updated;
            });
        } catch (err) {
            const errorMsg = 'Failed to add todo. Please try again.';
            console.error(errorMsg, err);
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleTodo = useCallback((id: string) => {
        console.log('Toggling todo:', id);
        setTodos(prev => {
            const updated = prev.map(todo => {
                // Check if this is the todo to toggle
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }

                // Check in subtasks
                if (todo.subTasks.some(sub => sub.id === id)) {
                    return {
                        ...todo,
                        subTasks: todo.subTasks.map(sub =>
                            sub.id === id ? { ...sub, completed: !sub.completed } : sub
                        )
                    };
                }

                return todo;
            });
            console.log('Updated todos after toggle:', updated);
            return updated;
        });
    }, []);

    const deleteTodo = useCallback((id: string) => {
        console.log('Deleting todo:', id);
        setTodos(prev => {
            const updated = prev.filter(todo => {
                // Remove if this is the todo to delete
                if (todo.id === id) return false;

                // Remove from subtasks if present
                if (todo.subTasks.some(sub => sub.id === id)) {
                    return {
                        ...todo,
                        subTasks: todo.subTasks.filter(sub => sub.id !== id)
                    };
                }

                return todo;
            });
            console.log('Updated todos after delete:', updated);
            return updated;
        });
    }, []);

    return {
        todos,
        loading,
        error,
        addTodo,
        toggleTodo,
        deleteTodo
    };
} 