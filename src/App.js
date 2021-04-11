import "./App.css";
import NavHeader from "./components/NavHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useEffect, useState } from "react";
import IssueInfo from "./components/IssueInfo";
import Content from "./components/Content";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Pagenumber from "./components/Pagenumber";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 100px;
  border-color: green;
`;
function App() {
  const [user, setUser] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [issuesNum, setIssuesNum] = useState(0);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueBody, setIssueBody] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //get data about issues using the user name and repo
  const [currentpage, setcurrentpage] = useState(1);
  const [perpage] = useState(12); // perpage is const, no need setperpage
  const [totalpagenum, setTotalpagenum] = useState();
  const [pagenumlimit] = useState(5); // no need setPagenumlimit, so delete for deploy
  const [maxpagenumlimit, setMaxpagenumlimit] = useState(5);
  const [minpagenumlimit, setMinpagenumlimit] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIssues = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${currentpage}&per_page=${perpage}`;
    let res = await fetch(url);
    let data = await res.json();
    setData(data);
    console.log("data: ", data);
  };

  //get comments of a specific issue VD: issue number 21220
  const getComments = async (num) => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues/${num}/comments`;
    let res = await fetch(url);
    let commentData = await res.json();

    setCommentData(commentData);
    console.log("comments: ", commentData);
  };

  // Get totalnumber of page based on perpage ---------->
  const getEntirepage = async () => {
    let url = `https://api.github.com/repos/${user}/${repo}/issues?page=${currentpage}&per_page=${perpage}`;
    let res = await fetch(url);
    const link = res.headers.get("link");

    if (link) {
      const getTotalPage = link.match(/page=(\d+)&per_page=\d+>; rel="last"/); // regular expression
      if (getTotalPage) {
        setTotalpagenum(parseInt(getTotalPage[1]));
      }
      console.log(getTotalPage);
    }
  };

  useEffect(() => {
    window.scrollBy(0, -10);
    setLoading(true);

    getIssues();
    // getComments(21229);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getEntirepage();
    setLoading(false);
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

  // Change page ----------->
  const paginate = (number) => {
    console.log(number);
    setcurrentpage(number);
    console.log(totalpagenum);
    if (number === 1) {
      setMaxpagenumlimit(5);
      setMinpagenumlimit(0);
    } else if (number === Math.ceil(totalpagenum)) {
      setMaxpagenumlimit(Math.ceil(totalpagenum));
      setMinpagenumlimit(Math.ceil(totalpagenum) - pagenumlimit);
    }
  };
  const decrease = () => {
    setcurrentpage((currentpage) => --currentpage);
    if (currentpage - 1 <= minpagenumlimit) {
      setMaxpagenumlimit(maxpagenumlimit - pagenumlimit);
      setMinpagenumlimit(minpagenumlimit - pagenumlimit);
    }
    console.log(currentpage);
  };

  const increase = () => {
    setcurrentpage((currentpage) => ++currentpage);
    if (currentpage + 1 > maxpagenumlimit) {
      setMaxpagenumlimit(maxpagenumlimit + pagenumlimit);
      setMinpagenumlimit(minpagenumlimit + pagenumlimit);
    }
    console.log(currentpage);
  };
  const handleInput = (string) => {
    let stringArray = string.split("/");
    setUser(stringArray[0]);
    setRepo(stringArray[1]);
    getIssues();
    console.log("function work");
  };
  return (
    <div>
      {loading ? (
        <ClipLoader
          color="#2cfc03"
          loading={loading}
          css={override}
          size={150}
        />
      ) : (
        <div>
          <NavHeader handleInput={handleInput} />
          <Pagenumber
            className="text-center"
            totalpagenum={totalpagenum}
            perpage={perpage}
            currentpage={currentpage}
            paginate={paginate}
            decrease={decrease}
            increase={increase}
            pagenumlimit={pagenumlimit}
            maxpagenumlimit={maxpagenumlimit}
            minpagenumlimit={minpagenumlimit}
          />
          <div className={"container"}>
            {data !== []
              ? data.map((el) => (
                  <a
                    href
                    key={el.number}
                    onClick={() =>
                      handleShowModal(el.number, el.title, el.body)
                    }
                  >
                    <Content
                      className="hover"
                      authorAvatar={el && el.user.avatar_url}
                      issue_number={el && el.number}
                      issue_title={el && el.title}
                      issue_author={el && el.user.login}
                      issue_comment={el && el.comments}
                      // issue_lastUpdate={el && elapseTime(el.Updated_At)}
                      issue_lastUpdate={
                        el && moment(el.Updated_At).startOf("day").fromNow()
                      }
                      issue_body={el && text_truncate(el.body, 100, "...")}
                      issue_labels={el && el.labels}
                    />
                  </a>
                ))
              : console.log("data didnt load")}
          </div>

          <Modal className="" show={showModal} onHide={handleCloseModal}>
            <IssueInfo
              commentData={commentData}
              issueNum={issuesNum}
              issueTitle={issueTitle}
              issueBody={issueBody}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
