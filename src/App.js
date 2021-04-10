import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Pagenumber from "./components/Pagenumber"
import Content from "./components/Content"


function App() {
  
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesId, setIssuesId] = useState(21209);
  const [data, setdata] = useState([]);
  const [currentpage, setcurrentpage] = useState(1); 
  const [perpage] = useState(9); // perpage is const, no need setperpage
  const [totalpagenum, setTotalpagenum] = useState();

  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${currentpage}&per_page=${perpage}`;
    let res = await fetch(url);
    let data = await res.json();
    console.log("data: ", data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
    console.log("data: ", data);
  };

 // Get totalnumber of page based on perpage
  const getEntirepage = async () =>{
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${currentpage}&per_page=${perpage}`;
    let res = await fetch(url);
    const link = res.headers.get("link");

    if (link) {
      const getTotalPage = link.match(/page=(\d+)&per_page=\d+>; rel="last"/); // regular expression
      if (getTotalPage) {
        setTotalpagenum(parseInt(getTotalPage[1]));}
    }
  }

  useEffect(() => {
    getIssues();
    getEntirepage();
  }, [currentpage]);

  // Change page
  const paginate =(number)=>{
    console.log(number)
    setcurrentpage(number)
    console.log(totalpagenum)
  }
  const decrease = ()=>{
    setcurrentpage((currentpage)=>--currentpage)
    console.log(currentpage)
  }

  const increase = ()=>{
    setcurrentpage((currentpage)=>++currentpage)
    console.log(currentpage)
  }

  return (
    <div>
      <Nav_Header/>
      <Pagenumber totalpagenum={totalpagenum} perpage={perpage} paginate={paginate} decrease={decrease} increase={increase} />
      <Content
        img={data[0] && data[0].user.avatar_url}
        content_title={data[0] && data[0].title}
        content_text={data[0] && text_truncate(data[0].body, 100, "...")}
        content_comment={data[0] && data[0].comments}
      />
    </div>
  );
}

export default App;
