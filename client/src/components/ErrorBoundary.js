import { Component } from "react";
import Error from "./Error";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false
        }
    }

    //render
    static getDerivedStateFromError() {
        return { error: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if(this.state.error) {
            return (
                <Error />
            )   
        }

        return this.props.children;
    }
}

export default ErrorBoundary;