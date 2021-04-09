import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "./components/Content";
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
function App() {
  console.log(API_KEY);
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesId, setIssuesId] = useState(21209);
  const [data, setData] = useState("");
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    console.log("data: ", data);
    setData(data);
  };
  const getComments = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/21209/comments`;
    let res = await fetch(url);
    let data = await res.json();
    // let res = await octokit.request("GET /issues");
    setData(data);
  };
  useEffect(() => {
    getIssues();
  }, []);
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
  return (
    <div>
      <Nav_Header />
      <Content
        img={data[0] && data[0].user.avatar_url}
        content_title={data[0].title}
        content_text={text_truncate(data[0].body, 100, "...")}
        content_comment={data[0].comments}
      />
    </div>
  );
}

export default App;
