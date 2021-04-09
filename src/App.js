import "./App.css";

import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  console.log(API_KEY);
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  // const octokit = new Octokit({ auth: `${API_KEY}` });
  const getData = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
  };
  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}

export default App;
