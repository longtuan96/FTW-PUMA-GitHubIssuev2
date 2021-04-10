import React from "react";
import { Media } from "react-bootstrap";
import IssueLabel from "./IssueLabel";

const Content = ({
  authorAvatar,
  issue_number,
  issue_title,
  issue_author,
  issue_comment,
  issue_lastUpdate,
  issue_body,
  issue_labels,
}) => {
  return (
    <div className="div-content">
      <Media>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={authorAvatar}
          alt="the avatar"
        />
        <Media.Body>
          <h4>{`#${issue_number} ${issue_title}`}</h4>
          <h6>{`@${issue_author} Last updated: ${issue_lastUpdate} Comment:${issue_comment}`}</h6>
          <p>{issue_body}</p>
          <div className={"divLabel"}>
            {issue_labels.map((item) => (
              <IssueLabel key={item.id} name={item.name} />
            ))}
          </div>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Content;
