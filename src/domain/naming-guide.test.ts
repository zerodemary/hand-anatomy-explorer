import { describe, expect, it } from "vitest";
import { getNamingGuideReadModel } from "@/domain/naming-guide";

describe("naming guide read model", () => {
  it("returns rule, joint and motion naming rows with source traceability", () => {
    const model = getNamingGuideReadModel();

    expect(model.rules.length).toBeGreaterThan(0);
    expect(model.jointRows.length).toBeGreaterThan(0);
    expect(model.motionRows.length).toBeGreaterThan(0);
    expect(model.sourceTrace.sourceIds.length).toBeGreaterThan(0);
  });

  it("includes neutral and sign convention rule ids", () => {
    const model = getNamingGuideReadModel();
    const ruleIds = model.rules.map((rule) => rule.id);

    expect(ruleIds).toContain("neutral_definition");
    expect(ruleIds).toContain("sign_convention");
  });
});
