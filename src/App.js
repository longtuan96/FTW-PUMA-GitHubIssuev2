import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee);

import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  
  console.log(API_KEY);
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesId, setIssuesId] = useState(21209);
  // const octokit = new Octokit({ auth: `${API_KEY}` });
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
  };
  useEffect(() => {
    getIssues();
  }, []);
  return (
    <div>
      <Nav_Header />
    </div>
  );
}

export default App;
