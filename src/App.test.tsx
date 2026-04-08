import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("App navigation", () => {
  it("switches tabs", async () => {
    render(<App />);

    expect(screen.getByText("3D Explorer (Approach A Primary)")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Lengths" }));
    expect(screen.getByRole("heading", { name: "Lengths" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Naming Guide" }));
    expect(screen.getByRole("heading", { name: "Joint Naming" })).toBeInTheDocument();
  });
});
