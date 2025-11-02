import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // ✅ Catch rendering errors in children
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // ✅ Log error details for debugging
  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // ✅ Fallback UI
      return <h2>Something went wrong 😢</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary
