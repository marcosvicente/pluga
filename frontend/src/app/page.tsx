"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";

type Snippet = {
  id: string;
  text: string;
  summary: string;
};

const TITLE = "Snippet";
const CONTAINER_CLASSES = "container mx-auto p-4";
const TITLE_CLASSES = "text-3xl font-bold text-center mb-6";

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const fetchSnippets = useCallback(async (): Promise<void> => {
    try {
        const { data } = await api.get<Snippet[]>("/snippets");
        setSnippets(data);
    } catch (error) {
        console.error("[Snippets] Falha ao carregar:", error);
    }
  }, []);

  const submitSnippet = useCallback(
      async (text: string): Promise<void> => {
        const newText = text?.trim();
        if (!newText) return;
        try {
          await api.post("/snippets", { text: newText });
          await fetchSnippets();
        } catch (error) {
          console.error("[Snippets] Falha ao adicionar:", error);
        }
      },
      [fetchSnippets]
  );

  useEffect(() => {
    void fetchSnippets();
  }, [fetchSnippets]);

  return (
      <div className={CONTAINER_CLASSES}>
        <h1 className={TITLE_CLASSES}>{TITLE}</h1>
        <SnippetForm onAddSnippet={submitSnippet} />
        <SnippetList snippets={snippets} />
      </div>
  );
}
