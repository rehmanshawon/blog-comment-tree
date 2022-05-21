import React from "react";
//import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NewComment from "./NewComment";
import Comment from "./Comment";

const nestArray = (array) => {
  const nested = JSON.parse(JSON.stringify(array));

  for (let i = 0; i < nested.length - 1; i++) {
    const a = nested[i];
    for (let j = i + 1; j < nested.length; j++) {
      const b = nested[j];

      if (b.parentComment === null) continue;

      if (a._id === b.parentComment._id) {
        if (a.hasOwnProperty("children")) {
          a.children.push(b);
        } else {
          a.children = [b];
        }
      }

      if (a.parentComment === null) continue;
      if (b._id === a.parentComment._id) {
        if (b.hasOwnProperty("children")) {
          b.children.push(a);
        } else {
          b.children = [a];
        }
      }
    }
  }

  let result = nested.filter((x) => !x.parentComment);

  return result;
};

const BlogView = (props) => {
  const { id } = useParams();
  const { blogs, error } = useSelector((state) => state.allBlogs);
  const { comments } = useSelector((state) => state.allComments);
  const [blog, setBlog] = React.useState(null);
  const [thisBlogComments, setThisBlogComments] = React.useState([]);

  React.useEffect(() => {
    if (blogs && blogs.length) setBlog(blogs.find((b) => b._id === id));
    let plainComments = [...comments];
    let tmpComments = plainComments.filter((c) => c.parentBlog._id === id);
    //console.log(tmpComments);
    let nestedComments = nestArray(tmpComments);
    setThisBlogComments(nestedComments);
  }, [id, blogs, comments]);

  if (blog) {
    return (
      <Container style={{ height: "100vh" }}>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card style={{ maxWidth: "30vw", marginTop: "50px" }}>
              <Card.Header as="h1">{blog.blogTitle}</Card.Header>
              <Card.Body>
                <Card.Title>
                  {blog.blogWriter.firstName + " " + blog.blogWriter.lastName}
                </Card.Title>
                <Card.Text style={{ fontSize: "16px" }}>
                  {blog.blogBody}
                </Card.Text>
                <footer className="blockquote-footer">
                  <cite title="Source Title">{blog.createdAt}</cite>
                </footer>
                <Button variant="primary">Edit</Button>
              </Card.Body>
            </Card>
            {error && <p>{error.message}</p>}
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <NewComment
              parentBlogId={id}
              parentCommentId={null}
              topmost={true}
            />
          </Col>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ paddingLeft: "50px" }}
        >
          <Col md="auto">
            <br></br>
            <h1>Comments</h1>
            {thisBlogComments &&
              [...thisBlogComments]
                .sort((a, b) => a.createdAt - b.createdAt)
                .reverse()
                .map((comment) => {
                  return <Comment key={comment._id} comment={comment} />;
                })}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default BlogView;
