import "./App.css";
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
}

export default App;
