import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);

function App() {
<<<<<<< HEAD
  return <div></div>;
=======
  return (
    <div>
      <Nav_Header />
    </div>
  );
>>>>>>> 59949b5c45566d5ed4ceb338f9d121af28f81c81
}

export default App;
