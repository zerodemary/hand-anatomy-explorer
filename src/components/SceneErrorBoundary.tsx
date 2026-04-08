import type { ReactNode } from "react";
import { Component } from "react";

type SceneErrorBoundaryProps = {
  children: ReactNode;
};

type SceneErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

export class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = {
    hasError: false
  };

  static getDerivedStateFromError(error: unknown): SceneErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : "Unknown scene rendering error"
    };
  }

  componentDidCatch(error: unknown) {
    console.error("SceneErrorBoundary", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[520px] w-full flex-col items-center justify-center rounded-xl border border-red-400/40 bg-[#091b3a] p-6 text-center">
          <p className="text-sm font-semibold text-red-200">3D renderer fallback activated 已切换到回退视图</p>
          <p className="mt-2 text-xs text-sky-100/85">
            WebGL context is unavailable in this environment 当前环境不支持 WebGL，界面仍可查看数据。
          </p>
          {this.state.message && (
            <p className="mt-3 font-mono text-xs text-sky-100/65">{this.state.message}</p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
