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
        <div className="flex h-[520px] w-full flex-col items-center justify-center rounded-xl border border-red-500/40 bg-slate-950 p-6 text-center">
          <p className="text-sm font-semibold text-red-200">3D renderer fallback activated</p>
          <p className="mt-2 text-xs text-slate-300">
            WebGL context is unavailable in this environment. Explorer UI remains functional.
          </p>
          {this.state.message && <p className="mt-3 font-mono text-xs text-slate-400">{this.state.message}</p>}
        </div>
      );
    }

    return this.props.children;
  }
}
