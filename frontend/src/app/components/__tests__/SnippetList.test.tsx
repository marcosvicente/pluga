import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SnippetList from "../SnippetList";

type Snippet = {
    id: string;
    text: string;
    summary: string;
};

describe("SnippetList", () => {
    test('renders the snippet item content', () => {
        const snippets: Snippet[] = [{ id: "1", text: "What is love?", summary: "Pain!" }];
        render(<SnippetList snippets={snippets} onToggle={jest.fn()} />);

        expect(screen.getByText("Text: What is love?")).toBeInTheDocument();
        expect(screen.getByText("Summary: Pain!")).toBeInTheDocument();
    });


    test('renders the snippet no item content', () => {
        const snippets: Snippet[] = [];
        render(<SnippetList snippets={snippets} onToggle={jest.fn()} />);

        expect(screen.getByText("Nenhum snippet encontrado")).toBeInTheDocument();
    });

});