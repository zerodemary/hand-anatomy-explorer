import { AssetPlaceholderHandScene } from "@/components/AssetPlaceholderHandScene";
import { ParametricHandScene } from "@/components/ParametricHandScene";
import type {
  HandModelAdapterId,
  HandModelAdapterProps,
  HandModelAdapterRenderer
} from "@/core/hand-model-adapter";

const ADAPTER_RENDERERS: Record<HandModelAdapterId, HandModelAdapterRenderer> = {
  parametric_v1: ParametricHandScene,
  gltf_placeholder_v1: AssetPlaceholderHandScene
};

export function HandModelAdapterHost({ adapterId, ...props }: HandModelAdapterProps & { adapterId: HandModelAdapterId }) {
  const Renderer = ADAPTER_RENDERERS[adapterId] ?? ADAPTER_RENDERERS.parametric_v1;
  return <Renderer {...props} />;
}
