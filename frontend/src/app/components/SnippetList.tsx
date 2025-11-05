"use client";

type Snippet = {
  id: string;
  text: string;
  summary: string;
};

const EMPTY_MESSAGE = "Nenhum snippet encontrado";

export default function SnippetList({snippets, onToggleSnippet}: SnippetListProps) {
    if (snippets.length === 0) return <p>{EMPTY_MESSAGE}</p>;

    return (
        <ul>
            {snippets.map((snippet) => (
                <li
                    key={snippet.id}
                    className="flex items-center justify-between p-2 border-b"
                    onClick={onToggleSnippet ? handleToggle(snippet.id) : undefined}
                >
                    <span className="text-sm text-muted-foreground">Summary: {snippet.summary}</span>
                    <span className="text-sm text-muted-foreground">Text: {snippet.text}</span>
                </li>
            ))}
        </ul>
    );
}
