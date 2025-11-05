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
    text: (value: string) => `Text: ${value}`,
    summary: (value: string) => `Summary: ${value}`,
} as const;

// Helpers de teste
const renderHome = () => render(<Home />);

const makeSnippet = (id: string, text: string, summary = ""): Snippet => ({
    id,
    text,
    summary,
});

const mockGetSnippetsOnce = (snippets: Snippet[]) => {
    mockedApi.get.mockResolvedValueOnce({ data: snippets } as ApiListResponse<Snippet>);
};

const mockPostSnippetSuccess = () => {
    mockedApi.post.mockResolvedValueOnce({} as any);
};

const getInput = () => screen.getByPlaceholderText(UI.INPUT_PLACEHOLDER);
const getSubmitButton = () => screen.getByText(UI.SUBMIT_LABEL);

const submitSnippet = (text: string) => {
    fireEvent.change(getInput(), { target: { value: text } });
    fireEvent.click(getSubmitButton());
};

const fillAndSubmitSnippet = (text: string) => submitSnippet(text);

const expectSnippetVisible = async (snippet: Pick<Snippet, "text" | "summary">) => {
    expect(await screen.findByText(UI.text(snippet.text))).toBeInTheDocument();
    expect(await screen.findByText(UI.summary(snippet.summary))).toBeInTheDocument();
};

describe("Home (Snippet page)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedApi.get.mockResolvedValue({ data: [] } as ApiListResponse<Snippet>);
    });

    test("renders title and form", async()
        => {
        renderHome();
        expect(screen.getByText(UI.TITLE)).toBeInTheDocument();
        expect(getInput()).toBeInTheDocument();
        expect(getSubmitButton()).toBeInTheDocument();

        await waitFor(() =>
            expect(mockedApi.get).toHaveBeenCalledWith(ROUTES.SNIPPETS)
        );
    });

    test("fetches snippets on mount", async () => {
        mockGetSnippetsOnce([makeSnippet("1", "Hi", "Short")]);
        renderHome();

        await expectSnippetVisible({ text: "Hi", summary: "Short" });
        expect(mockedApi.get).toHaveBeenCalledWith(ROUTES.SNIPPETS);
    });

    test("submits a snippet and refreshes list", async () => {
        const newText = "New snippet";
        const newSummary = "Summary";

        mockGetSnippetsOnce([]);
        mockPostSnippetSuccess();
        mockGetSnippetsOnce([makeSnippet("99", newText, newSummary)]);

        renderHome();
        fillAndSubmitSnippet(newText);

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith(ROUTES.SNIPPETS, { text: newText });
            expect(mockedApi.get).toHaveBeenCalledTimes(2);
        });

        await expectSnippetVisible({ text: newText, summary: newSummary });
    });
});