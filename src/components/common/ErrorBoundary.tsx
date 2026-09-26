import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button, Card } from '../ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-[var(--border-color)] bg-[var(--bg-surface)] p-8 text-center space-y-6 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">
                Application Exception Encountered
              </h1>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                An unexpected interface issue occurred. Your data is safe and our systems remain operational.
              </p>
            </div>

            {this.state.error && process.env.NODE_ENV !== 'production' && (
              <div className="p-3 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] text-left text-xs font-mono text-rose-300 max-h-40 overflow-y-auto">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReload}
                leftIcon={<RefreshCw className="w-4 h-4 text-[var(--bg-primary)]" />}
              >
                Reload Application
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={this.handleGoHome}
                leftIcon={<Home className="w-4 h-4 text-[var(--accent-color)]" />}
              >
                Return to Homepage
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
