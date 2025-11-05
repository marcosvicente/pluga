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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const fetchSnippets = useCallback(async (): Promise<void> => {
    try {
        const { data } = await api.get<Snippet[]>("/snippets");
        setSnippets(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Erro ao carregar snippets";
        setErrorMessage(message);
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
            const message = error instanceof Error ? error.message : "Erro ao criar snippet";
            setErrorMessage(message);

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
          {errorMessage ? (
              <>
                  <div role="alert">Ocorreu um erro</div>
                  <div role="alert">{errorMessage}</div>
              </>

              ) : (
              <>
                  <SnippetForm onAddSnippet={submitSnippet} />
                  <SnippetList snippets={snippets} />
              </>
          )}

      </div>
  );
}
