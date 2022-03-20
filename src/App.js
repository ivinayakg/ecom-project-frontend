import "./App.css";
import { UserContextProvider } from "./context & data/UserContext";
import Main from "./pages/main";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <React.StrictMode>
            <Main />
          </React.StrictMode>
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
