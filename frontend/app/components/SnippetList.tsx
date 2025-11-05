"use client";

type Snippet = {
  id: string;
  text: string;
  summary: string;
  completed: boolean;
};

type TodoListProps = {
  snippets: Snippet[];
  onToggleSnippet: (id: string) => void;
};

const baseClickableClass = "cursor-pointer";

function clickableTextClass(completed: boolean): string {
  return `${baseClickableClass} ${completed ? "line-through text-gray-500" : ""}`;
}

export default function TodoList({ snippets, onToggleSnippet }: TodoListProps) {
  const handleToggle =
    (id: string) =>
    () => {
      onToggleSnippet(id);
    };

  return (
    <ul>
      {snippets.map(({ id, text, summary, completed }) => (
        <li key={id} className="flex items-center justify-between p-2 border-b">
          <button
            type="button"
            className={clickableTextClass(completed)}
            onClick={handleToggle(id)}
          >
            {text}
          </button>
          <button
            type="button"
            className={clickableTextClass(completed)}
            onClick={handleToggle(id)}
          >
            {summary}
          </button>
        </li>
      ))}
    </ul>
  );
}
