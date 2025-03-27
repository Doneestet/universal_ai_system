import axios from 'axios';
import type { AIResponse } from '@/types';

export async function analyzeTask(task: string): Promise<AIResponse> {
    console.log('Analyzing task:', task);
    try {
        console.log('Sending request to API...');
        const response = await axios.post<AIResponse>('/api/analyze-task', { task });
        console.log('API response received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error analyzing task:', error);
        if (axios.isAxiosError(error)) {
            console.error('API Error details:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            });
        }
        return {
            analysis: '',
            error: 'Failed to analyze task. Please try again.'
        };
    }
}

export function parseAnalysis(analysis: string) {
    console.log('Parsing analysis:', analysis);
    try {
        // Split the analysis into subtasks
        const lines = analysis.split('\n').filter(line => line.trim());
        console.log('Lines:', lines);

        // Extract subtasks (lines starting with - or * or number.)
        const subtasks = lines.filter(line =>
            line.trim().match(/^[-*]|\d+\./)
        ).map(line =>
            line.replace(/^[-*\d.]\s*/, '').trim()
        );
        console.log('Extracted subtasks:', subtasks);

        // Extract time estimate if present
        const timeMatch = analysis.match(/time:?\s*(\d+[-\s]?\d*\s*(?:min|hour|day)s?)/i);
        const estimatedTime = timeMatch ? timeMatch[1] : undefined;
        console.log('Extracted time:', estimatedTime);

        // Extract complexity
        const complexityMatch = analysis.match(/complex(?:ity)?:?\s*(simple|medium|complex)/i);
        const complexity = complexityMatch ?
            complexityMatch[1].toLowerCase() as 'simple' | 'medium' | 'complex'
            : undefined;
        console.log('Extracted complexity:', complexity);

        // Extract resources
        const resourcesMatch = analysis.match(/resources?:?\s*([^]*?)(?:\n\n|$)/i);
        const resources = resourcesMatch ?
            resourcesMatch[1].split('\n')
                .map(r => r.replace(/^[-*]\s*/, '').trim())
                .filter(Boolean)
            : undefined;
        console.log('Extracted resources:', resources);

        const result = {
            subtasks,
            estimatedTime,
            complexity,
            resources,
            notes: lines
                .filter(line => !line.match(/^[-*]|\d+\.|time:|complex|resources?:/i))
                .join('\n')
                .trim() || undefined
        };
        console.log('Final parsed result:', result);
        return result;
    } catch (error) {
        console.error('Error parsing analysis:', error);
        return {
            subtasks: [],
            notes: analysis
        };
    }
} 