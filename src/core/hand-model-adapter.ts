import type { Profile } from "@/data/schema";

export type SelectableId = {
  type: "joint" | "segment";
  id: string;
};

export type HandModelAdapterProps = {
  profile: Profile;
  selected?: SelectableId;
  onSelect: (selection: SelectableId) => void;
};

export type HandModelAdapter = {
  id: string;
  label: string;
  mode: "parametric" | "asset";
};

export const ACTIVE_HAND_MODEL_ADAPTER: HandModelAdapter = {
  id: "parametric_v1",
  label: "Parametric Simplified Hand",
  mode: "parametric"
};

export const FUTURE_HAND_MODEL_ADAPTER: HandModelAdapter = {
  id: "gltf_adapter_placeholder",
  label: "GLTF Low-Poly Hand (Future)",
  mode: "asset"
};
