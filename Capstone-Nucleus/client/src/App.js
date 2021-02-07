import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
// import { ToastContainer } from "react-toastify";
import "./App.css";
// import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* <ToastContainer hideProgressBar position="bottom-right" /> */}
      <UserProfileProvider>
        <Router>
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;