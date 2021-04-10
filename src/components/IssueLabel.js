import React from "react";

const IssueLabel = (props) => {
  return (
    <div className={"issueLabel"}>
      <p>{props.name}</p>
    </div>
  );
};

export default IssueLabel;
