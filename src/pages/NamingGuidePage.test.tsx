import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NamingGuidePage } from "@/pages/NamingGuidePage";

describe("NamingGuidePage", () => {
  it("renders naming rules, neutral definition and source list", () => {
    render(<NamingGuidePage />);

    expect(screen.getByRole("heading", { name: /Naming Guide/ })).toBeInTheDocument();
    expect(screen.getByText("Neutral Position")).toBeInTheDocument();
    expect(screen.getByText("Sign Convention")).toBeInTheDocument();
    expect(screen.getByText(/Joint Naming/)).toBeInTheDocument();
    expect(screen.getByText(/Motion Naming & Sign Convention/)).toBeInTheDocument();
    expect(screen.getByText(/Source List/)).toBeInTheDocument();
    expect(screen.getAllByText("aaos_joint_motion_2e").length).toBeGreaterThan(0);
  });
});
