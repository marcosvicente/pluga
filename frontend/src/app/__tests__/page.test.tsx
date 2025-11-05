import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";
import api from "../../lib/api";

jest.mock("../../lib/api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

const mockedApi = jest.mocked(api);

// Tipos e constantes auxiliares
type Snippet = {
    id: string;
    text: string;
    summary: string;
};
type ApiListResponse<T> = { data: T[] };

const ROUTES = {
    SNIPPETS: "/snippets",
} as const;

const UI = {
    TITLE: "Snippet",
    INPUT_PLACEHOLDER: "Add a new snippet...",
    SUBMIT_LABEL: "Add",
} as const;

// Helpers de teste
const renderHome = () => render(<Home />);

const makeSnippet = (id: string, text: string, summary = ""): Snippet => ({
    id,
    text,
    summary,
});

const queueGetSnippets = (snippets: Snippet[]) => {
    mockedApi.get.mockResolvedValueOnce({ data: snippets } as ApiListResponse<Snippet>);
};
const mockPostSnippetOk = () => {
    mockedApi.post.mockResolvedValueOnce({} as unknown as Response);
};


const getInput = () => screen.getByPlaceholderText(UI.INPUT_PLACEHOLDER);
const getSubmitButton = () => screen.getByText(UI.SUBMIT_LABEL);

const submitSnippet = (text: string) => {
    fireEvent.change(getInput(), { target: { value: text } });
    fireEvent.click(getSubmitButton());
};


describe("Home (Snippet page)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders title and form", () => {
        render(<Home />);

        expect(screen.getByText("Snippet")).toBeInTheDocument(); // title
        expect(screen.getByPlaceholderText("Add a new snippet...")).toBeInTheDocument(); // form input (must exist in SnippetForm)
        expect(screen.getByText("Add")).toBeInTheDocument(); // submit button (must exist in SnippetForm)
    });

    test("fetches snippets on mount", async () => {
        queueGetSnippets([makeSnippet("1", "Hi", "Short")]);

        renderHome();

        // Aguarda a renderização dos dados
        expect(await screen.findByText("Text: Hi")).toBeInTheDocument();
        expect(await screen.findByText("Summary: Short")).toBeInTheDocument();

        expect(mockedApi.get).toHaveBeenCalledWith(ROUTES.SNIPPETS);
    });

    test("fetches snippets no have date", async () => {

        queueGetSnippets([makeSnippet()]);

        renderHome();

        // Aguarda a renderização dos dados
        expect(screen.getByText("Nenhum snippet encontrado")).toBeInTheDocument();

        expect(mockedApi.get).toHaveBeenCalledWith(ROUTES.SNIPPETS);
    });

    test("submits a snippet and refreshes list", async () => {
        // Arrange: carga inicial vazia
        queueGetSnippets([]); // initial load
        // Act: mock do POST sucesso
        mockPostSnippetOk();
        // Arrange: resposta após inserir
        queueGetSnippets([makeSnippet("99", "New snippet", "Summary")]);

        renderHome();
        submitSnippet("New snippet");

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith(ROUTES.SNIPPETS, { text: "New snippet" });
            expect(mockedApi.get).toHaveBeenCalledTimes(2);
        });

        expect(screen.getByText("Text: New snippet")).toBeInTheDocument();
        expect(screen.getByText("Summary: Summary")).toBeInTheDocument();


    });
});