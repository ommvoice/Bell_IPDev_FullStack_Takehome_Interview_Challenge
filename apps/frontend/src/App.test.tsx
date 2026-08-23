import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and displays the store name in the app bar", async () => {
    const mockResponse = { name: "The Tech Library" };

    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse),
    }) as unknown as typeof fetch;

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("The Tech Library")).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3005/api/store-name",
    );
  });

  it("renders the placeholder text", () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ name: "" }),
    }) as unknown as typeof fetch;

    render(<App />);

    expect(
      screen.getByText("Product Library will go here"),
    ).toBeInTheDocument();
  });
});
