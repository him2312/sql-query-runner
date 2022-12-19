import React from "react";
import styled from "styled-components";
import { Button } from "./Button/Button";

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <ErrorContainer>
            <h1>Something went wrong.</h1>
            <Button width="200" handleClick={() => window.location.reload()} buttonType="secondary">Reload</Button>
        </ErrorContainer>;
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary;