import React from "react";
import { Media } from "react-bootstrap";

const Comment = ({
  commentBody,
  commentAuthor,
  commentTime,
  commentAvatar,
}) => {
  return (
    <div>
      <Media>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={commentAvatar}
          alt="A pic"
        />
        <Media.Body>
          <p>{`@${commentAuthor} commented ${commentTime}`}</p>
          <p>{commentBody}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;
