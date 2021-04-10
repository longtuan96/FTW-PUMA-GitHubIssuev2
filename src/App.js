import "./App.css";
import Nav_Header from "./components/Nav_Header";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";

import { useEffect, useState } from "react";
import IssueInfo from "./components/IssueInfo";

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
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();

    console.log("data: ", res);
    setIssuesNum(data[0].number);
    setissueTitle(data[0].title);
  };

  //get comments of a specific issue VD: issue number 21209
  const getComments = async (num) => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/${num}/comments`;
    let res = await fetch(url);
    let data = await res.json();

    console.log("comments: ", data);
    setCommentBody(data[0].body);
    setCommentAvatar(data[0].user.avatar_url);
  };
  useEffect(() => {
    getIssues();
    getComments(21209);
  }, []);
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
    </div>
  );
}

export default App;
