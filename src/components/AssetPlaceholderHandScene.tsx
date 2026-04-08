import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { HandModelAdapterProps } from "@/core/hand-model-adapter";

export function AssetPlaceholderHandScene(_: HandModelAdapterProps) {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-xl border border-cyan-300/20 bg-[#081b3a]">
      <Canvas camera={{ position: [0, 4.6, 10], fov: 38 }}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <mesh rotation={[-0.15, 0.15, 0]}>
          <boxGeometry args={[4.5, 2.8, 1.7]} />
          <meshStandardMaterial color="#4d6f95" metalness={0.1} roughness={0.7} />
        </mesh>
        <OrbitControls makeDefault enablePan enableZoom enableRotate />
      </Canvas>

      <div className="pointer-events-none absolute left-3 top-3 rounded border border-amber-400/40 bg-amber-900/40 px-3 py-2 text-xs text-amber-200">
        GLTF adapter placeholder only 非主路径，仅预留接口。
      </div>
    </div>
  );
}
