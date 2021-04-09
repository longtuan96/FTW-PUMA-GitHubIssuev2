import "./App.css";
<<<<<<< HEAD
import {useState} from "react"

function App() {
  const [user, setuser] = useState("facebook")
  const [repo, setrepo] = useState("react")
  const getRepos = async () =>{
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`
    let res = await fetch(url)
    let data = await res.json()
    console.log(data)
  }
  getRepos();
  return <div></div>;
=======
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);

function App() {
  return (
    <div>
      <Nav_Header />
    </div>
  );
>>>>>>> 59949b5c45566d5ed4ceb338f9d121af28f81c81
}

export default App;
