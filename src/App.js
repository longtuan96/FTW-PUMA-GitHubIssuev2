import "./App.css";
import NavHeader from "./components/NavHeader";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import IssueInfo from "./components/IssueInfo";
import Content from "./components/Content";

import { Modal } from "react-bootstrap";
import moment from "moment";

function App() {
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesNum, setIssuesNum] = useState(0);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueBody, setIssueBody] = useState("");

  const [commentData, setCommentData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  //get data about issues using the user name and repo

  const [data, setData] = useState([]);
  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
    let res = await fetch(url);
    let data = await res.json();

    console.log("data: ", data);
    setData(data);
  };

  //get comments of a specific issue VD: issue number 21220
  const getComments = async (num) => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/${num}/comments`;
    let res = await fetch(url);
    let commentData = await res.json();

    // console.log("comments: ", commentData);
    setCommentData(commentData);
  };
  useEffect(() => {
    getIssues();
    // getComments(21229);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const elapseTime = (time) => {
    return moment(time).fromNow();
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (issueNum, issueTitle, issueBody) => {
    getComments(issueNum);
    setIssuesNum(issueNum);
    setIssueTitle(issueTitle);
    setIssueBody(issueBody);
    setShowModal(true);
    console.log("modal shown");
  };

  return (
    <div>
      <NavHeader />
      <div className={"container "}>
        {data !== []
          ? data.map((el) => (
              <a
                href
                key={el.number}
                onClick={() => handleShowModal(el.number, el.title, el.body)}
              >
                <Content
                  authorAvatar={el && el.user.avatar_url}
                  issue_number={el && el.number}
                  issue_title={el && el.title}
                  issue_author={el && el.user.login}
                  issue_comment={el && el.comments}
                  issue_lastUpdate={el && elapseTime(el.Updated_At)}
                  issue_body={el && text_truncate(el.body, 100, "...")}
                  issue_labels={el && el.labels}
                />
              </a>
            ))
          : console.log("data didnt load")}
      </div>

      <Modal className="" show={showModal} onHide={handleCloseModal}>
        <IssueInfo
          commentData={commentData !== [] && commentData}
          issueNum={commentData && issuesNum}
          issueTitle={commentData && issueTitle}
          issueBody={commentData && issueBody}
        />
      </Modal>
    </div>
  );
}

export default App;
