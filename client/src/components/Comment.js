import React from "react";
import formatDistance from "date-fns/formatDistance";
import NewComment from "./NewComment";

import { Container, Card, Button } from "react-bootstrap";

const Comment = ({ comment }) => {
  const [replying, setReplying] = React.useState(false);
  const hasChildren = comment.children && comment.children.length;

  if (comment) {
    return (
      <Container>
        <Card style={{ maxWidth: "30vw", minWidth: "30vw", marginTop: "10px" }}>
          <Card.Body>
            <Card.Title>{comment.commentor}</Card.Title>
            <footer className="blockquote-footer" style={{ marginTop: "5px" }}>
              <cite title="Source Title">
                {new Date(comment.createdAt).toLocaleString() + "  "}
                {formatDistance(new Date(comment.createdAt), new Date()) +
                  " ago"}
              </cite>
            </footer>
            <Card.Text style={{ fontSize: "16px" }}>
              {comment.comment}
            </Card.Text>
            <Button variant="primary" onClick={() => setReplying(true)}>
              Reply
            </Button>
            {replying && (
              <NewComment
                parentBlogId={comment.parentBlog._id}
                parentCommentId={comment._id}
                topmost={false}
                setReplying={setReplying}
              />
            )}
            {hasChildren &&
              comment.children
                .sort((a, b) => a.createdAt - b.createdAt)
                .reverse()
                .map((reply) => <Comment key={reply._id} comment={reply} />)}
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default Comment;
