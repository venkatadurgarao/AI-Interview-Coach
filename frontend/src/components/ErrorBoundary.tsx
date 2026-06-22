import React from "react";

type Props = {
    children: React.ReactNode
}
type State = {
    hasError: boolean;
    error: Error | null
}
class ErrorBoundary extends React.Component<Props, State> {
    constructor(props:Props){
        super(props)
        this.state = {
            hasError: false, 
            error: null
        }
    }

    static getDerivedStateFromError(error: Error): State{
        return {
            hasError: true,
            error
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("Caught by Error Boundary: ", error, errorInfo)
        
    }

    render() {
        if(this.state.hasError){
            return (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error?.message}</p>
                </div>
            )
        }
        return this.props.children
    }



    
}


export default ErrorBoundary