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
  // State tui add them vao ---------->
  const [currentpage, setcurrentpage] = useState(1); 
  const [perpage] = useState(7); // perpage is const, no need setperpage
  const [totalpagenum, setTotalpagenum] = useState();
  const [pagenumlimit, setPagenumlimit] = useState(5);
  const [maxpagenumlimit, setMaxpagenumlimit] = useState(5);
  const [minpagenumlimit, setMinpagenumlimit] = useState(0);
  //---------->
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${currentpage}&per_page=${perpage}`;
    let res = await fetch(url);
    let data = await res.json();
    setdata(data)
    console.log("data: ", data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
    setdata(data)
    console.log("data: ", data);
  };

 // Get totalnumber of page based on perpage ---------->
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

  // truncate content
  const text_truncate = (str, length, ending) => {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  // Change page ----------->
  const paginate =(number)=>{
    console.log(number)
    setcurrentpage(number)
    console.log(totalpagenum)
  }
  const decrease = ()=>{
    setcurrentpage((currentpage)=>--currentpage)
    if((currentpage -1)%pagenumlimit === 0){
      setMaxpagenumlimit(maxpagenumlimit - pagenumlimit);
      setMinpagenumlimit(minpagenumlimit - pagenumlimit);
    }
    console.log(currentpage)
  }

  const increase = ()=>{
    setcurrentpage((currentpage)=>++currentpage)
    if(currentpage +1 > maxpagenumlimit){
      setMaxpagenumlimit(maxpagenumlimit + pagenumlimit);
      setMinpagenumlimit(minpagenumlimit + pagenumlimit);
    }
    console.log(currentpage)
  }

  return (
    <div>
      <Nav_Header/>
      <Pagenumber totalpagenum={totalpagenum} perpage={perpage} currentpage={currentpage} paginate={paginate} decrease={decrease} increase={increase}
                  pagenumlimit={pagenumlimit} maxpagenumlimit={maxpagenumlimit} minpagenumlimit={minpagenumlimit} />
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
