import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(    ) {
        // Update state to display the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log error details if needed (e.g., to an error reporting service)
        console.error("ErrorBoundary caught an error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return <h1>Something went wrong while rendering this component.</h1>;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children are passed and are valid React nodes
};



export default ErrorBoundary;
