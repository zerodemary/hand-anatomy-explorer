import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILES } from "@/data/catalog";
import { LengthsPage } from "@/pages/LengthsPage";

describe("LengthsPage", () => {
  it("renders comparison controls and derived visibility markers", () => {
    const profile = PROFILES.find((item) => item.id === "asian_male_50") ?? PROFILES[0];

    render(<LengthsPage profile={profile} />);

    expect(screen.getByRole("heading", { name: "Lengths" })).toBeInTheDocument();
    expect(screen.getByLabelText("Compare against")).toBeInTheDocument();
    expect(screen.getByText("Comparable Segments")).toBeInTheDocument();
    expect(screen.getByText("thumb_mc")).toBeInTheDocument();
    expect(screen.getAllByText("derived").length).toBeGreaterThan(0);
    expect(screen.getAllByText("direct").length).toBeGreaterThan(0);
  });
});
