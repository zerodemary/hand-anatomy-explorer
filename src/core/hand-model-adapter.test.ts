import { describe, expect, it } from "vitest";
import {
  ACTIVE_HAND_MODEL_ADAPTER_ID,
  HAND_MODEL_ADAPTERS,
  getHandModelAdapterById
} from "@/core/hand-model-adapter";

describe("hand model adapter registry", () => {
  it("has parametric adapter as active default", () => {
    const active = getHandModelAdapterById(ACTIVE_HAND_MODEL_ADAPTER_ID);

    expect(active.id).toBe("parametric_v1");
    expect(active.mode).toBe("parametric");
    expect(active.status).toBe("active");
  });

  it("contains future asset placeholder adapter", () => {
    const assetAdapter = HAND_MODEL_ADAPTERS.find((item) => item.id === "gltf_placeholder_v1");

    expect(assetAdapter).toBeTruthy();
    expect(assetAdapter?.mode).toBe("asset");
    expect(assetAdapter?.status).toBe("placeholder");
  });
});
