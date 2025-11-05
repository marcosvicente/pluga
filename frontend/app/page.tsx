"use client";

import { useCallback, useEffect, useState } from 'react';

import SnippetForm from './components/SnippetForm';
import SnippetList from './components/SnippetList';

type Snippet = {
    id: number;
    text: string;
    completed: boolean;
};

const STORAGE_KEY = 'snippets';

function isSnippetArray(value: unknown): value is Snippet[] {
    return (
        Array.isArray(value) &&
        value.every(
            (item) =>
                item &&
                typeof item === 'object' &&
                'id' in item &&
                'text' in item &&
                'completed' in item
        )
    );
}

function loadSnippetsFromStorage(): Snippet[] {
    if (typeof window === 'undefined') return [];
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return isSnippetArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveSnippetsToStorage(items: Snippet[]): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function Home() {
    const [snippets, setSnippets] = useState<Snippet[]>(() => loadSnippetsFromStorage());

    useEffect(() => {
        saveSnippetsToStorage(snippets);
    }, [snippets]);

    const handleAddSnippet = useCallback((text: string) => {
        setSnippets((prev) => [...prev, { id: Date.now(), text, completed: false }]);
    }, []);

    const handleToggleSnippet = useCallback((id: number) => {
        setSnippets((prev) =>
            prev.map((snippet) =>
                snippet.id === id ? { ...snippet, completed: !snippet.completed } : snippet
            )
        );
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Snippet</h1>
            <SnippetForm onAddSnippet={handleAddSnippet} />
            <SnippetList snippets={snippets} onToggleSnippet={handleToggleSnippet} />
        </div>
    );
}
