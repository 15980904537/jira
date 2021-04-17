import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { Authenticates } from "./authenticates-app";
import { Unauthenticated } from "./unauthenticates-app/index";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageError } from "./components/lib";
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <Authenticates /> : <Unauthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
