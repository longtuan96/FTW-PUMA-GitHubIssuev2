import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Pagenumber from "./components/Pagenumber"


function App() {
  
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesId, setIssuesId] = useState(21209);
  const [page, setpage] = useState(1);
  const [perpage, setperpage] = useState(12);

  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${page}&per_page=${perpage}`;
    let res = await fetch(url);
    const link = res.headers.get("link");
    console.log("this is link",link)
    let data = await res.json();
    console.log("data: ", data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
  
    console.log("data: ", data);
  };

  const increasepage = () =>{
    console.log(page)
    // setpage(2)
  }
  useEffect(() => {
    getIssues();
  }, []);
  return (
    <div>
      <Nav_Header/>
      <Pagenumber page={page} perpage={perpage} increasepage={increasepage}/>
    </div>
  );
}

export default App;
