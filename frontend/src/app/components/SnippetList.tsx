"use client";

type Snippet = {
  id: string;
  text: string;
  summary: string;
};

type SnippetListProps = {
    snippets: Snippet[];
    onToggleSnippet?: (id: string) => void;
};

const EMPTY_MESSAGE = "Nenhum snippet encontrado";

export default function SnippetList({snippets, onToggleSnippet}: SnippetListProps) {
    if (!snippets || snippets.length === 0) return <p>{EMPTY_MESSAGE}</p>;

    return (
        <ul>
            {snippets.map((s) => (
                <li key={s.id} className="max-w-lg mx-auto mt-12 p-8 rounded-xl bg-white/40 backdrop-blur-md border border-white/20 shadow-md">
                    <p className="mt-2 text-gray-800/90">{`Summary: ${s.summary}`}</p>
                    <p className="mt-2 text-gray-800/90">{`Text: ${s.text}`}</p>

                    {onToggleSnippet && (
                        <button type="button" onClick={() => onToggleSnippet(s.id)}>
                            Toggle
                        </button>
                    )}
                </li>
            ))}
        </ul>

    );
}
