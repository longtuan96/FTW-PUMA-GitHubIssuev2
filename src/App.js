import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import IssueInfo from "./components/IssueInfo";
import Content from "./components/Content";

function App() {
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesNum, setIssuesNum] = useState(21209);
  const [issueTitle, setissueTitle] = useState("");

  const [issueBody, setIssueBody] = useState("");
  const [comments, setComments] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [commentUser, setCommentUser] = useState("");
  const [commentElapseTime, setCommentElapseTime] = useState("");
  const [commentAvatar, setCommentAvatar] = useState("");

  //get data about issues using the user name and repo

  const [data, setData] = useState({});
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();

    console.log("data: ", res);
    setIssuesNum(data[0].number);
    setissueTitle(data[0].title);

    setData(data);
  };

  //get comments of a specific issue VD: issue number 21209
  const getComments = async (num) => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/${num}/comments`;
    let res = await fetch(url);
    let data = await res.json();

    // console.log("comments: ", data);
    setCommentBody(data[0].body);
    setCommentAvatar(data[0].user.avatar_url);

    setData(data);
  };
  useEffect(() => {
    getIssues();
    getComments(21209);
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
      <IssueInfo
        issue_number={issuesNum}
        issue_title={issueTitle}
        issue_body={issueBody}
        comment_user={commentUser}
        comment_elapseTime={commentElapseTime}
        comment_avatar={commentAvatar}
        comment_body={commentBody}
      />
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
