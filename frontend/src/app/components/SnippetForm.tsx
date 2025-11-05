import { useState, type FormEvent, type ChangeEvent } from 'react';

type Props = {
    onAddSnippet: (text: string) => void;
};

export default function SnippetForm({ onAddSnippet }: Props) {
    const [text, setText] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAddSnippet(trimmed);
        setText('');
    };

    const canSubmit = text.trim().length > 0;

    return (
        <form onSubmit={handleFormSubmit} className="flex mb-4">
            <input
                type="text"
                className="flex-grow p-2 border rounded-l"
                placeholder="Add a new snippet..."
                value={text}
                onChange={handleInputChange}
                aria-label="Snippet text"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-r disabled:opacity-50"
                disabled={!canSubmit}
            >
                Add
            </button>
        </form>
    );
}
