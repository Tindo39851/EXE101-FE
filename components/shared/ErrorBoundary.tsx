"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught exception at boundary root:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full py-16 px-6 bg-red-950/10 border border-dashed border-red-500/20 flex flex-col items-center justify-center text-center font-mono select-none">
          <div className="size-12 border border-red-500/30 flex items-center justify-center text-red-500 text-xl mb-5 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
            ⚠️
          </div>

          <span className="text-red-500 text-[8px] font-black tracking-widest uppercase mb-1">
            ERR_00 // INSTABILITY DETECTED
          </span>

          <h4 className="text-slate-200 text-xs font-bold tracking-widest uppercase">
            RENDER HANDSHAKE FAILURE
          </h4>

          <p className="text-slate-500 text-[10px] mt-2 max-w-sm leading-5 font-sans">
            The target UI component crashed due to an unhandled system state error:
            <code className="block mt-2 py-1 px-2 bg-red-950/30 border border-red-500/10 text-red-400 font-mono text-[9px] break-all">
              {this.state.error?.message || "Unknown error"}
            </code>
          </p>

          <Button
            variant="outline"
            onClick={this.handleReset}
            className="mt-6 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-white text-[9px] font-bold tracking-wider"
          >
            RE-LOAD CONTEXT NODE
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
