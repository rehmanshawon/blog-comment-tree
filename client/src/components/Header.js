import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./stateSlices/loginSlice";

const Header = ({ history }) => {
  const { loggedInUser } = useSelector((state) => state.login);
  const { blogs } = useSelector((state) => state.allBlogs);

  const dispatch = useDispatch();

  const logoutSubmitHandler = () => {
    dispatch(logout());
    localStorage.removeItem("loggedInUser");
    history.push("/login");
  };

  const newBlogHandler = () => {
    history.push("/newblog");
  };

  return (
    <header>
      <nav>
        <ul className="navbar-list">
          {loggedInUser ? (
            <div className="dropdown">
              <button
                className="btn btn-lg btn-primary"
                style={{ marginRight: "20px" }}
                type="button"
                id="home"
                onClick={() => {
                  history.push("/welcome");
                }}
              >
                Home
              </button>
              <button
                className="btn btn-lg btn-primary"
                style={{ marginRight: "20px" }}
                type="button"
                id="newblog"
                onClick={newBlogHandler}
              >
                New Blog
              </button>
              <button
                className="btn btn-lg btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {loggedInUser.firstName}
              </button>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenu2"
              >
                {blogs &&
                  blogs
                    .filter((blog) => blog.blogWriter._id === loggedInUser.id)
                    .map((blog, i) => (
                      <button
                        className="dropdown-item"
                        type="button"
                        key={i}
                        onClick={() => {
                          //console.log(blog.id);
                          history.push(`/blogview/${blog._id}`);
                        }}
                      >
                        {blog.blogTitle}
                      </button>
                    ))}
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={logoutSubmitHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-list-item">
              Register/Login
            </Link>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default withRouter(Header);
