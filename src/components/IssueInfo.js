import moment from "moment";
import React from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Comment from "./Comment";

const IssueInfo = ({ commentData, issueNum, issueTitle, issueBody }) => {
  const elapseTime = (time) => {
    return moment(time).fromNow();
  };
  return (
    <div>
      <>
        <Modal.Header closeButton>
          <Modal.Title>{`#${issueNum} ${issueTitle}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${issueBody}`}</Modal.Body>
        <ModalFooter>
          <div className={"text-left"}>
            {commentData.length === 0 ? (
              <div>
                <p>No comment</p>
              </div>
            ) : (
              <div>
                <h1>{"Comments:"}</h1>
                {commentData.map((item) => (
                  <Comment
                    key={item.id}
                    commentBody={item.body}
                    commentAuthor={item.user.login}
                    commentTime={elapseTime(item.created_at)}
                    commentAvatar={item.user.avatar_url}
                  />
                ))}
              </div>
            )}
          </div>
        </ModalFooter>
      </>
    </div>
  );
};

export default IssueInfo;
