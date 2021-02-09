import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <Router>
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;