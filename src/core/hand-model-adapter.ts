import type { ComponentType } from "react";
import type { Profile } from "@/data/schema";

export type SelectableId = {
  type: "joint" | "segment";
  id: string;
};

export type HandModelAdapterId = "parametric_v1" | "gltf_placeholder_v1";

export type HandModelAdapterProps = {
  profile: Profile;
  selected?: SelectableId;
  hovered?: SelectableId;
  onSelect: (selection: SelectableId) => void;
  onHover: (selection: SelectableId | undefined) => void;
};

export type HandModelAdapterDefinition = {
  id: HandModelAdapterId;
  label: string;
  mode: "parametric" | "asset";
  status: "active" | "placeholder";
  description: string;
};

export type HandModelAdapterRenderer = ComponentType<HandModelAdapterProps>;

export const HAND_MODEL_ADAPTERS: HandModelAdapterDefinition[] = [
  {
    id: "parametric_v1",
    label: "Parametric Simplified Hand",
    mode: "parametric",
    status: "active",
    description: "Code-generated mesh model driven by profile and measurement data."
  },
  {
    id: "gltf_placeholder_v1",
    label: "GLTF Asset Adapter (Future)",
    mode: "asset",
    status: "placeholder",
    description: "Reserved adapter interface for future low-poly GLB hand meshes."
  }
];

export const ACTIVE_HAND_MODEL_ADAPTER_ID: HandModelAdapterId = "parametric_v1";

export function getHandModelAdapterById(id: HandModelAdapterId): HandModelAdapterDefinition {
  return HAND_MODEL_ADAPTERS.find((adapter) => adapter.id === id) ?? HAND_MODEL_ADAPTERS[0];
}
