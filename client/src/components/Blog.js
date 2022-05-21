import { Link } from "react-router-dom";

const Blog = (props) => {
  const { _id, blogTitle, blogWriter } = props.data;
  return (
    <div className="blog">
      {/* <small>{_id}</small> */}
      <Link to={`/blogview/${_id}`}>
        <h1>{blogTitle}</h1>
        <h5>
          {"Blogger: " + blogWriter.firstName + " " + blogWriter.lastName}
        </h5>
      </Link>
    </div>
  );
};

export default Blog;
