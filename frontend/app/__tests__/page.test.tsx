import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import api from "@/lib/api";


jest.mock("@/lib/api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
    },
}));

import api from "@/lib/api";
const mockedApi = jest.mocked(api);


describe("Home (Snippet page)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders title and form", () => {
        render(<Home />);

        expect(screen.getByText("Snippet")).toBeInTheDocument(); // title
        expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument(); // form input (must exist in SnippetForm)
        expect(screen.getByText("Add")).toBeInTheDocument(); // submit button (must exist in SnippetForm)
    });

    test("fetches snippets on mount", async () => {
        mockedApi.get.mockResolvedValueOnce({
            data: [{ id: "1", text: "Hi", summary: "Short" }],
        });

        render(<Home />);

        await waitFor(() => {
            expect(mockedApi.get).toHaveBeenCalledWith("/snippets");
        });

        expect(screen.getByText("Hi")).toBeInTheDocument(); // must exist in SnippetList UI
    });

    test("submits a snippet and refreshes list", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: [] }); // initial load
        mockedApi.post.mockResolvedValueOnce({}); // submission
        mockedApi.get.mockResolvedValueOnce({
            data: [{ id: "99", text: "New snippet", summary: "hey" }],
        }); // second fetch after submitting

        render(<Home />);

        fireEvent.change(screen.getByPlaceholderText("Enter text..."), {
            target: { value: "New snippet" },
        });

        fireEvent.click(screen.getByText("Add"));

        await waitFor(() => {
            expect(mockedApi.post).toHaveBeenCalledWith("/snippets", {
                text: "New snippet",
            });
            expect(mockedApi.get).toHaveBeenCalledTimes(2);
        });

        expect(screen.getByText("New snippet")).toBeInTheDocument();
    });
});