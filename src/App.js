import "./App.css";
import { UserContextProvider } from "./context & data/UserContext";
import Main from "./pages/main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <UserContextProvider>
          <Main />
        </UserContextProvider>
      </div>
    </Router>
  );
}

export default App;
